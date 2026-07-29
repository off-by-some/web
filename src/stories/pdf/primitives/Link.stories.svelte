<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Link } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    href: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Link',
    component: Link,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'link.pdf',
      href: 'https://off-by-some.github.io/web/',
      renderWidth: '34rem',
      text: 'off-by-some.github.io/web',
    },
    argTypes: {
      ...hideControls(['children', 'target', 'rel']),
      filename: { control: 'text' },
      href: { control: 'text' },
      renderWidth: { control: 'text' },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'An anchor element with `href` required. When `target="_blank"` is set, `rel="noopener noreferrer"` is added automatically. Links stay clickable in both the browser and the exported PDF.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <Link href={args.href} target="_blank" rel="noopener noreferrer" class="link-story"
      >{args.text}</Link
    >
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.link-story) {
    color: #0969da;
    font-size: 1rem;
    text-decoration: none;
  }
</style>
