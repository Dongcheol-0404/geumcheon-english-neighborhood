import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createCanvas,DOMMatrix,Path2D,ImageData} from '@napi-rs/canvas';
import PdfPrinter from 'pdfmake';
import {makeDocument} from '../pdf-document.js';
Object.assign(globalThis,{DOMMatrix,Path2D,ImageData});
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
await mkdir('output/qa',{recursive:true});
const printer=new PdfPrinter({Nanum:{normal:'assets/fonts/NanumGothic-Regular.ttf',bold:'assets/fonts/NanumGothic-Bold.ttf',italics:'assets/fonts/NanumGothic-Regular.ttf',bolditalics:'assets/fonts/NanumGothic-Bold.ttf'}});
async function buffer(doc){return new Promise((resolve,reject)=>{const chunks=[];doc.on('data',c=>chunks.push(c));doc.on('end',()=>resolve(Buffer.concat(chunks)));doc.on('error',reject);doc.end();});}
const samples={blank:{},short:{place:'금천동',draft:'I think my neighborhood is welcoming.',final:'I think my neighborhood is welcoming. One reason is that I feel comfortable here. For example, I walked with a friend last week. We talked and felt better. I hope we can keep our neighborhood clean. <script> & 한글'},long:{place:'청주시 상당구 금천동',final:('I think our neighborhood can be more comfortable. 우리 동네에 관한 자기 생각. < > & “ ”\n').repeat(130)}};
for(const [name,a] of Object.entries(samples))await writeFile(`output/qa/answers-${name}.pdf`,await buffer(printer.createPdfKitDocument(makeDocument('answers',a))));
const paths=['output/pdf/learning-materials.pdf','output/pdf/worksheet.pdf','output/pdf/teacher-guide.pdf',...Object.keys(samples).map(n=>`output/qa/answers-${n}.pdf`)];
const reports=[];
for(const file of paths){const pdf=await getDocument({data:new Uint8Array(await readFile(file)),useSystemFonts:false}).promise;let chars=0,allText='',outOfBounds=[];for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i),viewport=page.getViewport({scale:1.25}),canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;const filename=file.split('/').pop().replace('.pdf','');if(!filename.includes('long')||i===1||i===pdf.numPages)await writeFile(`output/qa/${filename}-${i}.png`,canvas.toBuffer('image/png'));const text=await page.getTextContent();chars+=text.items.map(x=>x.str||'').join('').length;allText+=text.items.map(x=>x.str||'').join(' ');for(const item of text.items){if(item.str?.trim()&&(item.transform[5]<25||item.transform[5]>810))outOfBounds.push({page:i,text:item.str.slice(0,30),y:item.transform[5]});}}
if(!allText.includes('금천')&&!file.includes('answers-long'))throw new Error('Korean text missing: '+file);outOfBounds=outOfBounds.filter(x=>!(x.y>=18&&(x.text.startsWith('GEUMCHEON')||/^\d+ \/ \d+$/.test(x.text))));if(outOfBounds.length)throw new Error('PDF text outside margins: '+JSON.stringify(outOfBounds));reports.push({file,pages:pdf.numPages,characters:chars});await pdf.cleanup();}
await writeFile('output/qa/pdf-report.json',JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));
process.exit(0);
