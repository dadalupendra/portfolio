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

Seven user-reported project entries are shown: NextStep Study, GakusaiNavi, Nepal Quest: 77 Districts, QR Menu Generator, NPL 2026 Website, Posture & Distance Alert, and this Developer Portfolio. Project statuses are not claims of completion; only the **Developer Portfolio** has a currently configured public destination. Other entries have no fabricated demo links.

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
