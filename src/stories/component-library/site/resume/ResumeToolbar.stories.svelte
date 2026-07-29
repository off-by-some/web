<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeToolbar } from '$lib/components/site/resume';
  import { resumeContent } from '$lib/content';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    downloadReady: boolean;
    generating: boolean;
    title: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Resume/Toolbar',
    component: ResumeToolbar,
    render: template,
    tags: ['autodocs'],
    args: {
      downloadReady: true,
      generating: false,
      title: `${resumeContent.name} - Resume`,
    },
    argTypes: {
      ...hideControls(['onDownloadRequested']),
      downloadReady: { control: 'boolean' },
      generating: { control: 'boolean' },
      title: { control: 'text' },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="resume-toolbar-story">
    <ResumeToolbar
      title={args.title}
      generating={args.generating}
      downloadReady={args.downloadReady}
      onDownloadRequested={() => console.log('Resume toolbar download requested')}
    />
  </div>
{/snippet}

<Story name="Default" />
<Story
  name="Generating"
  args={{
    downloadReady: true,
    generating: true,
    title: `${resumeContent.name} - Resume`,
  }}
/>

<style lang="scss">
  .resume-toolbar-story {
    min-block-size: 6rem;
    background: var(--token-theme-color-surface-color, #0b0f28);
    overflow: hidden;
    border-radius: 0.5rem;
  }
</style>
