// Capture original local artwork. This is not a signed-in browser automation tool.
const {chromium}=require('playwright');
const fs=require('fs'),http=require('http'),path=require('path'),{spawn,execFileSync}=require('child_process');
function captureSettings(info,env=process.env){
  if(!info||typeof info!=='object')throw Error('window.videoInfo must be an object');
  const frames=info.frames,width=info.width??720,height=info.height??1280,fps=info.fps??30;
  for(const [name,value] of Object.entries({frames,width,height}))if(!Number.isInteger(value)||value<=0)throw Error(`${name} must be a positive integer`);
  if(width%2||height%2)throw Error('H.264 yuv420p requires even width and height');
  if(typeof fps!=='number'||!Number.isFinite(fps)||fps<=0)throw Error('fps must be a finite positive number');
  if(info.duration!==undefined&&(typeof info.duration!=='number'||!Number.isFinite(info.duration)||Math.abs(info.duration-frames/fps)>1/fps+.00001))throw Error('duration disagrees with frames/fps');
  const start=env.START===undefined?0:Number(env.START),end=env.END===undefined?frames:Number(env.END);
  if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end>frames||end<=start)throw Error('START/END must select a nonempty frame interval within videoInfo.frames');
  return{frames,width,height,fps,start,end,out:env.OUT||'picture.mp4',legacy:info.width===undefined||info.height===undefined||info.fps===undefined};
}
function mediaFile(root,url){
  const pathname=decodeURIComponent(url.split('?')[0]);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(file!==root&&!file.startsWith(root+path.sep))throw Error('Path outside project root');
  return file;
}
async function run(){
  const root=process.cwd();let browser,ff,server,childDone;
  try{
    // Fail before starting capture if the required encoder/prober is absent.
    execFileSync('ffmpeg',['-version'],{stdio:'ignore'});execFileSync('ffprobe',['-version'],{stdio:'ignore'});
    server=http.createServer((req,res)=>{try{
      const file=mediaFile(root,req.url);const types={'.js':'text/javascript','.json':'application/json','.html':'text/html','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
      res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
    }catch(e){res.statusCode=404;res.end('missing')}});
    await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
    const options={headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']};
    if(process.env.BROWSER_EXECUTABLE_PATH)options.executablePath=process.env.BROWSER_EXECUTABLE_PATH;
    browser=await chromium.launch(options);const page=await browser.newPage({viewport:{width:720,height:1280},deviceScaleFactor:1});
    let pageError;page.on('pageerror',e=>{pageError=e});
    await page.goto(`http://127.0.0.1:${server.address().port}`);await page.waitForFunction(()=>window.ready,{timeout:120000});
    if(pageError)throw pageError;
    const cfg=captureSettings(await page.evaluate(()=>window.videoInfo));
    if(cfg.legacy)console.warn('Legacy metadata: omitted width/height/fps use 720x1280@30. Declare all fields for new projects.');
    await page.setViewportSize({width:cfg.width,height:cfg.height});
    ff=spawn('ffmpeg',['-v','error','-y','-probesize','32','-analyzeduration','0','-f','image2pipe','-vcodec','mjpeg','-framerate',String(cfg.fps),'-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','17','-pix_fmt','yuv420p',cfg.out],{stdio:['pipe','inherit','inherit']});
    ff.stdin.on('error',()=>{});
    childDone=new Promise((resolve,reject)=>{ff.once('error',reject);ff.once('close',code=>code===0?resolve():reject(Error(`ffmpeg exited ${code}`)))});childDone.catch(()=>{});
    const began=Date.now();
    for(let f=cfg.start;f<cfg.end;f++){
      if(pageError)throw pageError;
      const jpeg=await page.evaluate(f=>window.captureFrame(f),f);
      if(typeof jpeg!=='string'||!jpeg.length)throw Error(`Frame ${f}: missing JPEG payload`);
      const buffer=Buffer.from(jpeg,'base64');
      await new Promise((resolve,reject)=>ff.stdin.write(buffer,e=>e?reject(e):resolve()));
      if((f-cfg.start)%60===0)console.log(f,cfg.end,'elapsed',((Date.now()-began)/1000).toFixed(1));
    }
    ff.stdin.end();await childDone;
    const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height,avg_frame_rate,nb_frames','-of','json',cfg.out],{encoding:'utf8'})).streams[0];
    const [num,den]=probe.avg_frame_rate.split('/').map(Number);
    if(probe.width!==cfg.width||probe.height!==cfg.height||Math.abs(num/den-cfg.fps)>.001||Number(probe.nb_frames)!==cfg.end-cfg.start)throw Error('Export dimensions/rate/frame count disagree with capture contract');
    console.log('COMPLETE',cfg.out,`${cfg.width}x${cfg.height}@${cfg.fps}`,`${cfg.end-cfg.start} frames`);
  }finally{
    if(ff&&ff.exitCode===null){ff.stdin.destroy();ff.kill()}
    if(browser)await browser.close();
    if(server)await new Promise(resolve=>server.close(resolve));
  }
}
module.exports={captureSettings,mediaFile};
if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1});
