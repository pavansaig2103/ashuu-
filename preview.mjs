import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
const root=path.resolve('out');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.jpeg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.ttf':'font/ttf','.txt':'text/plain'};
http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 let target=path.resolve(root,'.'+name);if(!target.startsWith(root+path.sep)&&target!==root){res.writeHead(403).end();return}
 if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
 if(!fs.existsSync(target)){res.writeHead(404).end('Not found');return}
 const stat=fs.statSync(target);const headers={'Content-Type':types[path.extname(target)]||'application/octet-stream','Accept-Ranges':'bytes'};
 const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);
 if(range){const start=+range[1],end=Math.min(range[2]?+range[2]:stat.size-1,stat.size-1);if(start> end){res.writeHead(416).end();return}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});fs.createReadStream(target,{start,end}).pipe(res)}else{res.writeHead(200,{...headers,'Content-Length':stat.size});fs.createReadStream(target).pipe(res)}
}).listen(3001,'127.0.0.1',()=>console.log('Production preview: http://127.0.0.1:3001'));
