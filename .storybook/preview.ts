import type { Preview } from '@storybook/sveltekit';
import '../src/styles/foundations/index.scss';
import './preview.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'Portfolio Dark',
      values: [
        { name: 'Portfolio Dark', value: '#080a18' },
        { name: 'Panel Dark', value: '#101427' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Library',
          [
            'Primitives',
            ['Actions', 'Forms', 'Layout', 'Media', 'Status', 'Surfaces', 'Typography'],
            'Site',
            ['Status', 'Section Headings', 'Hero', 'Metrics', 'Skills', 'Timeline', 'Contact'],
          ],
          'Page Sections',
          ['About Me', 'Skills', 'Timeline', 'Contact'],
        ],
      },
    },
  },
};

export default preview;
