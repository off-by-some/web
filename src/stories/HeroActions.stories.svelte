<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroActions from '$lib/components/site/hero/HeroActions';
  import type { HeroIconAction } from '$lib/components/site/hero/types';
  import { hideControls } from './helpers/controls';

  type Args = {
    primaryLabel: string;
    primaryHref: string;
    exploreLabel?: string;
    exploreHref?: string;
    iconLinksLabel: string;
    iconLinks: HeroIconAction[];
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Actions',
    component: HeroActions,
    render: template,
    tags: ['autodocs'],
    args: {
      primaryLabel: "Let's build something great",
      primaryHref: '#contact',
      exploreLabel: 'Explore my work',
      exploreHref: '#experience',
      iconLinksLabel: 'Profile links',
      iconLinks: [
        {
          label: 'Open LinkedIn profile',
          href: 'https://linkedin.com/in/cassidy-bridges-tech',
          icon: 'linkedin',
          external: true,
        },
        {
          label: 'Open GitHub profile',
          href: 'https://github.com/off-by-some',
          icon: 'github',
          external: true,
        },
        {
          label: 'Star this project on GitHub',
          href: 'https://github.com/off-by-some/web',
          icon: 'star',
          external: true,
        },
        {
          label: 'Download resume',
          href: '/resume/Cassidy-Bridges-Software-Engineering.pdf',
          icon: 'download',
          download: 'Cassidy-Bridges-Software-Engineering.pdf',
        },
      ],
    },
    argTypes: {
      ...hideControls(['primaryHref', 'exploreHref', 'iconLinksLabel']),
      primaryLabel: { control: { type: 'text' } },
      exploreLabel: { control: { type: 'text' } },
      iconLinks: { control: { type: 'object' } },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Hero action group for contact intent, section navigation, profile links, project starring, and resume download. Consumers provide semantic action models; the component owns the shared action layout.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroActions
      primaryLabel={args.primaryLabel}
      primaryHref={args.primaryHref}
      exploreLabel={args.exploreLabel}
      exploreHref={args.exploreHref}
      iconLinksLabel={args.iconLinksLabel}
      iconLinks={args.iconLinks}
      onPrimaryAction={() => console.log('Contact requested')}
      onExploreAction={() => console.log('Explore requested')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 44rem;
  }
</style>
