/* ==========================================================================
   Nepal Spice — 注文追跡 & レビュー  (HTML + CSS + JS only, no backend)
   --------------------------------------------------------------------------
   2つの localStorage キーだけを使います：
     ns_tracking  … { "<注文番号>": { stage: 0..4, updatedAt: <ts> }, … }  進行状況
                    （旧形式 { stage, updatedAt } も自動で読み替えます）
     ns_reviews   … [ { id, name, rating, text, date, itemId } ]  すべてのレビュー
   （各レビューは itemId を持つので「メニューごとのレビュー」としても取り出せます。
     例: getReviewsFor('chicken_momo') → その商品のレビューだけ）
   ========================================================================== */

/* ------------------------------------------------------------------ config */
const STORAGE_TRACK = 'ns_tracking';   // 注文追跡の状態（注文番号ごと）
const STORAGE_REVIEWS = 'ns_reviews';  // レビュー配列
const STORAGE_ORDERS = 'nepalSpiceOrdersV1'; // index.html / app.js が保存する注文履歴
const STEP_MS = 8000;                  // デモ：8秒ごとに次の状態へ

/* 5 つのステージ。eta = その状態になったときの「あと N 分」 */
const STAGES = [
  { key: 'confirm', label: '注文確認',       icon: 'i-check', eta: 35, note: 'ご注文を受け付けました' },
  { key: 'cooking', label: '調理中',         icon: 'i-clock', eta: 25, note: 'キッチンで調理しています' },
  { key: 'ready',   label: '配達準備完了',   icon: 'i-check', eta: 15, note: '商品の準備ができました' },
  { key: 'delivery',label: '配達中',         icon: 'i-bike',  eta: 8,  note: 'ドライバーが向かっています' },
  { key: 'done',    label: '配達完了',       icon: 'i-check', eta: 0,  note: 'お届けしました。ありがとうございました！' }
];

/* ドライバー情報（デモ用の固定データ） */
const DRIVER = {
  name: 'Rajesh K.',
  vehicle: 'バイク',
  plate: 'KT-24-8871',
  phone: '090-1234-5678'
};

/* サンプルレビュー（初回アクセス時に localStorage が空なら投入する） */
const SAMPLE_REVIEWS = [
  { itemId: 'chicken_momo', name: 'Sita Gurung',  rating: 5,   text: 'モモの皮がもちもちで最高！アチャールも本格的でした。', date: '2026-09-28', seed: 1 },
  { itemId: 'chicken_momo', name: 'Takeshi',      rating: 4.5, text: 'スパイスの香りが良く、日本でも食べやすい味です。配達も早かったです。', date: '2026-10-02', seed: 2 },
  { itemId: 'chicken_momo', name: 'Anita Shrestha', rating: 4, text: '家の味を思い出しました。次はジョルモモを頼みます。', date: '2026-10-11', seed: 3 },

  { itemId: 'dal_bhat',     name: 'Bikash Tamang', rating: 5,  text: 'ダルバートの量が多く、おかわりも簡単で満足。サグが絶品でした。', date: '2026-09-30', seed: 4 },
  { itemId: 'dal_bhat',     name: 'Yuko',          rating: 4,  text: '野菜カレーが優しい味。ナンの代わりにご飯なのが新鮮でした。', date: '2026-10-05', seed: 5 },
  { itemId: 'dal_bhat',     name: 'Prakash',       rating: 4.5, text: '本場カトマンズの味に近いです。パパドがサクサク。', date: '2026-10-14', seed: 6 },

  { itemId: 'jhol_momo',    name: 'Manisha Rai',   rating: 5,  text: 'スープが温かく、寒い日にぴったり。冬の定番にしたい。', date: '2026-10-01', seed: 7 },
  { itemId: 'jhol_momo',    name: 'Kenji',         rating: 4,  text: '酸味とゴマのバランスが良い。もう少し辛みがあっても良いかも。', date: '2026-10-08', seed: 8 },
  { itemId: 'jhol_momo',    name: 'Sabina',        rating: 4.5, text: 'モモがスープによく合います。リピート確定です。', date: '2026-10-16', seed: 9 }
];

/* ------------------------------------------------------------------ helpers */
const $ = (id) => document.getElementById(id);

/**
 * 追跡する注文番号を決める。優先順位：
 *   1. URL の ?order=NS-XXXX（レシート／注文履歴の「注文を追跡」ボタンから）
 *   2. app.js が保存した注文履歴の最新 1 件
 *   3. どちらもない場合はデモ用の番号
 */
