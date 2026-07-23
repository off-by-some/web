<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Image from '$lib/components/primitives/media/Image';
  import { designNotes } from './docs/design-notes';

  type Args = {
    src: string;
    alt: string;
    sizes: string;
    priority: boolean;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Media/Image',
    component: Image,
    render: template,
    tags: ['autodocs'],
    args: {
      src: 'headshot.png',
      alt: 'Portrait example',
      sizes: '12rem',
      priority: true,
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
    <Image src={args.src} alt={args.alt} sizes={args.sizes} priority={args.priority} />
  </div>
{/snippet}

<Story name="Portrait" asChild>
  <div class="story-image story-image--portrait">
    <Image src="headshot.png" alt="Portrait example" sizes="12rem" priority />
  </div>
</Story>

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
    background: var(--token-surface-glass-medium);
    border-radius: var(--token-radius-xl);
    display: flex;
    height: 12rem;
    justify-content: center;
    overflow: hidden;
    padding: var(--token-space-fluid-md);
    width: 12rem;

    :global(img),
    :global(picture) {
      max-height: 100%;
      object-fit: contain;
    }
  }

  .story-image--portrait {
    border-radius: var(--token-radius-full);
    padding: 0;

    :global(img) {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .story-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-lg);
  }
</style>
