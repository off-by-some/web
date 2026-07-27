import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import path from 'path';
import { bundleStats } from 'rollup-plugin-bundle-stats';

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  server: {
    fs: {
      allow: [
        path.resolve('./src'),
        path.resolve('./static'),
        path.resolve('./assets'),
        path.resolve('./assets/images'),
      ],
    },
  },
  build: {
    // SvelteKit's `bundleStrategy: 'inline'` is intended to inline the app's
    // JavaScript and CSS into the generated HTML. Vite's default CSS code
    // splitting can preserve route or async-chunk styles as independent CSS
    // dependencies, however.
    //
    // Our post-build critical-CSS transform removed the original stylesheet
    // link from the static HTML, but the client manifest still referenced
    // that CSS chunk and restored its <link> during hydration. Lighthouse
    // therefore observed it as a render-blocking request even though the
    // original HTML contained no active stylesheet link.
    //
    // Combining the app's CSS into one output allows SvelteKit's inline
    // bundle strategy to inline it consistently without leaving a runtime
    // CSS-chunk dependency behind.
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
      plugins: [
        bundleStats({
          outDir: '../../../.bundle-stats',
          html: true,
          json: true,
          compare: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      styles: path.resolve('./src/styles'),
      src: path.resolve('./src'),
    },
  },
});
