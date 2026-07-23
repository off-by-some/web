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
    cssCodeSplit: true,
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
        manualChunks: {
          vendor: ['svelte'],
        },
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
