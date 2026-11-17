import {chromium} from '@playwright/test';
import fs from 'node:fs';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const p=await b.newPage({reducedMotion:'reduce'});await p.goto('http://127.0.0.1:3001');
const n=p.getByRole('navigation');await n.getByRole('button').nth(0).click();await n.getByRole('button').nth(2).click();await p.getByRole('heading',{name:'The unseen words.'}).waitFor();
await n.getByRole('button').nth(1).click();await p.locator('video').evaluate(v=>new Promise(resolve=>{if(v.readyState>=2)resolve();else v.onloadeddata=resolve}));await p.locator('video').evaluate(v=>new Promise(resolve=>{v.currentTime=1;v.onseeked=resolve}));
const frame=await p.locator('video').evaluate(v=>{const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);return c.toDataURL('image/png').split(',')[1]});fs.writeFileSync('qa/video-one.png',Buffer.from(frame,'base64'));
console.log('Cross-world navigation and video-one frame passed');await b.close();
