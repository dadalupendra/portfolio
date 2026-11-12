# Dadal Upendra Singh — Developer Portfolio

A responsive, multilingual personal portfolio hosted on GitHub Pages.

**Website:** https://dadalupendra.github.io/portfolio/

## Features
- Six manually translated languages: English, Japanese, Nepali, Hindi, Simplified Chinese, Korean.
- Professional navy, blue and cyan design, mobile navigation and dark/light theme.
- Project cards with working category filters; clear labels distinguish learning demos from unfinished projects.
- Real project/demo links only when an actual destination is available. No fabricated live-demo buttons.
- Skills, background, professional experience, education and contact sections.
- Contact opens the visitor's email app using `mailto:`; Copy Email uses the Clipboard API where supported.
- Print / Save Resume uses the browser print dialog and A4 print styles.
- Language and theme choices are saved locally in the browser.

## Site files
- `index.html` — current professional portfolio
- `css/portfolio-v3.css` — layout, tokens, mobile and print styles
- `js/portfolio-v3.js` — translations, project catalog, filtering and interactions
- `demos/` — practice demo pages (Java OOP, JavaScript, SQL)
- `legacy.html` — archived previous portfolio, including the **local-only IndexedDB vault**

## Deployment
Repository **Settings → Pages → Deploy from a branch → main / root**, then open:
https://dadalupendra.github.io/portfolio/

## Important clarifications
- The previous document vault stores files in the individual browser's IndexedDB, **not** on a server. It is preserved in `legacy.html` so existing browser data remains accessible on the same site origin.
- `mailto:` starts an email draft but does **not** send a message by itself.
- The NextStep Study external project link is included as a project destination; its availability is not monitored or guaranteed.
- The resume is browser-generated via Print / Save as PDF, not a verified academic certificate.
- No credentials, visitor submissions, private documents or access tokens should be committed to this repository.

## Add or update a project
Edit the `projects` array in `js/portfolio-v3.js`. Add a working URL only when it exists. If there is no public demonstration, set `link: null` and label the project `inprogress`.

## Add or edit a language
Update its dictionary in `js/portfolio-v3.js` for every `data-i18n` key, and update each project's translated description.
