<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';
  import { hideControls } from './helpers/controls';

  type Args = {
    src: string;
    alt: string;
    sizes: string;
    tileSize: string;
    imageSize: string;
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
      tileSize: '4rem',
      imageSize: '2.75rem',
    },
    argTypes: {
      ...hideControls(['alt', 'sizes', 'loading', 'style']),
      src: { control: 'text' },
      tileSize: { control: 'text' },
      imageSize: { control: 'text' },
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
    <IconTile
      src={args.src}
      alt={args.alt}
      sizes={args.sizes}
      style="--icon-tile-size: {args.tileSize}; --icon-tile-image-size: {args.imageSize};"
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-lg);
  }
</style>
