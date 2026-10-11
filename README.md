# Joojik Studio website

A mobile-first, bilingual static website built with Astro and CSS. Persian is the default language. No backend, client framework, cookies, or analytics are included.

## Local development

Requires Node.js 22.12 or newer (supported even-numbered releases) and npm.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4321/`. The root takes you to the Persian homepage. To inspect the production build:

```sh
npm run check
npm run build
npm test
npm run preview
```

## Pages

| Content          | Persian                                   | English                                   |
| ---------------- | ----------------------------------------- | ----------------------------------------- |
| Studio           | `/fa/`                                    | `/en/`                                    |
| Block Tower      | `/fa/games/block-tower/`                  | `/en/games/block-tower/`                  |
| Privacy policy   | `/fa/games/block-tower/privacy-policy/`   | `/en/games/block-tower/privacy-policy/`   |
| Terms of service | `/fa/games/block-tower/terms-of-service/` | `/en/games/block-tower/terms-of-service/` |

The public configuration is `/configs/block-tower.json`, initially `{}`. Do not place secrets in it. Languages use explicit URLs, reciprocal hreflang metadata, and equivalent-page language switches. Persian uses RTL layout; English names inside Persian text are isolated for correct reading order. No browser-language redirects are used.

## Editing content and appearance

- `src/i18n/index.ts`: typed Persian and English UI strings and sample marketing content.
- `src/content/games/block-tower/privacy-policy.json` and `terms-of-service.json`: supplied legal documents, each containing an ISO effective date and matching `en`/`fa` titles, introductions, and ordered sections with stable IDs, paragraphs, and optional bullet lists. Edit these files to update the legal pages. Text is rendered safely, URLs and emails become links, and the effective date is localized. Keep section IDs identical across languages. Legal pages do not display sample-content notices; marketing pages remain previews.
- `src/data/games.ts`: Block Tower's accent colors and store links. Add real HTTPS links with both Persian and English labels to the `stores` array; until then the download area displays a coming-soon message. Update the hero/download copy at the same time when announcing availability.
- `src/styles/global.css`: shared neutral/text colors, spacing, layouts, and typography. A game can change accent colors and artwork without changing those shared values.

Almarai regular, bold, and extra-bold are bundled locally through Fontsource; visitors do not contact Google Fonts. The SIL Open Font License is preserved at `public/fonts/Almarai-OFL.txt`. Brand SVGs were copied from the existing studio assets; originals were not modified. Block artwork is decorative, not a gameplay screenshot. The social image was rendered from the original brand vectors; its SVG source is next to the PNG in `public/images/`.

## Site address, indexing, and GitHub Pages

`site.config.mjs` centralizes the origin, base path, and indexing setting. Local defaults are `https://joojikstudio.ir`, `/`, and **indexing off**. GitHub Actions deploys to `https://joojik-studio.github.io/Website/`; no custom domain or DNS is required.

Optional build environment variables override the defaults:

| Variable         | Default                   | Purpose                                                                 |
| ---------------- | ------------------------- | ----------------------------------------------------------------------- |
| `SITE_ORIGIN`    | `https://joojikstudio.ir` | Site origin for canonicals, social images, and sitemap URLs             |
| `SITE_BASE_PATH` | `/`                       | `/Website/` for the GitHub project URL, `/` for a custom domain         |
| `SITE_INDEXABLE` | unset (false)             | Set to `true` only after sample content and the final address are ready |

Use exported shell or CI environment variables; these configuration values do not automatically load from a `.env` file.

For example, to test the default GitHub project URL in PowerShell:

```powershell
$env:SITE_ORIGIN = 'https://joojik-studio.github.io'
$env:SITE_BASE_PATH = '/Website/'
npm run build
npm test
npm run preview
# Open http://127.0.0.1:4321/Website/
```

Clear the overrides before returning to the default build:

```powershell
Remove-Item Env:SITE_ORIGIN, Env:SITE_BASE_PATH -ErrorAction SilentlyContinue
```

All links, font assets, root redirects, social metadata, robots, and sitemap URLs respect the deployment base. The configuration file will also be under that base, initially `https://joojik-studio.github.io/Website/configs/block-tower.json`. A static build produces `dist/`, including `.nojekyll`.

The workflow checks formatting, types, both base paths, and browser behavior before publishing **only `dist/`** on pushes to `main`. Pull requests run checks without deploying. In repository **Settings → Pages**, select **GitHub Actions** as the build source. The workflow can also be run manually from the Actions tab.

To add a domain later, configure it in Pages settings and DNS, then set repository Actions variables `SITE_ORIGIN` to the final origin (for example `https://joojikstudio.ir`) and `SITE_BASE_PATH` to `/`. Run the workflow again. Set `SITE_INDEXABLE` to `true` only when real content is ready; deployment keeps it false by default. No credentials are needed in the repository: publishing uses GitHub's short-lived workflow token.

Sample pages use `noindex, follow`; robots allows crawling so search engines can read that directive. The sitemap includes both language versions. The root redirect and 404 remain noindex even after enabling indexing.

## Verification

```sh
npm run format:check
npm run check
npm run build
npm test
npx playwright install chromium
npm run test:browser
```

Browser tests inspect every content page in both languages at 320, 390, 768, and 1440px, run axe accessibility checks, and save screenshots under ignored `test-results/`. They also test language switching, keyboard navigation, reduced motion, font loading, JSON delivery, and JavaScript-disabled navigation. Run them against the default root-base build. On Windows, an existing Edge installation can be used instead of downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:browser
```

Build tests also support the alternative base-path configuration above. CI runs formatting, types, build tests, and Chromium browser checks. If Astro telemetry cannot access the local configuration directory in a restricted environment, set `ASTRO_TELEMETRY_DISABLED=1` for the command.

Project-local agent skills remain in `.agents/`; see `.agents/README.md` for their sources and third-party licenses. This repository does not grant a new license to the studio's original branding or website content.
