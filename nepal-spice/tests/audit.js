const fs=require('fs'),path=require('path');
const vm=require('vm');
const DIR=fs.existsSync(path.join(__dirname,'index.html'))?__dirname:path.join(__dirname,'..');
const rd=f=>fs.readFileSync(path.join(DIR,f),'utf8');
const ctx={};vm.createContext(ctx);
vm.runInContext(rd('data.js'),ctx);
const {I18N,FOODS,CATEGORIES,RESTAURANT}=ctx;
const app=rd('app.js');
const idx=rd('index.html');
const trackHtml=rd('track.html');
const trackJs=rd('track.js');
const styleCss=rd('style.css');
const trackCss=rd('track.css');

console.log('=== 1. i18n keys used by app.js missing from data.js ===');
const used=new Set();
for(const m of app.matchAll(/\bt\(\s*"([a-zA-Z0-9_]+)"\s*\)/g)) used.add(m[1]);
for(const m of app.matchAll(/t\((?:taxMode|[^)]*)\)/g)){}
// dynamic: t("tag_"+tag)
const tags=new Set();FOODS.forEach(f=>(f.tags||[]).forEach(t=>tags.add(t)));
tags.forEach(t=>used.add('tag_'+t));
used.add('takeout');used.add('dinein');used.add('cash');used.add('card');
const langs=['en','ja','ne'];
let miss=0;
[...used].sort().forEach(k=>langs.forEach(l=>{if(!(k in I18N[l])){console.log('  MISSING',l,'->',k);miss++;}}));
console.log('  total missing:',miss);
console.log('  tags in data:',[...tags].join(', '));

console.log('\n=== 2. keys defined but never used ===');
const all=new Set(Object.keys(I18N.en));
[...all].filter(k=>!used.has(k)&&!app.includes('"'+k+'"')&&!idx.includes('"'+k+'"')).forEach(k=>console.log('  unused:',k));

console.log('\n=== 3. parity of i18n key sets ===');
langs.forEach(l=>{
  const s=new Set(Object.keys(I18N[l]));
  const d1=[...Object.keys(I18N.en)].filter(k=>!s.has(k));
  const d2=[...s].filter(k=>!Object.keys(I18N.en).includes(k));
  console.log('  ',l,'count=',s.size,'missingVsEn=',d1.join(',')||'-','extraVsEn=',d2.join(',')||'-');
});

console.log('\n=== 4. $("#id") in app.js that do not exist in index.html ===');
const ids=new Set([...idx.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const refs=new Set([...app.matchAll(/\$\("#([A-Za-z0-9_-]+)"\)/g)].map(m=>m[1]));
[...refs].forEach(r=>{if(!ids.has(r))console.log('  MISSING ELEMENT #'+r)});
console.log('  checked',refs.size,'refs; index has',ids.size,'ids');
console.log('  ids in html never referenced by app.js:',[...ids].filter(i=>!refs.has(i)&&!app.includes("'#"+i+"'")&&!app.includes('"'+i+'"')).join(', '));

console.log('\n=== 5. aria-labelledby targets ===');
[...idx.matchAll(/aria-labelledby="([^"]+)"/g)].forEach(m=>{
  const inJs = app.includes('.id = "' + m[1] + '"') || app.includes(".id = '" + m[1] + "'");
  console.log('  ', m[1], '->', ids.has(m[1]) ? 'static ok' : (inJs ? 'created in app.js (ok)' : '*** MISSING ***'));
});
[...trackHtml.matchAll(/aria-labelledby="([^"]+)"/g)].forEach(m=>console.log('  track:',m[1],'->',trackHtml.includes('id="'+m[1])?'ok':'*** MISSING ***'));

