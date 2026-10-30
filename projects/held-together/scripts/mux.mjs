import {spawnSync} from 'node:child_process';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const p=spawnSync('ffmpeg',['-y','-i',path.join(root,'held_together_silent.mp4'),'-i',path.join(root,'public/soundtrack.wav'),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',path.join(root,'held_together.mp4')],{stdio:'inherit'});if(p.status!==0)process.exit(p.status||1);
