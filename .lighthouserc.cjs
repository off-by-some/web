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
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.2 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        'speed-index': ['warn', { maxNumericValue: 5000 }],
        'aria-allowed-role': ['error', { minScore: 1 }],
        'aria-required-children': ['error', { minScore: 1 }],
        'aria-required-parent': ['error', { minScore: 1 }],
        'errors-in-console': 'off',
        'label-content-name-mismatch': ['error', { minScore: 1 }],
        'aria-hidden-focus': ['error', { minScore: 1 }],
        'uses-passive-event-listeners': ['warn', { minScore: 0.5 }],
        'dom-size': ['warn', { minScore: 0.5 }],
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
