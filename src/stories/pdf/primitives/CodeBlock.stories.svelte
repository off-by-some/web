<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { CodeBlock } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  const sampleCode = `const blob = await renderHtmlToPdf(pages, { pageSize: 'letter' });
saveAs(blob, 'resume.pdf');`;

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Code Block',
    component: CodeBlock,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'code-block.pdf',
      renderWidth: '34rem',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'A `<pre>` block that preserves whitespace and line breaks exactly. Override the font with `--pdf-monospace-family`.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <CodeBlock class="code-block-story">{sampleCode}</CodeBlock>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.code-block-story) {
    padding: 1rem;
    color: #e2e8f0;
    background: #0f172a;
    border-radius: 0.375rem;
    font-size: 0.85rem;
    line-height: 1.6;
  }
</style>
