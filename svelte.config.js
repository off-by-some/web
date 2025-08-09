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
      fallback: 'index.html',
      strict: false,
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/web' : '',
      assets: process.env.NODE_ENV === 'production' ? 'https://off-by-some.github.io/web' : '',
    },
    prerender: {
      entries: ['*'],
    },
  },
  extensions: ['.svelte', '.md', '.svx'],
};

export default config;
