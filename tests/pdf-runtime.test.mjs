import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {makeDocument} from '../pdf-document.js';
const require=createRequire(import.meta.url);
test('The shipped browser PDF engine produces a valid Korean-font Blob',async()=>{
 const pdf=require('pdfmake/build/pdfmake.js');
 pdf.vfs={'regular.ttf':(await readFile('assets/fonts/NanumGothic-Regular.ttf')).toString('base64'),'bold.ttf':(await readFile('assets/fonts/NanumGothic-Bold.ttf')).toString('base64')};
 pdf.fonts={Nanum:{normal:'regular.ttf',bold:'bold.ttf',italics:'regular.ttf',bolditalics:'bold.ttf'}};
 const blob=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('PDF generation timeout')),15000);pdf.createPdf(makeDocument('answers',{place:'금천동',final:'I like our neighborhood. 한글과 영어 < > &'})).getBlob(b=>{clearTimeout(timer);resolve(b);});});
 assert.ok(blob.size>10000);assert.equal((await blob.slice(0,5).text()),'%PDF-');
 const shipped=await readFile('assets/vendor/pdfmake.min.js');
 const installed=await readFile(require.resolve('pdfmake/build/pdfmake.min.js'));
 assert.ok(shipped.equals(installed));
});
