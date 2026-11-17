'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** One coordinated veil: cover the outgoing world, reveal the letter, then drift away. */
export default function HeartTransition({onCovered,onComplete,reduced}:{onCovered:()=>void;onComplete:()=>void;reduced:boolean}) {
 const root=useRef<HTMLDivElement>(null);
 const callbacks=useRef({onCovered,onComplete});
 callbacks.current={onCovered,onComplete};
 useEffect(()=>{
  if(reduced){callbacks.current.onCovered();callbacks.current.onComplete();return;}
  const context=gsap.context(()=>{
   const tl=gsap.timeline({onComplete:()=>callbacks.current.onComplete()});
   tl.fromTo('.heart-veil',{opacity:0},{opacity:1,duration:.85,ease:'sine.inOut'},0)
    .fromTo('.heart-core',{opacity:0,scale:.7,y:15},{opacity:1,scale:1,y:0,duration:.8,ease:'power2.out'},.12)
    .fromTo('.heart-particle',{opacity:0,y:100,scale:.5},{opacity:.8,y:-180,scale:1,duration:1.5,stagger:{each:.035,from:'center'},ease:'sine.out'},.1)
    .call(()=>callbacks.current.onCovered(),[],.95)
    .to('.heart-core',{opacity:0,scale:1.08,duration:.7,ease:'sine.inOut'},1.1)
    .to('.heart-particle',{opacity:0,y:'-=110',duration:.8,stagger:.015,ease:'sine.in'},1.2)
    .to('.heart-veil',{opacity:0,duration:1.1,ease:'sine.inOut'},1.25);
  },root);
  return()=>context.revert();
 },[reduced]);
 return <div className="heart-transition" ref={root} role="status" aria-label="Opening your letter"><div className="heart-veil"/><div className="heart-core" aria-hidden="true"><span>♡</span><small>A LITTLE LOVE, JUST FOR YOU</small></div><div aria-hidden="true">{Array.from({length:20},(_,i)=><span key={i} className={'heart-particle tone-'+i%3} style={{left:`${7+(i*29)%86}%`,top:`${35+(i*17)%60}%`,fontSize:`${12+(i*7)%22}px`}}>{i%4===0?'♥':'♡'}</span>)}</div></div>
}
