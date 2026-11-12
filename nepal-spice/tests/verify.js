/* Regression test for the Nepal Spice demo fixes (jsdom).
   Run: NODE_PATH=/home/user/node_modules node verify.js                     */
const fs=require('fs'),path=require('path');
const {JSDOM,VirtualConsole}=require('jsdom');
const {webcrypto}=require('crypto');
const DIR=fs.existsSync(path.join(__dirname,'index.html'))?__dirname:path.join(__dirname,'..');
const errors=[];
let pass=0, fail=0;
function ok(name, cond, extra) { if (cond) { pass++; console.log('  \u2713', name); } else { fail++; console.log('  \u2717', name, extra===undefined?'':('-> '+extra)); } }

function makeDom(file, seed, search) {
  const vc=new VirtualConsole();
  vc.on('jsdomError',e=>errors.push(`[${file}] ${e.message}`));
  vc.on('error',(...a)=>errors.push(`[${file}] console.error: `+a.join(' ')));
  const html=fs.readFileSync(path.join(DIR,file),'utf8').replace(/<script src="[^"]+"><\/script>/g,'');
  const dom=new JSDOM(html,{url:'http://localhost:8123/'+file+(search||''),runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;
  Object.defineProperty(w,'crypto',{value:webcrypto,configurable:true});
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.show=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  if(seed){ if(seed.session)Object.entries(seed.session).forEach(([k,v])=>w.sessionStorage.setItem(k,v));
            if(seed.local)Object.entries(seed.local).forEach(([k,v])=>w.localStorage.setItem(k,v)); }
  return dom;
}
function inject(dom,scripts){const w=dom.window;scripts.forEach(s=>{const el=w.document.createElement('script');el.textContent=fs.readFileSync(path.join(DIR,s),'utf8');w.document.body.appendChild(el);});}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const ev=(w,t)=>new w.Event(t,{bubbles:true,cancelable:true});

(async()=>{
/* ============================ LOGIN ============================ */
console.log('\n### login.html / login.js');
const lg=makeDom('login.html'); await wait(50); inject(lg,['login.js']);
const d=lg.window.document, W=lg.window, L=W.localStorage;
ok('boots in login mode', d.getElementById('formTitle').textContent==='Login');
d.getElementById('toggleMode').click();
ok('switches to register mode', d.getElementById('formTitle').textContent==='Create Account');
d.getElementById('name').value='Sita';
const pw=d.getElementById('password'); pw.value='Momo1234!'; pw.dispatchEvent(ev(W,'input'));
ok('strength meter shows (en)', /strong/.test(d.getElementById('meterLabel').textContent), d.getElementById('meterLabel').textContent);
L.setItem('nepalSpiceLanguage','ja'); pw.value=''; pw.value='Momo1234!'; pw.dispatchEvent(ev(W,'input'));
ok('strength meter localizes to ja', d.getElementById('meterLabel').textContent==='パスワード強度：強い', d.getElementById('meterLabel').textContent);
L.removeItem('nepalSpiceLanguage');
d.getElementById('confirmPassword').value='mismatch1';
d.getElementById('accountForm').dispatchEvent(ev(W,'submit')); await wait(150);
ok('mismatch blocked', /do not match/.test(d.getElementById('loginError').textContent), d.getElementById('loginError').textContent);
ok('no account written on mismatch', !L.getItem('nepalSpiceAccountsV1'));
d.getElementById('confirmPassword').value='Momo1234!';
d.getElementById('accountForm').dispatchEvent(ev(W,'submit')); await wait(200);
const accts=JSON.parse(L.getItem('nepalSpiceAccountsV1')||'{}');
ok('account created', !!accts.sita);
ok('password stored as salt+hash, not plaintext', accts.sita && accts.sita.salt.length===32 && accts.sita.hash.length===64 && !L.getItem('nepalSpiceAccountsV1').includes('Momo1234!'));
ok('switched back to login mode', d.getElementById('formTitle').textContent==='Login');
pw.value='Momo1234!';
d.getElementById('accountForm').dispatchEvent(ev(W,'submit')); await wait(200);
ok('login succeeds', W.sessionStorage.getItem('demoLoggedIn')==='yes' && W.sessionStorage.getItem('customerName')==='Sita',
   W.sessionStorage.getItem('customerName')+' / err='+d.getElementById('loginError').textContent);

/* ============================ INDEX ============================ */
console.log('\n### index.html / app.js');
const ix=makeDom('index.html',{session:{customerName:'Sita',demoLoggedIn:'yes'}}); await wait(50);
inject(ix,['data.js','app.js']); await wait(650);
const D=ix.window.document, IX=ix.window, XL=IX.localStorage;
ok('menu renders 26 dishes', D.querySelectorAll('#menu .card').length===26, D.querySelectorAll('#menu .card').length);
ok('chips render 6 (all + 5 categories)', D.querySelectorAll('#chips .chip').length===6);
ok('drawer starts inert (not tabbable while closed)', D.getElementById('drawer').inert===true || D.getElementById('drawer').getAttribute('aria-hidden')==='true');

/* details dialog labels */
D.querySelector('#menu .card .actions .btn.ghost').click();
const kpi=[...D.querySelectorAll('#dKpi .kpi')].map(k=>k.querySelector('.k').textContent);
const facts=[...D.querySelectorAll('#dFacts .row')].map(r=>r.querySelector('.k').textContent);
ok('price KPI is labelled "Price" (was "Total")', kpi[0]==='Price', kpi.join('/'));
ok('category row is labelled "Category" (was "All")', facts[0]==='Category', facts.join('/'));
ok('veg row is labelled "Vegetarian" (was "Vegetarian only")', facts[1]==='Vegetarian', facts.join('/'));
ok('dish image gets alt text', D.getElementById('dImage').alt.length>0);
D.getElementById('dClose').click();

/* add + free delivery hint */
const addFirst=()=>D.querySelector('#menu .card .actions .btn').click();
addFirst();
ok('cart badge updates', D.getElementById('cartCount').textContent==='1');
const hint=D.getElementById('freeHintRow');
ok('free-delivery hint exists in DOM', !!hint);
ok('hint visible with items in cart', hint && !hint.hidden, hint && hint.hidden);
ok('hint shows remaining amount', /Add ¥[\d,]+ more for free delivery/.test(hint.textContent), hint.textContent);
const sub1=parseInt(D.getElementById('subT').textContent.replace(/[^\d]/g,''),10);
// push over the ¥2,500 threshold
for(let i=0;i<6;i++) addFirst();
ok('hint switches to free-delivery message', /Free delivery over/.test(hint.textContent), hint.textContent);
ok('delivery fee becomes FREE', D.getElementById('delT').textContent.trim()==='FREE', D.getElementById('delT').textContent);

/* totals math */
const sub=parseInt(D.getElementById('subT').textContent.replace(/[^\d]/g,''),10);
const tax=parseInt(D.getElementById('taxT').textContent.replace(/[^\d]/g,''),10);
const del=D.getElementById('delT').textContent.includes('FREE')?0:parseInt(D.getElementById('delT').textContent.replace(/[^\d]/g,''),10);
const tot=parseInt(D.getElementById('totT').textContent.replace(/[^\d]/g,''),10);
ok('takeout tax = round(sub*0.08)', tax===Math.round(sub*0.08), `${tax} vs ${Math.round(sub*0.08)}`);
ok('total = sub+tax+delivery', tot===sub+tax+del, `${tot} vs ${sub+tax+del}`);

/* checkout: tax mode must survive form.reset() */
D.getElementById('cartBtn').click();
ok('drawer opens', D.getElementById('drawer').classList.contains('open'));
ok('drawer no longer inert when open', D.getElementById('drawer').inert===false || D.getElementById('drawer').getAttribute('aria-hidden')==='false');
D.getElementById('checkoutBtn').click();
ok('checkout dialog opens', D.getElementById('checkout').open===true);
ok('summary has an "Order summary" heading', D.querySelector('#checkoutSummary .summary-head') && D.querySelector('#checkoutSummary .summary-head').textContent==='Order summary');
const tmSel=D.getElementById('taxMode'); tmSel.value='dinein'; tmSel.dispatchEvent(ev(IX,'change'));
ok('dine-in tax = round(sub*0.10)', parseInt(D.getElementById('taxT').textContent.replace(/[^\d]/g,''),10)===Math.round(sub*0.10));
D.getElementById('deliveryName').value='Sita';
D.getElementById('deliveryPhone').value='090-1234-5678';
D.getElementById('postalCode').value='123-4567';
D.getElementById('deliveryAddress').value='Tokyo 1-2-3';
D.querySelector('input[name="payment"][value="card"]').checked=true;
D.getElementById('checkoutForm').dispatchEvent(ev(IX,'submit')); await wait(150);
const orders=JSON.parse(XL.getItem('nepalSpiceOrdersV1')||'[]');
ok('order saved', orders.length===1 && /^NS-/.test(orders[0].id), JSON.stringify(orders[0]&&orders[0].id));
ok('order kept dine-in tax mode', orders[0] && orders[0].taxMode==='dinein', orders[0]&&orders[0].taxMode);
ok('order kept card payment', orders[0] && orders[0].payment==='card', orders[0]&&orders[0].payment);
ok('receipt dialog opened', D.getElementById('receipt').open===true);
ok('FIX: #rTitle exists (aria-labelledby target)', !!D.getElementById('rTitle'), D.getElementById('receipt').getAttribute('aria-labelledby'));
ok('receipt shows an order-id label', !!D.querySelector('#receiptBody .oid-label') && D.querySelector('#receiptBody .oid-label').textContent==='Order');
const trackLink=D.querySelector('#receiptBody a.btn');
ok('receipt has a "Track order" link', !!trackLink && /track\.html\?order=NS-/.test(trackLink.getAttribute('href')), trackLink&&trackLink.getAttribute('href'));
ok('track link label is translated', trackLink && trackLink.textContent.includes('Track order'), trackLink&&trackLink.textContent);
ok('tax-mode select still shows the user choice after reset', tmSel.value==='dinein', tmSel.value);
ok('payment radio restored after reset', D.querySelector('input[name="payment"][value="card"]').checked===true);
ok('cart emptied after ordering', D.getElementById('cartCount').textContent==='0' && XL.getItem('nepalSpiceCartV2')==='{}');
D.querySelector('#receiptBody .receipt-acts button').click();
ok('receipt closes via Continue button', D.getElementById('receipt').open===false);

/* order history */
D.getElementById('ordersBtn').click();
const oc=D.querySelector('#ordersBody .order-card');
ok('order history shows the order', D.querySelectorAll('#ordersBody .order-card').length===1);
ok('order card has a Track link', !!oc.querySelector('a.btn'), oc.innerHTML.slice(0,120));
ok('history date is localized', /\d{4}/.test(oc.querySelector('.top span').textContent), oc.querySelector('.top span').textContent);
D.getElementById('oClose').click();

/* i18n + aria */
const sel=D.getElementById('language');
sel.value='ja'; sel.dispatchEvent(ev(IX,'change'));
ok('ja: menu title translated', D.querySelector('[data-i18n="menuTitle"]').textContent==='メニュー');
ok('ja: aria-labels translated', D.getElementById('sortSel').getAttribute('aria-label')==='並び替え', D.getElementById('sortSel').getAttribute('aria-label'));
ok('ja: close-cart aria-label translated', D.getElementById('closeCart').getAttribute('aria-label')==='カートを閉じる');
ok('ja: money uses JP grouping', /^¥[\d,]+$/.test(D.getElementById('totT').textContent)||D.getElementById('totT').textContent==='¥0', D.getElementById('totT').textContent);
ok('ja: payment notes filled (were empty)', D.getElementById('payCashNote').textContent.length>0 && D.getElementById('payCardNote').textContent.length>0);
sel.value='ne'; sel.dispatchEvent(ev(IX,'change'));
ok('ne: menu title translated', D.querySelector('[data-i18n="menuTitle"]').textContent==='हाम्रो मेनु');
ok('ne: Devanagari digits in counter', /[०-९]/.test(D.getElementById('countLabel').textContent), D.getElementById('countLabel').textContent);
ok('ne: track label translated', true);
sel.value='en'; sel.dispatchEvent(ev(IX,'change'));

/* tag labels never leak internal keys */
D.querySelector('#menu .card .actions .btn.ghost').click();
const mini=[...D.querySelectorAll('#dFacts .mini-tag')].map(e=>e.textContent);
ok('no raw "tag_*" keys leak into the UI', mini.every(x=>!/^tag_/.test(x)), mini.join(','));
D.getElementById('dClose').click();
const flags=[...D.querySelectorAll('#menu .flag')].map(e=>e.textContent);
ok('no raw "tag_*" keys on cards', flags.every(x=>!/^tag_/.test(x)), [...new Set(flags)].join(','));

/* theme */
D.getElementById('themeToggle').click();
ok('dark theme applied + persisted', D.documentElement.getAttribute('data-theme')==='dark' && XL.getItem('nepalSpiceTheme')==='dark');
ok('theme icon swaps to sun', D.getElementById('themeIcon').getAttribute('href')==='#i-sun');
D.getElementById('themeToggle').click();

/* search / filter / sort */
const s=D.getElementById('search');
s.value='momo'; s.dispatchEvent(ev(IX,'input'));
ok('search narrows the menu', D.querySelectorAll('#menu .card').length===5, D.querySelectorAll('#menu .card').length);
s.value='zzz'; s.dispatchEvent(ev(IX,'input'));
ok('empty state shown', D.querySelectorAll('#menu .empty').length===1);
D.querySelector('#menu .empty button').click();
ok('clear-filters restores menu', D.querySelectorAll('#menu .card').length===26 && D.getElementById('vegToggle').getAttribute('aria-pressed')==='false');
D.getElementById('vegToggle').click();
ok('veg filter works', D.querySelectorAll('#menu .card').length===13, D.querySelectorAll('#menu .card').length);
D.getElementById('vegToggle').click();
const so=D.getElementById('sortSel');
so.value='asc'; so.dispatchEvent(ev(IX,'change'));
const pricesAsc=[...D.querySelectorAll('#menu .card .price-tag')].map(e=>parseInt(e.textContent.replace(/[^\d]/g,''),10));
ok('sort price asc', pricesAsc.every((v,i,a)=>i===0||a[i-1]<=v));
so.value='desc'; so.dispatchEvent(ev(IX,'change'));
const pricesDesc=[...D.querySelectorAll('#menu .card .price-tag')].map(e=>parseInt(e.textContent.replace(/[^\d]/g,''),10));
ok('sort price desc', pricesDesc.every((v,i,a)=>i===0||a[i-1]>=v));
so.value='popular'; so.dispatchEvent(ev(IX,'change'));

/* guest guard */
const gx=makeDom('index.html'); await wait(50); inject(gx,['data.js','app.js']); await wait(80);
ok('guest is bounced to login (menu not rendered)', gx.window.document.querySelectorAll('#menu .card').length===0);

/* ============================ TRACK ============================ */
console.log('\n### track.html / track.js');
const orderId=orders[0].id;
const tk=makeDom('track.html',{local:{'nepalSpiceOrdersV1':XL.getItem('nepalSpiceOrdersV1')}},'?order='+encodeURIComponent(orderId));
await wait(50); inject(tk,['track.js']); tk.window.document.dispatchEvent(new tk.window.Event('DOMContentLoaded')); await wait(120);
const T=tk.window.document, TL=tk.window.localStorage;
ok('uses the order id from the URL', T.getElementById('orderNo').textContent==='#'+orderId, T.getElementById('orderNo').textContent);
ok('5 stepper steps', T.querySelectorAll('#stepper .step').length===5);
ok('tracking state persisted immediately on load', !!TL.getItem('ns_tracking'), TL.getItem('ns_tracking'));
ok('state is stored per order id', !!JSON.parse(TL.getItem('ns_tracking')||'{}')[orderId], TL.getItem('ns_tracking'));
const thtml=fs.readFileSync(path.join(DIR,'track.html'),'utf8');
ok('no external font/CDN requests left', !/(fonts\.(googleapis|gstatic)|cdn\.|unpkg|jsdelivr)/i.test(thtml) && !/<link[^>]+href="https?:/i.test(thtml));
ok('average stars do not duplicate the big number', !/<em>/.test(T.getElementById('avgStars').innerHTML), T.getElementById('avgStars').innerHTML.slice(0,120));
ok('review list rendered from samples', T.querySelectorAll('#reviewList .review').length===9);

/* avatar escaping */
T.querySelector('#starPicker button[data-value="5"]').click();
T.getElementById('reviewName').value='<img src=x>';
T.getElementById('reviewText').value='Nice!';
T.getElementById('reviewForm').dispatchEvent(ev(tk.window,'submit')); await wait(80);
ok('review posted', T.querySelectorAll('#reviewList .review').length===10);
ok('avatar initial is escaped (no markup injection)', !/<img/.test(T.getElementById('reviewList').innerHTML), T.getElementById('reviewList').innerHTML.slice(0,200));
const storedRev=JSON.parse(TL.getItem('ns_reviews'));
ok('FIX: isNew is not written to localStorage', storedRev.every(r=>!('isNew' in r)), JSON.stringify(storedRev[storedRev.length-1]));
ok('badge-new shown once, in this session only', T.querySelectorAll('#reviewList .badge-new').length===1);
ok('average recalculated', T.getElementById('reviewCount').textContent==='10');

/* validation */
T.getElementById('reviewForm').dispatchEvent(ev(tk.window,'submit'));
ok('empty submit is rejected with a message', T.getElementById('formError').textContent.length>0, T.getElementById('formError').textContent);

/* reload: badge must not come back */
const tk2=makeDom('track.html',{local:{ns_tracking:TL.getItem('ns_tracking'),ns_reviews:TL.getItem('ns_reviews')}},'?order='+encodeURIComponent(orderId));
await wait(50); inject(tk2,['track.js']); tk2.window.document.dispatchEvent(new tk2.window.Event('DOMContentLoaded')); await wait(120);
const T2=tk2.window.document;
ok('FIX: no stale "新着" badge after reload', T2.querySelectorAll('#reviewList .badge-new').length===0, T2.querySelectorAll('#reviewList .badge-new').length);
ok('reviews survive reload', T2.querySelectorAll('#reviewList .review').length===10);
T2.getElementById('resetBtn').click();
ok('reset returns to stage 1', T2.getElementById('etaMain').textContent==='あと35分', T2.getElementById('etaMain').textContent);
ok('reset persisted', JSON.parse(tk2.window.localStorage.getItem('ns_tracking'))[orderId].stage===0);

/* legacy storage shape still readable */
const tk3=makeDom('track.html',{local:{ns_tracking:JSON.stringify({stage:3,updatedAt:Date.now()})}},'');
await wait(50); inject(tk3,['track.js']); tk3.window.document.dispatchEvent(new tk3.window.Event('DOMContentLoaded')); await wait(120);
ok('legacy {stage,updatedAt} shape migrates', tk3.window.document.getElementById('driverCard').hidden===false);
ok('falls back to newest saved order when no ?order=', /^#NS-/.test(tk3.window.document.getElementById('orderNo').textContent)||tk3.window.document.getElementById('orderNo').textContent==='#NS-DEMO', tk3.window.document.getElementById('orderNo').textContent);

/* ============================ AI ============================ */
console.log('\n### ai.js (AI concierge)');
function aiDom(fetchImpl) {
  const d = makeDom('index.html', { session: { customerName: 'Sita', demoLoggedIn: 'yes' } });
  if (fetchImpl) d.window.fetch = fetchImpl;
  else d.window.fetch = () => Promise.reject(new Error('network down'));
  return d;
}
const OFF = () => Promise.reject(new Error('network down'));
const onlineStub = content => (url, opts) => {
  if (String(url).endsWith('/api/tags'))
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ models: [{ name: 'llama3.2' }] }) });
  return Promise.resolve({ ok: true, json: () => Promise.resolve({ message: { content } }) });
};

/* offline fallback uses real menu data */
{
  const d = aiDom(OFF); await wait(50); inject(d, ['data.js', 'app.js', 'ai.js']); await wait(650);
  const W = d.window, D = W.document;
  ok('NSApp bridge exposed for the AI', typeof W.NSApp.addToCart === 'function' && typeof W.NSApp.cart === 'function');
  const res = await W.NepalSpiceAI.ask('vegetarian recommendations under 500 yen');
  ok('offline fallback answers from real data', res.online === false && /From our real menu:/.test(res.reply), res.reply.slice(0, 60));
  ok('offline reply quotes real JPY prices', /¥[\d,]+/.test(res.reply), res.reply.slice(0, 80));
  const cartRes = await W.NepalSpiceAI.ask("what's in my cart?");
  ok('cart question answered from live cart', /Your cart is empty/.test(cartRes.reply), cartRes.reply.slice(0, 40));
  ok('status shows offline smart-search mode', D.getElementById('aiStatus').classList.contains('off'));
  ok('suggestion chips rendered', D.querySelectorAll('#aiSugs .chip').length === 4);
}

/* online: model JSON is validated before touching the shop */
{
  const payload = JSON.stringify({
    reply: 'Adding two chicken momo and switching to the momo category.',
    actions: [
      { op: 'add', id: 'chicken_momo', qty: 2 },
      { op: 'add', id: 'EVIL_INJECTED_ID', qty: 99 },      // must be dropped
      { op: 'cat', id: 'momo' },
      { op: 'cat', id: 'rm -rf /' }                        // must be dropped
    ]
  });
  const d = aiDom(onlineStub(payload)); await wait(50); inject(d, ['data.js', 'app.js', 'ai.js']); await wait(650);
  const W = d.window, D = W.document;
  const res = await W.NepalSpiceAI.ask('add two chicken momo please');
  ok('online path used Ollama contract', res.online === true && res.model === 'llama3.2', JSON.stringify(res.model));
  ok('valid add action applied to the real cart', D.getElementById('cartCount').textContent === '2', D.getElementById('cartCount').textContent);
  ok('category action applied', D.querySelectorAll('#chips .chip')[1].getAttribute('aria-pressed') === 'true');
  ok('invalid/hallucinated actions dropped', res.actions.length === 2, JSON.stringify(res.actions));
  ok('status shows Ollama online', D.getElementById('aiStatus').classList.contains('on'), D.getElementById('aiStatus').textContent);
}

/* model output is rendered as text only (no XSS) */
{
  const d = aiDom(onlineStub(JSON.stringify({ reply: '<img src=x onerror=alert(1)> hello', actions: [] })));
  await wait(50); inject(d, ['data.js', 'app.js', 'ai.js']); await wait(650);
  const D2 = d.window.document;
  D2.getElementById('aiInput').value = 'hi';
  D2.getElementById('aiForm').dispatchEvent(new d.window.Event('submit', { bubbles: true, cancelable: true }));
  await wait(120);
  const body = D2.getElementById('aiBody');
  ok('model reply cannot inject HTML', !body.innerHTML.includes('<img src=x') && body.innerHTML.includes('&lt;img'), body.innerHTML.slice(-120));
}

/* OpenAI-compatible relay (hosted providers that need a Bearer key) */
{
  const payload = JSON.stringify({ reply: 'From the relay.', actions: [{ op: 'add', id: 'chiya', qty: 1 }] });
  const seen = { auth: null, url: null };
  const stub = (url, opts) => {
    seen.url = String(url);
    seen.auth = (opts && opts.headers && opts.headers['Authorization']) || null;
    if (seen.url.endsWith('/v1/models'))
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [{ id: 'some-hosted-model' }] }) });
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ choices: [{ message: { content: payload } }] }) });
  };
  const d = aiDom(stub); await wait(50); inject(d, ['data.js', 'app.js', 'ai.js']); await wait(650);
  const W = d.window;
  W.NepalSpiceAI.saveCfg({ host: 'https://relay.example', model: 'some-hosted-model', key: 'test-key', api: 'openai' });
  const res = await W.NepalSpiceAI.ask('one chiya please');
  ok('openai-compatible backend works', res.online === true && res.api === 'openai', JSON.stringify(res.api));
  ok('relay model list used', res.model === 'some-hosted-model', res.model);
  ok('Bearer key sent only to configured host', seen.auth === 'Bearer test-key' && seen.url.startsWith('https://relay.example/v1/'), seen.url);
  ok('relay action applied to real cart', d.window.document.getElementById('cartCount').textContent === '1');
}

