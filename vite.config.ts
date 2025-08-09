import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import filesize from 'rollup-plugin-filesize';

export default defineConfig({
  plugins: [sveltekit()],
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
        manualChunks: {
          vendor: ['svelte'],
        },
      },
      plugins: [filesize({ showBrotliSize: true, showMinifiedSize: true })],
    },
  },
  resolve: {
    alias: {
      styles: path.resolve('./src/styles'),
      src: path.resolve('./src'),
    },
  },
});
