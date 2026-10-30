// Restricted Linux containers may not permit restoring archived uid/gid values.
import fs from 'node:fs';
const p=new URL('../node_modules/@sparticuz/chromium/build/lambdafs.js',import.meta.url);
if(fs.existsSync(p)){const s=fs.readFileSync(p,'utf8');fs.writeFileSync(p,s.replace('target = extract(output);','target = extract(output, { chown: false });'))}
