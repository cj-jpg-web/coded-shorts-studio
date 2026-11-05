const assert=require('assert');const {captureSettings,mediaFile}=require('../assets/render.cjs');
const info={width:320,height:568,fps:12,frames:6,duration:.5};
assert.deepStrictEqual(captureSettings(info,{}),{width:320,height:568,fps:12,frames:6,start:0,end:6,out:'picture.mp4',legacy:false});

assert.strictEqual(captureSettings(info,{START:'1',END:'5'}).end,5);
assert.strictEqual(captureSettings({frames:3},{}).legacy,true);
for(const bad of [{fps:0},{fps:'12'},{width:321},{frames:-1},{duration:8}]) assert.throws(()=>captureSettings({...info,...bad},{}));
for(const bad of [{END:'0'},{START:'5',END:'4'},{END:'7'},{START:'x'}]) assert.throws(()=>captureSettings(info,bad));
assert.strictEqual(mediaFile('/project','/?preview=1'),'/project/index.html');
assert.throws(()=>mediaFile('/project','/../outside'));
console.log('Capture settings/range/path tests passed');
