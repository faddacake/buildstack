import {tools,useCases,comparisons} from '../data.js'; import {pageLastmod} from '../lib.js';
export const PATHS=()=>['/','/use-cases/','/tools/','/compare/','/news/','/methodology/','/advertise/','/about/',...useCases.map(u=>`/use-cases/${u.slug}/`),...comparisons.map(c=>`/compare/${c.slug}/`),...tools.map(t=>`/tools/${t.slug}/`),'/llms.txt','/llms-full.txt','/news/feed.xml'];
export function GET({site}){const paths=PATHS();
const x=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`<url><loc>${new URL(p,site).href}</loc><lastmod>${pageLastmod(p)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
return new Response(x,{headers:{'Content-Type':'application/xml'}});}
