import {spawnSync} from 'node:child_process';
const result=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GCM_INTERACTIVE:'never',GIT_TERMINAL_PROMPT:'0'},windowsHide:true});
const secret=result.stdout?.split(/\r?\n/).find(x=>x.startsWith('password='))?.slice(9);
if(!secret){console.log('No existing GitHub Git credential. Browser or device login required.');process.exit(0);}
const r=await fetch('https://api.github.com/user',{headers:{Authorization:`Bearer ${secret}`,Accept:'application/vnd.github+json'}});
const data=await r.json();
console.log(JSON.stringify({status:r.status,login:data.login,scopes:r.headers.get('x-oauth-scopes')}));
