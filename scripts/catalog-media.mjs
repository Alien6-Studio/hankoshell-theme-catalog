import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';

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
export function catalogMediaEsbuild(){
 const registry=mediaRegistry();
 return {name:'catalog-media',setup(builder){
  builder.onLoad({filter:/[/\\]catalog[/\\]themes[/\\].*[/\\]pages[/\\].*\.json$/},async args=>({contents:await registry.page(args.path),loader:'js',resolveDir:resolve(args.path,'..')}));
  builder.onResolve({filter:/^catalog-media:/},args=>({path:args.path.slice(14),namespace:'catalog-media'}));
  builder.onLoad({filter:/.*/,namespace:'catalog-media'},args=>({contents:'export default '+registry.assets.get(args.path)+';',loader:'js'}));
 }};
}
