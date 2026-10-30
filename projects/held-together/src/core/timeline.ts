export const FPS=24;
export const DURATION=24;
export const WIDTH=1080, HEIGHT=1920;
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ease=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
export const ramp=(t:number,a:number,b:number)=>ease((t-a)/(b-a));
export const beats=[
 {start:0,end:3.2,kicker:'A SMALL REPAIR',text:'Stitches don’t heal the cut.',emphasis:'heal'},
 {start:3.2,end:7.5,kicker:'01 / BRING TOGETHER',text:'They bring the edges together.',emphasis:'together'},
 {start:7.5,end:11.4,kicker:'02 / HOLD STEADY',text:'And hold them while your body works.',emphasis:'hold'},
 {start:11.4,end:16.4,kicker:'03 / BELOW THE SURFACE',text:'New tissue builds across the gap.',emphasis:'tissue'},
 {start:16.4,end:20.4,kicker:'TIME PASSES',text:'Collagen helps strengthen the repair.',emphasis:'Collagen'},
 {start:20.4,end:24,kicker:'THE BODY DOES THE BUILDING',text:'The thread is temporary support.',emphasis:'support'},
];
export function state(t:number){return {closure:ramp(t,2.8,8.5),cutaway:ramp(t,10.4,12.5)*(1-ramp(t,18,20)),healing:ramp(t,13,19),removal:ramp(t,20,21.8)}}
