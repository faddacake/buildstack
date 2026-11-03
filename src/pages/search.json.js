import {tools,useCases,comparisons} from '../lib.js';
export function GET(){const idx=[...useCases.map(u=>({t:u.title,u:`/use-cases/${u.slug}/`,y:'Ruling',k:u.short})),...comparisons.map(c=>({t:c.title,u:`/compare/${c.slug}/`,y:'Compare'})),...tools.map(t=>({t:t.name,u:`/tools/${t.slug}/`,y:'Tool',k:`${t.cat} ${(t.aka||[]).join(' ')}`})),{t:'The Record',u:'/news/',y:'Page'},{t:'How we rank',u:'/methodology/',y:'Page'},{t:'Advertise',u:'/advertise/',y:'Page'},{t:'About',u:'/about/',y:'Page'}];
return new Response(JSON.stringify(idx),{headers:{'Content-Type':'application/json'}});}
