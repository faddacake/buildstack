import {tools,useCases,comparisons,UPDATED} from '../data.js';
export function GET({site}){const paths=['/','/use-cases/','/tools/','/compare/','/news/','/methodology/','/advertise/',...useCases.map(u=>`/use-cases/${u.slug}/`),...comparisons.map(c=>`/compare/${c.slug}/`),...tools.map(t=>`/tools/${t.slug}/`),'/llms.txt','/llms-full.txt'];
const x=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`<url><loc>${new URL(p,site).href}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}\n</urlset>\n`;
return new Response(x,{headers:{'Content-Type':'application/xml'}});}
