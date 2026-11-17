'use client';
import { useEffect, useRef, useState } from 'react';
export default function AudioControl({paused=false}:{paused?:boolean}){
 const state=useRef<{ctx:AudioContext;gain:GainNode;nodes:OscillatorNode[]}|null>(null);const [on,setOn]=useState(false);const [volume,setVolume]=useState(.3);
 useEffect(()=>()=>{state.current?.ctx.close()},[]);
 useEffect(()=>{if(state.current)state.current.gain.gain.setTargetAtTime(on&&!paused?volume*.07:0,state.current.ctx.currentTime,.4)},[on,volume,paused]);
 async function toggle(){if(!state.current){const ctx=new AudioContext();const gain=ctx.createGain();gain.gain.value=0;const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=650;gain.connect(filter);filter.connect(ctx.destination);const nodes=[55,82.41,110,164.81].map((f,i)=>{const o=ctx.createOscillator();o.type='sine';o.frequency.value=f;o.detune.value=i*2;o.connect(gain);o.start();return o});state.current={ctx,gain,nodes};}await state.current.ctx.resume();setOn(!on);}
 return <div className="audio-control"><button onClick={toggle} aria-pressed={on} aria-label={on?'Mute ambience':'Enable ambience'}><span className={'sound-bars '+(on&&!paused?'playing':'')}><i/><i/><i/><i/></span><span>Sound {on?'on':'off'}</span></button><input aria-label="Ambient volume" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(+e.target.value)}/></div>
}
