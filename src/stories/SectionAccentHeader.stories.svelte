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
            'A small eyebrow label plus an accent underline bar. The stylesheet includes a hover-color/bar-width transition keyed off `:global(.stats-section:hover)` / `:global(.tech-section:hover)` on an ancestor, but nothing in the codebase currently renders an element with either class — HeroPanel, its only consumer, uses `hero-panel--stats` / `hero-panel--tech` instead — so that hover styling is presently dead and this story only shows the static appearance.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <SectionAccentHeader title={args.title} titleId={args.titleId} />
{/snippet}

<Story name="Default" />
