<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import VisuallyHidden from './components/primitives/accessibility/VisuallyHidden';
  import ToneDot from './components/primitives/status/ToneDot';
  import FilterButton from './components/site/skills/FilterButton';
  import SectionHeader from './components/site/section-headings/SectionHeader';
  import SkillCard from './components/site/skills/SkillCard';

  type SkillLevel = 'expert' | 'advanced' | 'proficient' | 'learning';

  interface Skill {
    name: string;
    level?: SkillLevel;
    years?: number;
    category: string;
    description?: string;
    image: string;
  }

  interface SkillCategory {
    name: string;
    icon: string;
    color: string;
    skills: Skill[];
    mastery: 'expert' | 'advanced' | 'proficient';
  }

  type SkillWithCategory = Skill & {
    level: SkillLevel;
    categoryInfo: SkillCategory;
  };

  type Props = {
    title: string;
    subtitle: string;
    skillCategories: SkillCategory[];
    initialSelectedCategory?: string | null;
    onSkillSelectionRequested?: (payload: {
      skill: SkillWithCategory;
      category: SkillCategory;
    }) => void;
    onCategorySelectionRequested?: (payload: { category: SkillCategory }) => void;
  };

  let {
    title,
    subtitle,
    skillCategories,
    initialSelectedCategory = null,
    onSkillSelectionRequested,
    onCategorySelectionRequested,
  }: Props = $props();

  // Helper function to convert skill levels to title-case
  const toTitleCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Function to calculate proficiency level based on years of experience
  const calculateProficiencyLevel = (years?: number): SkillLevel => {
    if (!years || years <= 2) return 'learning';
    if (years <= 4) return 'proficient';
    if (years <= 7) return 'advanced';
    return 'expert';
  };

  // State
  let selectedCategory: string | null = $state(null);
  let hoveredSkill: string | null = $state(null);
  let announcementText = $state('');
  let touchStartX = 0;
  let touchEndX = 0;
  let hasInitialized = false;
  const skillLevels: SkillLevel[] = ['expert', 'advanced', 'proficient', 'learning'];

  // Reactive values
  const allSkills = $derived(
    skillCategories
      .flatMap((category) =>
        category.skills.map((skill) => ({
          ...skill,
          categoryInfo: category,
          // Calculate level automatically if not provided or if years are available
          level: skill.level || calculateProficiencyLevel(skill.years),
        })),
      )
      .sort((a, b) => {
        // Define proficiency order (highest to lowest)
        const proficiencyOrder = { expert: 4, advanced: 3, proficient: 2, learning: 1 };

        // First sort by proficiency level
        const levelComparison = proficiencyOrder[b.level] - proficiencyOrder[a.level];
        if (levelComparison !== 0) {
          return levelComparison;
        }

        // If proficiency levels are the same, sort by years of experience (highest first)
        const aYears = a.years || 0;
        const bYears = b.years || 0;
        return bYears - aYears;
      }),
  );

  const filteredSkills = $derived(
    selectedCategory
      ? allSkills.filter((skill) => skill.categoryInfo.name === selectedCategory)
      : allSkills,
  );

  const skillsByLevel = $derived(
    filteredSkills.reduce(
      (acc, skill) => {
        acc[skill.level] = (acc[skill.level] || 0) + 1;
        return acc;
      },
      {} as Partial<Record<SkillLevel, number>>,
    ),
  );

  // Initialize category only once
  $effect(() => {
    if (!hasInitialized && skillCategories.length > 0) {
      selectedCategory = initialSelectedCategory || null;
      hasInitialized = true;
    }
  });

  // Navigation
  const selectCategory = (category: SkillCategory | null) => {
    selectedCategory = category?.name || null;

    const skillCount = category ? category.skills.length : allSkills.length;
    const categoryName = category?.name || 'All Skills';
    announcementText = `Filtered to ${categoryName}. Showing ${skillCount} skills.`;

    if (category) {
      onCategorySelectionRequested?.({ category });
    }
  };

  const selectSkill = (skill: SkillWithCategory, isActive: boolean) => {
    hoveredSkill = isActive ? skill.name : null;

    if (isActive) {
      onSkillSelectionRequested?.({ skill, category: skill.categoryInfo });

      let announcement = `Selected ${skill.name}, ${toTitleCase(skill.level)} level skill`;
      if (skill.years) announcement += ` with ${skill.years} years experience`;
      if (skill.description) announcement += `. ${skill.description}`;

      announcementText = announcement;
    }
  };

  // Touch handling for mobile filter navigation
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const difference = touchStartX - touchEndX;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    const categories = [null, ...skillCategories];
    const currentIndex = selectedCategory
      ? categories.findIndex((cat) => cat?.name === selectedCategory)
      : 0;

    if (isLeftSwipe && currentIndex < categories.length - 1) {
      selectCategory(categories[currentIndex + 1]);
    } else if (isRightSwipe && currentIndex > 0) {
      selectCategory(categories[currentIndex - 1]);
    }

    touchStartX = 0;
    touchEndX = 0;
  };

  const getSkillDelay = (index: number) => `${index * 0.05}s`;
