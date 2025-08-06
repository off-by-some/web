import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    build: {
      cssCodeSplit: true
    },
    resolve: {
        alias: {
          styles: path.resolve('./src/styles'),
          src: path.resolve('./src')
        }
    }
});
