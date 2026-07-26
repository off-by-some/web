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
    onCategorySelectRequested?: (category: string) => void;
  };

  let { techStack = [], title = 'Lorem Ipsum', onCategorySelectRequested }: Props = $props();

  const getCategoryDelay = (index: number) => `${1.4 + index * 0.1}s`;
</script>

<HeroPanel
  {title}
  titleId="tech-title"
  area="tech"
  delay="var(--token-reference-motion-delay-deferred)"
>
  <div class="tech-grid">
    {#each techStack as category, index (category.title)}
      <TechCategoryCard
        title={category.title}
        level={category.level}
        technologies={category.technologies}
        delay={getCategoryDelay(index)}
        onSelectRequested={() => onCategorySelectRequested?.(category.title)}
      />
    {/each}
  </div>
</HeroPanel>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .tech-grid {
    display: grid;
    gap: var(--token-reference-spacing-fluid-md);
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
