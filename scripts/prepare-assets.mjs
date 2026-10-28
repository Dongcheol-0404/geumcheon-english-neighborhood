import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
await mkdir('assets/fonts',{recursive:true});
await mkdir('assets/vendor',{recursive:true});
for(const name of ['NanumGothic-Regular.ttf','NanumGothic-Bold.ttf','OFL.txt']){
 const r=await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/nanumgothic/'+name);
 if(!r.ok) throw new Error(`Font download: ${name} ${r.status}`);
 await writeFile('assets/fonts/'+name,Buffer.from(await r.arrayBuffer()));
}
await copyFile(require.resolve('pdfmake/build/pdfmake.min.js'),'assets/vendor/pdfmake.min.js');
await copyFile(require.resolve('pdfmake/LICENSE'),'assets/vendor/pdfmake-LICENSE.txt');
console.log('Local fonts and pinned PDF library ready.');