function resolveOrderId() {
  const fromUrl = new URLSearchParams(location.search).get('order');
  if (fromUrl && fromUrl.trim()) return fromUrl.trim().slice(0, 40);
  try {
    const orders = JSON.parse(localStorage.getItem(STORAGE_ORDERS) || '[]');
    if (Array.isArray(orders) && orders.length && orders[0] && orders[0].id) return String(orders[0].id);
  } catch (e) { /* 履歴が壊れていてもデモは動かす */ }
  return 'NS-DEMO';
}
const ORDER_ID = resolveOrderId();
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/* 文字列 → 安定した色相（アバターの背景色に使う） */
function hueOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

/* アバター：名前の頭文字を丸に入れたプレースホルダー */
function avatar(name) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  const hue = hueOf(name || '?');
  return `<div class="avatar" style="background:hsl(${hue} 70% 92%);color:hsl(${hue} 60% 32%)">${escapeHtml(initial)}</div>`;
}

/* 星アイコン列。value は 4.5 のような小数も可（半分は CSS で表現）
   showValue=false にすると数値を出さない（サマリー側は大きな数字が別にあるため） */
function starsHTML(value, sizeClass = '', showValue = true) {
  const v = Number(value) || 0;
  let out = '';
  for (let i = 1; i <= 5; i++) {
    const on = v >= i - 0.25;             // 4.5 → 5つ目はオフ、4つ目まで点灯
    out += `<svg class="${on ? '' : 'off'}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star"/></svg>`;
  }
  return `<span class="review-stars ${sizeClass}" role="img" aria-label="5段階中 ${v.toFixed(1)}">` +
         out + (showValue ? `<em>${v.toFixed(1)}</em>` : '') + '</span>';
}

/* 簡易トースト通知 */
let toastTimer;
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ================================================================
   ORDER TRACKING
   ================================================================ */

/**
 * localStorage から状態を読む。
 * 保存が無い／壊れている場合は初期状態（stage 0）から始める。
 * 値は文字列で保存されるので JSON.parse してから数値に直す。
 */
function readAllTracking() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_TRACK) || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    // 旧形式 { stage, updatedAt } → 今表示している注文のデータとして読み替える
    if (typeof parsed.stage !== 'undefined') return { [ORDER_ID]: parsed };
    return parsed;
  } catch (e) {
    return {};   // 壊れたデータは無視
  }
}

function loadTracking() {
  const mine = readAllTracking()[ORDER_ID] || {};
  const stage = clamp(parseInt(mine.stage, 10) || 0, 0, STAGES.length - 1);
  // 追跡画面を開いていない間に進むべき分だけ進める
  // （DEMO: 8 秒 = 1 ステージ。最後まで進んだら完了で止まる）
  const elapsed = Date.now() - (parseInt(mine.updatedAt, 10) || Date.now());
  const catchUp = Math.max(0, Math.floor(elapsed / STEP_MS));
  return { stage: clamp(stage + catchUp, 0, STAGES.length - 1), updatedAt: Date.now() };
}

/** 状態を localStorage に保存（他の注文のデータは残したまま、自分の分だけ上書き） */
function saveTracking() {
  const all = readAllTracking();
  all[ORDER_ID] = { stage: state.stage, updatedAt: Date.now() };
  try {
    localStorage.setItem(STORAGE_TRACK, JSON.stringify(all));
  } catch (e) { /* 保存に失敗してもデモは止めない */ }
}

let state = loadTracking();
let timer = null;
/* 読み込み時に進んでいた分（catch-up）をすぐ保存しておく。
   これがないと、最初の 8 秒以内にページを閉じたとき状態が残らない。 */
saveTracking();

/** ステッパーの HTML を組み立てる（初回のみ） */
function renderStepper() {
  $('stepper').innerHTML = STAGES.map((s, i) => `
    <li class="step" data-index="${i}">
      <span class="dot"><span class="num">${i + 1}</span><svg style="display:none"><use href="#${s.icon}"/></svg></span>
      <span>
        <span class="step-title">${s.label}</span>
        <span class="step-note">${s.note}</span>
      </span>
    </li>`).join('');
}

