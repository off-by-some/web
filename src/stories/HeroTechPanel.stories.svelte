<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroTechPanel from '$lib/components/site/hero/HeroTechPanel';

  const techStack: Array<{
    title: string;
    level: 'expert' | 'advanced';
    technologies: string[];
  }> = [
    {
      title: 'Frontend Architecture',
      level: 'expert',
      technologies: ['React', 'Svelte', 'TypeScript', 'SCSS', 'Accessibility', 'Storybook'],
    },
    {
      title: 'Backend Systems',
      level: 'advanced',
      technologies: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'GraphQL'],
    },
  ];

  type Args = {
    title: string;
    techStack: typeof techStack;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Technology Panel',
    component: HeroTechPanel,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Core Technologies & Skills',
      techStack,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Same pattern as HeroMetricsPanel, but for the technology category cards. It owns `area="tech"` and a later entrance delay so the two hero panels visibly stagger in rather than arriving together; the story exposes only the visible heading and stack content.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroTechPanel
      title={args.title}
      techStack={args.techStack}
      onCategoryClick={(category) => console.log('Category clicked:', category)}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
