import PdfPrinter from 'pdfmake';
import {mkdir} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {makeDocument} from '../pdf-document.js';
import {finished} from 'node:stream/promises';
const fonts={Nanum:{normal:'assets/fonts/NanumGothic-Regular.ttf',bold:'assets/fonts/NanumGothic-Bold.ttf',italics:'assets/fonts/NanumGothic-Regular.ttf',bolditalics:'assets/fonts/NanumGothic-Bold.ttf'}};
const printer=new PdfPrinter(fonts);
await mkdir('output/pdf',{recursive:true});
for(const [type,name] of [['learning','learning-materials'],['worksheet','worksheet'],['teacher','teacher-guide']]){const doc=printer.createPdfKitDocument(makeDocument(type));const stream=createWriteStream(`output/pdf/${name}.pdf`);doc.pipe(stream);doc.end();await finished(stream);console.log(`Created ${name}.pdf`);}
