<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroValue from '$lib/components/site/hero/HeroValue';
  import { hideControls } from './helpers/controls';

  type Args = {
    headline: string;
    description: string;
    primaryButtonText: string;
    linkedinUrl?: string;
    githubUrl?: string;
    repoUrl?: string;
    resumeHref?: string;
    resumeFilename: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Value Statement',
    component: HeroValue,
    render: template,
    tags: ['autodocs'],
    args: {
      headline: 'I build resilient systems and focused engineering teams.',
      description:
        'From architecture to delivery, I turn messy product ideas into reliable software with clear operational guardrails.',
      primaryButtonText: 'Get in Touch',
      linkedinUrl: 'https://linkedin.com/in/cassidy-bridges-tech',
      githubUrl: 'https://github.com/off-by-some',
      repoUrl: 'https://github.com/off-by-some/web',
      resumeHref: '/resume/Cassidy-Bridges-Software-Engineering.pdf',
      resumeFilename: 'Cassidy-Bridges-Software-Engineering.pdf',
    },
    argTypes: {
      ...hideControls(['linkedinUrl', 'githubUrl', 'repoUrl', 'resumeHref', 'resumeFilename']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Headline, supporting line, and a fixed action row for profile links, resume download, starring the project repo, and contact intent. All the circular controls share the same glass icon language.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroValue
      headline={args.headline}
      description={args.description}
      primaryButtonText={args.primaryButtonText}
      linkedinUrl={args.linkedinUrl}
      githubUrl={args.githubUrl}
      repoUrl={args.repoUrl}
      resumeHref={args.resumeHref}
      resumeFilename={args.resumeFilename}
      onPrimaryAction={() => console.log('Primary action')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 42rem;
  }
</style>
