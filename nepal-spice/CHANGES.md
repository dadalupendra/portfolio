# CHANGES — के–के ठिक गरियो / What was fixed

ठेगान: सबै fix **bug fix** मात्र हुन् — डिजाइन/लेआउट जस्ताको तस्तै राखिएको छ।
All fixes below are **bug fixes**; the visual design was left as it was.

परीक्षण / Verification: `node tests/verify.js` → **83 passed, 0 failed**
स्थायी जाँच / Static audit: `node tests/audit.js` → **0 missing i18n keys, 0 broken ARIA refs**

---

## 1. ठूलो बग (Functional bugs)

### 1.1 Checkout — tax mode बिग्रन्थ्यो
`app.js` मा अर्डर confirm गरेपछि `form.reset()` चलाइन्थ्यो। `reset()` ले HTML को
**default** state फर्काउँछ, त्यसैले `#taxMode` dropdown आफैँ `Takeout (8%)` मा फर्कन्थ्यो —
तर भित्रको `taxMode` variable मा `dinein` नै रहन्थ्यो।

नतिजा: dropdown ले "Takeout 8%" देखाउँथ्यो, cart ले "Dine-in 10%" कर जोड्थ्यो। दुई ठाउँमा
फरक–फरक कुरा। (स्क्रिनमा देखिने, तर नदेखिने गल्ती।)

**Fix:** `reset()` पछि dropdown र payment radio दुवैलाई active value मा फर्काइयो।
अब अर्को अर्डरमा पनि प्रयोगकर्ताको छनोट याद रहन्छ।

### 1.2 Dish details — गलत label
| ठाउँ | पहिले | अब |
|---|---|---|
| मूल्यको KPI tile | **"Total"** | **"Price"** / 価格 / मूल्य |
| Category row | **"All"** | **"Category"** / カテゴリー / श्रेणी |
| Veg row | **"Vegetarian only"** (filter को नाम) | **"Vegetarian"** / ベジタリアン / शाकाहारी |

तीनवटै ठाउँमा अर्कै key प्रयोग भएको थियो (`t("total")`, `t("all")`, `t("vegOnly")`)।
नयाँ key `price`, `category`, `vegetarian` en/ja/ne तीनवटै भाषामा थपियो।

### 1.3 Review — "新着" badge सधैँ टाँसिन्थ्यो
`handleSubmit()` ले `isNew: true` सहित review लाई `localStorage` मा बचाउँथ्यो।
त्यसपछि `renderReviews()` ले memory बाट `isNew` मेटाउँथ्यो तर **storage बाट होइन**।

नतिजा: page reload गर्दा त्यही review मा फेरि "新着" badge देखिन्थ्यो — सधैँभरि।

**Fix:** `stripTransient()` थपियो — `isNew` display-only भयो, कहिल्यै save हुँदैन।
पुरानो version ले पहिल्यै save गरिसकेको भए `loadReviews()` ले पढ्दा नै हटाइदिन्छ।

### 1.4 Order tracking — state बेलैमा save हुँदैनथ्यो
`loadTracking()` ले "catch-up" गरेर नयाँ `updatedAt` फर्काउँथ्यो, तर save गर्दैनथ्यो।
`ns_tracking` खाली नै रहन्थ्यो जबसम्म पहिलो 8-second tick चल्दैन।

नतिजा: ८ सेकेन्डभित्र page बन्द गरे state हराउँथ्यो — तर HTML मै लेखिएको थियो
"現在の状態は localStorage に保存される"।

साथै, tracking state **global** थियो: अर्डर A हेरेर अर्डर B खोल्दा A को stage देखिन्थ्यो।

**Fix:** load गर्नासाथ save गरिन्छ, र state अब **per order id** राखिन्छ
(`{ "NS-XXXX": { stage, updatedAt } }`)। पुरानो format आए आफैँ migrate हुन्छ।

### 1.5 `addToCart()` crash
`food(id)` ले नचिनेको id मा `null` फर्काउँछ, तर code ले सिधै `f.name[language]` पढ्थ्यो
→ `TypeError: Cannot read properties of null`। **Fix:** null guard थपियो।

