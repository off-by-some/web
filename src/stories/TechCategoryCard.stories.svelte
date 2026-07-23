<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TechCategoryCard from '$lib/components/site/skills/TechCategoryCard';

  const technologies = ['React', 'TypeScript', 'Svelte', 'SCSS', 'Accessibility', 'Storybook'];

  const { Story } = defineMeta({
    title: 'Library/Site/Skills/Technology Category Card',
    component: TechCategoryCard,
    tags: ['autodocs'],
    args: {
      title: 'Frontend Architecture',
      level: 'expert',
      technologies,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Measures how many technology tags fit in two lines by rendering an offscreen clone and re-measuring on every resize (via ResizeObserver), then collapses whatever doesn\'t fit into a single "+N" tag rather than wrapping to a third line. Resize the preview pane to watch tags move in and out of the overflow count — this is the one component here that touches the DOM directly for layout instead of relying on CSS alone.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-width">
    <TechCategoryCard title="Frontend Architecture" level="expert" {technologies} />
  </div>
</Story>

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 30rem;
  }
</style>
