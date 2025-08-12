<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';

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

  export let title: string;
  export let subtitle: string;
  export let skillCategories: SkillCategory[];
  export let initialSelectedCategory: string | null = null;

  const dispatch = createEventDispatcher<{
    skillSelect: { skill: Skill; category: SkillCategory };
    categorySelect: { category: SkillCategory };
  }>();

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
  let selectedCategory: string | null = null;
  let hoveredSkill: string | null = null;
  let announcementText = '';
  let touchStartX = 0;
  let touchEndX = 0;
  let hasInitialized = false;

  // Reactive values
  $: allSkills = skillCategories
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
    });

  $: filteredSkills = selectedCategory
    ? allSkills.filter((skill) => skill.categoryInfo.name === selectedCategory)
    : allSkills;

  $: skillsByLevel = filteredSkills.reduce(
    (acc, skill) => {
      acc[skill.level] = (acc[skill.level] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Initialize category only once
  $: if (!hasInitialized && skillCategories.length > 0) {
    selectedCategory = initialSelectedCategory || null;
    hasInitialized = true;
  }

  // Navigation
  const selectCategory = (category: SkillCategory | null) => {
    selectedCategory = category?.name || null;

    const skillCount = category ? category.skills.length : allSkills.length;
    const categoryName = category?.name || 'All Skills';
    announcementText = `Filtered to ${categoryName}. Showing ${skillCount} skills.`;

    if (category) {
      dispatch('categorySelect', { category });
    }
  };

  const selectSkill = (skill: Skill & { categoryInfo: SkillCategory }, isActive: boolean) => {
    hoveredSkill = isActive ? skill.name : null;

    if (isActive) {
      dispatch('skillSelect', { skill, category: skill.categoryInfo });

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
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
>
  <!-- Screen reader announcements -->
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="skills__container">
    <!-- Header -->
    <header class="header">
      <h2 class="header__title" id="skills-heading">{title}</h2>
      <p class="header__subtitle">{subtitle}</p>
    </header>

    <!-- Category Filters -->
    <nav class="filters" aria-label="Filter skills by category">
      <button
        class="filter-button"
        class:filter-button--active={!selectedCategory}
        on:click={() => selectCategory(null)}
        role="tab"
        aria-selected={!selectedCategory}
        aria-controls="skills-grid"
      >
        All Skills
        <span class="filter-button__count">{allSkills.length}</span>
      </button>

      {#each skillCategories as category (category.name)}
        <button
          class="filter-button"
          class:filter-button--active={selectedCategory === category.name}
          on:click={() => selectCategory(category)}
          role="tab"
          aria-selected={selectedCategory === category.name}
          aria-controls="skills-grid"
        >
          <span class="filter-button__icon">{category.icon}</span>
          {category.name}
          <span class="filter-button__count">{category.skills.length}</span>
        </button>
      {/each}
    </nav>

    <!-- Skills Grid -->
    <div class="skills-grid" id="skills-grid" role="grid">
      {#each filteredSkills as skill, index (skill.name)}
        <article
          class="skill-card"
          class:skill-card--hovered={hoveredSkill === skill.name}
          style="animation-delay: {index * 0.05}s"
        >
          <button
            type="button"
            class="skill-button skill-button--{skill.level}"
            on:click={() => selectSkill(skill, true)}
            on:mouseenter={() => selectSkill(skill, true)}
            on:mouseleave={() => selectSkill(skill, false)}
            aria-label="{skill.name}. {toTitleCase(skill.level)} level skill{skill.years
              ? ` with ${skill.years} years experience`
              : ''}{skill.description ? `. ${skill.description}` : ''}"
          >
            <div class="skill-image">
              <Image src={skill.image} alt="" sizes="48px" loading="lazy" />
              <div class="skill-level-indicator skill-level-indicator--{skill.level}"></div>
            </div>

            <div class="skill-content">
              <h3 class="skill-name">{skill.name}</h3>

              <div class="skill-meta">
                <span class="skill-level skill-level--{skill.level}">
                  {toTitleCase(skill.level)}
                </span>
                {#if skill.years}
                  <span class="skill-years">{skill.years}y</span>
                {/if}
              </div>

              {#if skill.description}
                <p class="skill-description">{skill.description}</p>
              {/if}
            </div>
          </button>
        </article>
      {/each}
    </div>

    <!-- Legend -->
    <footer class="legend" role="region" aria-labelledby="legend-heading">
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
    </footer>
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

  .skills__container {
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

  // Header styles
  .header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) both;
  }

  .header__title {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-lg);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-5xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-6xl);
    }
  }

  .header__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    line-height: var(--token-line-height-relaxed);
    max-width: 70ch;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  // Filter styles
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

  .filter-button {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    cursor: pointer;
    transition: all 0.4s var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    white-space: nowrap;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity 0.4s var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: var(--token-border-color-hover);
      color: var(--token-text-primary);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.8;
      }
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-full);
    }

    &--active {
      background: var(--token-surface-glass-medium);
      border-color: var(--token-interactive-color);
      color: var(--token-text-primary);
      transform: translateY(-2px) scale(1.05);
      box-shadow:
        var(--token-shadow-focus),
        0 0 20px var(--token-interactive-glow);

      &::before {
        background: linear-gradient(135deg, var(--token-interactive-color) 0%, transparent 50%);
        opacity: 0.15;
      }

      &:hover::before {
        opacity: 0.3;
      }
    }

    @media (min-width: $breakpoint-sm) {
      padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
      font-size: var(--token-font-size-sm);
      gap: var(--token-space-fluid-sm);
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
      font-size: var(--token-font-size-base);
      gap: var(--token-space-fluid-md);
    }
  }

  .filter-button__icon {
    font-size: var(--token-font-size-sm);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .filter-button__count {
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-sm);
    padding: var(--token-space-1) var(--token-space-2);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    backdrop-filter: blur(var(--token-blur-sm));
    color: var(--token-text-brand);

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-2) var(--token-space-3);
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

  .skill-card {
    opacity: 0;
    transform: translateY(20px);
    animation: skillCardFadeIn 0.6s var(--token-motion-ease-out) forwards;
  }

  .skill-button {
    width: 100%;
    height: 100%;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-lg);
    cursor: pointer;
    transition: all 0.4s var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-default);
    position: relative;
    overflow: hidden;
    text-align: center;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity 0.4s var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.6;
      }

      .skill-image {
        transform: scale(1.05);

        :global(img) {
          transform: scale(1.1);
        }
      }

      .skill-level-indicator {
        transform: scale(1.2);
      }

      .skill-description {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-xl);
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-space-fluid-2xl);
    }

    // Level-specific hover effects
    &--expert:hover {
      border-color: var(--token-state-mastery-expert);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 30px var(--token-state-mastery-glow);

      &::before {
        background: linear-gradient(135deg, var(--token-state-mastery-expert) 0%, transparent 50%);
        opacity: 0.1;
      }
    }

    &--advanced:hover {
      border-color: var(--token-status-advanced);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 30px rgba(99, 102, 241, 0.2);

      &::before {
        background: linear-gradient(135deg, var(--token-status-advanced) 0%, transparent 50%);
        opacity: 0.1;
      }
    }

    &--proficient:hover {
      border-color: var(--token-status-proficient);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 30px rgba(245, 158, 11, 0.2);

      &::before {
        background: linear-gradient(135deg, var(--token-status-proficient) 0%, transparent 50%);
        opacity: 0.1;
      }
    }

    &--learning:hover {
      border-color: var(--token-status-learning);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 30px rgba(6, 182, 212, 0.2);

      &::before {
        background: linear-gradient(135deg, var(--token-status-learning) 0%, transparent 50%);
        opacity: 0.1;
      }
    }
  }

  .skill-image {
    position: relative;
    width: 3rem;
    height: 3rem;
    margin: 0 auto var(--token-space-fluid-md);
    border-radius: var(--token-radius-lg);
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s var(--token-motion-ease-out);

    :global(img) {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
      transition: transform 0.4s var(--token-motion-ease-out);
    }

    @media (min-width: $breakpoint-md) {
      width: 4rem;
      height: 4rem;

      :global(img) {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    @media (min-width: $breakpoint-lg) {
      width: 5rem;
      height: 5rem;

      :global(img) {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  .skill-level-indicator {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 1rem;
    height: 1rem;
    border-radius: var(--token-radius-full);
    border: 2px solid var(--token-surface-color);
    transition: transform 0.4s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      width: 1.25rem;
      height: 1.25rem;
    }

    &--expert {
      background: var(--token-state-mastery-expert);
      box-shadow: 0 0 8px var(--token-state-mastery-glow);
    }

    &--advanced {
      background: var(--token-status-advanced);
      box-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
    }

    &--proficient {
      background: var(--token-status-proficient);
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
    }

    &--learning {
      background: var(--token-status-learning);
      box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
    }
  }

  .skill-content {
    position: relative;
    z-index: 1;
  }

  .skill-name {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
    }
  }

  .skill-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-xs);
    margin-bottom: var(--token-space-fluid-sm);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-sm);
    }
  }

  .skill-level {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    padding: var(--token-space-1) var(--token-space-2);
    border-radius: var(--token-radius-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));
    transition: all 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-2) var(--token-space-3);
    }

    &--expert {
      color: var(--token-state-mastery-expert);
      border-color: var(--token-state-mastery-expert);

      .skill-button:hover & {
        background: var(--token-state-mastery-expert);
        color: var(--token-text-dark);
      }
    }

    &--advanced {
      color: var(--token-status-advanced);
      border-color: var(--token-status-advanced);

      .skill-button:hover & {
        background: var(--token-status-advanced);
        color: var(--token-text-dark);
      }
    }

    &--proficient {
      color: var(--token-status-proficient);
      border-color: var(--token-status-proficient);

      .skill-button:hover & {
        background: var(--token-status-proficient);
        color: var(--token-text-dark);
      }
    }

    &--learning {
      color: var(--token-status-learning);
      border-color: var(--token-status-learning);

      .skill-button:hover & {
        background: var(--token-status-learning);
        color: var(--token-text-dark);
      }
    }
  }

  .skill-years {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-1) var(--token-space-2);
    border-radius: var(--token-radius-sm);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-2) var(--token-space-3);
    }
  }

  .skill-description {
    font-size: var(--token-font-size-xs);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }

    @media (max-width: calc($breakpoint-md - 1px)) {
      opacity: 0.8;
      transform: translateY(0);
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

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
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
    .header,
    .filters,
    .skills-grid,
    .legend,
    .skill-card {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .header__title {
      animation: none;
    }

    .skill-button,
    .filter-button,
    .skill-level-indicator,
    .legend-item {
      transition: none;
    }

    .skill-description {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .skill-button,
    .filter-button {
      border-width: 2px;
      border-color: currentColor;
    }

    .header__title {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
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

    .skill-button {
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
    }

    .skill-description {
      opacity: 1;
      transform: none;
    }

    .header__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