### 1.6 Unknown tag ले internal key देखाउँथ्यो
`t("tag_" + tag) || tag` — `t()` ले नभेटेको key मा **key नै** फर्काउने हुनाले `|| tag`
कहिल्यै चल्दैनथ्यो। नयाँ tag थपे UI मा `tag_xyz` देखिन्थ्यो।
**Fix:** `has()` + `tagLabel()` helper थपियो।

---

## 2. Accessibility

| समस्या | Fix |
|---|---|
| `#receipt` मा `aria-labelledby="rTitle"` थियो तर `#rTitle` element नै थिएन → dialog को accessible name थिएन | receipt को `<h3>` लाई `id="rTitle"` दिइयो |
| बन्द भएको cart drawer पनि Tab order र screen-reader tree मा थियो | `inert` attribute; खोल्दा focus drawer भित्र, बन्द गर्दा पहिलेको button मा फर्कन्छ |
| Cart को +/− button "minus" / "plus" मात्र भन्थ्यो | "Remove: Chicken Momo" / "Add: Chicken Momo" (अनुवादित) |
| Language, Sort, Search, Theme, Close button को `aria-label` English मै hard-code | `data-i18n-aria` mechanism थपियो — अब तीनवटै भाषामा बदलिन्छ |
| Rating summary को तारा समूहलाई screen reader ले बुझ्दैनथ्यो | `role="img"` + `aria-label="5段階中 4.5"` |

---

## 3. Offline / सफाइ

- **`track.html` ले Google Fonts माग्थ्यो** (३ वटा external request)। README मै
  "fully offline" लेखिएको छ। Internet नहुँदा first paint अड्किन्थ्यो।
  → हटाइयो; `track.css` मा पहिल्यै पूरा local font stack छ।
- **Avatar मा नामको पहिलो अक्षर escape गरिएको थिएन** — `<img src=x>` जस्तो नामले
  markup बिगार्थ्यो। → `escapeHtml()` लगाइयो।
- **`index.html` का मरेका SVG symbol** (`i-globe`, `i-eye`, `i-eyeoff`) हटाइयो।
- **`track.js` को cross-tab `storage` sync** ले timer restart/stop गर्दैनथ्यो → गरियो।
- **`starsHTML()` को `sizeClass` param कहिल्यै प्रयोग हुँदैनथ्यो**, र average summary मा
  सानो तारा समूहले ठूलो `4.5` को ठीक छेउमा फेरि `4.5` देखाउँथ्यो (number दोहोरिन्थ्यो)।
  → `showValue` param थपियो, `.review-stars.small` CSS थपियो।

---

## 4. प्रयोग नभएका translation string अब प्रयोगमा

पहिले `data.js` मा परिभाषित तर कतै नप्रयोग भएका १० वटा key थिए। अब:

`orderSummary` (checkout summary को heading) · `freeHint` + नयाँ `freeProgress`
(cart मा "थप ¥1,320 जोड्नुहोस् → निःशुल्क डेलिभरी") · `orderId` (receipt मा label) ·
`date` (order history) · `sort`, `language`, `theme` (aria-label) · `qty`, `remove`
(cart stepper) · `menuSub` (मेनुको subtitle)।

Login को password-strength meter मा ja/ne string परिभाषित थिए तर label English मै
थियो → अब `nepalSpiceLanguage` हेरेर अनुवाद हुन्छ।

अब एउटा मात्र key बाँकी छ: `tag_new` — कुनै dish मा "new" tag छैन, तर भविष्यका लागि
राख्नु ठीक (audit.js ले पनि यो स्वीकार गर्छ)।

---

## 5. साना थप (नयाँ feature होइन, खाली ठाउँ भरिएको)

- Receipt मा **Track order** button + delivery ETA + order-number label।
- Order history को हरेक card मा **Track order** link।
- `track.html` मा **"メニューに戻る"** link (पहिले यो page कतैबाट पनि खुल्दैनथ्यो —
  orphan थियो, र order number `#NS-2401` hard-code थियो)।
