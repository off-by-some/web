<script lang="ts">
  import HeroPanel from '$lib/components/site/hero/HeroPanel';
  import TechCategoryCard from '$lib/components/site/skills/TechCategoryCard';

  type Props = {
    techStack?: Array<{
      title: string;
      level: 'expert' | 'advanced';
      technologies: string[];
    }>;
    title?: string;
    onCategoryClick?: (category: string) => void;
  };

  let { techStack = [], title = 'Lorem Ipsum', onCategoryClick }: Props = $props();
</script>

<HeroPanel {title} titleId="tech-title" area="tech" delay="0.7s">
  <div class="tech-grid">
    {#each techStack as category, index (index)}
      <TechCategoryCard
        title={category.title}
        level={category.level}
        technologies={category.technologies}
        onclick={() => onCategoryClick?.(category.title)}
      />
    {/each}
  </div>
</HeroPanel>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .tech-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
