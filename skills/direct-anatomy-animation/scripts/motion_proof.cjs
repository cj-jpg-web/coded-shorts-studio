// Diagnostic blockout, not finished anatomy art or a fluid simulation.
const fs=require('fs'),p=require('path'),{spawn}=require('child_process');
let canvas;try{canvas=require('@napi-rs/canvas')}catch{canvas=require(p.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'@napi-rs/canvas'))}
const{createCanvas,Path2D}=canvas,C=createCanvas(720,1280),g=C.getContext('2d');
const out=process.argv[2];if(!out)throw Error('Usage: node motion_proof.cjs /absolute/output-directory');fs.mkdirSync(out,{recursive:true});
const poly=[{x:310,y:360},{x:440,y:350},{x:550,y:430},{x:585,y:570},{x:560,y:735},{x:475,y:860},{x:310,y:885},{x:205,y:815},{x:155,y:690},{x:195,y:540},{x:290,y:470}],mask=new Path2D();
poly.forEach((q,i)=>i?mask.lineTo(q.x,q.y):mask.moveTo(q.x,q.y));mask.closePath();
function path(d,fill,stroke='#161616',w=4){const q=new Path2D(d);if(fill){g.fillStyle=fill;g.fill(q)}if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.stroke(q)}}
function text(s,x,y,size=26,col='#15272c'){g.font=`800 ${size}px sans-serif`;g.fillStyle=col;g.textAlign='center';g.fillText(s,x,y)}
async function main(){const m=await import('./motion_core.mjs');let leaks=0,maxGripError=0,maxLengthError=0;
 const foods=[];for(let k=0;k<20;k++){const x=225+(k%5)*64,y=630+Math.floor(k/5)*52,r=13+k%3*3;if(m.discContained({x,y},r+38,poly))foods.push({x,y,r,phase:k*.9})}
 function draw(t){g.fillStyle='#83edf5';g.fillRect(0,0,720,1280);text('LAYERED MOVEMENT PROOF',360,65,31);text('Technical blockout · artwork unfinished',360,101,19);
  const state=m.heldKey(t,[{t:0,value:'REST'},{t:1,value:'STIR'},{t:4,value:'HOLD'}]),diagnostic=t>=5;
  text(state+(diagnostic?' · MASK OFF CHECK':''),360,155,27);
  path('M310 220L390 220L390 303C398 343 475 301 551 379C636 467 640 670 597 795C557 925 403 995 261 931C115 865 92 697 142 562C184 459 301 443 310 359Z','#fa7f88');
  g.fillStyle='#873d51';g.fill(mask);let clock=m.clamp(t-1,0,3)+(t>4?.15*(1-Math.exp(-(t-4)*8)):0),amplitude=t<1?0:t<4?10:10*Math.exp(-(t-4)*8);
  function contents(){g.beginPath();g.moveTo(80,650);for(let x=80;x<=660;x+=12)g.lineTo(x,650+amplitude*Math.sin(x*.025-clock*5));g.lineTo(660,1000);g.lineTo(80,1000);g.closePath();g.fillStyle='#62c8c1';g.fill();
   for(const f of foods){const activity=m.clamp((t-1)/.15),q={x:f.x+activity*22*Math.sin(clock*3+f.phase),y:f.y+activity*15*Math.cos(clock*3+f.phase)};
    if(!m.discContained(q,f.r,poly))leaks++;
    g.save();g.translate(q.x,q.y);g.rotate(clock+f.phase);g.beginPath();g.ellipse(0,0,f.r,f.r*.65,0,0,Math.PI*2);g.fillStyle=['#ffdf8e','#f7a05c','#b5df96'][Math.round(f.phase/.9)%3];g.fill();g.strokeStyle='#222';g.lineWidth=2;g.stroke();g.restore();
   }
  }
  if(diagnostic)contents();else m.withClip(g,mask,contents);
  g.strokeStyle='#ffd5c6';g.lineWidth=12;g.stroke(mask);g.strokeStyle='#171717';g.lineWidth=3;g.stroke(mask);
  const root={x:285,y:365},wrist=state==='REST'?{x:335,y:480}:state==='STIR'?{x:385+Math.sin(clock*3)*25,y:455}:{x:425,y:370},ik=m.twoBoneIK(root,wrist,120,115,-1);
  maxLengthError=Math.max(maxLengthError,Math.abs(m.distance(ik.root,ik.elbow)-120),Math.abs(m.distance(ik.elbow,ik.hand)-115));
  path(`M${root.x} ${root.y}L${ik.elbow.x} ${ik.elbow.y}L${ik.hand.x} ${ik.hand.y}`,null,'#171717',7);
  let angle=state==='STIR'?.22*Math.sin(clock*3):state==='HOLD'?-.3:0;g.save();g.translate(wrist.x,wrist.y);g.rotate(angle);path('M0-35L0 190',null,'#81513e',9);g.beginPath();g.ellipse(0,203,17,27,0,0,Math.PI*2);g.fillStyle='#bc865f';g.fill();g.strokeStyle='#171717';g.lineWidth=3;g.stroke();g.restore();
  const grip=m.rigidAnchor({x:0,y:0},{x:wrist.x,y:wrist.y,angle});maxGripError=Math.max(maxGripError,m.distance(grip,ik.hand));
  g.beginPath();g.ellipse(ik.hand.x,ik.hand.y,15,12,0,0,Math.PI*2);g.fillStyle='#ffa995';g.fill();g.strokeStyle='#171717';g.lineWidth=3;g.stroke();
  for(let x of[330,380]){g.beginPath();g.ellipse(x,297,19,state==='HOLD'?13:24,0,0,Math.PI*2);g.fillStyle='#fff9e4';g.fill();g.strokeStyle='#171717';g.stroke();g.beginPath();g.arc(x+(state==='STIR'?5:0),300,6,0,Math.PI*2);g.fillStyle='#171717';g.fill()}
  text('Fixed wall · separate food and liquid',360,1070,24);text('Held poses · rigid spoon · shared grip anchor',360,1110,22);text(diagnostic?'Unmasked contents still stay inside.':'Contents move without stretching the wall.',360,1160,22);
 }
 const ff=spawn('ffmpeg',['-y','-v','error','-f','rawvideo','-pixel_format','rgba','-video_size','720x1280','-framerate','30','-i','-','-t','6','-c:v','libx264','-threads','2','-preset','fast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',p.join(out,'Layered_Motion_Proof.mp4')],{stdio:['pipe','inherit','inherit']});
 const completed=new Promise((res,rej)=>{ff.on('error',rej);ff.on('close',c=>c===0?res():rej(Error('Encoder '+c)))});
 for(let f=0;f<180;f++){draw(f/30);if([15,60,135,165].includes(f))fs.writeFileSync(p.join(out,`proof_${f}.png`),C.toBuffer('image/png'));if(!ff.stdin.write(Buffer.from(g.getImageData(0,0,720,1280).data)))await new Promise((res,rej)=>{const ok=()=>{ff.stdin.removeListener('error',fail);res()},fail=e=>{ff.stdin.removeListener('drain',ok);rej(e)};ff.stdin.once('drain',ok);ff.stdin.once('error',fail)})}
 ff.stdin.end();await completed;const report={frames:180,foodPieces:foods.length,foodContainmentFailures:leaks,maxGripError,maxLengthError,scope:'Sampled technical blockout only; no arbitrary-shape or swept collision proof'};fs.writeFileSync(p.join(out,'Proof_Checks.json'),JSON.stringify(report,null,2));if(leaks||maxGripError>.001||maxLengthError>.001)throw Error('Motion proof failed: '+JSON.stringify(report));console.log(JSON.stringify(report));
}main().catch(e=>{console.error(e);process.exitCode=1});