- Checkout मा payment card भित्रका `#payCashNote` / `#payCardNote` खाली `<span>` थिए
  (JS ले सधैँ `""` हाल्थ्यो) → अब काम लाग्ने कुरा लेखिएको छ।
- Order history को मिति browser को default locale मा थियो → अब छानिएको भाषा अनुसार।
- `<noscript>` message थपियो।

---

## 6. जस्ताको तस्तै राखिएको (नछोइएका कुरा)

- Auth logic (salted SHA-256), price/tax/delivery नियम (8%/10%, ¥300, ¥2,500 free),
  20 dishes, 5 categories, light/dark theme, सबै डिजाइन tokens।
- `track.js` को demo timing (8 सेकेन्ड = १ stage) र sample reviews।
- Login मा mode toggle गर्दा password field खाली हुने व्यवहार (सुरक्षाका लागि जानी–जानी)।
- `images/` र `tests/smoke.js` / `tests/login_smoke.js` — ती तपाईंले पठाउनु बाँकी छ;
  नआएसम्म dish card ले generated placeholder देखाउँछ (fallback पहिल्यै छ)।

---

## 7. दोस्रो batch: फोटाहरू / Images received

पठाउनुभएका ९ वटा फोटा + `CREDITS.md` आयो:

| प्राप्त | फाइल | जाँच |
|---|---|---|
| ✅ | `biryani.jpg`, `buff_momo.jpg`, `chatamari.jpg`, `chhoyela.jpg`, `chicken_curry.jpg`, `chicken_momo.jpg`, `chilli_momo.jpg`, `chiya.jpg`, `chowmein.jpg` | ९/९ ठ्याक्कै **800×600 RGB JPEG** — README को convention सँग मिल्छ, normalization चाहिँदैनथ्यो |

- फाइलहरू `images/` भित्र byte-identical copy गरिएको छ (md5 मिलाइएको)।
- `images/CREDITS.md` पनि सँगै राखिएको छ।
- **अझै बाँकी ११:** `veg_momo`, `jhol_momo`, `dal_bhat`, `mutton_curry`, `veg_thali`,
  `thukpa`, `waiwai`, `sekuwa`, `samosa`, `lassi`, `yomari`।
  यी नआउँदासम्म card ले generated placeholder देखाउँछ — layout बिग्रिँदैन, app चल्छ।
- `tests/audit.js` मा नयाँ **section 11** थपियो: हरेक dish को फोटा disk मा छ कि छैन,
  र भएका फोटा साँच्चै 800×600 JPEG हुन् कि हुन् भनेर जाँच्छ। फोटा थप्दै जाँदा
  यो list आफैँ घट्दै जान्छ।

---

## 8. तेस्रो batch: login page नाङ्गो देखिने बग (CSS parse bomb)

**लक्षण:** `login.html` खोल्दा कुनै layout थिएन — ठूला–ठूला SVG icon, bullet list,
सादा text। जस्तो CSS नै load भएको छैन।

**कारण:** `style.css` को line 323 मा एउटा अक्षरको गल्ती थियो:

```css
/* गलत */  .summary-box{background:var(--surface-2};border:1px solid ...}
/* ठिक */  .summary-box{background:var(--surface-2);border:1px solid ...}
```                                                    ^  `)` को साटो `}`

`var(` खोलेर नबन्दगरी `}` आएपछि Chrome को CSS parser ले त्यसपछिका **लगभग सबै
rule** छाडिदिँदो रहेछ — `body` को background/colour मात्र बाँकी रह्यो, त्यसैले
page आधा-मरण देखियो। मेरा jsdom टेस्टले CSS parse गर्दैनन्, त्यसैले यो लुकेको थियो।

**Fix + दोहोरिन नदिने उपाय:**
- `)` बनाइयो; `style.css` र `track.css` दुवै अब **0 parse error**।
- `tests/audit.js` मा नयाँ **section 12: CSS parse check** थपियो (css-tree,
  jsdom सँगै आउँछ)। अब यस्तो typo भए audit ले तुरुन्तै line number सहित देखाउँछ।

