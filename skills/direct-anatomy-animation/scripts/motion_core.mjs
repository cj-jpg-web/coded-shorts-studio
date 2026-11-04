// Renderer-independent helpers. Coordinates are local to the caller's scene.
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function heldKey(t,keys){
  if(!keys.length)throw Error('heldKey needs keys');
  for(let i=1;i<keys.length;i++)if(keys[i].t<=keys[i-1].t)throw Error('keys must increase');
  let key=keys[0];for(const k of keys){if(k.t>t)break;key=k}return key.value;
}
export function quickTween(t,start,duration,a,b,{ease=false}={}){
  if(duration<0)throw Error('negative duration');
  let u=duration===0?(t>=start?1:0):clamp((t-start)/duration);
  if(ease)u=u*u*(3-2*u);return a+(b-a)*u;
}
export function rigidAnchor(point,{x=0,y=0,angle=0,pivot={x:0,y:0}}={}){
  const dx=point.x-pivot.x,dy=point.y-pivot.y,c=Math.cos(angle),s=Math.sin(angle);
  return{x:x+dx*c-dy*s,y:y+dx*s+dy*c};
}
export function twoBoneIK(root,target,l1,l2,bend=1){
  if(!(l1>0&&l2>0))throw Error('positive bone lengths required');
  const raw=distance(root,target),lo=Math.abs(l1-l2)+1e-7,hi=l1+l2-1e-7;
  const d=clamp(raw,lo,hi),direction=raw>1e-10?Math.atan2(target.y-root.y,target.x-root.x):0;
  const a=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));
  const elbow={x:root.x+l1*Math.cos(direction+bend*a),y:root.y+l1*Math.sin(direction+bend*a)};
  const hand={x:root.x+d*Math.cos(direction),y:root.y+d*Math.sin(direction)};
  return{root,elbow,hand,reachable:raw>=Math.abs(l1-l2)&&raw<=l1+l2,targetError:distance(hand,target)};
}
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
const onSegment=(p,a,b)=>Math.abs(cross(a,b,p))<1e-8&&p.x>=Math.min(a.x,b.x)-1e-8&&p.x<=Math.max(a.x,b.x)+1e-8&&p.y>=Math.min(a.y,b.y)-1e-8&&p.y<=Math.max(a.y,b.y)+1e-8;
function intersects(a,b,c,d){
  const x=cross(a,b,c),y=cross(a,b,d),z=cross(c,d,a),w=cross(c,d,b);
  return(x*y<0&&z*w<0)||onSegment(c,a,b)||onSegment(d,a,b)||onSegment(a,c,d)||onSegment(b,c,d);
}
export function simplePolygon(poly){
  if(poly.length<3||poly.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return false;
  for(let i=0;i<poly.length;i++){
    const a=poly[i],b=poly[(i+1)%poly.length];if(distance(a,b)<1e-8)return false;
    for(let j=i+1;j<poly.length;j++){
      if(j===i+1||(i===0&&j===poly.length-1))continue;
      if(intersects(a,b,poly[j],poly[(j+1)%poly.length]))return false;
    }
  }
  return Math.abs(poly.reduce((sum,p,i)=>{const q=poly[(i+1)%poly.length];return sum+p.x*q.y-q.x*p.y},0))>1e-8;
}
export function pointInside(p,poly){
  let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const a=poly[i],b=poly[j];if(onSegment(p,a,b))return true;
    if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
  }return inside;
}
export function segmentDistance(p,a,b){
  const dx=b.x-a.x,dy=b.y-a.y,den=dx*dx+dy*dy,u=den?clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/den):0;
  return Math.hypot(p.x-a.x-u*dx,p.y-a.y-u*dy);
}
export function discContained(center,radius,poly){
  if(radius<0||!simplePolygon(poly)||!pointInside(center,poly))return false;
  return poly.every((p,i)=>segmentDistance(center,p,poly[(i+1)%poly.length])+1e-8>=radius);
}
export function withClip(ctx,path,draw){ctx.save();try{ctx.clip(path);return draw()}finally{ctx.restore()}}
