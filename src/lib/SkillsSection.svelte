<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import FilterButton from './components/site/skills/FilterButton';
  import SectionHeader from './components/site/section-headings/SectionHeader';
  import SkillCard from './components/site/skills/SkillCard';

  interface Skill {
    name: string;
    level?: 'expert' | 'advanced' | 'proficient' | 'learning';
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
    level: 'expert' | 'advanced' | 'proficient' | 'learning';
    categoryInfo: SkillCategory;
  };

  type Props = {
    title: string;
    subtitle: string;
    skillCategories: SkillCategory[];
    initialSelectedCategory?: string | null;
    onSkillSelect?: (payload: { skill: SkillWithCategory; category: SkillCategory }) => void;
    onCategorySelect?: (payload: { category: SkillCategory }) => void;
  };

  let {
    title,
    subtitle,
    skillCategories,
    initialSelectedCategory = null,
    onSkillSelect,
    onCategorySelect,
  }: Props = $props();

  // Helper function to convert skill levels to title-case
  const toTitleCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Function to calculate proficiency level based on years of experience
  const calculateProficiencyLevel = (
    years?: number,
  ): 'expert' | 'advanced' | 'proficient' | 'learning' => {
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
      {} as Record<string, number>,
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
      onCategorySelect?.({ category });
    }
  };

  const selectSkill = (skill: SkillWithCategory, isActive: boolean) => {
    hoveredSkill = isActive ? skill.name : null;

    if (isActive) {
      onSkillSelect?.({ skill, category: skill.categoryInfo });

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
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="skills__container">
    <!-- Header -->
    <SectionHeader {title} {subtitle} titleId="skills-heading" />

    <!-- Category Filters -->
    <div class="filters" role="tablist" aria-label="Filter skills by category">
      <FilterButton
        label="All Skills"
        count={allSkills.length}
        active={!selectedCategory}
        onclick={() => selectCategory(null)}
      />

      {#each skillCategories as category (category.name)}
        <FilterButton
          label={category.name}
          icon={category.icon}
          count={category.skills.length}
          active={selectedCategory === category.name}
          onclick={() => selectCategory(category)}
        />
      {/each}
    </div>

    <!-- Skills Grid -->
    <div class="skills-grid" id="skills-grid">
      {#each filteredSkills as skill, index (skill.name)}
        <SkillCard
          {skill}
          {index}
          hovered={hoveredSkill === skill.name}
          onInteract={(active) => selectSkill(skill, active)}
        />
      {/each}
    </div>

    <!-- Legend -->
    <div class="legend" role="region" aria-labelledby="legend-heading">
      <h3 id="legend-heading" class="sr-only">Skill level legend</h3>
      <div class="legend-items">
        {#each ['expert', 'advanced', 'proficient', 'learning'] as level (level)}
          <div class="legend-item legend-item--{level}">
            <div class="legend-dot"></div>
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skills {
    position: relative;
    background: var(--token-gradients-skills);
    padding: var(--token-space-fluid-6xl) 0;
    overflow: hidden;
    font-family: var(--token-font-family-sans);
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
      background: var(--token-gradients-hero-glow);
      opacity: 0.3;
      pointer-events: none;
    }
  }

  :global(.skills__container) {
    position: relative;
    z-index: 1;
    max-width: var(--token-container-max);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-2xl);
    }
  }

  .filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-sm);
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.2s both;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-md);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-lg);
    }
  }

  // Skills grid
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.4s both;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      gap: var(--token-space-fluid-3xl);
    }
  }

  // Legend
  .legend {
    text-align: center;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.6s both;
  }

  .legend-items {
    display: flex;
    justify-content: center;
    gap: var(--token-space-fluid-xl);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    transition: all 0.3s var(--token-motion-ease-out);
    cursor: pointer;
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    border-radius: var(--token-radius-sm);

    &:hover {
      color: var(--token-text-primary);
      transform: translateY(-2px);

      .legend-dot {
        transform: scale(1.2);
      }
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-sm);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .legend-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: var(--token-radius-full);
    transition: transform 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      width: 1rem;
      height: 1rem;
    }

    .legend-item--expert & {
      background: var(--token-state-mastery-expert);
      box-shadow: 0 0 8px var(--token-state-mastery-glow);
    }

    .legend-item--advanced & {
      background: var(--token-status-advanced);
      box-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
    }

    .legend-item--proficient & {
      background: var(--token-status-proficient);
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
    }

    .legend-item--learning & {
      background: var(--token-status-learning);
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
    }
  }

  .legend-count {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-sm);
    padding: var(--token-space-1) var(--token-space-2);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-brand);
    backdrop-filter: blur(var(--token-blur-sm));
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
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .filters {
      display: none;
    }
  }
</style>
