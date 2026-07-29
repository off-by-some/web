<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeExperience } from '$lib/pdf/site';
  import type { Experience } from '$lib/pdf/site';
  import { hideControls } from '../../helpers/controls';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';
  import { storyExperience } from './resume-story-data';

  type Args = {
    density: 'primary' | 'compact';
    experience: Experience;
    filename: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Experience',
    component: ResumeExperience,
    render: template,
    tags: ['autodocs'],
    args: {
      density: 'primary',
      experience: storyExperience,
      filename: 'resume-experience.pdf',
    },
    argTypes: {
      density: { control: 'select', options: ['primary', 'compact'] },
      experience: { control: 'object' },
      filename: { control: 'text' },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeComponentStoryFrame filename={args.filename}>
    <ResumeExperience density={args.density} experience={args.experience} />
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />
<Story
  name="Compact"
  args={{
    density: 'compact',
    experience: storyExperience,
    filename: 'resume-experience-compact.pdf',
  }}
/>
