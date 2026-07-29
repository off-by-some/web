<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Image } from '$lib/pdf/primitives';
  import reactLogoUrl from '../../../../assets/images/icons/react-logo.png?url';
  import storybookIconUrl from '../../../../assets/images/svg/storybook-icon.svg?url';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  const sampleImage =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"%3E%3Crect width="320" height="160" rx="18" fill="%230b0f28"/%3E%3Ccircle cx="96" cy="80" r="48" fill="%231de9b6"/%3E%3Cpath d="M144 104h112M144 78h88M144 52h64" stroke="%23ffffff" stroke-width="14" stroke-linecap="round"/%3E%3C/svg%3E';

  type Args = {
    alt: string;
    filename: string;
    renderWidth: string;
    src: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Image',
    component: Image,
    render: template,
    tags: ['autodocs'],
    args: {
      alt: 'Abstract PDF image sample',
      filename: 'image.pdf',
      renderWidth: '34rem',
      src: sampleImage,
    },
    argTypes: {
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
      alt: { control: 'text' },
      src: { control: 'text' },
      ...hideControls(['height', 'width']),
    },
    parameters: {
      docs: {
        description: {
          component:
            "Renders an `<img>` that works with both raster (PNG, JPEG) and SVG sources. The renderer captures the image from the DOM and embeds it directly in the PDF. A meaningful `alt` is passed through to the PDF's accessibility metadata.",
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Image src={args.src} alt={args.alt} class="image-story" />
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />
<Story
  name="SVG Asset"
  args={{
    alt: 'Storybook logo',
    filename: 'image-svg-asset.pdf',
    src: storybookIconUrl,
  }}
/>
<Story
  name="Raster Asset"
  args={{
    alt: 'React logo',
    filename: 'image-raster-asset.pdf',
    src: reactLogoUrl,
  }}
/>

<style lang="scss">
  :global(.image-story) {
    inline-size: 18rem;
    border-radius: 0.5rem;
  }
</style>
