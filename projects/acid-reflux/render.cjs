/** Original code-native artwork. No reference footage or generated bitmap assets. */
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
let canvasLib;try{canvasLib=require('@napi-rs/canvas')}catch{canvasLib=require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'', '@napi-rs/canvas'))}
const {createCanvas,Path2D}=canvasLib;
const ROOT=__dirname,W=720,H=1280,SCALE=1.5,FPS=30;
const speech=JSON.parse(fs.readFileSync(path.join(ROOT,'speech.json'))),timing=JSON.parse(fs.readFileSync(path.join(ROOT,'timing.json'))),DURATION=timing.duration;
const canvas=createCanvas(W*SCALE,H*SCALE),g=canvas.getContext('2d');let t=0;let camNow={s:1};
const OLD_C={ink:'#49312e',skin:'#f6c4a6',light:'#ffe5c1',rose:'#d98787',wall:'#b65e68',deep:'#713e51',lumen:'#f9e7bd',wax:'#dca53d',gold:'#f1c45e',cotton:'#fffdef',blue:'#80bbc5',drum:'#d0b4db'};
const clamp=x=>Math.max(0,Math.min(1,x)),mix=(a,b,k)=>a+(b-a)*k,ease=x=>{x=clamp(x);return x*x*(3-2*x)},ramp=(a,b)=>ease((t-a)/(b-a)),T=i=>speech[i].start;

