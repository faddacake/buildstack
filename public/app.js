(function(){
var S={get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var root=document.documentElement;
// theme
var th=$('#theme');if(th){var cur='system';try{cur=localStorage.getItem('bj_theme')||'system'}catch(e){}th.value=cur;th.onchange=function(){var v=th.value;try{localStorage.setItem('bj_theme',v)}catch(e){}if(v==='system')delete root.dataset.theme;else root.dataset.theme=v}}
// menu
var mb=$('[data-menu]'),nav=$('#nav');if(mb)mb.onclick=function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
// sponsor strip
var ds=$('[data-dismiss-strip]');if(ds)ds.onclick=function(){try{localStorage.setItem('bj_strip_until',Date.now()+7*864e5)}catch(e){}root.classList.add('strip-off')};
// watchlist
var watch=S.get('bj_watch',[]);if(!Array.isArray(watch))watch=[];
function paintWatch(){$$('[data-watch]').forEach(function(b){var on=watch.indexOf(b.dataset.watch)>-1;b.classList.add('js-on');b.setAttribute('aria-pressed',on);b.textContent=(on?'★ Watching':'☆ Watch')+(b.dataset.label?' '+b.dataset.label:'')})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-watch]');if(!b)return;var s=b.dataset.watch,i=watch.indexOf(s);if(i>-1)watch.splice(i,1);else watch.push(s);S.set('bj_watch',watch);paintWatch();filterRecord()});
paintWatch();
// record filters
var params=new URLSearchParams(location.search),rf='all';
function filterRecord(){var since=params.get('since'),tool=params.get('tool');$$('[data-rec] li').forEach(function(li){var ok=(rf==='all'||(rf==='watching'?watch.indexOf(li.dataset.tool)>-1:li.dataset.tag===rf));if(since&&li.dataset.date<=since)ok=false;if(tool&&li.dataset.tool!==tool)ok=false;li.hidden=!ok});var empty=$('[data-rec-empty]');if(empty)empty.hidden=$$('[data-rec] li').some(function(l){return !l.hidden})}
$$('[data-recf]').forEach(function(b){b.hidden=false;b.onclick=function(){rf=b.dataset.recf;$$('[data-recf]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});filterRecord()}});
var fn=$('[data-rec-note]');if(fn&&(params.get('since')||params.get('tool'))){fn.hidden=false;fn.firstChild.textContent=params.get('since')?'Showing updates since '+params.get('since')+'. ':'Showing updates for '+params.get('tool')+'. '}
filterRecord();
// last visit bar
var lb=$('[data-lastbar]');var lv=S.get('bj_lastVisit',null);
if(lb){var dates=JSON.parse(lb.dataset.items||'[]');if(lv){var n=dates.filter(function(d){return d[0]>lv}),sec=n.filter(function(d){return d[1]==='security'}).length;if(n.length){lb.innerHTML='<a href="/news/?since='+lv+'">'+n.length+' update'+(n.length>1?'s':'')+' since '+lv+(sec?', including '+sec+' security notice'+(sec>1?'s':''):'')+' →</a>'}else lb.textContent='No new updates since your last visit on '+lv+'.'}lb.hidden=false}
S.set('bj_lastVisit',new Date().toISOString().slice(0,10));
// use-case picker
var pd=$('#picker-data');if(pd){var P=JSON.parse(pd.textContent),panel=$('#vpanel');
function show(slug,save){var u=P[slug];if(!u)return;$('[data-v-title]',panel).textContent=u.title;var top=$('[data-v-top]',panel);top.innerHTML='';u.top.forEach(function(t,i){var li=document.createElement('li');li.innerHTML='<span class="rk">'+(i+1)+'</span><div><a href="/tools/'+t.s+'/"><strong></strong></a><div class="small muted"></div></div>';$('strong',li).textContent=t.n;$('.muted',li).textContent=t.d;top.appendChild(li)});
var rest=$('[data-v-rest]',panel);rest.textContent=u.rest.length?'Also ranked: '+u.rest.map(function(t,i){return '#'+(i+4)+' '+t}).join(' · '):'';$('[data-v-link]',panel).href='/use-cases/'+slug+'/';
$$('[data-pick]').forEach(function(c){c.removeAttribute('aria-current');c.setAttribute('aria-pressed',c.dataset.pick===slug)});if(save)S.set('bj_usecase',slug)}
$$('[data-pick]').forEach(function(c){c.setAttribute('role','button');c.addEventListener('click',function(e){e.preventDefault();show(c.dataset.pick,true)})});
var saved=S.get('bj_usecase',null);show(P[saved]?saved:pd.dataset.default,false)}
// compare builder
$$('[data-cb]').forEach(function(f){var pairs=JSON.parse(f.dataset.pairs),out=$('[data-cb-out]',f);f.addEventListener('submit',function(e){e.preventDefault();var a=f.a.value,b=f.b.value;if(!a||!b||a===b){out.textContent='Pick two different tools.';return}var hit=pairs[a+'|'+b]||pairs[b+'|'+a];if(hit){location.href='/compare/'+hit+'/';return}
out.innerHTML='No head-to-head yet. <a class="btn" href="mailto:'+f.dataset.mail+'?subject='+encodeURIComponent('Comparison request: '+a+' vs '+b)+'">Request this comparison</a>'})});
// command palette
var pal=$('#pal'),q=$('#palq'),res=$('#palr'),idx=null,sel=0;
function load(){if(idx)return Promise.resolve(idx);return fetch('/search.json').then(function(r){return r.json()}).then(function(j){idx=j;return j})}
function render(){var v=q.value.toLowerCase().trim();var items=(idx||[]).filter(function(i){return !v||i.t.toLowerCase().indexOf(v)>-1||(i.k||'').toLowerCase().indexOf(v)>-1}).slice(0,12);sel=0;res.innerHTML='';items.forEach(function(i,n){var li=document.createElement('li'),a=document.createElement('a');a.href=i.u;a.setAttribute('role','option');a.innerHTML='<span class="mono small muted"></span> ';a.firstChild.textContent=i.y;a.appendChild(document.createTextNode(i.t));if(n===0)a.setAttribute('aria-selected','true');li.appendChild(a);res.appendChild(li)})}
function open(){if(!pal||!pal.showModal)return false;pal.showModal();q.value='';load().then(render);setTimeout(function(){q.focus()},0);return true}
$$('[data-palette]').forEach(function(b){b.addEventListener('click',function(e){if(open())e.preventDefault()})});
if(q){q.addEventListener('input',render);q.addEventListener('keydown',function(e){var as=$$('a',res);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!as.length)return;as[sel].removeAttribute('aria-selected');sel=(sel+(e.key==='ArrowDown'?1:-1)+as.length)%as.length;as[sel].setAttribute('aria-selected','true');as[sel].scrollIntoView({block:'nearest'})}if(e.key==='Enter'&&as[sel]){e.preventDefault();location.href=as[sel].href}})}
document.addEventListener('keydown',function(e){var tag=(e.target.tagName||'').toLowerCase();if(((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k')||(e.key==='/'&&tag!=='input'&&tag!=='textarea'&&tag!=='select')){e.preventDefault();open()}});
// tools filter ?q=
var tq=$('#toolq');if(tq){var apply=function(){var v=tq.value.toLowerCase();$$('[data-tool-card]').forEach(function(c){c.hidden=v&&c.dataset.k.indexOf(v)===-1})};tq.value=params.get('q')||'';tq.addEventListener('input',apply);apply()}
})();
// Load the beehiiv form when the newsletter panel nears the viewport (keeps third-party JS off the critical path).
(function(){var slot=document.getElementById('bh-slot');if(!slot)return;var done=false;function go(){if(done)return;done=true;var s=document.createElement('script');s.async=true;s.src=slot.dataset.beehiivSrc;s.setAttribute('data-beehiiv-form',slot.dataset.beehiivForm);slot.appendChild(s);var a=document.createElement('script');a.async=true;a.src='https://subscribe-forms.beehiiv.com/attribution.js';document.body.appendChild(a)}
if(location.hash==='#friday-verdict')go();if('IntersectionObserver' in window){var io=new IntersectionObserver(function(e){if(e.some(function(x){return x.isIntersecting})){go();io.disconnect()}},{rootMargin:'600px'});io.observe(slot)}else go();
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#friday-verdict"]');if(a)go()})})();
