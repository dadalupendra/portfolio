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

The Portfolio Projects section now displays **five** entries: **NextStep Study**, **NextStep Global**, **QR Menu Generator**, **NPL 2026 Website** and **Nepal Spice**. GakusaiNavi, Nepal Quest: 77 Districts, Posture & Distance Alert and the self-referencing Developer Portfolio card were removed **from project listings and printed work summary**, without deleting the website itself. NextStep Study's previously configured Base44 destination has been restored at https://next-step-ai-a4248ae0.base44.app/; its external public accessibility may change independently. NPL 2026 and Nepal Spice have hosted GitHub Pages project pages. QR Menu Generator remains marked in development with no invented public link.

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

## Selected improvements from the uploaded `My Profile.zip`

The uploaded ZIP contains an **older version of this portfolio**, including legacy HTML and JavaScript, `.git` history, an offline Document/Photo Vault, demonstration pages and a featured-project mockup. It was inspected as reference material, **not copied over the live site**.

Three useful features were adapted into the current portfolio without removing the existing content or interactions:

1. **Real multilingual personal introduction:** an accessible English / 日本語 / नेपाली tabbed About card. This preserves the idea of the older language-specific bio, but uses verifiable study/technology facts rather than dated career goals.
2. **Currently building:** genuine project-status highlights for NextStep Study, QR Menu Generator, NPL 2026 and Nepal Spice, linking visitors to the current four project cards.
3. **Featured published project:** an NPL 2026 spotlight with working relative GitHub Pages and GitHub source links. The card explicitly states that live cricket updates depend on third-party providers.
4. **Clickable education journey:** Grade 10 at Shree Siddha Secondary School → Grade XII at Shree Sampal Secondary School → Tokyo Technical College. Selecting a stage scrolls to the appropriate existing school card and its on-demand Google Map.

New files: `css/curated-legacy-features.css` and `js/curated-legacy-features.js`. All surrounding new UI text is translated in the current six portfolio languages and the new tab interface supports keyboard arrow navigation.

**Deliberately excluded:** old practice/demo links, unverified skills percentages/JLPT level, and the browser-only document/photo vault. The vault stored data locally per-device and would not be a secure place to publish personal credentials on a public portfolio. No contents of the ZIP's `.git` directory were uploaded to the public repository.


## Updated Portfolio projects: NextStep link and Nepal Spice

- **NextStep Study:** restored the previous Base44 app URL to its portfolio project card: https://next-step-ai-a4248ae0.base44.app/ . Base44 reports the matching app is ready; the external URL was not verified in a browser.
- **Nepal Spice:** the original uploaded frontend is published at https://dadalupendra.github.io/portfolio/nepal-spice/ with 26 photos, account creation/login, cart, checkout, order history and tracking. Accounts and orders remain browser-local; real payments and deliveries are not connected.
- **Publishing boundaries:** the uploaded archive also contains a separate Java Servlet / Oracle / SMTP back end requiring Tomcat, which GitHub Pages cannot run. The school's original frontend uses browser-local demonstration authentication. For safety the published preview avoids presenting these systems as real payment, login, delivery, ordering or email services.
- **Photos and attribution:** the original supplied photo assets are included with their unchanged attribution file at `nepal-spice/images/CREDITS.md`. The application is the supplied school project, not a commercial restaurant service.

## NextStep Global and NextStep Study links

- **NextStep Global:** the owner-supplied site URL `https://nextstep-global.ai.studio` is linked from a new separate project card. External site availability was not verified in a browser.
- **NextStep Study live app:** the existing `https://next-step-ai-a4248ae0.base44.app/` link remains unchanged.
- **NextStep Study GitHub:** the owner's requested clone/repository URL `https://github.com/dadalupendra/nextstep-ai.git` is now shown as an additional project-card button. The GitHub connector reports this repository is **private**, so other visitors need GitHub access to see it. The URL points to the Git repository; it is not a public source-code preview.
- The project counter and print resume were updated from four to five project entries. All language switching, 3D rendering, Maps and theme controls remain in place.

## Nepal Spice original application

[Open Nepal Spice](https://dadalupendra.github.io/portfolio/nepal-spice/)

The portfolio now serves the original uploaded application instead of the
separately recreated menu preview. It includes the supplied HTML, CSS,
JavaScript, 26 food photos, login and registration, cart, checkout screen,
order history, tracking and reviews. No ChatGPT account is needed to open it.
The application has its own browser-local account creation screen.

[Original source repository](https://github.com/dadalupendra/nepali-spice)

Accounts, cart and orders remain in the visitor's browser. Tracking uses the
original simulated progression. Real payments, restaurant order submission,
delivery tracking and the Java email/Oracle backend are not connected.
The separate private ChatGPT-hosted copy is no longer a portfolio destination.

Frontend verification scripts are included in `nepal-spice/tests/`.

## Real 3D Earth → Nepal → Darchula → Portfolio (current entry)

The portfolio now starts with a **real textured Three.js Earth**, not an extruded Nepal district map. The Earth automatically faces **Darchula, Nepal**, with a small animated Nepal flag and a glowing cyan geographic pin. Selecting the flag, location button or pin opens the unchanged portfolio; the top-right arrow skips directly to the portfolio and the reset icon restores the globe's Nepal-facing view. The existing navbar's 🗺️ control reopens the globe.

- **Location:** latitude **29.9470454**, longitude **80.6626123** — coordinates supplied by the owner for the Byans/Sunsera area within Darchula District. This is **not a claim that the point is Darchula's administrative headquarters**.
- **Real Earth image:** fixed-version `earth_atmos_2048.jpg` from the [three.js r152 examples](https://github.com/mrdoob/three.js/tree/r152/examples/textures/planets) (MIT-licensed project). Texture loads directly from a pinned raw GitHub URL, with a pinned jsDelivr backup. The optional cloud layer uses `earth_clouds_1024.png` from the same repository. No Maps API token is required.
- **Actual geometry:** Three.js SphereGeometry, geographic longitude/latitude-to-3D conversion, true scene lighting, atmospheric shader, rotating globe, star field, geo-anchored 3D cyan pin, 3D raycasting and optional clouds.
- **Waving Nepal flag:** small local `assets/nepal-flag.svg` in an animated, accessible button visually anchored to the globe pin. Credit: `lipis/flag-icons` MIT License, copyright (c) 2013 Panayiotis Lipiridis.
- **Controls:** click pin or flag to open the full portfolio, or skip via top-right arrow. Drag to turn the Earth, pinch or scroll to zoom, reset for default Nepal view; keyboard focus and Escape-to-portfolio supported.
- **Performance/accessibility:** static fallback if WebGL/Three.js cannot load; the planet can render without animation when `prefers-reduced-motion` is set. Star count is reduced on mobile, clouds are skipped on mobile, device pixel ratio capped to 2 (1.45 on mobile). 3D loop pauses when hidden or portal closed, and the portfolio's separate WebGL background pauses while the Earth entry is open. Portfolio language selection, Dark/Light mode, Print/Save Resume, school/work Google Maps, five project cards and all original content remain.
- **Active assets:** `js/earth-entry-3d.js`, `css/earth-entry-3d.css`, local `assets/nepal-flag.svg`, and portal markup in `index.html`. No build step.

The old Nepal-77-district extruded landing page is **no longer referenced or shown**. Previous code remains recoverable through Git history.