/** 現在の stage に応じて クラス（done / active / pending）と ETA を更新 */
function renderTracking() {
  const steps = $('stepper').children;
  const stage = state.stage;

  for (let i = 0; i < steps.length; i++) {
    const li = steps[i];
    li.classList.toggle('done', i < stage);
    li.classList.toggle('active', i === stage);
    // 完了ステップは数字 → ✓、進行中はそのステージのアイコン
    const num = li.querySelector('.num');
    const svg = li.querySelector('svg');
    const showCheck = i < stage || (i === stage && STAGES[i].key !== 'delivery');
    num.style.display = showCheck ? 'none' : '';
    svg.style.display = showCheck ? '' : 'none';
    li.setAttribute('aria-current', i === stage ? 'step' : 'false');
  }

  // ETA 表示
  const s = STAGES[stage];
  const etaBox = document.querySelector('.eta');
  const isDone = s.key === 'done';
  etaBox.classList.toggle('done', isDone);
  $('etaMain').textContent = isDone ? '配達完了' : `あと${s.eta}分`;
  $('etaSub').textContent = isDone
    ? 'ご利用ありがとうございました。レビューもぜひ！'
    : `${s.label} · 見込み時間はデモ用に短縮表示しています`;

  // ドライバーカードは「配達中」「配達完了」で表示
  $('driverCard').hidden = stage < 3;
}

/** 次のステージへ進む（最後まで行ったら止める） */
function advance() {
  if (state.stage >= STAGES.length - 1) return stopTimer();
  state.stage += 1;
  saveTracking();          // ← 更新のたびに localStorage へ保存
  renderTracking();
  if (state.stage >= STAGES.length - 1) {
    stopTimer();
    toast('配達が完了しました 🎉');
  }
}

/** setInterval を開始（すでに動いていれば二重起動しない） */
function startTimer() {
  if (timer) return;
  if (state.stage >= STAGES.length - 1) return;   // 配達完了なら進める先がない
  timer = setInterval(advance, STEP_MS);
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

/** デモを最初からやり直す */
function resetDemo() {
  stopTimer();
  state = { stage: 0, updatedAt: Date.now() };
  saveTracking();
  renderTracking();
  startTimer();
  toast('デモをリセットしました');
}

/* ================================================================
   REVIEWS
   ================================================================ */

/**
 * localStorage からレビュー配列を読む。
 * 初回（キーが無い）ならサンプルデータを入れて保存する。
 * 壊れた JSON の場合もサンプルに戻すので画面が壊れない。
 */
function loadReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(SAMPLE_REVIEWS));
      return SAMPLE_REVIEWS.slice();
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // 古いバージョンが isNew を保存してしまっていた場合に備えて落とす
    return parsed.map(stripTransient);
  } catch (e) {
    return SAMPLE_REVIEWS.slice();
  }
}

/** 表示専用フラグ（isNew）を除いた保存用コピーを作る */
function stripTransient(r) {
  const copy = { ...r };
  delete copy.isNew;
  return copy;
}

/** レビューを localStorage へ保存 */
function saveReviews(list) {
  try {
    localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(list));
  } catch (e) { /* 保存できなくても表示は続ける */ }
}

/** 特定の商品のレビューだけ取り出す（itemId → レビューの配列） */
function getReviewsFor(itemId) {
  return loadReviews().filter(r => r.itemId === itemId);
}

/**
 * 平均評価の計算：
 *   合計点 ÷ 件数 を小数第1位で四捨五入（4.25 → 4.3）
 *   件数 0 のときは 0.0 を返す（0除算を防ぐ）
 */
function averageRating(list) {
  if (!list.length) return 0;
  const sum = list.reduce((acc, r) => acc + Number(r.rating || 0), 0);
  return Math.round((sum / list.length) * 10) / 10;
}

let reviews = loadReviews();

/** 評価サマリー（平均 + 件数 + 星）を描画 */
function renderSummary() {
  const avg = averageRating(reviews);
  $('avgNum').textContent = avg.toFixed(1);
  $('reviewCount').textContent = reviews.length;
  $('avgStars').innerHTML = starsHTML(avg, 'small', false);
}

