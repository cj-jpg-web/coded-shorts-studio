import numpy as np,wave,os
ROOT=os.path.dirname(os.path.abspath(__file__));sr=48000;duration=18;n=duration*sr;audio=np.zeros(n);rng=np.random.default_rng(32)
def add(t,a):
 off=int(t*sr);size=min(len(a),n-off)
 if size>0:audio[off:off+size]+=a[:size]
def note(t,f,dur=.55,g=.07):
 x=np.arange(int(sr*dur))/sr;sig=(np.sin(2*np.pi*f*x)+.22*np.sin(2*np.pi*f*2.006*x))*np.exp(-x*8)*(1-np.exp(-x*180))*g;add(t,sig);add(t+.12,sig*.16)
def pop(t,f=380,g=.13):
 x=np.arange(int(sr*.15))/sr;add(t,g*np.sin(2*np.pi*(f*x+90/35*(1-np.exp(-x*35))))*np.exp(-x*35))
def noise(t,dur,g):
 x=np.arange(int(sr*dur))/sr;a=rng.normal(size=len(x));a=np.convolve(a,np.ones(6)/6,'same');add(t,g*a*np.exp(-x*25)*(1-np.exp(-x*800)))
# Original playful pizzicato pattern, with a brief stop at the emergency button.
for j,t in enumerate(np.arange(.12,17.8,.38)):
 if 12.9<t<13.7:continue
 note(float(t),[261.63,329.63,392,523.25,392,329.63,293.66,392][j%8],g=.035)
 if j%2==0:note(float(t),130.81,.4,.023)
noise(3.55,.1,.16);pop(3.57,180,.12);note(4.05,783.99,.75,.10)
for t in np.arange(5.87,12.65,1/6):
 pop(float(t),340+rng.random()*400,.07);noise(float(t)+.13,.06,.035)
for t in [6.1,6.35,6.6]:noise(t,.06,.10)
x=np.arange(int(9.6*sr))/sr;hum=.012*(np.sin(2*np.pi*95*x)+.5*np.sin(2*np.pi*190*x))*(1+.2*np.sin(x*12));add(3.5,hum)
noise(13.22,.14,.28);pop(13.22,68,.26);note(14.05,392,.6,.055)
# A little comic crunch and a resolving chord at the last beat.
noise(16.12,.15,.13)
for f in [523.25,659.25,783.99]:note(16.25,f,.9,.06)
audio*=np.minimum(np.arange(n)/sr/.1,1)*np.minimum((duration-np.arange(n)/sr)/.25,1);audio=np.tanh(audio*1.5)*.84
stereo=np.stack([audio,audio*.98],axis=1)
with wave.open(ROOT+'/soundtrack.wav','wb') as w:w.setparams((2,2,sr,0,'NONE','not compressed'));w.writeframes((stereo*32767).astype('<i2').tobytes())
print('Original audio ready; peak',round(float(np.max(np.abs(audio))),3))
