import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:3001');await page.getByRole('button',{name:'Skip the journey'}).click();await page.waitForTimeout(2400);
if(await page.getByRole('navigation').isVisible())throw Error('Mobile bottom tabs still visible');
await page.screenshot({path:'qa/mobile-updated.png'});
const bounds=await page.locator('.planet-label').evaluateAll(els=>els.map(el=>{const b=el.getBoundingClientRect();return {name:el.innerText,x:b.x,y:b.y,right:b.right,bottom:b.bottom}}));
if(bounds.some(b=>b.x<0||b.right>390||b.y<270||b.bottom>760))throw Error('Planet labels clipped: '+JSON.stringify(bounds));
for(let i=0;i<5;i++){
 const label=await page.locator('.planet-label').nth(i).boundingBox();if(!label)throw Error('Missing planet label');await page.touchscreen.tap(label.x+label.width/2,label.y+label.height/2);await page.getByRole('dialog').waitFor();
 if(i===2){await page.getByRole('button',{name:/When you need a reminder/}).click();if(!await page.getByRole('button',{name:/When you need a reminder/}).getAttribute('aria-expanded'))throw Error('Capsule failed')}
 await page.getByRole('button',{name:'Back to the universe'}).click();await page.waitForTimeout(2200);
}
await page.getByRole('button',{name:/A letter for you/}).first().click();await page.waitForTimeout(400);await page.screenshot({path:'qa/hearts-transition.png'});
await page.getByRole('status',{name:'Opening your letter'}).waitFor({state:'detached'});await page.getByRole('region',{name:'A letter for Ashwak'}).waitFor();await page.screenshot({path:'qa/mobile-letter-updated.png',fullPage:true});
if(await page.locator('canvas').count()!==1)throw Error('Canvas remounted');
await page.getByRole('button',{name:'Our universe is still here'}).click();await page.setViewportSize({width:360,height:740});await page.waitForTimeout(2300);await page.screenshot({path:'qa/mobile-small-updated.png'});
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Horizontal overflow');
await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:/A letter for you/}).first().click();await page.getByRole('region',{name:'A letter for Ashwak'}).waitFor();if(await page.locator('.heart-transition').count())throw Error('Reduced motion should bypass hearts');
await page.setViewportSize({width:1440,height:1000});await page.getByRole('button',{name:'Our universe is still here'}).click();if(!await page.getByRole('navigation').isVisible())throw Error('Desktop navigation hidden');
console.log(JSON.stringify({mobileNavigation:'hidden; all five planets remain clickable',hearts:'opens letter and cleans up',reducedMotion:'bypasses hearts',overflow:false,bounds,errors},null,2));
fs.writeFileSync('qa/mobile-results.json',JSON.stringify({errors,bounds},null,2));await browser.close();if(errors.length)process.exitCode=1;
