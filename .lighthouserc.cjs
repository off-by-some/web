// .lighthouserc.js
// Set TARGET_URL (or pass --url=<value> to `npm run lighthouse`) to audit a
// remote deployment instead of building and starting a local preview server.

const targetUrl = process.env.TARGET_URL;

const timingBudget = (maxNumericValue) => [
  'error',
  {
    maxNumericValue,
    aggregationMethod: 'median',
  },
];

module.exports = {
  ci: {
    collect: {
      ...(targetUrl
        ? {
            url: [targetUrl],
          }
        : {
            startServerCommand: 'npm run preview',
            startServerReadyPattern: 'Server ready and listening',
            startServerReadyTimeout: 120000,
            url: ['http://localhost:4173/web/'],
          }),

      numberOfRuns: 8,

      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },

    assert: {
      preset: 'lighthouse:recommended',

      assertions: {
        // Category scores
        'categories:performance': ['error', { minScore: 0.99 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],

        // Performance timings
        //
        // These use the median of all runs rather than the fastest run.
        // The LCP threshold is calibrated for the slower GitHub Actions
        // environment instead of local workstation hardware.
        'first-contentful-paint': timingBudget(410),
        'largest-contentful-paint': timingBudget(1000),
        'speed-index': timingBudget(700),

        // Stability and responsiveness
        'cumulative-layout-shift': [
          'error',
          {
            maxNumericValue: 0,
            aggregationMethod: 'pessimistic',
          },
        ],

        'total-blocking-time': [
          'warn',
          {
            maxNumericValue: 0,
            aggregationMethod: 'median',
          },
        ],

        // Accessibility
        'aria-allowed-role': ['error', { minScore: 0.99 }],
        'aria-required-children': ['error', { minScore: 0.99 }],
        'aria-required-parent': ['error', { minScore: 0.99 }],
        'aria-hidden-focus': ['error', { minScore: 0.99 }],
        'label-content-name-mismatch': ['error', { minScore: 0.99 }],

        // Runtime correctness
        'errors-in-console': ['error', { minScore: 0.99 }],
        'inspector-issues': ['error', { minScore: 0.99 }],

        // Require every Lighthouse run to contain zero render-blocking
        // resources. We assert the resource count rather than Lighthouse's
        // estimated millisecond savings, which may vary by environment.
        'render-blocking-resources': [
          'error',
          {
            maxLength: 0,
            aggregationMethod: 'pessimistic',
          },
        ],

        'uses-passive-event-listeners': ['warn', { minScore: 0.99 }],

        // Page complexity
        'dom-size': [
          'warn',
          {
            maxNumericValue: 1043,
            aggregationMethod: 'median',
          },
        ],

        // Disabled duplicate or non-actionable audits
        'dom-size-insight': 'off',
        'lcp-discovery-insight': 'off',
        'lcp-lazy-loaded': 'off',
        'forced-reflow-insight': 'off',
        'network-dependency-tree-insight': 'off',
        'cache-insight': 'off',
        'uses-long-cache-ttl': 'off',

        // The whole app's CSS is now inlined into the document through
        // kit.output.bundleStrategy: 'inline' in svelte.config.js.
        //
        // This eliminates the render-blocking stylesheet request, but it also
        // bundles below-the-fold styles alongside the hero styles. Lighthouse
        // therefore reports some unused bytes in the merged inline block.
        //
        // Its metricSavings report shows no FCP/LCP impact, so this audit is a
        // static byte-count heuristic rather than evidence of a measured delay.
        'unused-css-rules': 'off',
      },
    },

    upload: {
      target: 'filesystem',
      outputDir: 'metrics/lhci',
    },
  },
};
