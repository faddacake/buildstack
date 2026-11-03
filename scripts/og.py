import json,sys,os
from PIL import Image,ImageDraw,ImageFont
G='/usr/share/fonts/truetype/sand-box/google/'
def var(path,size,**ax):
    f=ImageFont.truetype(G+path,size)
    try:
        axes=f.get_variation_axes(); vals=[]
        for a in axes:
            nm=a['name'].decode() if isinstance(a['name'],bytes) else a['name']
            vals.append(ax.get(nm.lower()[:4],a['default']))
        f.set_variation_by_axes(vals)
    except Exception as e: pass
    return f
D=json.load(sys.stdin); out=sys.argv[1]
disp=lambda s:var('Bricolage Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf',s,weig=800)
body=lambda s:var('Instrument Sans/InstrumentSans-VariableFont_wdth,wght.ttf',s,weig=500)
mono=lambda s:var('JetBrains Mono/JetBrainsMono-VariableFont_wght.ttf',s,weig=700)
BG=(245,246,248);INK=(18,22,31);RED=(180,35,47);MUT=(91,99,114)
def wrap(d,t,f,w):
    words=t.split();lines=[];cur=''
    for x in words:
        tr=(cur+' '+x).strip()
        if d.textlength(tr,font=f)<=w: cur=tr
        else: lines.append(cur);cur=x
    lines.append(cur);return lines
def card(key,title,tops,size=(1200,630),path=None):
    im=Image.new('RGB',size,BG);d=ImageDraw.Draw(im)
    d.rectangle([0,0,size[0],10],fill=RED)
    d.text((64,52),'Build',font=disp(44),fill=INK);w=d.textlength('Build',font=disp(44));d.text((64+w,52),'Jury',font=disp(44),fill=RED)
    # stamp
    st=Image.new('RGBA',(420,70),(0,0,0,0));sd=ImageDraw.Draw(st);sd.rectangle([2,2,417,67],outline=RED,width=4);sd.text((22,16),f"VERDICT · {D['date']}",font=mono(28),fill=RED)
    st=st.rotate(2,expand=True,resample=Image.BICUBIC);im.paste(st,(size[0]-480,40),st)
    f=disp(64);lines=wrap(d,title,f,1070)
    if len(lines)>3: f=disp(52);lines=wrap(d,title,f,1070)[:3]
    y=170
    for l in lines: d.text((64,y),l,font=f,fill=INK);y+=f.size*1.12
    y+=20
    for i,t in enumerate(tops[:3]):
        if len(tops)>1 or i: d.text((64,y),f"#{i+1}" if not key.startswith('compare__') else ('A' if i==0 else 'B'),font=mono(34),fill=RED)
        d.text((150 if len(tops)>1 else 64,y+2),t,font=body(34),fill=INK);y+=50
    d.text((64,size[1]-64),'buildjury.com · Independent · Never for sale',font=mono(24),fill=MUT)
    im.save(path or os.path.join(out,key+'.png'),optimize=True)
for k,t,tops in D['pages']: card(k,t,tops)
# icons
for s,name in [(32,'favicon-32.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]:
    im=Image.new('RGB',(s,s),RED);d=ImageDraw.Draw(im);f=disp(int(s*.5));tw=d.textlength('BJ',font=f)
    d.text(((s-tw)/2,s*.18),'BJ',font=f,fill=(255,255,255));im.save(os.path.join(out,'..',name))
print(len(D['pages']),'og images')
