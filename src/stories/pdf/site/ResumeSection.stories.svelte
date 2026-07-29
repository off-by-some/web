<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeSection } from '$lib/pdf/site';
  import { hideControls } from '../../helpers/controls';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Section',
    component: ResumeSection,
    render: template,
    tags: ['autodocs'],
    args: {
      body: 'Staff-level engineering story content flows under the section heading and exports with the same rule treatment as the full resume.',
      filename: 'resume-section.pdf',
      title: 'Summary',
    },
    argTypes: {
      ...hideControls(['children']),
      body: { control: 'text' },
      filename: { control: 'text' },
      title: { control: 'text' },
    },
  });
</script>

{#snippet template(args: { body: string; filename: string; title: string })}
  <ResumeComponentStoryFrame filename={args.filename}>
    <ResumeSection title={args.title}>
      <p class="resume-section-story__body">{args.body}</p>
    </ResumeSection>
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .resume-section-story__body {
    margin: 0;
    color: var(--resume-color-body);
    font-size: 0.86rem;
    line-height: 1.4;
  }
</style>
