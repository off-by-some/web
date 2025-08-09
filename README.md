# 🌐 Personal Website

[![Live Demo](https://img.shields.io/badge/demo-online-green)](https://off-by-some.github.io/web/)
[![SvelteKit](https://img.shields.io/badge/sveltekit-green)](https://kit.svelte.dev/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

![Site preview](docs/website-preview.png)

## Quick Start

```bash
npm install
npm run dev
```

**Local preview:** <http://localhost:5173>

---

## What This Is

My personal website and engineering playground. I built it to explore what’s possible when you care about performance, design, accessibility, and developer experience all at the same time.

The result is a site that loads in 49KB, looks beautiful on any device, meets WCAG accessibility standards, and has a sophisticated design system that I actually enjoy working with.

## Why I Built This

I wanted to prove a point: you don’t have to choose between beautiful design and fast performance. Or between modern developer experience and small bundle sizes. Good engineering means solving multiple constraints simultaneously.

The entire site loads in 49KB and 211ms while maintaining responsive design, accessible markup, and modern development tooling.

## What Makes It Interesting

**Performance without compromise.** The entire site—all the animations, the responsive design system, the interactive skill visualizations—fits in 49KB. Most websites ship that much JavaScript before loading any content.

**Thoughtful design system.** Color palettes that automatically generate perceptually uniform scales. Typography that works across devices. Design tokens that propagate changes throughout the entire site.

**Accessible by default.** Semantic markup, proper heading hierarchy, focus management, high contrast ratios. Built to work well with screen readers and keyboard navigation.

**Modern development experience.** TypeScript, hot reloading, automated asset optimization, quality checks on every commit. All the tools that make development pleasant.

### The Design System

Colors are generated from a base palette using perceptually uniform color spaces (OKLCH):

```scss
$theme: (
  brand: (
    teal: #1de9b6,
    // Generates 13 distinct shades from this color
  ),
  interactive: (
    color: (
      teal: 50, // Reference the first color-step in the 'teal' palette
    ),
    glow: themes.reference('interactive.color', $alpha: 30%),
    // Apply an alpha of 30%
    shadow: themes.reference('interactive.color', $alpha: 40%),
  ),
);

//   // Compiles into:
// --interactive-color:  rgb(104, 251, 205);         /* teal-50               */
// --interactive-glow:   rgba(104, 251, 205, 0.3);   /* same color, 30% alpha */
// --interactive-shadow: rgba(104, 251, 205, 0.4);   /* same color, 40% alpha */
```

Change that teal value and 13 generated color steps automatically update throughout the site, maintaining visual hierarchy, complex gradients, and systematic relationships.

### The Build System

Everything in `static/` is generated from sources:

- Images converted to WebP for smaller file sizes
- Social media previews generated with Puppeteer
- CSS compiled from design tokens
- Bundle sizes analyzed and optimized

The build process enforces quality automatically—linting, formatting, accessibility checks, performance budgets.

## Architecture

**Bundle breakdown:**

```
Main App:     19.25 KB (your code)
Vendor:       13.38 KB (Svelte runtime + routing)
CSS:          16.57 KB (complete design system)
```

**Tech stack:** SvelteKit compiles to vanilla JavaScript. SCSS design system with automatic color generation. TypeScript for type safety. Vite for fast builds and hot reloading.

**Deployment:** Static site hosted on GitHub Pages. No server required—everything runs in the browser.

**Security:** Content Security Policy, Trusted Types, and other protections. Works around GitHub Pages header limitations where possible.

## Performance Deep Dive

The first paint only transfers 29KB because of smart bundle splitting:

| Metric            | Value   | Notes                |
| ----------------- | ------- | -------------------- |
| Page size         | 29.1 KB | First paint transfer |
| Load time         | 211 ms  | Cold cache, mobile   |
| Requests          | 3       | HTML, CSS, JS        |
| Performance grade | 98/100  | Pingdom score        |

For context, the average website in 2025 is about 2MB. This entire site is smaller than most hero images.

## Development Commands

```bash
npm run dev       # Development server with hot reload
npm run build     # Full production build with optimization
npm run preview   # Test production build locally
npm run fix       # Auto-fix linting and formatting
npm run clean     # Reset all build artifacts
npm run storybook # Component development environment
```

## The Constraints

Building within tight performance and accessibility constraints forced better decisions:

- **Every feature earns its place.** No bloated dependencies or unnecessary animations.
- **Design system over one-offs.** Consistent patterns instead of custom solutions.
- **Automation prevents regressions.** Quality checks catch issues before they ship.
- **Accessibility drives design.** High contrast and semantic markup make everything clearer.

The technical constraints became design advantages. Fast sites feel more responsive. Accessible sites work better for everyone. Systematic design is more cohesive than ad-hoc styling.

---

**Stack:** SvelteKit • TypeScript • SCSS • Vite • Puppeteer • GitHub Pages
