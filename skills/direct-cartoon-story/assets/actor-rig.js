import * as T from 'three';
import {Pen,blobPts,headBlob,faceFront,faceSide,INK} from './toon.js';
const cache=new Map(),skin='#f7dfce',TAU=Math.PI*2;
const clamp=t=>Math.max(0,Math.min(1,t));
const mix=(a,b,t)=>a+(b-a)*t;
function knee(a,b,l=175){let dx=b[0]-a[0],dy=b[1]-a[1],d=Math.min(l*2-.01,Math.hypot(dx,dy)),ang=Math.atan2(dy,dx)-Math.acos(d/(2*l));return[a[0]+Math.cos(ang)*l,a[1]+Math.sin(ang)*l]}
export function actorTexture(role,pose='stand',expr='neutral',phase=0,progress=0){
const key=[role,pose,expr,phase,Math.round(progress*12)].join(':');if(cache.has(key))return cache.get(key);
const c=document.createElement('canvas');c.width=480;c.height=800;const g=c.getContext('2d');g.scale(.8,.8);const p=new Pen(g);const runner=role==='fred'||role==='rival',side=pose==='run'||pose==='limp'||pose==='walk',official=role==='official',driver=role==='driver';let ph=phase/24,cy=270,hip=650,lean=0,bob=0;let feet=[[260,975],[340,975]],arms;
if(pose==='run'||pose==='limp'||pose==='walk'){
 const S=pose==='run'?280:140;let stance=(ph%1)<.5?ph*2:(ph-.5)*2;
 const plantedX=S/2-S*stance;hip=975-Math.sqrt(Math.max(1,340*340-plantedX*plantedX));bob=hip-650;cy+=bob;lean=pose==='run'?.12:pose==='walk'?.06:.22;
 feet=[0,.5].map(shift=>{let f=(ph+shift)%1;if(f<.5)return[300+S/2-S*(f*2),975];let u=(f-.5)*2;return[300-S/2+S*(u-Math.sin(TAU*u)/TAU),975-(pose==='run'?125:48)*Math.sin(Math.PI*u)]});
}
if(pose==='cramp'){hip=680;cy=315;lean=.26;feet=[[250,975],[370,975]]}
if(pose==='sit'||pose==='drive'){hip=750;cy=370;feet=[[430,905],[470,905]]}
if(pose==='step'){let u=clamp(progress);hip=650+100*u;cy=270+100*u;lean=.13*(1-u);feet=[[250+180*u,975-70*u],[340+130*u,975-180*Math.sin(Math.PI*u)-70*u]]}
if(pose==='slump'){hip=670;cy=300;lean=.09;feet=[[268,975],[340,975]]}
const headY=cy,chin=cy+108,shoulder=chin+28;
function limb(a,b,w=14,col=INK){p.stroke([a,b],w+4,INK);p.stroke([a,b],w,col)}
for(let i=0;i<2;i++){let h=[300+(i?18:-18),hip],k=pose==='sit'||pose==='drive'?[385,hip+30]:knee(h,feet[i]);limb(h,k,13,i?'#725754':'#947166');limb(k,feet[i],12,i?'#725754':'#947166');p.stroke([feet[i],[feet[i][0]+34,feet[i][1]-4]],21,runner?'#eee5d4':'#312b32');}
g.save();g.translate(300,hip);g.rotate(lean);g.translate(-300,-hip);
let sw=Math.sin(ph*TAU),left=[[230,shoulder],[210,shoulder+90],[215,shoulder+190]],right=[[370,shoulder],[390,shoulder+90],[385,shoulder+190]];
if(pose==='run'||pose==='limp'||pose==='walk'){left=[[250,shoulder],[250-sw*70,shoulder+115],[310-sw*120,shoulder+72]];right=[[350,shoulder],[350+sw*70,shoulder+115],[420+sw*100,shoulder+60]]}
if(pose==='cramp'){left=[[230,shoulder],[225,hip-25],[280,hip+90]];right=[[365,shoulder],[400,hip],[368,hip+100]]}
if(pose==='sit'){left=[[230,shoulder],[210,hip-60],[320,hip-10]];right=[[370,shoulder],[410,hip-55],[430,hip+10]]}
if(pose==='drive'){left=[[235,shoulder],[310,shoulder+120],[420,580]];right=[[365,shoulder],[420,shoulder+115],[450,580]]}
if(pose==='step'){left=[[235,shoulder],[220,shoulder+100],[260,hip-35]];right=[[365,shoulder],[430,shoulder+45],[455,shoulder+90]]}
if(pose==='cheer'){left=[[235,shoulder],[165,shoulder-55],[145,shoulder-170-18*Math.sin(ph*TAU)]];right=[[365,shoulder],[435,shoulder-55],[455,shoulder-170+18*Math.sin(ph*TAU)]]}
if(pose==='stop'){right=[[365,shoulder],[425,shoulder+5],[470,shoulder-45]]}
if(pose==='point'){right=[[365,shoulder],[440,shoulder+30],[510,shoulder+20]]}
if(pose==='clap'){let d=20+20*(1+Math.sin(ph*TAU));left=[[235,shoulder],[210,shoulder+100],[300-d,shoulder+100]];right=[[365,shoulder],[390,shoulder+100],[300+d,shoulder+100]]}
function arm(a,far=false){p.stroke(a,17,INK);p.stroke(a,11,far?'#b3948c':skin);p.dot(a[2][0],a[2][1],12,INK)}arm(left,true);
const jersey=runner?(role==='fred'?'#f7f0dd':'#628a9a'):official?'#43596a':driver?'#617b87':['#b16a53','#658372','#957293','#bd9e60'][[...role].reduce((a,b)=>a+b.charCodeAt(0),0)%4];
const torso=blobPts(300,(chin+hip)/2,{a:runner?76:90,b:(hip-chin)/2+12,nTop:2.2,nBot:2.4,egg:.09,asym:0,rot:0,noise:.005,seed:3});p.gradFill(torso,jersey,official?'#293e50':runner?'#d9cdc4':'#465d6d',-2.2);p.inkRing(torso,10,1.8);
if(runner){p.clip(torso,()=>p.band([[205,chin+40],[400,chin+40]],role==='fred'?'#ab4843':'#ddd1b6',22,0));p.poly([[225,hip-35],[375,hip-35],[375,hip+35],[315,hip+35],[300,hip+10],[285,hip+35],[225,hip+35]],'#3c3b43',7)}else{p.band([[300,chin+8],[300,hip-10]],official?'#263b4a':'#435c69',3,0);for(let y=chin+35;y<hip;y+=50)p.dot(320,y,4,'#dbbd82')}
arm(right);
const H=headBlob(6+[...role].reduce((a,b)=>a+b.charCodeAt(0),0)%7,111,side?1:0),hp=blobPts(300,headY,H);p.shadedFill(hp,skin,'#dbc3c1',-2.2,111);p.inkRing(hp,11,1.8);
// A clear, individual silhouette instead of identical hats on every character.
const top=hp.filter(([x,y])=>y<headY-45);p.poly([...top,[380,headY-52],[355,headY-35],[327,headY-58],[300,headY-40],[260,headY-56],[215,headY-40]],official?'#7b675b':driver?'#5f5244':'#493a34',7);
if(driver||official){p.ell(300,headY-75,124,22,official?'#9c8d6c':'#536975',6);p.poly([[200,headY-79],[212,headY-115],[330,headY-125],[402,headY-80]],official?'#c2b08a':'#6f8590',7)}
const blink=phase===23?1:0;if(side)faceSide(p,300,headY,222,expr,blink,false,skin);else faceFront(p,300,headY,222,expr,0,Math.sin(ph*TAU)*.3,blink,false,skin,driver?'#624435':undefined);
if(pose==='cramp'||pose==='limp'){for(let i=0;i<2;i++){let x=400+i*25,y=headY+30+((phase*6+i*28)%80);p.ell(x,y,5,9,'#a3d6e4',3)}}
g.restore();const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;cache.set(key,tex);return tex;
}
export function makeActor(parent,role,scale=1){const h=3.6,w=h*.6,g=new T.Group();parent.add(g);const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({transparent:true,alphaTest:.04,side:T.DoubleSide,map:actorTexture(role),color:'#fff5eb'}));g.add(m);const shc=document.createElement('canvas');shc.width=128;shc.height=64;let c=shc.getContext('2d'),r=c.createRadialGradient(64,32,2,64,32,60);r.addColorStop(0,'#29243a88');r.addColorStop(1,'#29243a00');c.fillStyle=r;c.fillRect(0,0,128,64);const sm=new T.Mesh(new T.PlaneGeometry(1.6,.8),new T.MeshBasicMaterial({map:new T.CanvasTexture(shc),transparent:true,depthWrite:false}));sm.rotation.x=-Math.PI/2;sm.position.y=.02;g.add(sm);g.scale.setScalar(scale);return{g,m,sm,role,h,scale};}
export function poseActor(a,camera,x,y,z,pose,expr,time,progress=0){a.g.visible=true;a.g.position.set(x,y+(y<.15?.055:0),z);a.m.material.map=actorTexture(a.role,pose,expr,Math.floor((((['run','limp','walk'].includes(pose)?x/(2*a.h*(pose==='run'?.280:.140)):time*(pose==='clap'?2.5:1))%1+1)%1)*24),progress);a.m.quaternion.copy(camera.quaternion);const up=new T.Vector3(0,1,0).applyQuaternion(camera.quaternion);a.m.position.copy(up.multiplyScalar(a.h*.485));a.sm.visible=!['sit','drive','step'].includes(pose);}
