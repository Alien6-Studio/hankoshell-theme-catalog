const ids=['zeste','parade','bloom','rivage'];
const frame=(id:string)=>`[data-hanko-frame=${id}][data-hanko-frame][data-hanko-family=login]`;
const frames=ids.map(frame).join(',');
const slots=(slot:string)=>ids.map(id=>frame(id)+` [data-hanko-slot=${slot}]`).join(',');

/** Photographic directions share the same slot contract and portable documents. */
export const vibrantFrameCss=`
${frames}{grid-template-columns:minmax(0,1fr) minmax(320px,1fr);grid-template-rows:84px auto 1fr 58px;grid-template-areas:'brand brand' 'aside header' 'aside form' 'footer footer';min-height:740px}
${slots('header')}{padding:30px 38px 18px;align-self:end}
${slots('form')}{margin:0 28px 36px;max-width:410px!important;border:1px solid var(--hf-line);border-radius:var(--hf-radius)}
${slots('aside')}{padding:0;align-self:stretch;align-content:stretch;height:100%;overflow:hidden;display:block;background:var(--hf-accent)}
${ids.map(id=>frame(id)+' [data-hanko-slot=aside]>*').join(',')}{height:100%;margin:0}
${ids.map(id=>frame(id)+' [data-hanko-slot=aside] img').join(',')}{display:block;width:100%;height:100%!important;max-height:none!important;border-radius:0}
${frame('parade')}{grid-template-areas:'brand brand' 'header aside' 'form aside' 'footer footer'}
${frame('parade')} [data-hanko-slot=header] :is(.content-heading,h2){font-weight:700!important;letter-spacing:-.055em}
${frame('bloom')} [data-hanko-slot=aside]{padding:20px;background:var(--hf-bg)}
${frame('bloom')} [data-hanko-slot=aside]>*{overflow:hidden;border-radius:var(--hf-radius)}
${frame('bloom')} [data-hanko-slot=form]{border-radius:20px}
${frame('rivage')}{grid-template-areas:'brand aside' 'header aside' 'form aside' 'footer aside';grid-template-columns:minmax(340px,.95fr) minmax(0,1.05fr)}
${frame('rivage')} [data-hanko-slot=brand]{border:0}
${frame('rivage')} [data-hanko-slot=footer]{border-top:1px solid var(--hf-line)}
${ids.map(id=>`[data-hanko-frame=${id}][data-hanko-family=account] [data-hanko-slot=aside]`).join(',')}{padding:0;overflow:hidden;border-radius:var(--hf-radius);margin-bottom:5px}
${ids.map(id=>`[data-hanko-frame=${id}][data-hanko-family=account] [data-hanko-slot=aside] img`).join(',')}{display:block;width:100%;height:140px;object-fit:cover}
${ids.map(id=>`[data-hanko-frame=${id}] [data-hanko-slot=nav] [aria-current]`).join(',')}{background:var(--hf-accent);color:var(--hf-surface)}
@container hanko-screen (max-width:760px){
 ${frames}{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer';min-height:0;padding:0}
 ${slots('header')}{padding:28px 25px 24px}
 ${slots('aside')}{height:230px;max-height:230px;padding:0;margin:0 0 26px}
 ${slots('form')}{max-width:calc(100% - 40px)!important;width:calc(100% - 40px);margin:0 20px 30px;padding:26px!important}
 ${frame('bloom')} [data-hanko-slot=aside]{padding:0 20px;background:var(--hf-bg)}
 ${frame('rivage')} [data-hanko-slot=brand]{border-bottom:1px solid var(--hf-line)}
}
`;
