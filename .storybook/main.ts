import type { StorybookConfig } from '@storybook/sveltekit';
import type { InlineConfig } from 'vite';
import { mergeConfig } from 'vite';

const staticDirs: StorybookConfig['staticDirs'] = [
  { from: '../assets/images', to: '/assets/images' },
];

const storybookBase = process.env.STORYBOOK_BASE;

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],
  staticDirs,
  addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  viteFinal: async (config) => {
    const pagesConfig: InlineConfig = storybookBase
      ? {
          base: storybookBase,
        }
      : {};

    return mergeConfig(config, pagesConfig);
  },
};

export default config;
