<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';

  type Args = {
    src: string;
    alt: string;
    sizes: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Surfaces/Icon Tile',
    component: IconTile,
    render: template,
    tags: ['autodocs'],
    args: {
      src: 'svg/Svelte_Logo.svg',
      alt: 'Svelte logo',
      sizes: '56px',
    },
    parameters: {
      docs: {
        description: {
          component:
            'IconTile is the shared square image container used by skill, experience, and contact cards. Consumers own size through CSS variables; the primitive owns centering, image fit, border, surface, and hover-safe transitions.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-row">
    <IconTile src={args.src} alt={args.alt} sizes={args.sizes} />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Sizes" asChild>
  <div class="story-row">
    <IconTile src="svg/Svelte_Logo.svg" alt="Svelte logo small" sizes="40px" className="tile-sm" />
    <IconTile src="svg/github_brand_icon.svg" alt="GitHub logo" sizes="56px" className="tile-md" />
    <IconTile src="icons/Graphql.webp" alt="GraphQL logo" sizes="72px" className="tile-lg" />
  </div>
</Story>

<style lang="scss">
  .story-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-lg);
  }

  :global(.tile-sm) {
    --icon-tile-size: 3rem;
    --icon-tile-image-size: 2rem;
  }

  :global(.tile-md) {
    --icon-tile-size: 4rem;
    --icon-tile-image-size: 2.75rem;
  }

  :global(.tile-lg) {
    --icon-tile-size: 5rem;
    --icon-tile-image-size: 3.25rem;
    --icon-tile-background: var(--token-surface-glass-medium);
    --icon-tile-radius: var(--token-radius-xl);
  }
</style>
