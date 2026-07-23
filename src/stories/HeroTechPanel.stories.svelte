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

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Technology Panel',
    component: HeroTechPanel,
    tags: ['autodocs'],
    args: {
      techStack,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Same pattern as HeroMetricsPanel — hardcodes its title ("Core Technologies & Skills") and `area="tech"` — but its entrance delay (0.7s) is deliberately later than the stats panel\'s (0.5s) so the two panels visibly stagger in rather than arriving together. Clicking a TechCategoryCard bubbles up through this component as a `categoryClick` event carrying just the category title.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroTechPanel {techStack} />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
