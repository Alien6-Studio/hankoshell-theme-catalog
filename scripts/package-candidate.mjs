import {mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url)),output=resolve(root,'artifacts');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
const [archive]=JSON.parse(execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',output],{cwd:root,encoding:'utf8'}));
const source=JSON.parse(await readFile(resolve(root,'dist/source.json'),'utf8'));
await writeFile(resolve(output,'source.json'),JSON.stringify(source,null,2)+'\n');
const artifacts=[];
for(const file of [archive.filename,'source.json']){const bytes=await readFile(resolve(output,file));artifacts.push({file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
await writeFile(resolve(output,'manifest.json'),JSON.stringify({product:'HankoShell Theme Catalogue',version:source.version,source,artifacts},null,2)+'\n');
const manifest=await readFile(resolve(output,'manifest.json'));
await writeFile(resolve(output,'SHA256SUMS'),[...artifacts.map(item=>item.sha256+'  '+item.file),createHash('sha256').update(manifest).digest('hex')+'  manifest.json'].join('\n')+'\n');
console.log(JSON.stringify({version:source.version,source:source.revision,artifacts:artifacts.map(item=>({file:item.file,bytes:item.bytes}))}));