const C={ink:'#4d3030',skin:'#ec9290',light:'#ffd3b2',rose:'#d4787f',wall:'#b45c68',deep:'#8a4555',lumen:'#f1a5a0',acid:'#ef9c43'};
function P(d,fill,stroke=C.ink,lw=2.8){const p=d instanceof Path2D?d:new Path2D(d);if(fill){g.fillStyle=fill;g.fill(p)}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.lineCap='round';g.lineJoin='round';g.stroke(p)}return p}
function E(x,y,rx,ry,fill,stroke=C.ink,lw=2.6){g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,Math.PI*2);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke()}}
function clip(d){g.clip(d instanceof Path2D?d:new Path2D(d))}
function grad(x,y,X,Y,a,b){let z=g.createLinearGradient(x,y,X,Y);z.addColorStop(0,a);z.addColorStop(1,b);return z}
function txt(s,x,y,size,color=C.ink,weight=800,align='center'){g.fillStyle=color;g.font=`${weight} ${size}px "DejaVu Sans"`;g.textAlign=align;g.textBaseline='middle';g.fillText(s,x,y)}
function qline(d,c=C.ink,w=3){P(d,null,c,w)}
function speaking(who){return speech.find(s=>s.who===who&&t>=s.start&&t<s.end)}
function phone(who){const a=speaking(who);return a?.phones.find(p=>t>=p.start&&t<p.end)?.phone||'pau'}
function rgb(a,b,k){return '#'+[0,2,4].map(i=>Math.round(mix(parseInt(a.slice(i+1,i+3),16),parseInt(b.slice(i+1,i+3),16),k)).toString(16).padStart(2,'0')).join('')}
function ringOpen(){return .12+.88*ramp(T(0)+.45,T(1)+.7)}
function irritate(){return ramp(T(2)-.35,T(2)+.7)*(.8+.2*ramp(T(6),T(6)+.7))}
function tipY(){return mix(790,245,ramp(T(1)-.35,T(2)+.3))+10*Math.sin(t*3.8)*ramp(T(1),T(2))}
function mouth(who,x,y,s=1,mood='normal'){g.save();g.translate(x,y);g.scale(s,s);let ph=phone(who);if(ph==='pau'||['m','b','p'].includes(ph)){qline(mood==='pain'?'M -24 7 Q -7 -12 8 -6 L 25 7':mood==='angry'?'M -24 8 Q 3 -9 25 5':who==='acid'?'M -23 -1 Q 7 22 25 -11':'M -24 0 Q 3 13 25 -1',C.ink,2.6);g.restore();return}
let round=['ow','uw','w','oy','uh'].includes(ph),flat=['s','z','f','v','th','dh'].includes(ph),wide=['aa','ae','ay','eh','aw'].includes(ph);let rx=round?16:wide?31:26,ry=flat?8:round?23:wide?25:17;if(mood==='pain'){rx*=1.14;ry*=1.18}let d=`M ${-rx} 0 C ${-rx-5} ${-ry-4} ${rx+7} ${-ry-7} ${rx} 0 C ${rx-3} ${ry+7} ${-rx+4} ${ry+6} ${-rx} 0 Z`;P(d,'#763947',C.ink,2.2);g.save();clip(d);P(`M -42 -30 L 40 -30 L 40 -6 Q 0 1 -42 -7 Z`,'#fff8e4',null);if(mood==='pain')P(`M -42 ${ry-5} Q 0 ${ry-12} 42 ${ry-5} L 42 40 L -42 40 Z`,'#fff1db',null);else E(3,ry,22,8,'#ed8d99',null);g.restore();g.restore()}
function face(who,x,y,s,mood='normal',gx=0,gy=0,skin=C.lumen){g.save();g.translate(x,y);let recoil=who==='esophagus'?irritate()*.035*Math.sin((t-T(2))*16)*Math.exp(-Math.max(0,t-T(2))*2):0;g.rotate(recoil);g.scale(s,s);
let blink=0;for(let at of [1.2,3.7,6.2,9.3,12.6,15.9,19.2,22.4])blink=Math.max(blink,clamp(1-Math.abs(t-at-({stomach:.12,acid:.5,esophagus:0,valve:.3}[who]))/.085));
let pain=who==='esophagus'?irritate():0,shock=who==='esophagus'&&t>T(2)&&t<T(2)+.55;
for(let side of [-1,1]){let cx=side*(who==='acid'?29:36),rx=who==='stomach'?35:who==='esophagus'?30:29,ry=who==='stomach'?29:who==='esophagus'?39:25;let squint=mood==='squeeze';
if(squint){qline(`M ${cx-side*27} -18 Q ${cx+side*7} -2 ${cx+side*13} 0 Q ${cx-side*8} 11 ${cx-side*24} 19`,C.ink,3);continue}
if(mood==='pain')ry*=.84;let bh=Math.max(.035,1-.96*blink);g.save();g.translate(cx,0);g.rotate((who==='acid'?-.09:who==='esophagus'?.025:0)*side);E(0,0,rx,ry*bh,rgb('#fffcef','#ffdfd5',pain*.7),null);g.beginPath();g.ellipse(0,0,rx,ry*bh,0,0,Math.PI*2);g.clip();let pupil=shock?4:who==='acid'?7:8;E(gx,9+gy,pupil,pupil*1.48,'#251f1e',null);E(gx+2,5+gy,2,2.5,'#fff',null);
if(pain>.3){g.globalAlpha=pain*.8;for(let v of [-1,1])qline(`M ${v*rx} -7 l ${-v*9} 2 l ${-v*3} 8 m ${v*3} -8 l ${-v*8} -5`,'#c66b76',1.15);g.globalAlpha=1}
if(mood==='skeptic'||mood==='angry'||who==='acid'){let h=(mood==='angry'?side*11:side*5);P(`M -45 -55 L 45 -55 L 45 ${-8+h} Q -2 -11 -45 ${-8-h} Z`,skin,null);qline(`M -36 ${-9-h} Q 0 -10 36 ${-9+h}`,C.ink,1.6)}g.restore();E(cx,0,rx,ry*bh,null,C.ink,2.05);
let by=shock?-65:mood==='worried'?-57:mood==='pain'?-47:-48,tilt=mood==='pain'?side*14:mood==='angry'?side*13:mood==='worried'?-side*11:who==='acid'?side*7:side*2;qline(`M ${cx-22} ${by-tilt} Q ${cx-4} ${by-14} ${cx+24} ${by+tilt}`,C.ink,2.25);if(pain>.2){g.globalAlpha=pain;qline(`M ${cx-25} 40 q 22 13 47 -1`,'#b55d69',1.45);g.globalAlpha=1}}
mouth(who,who==='acid'?3:0,who==='stomach'?55:61,who==='valve'?.85:1,mood);
if(pain>.4){for(let side of [-1,1]){g.globalAlpha=pain*.55;E(side*65,30,13,8,'#cf6978',null);g.globalAlpha=1}qline('M -13 82 q 9 7 21 1','#b76472',1.5)}g.restore()}
function hand(x,y,s=1,a=0,point=false){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);P(point?'M -12 13 Q -29 -4 -16 -8 L -7 -2 L -8 -42 Q -5 -52 1 -43 L 7 -15 Q 22 -23 29 -11 L 31 8 Q 24 26 7 25 Z':'M -13 12 Q -30 -3 -19 -10 L -7 -2 L -12 -30 Q -10 -41 -4 -33 L 6 -10 L 7 -37 Q 11 -46 17 -35 L 17 -9 L 25 -26 Q 34 -31 34 -21 L 27 1 Q 39 -9 41 0 Q 40 9 25 19 Q 7 32 -13 12 Z','#fff1d7',C.ink,2);g.restore()}
function arm(x,y,X,Y,bend=0,point=false){qline(`M ${x} ${y} Q ${(x+X)/2+bend} ${(y+Y)/2+15} ${X} ${Y}`,C.ink,3.1);hand(X,Y,.57,bend*.018,point)}
function outer(){return 'M 253 -1200 C 257 -740 264 -370 259 -45 C 251 141 282 267 264 370 C 250 448 253 502 274 561 C 292 613 340 665 346 729 C 355 790 338 818 308 799 C 257 754 233 690 122 691 L -1400 691 L -1400 850 L 125 850 C 184 829 201 864 218 928 C 246 1031 295 1086 387 1087 C 533 1091 650 982 702 850 C 779 660 753 484 622 380 C 555 327 478 336 427 410 C 411 372 423 315 430 240 C 449 24 419 -271 429 -1200 Z'}
function inner(){let gap=12+64*ringOpen(),l=348-gap/2,r=348+gap/2;return `M 291 -1200 C 293 -650 301 -240 296 -42 C 288 138 315 271 302 363 C 297 397 ${l} 417 ${l} 435 C ${l} 483 312 514 327 558 C 344 604 390 659 395 731 C 407 814 374 863 328 856 C 268 849 244 756 189 743 Q 152 719 121 737 L -1400 737 L -1400 804 L 123 804 C 196 788 232 838 254 919 C 278 1004 321 1043 389 1045 C 513 1049 623 952 672 832 C 741 659 720 506 597 408 C 544 366 485 386 441 452 C 418 486 ${r} 479 ${r} 435 C ${r} 403 389 359 395 237 C 409 35 387 -282 390 -1200 Z`}
function tissue(){let out=outer(),ins=inner();P(out,'#bd6773',C.ink,2.6);g.save();clip(out);
// Broad unequal wall patches and tapered strokes follow anatomical curvature.
P('M 411 326 C 466 320 515 312 582 353 C 719 413 794 633 733 805 L 699 790 C 757 580 676 421 567 375 Q 490 331 418 379 Z','#d99191',null);
P('M 210 927 C 236 1064 318 1127 427 1080 Q 588 1064 693 888 L 674 870 Q 551 1040 408 1058 Q 276 1088 245 919 Z','#a95263',null);
P('M 260 -900 C 280 -281 248 85 275 303 L 287 302 C 273 79 299 -290 278 -900 Z','#dc9693',null);
P('M 416 -900 C 416 -230 440 119 416 300 L 402 307 C 422 83 397 -238 399 -900 Z','#944d60',null);
g.restore();P(ins,grad(270,200,600,1050,'#f6b0a3','#e68e91'),C.ink,2.2);
g.save();clip(ins);
// Hand-authored mucosal shadow planes, not decorative repeated dots.
P('M 448 474 C 506 410 589 441 639 523 Q 688 603 657 685 C 638 617 644 558 580 507 Q 510 461 448 497 Z','#df8c8a',null);
P('M 319 586 C 371 628 425 719 418 792 C 422 893 382 940 320 912 Q 366 930 378 843 C 403 747 359 675 319 586 Z','#cc727e',null);
P('M 397 1008 C 535 1006 625 904 647 807 C 624 898 511 967 400 965 Q 347 967 315 932 Q 335 1001 397 1008 Z','#dc8487',null);
P('M 435 485 C 491 422 558 442 592 487 C 549 458 493 460 453 512 Z','#fac1aa',null);
// Rugae have different paths, widths and tapering ends.
const folds=[['M 479 531 C 534 489 594 540 611 602 C 640 713 612 797 581 852 C 556 895 529 908 504 914',10],['M 491 561 C 536 543 557 595 563 658 C 569 745 529 812 502 834',6],['M 453 595 C 493 613 493 703 468 766 Q 440 829 440 876',9],['M 634 585 C 673 679 644 805 596 872 Q 555 929 476 960',7],['M 418 890 C 399 955 351 958 315 915',6],['M 455 480 Q 499 421 554 451',5],['M 284 804 Q 249 755 206 750',5]];
for(let i=0;i<folds.length;i++){let [d,w]=folds[i];qline(d,i%2?'#c7707a':'#d17b80',w);g.save();g.translate(-4,-4);qline(d,'#f9b5a5',Math.max(1.6,w*.38));g.restore()}
// Uneven longitudinal esophageal creases, each with its own path.
for(let d of ['M 315 -410 C 326 -250 304 -70 321 90 Q 330 150 318 199','M 370 -470 C 360 -238 389 -124 370 46 Q 366 80 375 103','M 307 235 Q 323 298 311 352','M 382 270 Q 369 320 379 363'])qline(d,'#d88688',3);
// Irritation stays on the lower esophageal lining and builds after reflux arrives.
let red=irritate();if(red>0){g.globalAlpha=red*.65;P('M 283 53 C 311 85 299 120 317 151 Q 304 184 321 221 Q 306 267 324 307 Q 310 349 328 390 L 297 435 L 277 438 Z','#d55365',null);P('M 397 46 Q 378 90 386 128 Q 371 170 388 210 Q 374 258 384 301 Q 372 351 385 392 L 409 433 L 422 116 Z','#c64d62',null);g.globalAlpha=red*.28;P('M 304 96 Q 339 79 386 107 L 386 302 Q 344 319 302 297 Z','#df5b6e',null);g.globalAlpha=1}
g.restore();
// An irregular mucosal highlight follows the organ; no uniform outline glow.
qline('M 443 397 C 482 346 553 351 603 393 C 721 492 742 642 691 784','#efb1a4',5.4);qline('M 244 942 Q 271 1049 365 1060','#f5b4a4',4);
// Layer continuity is structural; surface folds may taper naturally.
qline('M 266 -1000 C 272 -515 272 -184 273 14 C 267 143 289 262 277 359','#e5a298',3.2);
}
function muscle(){let open=ringOpen(),l=348-(12+64*open)/2,r=348+(12+64*open)/2;g.save();
P(`M 258 401 C 273 382 293 388 ${l} 409 Q ${l+6} 435 ${l} 461 C 294 478 278 479 259 463 Q 249 433 258 401 Z`,grad(253,397,322,469,'#c97980','#a95366'),C.ink,2.2);
P(`M ${r} 409 C 407 391 425 393 438 409 Q 451 434 437 462 C 418 481 400 478 ${r} 461 Q ${r-5} 436 ${r} 409 Z`,grad(389,400,439,473,'#dc9390','#ad5a6b'),C.ink,2.2);
for(let side of [-1,1])for(let j=0;j<4;j++){let x=side<0?265+j*11:402+j*9;qline(`M ${x} ${404+j%2*3} Q ${x-7} 433 ${x+1} ${466-j%2*3}`,'#7f4357',1.35)}
face('valve',416,428,.35,t<T(3)?'normal':'worried',-5,4,'#cb8589');g.restore()}
function poolPath(y){let d=`M -1500 ${y}`;for(let x=-1480;x<1500;x+=20)d+=` L ${x} ${y+9*Math.sin(x*.018+t*2.5)+4*Math.sin(x*.041-t*3.2)}`;return d+' L 1500 1800 L -1500 1800 Z'}
function acid(){let ins=inner(),front=tipY(),flow=ramp(T(1)-.4,T(2)+.25);g.save();clip(ins);let y=833+5*Math.sin(t*2.1);
// A connected upward surge; its shoulders are clipped by the actual sphincter aperture.
if(flow>.01){g.save();g.globalAlpha=flow;let d=`M 299 957 C 458 829 390 677 333 544 C 317 505 318 472 313 434 C 301 ${Math.max(front+80,378)} 306 ${Math.max(front+25,320)} 307 ${front+39} C 307 ${front+12} 315 ${front-9+4*Math.sin(t*4)} 329 ${front+4} C 339 ${front+14} 341 ${front-19+3*Math.sin(t*3)} 357 ${front-8} C 368 ${front-17} 393 ${front+8} 387 ${front+43} C 383 ${Math.max(front+80,336)} 380 ${Math.max(front+100,392)} 383 434 C 391 485 394 526 423 582 C 504 742 537 866 615 1005 Z`;P(d,grad(310,front,445,1000,'#ffc266','#e99547'),'#c17649',1.7);qline(`M 321 ${front+50} Q 323 ${front+15} 342 ${front+16}`,'#ffe0a1',5);qline(`M 342 ${front+114} Q 328 ${front+176} 347 ${front+231}`,'#fbd28c',3);
for(let j=0;j<3;j++){let yy=front+72+((j*130-t*85+39000)%390);qline(`M 316 ${yy+8} Q 335 ${yy-3} 351 ${yy+5} T 382 ${yy+2}`,'#fbd48d',1.5)}
for(let i=0;i<7;i++){let yy=front+70+((i*97-t*92+53000)%530),xx=344+12*Math.sin(i*2.3);E(xx,yy,3+i%3,5+i%3,'#ffdb99',null)}g.restore()}
P(poolPath(y),grad(0,800,0,1110,'#f5ad59','#d87546'),'#b86643',1.8);
// Asymmetric curved surface glints follow liquid waves.
for(let i=0;i<6;i++){let x=230+i*65,yy=y+9*Math.sin(x*.018+t*2.5);qline(`M ${x} ${yy+24} q 14 -5 27 0`,'#ffdda1',1.7)}
for(let i=0;i<10;i++){let x=275+(i*61)%365,yy=887+(i*37)%134;E(x,yy+4*Math.sin(t*1.4+i),4+i%4,2.5+i%2,'#e89b58',null)}g.restore()}
function acidActor(){let k=ramp(T(1)-.2,T(2)+.3),fy=mix(895,tipY()+113,k),fx=mix(486,346,k),sz=mix(.78,.47,k);face('acid',fx,fy,sz,'skeptic',t<T(2)?-7:8,-3,'#f2b15a');if(t>T(1)&&t<T(1)+1.8){arm(fx+30,fy+25,fx+75,fy-17-7*Math.sin(t*5),-12,true)}}
function droplets(){let hit=ramp(T(2)-.2,T(2)+.3);if(hit>.05&&t<T(2)+1.6){for(let side of [-1,1]){g.save();g.translate(348+side*80,220-65*Math.sin((t-T(2)+.2)*2));g.rotate(side*.4);P('M 0 -15 C -3 -8 -12 2 -9 9 Q 0 21 9 8 C 11 1 3 -8 0 -15 Z','#b9dce0','#6d959f',1.5);g.restore()}}}
function scene(){g.fillStyle='#bbd9de';g.fillRect(-2000,-2000,5000,5000);
// Quiet body context, subordinated to the cutaway anatomy.
P('M -130 -1400 C -48 -715 52 -442 55 -100 Q 79 219 23 531 Q -24 1000 40 1700 L 1160 1700 Q 1094 922 1037 594 C 983 215 1000 -333 1116 -1400 Z','#d2e2de',null);
tissue();acid();muscle();let stomachMood=t<T(1)?'angry':t<T(4)?'worried':t<T(6)?'angry':'skeptic';face('stomach',550,595,1.02,stomachMood,-13,-8,'#e99a97');if(t<T(4)+2){arm(467,629,419,548,-26,true)}else{arm(623,637,653,711,12)}
let pain=irritate(),mood=t<T(2)?'worried':t<T(2)+.65?'squeeze':t<T(6)?'pain':t<T(6)+.5?'squeeze':t<T(8)?'pain':'skeptic';if(camNow.shot!=='stomach')face('esophagus',348,155,.77,mood,t<T(2)?3:-4,11,rgb('#f4aaa3','#df7c85',pain*.6));droplets();acidActor();
}
function camera(){if(t<T(1))return {shot:'stomach',x:450,y:681,s:1.34};if(t<T(2))return {shot:'rise',x:363,y:mix(650,425,ramp(T(1),T(2))),s:1.63};if(t<T(3))return {shot:'burn',x:348,y:234,s:2.6};if(t<T(4))return {shot:'valve',x:359,y:432,s:2.9};if(t<T(5))return {shot:'stomach',x:460,y:681,s:1.39};if(t<T(6))return {shot:'acid',x:347,y:386,s:2.5};if(t<T(7))return {shot:'burn',x:348,y:229,s:2.65};if(t<T(8))return {shot:'overview',x:393,y:559,s:1.02};return {shot:'burnEnd',x:348,y:234,s:2.6};}
function label(s,x,y){if(process.argv.includes('--no-labels'))return;let lines=s.split('|'),size=25;g.font=`900 ${size}px "Nimbus Sans Narrow"`;let w=Math.max(...lines.map(l=>g.measureText(l).width))+18,h=lines.length*27+11;g.save();g.translate(x,y);let d=`M ${-w/2+4} ${-h/2} L ${w/2-4} ${-h/2} Q ${w/2} ${-h/2} ${w/2} ${-h/2+4} L ${w/2} ${h/2-4} Q ${w/2} ${h/2} ${w/2-4} ${h/2} L ${-w/2+4} ${h/2} Q ${-w/2} ${h/2} ${-w/2} ${h/2-4} L ${-w/2} ${-h/2+4} Q ${-w/2} ${-h/2} ${-w/2+4} ${-h/2} Z`;P(d,'#fffef8','#423436',1.6);lines.forEach((l,i)=>{g.font=`900 ${size}px "Nimbus Sans Narrow"`;g.fillStyle='#16191a';g.textAlign='center';g.textBaseline='middle';g.fillText(l,0,(i-(lines.length-1)/2)*27)});g.restore()}
function labels(c){if(c.shot==='stomach'){label('Stomach',566,205);if(t<T(1))label('Lower esophageal|sphincter',155,352)}else if(c.shot==='rise'){label('Stomach contents',540,877);label('Esophagus',524,190)}else if(c.shot==='valve'){label('Lower esophageal|sphincter',555,500)}else if(c.shot==='acid'){label('Stomach contents',545,922)}else if(c.shot==='overview'){label('Esophagus',521,170);label('Stomach',610,919);label('Acid reflux',145,666)}else{label('Esophagus',548,197);if(c.shot==='burnEnd')label('Acid reflux',535,953)}}
function guide(){if(process.argv.includes('--clean'))return;let q=speech.find(s=>t>=s.start&&t<s.end);if(!q)return;let words=q.words,idx=words.findIndex(w=>t<w.end);if(idx<0)idx=words.length-1;let offset=Math.floor(idx/4)*4,group=words.slice(offset,offset+4);g.font='900 31px "DejaVu Sans"';let widths=group.map(w=>g.measureText(w.text).width),gap=12,total=widths.reduce((a,b)=>a+b,0)+gap*(group.length-1),scale=Math.min(1,650/total);g.save();g.translate(360,1147);g.scale(scale,scale);let x=-total/2;g.textAlign='left';g.textBaseline='middle';for(let i=0;i<group.length;i++){g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#49312e';g.strokeText(group[i].text,x,0);g.fillStyle=offset+i===idx?'#ffe187':'#fffdf0';g.fillText(group[i].text,x,0);x+=widths[i]+gap}g.restore()}
function draw(frame){t=frame/FPS;g.setTransform(SCALE,0,0,SCALE,0,0);let c=camera();camNow=c;g.save();g.translate(360,640);g.scale(c.s,c.s);g.translate(-c.x,-c.y);scene();g.restore();labels(c);guide()}
async function main(){if(process.argv[2]==='still'){draw(Math.round(+process.argv[3]*FPS));fs.writeFileSync(process.argv[4],canvas.toBuffer('image/png'));return}let clean=process.argv.includes('--clean');const name=clean?'Acid_Reflux_Clean.mp4':'Acid_Reflux_Voice_Guide.mp4';const ff=spawn('ffmpeg',['-y','-v','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${W*SCALE}x${H*SCALE}`,'-framerate',`${FPS}`,'-i','-','-i',path.join(ROOT,'audio.wav'),'-t',`${DURATION}`,'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-movflags','+faststart',...(process.argv.includes('--mute')?['-an']:[]),path.join(ROOT,name)],{stdio:['pipe','inherit','inherit']});let fail;ff.on('error',e=>fail=e);for(let f=0;f<Math.ceil(FPS*DURATION);f++){draw(f);if(!ff.stdin.write(g.getImageData(0,0,W*SCALE,H*SCALE).data))await new Promise((r,j)=>{const done=()=>{ff.stdin.off('error',bad);r()},bad=e=>{ff.stdin.off('drain',done);j(e)};ff.stdin.once('drain',done);ff.stdin.once('error',bad)});if(f%180===0)console.log('frame',f,'of',Math.ceil(FPS*DURATION));}ff.stdin.end();let code=await new Promise(r=>ff.on('close',r));if(code||fail)throw fail||Error('encoder failed '+code);console.log(name,DURATION)}main().catch(e=>{console.error(e);process.exitCode=1});
