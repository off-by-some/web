<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Code, Paragraph } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
    text: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Code',
    component: Code,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'code.pdf',
      renderWidth: '34rem',
      text: 'renderHtmlToPdf(pages, options)',
    },
    argTypes: {
      ...hideControls(['children']),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Inline code element. Uses a monospace font via `--pdf-monospace-family` and renders at 0.92em relative to the surrounding text. Compose inside `Paragraph` when it appears within flowing copy.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <section class="code-story">
      <Paragraph
        >Call <Code class="code-story__code">{args.text}</Code> to export the document.</Paragraph
      >
    </section>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .code-story {
    color: #1f2937;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  :global(.code-story__code) {
    padding-inline: 0.25em;
    color: #1de9b6;
    background: rgba(29, 233, 182, 0.1);
    border-radius: 0.2em;
  }
</style>
