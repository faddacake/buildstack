import {toolBy,casesFor,useCases,UPDATED} from './data.js';
export const abs=(p,site)=>new URL(p,site).href;
export const breadcrumb=(site,items)=>({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:abs(path,site)}))});
export const faqLd=faqs=>({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))});
export const notForSale={q:'Are BuildJury rankings paid placements?',a:'No. BuildJury verdicts are independent and rankings are never for sale. Any sponsored placement is always labeled "Sponsored" and does not affect rank.'};
export const useCaseFaqs=u=>{const l=u.rank.map(s=>toolBy[s]);return [
 {q:`What is the best tool for ${u.short.toLowerCase()} in 2026?`,a:`BuildJury's current #1 for ${u.short.toLowerCase()} is ${l[0].name}: ${l[0].desc} Runners-up: ${l.slice(1,4).map(t=>t.name).join(', ')}.`},
 {q:`What are the main alternatives to ${l[0].name} for ${u.short.toLowerCase()}?`,a:`The other ranked options are ${l.slice(1).map((t,i)=>`#${i+2} ${t.name} (${t.cat})`).join('; ')}.`},
 {q:'How current is this ranking?',a:`This ranking was last reviewed on ${UPDATED}. Pricing is only stated when confirmed on the vendor's official pricing page; otherwise we link to the official site.`},
 notForSale];};
export const toolFaqs=t=>{const cs=casesFor(t.slug);return [
 {q:`What is ${t.name}?`,a:`${t.name} is a ${t.cat.toLowerCase()}. ${t.desc}`},
 {q:`How much does ${t.name} cost?`,a:`${t.price}. BuildJury only states prices confirmed on the official pricing page; check ${t.url} for current plans.`},
 {q:`What is ${t.name} best for?`,a:cs.length?`BuildJury ranks ${t.name} for: ${cs.map(u=>`${u.short} (#${u.rank.indexOf(t.slug)+1})`).join(', ')}.`:`${t.name} is tracked by BuildJury but not currently ranked in a use case.`},
 {q:`What are the downsides of ${t.name}?`,a:t.cons.join('. ')+'.'}];};
export const compareFaqs=c=>{const A=toolBy[c.a],B=toolBy[c.b];return [
 {q:`Which is better, ${A.name} or ${B.name}?`,a:c.verdict},
 {q:`When should I choose ${A.name}?`,a:c.chooseA.join('. ')+'.'},
 {q:`When should I choose ${B.name}?`,a:c.chooseB.join('. ')+'.'},
 {q:`How much do ${A.name} and ${B.name} cost?`,a:`${A.name}: ${A.price}. ${B.name}: ${B.price}. BuildJury only states prices confirmed on official pricing pages.`}];};
export const softwareLd=(t,site)=>({'@context':'https://schema.org','@type':'SoftwareApplication',name:t.name,...(t.aka?{alternateName:t.aka}:{}),applicationCategory:'DeveloperApplication',url:t.url,sameAs:t.url,description:t.desc,mainEntityOfPage:abs(`/tools/${t.slug}/`,site)});
