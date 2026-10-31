import fonts from '../../catalog/fonts/embedded.json';

const ids=['evidence','precision','maison','signal','civique','edition','rituel','terminal','comptoir','mouvement','folio','patrimoine','zeste','parade','bloom','rivage'];
const all='[data-hanko-frame]:is('+ids.map(id=>'[data-hanko-frame='+id+']').join(',')+')';
const login=(id:string)=>`[data-hanko-frame=${id}][data-hanko-frame][data-hanko-family=login]`;
const application=(id:string)=>`[data-hanko-frame=${id}][data-hanko-frame]:is([data-hanko-family=account],[data-hanko-family=admin])`;

/** The exact same portable recipes run in Studio, Keycloak and React exports. */
export const directionFrameCss=fonts.map(font=>font.css).join('\n')+`
${all}{--hf-line:color-mix(in srgb,var(--hf-fg) 17%,transparent);--fg:var(--hf-fg);--fg-secondary:var(--hf-fg);--fg-muted:var(--hf-muted);--bg:var(--hf-bg);--bg-surface:var(--hf-surface);--bg-subtle:var(--hf-surface);--primary:var(--hf-accent);--primary-action:var(--hf-accent);--ring:var(--hf-accent);--ring-glow:color-mix(in srgb,var(--hf-accent) 18%,transparent);--border:var(--hf-line);color:var(--hf-fg);background:var(--hf-bg);color-scheme:var(--hf-scheme,normal);border:0;border-radius:0;box-shadow:none;overflow-wrap:anywhere}
${all} *{box-sizing:border-box}
${all} [data-hanko-slot]{min-width:0}
${all} [data-hanko-slot=brand]{font-family:var(--hf-display);font-size:31px;letter-spacing:-1.5px;font-weight:600;min-height:84px;margin:0;padding:22px var(--hf-padding);border-bottom:1px solid var(--hf-line)}
${all} [data-hanko-slot=brand]>strong{font-weight:inherit}
${all} [data-hanko-slot=header],${all} [data-hanko-slot=aside],${all} [data-hanko-slot=footer]{display:grid;align-content:start;gap:12px;min-height:0;margin:0;border:0;border-radius:0}
${all} .canvas-zone{padding:0}
${all} .preview-block,${all} .canvas-block,${all} .identity-block,${all} .hkc-block{margin:0;min-width:0}
${all} [data-hanko-slot=header] :is(h1,h2,.content-heading){font-family:var(--hf-display);letter-spacing:-.035em;max-width:100%;text-wrap:balance}
${all} [data-hanko-slot=header] :is(.content-text,p){letter-spacing:.07em}
${all} [data-hanko-slot=aside] :is(.content-text,p){max-width:42ch}
${all} [data-hanko-slot=footer]{grid-area:footer;display:block;padding:18px var(--hf-padding);border-top:1px solid var(--hf-line);align-self:end}
${all} [data-hanko-slot=form]{--fg:var(--hf-form-fg,var(--hf-fg));--fg-secondary:var(--hf-form-fg,var(--hf-fg));--fg-muted:var(--hf-form-muted,var(--hf-muted));--bg:var(--hf-form-bg,var(--hf-surface));--bg-surface:var(--hf-form-bg,var(--hf-surface));--bg-subtle:color-mix(in srgb,var(--hf-form-fg,var(--hf-fg)) 5%,var(--hf-form-bg,var(--hf-surface)));--secondary:var(--bg-subtle);--secondary-foreground:var(--fg);--primary:var(--hf-action,var(--hf-accent));--primary-action:var(--hf-action,var(--hf-accent));--primary-foreground:var(--hf-action-fg);--border:var(--hf-input-border,var(--hf-line));color-scheme:var(--hf-form-scheme,normal);margin:0;border:0;min-width:0;width:100%;max-width:none!important;align-self:center;box-shadow:none}
${all} [data-hanko-slot=form] input::placeholder{color:var(--hf-form-muted,var(--hf-muted));opacity:1}
${all} [data-hanko-slot=form]>h1,${all} [data-hanko-slot=form]>h2{font-family:var(--hf-display);font-weight:500;letter-spacing:-.025em;line-height:1.2;margin:0 0 12px;font-size:27px}
${all} [data-hanko-slot=form] .native-description{margin:0 0 25px;font-size:13px;line-height:1.7}
${all} [data-hanko-slot=form] form{margin:0;display:grid;gap:17px}
${all} [data-hanko-slot=form] .native-field{margin:0}
${all} [data-hanko-slot=form] label{font:inherit;font-size:12px;margin:0 0 8px;line-height:1.5}
${all} [data-hanko-slot=form] input{font:inherit;font-size:14px;min-height:47px;padding:12px 14px;width:100%}
${all} [data-hanko-slot=form] :is(.native-action,.hk-btn,[type=submit]){font:inherit;font-size:13px;font-weight:600;min-height:47px;line-height:1.5;padding:13px 17px;margin-top:5px}
${all} [data-hanko-slot=form] :is(button,a,input):focus-visible{outline:2px solid var(--hf-accent);outline-offset:4px}
${all} [data-hanko-slot=nav]{border:0;border-radius:0;background:none;margin:0;padding:18px 12px;gap:6px;align-self:stretch}
${all} [data-hanko-slot=nav] button{font:inherit;font-size:12px;line-height:1.5;padding:12px 14px;border-radius:5px;color:var(--hf-muted);text-align:start}
${all} [data-hanko-slot=nav] [aria-current]{background:color-mix(in srgb,var(--hf-accent) 12%,var(--hf-surface));color:var(--hf-accent);font-weight:600}
${all} [data-hanko-slot=subnav]{padding:0 0 12px}
${all} .security-row{padding:18px 0;border-color:var(--hf-line)}
${all} .security-action{font-size:12px}
${all}[data-hanko-family=login]{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr);grid-template-rows:84px 1fr 1fr 58px;grid-template-areas:'brand brand' 'header form' 'aside form' 'footer footer';column-gap:0;row-gap:0;min-height:740px;padding:0}
${all}[data-hanko-family=login] [data-hanko-slot=body]{display:contents!important}
${all}[data-hanko-family=login] [data-hanko-slot=header]{padding:40px var(--hf-padding) 16px;align-self:end}
${all}[data-hanko-family=login] [data-hanko-slot=aside]{padding:0 var(--hf-padding) 55px}
${all}[data-hanko-family=login] [data-hanko-slot=form]{max-width:410px!important;justify-self:center;margin:42px 24px}
${all}:is([data-hanko-family=account],[data-hanko-family=admin]){display:grid;grid-template-columns:205px minmax(0,1fr);grid-template-rows:84px auto auto 1fr auto;grid-template-areas:'brand brand' 'nav header' 'nav subnav' 'nav body' 'nav footer';gap:0;min-height:740px;padding:0}
${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=body]{display:flex!important;flex-direction:column;align-items:stretch;gap:24px;grid-area:body;margin:0;padding:0 var(--hf-padding) 30px}
${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=header]{padding:38px var(--hf-padding) 26px}
${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=form]{border:1px solid var(--hf-line);max-width:none!important;border-radius:var(--hf-radius);align-self:start}
${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=nav]{border-inline-end:1px solid var(--hf-line);background:color-mix(in srgb,var(--hf-accent) 4%,var(--hf-bg))}

/* Évidence: airy, blue-white, progressive hierarchy. */
${login('evidence')}{background:var(--hf-bg);border-radius:20px}
${login('evidence')} [data-hanko-slot=header]{padding-inline-start:54px}
${login('evidence')} [data-hanko-slot=aside]{padding-inline-start:54px}
${login('evidence')} [data-hanko-slot=form]{box-shadow:0 12px 40px #1b335509;border:1px solid var(--hf-line);border-radius:18px}
${application('evidence')}{grid-template-columns:1fr;grid-template-rows:84px auto auto auto 1fr auto;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';background:var(--hf-bg)}
${application('evidence')} [data-hanko-slot=nav]{flex-direction:row;border:0;border-bottom:1px solid var(--hf-line);padding:0 36px;background:var(--hf-surface)}
${application('evidence')} [data-hanko-slot=nav] button{padding:18px 12px;border-radius:0;border-bottom:2px solid transparent}
${application('evidence')} [data-hanko-slot=nav] [aria-current]{background:none;border-bottom-color:var(--hf-accent)}
${application('evidence')} [data-hanko-slot=body]{max-width:960px;width:100%;margin-inline:auto}
${application('evidence')} [data-hanko-slot=header]{max-width:960px;width:100%;margin-inline:auto}

/* Précision: restrained product surfaces and compact workspace navigation. */
${login('precision')} [data-hanko-slot=header]{padding-inline-start:55px}
${login('precision')} [data-hanko-slot=aside]{padding-inline-start:55px}
${login('precision')} [data-hanko-slot=form]{border:1px solid var(--hf-line);border-radius:9px}
${login('precision')} [data-hanko-slot=form] input{background:color-mix(in srgb,var(--hf-surface) 80%,var(--hf-fg))}
${application('precision')} [data-hanko-slot=nav]{background:color-mix(in srgb,var(--hf-bg) 94%,black)}
${application('precision')} [data-hanko-slot=nav] [aria-current]{background:color-mix(in srgb,var(--hf-accent) 15%,var(--hf-bg));color:var(--hf-accent)}
${application('precision')} [data-hanko-slot=form]{border-radius:7px}

/* Maison: warm editorial proportions and personal service. */
${login('maison')} [data-hanko-slot=header]{padding-inline-start:60px}
${login('maison')} [data-hanko-slot=aside]{padding-inline-start:60px}
${login('maison')} [data-hanko-slot=form]{border:1px solid var(--hf-line);border-radius:var(--hf-radius)}
${login('maison')} [data-hanko-slot=header] .content-heading{color:var(--hf-accent)}
${application('maison')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:84px auto auto auto 1fr auto}
${application('maison')} [data-hanko-slot=nav]{flex-direction:row;justify-content:center;padding:0 30px;background:none;border:0;border-bottom:1px solid var(--hf-line)}
${application('maison')} [data-hanko-slot=nav] button{padding:18px 15px;border-radius:0}
${application('maison')} [data-hanko-slot=nav] [aria-current]{background:none;border-bottom:2px solid var(--hf-accent)}
${application('maison')} [data-hanko-slot=header],${application('maison')} [data-hanko-slot=body]{max-width:1000px;width:100%;margin-inline:auto}
${application('maison')} [data-hanko-slot=form]{border:0;border-top:1px solid var(--hf-line);border-bottom:1px solid var(--hf-line);border-radius:0}

/* Signal: concentrated access and decisive contrast. */
${login('signal')}{grid-template-columns:1fr;grid-template-rows:84px auto auto 1fr 58px;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer'}
${login('signal')} [data-hanko-slot=header]{padding:28px 30px 16px;text-align:center;justify-items:center}
${login('signal')} [data-hanko-slot=aside]{padding:0 30px 6px;text-align:center;justify-items:center}
${login('signal')} [data-hanko-slot=aside] .content-text{font-size:12px!important;max-width:44ch}
${login('signal')} [data-hanko-slot=form]{max-width:355px!important;padding-top:20px!important;margin:0 25px 32px}
${login('signal')} [data-hanko-slot=form]>h2,${login('signal')} [data-hanko-slot=form]>h1{text-align:center;font-size:19px}
${login('signal')} [data-hanko-slot=form] .native-description{text-align:center}
${login('signal')} [data-hanko-slot=form] :is(.native-action,.hk-btn,[type=submit]){border-radius:30px;font-weight:700}
${application('signal')} [data-hanko-slot=nav] [aria-current]{background:var(--hf-accent);color:var(--hf-bg);border-radius:25px}
${application('signal')} [data-hanko-slot=header] :is(.content-heading,h2){font-weight:700!important;letter-spacing:-.05em}
${application('signal')} [data-hanko-slot=form]{border:0;border-top:1px solid var(--hf-line);border-bottom:1px solid var(--hf-line);border-radius:0}

/* Civique: a service header and clearly delineated information. */
${login('civique')} [data-hanko-slot=brand]{background:var(--hf-fg);color:var(--hf-surface)!important;border-bottom:5px solid var(--hf-accent)}
${login('civique')} [data-hanko-slot=form]{border-inline-start:1px solid var(--hf-line);border-radius:0}
${login('civique')} [data-hanko-slot=form] input{border-width:2px;border-radius:0}
${login('civique')} [data-hanko-slot=form] :is(.native-action,.hk-btn,[type=submit]){border-radius:0;box-shadow:0 3px 0 color-mix(in srgb,var(--hf-accent) 70%,black)}
${application('civique')} [data-hanko-slot=brand]{background:var(--hf-fg);color:var(--hf-surface)!important;border-bottom:4px solid var(--hf-accent)}
${application('civique')} [data-hanko-slot=nav] button{border-radius:0;border-inline-start:3px solid transparent}
${application('civique')} [data-hanko-slot=nav] [aria-current]{border-inline-start-color:var(--hf-accent)}
${application('civique')} [data-hanko-slot=form]{border:0;border-top:3px solid var(--hf-fg);border-radius:0}

/* Édition: masthead, typographic rules and a journal rhythm. */
${login('edition')} [data-hanko-slot=brand],${application('edition')} [data-hanko-slot=brand]{font-size:44px!important;letter-spacing:-2px;border-bottom:3px double var(--hf-fg)}
${login('edition')} [data-hanko-slot=header]{padding-top:36px}
${login('edition')} [data-hanko-slot=form]{border-top:4px solid var(--hf-fg);border-radius:0}
${login('edition')} [data-hanko-slot=footer]{border-top:3px double var(--hf-fg)}
${application('edition')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:90px auto auto auto 1fr auto}
${application('edition')} [data-hanko-slot=nav]{flex-direction:row;border:0;border-bottom:1px solid var(--hf-fg);background:none;padding:0 36px}
${application('edition')} [data-hanko-slot=nav] button{border-radius:0;padding:18px 15px}
${application('edition')} [data-hanko-slot=nav] [aria-current]{background:none;color:var(--hf-accent);border-bottom:2px solid var(--hf-accent)}
${application('edition')} [data-hanko-slot=form]{border:0;border-top:3px solid var(--hf-fg);border-radius:0}
${application('edition')} [data-hanko-slot=form] form{grid-template-columns:1fr 1fr;gap:24px}
${application('edition')} [data-hanko-slot=form] form>:not(.native-field){grid-column:1/-1}

/* Rituel: centered, soft, and spacious. */
${login('rituel')}{grid-template-columns:1fr;grid-template-rows:84px auto auto 1fr 58px;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer'}
${login('rituel')} [data-hanko-slot=header]{padding:24px 30px 14px;text-align:center;justify-items:center}
${login('rituel')} [data-hanko-slot=header] :is(.content-heading,h2){font-size:44px!important}
${login('rituel')} [data-hanko-slot=aside]{padding:0 30px 22px;text-align:center;justify-items:center}
${login('rituel')} [data-hanko-slot=aside] .content-text{font-size:12px!important}
${login('rituel')} [data-hanko-slot=form]{border:1px solid var(--hf-line);border-radius:24px;max-width:410px!important;margin:0 25px 32px}
${login('rituel')} [data-hanko-slot=form]>h2,${login('rituel')} [data-hanko-slot=form]>h1{text-align:center;font-family:inherit;font-size:22px}
${login('rituel')} [data-hanko-slot=form] .native-description{text-align:center}
${login('rituel')} [data-hanko-slot=form] :is(.native-action,.hk-btn,[type=submit]){border-radius:30px}
${application('rituel')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:84px auto auto auto 1fr auto}
${application('rituel')} [data-hanko-slot=nav]{flex-direction:row;justify-self:center;border:0;border-radius:30px;padding:5px;background:color-mix(in srgb,var(--hf-accent) 9%,var(--hf-bg))}
${application('rituel')} [data-hanko-slot=nav] button{border-radius:30px}
${application('rituel')} [data-hanko-slot=nav] [aria-current]{background:var(--hf-surface)}
${application('rituel')} [data-hanko-slot=header]{text-align:center;justify-items:center}
${application('rituel')} [data-hanko-slot=body]{max-width:900px;width:100%;margin-inline:auto}
${application('rituel')} [data-hanko-slot=form]{border-radius:24px}

/* Terminal: reversed entry and precise monochrome details. */
${login('terminal')}{grid-template-areas:'brand brand' 'form header' 'form aside' 'footer footer';grid-template-columns:minmax(300px,1fr) minmax(0,1fr)}
${login('terminal')} [data-hanko-slot=header],${login('terminal')} [data-hanko-slot=aside]{border-inline-start:1px solid var(--hf-line);padding-inline-start:44px}
${login('terminal')} [data-hanko-slot=header] .content-text{font-family:monospace;font-size:9px!important}
${login('terminal')} [data-hanko-slot=form]{max-width:365px!important}
${application('terminal')} [data-hanko-slot=brand]{background:var(--hf-fg);color:var(--hf-surface)!important}
${application('terminal')} [data-hanko-slot=nav] button{font-family:monospace;font-size:11px}
${application('terminal')} [data-hanko-slot=nav] [aria-current]{background:var(--hf-surface);border:1px solid var(--hf-line)}
${application('terminal')} [data-hanko-slot=form]{border-radius:5px}

/* Comptoir and Mouvement: form on the left, a full-height brand panel on the right. */
${login('comptoir')},${login('mouvement')}{grid-template-areas:'brand brand' 'form header' 'form aside' 'footer footer';grid-template-columns:minmax(300px,1fr) minmax(0,1fr)}
${login('comptoir')} [data-hanko-slot=header],${login('comptoir')} [data-hanko-slot=aside]{background:color-mix(in srgb,var(--hf-accent) 15%,var(--hf-bg));padding-inline:50px}
${login('comptoir')} [data-hanko-slot=header]{height:100%;align-content:end}
${login('comptoir')} [data-hanko-slot=aside]{height:100%;align-content:start;padding-bottom:50px}
${login('mouvement')} [data-hanko-slot=header],${login('mouvement')} [data-hanko-slot=aside]{background:var(--hf-accent);padding-inline:44px}
${login('mouvement')} [data-hanko-slot=header]{height:100%;align-content:end}
${login('mouvement')} [data-hanko-slot=aside]{height:100%;padding-top:15px;align-content:start}
${login('mouvement')} [data-hanko-slot=form]>h2,${login('mouvement')} [data-hanko-slot=form]>h1{font-size:38px;text-transform:uppercase}
${application('comptoir')}{grid-template-columns:1fr;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';grid-template-rows:84px auto auto auto 1fr auto}
${application('comptoir')} [data-hanko-slot=nav]{flex-direction:row;background:var(--hf-surface);border:0;border-bottom:1px solid var(--hf-line);padding:0 36px}
${application('comptoir')} [data-hanko-slot=nav] button{border-radius:0;padding:18px 14px}
${application('comptoir')} [data-hanko-slot=nav] [aria-current]{background:none;border-bottom:2px solid var(--hf-accent)}
${application('comptoir')} [data-hanko-slot=body]{max-width:1000px;width:100%;margin-inline:auto}
${application('mouvement')} [data-hanko-slot=brand]{border-bottom:3px solid var(--hf-accent)}
${application('mouvement')} [data-hanko-slot=nav] [aria-current]{background:var(--hf-accent);color:var(--hf-surface);border-radius:0}
${application('mouvement')} [data-hanko-slot=header] :is(.content-heading,h2){font-size:54px!important;text-transform:uppercase}
${application('mouvement')} [data-hanko-slot=form]{border:0;border-top:3px solid var(--hf-fg);border-radius:0}

/* Folio: the brand becomes a studio rail. */
${login('folio')}{grid-template-columns:130px minmax(0,1fr) minmax(300px,.8fr);grid-template-rows:1fr auto;grid-template-areas:'brand header form' 'brand aside form' 'brand footer footer';min-height:740px}
${login('folio')} [data-hanko-slot=brand]{align-self:stretch;align-items:start;background:var(--hf-accent);color:var(--hf-surface)!important;writing-mode:vertical-rl;padding:35px 32px;justify-content:start!important;font-family:inherit}
${login('folio')} [data-hanko-slot=header]{padding:40px 30px 15px}
${login('folio')} [data-hanko-slot=aside]{padding:0 30px 55px}
${login('folio')} [data-hanko-slot=form]{border:1px solid var(--hf-line);box-shadow:6px 6px 0 color-mix(in srgb,var(--hf-accent) 14%,var(--hf-bg));margin:40px 25px;max-width:360px!important}
${application('folio')} [data-hanko-slot=nav]{background:var(--hf-accent)}
${application('folio')} [data-hanko-slot=nav] button{color:var(--hf-surface);font-size:11px;border-radius:0}
${application('folio')} [data-hanko-slot=nav] [aria-current]{background:var(--hf-bg);color:var(--hf-accent)}
${application('folio')} [data-hanko-slot=form]{box-shadow:6px 6px 0 color-mix(in srgb,var(--hf-accent) 15%,var(--hf-bg));border-radius:0}

/* Patrimoine: a private ivory entry on a deep green ground. */
${login('patrimoine')}{grid-template-columns:1fr;grid-template-rows:84px auto auto 1fr 58px;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer'}
${login('patrimoine')} [data-hanko-slot=brand]{font-family:var(--hf-display);font-size:33px!important;font-weight:400}
${login('patrimoine')} [data-hanko-slot=header]{padding:26px 30px 14px;text-align:center;justify-items:center}
${login('patrimoine')} [data-hanko-slot=header] :is(.content-heading,h2){font-size:43px!important}
${login('patrimoine')} [data-hanko-slot=aside]{padding:0 30px 22px;text-align:center;justify-items:center}
${login('patrimoine')} [data-hanko-slot=aside] .content-text{font-size:12px!important}
${login('patrimoine')} [data-hanko-slot=form]{max-width:400px!important;margin:0 25px 32px;border:1px solid #b5a680;box-shadow:0 12px 35px #0a1e1326;border-radius:0}
${login('patrimoine')} [data-hanko-slot=form]>h2,${login('patrimoine')} [data-hanko-slot=form]>h1{text-align:center;font-size:29px}
${login('patrimoine')} [data-hanko-slot=form] .native-description{text-align:center}
${application('patrimoine')} [data-hanko-slot=nav]{background:var(--hf-accent)}
${application('patrimoine')} [data-hanko-slot=nav] button{color:var(--hf-surface);font-family:var(--hf-display);font-size:17px;border-radius:0}
${application('patrimoine')} [data-hanko-slot=nav] [aria-current]{background:color-mix(in srgb,var(--hf-surface) 12%,transparent);color:var(--hf-surface)}
${application('patrimoine')} [data-hanko-slot=form]{border:0;border-top:1px solid var(--hf-line);border-bottom:1px solid var(--hf-line);border-radius:0}

@container hanko-screen (max-width:760px){
 ${all}[data-hanko-family=login]{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'brand' 'header' 'aside' 'form' 'footer';min-height:0;display:grid;padding:0}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]){grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'brand' 'nav' 'header' 'subnav' 'body' 'footer';min-height:0;display:grid;padding:0}
 ${all} [data-hanko-slot=brand]{min-height:74px;padding:22px 25px;writing-mode:horizontal-tb;font-size:28px!important}
 ${all}[data-hanko-family=login] [data-hanko-slot=header]{padding:30px 25px 18px;align-self:start;height:auto;min-height:0}
 ${all}[data-hanko-family=login] [data-hanko-slot=header] :is(.content-heading,h2){font-size:40px!important;white-space:normal!important;line-height:1.05!important}
 ${all}[data-hanko-family=login] [data-hanko-slot=header] :is(.content-text,p){font-size:8px!important}
 ${all}[data-hanko-family=login] [data-hanko-slot=aside]{padding:0 25px 26px;align-self:start;height:auto;border-inline-start:0}
 ${all}[data-hanko-family=login] [data-hanko-slot=aside] :is(.content-text,p){font-size:12px!important;line-height:1.7!important}
 ${all}[data-hanko-family=login] [data-hanko-slot=aside] .content-text:empty{display:none}
 ${all}[data-hanko-family=login] [data-hanko-slot=form]{max-width:calc(100% - 40px)!important;width:calc(100% - 40px);margin:0 20px 30px;padding:26px!important;border-radius:var(--hf-radius)}
 ${all}[data-hanko-family=login] [data-hanko-slot=form]>h2,${all}[data-hanko-family=login] [data-hanko-slot=form]>h1{font-size:25px}
 ${all} [data-hanko-slot=footer]{padding:18px 25px}
 ${all} [data-hanko-slot=footer] :is(.content-text,p){font-size:9px!important}
 ${all} [data-hanko-slot=nav]{flex-direction:row;flex-wrap:wrap;border-inline-end:0;border-bottom:1px solid var(--hf-line);padding:7px 14px;margin:0;gap:3px;justify-self:stretch;border-radius:0;justify-content:start}
 ${all} [data-hanko-slot=nav] button{padding:12px 10px;font-size:11px}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=header]{padding:28px 24px 22px}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=header] :is(.content-heading,h2){font-size:34px!important}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=body]{padding:0 20px 25px;display:flex!important;gap:18px}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=form]{padding:23px!important}
 ${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=form]>h2,${all}:is([data-hanko-family=account],[data-hanko-family=admin]) [data-hanko-slot=form]>h1{font-size:24px}
 ${all} [data-hanko-slot=form] input{min-height:45px}
 ${all} .security-row{gap:14px;align-items:flex-start;flex-wrap:wrap}
 ${all} .security-action{font-size:11px}
 ${login('folio')} [data-hanko-slot=brand]{background:var(--hf-accent);align-items:center;padding:25px}
 ${login('folio')} [data-hanko-slot=form]{box-shadow:4px 4px 0 color-mix(in srgb,var(--hf-accent) 14%,var(--hf-bg))}
 ${login('mouvement')} [data-hanko-slot=header] :is(.content-heading,h2){font-size:59px!important}
 ${login('rituel')} [data-hanko-slot=form],${login('patrimoine')} [data-hanko-slot=form]{margin-top:0}
 ${application('edition')} [data-hanko-slot=form] form{grid-template-columns:1fr;gap:17px}
}
`;