**नोट:** तपाईंले फाइललाई `file://` बाट डबल-क्लिक गरेर खोल्नुभएको थियो — त्यो पनि
काम गर्छ, तर README अनुसार `python3 -m http.server 8000` गरेर
`http://localhost:8000/login.html` खोल्नु अझ भरपर्दो (केही browser ले file:// मा
storage/feature सीमित गर्छन्)।

---

## 9. AI Concierge — real data मा चल्ने AI feature (Ollama, free)

**के हो:** index.html मा तैरिने ✦ button → chat dialog। Assistant ले **असली menu
data** (26 dishes, live cart, tax/delivery नियम) बाट मात्र जवाफ दिन्छ।

**दुई दिमाग:**
1. **Ollama (local, free, key चाहिँदैन):** menu snapshot + cart system prompt मा
   जान्छ; model ले strict JSON contract मा जवाफ दिनुपर्छ — `parseContract()` ले
   validate नगरी केही पनि गर्दैन (hallucinated id/action drop हुन्छ)। मान्य action
   ले **असली cart** मा सामान हाल्छ, search/veg/category चलाउँछ।
2. **Offline fallback:** Ollama नभए deterministic smart-search — veg/spice/budget/
   allergen/category/cart प्रश्नको जवाफ असली dish + मूल्य सहित। Feature कहिल्यै मर्दैन।

**Security:**
- तपाईंले chat मा पठाउनुभएको key **leak भयो** — revoke गर्नुहोस्। Ollama local लाई
  key चाहिँदैन; hosted relay चाहिएमा key settings मा *browser भित्र मात्र* बस्छ,
  UI मा masked, source मा कहिल्यै होइन (`verify.js` ले नै source मा key खोज्छ)।
- Model को reply `textContent` ले render हुन्छ → XSS असम्भव (test सहित)।

**Test:** verify.js मा 18 वटा नयाँ check (contract validation, cart mutation,
XSS, offline fallback, config, OpenAI-compatible relay) — जम्मा **101 passed, 0 failed**।

**Backend छनोट:** settings (gear) मा `Auto-detect / Ollama / OpenAI-compatible`।
Hosted free relay (OpenRouter, Groq, LM Studio…) चलाउनु परेमा host + key त्यहाँ
राख्नुहोस् — key browser को localStorage मा मात्र बस्छ, `Bearer` header मा
त्यही host लाई मात्र जान्छ (test ले नै जाँचेको छ)।

---

## फाइल अनुसार परिवर्तन / Per-file summary

| File | के बदलियो |
|---|---|
| `data.js` | +8 i18n key × 3 भाषा (price, category, vegetarian, trackOrder, closeCart, cashNote, cardNote, freeProgress) |
| `app.js` | tax-mode reset fix, details labels, `#rTitle`, track links, free-delivery hint, inert drawer, localized aria-labels, `tagLabel()`/`has()`/`locale()` helpers, null guard, localized history dates |
| `index.html` | `data-i18n-aria`, `#freeHintRow`, drawer `inert`, `.section-sub`, `<noscript>`, मरेका symbol हटाइयो |
| `style.css` | `.free-hint`, `.summary-head`, `.oid-label`, `.receipt-eta`, `.receipt-acts`, `.order-foot`, `.btn.small`, `.section-sub`, `.eta-line`, `.noscript` |
| `track.js` | per-order tracking state + load मा save, `isNew` leak fix, avatar escape, `starsHTML` showValue, timer sync, real order id |
| `track.html` | Google Fonts हटाइयो, back-link nav, dynamic order number |
| `track.css` | `.topnav` / `.backlink` / `.shop`, `.review-stars.small` |
| `login.js` | अनुवादित strength-meter label |
| `README.md` | track page + localStorage table + fix list + नयाँ test निर्देशन |
| `tests/verify.js` *(नयाँ)* | 101 behavioural checks (menu/cart/checkout/i18n/tracking/reviews/**AI**) |
| `tests/audit.js` *(नयाँ)* | static consistency checks + **section 11: image files on disk (size/format)** |
| `ai.js` *(नयाँ)* | AI Concierge: Ollama chat over real menu + offline smart-search |
| `images/` *(नयाँ)* | ९ वटा फोटा (800×600 JPEG) + `CREDITS.md` |
