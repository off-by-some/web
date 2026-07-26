<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SectionAccentHeader from '$lib/components/site/section-headings/SectionAccentHeader';
  import { hideControls } from './helpers/controls';

  type Args = {
    title: string;
    titleId: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Section Headings/Accent Header',
    component: SectionAccentHeader,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Key Metrics',
      titleId: 'storybook-accent-header',
    },
    argTypes: {
      ...hideControls(['titleId']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'A compact eyebrow label plus an accent underline. It owns only its internal title and underline styling; parent sections own placement, spacing, and the surrounding layout.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <SectionAccentHeader title={args.title} titleId={args.titleId} />
{/snippet}

<Story name="Default" />