console.log('\n=== 6. $("id") in track.js missing from track.html ===');
const tids=new Set([...trackHtml.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const trefs=new Set([...trackJs.matchAll(/\$\('([^']+)'\)/g)].map(m=>m[1]));
[...trefs].forEach(r=>{if(!tids.has(r))console.log('  MISSING #'+r)});
console.log('  ok, checked',trefs.size);

console.log('\n=== 7. classes emitted by JS but absent from CSS ===');
function clsFrom(js,css,label){
  const cls=new Set();
  for(const m of js.matchAll(/className\s*=\s*"([^"]+)"/g)) m[1].split(/\s+/).forEach(c=>c&&cls.add(c));
  for(const m of js.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach(c=>c&&cls.add(c));
  for(const m of js.matchAll(/class='([^']+)'/g)) m[1].split(/\s+/).forEach(c=>c&&cls.add(c));
  for(const m of js.matchAll(/classList\.(?:add|toggle)\("([^"]+)"/g)) cls.add(m[1]);
  const missing=[...cls].filter(c=>!new RegExp('\\.'+c.replace(/[-]/g,'\\-')+'(?![\\w-])').test(css));
  console.log('  '+label+': '+(missing.length?missing.join(', '):'none'));
}
clsFrom(app,styleCss+idx,'app.js vs style.css');
clsFrom(trackJs,trackCss+trackHtml,'track.js vs track.css');
console.log('  html classes vs css:');
const htmlCls=new Set();
[...idx.matchAll(/class="([^"]+)"/g)].forEach(m=>m[1].split(/\s+/).forEach(c=>c&&htmlCls.add(c)));
console.log('    index.html:',[...htmlCls].filter(c=>!new RegExp('\\.'+c+'(?![\\w-])').test(styleCss)).join(', ')||'none');
const thCls=new Set();
[...trackHtml.matchAll(/class="([^"]+)"/g)].forEach(m=>m[1].split(/\s+/).forEach(c=>c&&htmlCls.add(c)));
[...trackHtml.matchAll(/class="([^"]+)"/g)].forEach(m=>m[1].split(/\s+/).forEach(c=>c&&thCls.add(c)));
console.log('    track.html:',[...thCls].filter(c=>!new RegExp('\\.'+c+'(?![\\w-])').test(trackCss)).join(', ')||'none');

console.log('\n=== 8. data integrity ===');
const catIds=new Set(CATEGORIES.map(c=>c.id));
FOODS.forEach(f=>{
  if(!catIds.has(f.cat))console.log('  bad cat',f.id,f.cat);
  if(!f.img||!/^images\//.test(f.img))console.log('  bad img',f.id,f.img);
  ['en','ja','ne'].forEach(l=>{if(!f.name[l])console.log('  missing name',f.id,l);if(!f.desc[l])console.log('  missing desc',f.id,l);});
  if(!(f.spice>=0&&f.spice<=3))console.log('  bad spice',f.id,f.spice);
  if(typeof f.veg!=='boolean')console.log('  bad veg',f.id);
  if(!Array.isArray(f.allergens))console.log('  bad allergens',f.id);
  if(!(f.rating>0&&f.rating<=5))console.log('  bad rating',f.id,f.rating);
});
const idsF=new Set();FOODS.forEach(f=>{if(idsF.has(f.id))console.log('  dup id',f.id);idsF.add(f.id)});
console.log('  foods:',FOODS.length,'categories:',CATEGORIES.length,'unique ids:',idsF.size);
CATEGORIES.forEach(c=>['en','ja','ne'].forEach(l=>{if(!c.name[l])console.log('  missing cat name',c.id,l)}));
console.log('  RESTAURANT:',JSON.stringify(RESTAURANT));
const perCat={};FOODS.forEach(f=>perCat[f.cat]=(perCat[f.cat]||0)+1);
console.log('  per category:',JSON.stringify(perCat));
console.log('  empty categories:',CATEGORIES.filter(c=>!perCat[c.id]).map(c=>c.id).join(',')||'none');

console.log('\n=== 9. sample review itemIds exist in FOODS? ===');
for(const m of trackJs.matchAll(/itemId:\s*'([^']+)'/g)) console.log('  ',m[1],'->',idsF.has(m[1])?'ok':'*** NOT IN MENU ***');

console.log('\n=== 12. CSS parse check (a single typo can kill a whole stylesheet) ===');
/* One stray "}" inside var(...) made Chrome drop every rule after it and the
   login page rendered with no layout at all. css-tree ships as a transitive
   dependency of jsdom, so this guard costs nothing extra.                  */
try {
  const csstree = require('css-tree');
  for (const f of ['style.css', 'track.css']) {
    const errs = [];
    csstree.parse(rd(f), { positions: true,
      onParseError: e => errs.push('line ' + e.line + ': ' + e.message.split('\n')[0]) });
    if (errs.length) { console.log('  *** ' + f + ' has ' + errs.length + ' parse error(s):'); errs.slice(0, 8).forEach(e => console.log('      ' + e)); }
    else console.log('  ' + f + ': clean');
  }
} catch (e) {
  console.log('  (css-tree unavailable — npm install jsdom first) skipped');
}

console.log('\n=== 11. dish images on disk ===');
/* minimal JPEG SOF parser: reads width/height without any dependency */
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || (marker >= 0x01 && marker <= 0x09) || marker === 0x0b ||
        marker === 0x0c || marker === 0xff || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}
(function () {
  const imgDir = path.join(DIR, 'images');
  const have = fs.existsSync(imgDir) ? new Set(fs.readdirSync(imgDir)) : new Set();
  let present = 0, sized = 0, bad = [];
  const missing = [];
  FOODS.forEach(f => {
    const rel = f.img.replace(/^images\//, '');
    if (!have.has(rel)) { missing.push(f.id); return; }
    present++;
    const buf = fs.readFileSync(path.join(imgDir, rel));
    const dim = jpegSize(buf);
    if (!dim) { bad.push(rel + ' (not a JPEG)'); return; }
    if (dim.w === 800 && dim.h === 600) sized++;
    else bad.push(rel + ' (' + dim.w + 'x' + dim.h + ', expected 800x600)');
  });
  console.log('  present: ' + present + '/' + FOODS.length);
  console.log('  at 800x600: ' + sized + '/' + present);
  if (bad.length) console.log('  *** wrong format/size: ' + bad.join(', '));
  if (missing.length) console.log('  missing (card shows generated placeholder): ' + missing.join(', '));
  else console.log('  missing: none');
  const credits = path.join(imgDir, 'CREDITS.md');
  console.log('  CREDITS.md: ' + (fs.existsSync(credits) ? 'present' : '*** MISSING ***'));
})();

console.log('\n=== 10. external resources (offline check) ===');
[idx,trackHtml,rd('login.html')].forEach((h,i)=>{
  const ext=[...h.matchAll(/(?:href|src)="(https?:[^"]+)"/g)].map(m=>m[1]);
  console.log('  file',i,ext.length?ext.join('\n        '):'no external refs');
});
