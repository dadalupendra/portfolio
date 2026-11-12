# Dadal Upendra Singh — Professional 3D Portfolio

**Live website:** https://dadalupendra.github.io/portfolio/

Static HTML/CSS/JavaScript portfolio built for GitHub Pages. The original profile, seven site sections, six-language selector, dark/light mode, education records and Print / Save Resume are retained.

## Real Three.js (pinned)

The website loads **Three.js 0.152.2** from cdnjs.cloudflare.com and renders a WebGL scene behind all pages.

- Floating 3D particles and a rotating wireframe globe with linked network points.
- Pointer-responsive parallax and smoothly scrolling 3D camera.
- Six animated 3D technology solids orbit the profile photo on desktop.
- Perspective tilt and cyan depth layers for the profile card.
- Project-card tilt with depth-lift icons, glowing hover and skill-card lift.
- Count-up for real numerical statistics, entrance reveals with perspective.
- Glass-blurred sticky navigation.
- Light/dark palette switching via existing theme control.
- Power limits: device pixel ratio ≤2; fewer particles and no portrait 3D scene on mobile; animation stops on hidden tabs. Reduced-motion users get static effects.

No npm/build step, authentication, API token or custom domain is required.

## Files

- `index.html` — unchanged page/section structure with pinned Three.js CDN and background canvas.
- `css/portfolio-v3.css` — pre-existing responsive/print styles.
- `css/portfolio-v4.css` — existing neon styling.
- `css/three-enhancements.css` — 3D depth, portrait, cards, skills, transitions and accessibility.
- `js/portfolio-v3.js` — existing six-language UI, dark/light theme, real project cards, filters, Print/Save Resume, email actions.
- `js/three-effects.js` — full Three.js engine and scroll interactions.

`legacy.html` preserves a copy of the previous portfolio, including its **local-only IndexedDB vault**. It is no longer linked in the public navigation. Do not publish private academic scans or identifying certificate numbers.

## Authentic project entries

Seven user-reported project entries are shown: NextStep Study, GakusaiNavi, Nepal Quest: 77 Districts, QR Menu Generator, NPL 2026 Website, Posture & Distance Alert, and this Developer Portfolio. Project statuses are not claims of completion. The **Developer Portfolio** and uploaded **NPL 2026 Website** now have public GitHub Pages destinations; other entries have no fabricated demo links.

The three former practice demo pages (Java OOP, JavaScript Playground and SQL Notes) were deleted from `demos/`, and their mock projects have been removed from the site.

## GitHub Pages deployment

1. Go to repository **Settings → Pages**.
2. Choose **Deploy from a branch**, **main**, **/(root)**.
3. Open https://dadalupendra.github.io/portfolio/
4. Hard-refresh (`Ctrl+Shift+R`) to bypass a previously cached stylesheet.

## Privacy and accuracy

Academic credentials are summarized from user-supplied records (NEB Grade XII GPA 2.73; Shree Sampal Secondary School, Sunsera; Shree Siddha Secondary School, Sina for Grade 10). No scans, DOB, registration numbers or family-identifying data are included in public `index.html`.

- `Print / Save Resume` uses browser printing; choose **Save as PDF**.
- `Email Me` launches a mail draft; it does not send automatically.
- Project links are only included when a specific destination is known. Live status of external apps is not inferred.
- If WebGL, the CDN, or device hardware is unavailable, the content remains accessible and a CSS fallback is used.

## Real workplaces and schools on Google Maps

The existing **Experience** and **Education** cards are kept. Location controls are added by `js/location-maps.js` and styled in `css/location-maps.css`:

| Card | Place | Coordinates |
| --- | --- | --- |
| Work experience | Kaiten Sushi Misaki, Shinjuku East Side Square B1F | 35.6961095, 139.7090098 |
| Student software projects and current education | Tokyo Technical College, Higashinakano | 35.7064974, 139.6853488 |
| Grade XII | Shree Sampal Secondary School, Byans-4, Sunsera | 29.9470454, 80.6626123 |
| Through Grade 10 | Shree Siddha Secondary School, Byans-3, Sina | 29.9223567, 80.6681549 |

Each card includes a clickable, supplied **Google Maps CID** destination, an accessible **Show map / Hide map** control, and a lazy Google Maps iframe using `q=LAT,LNG&z=16&output=embed`. Expanding the map creates the iframe on demand to preserve initial page performance. The controls, titles, addresses and placeholders follow the existing six-language selector. Dark/light styles, responsive display and keyboard controls are supported.

### Optional local photos

There were no suitable photos of the four places in the supplied document scans, so the cards show clean photo placeholders instead of publishing academic certificates or hotlinking photos from Maps. Add **your own licensed place photos** to the repository with these exact relative paths:

- `images/misaki.jpg`
- `images/tokyo-technical-college.jpg`
- `images/sampal-school.jpg`
- `images/siddha-school.jpg`

The existing `<img>` elements use `object-fit: cover`, lazy loading and load/error fallback. If a file exists, its photo appears automatically.

## Published NPL 2026 project

Uploaded standalone HTML has been published at [`npl-2026/index.html`](npl-2026/index.html), accessible at https://dadalupendra.github.io/portfolio/npl-2026/ and through the NPL project card on the portfolio home page. The original archive, teams, features and browser-side source adapters are retained.

**Accuracy:** This is an independent fan project, not official live scoring infrastructure. GitHub Pages cannot run the uploaded source's Netlify Functions `/api` endpoints. The source's embedded 2026 records are a dated snapshot; provider-backed browser updates may fail or require a user-provided CricAPI key. An explicit notice links to ESPNcricinfo and Cricbuzz for current official/third-party match reporting. Do not present stale embedded data as confirmed live.
