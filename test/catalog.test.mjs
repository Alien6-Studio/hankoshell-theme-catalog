import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {catalogue,pageTemplates,nativeThemes,assets} from '../dist/index.js';
import {frameCss} from '../dist/frames.js';
const contracts=createRequire(import.meta.url)('../contracts/validate.cjs');
const require=createRequire(import.meta.url);
const root=new URL('../catalog/',import.meta.url);
const json=async path=>JSON.parse(await readFile(new URL(path,root),'utf8'));
test('the distributable retains all sixteen independently authored identities and their 288 pages',async()=>{
 assert.deepEqual(contracts.validate('catalog',catalogue),{valid:true,errors:[]});
 assert.deepEqual(catalogue.themes.map(theme=>theme.id),['evidence','precision','maison','signal','civique','edition','rituel','terminal','comptoir','mouvement','folio','patrimoine','zeste','parade','bloom','rivage']);
 assert.equal(catalogue.themes.filter(theme=>theme.design.introduced).length,4);assert.equal(catalogue.sections.length,4);assert.equal(Object.keys(pageTemplates).length,288);
 for(const theme of catalogue.themes){
  assert.equal(theme.complete,true);assert.equal(theme.templates.length,18);
  const emails=theme.templates.filter(template=>template.editorPage.startsWith('email:')).map(template=>pageTemplates[template.path]);
  assert.equal(new Set(emails.map(page=>page.subject)).size,3);
  assert.deepEqual(nativeThemes[theme.id],await json(theme.themePath));
  assert.deepEqual(contracts.validate('theme',nativeThemes[theme.id]),{valid:true,errors:[]});
  assert.ok(frameCss.includes('[data-hanko-frame='+theme.id+']'),theme.id+' authored layout');
  for(const template of theme.templates){
   const page=pageTemplates[template.path];assert.deepEqual(page,await json(template.path),template.path);
   assert.equal(page.appearance.composition,template.editorPage.startsWith('email:')?undefined:theme.id);
   assert.ok(template.path.startsWith(`themes/${theme.id}/pages/`));
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

const pagesFor=theme=>Object.fromEntries(theme.templates.map(template=>[template.editorPage,pageTemplates[template.path]]));
function luminance(hex){return hex.slice(1).match(/../g).map(value=>{const c=parseInt(value,16)/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);}
function contrast(a,b){return (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);}

test('the identity continues across account, administration, welcome and every photographic page',()=>{
 for(const theme of catalogue.themes){
  const pages=pagesFor(theme);
  for(const [key,page]of Object.entries(pages)){
   if(/^(account|admin|welcome):/.test(key)){
    for(const suffix of ['section-label','service-motto','service-note']){
     const block=page.blocks.find(block=>block.id===theme.id+'-'+suffix);assert.ok(block,theme.id+'/'+key+': '+suffix);
     for(const locale of page.i18n.supportedLocales.filter(locale=>locale!=='fr'))assert.ok(page.i18n.messages[locale]['blocks.'+block.id+'.text'],theme.id+'/'+key+'/'+locale);
    }
   }
   if(theme.assets.length)assert.equal(page.blocks.filter(block=>block.type==='image').length,1,theme.id+'/'+key+': the photographic identity continues beyond the profile');
   if(key.startsWith('email:')){assert.equal(page.appearance.contentWidth,620);assert.doesNotMatch(page.native.copy.description,/Keycloak/);}
  }
 }
});
test('every screen keeps readable page, secondary, form and action text',()=>{
 for(const theme of catalogue.themes)for(const [key,page] of Object.entries(pagesFor(theme))){
  assert.ok(contrast(page.appearance.foreground,page.appearance.background)>=4.5,theme.id+'/'+key+' body');
  assert.ok(contrast(page.appearance.muted,page.appearance.background)>=4.5,theme.id+'/'+key+' secondary');
  assert.ok(contrast(page.native.foreground,page.native.background)>=4.5,theme.id+'/'+key+' form');
  assert.ok(contrast(page.native.styles.description.color,page.native.background)>=4.5,theme.id+'/'+key+' form secondary');
  assert.ok(contrast(page.native.buttonColor,page.native.buttonBackground)>=4.5,theme.id+'/'+key+' action');
 }
});
test('theme documents embed portable photography and retain the font notices',async()=>{
 for(const theme of catalogue.themes){
  const pages=pagesFor(theme);
  assert.equal(theme.assets.length,['maison','rituel','comptoir','mouvement','zeste','parade','bloom','rivage'].includes(theme.id)?1:0);
  for(const asset of theme.assets){const bytes=Buffer.from(assets[asset.path].src.split(',')[1],'base64');assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);}
  for(const page of Object.values(pages)){
   assert.equal(page.appearance.backgroundImage,undefined);
   if(!theme.assets.length)assert.equal(page.blocks.some(block=>block.type==='image'),false);
   else for(const block of page.blocks.filter(block=>block.type==='image'))assert.match(block.src,/^data:image\/jpeg;base64,/);
  }
  assert.doesNotMatch(JSON.stringify(pages),/https?:\/\/[^"\s]+\.(?:png|svg|webp)/);
 }
 assert.match(await readFile(require.resolve('@alien6/hankoshell-theme-catalog/font-notices.txt'),'utf8'),/SIL OPEN FONT LICENSE/);
});
