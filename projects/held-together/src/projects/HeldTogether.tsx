import {useMemo,useLayoutEffect} from 'react';import * as T from 'three';import {ThreeCanvas} from '@remotion/three';import {AbsoluteFill,Html5Audio,useCurrentFrame} from 'remotion';import {RoundedBox} from '@react-three/drei';import {useThree} from '@react-three/fiber';import {Anatomy} from '../assets/Anatomy';import {CameraRig} from '../core/CameraRig';import {beats,FPS,WIDTH,HEIGHT,ramp} from '../core/timeline';
function SceneFence(){const f=useCurrentFrame();const {gl,scene,camera,setFrameloop}=useThree();useLayoutEffect(()=>{gl.toneMapping=T.ACESFilmicToneMapping;gl.toneMappingExposure=1.05;if(new URLSearchParams(location.search).has('capture')){setFrameloop('never');gl.render(scene,camera)}window.__sceneFrame=f},[f,gl,scene,camera,setFrameloop]);return null}
function Needle({t}:{t:number}){const g=useMemo(()=>new T.TubeGeometry(new T.CatmullRomCurve3(Array.from({length:30},(_,i)=>{const a=i/29*Math.PI*1.12;return new T.Vector3(Math.cos(a)*.25,0,Math.sin(a)*.25)})),40,.012,8,false),[]);const p=ramp(t,1.5,3.5);return <group visible={t>1.1&&t<4.2} position={[.36-p*.63,.94,.71+Math.sin(p*Math.PI)*.22]} rotation={[0,p*Math.PI*.9,0]}><mesh geometry={g} castShadow><meshStandardMaterial color="#e3eef0" metalness={.85} roughness={.2}/></mesh></group>}
function Room(){return <group>
<mesh position={[0,0,-1.4]}><planeGeometry args={[200,200]}/><meshStandardMaterial color="#b8d1d5" roughness={.95}/></mesh>
<RoundedBox args={[4.4,9,.28]} position={[0,-.25,-.86]} radius={.2} smoothness={3} receiveShadow><meshStandardMaterial color="#2f6577" roughness={.87}/></RoundedBox>
<RoundedBox args={[3.65,7.9,.16]} position={[0,-.2,-.65]} radius={.15} smoothness={2} receiveShadow><meshStandardMaterial color="#d8e6dd" roughness={1}/></RoundedBox>
{[-1,1].map(i=><mesh key={i} position={[i*2.0,0,-.57]}><boxGeometry args={[.035,7.5,.035]}/><meshStandardMaterial color="#99b2b5" metalness={.4} roughness={.5}/></mesh>)}
{/* Tray and instruments sit beside, rather than behind, the subject. */}
<group position={[1.55,1.6,-.48]} rotation={[0,0,.1]}>
<RoundedBox args={[.8,1.7,.09]} radius={.06} smoothness={2}><meshStandardMaterial color="#a2bcc0" metalness={.7} roughness={.3}/></RoundedBox>
{[0,1].map(i=><group key={i} position={[-.12+i*.22,0,.08]} rotation={[0,0,(i-.5)*.1]}><mesh><cylinderGeometry args={[.015,.015,.9,8]}/><meshStandardMaterial color="#d3dddf" metalness={.85} roughness={.25}/></mesh><mesh position={[0,-.53,0]}><torusGeometry args={[.085,.015,8,20]}/><meshStandardMaterial color="#cbd7dc" metalness={.8} roughness={.2}/></mesh></group>)}
<mesh position={[0,.54,.1]}><boxGeometry args={[.46,.32,.04]}/><meshStandardMaterial color="#f2f4e9" roughness={1}/></mesh>
</group></group>}
export function HeldTogether(){const frame=useCurrentFrame(),t=frame/FPS;const beat=beats.find(b=>t>=b.start&&t<b.end)||beats[beats.length-1];const intro=1-ramp(t,1.2,2.0);const overlays=new URLSearchParams(location.search).has('labels');return <AbsoluteFill style={{background:'#adc6d0',fontFamily:'Arial, sans-serif'}}>
{!new URLSearchParams(location.search).has('capture')&&<Html5Audio src="/soundtrack.wav"/>}
<ThreeCanvas width={WIDTH} height={HEIGHT} camera={{fov:40,near:.02,far:80}} shadows gl={{antialias:true,preserveDrawingBuffer:true,alpha:false}}>
<color attach="background" args={['#b8d1d5']}/><hemisphereLight args={['#edf6ff','#526c76',1.9]}/>
<directionalLight position={[-3,5,7]} intensity={3.2} color="#fff1dc" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={6} shadow-camera-bottom={-6} shadow-bias={-.00015} shadow-normalBias={.014}/>
<directionalLight position={[4,-1,2]} intensity={.9} color="#d0ecff"/>
<CameraRig/><Room/><Anatomy t={t}/><Needle t={t}/><SceneFence/>
</ThreeCanvas>
{overlays&&<><AbsoluteFill style={{background:'linear-gradient(180deg,rgba(14,38,51,.18),transparent 25%,transparent 67%,rgba(11,29,42,.68))',pointerEvents:'none'}}/>
<div style={{position:'absolute',top:78,left:70,right:70,display:'flex',alignItems:'center',justifyContent:'space-between',color:'#183e50',fontSize:22,fontWeight:800,letterSpacing:4}}><span>UNDER THE SURFACE</span><span style={{fontSize:17,letterSpacing:2}}>01 / REPAIR</span></div>
<div style={{position:'absolute',top:135,left:70,opacity:intro,color:'#183e50',fontSize:66,fontWeight:900,lineHeight:1.0,letterSpacing:-2}}>HELD<br/>TOGETHER.</div>
{t>11.2&&t<19.3&&<div style={{position:'absolute',top:165,left:70,background:'#163b4ce6',border:'1px solid #b4d6d2',borderRadius:7,padding:'14px 20px',color:'#e7f4ed',fontSize:20,letterSpacing:2}}>SIMPLIFIED CUTAWAY · TIME COMPRESSED</div>}
<div style={{position:'absolute',left:76,right:76,bottom:230,color:'#f5f5eb'}}>
<div style={{fontSize:20,fontWeight:800,letterSpacing:3,color:'#bce7dd',marginBottom:22}}>{beat.kicker}</div>
<div style={{fontSize:58,fontWeight:800,lineHeight:1.12,letterSpacing:-1.4,textShadow:'0 2px 12px #112c3e70'}}>{beat.text.split(' ').map((word,i)=><span key={i} style={{color:word.toLowerCase().includes(beat.emphasis.toLowerCase())?'#c4f0b5':undefined}}>{word} </span>)}</div>
</div>
<div style={{position:'absolute',left:76,right:76,bottom:152,height:3,background:'#ffffff30'}}><div style={{width:`${t/24*100}%`,height:'100%',background:'#c4f0b5'}}/></div>
<div style={{position:'absolute',left:76,bottom:104,color:'#c8d8dd',fontSize:17,letterSpacing:2}}>CODED SHORTS / ANATOMY STUDY</div>
</>}
</AbsoluteFill>}
declare global {interface Window{__sceneFrame:number}}
