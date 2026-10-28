import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {JSDOM} from 'jsdom';
import {lesson,cleanAnswers,wordCount,sentenceCount} from '../lesson.js';
import {makeDocument} from '../pdf-document.js';
test('50-minute lesson, standard, mixed-level examples and required fields',()=>{
 assert.equal(lesson.steps.reduce((a,s)=>a+s.minutes,0),50);
 assert.equal(lesson.standard,'[10공영1-02-04]');
 for(const e of lesson.examples){assert.ok(e.sentences.length>=5&&e.sentences.length<=7);for(const r of ['opinion','reason','example','wish'])assert.ok(e.sentences.some(s=>s.role===r));}
 assert.equal(new Set(lesson.fields.map(f=>f.id)).size,lesson.fields.length);
});
test('Persisted content is validated without treating student input as markup',()=>{
 const a=cleanAnswers({place:'<script>alert(1)</script>',draft:'a'.repeat(15000),final:123,checks:[true,'true']});
 assert.equal(a.place,'<script>alert(1)</script>');assert.equal(a.draft.length,12000);assert.equal(a.final,'');assert.deepEqual(a.checks,[true,false,false,false,false]);
 assert.equal(wordCount("I think it's a welcoming place."),6);assert.equal(sentenceCount('First idea. Another idea!'),2);
});
test('Every static link and asset exists, no duplicate element IDs',async()=>{
 const html=await readFile('index.html','utf8'),dom=new JSDOM(html);
 const ids=[...dom.window.document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
 for(const el of dom.window.document.querySelectorAll('[src],[href]')){const url=el.getAttribute('src')||el.getAttribute('href');if(url.startsWith('./'))assert.ok((await stat(path.resolve(url))).isFile(),url);}
 dom.window.close();
});
test('PDFs keep all student fields, blank content and checklist',()=>{
 const a=cleanAnswers({place:'금천동 <hello>',final:'My voice. 한글 & English'});
 const json=JSON.stringify(makeDocument('answers',a));
 for(const f of lesson.fields)assert.ok(json.includes(f.label));
 assert.ok(json.includes('금천동 <hello>'));assert.ok(json.includes('(미작성)'));
 for(const type of ['learning','worksheet','teacher'])assert.ok(makeDocument(type).content.length>10);
});
test('Activity UI: steps, input, autosave, reload restoration, safe previews, reset, blocked storage',async()=>{
 const html=await readFile('index.html','utf8');
 async function mount(saved,blocked=false){const dom=new JSDOM(html,{url:'http://localhost/geumcheon-english-neighborhood/'});globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.localStorage=dom.window.localStorage;if(saved)localStorage.setItem('geumcheon-neighborhood-v1',saved);if(blocked){Object.defineProperty(globalThis,'localStorage',{value:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}},configurable:true});}dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false;};await import('../app.js?test='+Math.random());return dom;}
 let dom=await mount();let d=dom.window.document;
 assert.equal(d.querySelectorAll('.panel:not([hidden])').length,1);assert.equal(d.getElementById('prev').disabled,true);
 d.querySelector('[data-step="3"]').click();assert.equal(d.getElementById('panel-3').hidden,false);assert.equal(d.getElementById('step-count').textContent,'04 / 06');
 for(const [id,value] of [['place','금천동'],['draft','I like my neighborhood.'],['final','<img src=x onerror=alert(1)> 우리 동네 & my voice']]){d.getElementById(id).value=value;d.getElementById(id).dispatchEvent(new dom.window.Event('input'));}
 await new Promise(r=>setTimeout(r,300));assert.match(d.getElementById('save-status').textContent,/저장했어요/);assert.equal(d.getElementById('final-preview').querySelector('img'),null);assert.ok(d.getElementById('final-preview').textContent.includes('<img'));
 d.getElementById('check-0').click();const saved=localStorage.getItem('geumcheon-neighborhood-v1');dom.window.close();
 dom=await mount(saved);d=dom.window.document;assert.equal(d.getElementById('place').value,'금천동');assert.equal(d.getElementById('check-0').checked,true);
 d.getElementById('reset').click();d.getElementById('cancel-reset').click();assert.equal(d.getElementById('place').value,'금천동');d.getElementById('reset').click();d.getElementById('confirm-reset').click();assert.equal(d.getElementById('place').value,'');assert.equal(localStorage.getItem('geumcheon-neighborhood-v1'),null);dom.window.close();
 dom=await mount(null,true);d=dom.window.document;d.getElementById('place').value='장소';d.getElementById('place').dispatchEvent(new dom.window.Event('input'));await new Promise(r=>setTimeout(r,300));assert.match(d.getElementById('save-status').textContent,/자동 저장을 사용할 수 없어요/);assert.equal(d.getElementById('place').value,'장소');dom.window.close();
});
