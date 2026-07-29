<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SectionHeader from '$lib/components/site/section-headings/SectionHeader';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    title: string;
    subtitle: string;
    titleId: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Section Headings/Section Header',
    component: SectionHeader,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Technical Expertise',
      subtitle: 'Mastery forged through years of hands-on experience',
      titleId: 'storybook-section-header',
    },
    argTypes: {
      ...hideControls(['titleId']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Title-plus-subtitle pairing used at the top of every major page section. The title owns its shimmer and text hierarchy; surrounding sections own placement so the same heading can be reused without hidden margin contracts.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <SectionHeader title={args.title} subtitle={args.subtitle} titleId={args.titleId} />
{/snippet}

<Story name="Default" />
