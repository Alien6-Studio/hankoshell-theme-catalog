import {readFile,writeFile,mkdir,rm,readdir} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
// Authored documents remain self-contained. Bundles share repeated photographs.
function mediaRegistry(){
 const assets=new Map();
 return {assets,async page(path){
  const source=await readFile(path,'utf8'),imports=new Map();
  const expression=source.replace(/"data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+"/g,literal=>{
   const id=createHash('sha256').update(literal).digest('hex');assets.set(id,literal);
   if(!imports.has(id))imports.set(id,'media'+imports.size);
   return imports.get(id);
  });
  return [...imports].map(([id,name])=>`import ${name} from 'catalog-media:${id}';`).join('\n')+'\nexport default '+expression+';';
 }};
}
function catalogMediaEsbuild(){
 const registry=mediaRegistry();
 return {name:'catalog-media',setup(builder){
  builder.onLoad({filter:/[/\\]catalog[/\\]themes[/\\].*[/\\]pages[/\\].*\.json$/},async args=>({contents:await registry.page(args.path),loader:'js',resolveDir:resolve(args.path,'..')}));
  builder.onResolve({filter:/^catalog-media:/},args=>({path:args.path.slice(14),namespace:'catalog-media'}));
  builder.onLoad({filter:/.*/,namespace:'catalog-media'},args=>({contents:'export default '+registry.assets.get(args.path)+';',loader:'js'}));
 }};
}


const root=fileURLToPath(new URL('../',import.meta.url)),dist=resolve(root,'dist');
const json=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const catalogue=await json('catalog/themes.json'),pkg=await json('package.json');
const contracts=createRequire(import.meta.url)('../contracts/validate.cjs');
for(const [kind,document,label]of [['catalog',catalogue,'catalogue'],...await Promise.all(catalogue.themes.flatMap(theme=>theme.templates.map(async template=>['page',await json('catalog/'+template.path),template.path])))]){
 const result=contracts.validate(kind,document);if(!result.valid)throw Error(label+': '+result.errors.join('\n'));
}
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
const paths=[...new Set(catalogue.themes.flatMap(theme=>theme.templates.map(template=>template.path)))];
const entry=resolve(dist,'entry.ts');
await writeFile(entry,`import catalogue from '../catalog/themes.json';
import translations from '../catalog/translations.json';
${paths.map((path,index)=>`import page${index} from '../catalog/${path}';`).join('\n')}
${catalogue.themes.map((theme,index)=>`import native${index} from '../catalog/${theme.themePath}';`).join('\n')}
export {catalogue,translations};
export const pageTemplates:Record<string,unknown>={${paths.map((path,index)=>JSON.stringify(path)+':page'+index).join(',')}};
export const nativeThemes:Record<string,unknown>={${catalogue.themes.map((theme,index)=>JSON.stringify(theme.id)+':native'+index).join(',')}};
export const assets=Object.fromEntries(catalogue.themes.flatMap(theme=>theme.assets.map(asset=>[asset.path,{...asset,src:(pageTemplates[theme.templates[0].path] as any).blocks.find((block:any)=>block.type==='image').src}])));
`);
await build({entryPoints:{index:entry,frames:resolve(root,'src/frames.ts')},outdir:dist,bundle:true,splitting:true,format:'esm',platform:'neutral',target:'es2022',minify:true,legalComments:'eof',plugins:[catalogMediaEsbuild()]});
await rm(entry);
await writeFile(resolve(dist,'catalog.json'),JSON.stringify(catalogue,null,2)+'\n');
await writeFile(resolve(dist,'translations.json'),await readFile(resolve(root,'catalog/translations.json')));
function declaration(value){
 if(value===null)return 'null';
 if(Array.isArray(value))return 'Array<'+([...new Set(value.map(declaration))].join('|')||'never')+'>';
 if(typeof value==='object')return '{'+Object.entries(value).map(([key,item])=>JSON.stringify(key)+':'+declaration(item)).join(';')+'}';
 return typeof value;
}
const translationData=await json('catalog/translations.json');
await writeFile(resolve(dist,'index.d.ts'),`export declare const catalogue:${declaration(catalogue)};
export type CatalogueLocale=${Object.keys(translationData.locales).map(locale=>JSON.stringify(locale)).join('|')};
export declare const translations:{format:string;locales:${declaration(translationData.locales)};phrases:Record<string,Partial<Record<CatalogueLocale,string>>>};
export declare const pageTemplates:Record<string,unknown>;
export declare const nativeThemes:Record<string,unknown>;
export declare const assets:Record<string,{path:string;source:string;license:string;sha256:string;src:string}>;
`);
await writeFile(resolve(dist,'frames.d.ts'),'export declare const frameCss:string;\n');
await writeFile(resolve(dist,'font-notices.txt'),(await Promise.all(['Manrope-OFL.txt','InstrumentSerif-OFL.txt'].map(name=>readFile(resolve(root,'catalog/fonts',name),'utf8')))).join('\n\n').replace(/[ \t]+$/gm,''));
const files=[];
async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){const next=resolve(path,entry.name);if(entry.isDirectory())await walk(next);else files.push(next);}}
for(const name of ['catalog','src','contracts','scripts'])await walk(resolve(root,name));
const hash=createHash('sha256');for(const path of files.sort()){hash.update(relative(root,path).replaceAll('\\','/')+'\0');hash.update(await readFile(path));}
let revision=null,dirty=true;try{revision=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();dirty=!!execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim();}catch{}
const provenance={repository:'Alien6-Studio/hankoshell-theme-catalog',version:pkg.version,revision,uncommittedChanges:dirty,contentSha256:hash.digest('hex'),themes:catalogue.themes.length,pages:paths.length,photographs:catalogue.themes.reduce((count,theme)=>count+theme.assets.length,0)};
await writeFile(resolve(dist,'source.json'),JSON.stringify(provenance,null,2)+'\n');
console.log(`Built catalogue ${pkg.version}: ${provenance.themes} themes, ${provenance.pages} pages, ${provenance.photographs} shared photographs.`);
