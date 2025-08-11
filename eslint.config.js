// eslint.config.js — Flat config
import { fileURLToPath } from 'node:url';

import globals from 'globals';
import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import { includeIgnoreFile } from '@eslint/compat';
import svelteParser from 'svelte-eslint-parser';

import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default tseslint.config(
  // Respect .gitignore
  includeIgnoreFile(gitignorePath),

  // Base JS (browser env)
  {
    name: 'base/js',
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': 'off', // handled by unused-imports
    },
  },

  // TS (non type-aware)
  {
    name: 'ts/recommended',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    extends: [...tseslint.configs.recommended],
    rules: { 'no-undef': 'off' },
  },

  // Type-aware TS — scope to src only to avoid Storybook/project issues
  {
    name: 'ts/type-aware-src-only',
    files: ['src/**/*.{ts,tsx}'],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // Svelte — exclude template from Sonar; also silence import-x dupes in virtual/type refs
  {
    name: 'svelte/recommended',
    files: ['**/*.svelte'],
    plugins: { svelte },
    extends: [...svelte.configs.recommended, ...svelte.configs.prettier],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        svelteConfig,
        extraFileExtensions: ['.svelte'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      'svelte/valid-compile': 'error',
      'svelte/no-at-html-tags': 'error',
      'svelte/no-target-blank': 'error',
      'svelte/prefer-svelte-reactivity': 'off',
      'sonarjs/deprecation': 'off', // Prevents crash Index out of range (requested index 23824, but source text has length 22975).
      'import-x/no-duplicates': 'off',
    },
  },
  // Imports: correctness + tidy (JS/TS + Svelte <script> only)
  {
    name: 'imports',
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}', '**/*.svelte/*.js', '**/*.svelte/*.ts'],
    plugins: { 'import-x': importX, 'unused-imports': unusedImports },
    settings: {
      'import-x/resolver': {
        typescript: { project: ['./tsconfig.eslint.json'] },
        node: true,
      },
      'import-x/extensions': ['.js', '.mjs', '.ts', '.tsx', '.svelte'],
    },
    rules: {
      'import-x/first': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/newline-after-import': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // After the imports block, keep this Svelte template block to be safe
  {
    name: 'svelte/template-imports-quiet',
    files: ['**/*.svelte'],
    rules: {
      'import-x/no-duplicates': 'off',
    },
  },

  // Promises
  {
    name: 'promise',
    plugins: { promise },
    rules: { ...promise.configs.recommended.rules },
  },

  // SonarJS — JS/TS files only
  {
    name: 'sonarjs-js-ts-only',
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: { sonarjs },
    rules: { ...sonarjs.configs.recommended.rules },
  },

  // SonarJS — <script> blocks inside .svelte only (not the template)
  {
    name: 'sonarjs-svelte-scripts',
    files: ['**/*.svelte/*.js', '**/*.svelte/*.ts'],
    plugins: { sonarjs },
    rules: { ...sonarjs.configs.recommended.rules },
  },

  // Storybook
  storybook.configs['flat/recommended'],

  // Prettier LAST
  prettier,

  // Tests / Stories overrides
  {
    name: 'tests',
    files: ['**/*.{test,spec}.{ts,js}', '**/*.stories.{ts,js,svelte}'],
    languageOptions: {
      globals: { ...globals.jest, ...globals.mocha, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },

  // Node / Storybook / config files (no type-aware project)
  {
    name: 'node-and-storybook-nonproject',
    files: [
      '**/.storybook/**/*.{ts,tsx,js}',
      'scripts/**/*.{ts,tsx,js}',
      'vite.config.{ts,js,mjs,cjs}',
      'svelte.config.{ts,js}',
      'eslint.config.js',
      '**/*.{config,cfg}.{js,ts,cjs,mjs}',
    ],
    languageOptions: {
      parserOptions: { projectService: false, allowDefaultProject: true },
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      'import-x/no-duplicates': 'off',
      'unused-imports/no-unused-imports': 'off',
    },
  },
);