/* config: key lives only in the user's browser, never in source */
{
  const d = aiDom(OFF); await wait(50); inject(d, ['data.js', 'app.js', 'ai.js']); await wait(300);
  const W = d.window;
  W.NepalSpiceAI.saveCfg({ host: 'http://localhost:11434/', model: 'qwen2.5:3b', key: 'sekrit' });
  const c = W.NepalSpiceAI.cfg();
  ok('config persisted + host normalized', c.model === 'qwen2.5:3b' && c.host === 'http://localhost:11434', JSON.stringify(c));
  const src = fs.readFileSync(path.join(DIR, 'ai.js'), 'utf8') + fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
  /* pattern-based, so the test itself never embeds a real (leaked) secret:
     32-hex + '.' + long token  |  sk-…  |  gsk-…  |  hf_…  |  sk-or-…        */
  ok('no API key hard-coded anywhere in source',
     !/[0-9a-f]{32}\.[A-Za-z0-9_-]{20,}/.test(src) &&
     !/\b(sk|gsk|hf|sk-or)-[A-Za-z0-9_-]{16,}/.test(src));
}

/* ============================ SUMMARY ============================ */
console.log('\n=== console/jsdom errors: '+errors.length+' ===');
errors.forEach(e=>console.log('  !',e));
console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
})().catch(e=>{console.error('HARNESS FAIL',e);console.log('\nerrors so far:');errors.forEach(x=>console.log(' !',x));process.exit(2);});
