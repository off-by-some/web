import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
  preprocess: [
    sveltePreprocess({ scss: { includePaths: ['src', 'src/styles'] } }),
    mdsvex({ extensions: ['.md', '.svx'] }),
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      strict: false,
    }),
    inlineStyleThreshold: 150000,
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/web' : '',
    },
    prerender: {
      entries: ['*'],
    },
  },
  extensions: ['.svelte', '.md', '.svx'],
};

export default config;
