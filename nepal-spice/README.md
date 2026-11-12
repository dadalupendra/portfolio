# Nepal Spice — Nepali food ordering (school demo, upgraded)

A fully offline, front-end-only demo of a Nepali restaurant ordering site.
No server, no database, no real payments. Everything lives in your browser.

## Run it

1. Open `login.html` in Chrome / Edge / Firefox, **or** serve the folder:
   `python3 -m http.server 8000` → http://localhost:8000/login.html
2. Click **Create Account**, choose a name + password (8+ chars), save, then log in.
3. Browse the menu, add dishes, check out, view the demo receipt and order history.
4. From the receipt (or any card in **Order history**) click **Track order** to open
   `track.html`, which shows the 5-step delivery stepper and the review form for
   that order. The page reads the order id from `?order=NS-XXXX`; opened directly
   it falls back to your most recent saved order.

> Accounts, cart, language, theme and orders are stored only in this browser's
> `localStorage` / `sessionStorage`. Clearing site data removes them.
> Passwords are stored as a **salted SHA-256 verifier**, never in plain text —
> but this is still only a classroom demo, not real authentication.

## What's new in this version

### More food (6 → 26 dishes, 5 categories)
- **Momo & Dumplings:** Chicken Momo, Veg Momo, Buff Momo, Jhol Momo, Chilli Momo
- **Rice & Curry Sets:** Dal Bhat Tarkari, Chicken Curry, Khasi ko Masu (mutton), Sabji Thali, Nepali Chicken Biryani
- **Noodles & Soup:** Nepali Chowmein, Chicken Thukpa, Sadeko Wai Wai
- **Snacks & Grill:** Chicken Sekuwa, Samosa, Chicken Chhoyela, Chatamari,
  Sel Roti, Bara/Wo, Aloo Chop, Buff Sukuti Sadheko
- **Drinks & Sweets:** Mango Lassi, Masala Chiya, Yomari, Kheer, Gulab Jamun

### Real photos
- 20 genuine food photographs ship in `images/`, each normalized to 800×600 JPEG.
- **Status:** all 26 dishes ship with a real photograph, each normalized to
  800×600 JPEG. `node tests/audit.js` (section 11) verifies every `img` path in
  `data.js` exists on disk and is a real 800×600 JPEG, so a missing photo can
  never slip in again.
- Sources & attribution: `images/CREDITS.md`. For a public release, replace them
  with your own photos or properly licensed ones.
- If a photo is ever missing, the card falls back to a generated placeholder so
  the layout never breaks.

### Real data per dish
Trilingual name + description (English / 日本語 / नेपाली), price in JPY (typical of
Nepali restaurants in Japan), calories, prep time, spice level (0–3), vegetarian
flag, allergens, category, tags (popular / traditional / spicy / seasonal /
free-refills), rating and review count.

### Real checkout rules (Japan)
- Consumption tax: **takeout 8% / dine-in 10%** (selectable).
- Delivery fee **¥300**, waived from **¥2,500**.
- Estimated delivery 30–45 min. Order IDs, receipts and a 20-order history are
  kept locally. **No real payment or delivery happens.**

### UI upgrade
- Modern design system (CSS variables), light **and dark** theme (persisted).
- Sticky glass header with cart badge, order history, language and theme controls.
- Hero banner with restaurant stats; mandala SVG pattern (inline, offline-safe).
- Search, category chips, vegetarian filter, and 4 sort modes.
- Rich dish cards: photo zoom, badges, rating, spice meter, price tag.
- Slide-in cart drawer with quantity steppers; sticky mobile cart bar.
- Dish detail dialog with KPI tiles (price / kcal / time / spice) and allergens.
- Checkout dialog with summary, tax mode, payment cards; receipt dialog; toasts.
- Skeleton loading shimmer, empty states, focus rings, reduced-motion support.
- Login page redesigned (split hero + card) with show/hide password and a
  strength meter. Auth logic unchanged (salted SHA-256).
- Order tracking + reviews page (`track.html`) is now reachable from the receipt
  and from every order-history card, and shows the real order id.

## AI Concierge (real data, free local model)

A floating ✦ button opens a chat assistant that answers **only from the real
menu data** (26 dishes, live cart, real tax/delivery rules).

```bash
# 1. install Ollama (free, runs on your machine — NO API key needed)
curl -fsSL https://ollama.com/install.sh | sh      # macOS/Windows: installer from ollama.com
ollama pull llama3.2                               # or qwen2.5:3b / mistral
ollama serve                                       # usually already running

# 2. open the shop and press the ✦ button
python3 -m http.server 8000   # -> http://localhost:8000/index.html
```

* **Online**: the menu snapshot + live cart go into the system prompt; the model
  must answer in a strict JSON contract (`reply` + validated `actions`), so it can
  add real dishes to the real cart, search, filter veg or switch category.
  Hallucinated ids/actions are dropped by `parseContract()`.
* **Offline**: if Ollama is unreachable, a deterministic smart-search over the
  same real data answers instead (veg / spice / budget / allergen / category /
  cart questions) — the feature never breaks, it just gets less chatty.
* **Backends**: settings gear → API = `Auto-detect` (tries Ollama `/api/tags`,
  then OpenAI `/v1/models`), `Ollama`, or `OpenAI-compatible`. So a hosted
  free-tier relay (OpenRouter, Groq, LM Studio, vLLM …) works too.
