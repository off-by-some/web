<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeContactIcon } from '$lib/pdf/site';
  import type { ResumeContactKind } from '$lib/pdf/site';
  import { hideControls } from '../../helpers/controls';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';

  type Args = {
    filename: string;
    kind: ResumeContactKind;
    size: number;
  };

  const kinds: ResumeContactKind[] = ['location', 'email', 'linkedin', 'github', 'link'];

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Contact Icon',
    component: ResumeContactIcon,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'resume-contact-icons.pdf',
      kind: 'linkedin',
      size: 18,
    },
    argTypes: {
      filename: { control: 'text' },
      kind: { control: 'select', options: kinds },
      size: { control: { type: 'number', min: 10, max: 32, step: 1 } },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeComponentStoryFrame filename={args.filename}>
    <div class="resume-contact-icon-story">
      <span class="resume-contact-icon-story__icon">
        <ResumeContactIcon kind={args.kind} size={args.size} />
      </span>
      <span>{args.kind}</span>
    </div>
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />
<Story name="GitHub" args={{ filename: 'resume-contact-github.pdf', kind: 'github', size: 18 }} />

<style lang="scss">
  .resume-contact-icon-story {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--resume-color-body);
    font-size: 0.85rem;
    text-transform: capitalize;
  }

  .resume-contact-icon-story__icon {
    display: inline-flex;
    color: var(--resume-color-section);
  }
</style>
