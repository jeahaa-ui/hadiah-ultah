const $=s=>document.querySelector(s);
const fotos=[
 ["foto1","Berdua dengan batik 🍎"],["foto2","Tugas PPLG bareng"],["foto3","Penari paling cantik 💃"],
 ["foto4","Jalan-jalan di Bali"],["foto5","Taman bunga 🌸"],["foto6","Pura di tepi danau"],
 ["foto7","Langit cerah, hati cerah"],["foto8","Gaya andalanku"],["foto9","Cantik berseri ✨"],
 ["foto10","Malam yang hangat"],["foto11","Selfie favorit 😚"],["foto12","Seragam kita 💙"]
];
const pesan="Hari ini hari spesialmu. Terima kasih sudah sabar, sudah ada, dan selalu membuatku tersenyum. Aku harap tahun ini penuh bahagia, sehat, dan semua mimpimu pelan-pelan jadi nyata. Aku sayang kamu. 💕";

/* ---------- efek partikel: bunga & love ---------- */
const cv=$('#fx'),cx=cv.getContext('2d');let P=[],W,H;
function ukuran(){const d=devicePixelRatio||1;W=cv.width=innerWidth*d;H=cv.height=innerHeight*d;cx.setTransform(d,0,0,d,0,0)}
addEventListener('resize',ukuran);ukuran();
const emo=['🌸','🌷','🌹','💖','💕','🌺','💗','✨'];
function buat(x,y,burst){P.push({x,y,e:emo[Math.random()*emo.length|0],s:14+Math.random()*20,
 vx:burst?(Math.random()-.5)*7:(Math.random()-.5)*.6,vy:burst?-Math.random()*7-2:.6+Math.random()*1.2,
 g:burst?.18:0,r:Math.random()*6,vr:(Math.random()-.5)*.05,life:burst?90:9999,a:1,ph:Math.random()*9})}
function loop(){cx.clearRect(0,0,innerWidth,innerHeight);
 if(P.length<38&&Math.random()<.12)buat(Math.random()*innerWidth,-30);
 P=P.filter(p=>{p.vy+=p.g;p.x+=p.vx+Math.sin(p.ph+=.03)*.5;p.y+=p.vy;p.r+=p.vr;p.life--;
  if(p.life<20)p.a=p.life/20;cx.save();cx.globalAlpha=Math.max(p.a,0);cx.translate(p.x,p.y);cx.rotate(p.r);
  cx.font=p.s+'px serif';cx.fillText(p.e,-p.s/2,p.s/2);cx.restore();return p.y<innerHeight+40&&p.life>0});
 requestAnimationFrame(loop)}
loop();
function ledakan(x,y,n=26){for(let i=0;i<n;i++)buat(x,y,true)}
addEventListener('pointerdown',e=>{if(!e.target.closest('.pol,.lightbox'))ledakan(e.clientX,e.clientY,8)});

/* ---------- navigasi halaman ---------- */
function ke(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');scrollTo(0,0)}

/* ---------- halaman 1: terima / tolak ---------- */
let tolak=0;
const kata=["Yakin nggak mau? 🥺","Harus terima hadiah! 😤","Tolaknya nggak boleh, harus terima hadiah ya sayang 💕","Tombol tolak sudah nyerah… terima aja ya 🎁"];
$('#tolak').onclick=()=>{
  tolak++;$('#gateText').textContent=kata[Math.min(tolak-1,kata.length-1)];
  $('#terima').style.transform=`scale(${1+tolak*.25})`;
  const t=$('#tolak');t.style.transform=`scale(${Math.max(.2,1-tolak*.2)}) translateX(${tolak%2?-14:14}px)`;
  if(tolak>=4){t.style.visibility='hidden'}
  ledakan(innerWidth/2,innerHeight/2,10);
  navigator.vibrate&&navigator.vibrate(60);
};
$('#terima').onclick=()=>{
  $('#kado').classList.add('buka');ledakan(innerWidth/2,innerHeight/2,60);
  setTimeout(()=>{ke('#ucapan');ketik();ledakan(innerWidth/2,innerHeight/3,50)},1100);
};
$('#kado').onclick=()=>ledakan(innerWidth/2,innerHeight/2.4,14);

/* ---------- halaman 2: ketik ucapan ---------- */
function ketik(){const el=$('#ketik');el.textContent='';let i=0;
 const t=setInterval(()=>{el.textContent+=pesan[i++];if(i>=pesan.length)clearInterval(t)},45)}
$('#bukaAlbum').onclick=()=>{ke('#album');ledakan(innerWidth/2,innerHeight*.6,40)};

/* ---------- halaman 3: album ---------- */
const grid=$('#grid');
fotos.forEach(([f,cap],i)=>{
 const d=document.createElement('div');d.className='pol';
 d.style.cssText=`--r:${(Math.random()*8-4).toFixed(1)}deg;--d:${(2.4+Math.random()*2).toFixed(1)}s;--w:${(i*.12).toFixed(2)}s`;
 d.innerHTML=`<img src="assets/foto/${f}.jpg" alt="${cap}" loading="lazy"><span>${cap}</span>`;
 d.onclick=e=>{ledakan(e.clientX,e.clientY,14);buka(i)};grid.appendChild(d)});
let cur=0;
function buka(i){cur=(i+fotos.length)%fotos.length;$('#lbImg').src=`assets/foto/${fotos[cur][0]}.jpg`;$('#lbCap').textContent=fotos[cur][1];$('#lightbox').hidden=false}
$('#tutup').onclick=()=>$('#lightbox').hidden=true;
$('#prev').onclick=()=>buka(cur-1);$('#next').onclick=()=>buka(cur+1);
let sx=0;const lb=$('#lightbox');
lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX);
lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)buka(cur+(dx<0?1:-1))});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='ArrowRight')buka(cur+1);if(e.key==='ArrowLeft')buka(cur-1);if(e.key==='Escape')lb.hidden=true});
$('#ulang').onclick=()=>location.reload();
