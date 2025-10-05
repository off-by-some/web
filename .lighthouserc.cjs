// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Server ready and listening',
      startServerReadyTimeout: 120000,

      url: ['http://localhost:4173/web/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.2 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        'speed-index': ['warn', { maxNumericValue: 5000 }],
        'aria-allowed-role': 'off',
        'aria-required-children': 'off',
        'aria-required-parent': 'off',
        'errors-in-console': 'off',
        'label-content-name-mismatch': 'off',
        'aria-hidden-focus': 'off',
        'uses-passive-event-listeners': ['warn', { minScore: 0.5 }],
        'dom-size': ['warn', { minScore: 0.5 }],
        'dom-size-insight': 'off',
        'lcp-discovery-insight': 'off',
        'lcp-lazy-loaded': 'off',
        'forced-reflow-insight': 'off',
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
