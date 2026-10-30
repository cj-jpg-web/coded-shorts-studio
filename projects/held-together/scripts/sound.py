"""Original, understated sound bed; no borrowed audio or cloned voice."""
import numpy as np, wave
from pathlib import Path
sr=48000; dur=24; a=np.zeros(sr*dur); rng=np.random.default_rng(92)
def add(t,v):
 i=int(t*sr); n=min(len(v),len(a)-i)
 if n>0:a[i:i+n]+=v[:n]
def tone(t,f,d,g):
 x=np.arange(int(d*sr))/sr; env=(1-np.exp(-x*5))*np.exp(-x*.9)
 add(t,g*env*(np.sin(2*np.pi*f*x)+.2*np.sin(2*np.pi*2.003*f*x)))
for t in [0,6,12,18]:
 for f in [130.81,196,261.63]:tone(t,f,6,.013)
for i in range(7):
 x=np.arange(int(.24*sr))/sr
 add(3.25+i*.63,.055*np.sin(2*np.pi*(400*x+80*x*x))*np.exp(-x*25))
for t in [1.4,10.6,18.6,21]:
 x=np.arange(int(1.2*sr))/sr; noise=rng.normal(0,1,len(x));noise=np.convolve(noise,np.ones(40)/40,'same')
 add(t,.075*noise*np.sin(np.pi*x/1.2)**2)
for i in range(10):tone(13+i*.43,392+i*15,.45,.015)
x=np.arange(len(a))/sr;a*=np.minimum(1,x/.5)*np.minimum(1,(24-x)/1.3)
a=np.tanh(a*1.5); stereo=np.stack([a,np.roll(a,120)*.98],axis=1)
with wave.open(str(Path(__file__).parent.parent/'public'/'soundtrack.wav'),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((stereo*32767).astype('<i2').tobytes())
print('24s original stereo soundtrack generated')
