<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroValue from '$lib/components/site/hero/HeroValue';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Value Statement',
    component: HeroValue,
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

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroValue
      headline="I build resilient systems and focused engineering teams."
      description="From architecture to delivery, I turn messy product ideas into reliable software with clear operational guardrails."
      primaryButtonText="Get in Touch"
      linkedinUrl="https://linkedin.com/in/cassidy-bridges-tech"
      githubUrl="https://github.com/off-by-some"
      repoUrl="https://github.com/off-by-some/web"
      resumeHref="/resume/Cassidy-Bridges-Software-Engineering.pdf"
    />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 42rem;
  }
</style>
