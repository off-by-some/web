import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
  staticDirs: ['../static'],
  addons: [
    '@storybook/addon-svelte-csf',
    '@storybook/addon-docs', // Add this
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
};

export default config;
