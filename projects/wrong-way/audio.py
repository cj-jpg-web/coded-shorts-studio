"""Local synthetic voices with phoneme and word timestamps, plus authored SFX."""
import ctypes as C,json,wave,numpy as np
from pathlib import Path
P=Path(__file__).parent; SR=24000; DURATION=40
f=C.CDLL('libflite.so.1',mode=C.RTLD_GLOBAL);f.flite_init()
def sig(name,args,ret):
 fn=getattr(f,name);fn.argtypes=args;fn.restype=ret;return fn
ptr=C.c_void_p;S=C.c_char_p
synth=sig('flite_synth_text',[S,ptr],ptr);rel=sig('utt_relation',[ptr,S],ptr);head=sig('relation_head',[ptr],ptr);nxt=sig('item_next',[ptr],ptr);name=sig('item_feat_string',[ptr,S],S);val=sig('item_feat_float',[ptr,S],C.c_float);feat=sig('ffeature_float',[ptr,S],C.c_float);uw=sig('utt_wave',[ptr],ptr);save=sig('cst_wave_save_riff',[ptr,S],C.c_int);delete=sig('delete_utterance',[ptr],None)
voices={};libs=[]
for n in ['slt','rms']:
 lib=C.CDLL('libflite_cmu_us_'+n+'.so.1');libs.append(lib);fn=getattr(lib,'register_cmu_us_'+n);fn.argtypes=[S];fn.restype=ptr;voices[n]=fn(None)
script=[
 ('ear',"Hold it! You're going the wrong way!",'slt'),
 ('swab',"Relax. I'm the cleaning crew.",'rms'),
 ('wax',"Then why am I moving IN?",'slt'),
 ('ear',"You're pushing the wax deeper!",'slt'),
 ('swab',"Okay. Little more pressure?",'rms'),
 ('drum',"NO! I live back here!",'rms'),
 ('wax',"Great. Now I'm a traffic jam.",'slt'),
 ('swab',"But look! I got a tiny bit.",'rms'),
 ('ear',"And packed the rest inside.",'slt'),
 ('drum',"Stay outside the ear canal.",'rms'),
 ('swab',"Less tunnel. More towel?",'rms'),
 ('ear',"Now you're listening.",'slt')]
lines=[]
start=.15
for who,txt,voice in script:
 u=synth(txt.encode(),voices[voice]);it=head(rel(u,b'Segment'));last=0
 while it:
  last=float(val(it,b'end'));it=nxt(it)
 delete(u);lines.append((start,who,txt,voice));start+=last/1.27+.10
DURATION=round(start+.65,2)
(P/'timing.json').write_text(json.dumps({'duration':DURATION,'lines':[{'start':x[0],'who':x[1],'text':x[2]} for x in lines]},indent=2))
a=np.zeros((round(SR*DURATION),2));cues=[]
for i,(start,who,text,voice) in enumerate(lines):
 u=synth(text.encode(),voices[voice]);raw=P/f'voice_{i}.wav';save(uw(u),str(raw).encode());it=head(rel(u,b'Segment'));last=0;phones=[]
 while it:
  end=float(val(it,b'end'))/1.27;phones.append({'start':start+last,'end':start+end,'phone':name(it,b'name').decode()});last=end;it=nxt(it)
 it=head(rel(u,b'Word'));words=[]
 while it:
  w=name(it,b'name').decode();end=float(feat(it,b'R:SylStructure.daughtern.daughtern.end'))/1.27;begin=float(feat(it,b'R:SylStructure.daughter.daughter.R:Segment.p.end'))/1.27
  words.append({'text':w.upper(),'start':start+begin,'end':start+end});it=nxt(it)
 import subprocess
 fast=P/f'fast_{i}.wav';subprocess.run(['ffmpeg','-y','-v','error','-i',str(raw),'-filter:a','atempo=1.27',str(fast)],check=True)
 with wave.open(str(fast)) as w:
  rate=w.getframerate();v=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
 v=np.interp(np.arange(round(len(v)*SR/rate))*rate/SR,np.arange(len(v)),v)
 off=round(start*SR);n=min(len(v),len(a)-off);pan={'ear':.05,'swab':-.18,'wax':0,'drum':.2}[who];gains=np.array([1-pan,1+pan])*.8;a[off:off+n]+=v[:n,None]*gains
 cues.append({'start':start,'end':start+last,'who':who,'text':text,'phones':phones,'words':words});delete(u)
rng=np.random.default_rng(23)
def add(st,z,gain=.1,pan=0):
 off=round(st*SR);n=min(len(z),len(a)-off);a[off:off+n]+=z[:n,None]*np.array([1-pan,1+pan])*.7*gain
# Event-specific brush, wax compression, reveal, and exit sounds.
for st,ln in [(lines[2][0]-.2,.4),(lines[4][0],.35),(lines[7][0]-.2,.4),(lines[10][0]-.15,.45)]:
 tt=np.arange(round(ln*SR))/SR;noise=rng.normal(0,1,len(tt));smooth=np.convolve(noise,np.ones(25)/25,'same');add(st,smooth*np.sin(np.pi*tt/ln)**2,.10)
for idx,fr in [(2,130),(5,220),(6,100),(11,660)]:
 st=lines[idx][0];tt=np.arange(int(.25*SR))/SR;add(st,np.sin(2*np.pi*(fr*tt-100*tt*tt))*np.exp(-tt*18),.075)
a=np.clip(a*1.2,-.96,.96)
with wave.open(str(P/'audio.wav'),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((a*32767).astype('<i2').tobytes())
(P/'speech.json').write_text(json.dumps(cues,indent=2))
print([(x['who'],round(x['start'],2),round(x['end'],2),x['text']) for x in cues]);print('word timing example:',cues[0]['words'])

(P/'voice_script.txt').write_text('WRONG WAY — voice guide only\n\n'+'\n'.join(f'{i+1:02d} [{x[0]:.2f}s] {x[1].upper()}: {x[2]}' for i,x in enumerate(lines))+'\n')
print('DURATION',DURATION)