* **API key**: local Ollama needs none. The optional key field (settings gear)
  is only for a hosted relay; it is stored in *your browser's* localStorage,
  masked in the UI, sent only to the configured host as a `Bearer` header, and
  is never in the source code (`verify.js` asserts this). If you ever paste a
  real key into a chat or a repo, revoke it — treat it as burned.
* CORS: local Ollama accepts localhost origins; if you serve from `file://` and
  the browser blocks it, run `OLLAMA_ORIGINS=* ollama serve` or serve over http.
* Tests: `node tests/verify.js` covers the contract validation (injected ids
  dropped), cart mutation, XSS-safe rendering and the offline fallback
  (101 checks total).

## Fixes in this revision

Bug fixes only — no visual redesign. Details in `CHANGES.md`.

**Correctness**
- Checkout: `form.reset()` silently knocked the tax-mode dropdown back to
  *Takeout* while the app kept charging *Dine-in* 10%. The dropdown and the
  payment method now stay in sync with the order that was just placed.
- Dish details showed the wrong labels — the price tile said **"Total"**, the
  category row said **"All"**, the veg row said **"Vegetarian only"**.
- Reviews: the temporary `isNew` flag was written to `localStorage`, so the
  "新着" badge reappeared on every reload forever. It is now display-only.
- Tracking state was not saved until the first 8-second tick, so reloading
  within 8 s lost your place. It is saved on load and stored **per order id**
  (the old single-order format is migrated automatically).
- `addToCart()` threw a `TypeError` on an unknown dish id.
- Unknown tags printed the raw internal key (`tag_xyz`) into the UI, because
  `t()` returns the key itself, making `t(x) || fallback` dead code.

**Accessibility**
- The receipt dialog referenced `aria-labelledby="rTitle"` but no `#rTitle`
  element existed, so the dialog had no accessible name.
- The closed cart drawer was still in the tab order and the a11y tree; it is now
  `inert`, and focus moves into the drawer on open and back out on close.
- Cart quantity buttons were announced as "-" and "+"; they are now
  "Remove: Chicken Momo" / "Add: Chicken Momo" (translated).
- `aria-label`s for language, sort, search, theme and the close buttons were
  hard-coded in English; they now translate via `data-i18n-aria`.
- The star-rating summary is exposed as `role="img"` with a text alternative.

**Offline / hygiene**
- `track.html` requested Google Fonts, breaking the "fully offline" promise and
  stalling first paint with no network. Removed — `track.css` already has a
  complete local font stack.
- The reviewer avatar injected the name's first character unescaped into
  `innerHTML`; a name starting with `<` broke the markup. Now escaped.
- Dead SVG symbols (`i-globe`, `i-eye`, `i-eyeoff`) removed from `index.html`.
- Previously-unused translation strings are now used (`orderSummary`, `freeHint`,
  `orderId`, `date`, `sort`, `language`, `theme`, `qty`, `remove`, `menuSub`),
  and the password-strength meter is translated into 日本語 / नेपाली.
- The cross-tab `storage` sync in `track.js` did not restart/stop the demo timer.

**Small UX additions**
- The cart drawer now shows *"Add ¥1,320 more for free delivery"*, switching to
  the free-delivery message once you cross ¥2,500.
- The receipt shows the delivery ETA and an order-number label.
- `track.html` has a "back to menu" link (it used to be a dead end).

## Files
| File | Purpose |
|---|---|
| `login.html` / `login.js` | account creation + login (localStorage) |
| `index.html` / `app.js` | menu, cart, checkout, history, i18n |
| `track.html` / `track.js` / `track.css` | order tracking stepper + review form |
| `ai.js` | AI Concierge: local Ollama chat over the REAL menu + offline smart-search fallback |
| `data.js` | dishes, categories, restaurant rules, en/ja/ne strings |
| `style.css` | design system, light/dark themes, responsive layout |
| `images/` | dish photos (800×600 JPEG) + `CREDITS.md` |
| `tests/` | jsdom tests: `verify.js` (83 checks) + `audit.js` (static checks) |

### localStorage keys
| Key | Written by | Contents |
|---|---|---|
| `nepalSpiceAccountsV1` | `login.js` | `{ name: { name, salt, hash } }` |
| `nepalSpiceCartV2`, `nepalSpiceOrdersV1`, `nepalSpiceLanguage`, `nepalSpiceTheme`, `nepalSpiceTaxMode` | `app.js` | cart, last 20 orders, UI prefs |
| `ns_tracking` | `track.js` | `{ "<order id>": { stage, updatedAt } }` |
| `ns_reviews` | `track.js` | `[{ id, itemId, name, rating, text, date }]` |

`sessionStorage`: `customerName`, `demoLoggedIn` (cleared by **Logout**).

## Tests (optional)
```bash
npm install jsdom          # once

node tests/verify.js       # 83 behavioural checks: login, menu, cart, checkout,
                           # receipt, order history, i18n, theme, tracking, reviews
node tests/audit.js        # static checks: i18n key parity/usage, missing element
                           # ids, aria-labelledby targets, JS classes without CSS,
                           # data integrity, external (non-offline) requests
```
`verify.js` exits non-zero if any check fails, so it works as a pre-submit gate.
Both scripts run from the project root **or** from inside `tests/`.
