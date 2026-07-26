<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Image from '$lib/components/primitives/media/Image';
  import { designNotes } from './docs/design-notes';
  import { hideControls } from './helpers/controls';

  type Args = {
    src: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Media/Image',
    component: Image,
    render: template,
    tags: ['autodocs'],
    args: {
      src: 'company_logos/upguard_logo.jpg',
    },
    argTypes: {
      ...hideControls([
        'alt',
        'sizes',
        'loading',
        'decoding',
        'fetchpriority',
        'priority',
        'width',
        'height',
      ]),
      src: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component: designNotes.image,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-image story-image--portrait">
    <Image src={args.src} alt="Portrait example" sizes="12rem" priority />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Image Formats" asChild>
  <div class="story-grid">
    <div class="story-image">
      <Image src="company_logos/upguard_logo.jpg" alt="JPG company logo" sizes="10rem" />
    </div>
    <div class="story-image">
      <Image src="icons/Graphql.webp" alt="WebP technology icon" sizes="10rem" />
    </div>
    <div class="story-image">
      <Image src="svg/github_brand_icon.svg" alt="SVG brand icon" sizes="10rem" />
    </div>
  </div>
</Story>

<style lang="scss">
  .story-image {
    align-items: center;
    background: var(--token-theme-color-surface-glass-medium);
    border-radius: var(--token-reference-radius-xl);
    display: flex;
    block-size: 12rem;
    justify-content: center;
    overflow: hidden;
    padding: var(--token-reference-spacing-fluid-md);
    inline-size: 12rem;

    :global(img),
    :global(picture) {
      max-block-size: 100%;
      object-fit: contain;
    }
  }

  .story-image--portrait {
    border-radius: var(--token-reference-radius-full);
    padding: 0;

    :global(img) {
      block-size: 100%;
      inline-size: 100%;
      object-fit: cover;
    }
  }

  .story-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-fluid-lg);
  }
</style>
