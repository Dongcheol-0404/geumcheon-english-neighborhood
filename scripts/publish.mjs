import {spawnSync} from 'node:child_process';
import {writeFile,readFile} from 'node:fs/promises';
const credential=spawnSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:{...process.env,GCM_INTERACTIVE:'never',GIT_TERMINAL_PROMPT:'0'},windowsHide:true});
const token=credential.stdout?.split(/\r?\n/).find(x=>x.startsWith('password='))?.slice(9);
if(!token)throw new Error('GitHub sign-in required');
async function api(route,method='GET',body){const r=await fetch('https://api.github.com'+route,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},body:body?JSON.stringify(body):undefined});const text=await r.text();const data=text?JSON.parse(text):{};if(!r.ok&&r.status!==404)throw new Error(`GitHub ${method} ${route}: ${r.status} ${data.message}`);return {status:r.status,data};}
function git(...args){const r=spawnSync('git',args,{encoding:'utf8',windowsHide:true,env:{...process.env,GCM_INTERACTIVE:'never',GIT_TERMINAL_PROMPT:'0'}});if(r.status!==0)throw new Error(r.stderr||'Git failed');return r.stdout.trim();}
const mode=process.argv[2]||'status';
const user=(await api('/user')).data;
if(user.login!=='Dongcheol-0404')throw new Error('Unexpected GitHub account');
if(mode==='publish'){
 let name='geumcheon-english-neighborhood';
 let check=await api(`/repos/${user.login}/${name}`);
 if(check.status!==404){name+='-lesson';check=await api(`/repos/${user.login}/${name}`);if(check.status!==404)throw new Error('Both repository names already exist; not overwriting.');}
 const repo=(await api('/user/repos','POST',{name,description:'금천고 공통영어1 · 우리 동네에 관한 자기 생각 쓰기 · 50분 수업과 PDF 활동지',private:false,auto_init:false})).data;
 await writeFile('tmp/deployment.json',JSON.stringify({owner:user.login,name,url:repo.html_url}));
 git('init','-b','main');
 git('config','user.name',user.name||user.login);
 git('config','user.email',`${user.id}+${user.login}@users.noreply.github.com`);
 git('add','.');git('commit','-m','Build neighborhood English lesson with worksheets and PDF export');git('remote','add','origin',repo.clone_url);git('push','-u','origin','main');
 await api(`/repos/${user.login}/${name}/pages`,'POST',{source:{branch:'main',path:'/'},build_type:'legacy'});
 const pages=(await api(`/repos/${user.login}/${name}/pages`)).data;
 console.log(JSON.stringify({repository:repo.html_url,site:pages.html_url,status:pages.status}));
}else{
 const deployment=JSON.parse(await readFile('tmp/deployment.json','utf8'));
 const pages=(await api(`/repos/${deployment.owner}/${deployment.name}/pages`)).data;
 const build=await api(`/repos/${deployment.owner}/${deployment.name}/pages/builds/latest`);
 console.log(JSON.stringify({repository:deployment.url,site:pages.html_url,status:pages.status,build:build.data.status,error:build.data.error?.message}));
}
