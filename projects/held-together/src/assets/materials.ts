import * as T from 'three';
let seed=93472;function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
export function skinMaps(){seed=93472;const c=document.createElement('canvas');c.width=1024;c.height=2048;const x=c.getContext('2d')!;x.fillStyle='#c58c6c';x.fillRect(0,0,c.width,c.height);
for(let i=0;i<16000;i++){const a=rand()*1024,b=rand()*2048,r=rand()*5+.4;x.fillStyle=rand()>.5?'rgba(246,199,168,.045)':'rgba(101,58,41,.04)';x.beginPath();x.ellipse(a,b,r,r*.65,0,0,7);x.fill()}
for(let i=0;i<110000;i++){const a=rand()*1024,b=rand()*2048;x.fillStyle=rand()>.5?'rgba(255,222,194,.12)':'rgba(83,48,36,.085)';x.fillRect(a,b,.7+rand(),.8+rand())}
for(let i=0;i<140;i++){const a=rand()*1024,b=rand()*2048;x.strokeStyle='rgba(68,46,34,.12)';x.lineWidth=.7;x.beginPath();x.moveTo(a,b);x.quadraticCurveTo(a+2,b-3,a+3,b-7);x.stroke()}
const color=new T.CanvasTexture(c);color.colorSpace=T.SRGBColorSpace;color.anisotropy=8;const bump=new T.CanvasTexture(c);bump.anisotropy=4;return {color,bump}}