</script>

<section
  class="skills"
  id="skills"
  aria-labelledby="skills-heading"
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
>
  <!-- Screen reader announcements -->
  <VisuallyHidden as="div" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </VisuallyHidden>

  <Section className="skills__container">
    <!-- Header -->
    <div class="skills__header">
      <SectionHeader {title} {subtitle} titleId="skills-heading" />
    </div>

    <!-- Category Filters -->
    <div class="filters" role="tablist" aria-label="Filter skills by category">
      <FilterButton
        label="All Skills"
        count={allSkills.length}
        active={!selectedCategory}
        onSelectRequested={() => selectCategory(null)}
      />

      {#each skillCategories as category (category.name)}
        <FilterButton
          label={category.name}
          icon={category.icon}
          count={category.skills.length}
          active={selectedCategory === category.name}
          onSelectRequested={() => selectCategory(category)}
        />
      {/each}
    </div>

    <!-- Skills Grid -->
    <div class="skills-grid" id="skills-grid">
      {#each filteredSkills as skill, index (skill.name)}
        <SkillCard
          {skill}
          delay={getSkillDelay(index)}
          hovered={hoveredSkill === skill.name}
          onEngagementChangeRequested={(active) => selectSkill(skill, active)}
        />
      {/each}
    </div>

    <!-- Legend -->
    <div class="legend" role="region" aria-labelledby="legend-heading">
      <VisuallyHidden as="h3" id="legend-heading">Skill level legend</VisuallyHidden>
      <div class="legend-items">
        {#each skillLevels as level (level)}
          <div class="legend-item legend-item--{level}">
            <ToneDot tone={level} className="legend-dot" />
            <span class="legend-label">{toTitleCase(level)}</span>
            <span class="legend-count">{skillsByLevel[level] || 0}</span>
          </div>
        {/each}
      </div>
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/_breakpoints' as *;

  .skills {
    position: relative;
    background: var(--token-feature-skills-background);
    padding: var(--token-reference-spacing-fluid-6xl) 0;
    overflow: hidden;
    font-family: var(--token-reference-typography-family-sans);
    font-feature-settings:
      'kern' 1,
      'liga' 1,
      'calt' 1,
      'ss01' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-feature-hero-glow);
      opacity: 0.3;
      pointer-events: none;
    }
  }

  :global(.skills__container) {
    position: relative;
    z-index: 1;
    max-inline-size: var(--token-reference-container-max);
    margin: 0 auto;
    padding: 0 var(--token-reference-spacing-fluid-lg);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-reference-spacing-fluid-2xl);
    }
  }

  .skills__header {
    margin-block-end: var(--token-reference-spacing-fluid-5xl);
  }

  .filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-fluid-sm);
    margin-block-end: var(--token-reference-spacing-fluid-5xl);
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-200) both;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-md);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-lg);
    }
  }

  // Skills grid
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-reference-spacing-fluid-lg);
    margin-block-end: var(--token-reference-spacing-fluid-5xl);
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-400) both;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--token-reference-spacing-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      gap: var(--token-reference-spacing-fluid-3xl);
    }
  }

  // Legend
  .legend {
    text-align: center;
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-600) both;
  }

  .legend-items {
    display: flex;
    justify-content: center;
    gap: var(--token-reference-spacing-fluid-xl);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-2xl);
    }
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-sm);
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-tertiary);
    transition:
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    padding: var(--token-reference-spacing-fluid-xs) var(--token-reference-spacing-fluid-sm);
    border-radius: var(--token-reference-radius-sm);

    &:hover {
      color: var(--token-theme-color-text-primary);
      transform: translateY(-2px);

      :global(.legend-dot) {
        transform: scale(1.2);
      }
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  :global(.legend-dot) {
    --tone-dot-size: 0.75rem;
    --tone-dot-glow-size: 8px;

    @media (min-width: $breakpoint-md) {
      --tone-dot-size: 1rem;
    }
  }

  .legend-count {
    background: var(--token-theme-color-surface-glass-strong);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-sm);
    padding: var(--token-reference-spacing-1) var(--token-reference-spacing-2);
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-brand);
    backdrop-filter: blur(var(--token-reference-blur-sm));
  }

  // Animations
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes skillCardFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Accessibility & Motion Preferences
  @media (prefers-reduced-motion: reduce) {
    .filters,
    .skills-grid,
    .legend {
      animation: none;
      opacity: 1;
      transform: none;
    }
    .legend-item {
      transition: none;
    }
  }

  @media print {
    .skills {
      background: Canvas;
      color: CanvasText;
      padding: var(--token-reference-spacing-fluid-lg);
    }

    .filters {
      display: none;
    }
  }
</style>
