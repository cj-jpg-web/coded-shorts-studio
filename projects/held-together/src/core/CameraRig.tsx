import {useLayoutEffect,useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import {CatmullRomCurve3,Vector3} from 'three';
import {useCurrentFrame} from 'remotion';
import {FPS} from './timeline';
// One continuous path. Position and look target share knots and a stable world up.
const shots=[
 [0,[1.4,.9,10.8],[0,-.2,.25]],
 [3,[.75,.35,5.1],[0,.25,.65]],
 [7,[-1.15,.6,4.1],[0,.15,.68]],
 [10,[-.65,.9,3.8],[0,.05,.65]],
 [13,[1.3,1.2,3.5],[0,0,.53]],
 [17,[1.55,.8,3.2],[0,0,.48]],
 [20,[.65,.65,4.2],[0,0,.65]],
 [24,[1.7,.7,11.5],[0,-.2,.2]],
] as const;
export function CameraRig(){const frame=useCurrentFrame();const {camera}=useThree();const curves=useMemo(()=>({p:new CatmullRomCurve3(shots.map(s=>new Vector3(...s[1])),false,'catmullrom',.2),q:new CatmullRomCurve3(shots.map(s=>new Vector3(...s[2])),false,'catmullrom',.2)}),[]);
useLayoutEffect(()=>{const t=frame/FPS;let i=0;while(i<shots.length-2&&t>shots[i+1][0])i++;const u=(i+Math.max(0,Math.min(1,(t-shots[i][0])/(shots[i+1][0]-shots[i][0]))))/(shots.length-1);camera.position.copy(curves.p.getPoint(u));camera.lookAt(curves.q.getPoint(u));camera.updateProjectionMatrix()},[frame,camera,curves]);return null}