/** レビュー一覧を新しい順に描画 */
function renderReviews() {
  const listEl = $('reviewList');
  if (!reviews.length) {
    listEl.innerHTML = '<li class="empty">まだレビューはありません。最初の1件を書いてみましょう！</li>';
    return;
  }
  // 新しい日付が上（同じ日ならあとから追加したものが上）
  const sorted = reviews
    .map((r, i) => ({ ...r, _i: i }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || b._i - a._i);

  listEl.innerHTML = sorted.map(r => `
    <li class="review">
      ${avatar(r.name)}
      <div>
        <div class="review-top">
          <span class="review-name">${escapeHtml(r.name)}</span>
          ${r.isNew ? '<span class="badge-new">新着</span>' : ''}
          <span class="review-date">${formatDate(r.date)}</span>
          ${starsHTML(Number(r.rating))}
        </div>
        <p class="review-text">${escapeHtml(r.text)}</p>
      </div>
    </li>`).join('');

  reviews.forEach(r => delete r.isNew);   // バッジは1回だけ
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/* -------------------------------------------------------- star selector -- */
let rating = 0;

function buildStarPicker() {
  const picker = $('starPicker');
  picker.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<button type="button" class="star" data-value="${i + 1}" role="radio" aria-checked="false"
             aria-label="${i + 1}つ星"><svg viewBox="0 0 24 24" fill="currentColor"><use href="#i-star"/></svg></button>`
  ).join('');

  picker.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) setRating(Number(btn.dataset.value));
  });

  // キーボード操作：← → で 1〜5、Space/Enter で決定
  picker.addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'ArrowLeft') setRating(clamp(rating - 1, 1, 5));
    if (e.key === 'ArrowRight') setRating(clamp(rating + 1, 1, 5));
    if (e.key === ' ' || e.key === 'Enter') setRating(rating || 5);
  });
}

/** 評価（1〜5）をセットしてハイライトを更新 */
function setRating(value) {
  rating = clamp(value, 0, 5);
  $('ratingValue').value = rating;
  [...$('starPicker').children].forEach((btn, i) => {
    const on = i < rating;
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-checked', on ? 'true' : 'false');
  });
  $('rateLabel').textContent = rating
    ? `${rating} つ星を選択中`
    : '星をタップして評価してください';
  if (rating) $('formError').textContent = '';
}

/* ------------------------------------------------------------- submission -- */
function handleSubmit(e) {
  e.preventDefault();
  const text = $('reviewText').value.trim();
  const errorEl = $('formError');

  if (!rating) { errorEl.textContent = '星を1つ以上選んでください。'; return; }
  if (!text)   { errorEl.textContent = 'コメントを入力してください。'; return; }
  if (text.length > 300) { errorEl.textContent = 'コメントは300文字までです。'; return; }

  const name = $('reviewName').value.trim().slice(0, 20) || 'ゲスト';

  const review = {
    id: 'r_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7), // 一意な ID
    itemId: 'general',            // このページは店舗全体のレビュー。商品別は 'chicken_momo' など
    name,
    rating,                       // 1〜5（0.5刻みも可）
    text,
    date: new Date().toISOString().slice(0, 10),
    isNew: true
  };

  reviews.push(review);           // 先頭ではなく末尾に追加
  // isNew は「今回の投稿だけ」の表示用フラグ。保存すると次の読み込みでも
  // 新着バッジが出続けてしまうので、localStorage には残さない。
  saveReviews(reviews.map(stripTransient));

  // フォームをリセット
  $('reviewForm').reset();
  setRating(0);
  updateCounter();

  renderSummary();                // 平均と件数を再計算
  renderReviews();                // 一覧を再描画
  toast('レビューを投稿しました。ありがとうございます！');
}

function updateCounter() {
  const len = $('reviewText').value.length;
  $('charCount').textContent = len;
  $('charCount').parentElement.classList.toggle('over', len > 300);
}

/* ================================================================
   INIT
   ================================================================ */
function init() {
  // --- tracking ---
  renderStepper();
  renderTracking();
  $('orderNo').textContent = '#' + ORDER_ID;
  $('resetBtn').addEventListener('click', resetDemo);
  $('callBtn').href = 'tel:' + DRIVER.phone.replace(/[^0-9+]/g, '');
  $('dName').textContent = DRIVER.name;
  $('dVehicle').textContent = DRIVER.vehicle;
  $('dPlate').textContent = DRIVER.plate;
  $('dPhone').textContent = DRIVER.phone;
  startTimer();                    // 8秒ごとに advance()

  // 他のタブで状態が変わったら同期する
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_TRACK) {
      state = loadTracking();
      renderTracking();
      // 完了 → タイマー停止／やり直し → タイマー再開。二重起動は startTimer が防ぐ
      stopTimer();
      startTimer();
    }
    if (e.key === STORAGE_REVIEWS) { reviews = loadReviews(); renderSummary(); renderReviews(); }
  });

  // --- reviews ---
  buildStarPicker();
  setRating(0);
  renderSummary();
  renderReviews();
  $('reviewForm').addEventListener('submit', handleSubmit);
  $('reviewText').addEventListener('input', updateCounter);
  updateCounter();
}

document.addEventListener('DOMContentLoaded', init);
