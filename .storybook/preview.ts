import type { Preview } from '@storybook/sveltekit';
import '../src/styles/foundations/index.scss';
import './preview.scss';

const centerSectionDocsCanvases = () => {
  if (typeof document === 'undefined') return;

  document.querySelectorAll<HTMLElement>('.section-docs-canvas--desktop').forEach((canvas) => {
    const overflow = canvas.scrollWidth - canvas.clientWidth;
    const signature = `${canvas.scrollWidth}:${canvas.clientWidth}`;

    if (overflow <= 0 || canvas.dataset.centeredSignature === signature) return;

    canvas.scrollLeft = overflow / 2;
    canvas.dataset.centeredSignature = signature;
  });
};

if (typeof window !== 'undefined') {
  const scheduleCentering = () => {
    window.requestAnimationFrame(centerSectionDocsCanvases);
  };

  scheduleCentering();

  window.addEventListener('resize', scheduleCentering);

  new MutationObserver(scheduleCentering).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

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
      exclude: [
        'children',
        'className',
        'contentClass',
        'element',
        'imageClassName',
        'onclick',
        /^on[A-Z].*/,
      ],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          type: 'mobile',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        ipad: {
          name: 'iPad',
          type: 'tablet',
          styles: {
            width: '820px',
            height: '1180px',
          },
        },
        desktop: {
          name: 'Desktop',
          type: 'desktop',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
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
          ['About Me', 'Skills', 'Timeline', 'Projects', 'Contact'],
        ],
      },
    },
  },
};

export default preview;
