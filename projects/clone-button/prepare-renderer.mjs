import fs from 'node:fs';
const p=new URL('./node_modules/@sparticuz/chromium/build/lambdafs.js',import.meta.url);
const s=fs.readFileSync(p,'utf8');fs.writeFileSync(p,s.replace('target = extract(output);','target = extract(output, { chown: false });'));console.log('Archive extraction configured without ownership changes.');
