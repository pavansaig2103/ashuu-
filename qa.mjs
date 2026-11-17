import {chromium} from '@playwright/test';
import fs from 'node:fs';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto(process.env.QA_URL||'http://127.0.0.1:3001',{waitUntil:'domcontentloaded'});
await page.getByRole('button',{name:'Skip the journey'}).waitFor();await page.waitForTimeout(3500);await page.screenshot({path:'qa/intro.png'});
if(await page.getByRole('button',{name:'Skip the journey'}).isVisible())await page.getByRole('button',{name:'Skip the journey'}).click();await page.waitForTimeout(3000);
await page.screenshot({path:'qa/universe-desktop.png'});
console.log('Canvas',await page.locator('canvas').count());
const nav=page.getByRole('navigation',{name:'Explore our five worlds'});
for(let i=0;i<5;i++){
 await nav.getByRole('button').nth(i).click();await page.waitForTimeout(1900);
 if(i===0){await page.getByRole('button',{name:'Next photograph'}).click();await page.getByRole('button',{name:'View complete photograph'}).click();}
 if(i===1){await page.getByRole('button',{name:'Rediscover a moment'}).click();console.log('Video metadata',await page.locator('video').evaluate(v=>({width:v.videoWidth,height:v.videoHeight,duration:v.duration,error:v.error?.message})));await page.getByRole('button',{name:'Moment 02'}).click();}
 if(i===2){await page.getByRole('button',{name:/When you need a reminder/}).click();if(!await page.getByText('You’ve been my comfort, my happiness and my madness. I hope you know how much that means to me.').isVisible())throw Error('Capsule failed');}
 if(i===4){await page.getByLabel('A future memory').fill('A future adventure together');await page.getByRole('button',{name:'Save a future star'}).click();if(!await page.getByText('A future adventure together',{exact:true}).isVisible())throw Error('Future star failed');}
 await page.screenshot({path:`qa/world-${i+1}.png`,fullPage:true});
 await page.getByRole('button',{name:'Back to the universe'}).click();
}
await page.getByRole('button',{name:'Enable ambience'}).click();console.log('Audio enabled',await page.getByRole('button',{name:'Mute ambience'}).getAttribute('aria-pressed'));await page.getByRole('button',{name:'Mute ambience'}).click();
await page.getByRole('button',{name:'A letter for you',exact:false}).first().click();await page.waitForTimeout(3000);await page.screenshot({path:'qa/finale-desktop.png',fullPage:true});
console.log('Photo dimensions',await page.locator('.together-frame img').evaluate(i=>({natural:[i.naturalWidth,i.naturalHeight],display:[i.clientWidth,i.clientHeight],fit:getComputedStyle(i).objectFit})));
await page.getByRole('button',{name:'View the other photograph together'}).click();await page.getByRole('button',{name:'Our universe is still here'}).click();
await page.setViewportSize({width:390,height:844});await page.waitForTimeout(2500);await page.screenshot({path:'qa/universe-mobile.png'});
await nav.getByRole('button').nth(0).click();await page.waitForTimeout(1900);await page.screenshot({path:'qa/memories-mobile.png',fullPage:true});
console.log('Mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await page.getByRole('button',{name:'A letter for you',exact:false}).first().click();await page.waitForTimeout(1000);await page.screenshot({path:'qa/finale-mobile.png',fullPage:true});
console.log('Broken images',await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).length));
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForTimeout(2000);console.log('Reduced motion title',await page.getByRole('heading',{name:'ASHWAK.'}).isVisible());
console.log('ERRORS',errors);fs.writeFileSync('qa/results.json',JSON.stringify({errors},null,2));await browser.close();if(errors.length)process.exitCode=1;
