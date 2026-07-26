// .lighthouserc.js
// Set TARGET_URL (or pass --url=<value> to `npm run lighthouse`) to audit a
// remote deployment instead of building and starting a local preview server.
const targetUrl = process.env.TARGET_URL;

module.exports = {
  ci: {
    collect: {
      ...(targetUrl
        ? { url: [targetUrl] }
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
        'categories:performance': ['error', { minScore: 0.99 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'first-contentful-paint': ['error', { maxNumericValue: 410 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 608 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0 }],
        'total-blocking-time': ['warn', { maxNumericValue: 0 }],
        'speed-index': ['error', { maxNumericValue: 623 }],
        'aria-allowed-role': ['error', { minScore: 0.99 }],
        'aria-required-children': ['error', { minScore: 0.99 }],
        'aria-required-parent': ['error', { minScore: 0.99 }],
        'aria-hidden-focus': ['error', { minScore: 0.99 }],
        'errors-in-console': ['error', { minScore: 0.99 }],
        'inspector-issues': ['error', { minScore: 0.99 }],
        'label-content-name-mismatch': ['error', { minScore: 0.99 }],
        'render-blocking-resources': ['error', { maxNumericValue: 0 }],
        'uses-passive-event-listeners': ['warn', { minScore: 0.99 }],
        'dom-size': ['warn', { maxNumericValue: 1043 }],
        'dom-size-insight': 'off',
        'lcp-discovery-insight': 'off',
        'lcp-lazy-loaded': 'off',
        'forced-reflow-insight': 'off',
        'network-dependency-tree-insight': 'off',
        'cache-insight': 'off',
        'uses-long-cache-ttl': 'off',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: 'metrics/lhci',
    },
  },
};
