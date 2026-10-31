const ids=['evidence','precision','maison','signal','civique','edition','rituel','terminal','comptoir','mouvement','folio','patrimoine','zeste','parade','bloom','rivage'];
const all='[data-hanko-frame]:is('+ids.map(id=>'[data-hanko-frame='+id+']').join(',')+')';
const frame=(id:string,family:string)=>`[data-hanko-frame=${id}][data-hanko-frame][data-hanko-family=${family}]`;
const app=(id:string)=>`[data-hanko-frame=${id}][data-hanko-frame]:is([data-hanko-family=account],[data-hanko-family=admin])`;
const application=`${all}:is([data-hanko-family=account],[data-hanko-family=admin])`;
const photos=['maison','rituel','comptoir','mouvement'];

/** A complete identity system: authored service panels, application details and mail. */
export const continuityFrameCss=`
${all} [data-block$=-section-label]{letter-spacing:.12em}
${all} [data-block$=-service-tags]{padding-top:20px;border-top:1px solid var(--hf-line);max-width:38ch;letter-spacing:.09em}
${all} [data-block$=-service-motto] :is(h2,.content-heading){font-family:var(--hf-display);letter-spacing:-.035em;text-wrap:balance}
${all} [data-block$=-service-link] :is(button,a,.content-button){text-decoration:none}
${all} [data-block$=-service-link] button{width:100%;text-align:start}
${all} [data-block$=-service-link] .content-button{display:block;background:var(--hf-accent);color:var(--hf-action-fg)}
${application} [data-hanko-slot=header]{gap:10px;padding-bottom:28px}
${application} [data-hanko-slot=body]{display:grid!important;grid-template-columns:minmax(180px,.65fr) minmax(0,1.35fr);grid-template-areas:'aside form';align-items:start;gap:28px}
${application} [data-hanko-slot=aside]{padding:24px;gap:18px;border:1px solid var(--hf-line);border-top:3px solid var(--hf-accent);border-radius:var(--hf-radius);background:var(--hf-bg);overflow:hidden;align-self:start}
${application} [data-hanko-slot=aside]:has(img){padding:0 0 22px;border-top-width:1px;gap:20px}
${application} [data-hanko-slot=aside]:has(img)>:not(:has(img)){margin-inline:22px}
${application} [data-hanko-slot=aside] img{display:block;width:100%;height:220px!important;max-height:none!important;object-fit:cover;border-radius:0!important}
${application} [data-hanko-slot=form]{min-width:0}
${application} [data-hanko-slot=form] :is(.security-row,.journey-session,.journey-role){padding:20px 0;border-bottom:1px solid var(--hf-line)}
${application} .journey-table-head{font-size:10px;letter-spacing:.06em;text-transform:uppercase;border-block:1px solid var(--hf-line);padding-block:14px}
${application} .journey-table-row{padding-block:18px;border-bottom:1px solid var(--hf-line)}
${application} .journey-stats{gap:10px}
${application} .journey-stats>button{border-color:var(--hf-line);border-radius:var(--hf-radius);padding:18px 12px;background:var(--hf-bg)}
${application} .journey-stats strong{font-family:var(--hf-display);color:var(--hf-accent)}
${application} .journey-back{font-size:11px;color:var(--hf-accent);margin-bottom:18px}

/* Each existing direction retains its own density, navigation and material. */
${app('evidence')} [data-hanko-slot=aside]{border:0;background:color-mix(in srgb,var(--hf-accent) 6%,var(--hf-bg));border-radius:18px}
${app('precision')} [data-hanko-slot=body],${app('terminal')} [data-hanko-slot=body]{grid-template-columns:minmax(0,1.4fr) minmax(190px,.6fr);grid-template-areas:'form aside'}
${app('precision')} [data-hanko-slot=aside]{border-top-width:1px;box-shadow:inset 0 3px var(--hf-accent)}
${app('signal')} [data-hanko-slot=aside]{border:0;border-top:5px solid var(--hf-accent);border-radius:0}
${app('signal')} [data-hanko-slot=aside] :is(h2,.content-heading){font-weight:700!important;font-size:32px!important}
${app('civique')} [data-hanko-slot=aside]{border:0;border-inline-start:5px solid var(--hf-accent);border-radius:0;background:var(--hf-surface)}
${app('edition')} [data-hanko-slot=aside]{border:0;border-top:3px double var(--hf-fg);border-bottom:1px solid var(--hf-line);border-radius:0;padding-inline:0}
${app('edition')} [data-hanko-slot=header]{border-bottom:1px solid var(--hf-line);margin-bottom:28px}
${app('terminal')} [data-hanko-slot=aside]{border:1px dashed var(--hf-line);border-radius:0}
${app('terminal')} [data-hanko-slot=aside] :is(p,.content-text){font-family:monospace;font-size:11px!important}
${app('folio')} [data-hanko-slot=aside]{border:1px solid var(--hf-accent);box-shadow:5px 5px 0 color-mix(in srgb,var(--hf-accent) 15%,var(--hf-bg));border-radius:0}
${app('patrimoine')} [data-hanko-slot=aside]{border:1px solid var(--hf-line);border-top:3px double var(--hf-muted);border-radius:0;text-align:center}
${app('patrimoine')} [data-hanko-slot=header]{border-bottom:1px solid var(--hf-line);margin-bottom:28px}

/* Photographic editions of four existing themes. Copy stays beside the photograph. */
${photos.map(id=>frame(id,'login')).join(',')}{grid-template-columns:minmax(320px,1fr) minmax(0,1fr);grid-template-rows:84px auto 1fr 58px;grid-template-areas:'brand brand' 'header aside' 'form aside' 'footer footer'}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=header]').join(',')}{padding:36px 38px 20px;align-self:end;height:auto;background:var(--hf-bg)}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=header] [data-block$=-caption]').join(',')}{max-width:40ch;letter-spacing:0}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=form]').join(',')}{margin:0 28px 34px;max-width:410px!important}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=aside]').join(',')}{padding:0;height:100%;align-self:stretch;overflow:hidden;display:block;background:var(--hf-bg)}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=aside]>*').join(',')}{height:100%;margin:0}
${photos.map(id=>frame(id,'login')+' [data-hanko-slot=aside] img').join(',')}{display:block;width:100%;height:100%!important;max-height:none!important;object-fit:cover;border-radius:0!important}
${frame('rituel','login')} [data-hanko-slot=header]{text-align:start;justify-items:start}
${frame('rituel','login')} [data-hanko-slot=header] :is(h2,.content-heading){font-size:44px!important}
${frame('rituel','login')} [data-hanko-slot=aside]{padding:24px 24px 24px 0}
${frame('rituel','login')} [data-hanko-slot=aside] img{border-radius:150px 150px 24px 24px!important}
${frame('comptoir','login')}{grid-template-areas:'brand brand' 'aside header' 'aside form' 'footer footer'}
${frame('mouvement','login')} [data-hanko-slot=header]{background:var(--hf-accent)}
${frame('mouvement','login')} [data-hanko-slot=header] :is(h2,.content-heading){font-size:58px!important}
${app('maison')} [data-hanko-slot=aside]{border-radius:0;border:0;border-bottom:1px solid var(--hf-line)}
${app('rituel')} [data-hanko-slot=aside],${app('rituel')} [data-hanko-slot=form]{border-radius:24px}
${app('mouvement')} [data-hanko-slot=aside]{border-radius:0;border-bottom:4px solid var(--hf-accent)}
${app('mouvement')} [data-hanko-slot=aside] :is(h2,.content-heading){text-transform:uppercase;font-size:32px!important}

/* Zeste: open horizontal navigation and an orange service rail. */
${app('zeste')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:84px auto auto auto 1fr auto}
${app('zeste')} [data-hanko-slot=nav]{flex-direction:row;border:0;border-bottom:1px solid var(--hf-line);background:var(--hf-surface);padding:0 36px}
${app('zeste')} [data-hanko-slot=nav] button{padding:18px 14px;border-radius:0}
${app('zeste')} [data-hanko-slot=nav] [aria-current]{background:none;color:var(--hf-accent);border-bottom:3px solid var(--hf-accent)}
${app('zeste')} [data-hanko-slot=aside]{border-bottom:4px solid var(--hf-accent)}
/* Parade: a purple workspace rail, generous pink surfaces and lively type. */
${app('parade')} [data-hanko-slot=nav]{background:var(--hf-accent)}
${app('parade')} [data-hanko-slot=nav] button{color:var(--hf-action-fg)}
${app('parade')} [data-hanko-slot=nav] [aria-current]{color:var(--hf-accent);background:var(--hf-surface)}
${app('parade')} [data-hanko-slot=header] :is(h2,.content-heading){font-weight:700!important;letter-spacing:-.055em}
${app('parade')} [data-hanko-slot=aside]{border-radius:22px 22px 6px 6px;border:0;background:var(--hf-surface)}
/* Bloom: centered editorial masthead and softly framed floral services. */
${app('bloom')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:84px auto auto auto 1fr auto}
${app('bloom')} [data-hanko-slot=nav]{flex-direction:row;justify-content:center;border:0;border-bottom:1px solid var(--hf-line);background:none}
${app('bloom')} [data-hanko-slot=nav] button{border-radius:30px}
${app('bloom')} [data-hanko-slot=header]{text-align:center;justify-items:center}
${app('bloom')} [data-hanko-slot=body]{grid-template-columns:minmax(200px,.65fr) minmax(0,1.35fr);max-width:1050px;width:100%;margin-inline:auto}
${app('bloom')} [data-hanko-slot=aside]{border-radius:100px 100px 22px 22px}
${app('bloom')} [data-hanko-slot=form]{border-radius:22px}
/* Rivage: the coastal photograph becomes a companion on the right. */
${app('rivage')} [data-hanko-slot=body]{grid-template-columns:minmax(0,1.35fr) minmax(200px,.65fr);grid-template-areas:'form aside'}
${app('rivage')} [data-hanko-slot=nav]{background:var(--hf-surface)}
${app('rivage')} [data-hanko-slot=aside]{border:0;border-radius:0}
${app('rivage')} [data-hanko-slot=aside] img{height:300px!important}

/* Welcome pages carry the same campaign and provide an obvious entry. */
${all}[data-hanko-family=welcome]{display:grid;grid-template-areas:'brand' 'header' 'body' 'footer';grid-template-columns:minmax(0,1fr);padding:0;min-height:740px}
${all}[data-hanko-family=welcome] [data-hanko-slot=header]{padding:35px var(--hf-padding) 24px;gap:12px}
${all}[data-hanko-family=welcome] [data-hanko-slot=body]{display:grid!important;grid-template-areas:'aside form';grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr);gap:36px;padding:0 var(--hf-padding) 36px;margin:0;align-items:center}
${all}[data-hanko-family=welcome] [data-hanko-slot=aside]{gap:18px}
${all}[data-hanko-family=welcome] [data-hanko-slot=aside] img{display:block;width:100%;height:300px;object-fit:cover}
${all}[data-hanko-family=welcome] [data-hanko-slot=form]{border:1px solid var(--hf-line);border-radius:var(--hf-radius)}

/* E-mails use a narrow, single-column reading rhythm and the same brand material. */
${all}[data-hanko-family=email]{padding:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:'brand' 'header' 'body' 'footer';gap:0;border-top:5px solid var(--hf-accent)}
${all}[data-hanko-family=email] [data-hanko-slot=brand]{padding:26px 30px;border-bottom:1px solid var(--hf-line)}
${all}[data-hanko-family=email] [data-hanko-slot=header]{padding:24px 30px 0;gap:15px}
${all}[data-hanko-family=email] [data-hanko-slot=header] img{display:block;width:100%;height:150px;object-fit:cover}
${all}[data-hanko-family=email] [data-hanko-slot=body]{display:flex!important;flex-direction:column;gap:22px;align-items:stretch;padding:24px 30px 30px;margin:0}
${all}[data-hanko-family=email] [data-hanko-slot=form]{border:1px solid var(--hf-line);border-radius:var(--hf-radius)}
${all}[data-hanko-family=email] [data-hanko-slot=footer]{padding:20px 30px}

@container hanko-screen (max-width:760px){
 ${application} [data-hanko-slot=body]{display:flex!important;flex-direction:column;gap:22px}
 ${application} [data-hanko-slot=aside]{order:0!important;width:100%;padding:22px}
 ${application} [data-hanko-slot=aside]:has(img){display:grid;grid-template-columns:minmax(0,1fr);padding:0 0 20px}
 ${application} [data-hanko-slot=aside] img{height:170px!important}
 ${application} [data-hanko-slot=aside] :is(h2,.content-heading){font-size:26px!important}
 ${app('bloom')} [data-hanko-slot=aside]{border-radius:24px}
 ${photos.map(id=>frame(id,'login')).join(',')}{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer'}
 ${photos.map(id=>frame(id,'login')+' [data-hanko-slot=header]').join(',')}{padding:28px 25px 24px}
 ${photos.map(id=>frame(id,'login')+' [data-hanko-slot=aside]').join(',')}{height:230px;max-height:230px;margin:0 0 26px;padding:0}
 ${photos.map(id=>frame(id,'login')+' [data-hanko-slot=form]').join(',')}{max-width:calc(100% - 40px)!important;width:calc(100% - 40px);margin:0 20px 30px;padding:26px!important}
 ${frame('rituel','login')} [data-hanko-slot=aside]{padding:0 20px}
 ${frame('rituel','login')} [data-hanko-slot=aside] img{border-radius:24px!important}
 ${all}[data-hanko-family=welcome] [data-hanko-slot=header]{padding:28px 24px 22px}
 ${all}[data-hanko-family=welcome] [data-hanko-slot=body]{display:flex!important;flex-direction:column;padding:0 20px 28px;gap:24px}
 ${all}[data-hanko-family=welcome] [data-hanko-slot=form]{padding:24px!important}
 ${all}[data-hanko-family=welcome] [data-hanko-slot=aside] img{height:220px}
 ${all}[data-hanko-family=email] [data-hanko-slot=header]{padding-inline:20px}
 ${all}[data-hanko-family=email] [data-hanko-slot=body]{padding:24px 20px}
}
`;
