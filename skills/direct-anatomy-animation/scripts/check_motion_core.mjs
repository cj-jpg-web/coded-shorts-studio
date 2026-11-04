import assert from 'node:assert/strict';
import{heldKey,quickTween,rigidAnchor,twoBoneIK,distance,simplePolygon,discContained,withClip}from'./motion_core.mjs';
assert.equal(heldKey(.99,[{t:0,value:'down'},{t:1,value:'up'}]),'down');
assert.equal(heldKey(1,[{t:0,value:'down'},{t:1,value:'up'}]),'up');
assert.equal(quickTween(.5,1,0,0,10),0);assert.equal(quickTween(1,1,0,0,10),10);
const p=rigidAnchor({x:2,y:0},{x:4,y:3,angle:Math.PI/2});assert.ok(distance(p,{x:4,y:5})<1e-8);
for(const target of[{x:3,y:4},{x:30,y:4},{x:0,y:0}]){
  const k=twoBoneIK({x:0,y:0},target,4,3);assert.ok(Math.abs(distance(k.root,k.elbow)-4)<1e-6);assert.ok(Math.abs(distance(k.elbow,k.hand)-3)<1e-6);
}
assert.equal(twoBoneIK({x:0,y:0},{x:30,y:0},4,3).reachable,false);
const square=[{x:0,y:0},{x:10,y:0},{x:10,y:10},{x:0,y:10}];
assert.equal(simplePolygon(square),true);assert.equal(simplePolygon([square[0],square[2],square[1],square[3]]),false);
assert.equal(discContained({x:5,y:5},4,square),true);assert.equal(discContained({x:1,y:1},2,square),false);
const calls=[],ctx={save(){calls.push('save')},clip(){calls.push('clip')},restore(){calls.push('restore')}};
assert.throws(()=>withClip(ctx,null,()=>{throw Error('draw failed')}));assert.deepEqual(calls,['save','clip','restore']);
console.log('Motion helper boundary checks passed');
