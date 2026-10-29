import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {catalogue,pageTemplates,nativeThemes,assets} from '../dist/index.js';
import {frameCss} from '../dist/frames.js';
const contracts=createRequire(import.meta.url)('../contracts/validate.cjs');
const root=new URL('../catalog/',import.meta.url);
const json=async path=>JSON.parse(await readFile(new URL(path,root),'utf8'));
test('the distributable retains all sixteen independently authored identities and their 288 pages',async()=>{
 assert.equal(catalogue.themes.length,16);assert.equal(Object.keys(pageTemplates).length,288);
 for(const theme of catalogue.themes){
  assert.equal(theme.complete,true);assert.equal(theme.templates.length,18);
  assert.deepEqual(nativeThemes[theme.id],await json(theme.themePath));
  assert.deepEqual(contracts.validate('theme',nativeThemes[theme.id]),{valid:true,errors:[]});
  assert.ok(frameCss.includes('[data-hanko-frame='+theme.id+']'),theme.id+' authored layout');
  for(const template of theme.templates){
   const page=pageTemplates[template.path];assert.deepEqual(page,await json(template.path),template.path);
   assert.equal(page.preset,theme.id);assert.equal(page.i18n.supportedLocales.length,8);
   assert.equal(page.appearance.font,theme.style.font);assert.equal(page.appearance.headingFont,theme.style.headingFont);
   assert.deepEqual(contracts.validate('page',page),{valid:true,errors:[]},template.path);
  }
 }
});
test('photographs and font faces retain their source hashes and licences',async()=>{
 assert.equal(Object.keys(assets).length,8);
 for(const theme of catalogue.themes)for(const asset of theme.assets){
  const bytes=await readFile(new URL(asset.path,root));assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
  assert.equal(assets[asset.path].src,'data:image/jpeg;base64,'+bytes.toString('base64'));
  for(const template of theme.templates){const images=pageTemplates[template.path].blocks.filter(block=>block.type==='image');assert.equal(images.length,1);assert.equal(images[0].src,assets[asset.path].src,template.path);}
 }
 const fonts=await json('fonts/embedded.json');assert.equal(fonts.length,3);
 for(const font of fonts){const bytes=await readFile(new URL('fonts/'+font.file,root));assert.equal(createHash('sha256').update(bytes).digest('hex'),font.sha256);assert.ok(frameCss.includes('data:font/woff2;base64,'+bytes.toString('base64')));}
 for(const name of ['Manrope-OFL.txt','InstrumentSerif-OFL.txt'])assert.match(await readFile(new URL('fonts/'+name,root),'utf8'),/SIL OPEN FONT LICENSE/);
});
