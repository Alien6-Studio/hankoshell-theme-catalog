import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url)),work=await mkdtemp(join(tmpdir(),'hanko-catalog-consumer-'));
const require=createRequire(import.meta.url),env={...process.env,npm_config_cache:process.env.npm_config_cache||join(work,'cache')};
try{
 const app=join(work,'consumer');await mkdir(app);
 const [archive]=JSON.parse(execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',work],{cwd:root,encoding:'utf8',env}));
 await writeFile(join(app,'package.json'),JSON.stringify({name:'isolated-catalogue-consumer',private:true,type:'module'}));
 execFileSync('npm',['install','--ignore-scripts','--no-audit','--no-fund',join(work,archive.filename)],{cwd:app,stdio:'pipe',env});
 await writeFile(join(app,'check.mjs'),`import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {catalogue,pageTemplates,nativeThemes,assets,translations} from '@alien6/hankoshell-theme-catalog';
import {frameCss} from '@alien6/hankoshell-theme-catalog/frames';
const contracts=createRequire(import.meta.url)('@alien6/hankoshell-theme-catalog/contracts');
assert.equal(catalogue.themes.length,16);assert.equal(Object.keys(pageTemplates).length,288);assert.equal(Object.keys(assets).length,8);assert.equal(Object.keys(translations.locales).length,8);
for(const theme of catalogue.themes){assert.ok(frameCss.includes('[data-hanko-frame='+theme.id+']'));assert.equal(contracts.validate('theme',nativeThemes[theme.id]).valid,true);for(const template of theme.templates)assert.equal(contracts.validate('page',pageTemplates[template.path]).valid,true);}
`);
 execFileSync(process.execPath,[join(app,'check.mjs')],{cwd:app,stdio:'inherit',env});
 await writeFile(join(app,'types.ts'),`import {catalogue,pageTemplates,translations} from '@alien6/hankoshell-theme-catalog';
import {frameCss} from '@alien6/hankoshell-theme-catalog/frames';
const theme=catalogue.themes[0];const title:string=theme.name;const page:unknown=pageTemplates[theme.templates[0].path];const french:string=translations.locales.fr.label;const styles:string=frameCss;
console.log(title,page,french,styles);
`);
 const compiler=resolve(dirname(require.resolve('typescript/package.json')),require('typescript/package.json').bin.tsc);
 execFileSync(process.execPath,[compiler,'--strict','--noEmit','--target','ES2022','--module','NodeNext','--moduleResolution','NodeNext',join(app,'types.ts')],{cwd:app,stdio:'inherit',env});
 const metadata=JSON.parse(await readFile(join(app,'node_modules/@alien6/hankoshell-theme-catalog/package.json'),'utf8'));
 assert.equal(metadata.dependencies.react,undefined);
 console.log('Isolated archive passed: all public exports, 288 validated pages and TypeScript declarations without JSON-module flags or a builder checkout.');
}finally{await rm(work,{recursive:true,force:true});}
