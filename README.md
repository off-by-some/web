---

# 🌐 Personal Website

[![Live Demo](https://img.shields.io/badge/demo-online-green)](https://off-by-some.github.io/web/)
[![SvelteKit](https://img.shields.io/badge/sveltekit-green)](https://kit.svelte.dev/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

![Site preview](docs/website-preview.png)

A **high-performance personal site** — part portfolio, part engineering playground — showcasing:

* **SvelteKit 5** framework
* A **semantic SCSS design system**
* A **build pipeline** tuned for speed, resilience, and maintainability

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Highlights](#-highlights)
3. [Performance](#-performance)
4. [Architecture](#-architecture)
5. [Development](#-development)
6. [Build Pipeline](#-build-pipeline)
7. [Static Asset System](#-static-asset-system)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (auto-regenerates static assets)
npm run dev
```

**Local preview:** [http://localhost:5173](http://localhost:5173)
💡 _No need to edit `static/` — it’s fully generated._

---

## ✨ Highlights

| Feature                     | Tech Used                   | Why It Matters                                      |
| --------------------------- | --------------------------- | --------------------------------------------------- |
| **Early CSS (foundations)** | SCSS + Vite                 | Precompiled base styles loaded early to reduce FOUC |
| **Color Science**           | OKLCH + Sass Maps           | Perceptually uniform, auto-propagating palettes     |
| **Bundle Analysis**         | Rollup + File Size Plugin   | Built-in performance insights                       |
| **Pre-commit Quality**      | Husky + ESLint + Prettier   | Standards enforced before every commit              |
| **Security Hardening**      | CSP + Trusted Types + COOP  | Protects against XSS, clickjacking, cross-origin    |
| **OG Generation**           | Puppeteer + Headless Chrome | Automated, pixel-perfect social previews            |
| **Design Tokens**           | Semantic SCSS architecture  | Theme-agnostic, single source of truth              |

---

## 📊 Performance

**Latest production build (Gzipped):**

Anything under 100 KB gzipped for initial load is considered excellent in 2025.

```
Main App Bundle:   19.25 KB
Vendor Chunk:      13.38 KB
CSS Bundle:        16.57 KB
--------------------------------
Total Initial:    ~49 KB
```

 For comparison, Many modern React or Angular apps start around 150–300 KB gzipped before you even add any kind of meaningful functionality. We hit about 50kb for the entire application.

### 📡 Pingdom Performance Snapshot 

> Last verified: **08-09-2025** from Pingdom (San Jose, mobile agent, cold cache)

**Transfer (network) on first paint**

| Metric            | Value       | Notes                                                   |
|-------------------|------------:|--------------------------------------------------------|
| Total page size   | **29.1 KB** | gzip transfer size                                     |
| Requests          | **3**       | HTML, CSS, main JS (Pingdom labels JS row as “Error”)  |
| Load time         | **211 ms**  | Agent location + cold cache                            |
| HTML              | **2.7 KB**  | `content-encoding: gzip`                               |
| CSS               | **4.9 KB**  | `content-encoding: gzip`                               |
| JS (entry)        | **21.5 KB** | `content-encoding: gzip`                               |


### 📊 Performance Summary

This table shows the final performance summary, landing just shy of 30KB. 

| Metric            | Value       |
|-------------------|------------:|
| **Performance grade** | 98/100 (A)        |
| **Page size**     | 29.1 KB     |
| **Load time**     | 211 ms      |
| **Requests**      | 3           |

This shows the initial request is even smaller before further resources are fetched. 

---

## 🏗 Architecture

### 🎨 SCSS Design System

Theme-driven with **automatic color propagation**:

<details>
<summary>Example</summary>

```scss
$dark-mode-tokens: (
  brand: (
    teal: #1de9b6,
  ),
  interactive: (
    color: (
      teal: 100,
    ),
    hover: (
      teal: 50,
    ),
    focus: (
      teal: 0,
    ),
  ),
  text: (
    brand: themes.reference('interactive.color'),
    hovered: themes.reference('interactive.hover'),
  ),
);
```

> Change `teal: #1de9b6` → instantly updates all 21 generated steps and every dependent token.

</details>

**Key Principles**

- `styles/foundations/` — Early CSS loaded in `app.html`
- `styles/lib/` — OKLCH palette generator + theme utilities
- Semantic tokens — (`interactive.hover` vs `teal-300`)
- Dynamic references — `themes.reference()` with alpha control

---

### ℹ️ About critical CSS (Beasties)

We can use Beasties to inline “critical” CSS, but the gains here are likely small and come with tradeoffs. The current setup already front‑loads a small foundations bundle via `app.html`, which largely avoids FOUC without increasing HTML size or complicating CSP. If needed, Beasties can be added as an optional build step.

---

## 🛠 Development

**Daily Commands**

```bash
npm run dev     # Live development server
npm run fix     # ESLint + Prettier auto-fix
npm run lint    # Code quality check
npm run check   # Svelte type-checking
npm run clean   # Wipe build/ & static/
```

**Build & Deploy**

```bash
npm run build   # Clean → regenerate assets → build
npm run preview # Preview production
npm run deploy  # Deploy to GitHub Pages
```

**Component Development**

```bash
npm run storybook
```

---

## 🔄 Build Pipeline

**Pre-build**

1. Clean (`build/` + `static/`)
2. Lint & format
3. Regenerate static assets (images, OG, foundations CSS)

**Build**

- Bundle analysis (gzip + Brotli)
- Code splitting (vendor isolation)
- Asset optimization (WebP, minified CSS)

**Post-build**

- SPA fallback (`404.html`)
- GitHub Pages prep (`.nojekyll`)

### Runtime model

Deployed as a fully static SPA using `@sveltejs/adapter-static` with fallback to `index.html`. No SSR or server endpoints at runtime (GitHub Pages hosting).

---

## 📂 Static Asset System

**`static/` is auto-generated — safe to delete.**

**Sources:**

- Raw images → `images/`
- Tokens & resets → `src/styles/foundations/`

**Generation Scripts**

```bash
npm run generate:images  # Convert images to WebP, copy SVGs
npm run generate:og      # Create OG preview images
npm run css:foundations  # Compile tokens/reset → static/index.css
npm run setup:static     # Run all of the above
```

**Prerequisites (ImageMagick)**

- macOS: `brew install imagemagick`
- Debian/Ubuntu: `sudo apt-get update && sudo apt-get install -y imagemagick`
- Arch/Manjaro: `sudo pacman -S imagemagick`
- Windows (PowerShell): `choco install imagemagick` or `scoop install imagemagick`

**Automation Hooks**

- `predev` → `npm run setup:static`
- `prebuild` → `npm run clean && npm run fix && npm run lint && npm run setup:static`
- `postbuild` → Create `404.html` + `.nojekyll`

---

**Stack:**
SvelteKit • TypeScript • SCSS • Vite • ESLint • Prettier • Puppeteer • GitHub Pages

---

## 🔐 Security

GitHub Pages cannot set real HTTP response headers. This repo uses `<meta http-equiv>` tags in `src/app.html` as a best‑effort approximation.

- Effective via meta: Content Security Policy (CSP)
- Not effective via meta: X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Cross-Origin-Opener-Policy, Cross-Origin-Embedder-Policy, Permissions-Policy

For strict headers, deploy to a platform that supports custom headers (e.g., Netlify, Cloudflare Pages) using `static/_headers` as a template.
