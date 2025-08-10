<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';

  interface Skill {
    name: string;
    level: 'expert' | 'advanced' | 'proficient' | 'learning';
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

  // Pre-computed constants
  const SKILL_LEVELS = ['expert', 'advanced', 'proficient', 'learning'] as const;
  const LEVEL_INDICES = { expert: 0, advanced: 1, proficient: 2, learning: 3 } as const;

  let selectedCategory: string | null = null;
  let hoveredSkill: string | null = null;
  let announcementText = '';
  let hasInitializedCategory = false;

  // Cached computations with dirty flags
  let allSkillsCache: (Skill & { categoryInfo: SkillCategory })[] = [];
  let categoryMapCache: Record<string, SkillCategory> = {};
  let skillsByCategoryCache: Record<string, (Skill & { categoryInfo: SkillCategory })[]> = {};
  let cacheValid = false;

  // Single key handler - no recreation needed
  const handleKey = (callback: () => void, event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  // Factory to create a handler with a bound callback
  const createKeyHandler = (callback: () => void) => (event: KeyboardEvent) =>
    handleKey(callback, event);

  // Optimized cache building
  const buildCaches = () => {
    if (cacheValid) return;

    allSkillsCache = [];
    categoryMapCache = {};
    skillsByCategoryCache = {};

    // Single pass to build all caches
    for (const category of skillCategories) {
      categoryMapCache[category.name] = category;
      const categorySkills: (Skill & { categoryInfo: SkillCategory })[] = [];

      for (const skill of category.skills) {
        const enrichedSkill = { ...skill, categoryInfo: category };
        allSkillsCache.push(enrichedSkill);
        categorySkills.push(enrichedSkill);
      }

      skillsByCategoryCache[category.name] = categorySkills;
    }

    cacheValid = true;
  };

  // Optimized level counting - single pass
  const countSkillsByLevel = (skills: (Skill & { categoryInfo: SkillCategory })[]) => {
    const counts = { expert: 0, advanced: 0, proficient: 0, learning: 0 };

    for (const skill of skills) {
      counts[skill.level]++;
    }

    return counts;
  };

  const handleCategoryFilter = (category: SkillCategory | null) => {
    selectedCategory = category?.name || null;

    buildCaches();
    const skillCount = category ? category.skills.length : allSkillsCache.length;
    const categoryName = category?.name || 'All Skills';

    announcementText = `Filtered to ${categoryName}. Showing ${skillCount} skills.`;

    if (category) dispatch('categorySelect', { category });
  };

  const handleSkillInteraction = (
    skill: Skill & { categoryInfo: SkillCategory },
    isActive: boolean,
  ) => {
    hoveredSkill = isActive ? skill.name : null;

    if (isActive) {
      dispatch('skillSelect', { skill, category: skill.categoryInfo });

      // Optimized announcement building
      let announcement = `Selected ${skill.name}, ${skill.level} level skill`;
      if (skill.years) announcement += ` with ${skill.years} years experience`;
      if (skill.description) announcement += `. ${skill.description}`;

      announcementText = announcement;
    }
  };

  // Reactive computations - only recalculate when necessary
  $: {
    // Initialize selectedCategory only once
    if (
      !hasInitializedCategory &&
      selectedCategory === null &&
      (skillCategories?.length ?? 0) > 0
    ) {
      selectedCategory = initialSelectedCategory ?? skillCategories[0]?.name ?? null;
      hasInitializedCategory = true;
    }
  }

  $: {
    // Invalidate cache when skillCategories change
    if (skillCategories) {
      cacheValid = false;
    }
  }

  // Optimized filtered skills - use cached data
  $: {
    buildCaches();
    allSkills = allSkillsCache; // Expose cached allSkills
    filteredSkills = selectedCategory
      ? (skillsByCategoryCache[selectedCategory] ?? [])
      : allSkillsCache;
  }

  // Single-pass level counting
  $: skillsByLevel = countSkillsByLevel(filteredSkills);

  // Declare reactive variables
  let filteredSkills: (Skill & { categoryInfo: SkillCategory })[] = [];
  let allSkills: (Skill & { categoryInfo: SkillCategory })[] = [];
</script>

<section class="skills" id="skills" aria-labelledby="skills-heading">
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="skills__content">
    <div class="skills__container">
      <header class="skills__header">
        <h2 class="skills__title" id="skills-heading">{title}</h2>
        <p class="skills__subtitle">{subtitle}</p>
      </header>

      <div class="skills__filters" role="tablist" aria-label="Filter skills by category">
        {#each skillCategories as category (category.name)}
          <button
            class="filter__button"
            class:is-active={selectedCategory === category.name}
            on:click={() => handleCategoryFilter(category)}
            on:keydown={createKeyHandler(() => handleCategoryFilter(category))}
            role="tab"
            aria-selected={selectedCategory === category.name}
            aria-controls="skills-grid"
          >
            <span class="filter__icon" aria-hidden="true">{category.icon}</span>
            {category.name}
            <span class="filter__count" aria-label="{category.skills.length} skills">
              {category.skills.length}
            </span>
          </button>
        {/each}

        <button
          class="filter__button"
          class:is-active={!selectedCategory}
          on:click={() => handleCategoryFilter(null)}
          on:keydown={createKeyHandler(() => handleCategoryFilter(null))}
          role="tab"
          aria-selected={!selectedCategory}
          aria-controls="skills-grid"
        >
          All Skills
          <span class="filter__count" aria-label="{allSkills.length} skills">
            {allSkills.length}
          </span>
        </button>
      </div>

      <div class="skills__grid" id="skills-grid">
        {#each filteredSkills as skill, index (skill.name)}
          <article class="skill__item" data-card-index={index}>
            <button
              type="button"
              class="skill__card skill__card--{skill.level}"
              class:skill__card--hovered={hoveredSkill === skill.name}
              on:click={() => handleSkillInteraction(skill, true)}
              on:mouseenter={() => handleSkillInteraction(skill, true)}
              on:mouseleave={() => handleSkillInteraction(skill, false)}
              on:keydown={createKeyHandler(() => handleSkillInteraction(skill, true))}
              aria-label="{skill.name}. {skill.level} level skill{skill.years
                ? ` with ${skill.years} years experience`
                : ''}{skill.description ? `. ${skill.description}` : ''}"
            >
              <div class="skill__image">
                <Image src={skill.image} alt="" sizes="40px" loading="lazy" />
                <div class="skill__level-indicator skill__level-indicator--{skill.level}"></div>
              </div>

              <div class="skill__content">
                <h3 class="skill__name">{skill.name}</h3>
                <div class="skill__meta">
                  <span class="skill__level skill__level--{skill.level}">
                    {skill.level}
                  </span>
                  {#if skill.years}
                    <span class="skill__years">{skill.years}y</span>
                  {/if}
                </div>
                {#if skill.description}
                  <p class="skill__description">{skill.description}</p>
                {/if}
              </div>

              <div class="skill__glow"></div>
            </button>
          </article>
        {/each}
      </div>

      <aside class="skills__summary" role="region" aria-labelledby="skills-summary-heading">
        <h3 class="sr-only" id="skills-summary-heading">Skills Summary Statistics</h3>

        <div class="summary__grid" role="list" aria-label="Skills statistics">
          {#each [{ value: allSkills.length, label: 'Technologies', key: 'total' }, { value: skillsByLevel.expert, label: 'Expert Level', key: 'expert' }, { value: skillCategories.length, label: 'Domains', key: 'domains' }, { value: '12+', label: 'Years', key: 'years' }] as stat (stat.key)}
            <div class="summary__card summary__card--{stat.key}" role="listitem">
              <div class="summary__number">{stat.value}</div>
              <div class="summary__label">{stat.label}</div>
            </div>
          {/each}
        </div>

        <div class="skills__legend" role="list" aria-label="Skill level legend">
          {#each SKILL_LEVELS as level (level)}
            <div class="legend__item legend__item--{level}" role="listitem">
              <div class="legend__dot"></div>
              <span>{level}</span>
            </div>
          {/each}
        </div>
      </aside>
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/animations.scss' as *;
  @use 'styles/_breakpoints.scss' as *;

  :root {
    --skill-expert: var(--token-status-expert);
    --skill-advanced: var(--token-status-advanced);
    --skill-proficient: var(--token-status-proficient);
    --skill-learning: var(--token-status-learning);

    --glow-expert: var(--token-shadow-glow-medium);
    --glow-advanced: rgba(99, 102, 241, 0.15);
    --glow-proficient: rgba(245, 158, 11, 0.15);
    --glow-learning: rgba(6, 182, 212, 0.15);

    --glow-expert-strong: var(--token-shadow-glow-strong);
    --glow-advanced-strong: rgba(99, 102, 241, 0.3);
    --glow-proficient-strong: rgba(245, 158, 11, 0.3);
    --glow-learning-strong: rgba(6, 182, 212, 0.3);

    --animation-duration: 300ms;
    --animation-ease: cubic-bezier(0.4, 0, 0.2, 1);
  }

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
    padding: var(--token-space-fluid-5xl) 0;
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
  }

  .skills__content {
    position: relative;
    max-width: var(--token-container-7xl);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-md);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-xl);
      max-width: var(--token-container-max);
    }
  }

  .skills__container {
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) both;
  }

  .skills__header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.2s both;
  }

  .skills__title {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-md);
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

  .skills__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    font-weight: var(--token-font-weight-normal);
    line-height: var(--token-line-height-relaxed);
    max-width: var(--token-container-5xl);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .skills__filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-md);
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.4s both;
  }

  .filter__button {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    cursor: pointer;
    transition: all var(--animation-duration) var(--animation-ease);
    backdrop-filter: blur(var(--token-blur-lg));
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    box-shadow: var(--token-shadow-light);

    /* Performance optimization: isolate blend mode changes */
    isolation: isolate;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--animation-duration) var(--animation-ease);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover,
    &:focus {
      transform: translateY(-3px) scale(1.02);
      border-color: var(--token-border-color-default);
      color: var(--token-text-primary);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 1;
      }
    }

    &.is-active {
      background: var(--token-surface-glass-strong);
      border-color: var(--token-border-color-hover);
      color: var(--token-text-primary);
      box-shadow:
        var(--token-shadow-default),
        0 0 20px var(--token-shadow-glow-subtle);

      &::before {
        background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 50%);
        opacity: 1;
      }
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
      padding: var(--token-space-fluid-md) var(--token-space-fluid-xl);
    }
  }

  .filter__icon {
    font-size: var(--token-font-size-base);
    position: relative;
    z-index: 2;
  }

  .filter__count {
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-sm);
    padding: var(--token-space-1) var(--token-space-2);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    position: relative;
    z-index: 2;
    backdrop-filter: blur(var(--token-blur-sm));
  }

  .skills__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-xl);
    margin-bottom: var(--token-space-fluid-5xl);
    position: relative;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
      gap: var(--token-space-fluid-2xl) var(--token-space-fluid-3xl);
    }
  }

  .skill__card {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-xl);
    position: relative;
    cursor: pointer;
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-default);
    z-index: 1;

    /* Performance optimizations */
    isolation: isolate;
    will-change: transform;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--animation-duration) var(--animation-ease);
      border-radius: inherit;
      pointer-events: none;
      z-index: 1;
    }

    &:hover,
    &:focus {
      border-color: var(--token-border-color-default);
      box-shadow: var(--token-shadow-elevated);
      z-index: 10;

      /* Use transform instead of multiple property changes */
      transform: translateY(-2px);
      transition:
        transform var(--animation-duration) var(--animation-ease),
        border-color var(--animation-duration) var(--animation-ease),
        box-shadow var(--animation-duration) var(--animation-ease);

      &::before {
        opacity: 1;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-2xl);
      border-radius: var(--token-radius-xl);
    }
  }

  /* Optimized level-specific hover effects - reduce blur radius for performance */
  @each $level in expert, advanced, proficient, learning {
    .skill__card--#{$level}:hover,
    .skill__card--#{$level}:focus {
      border-color: var(--skill-#{$level});
      box-shadow:
        var(--token-shadow-elevated),
        0 0 var(--token-space-fluid-lg) var(--glow-#{$level}-strong);

      &::before {
        background: linear-gradient(135deg, var(--skill-#{$level}) 0%, transparent 50%);
        opacity: 0.1;
      }
    }
  }

  .skill__image {
    position: relative;
    width: var(--token-size-14);
    height: var(--token-size-14);
    margin: 0 auto var(--token-space-fluid-lg);
    border-radius: var(--token-radius-lg);
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--animation-duration) var(--animation-ease);
    box-shadow: var(--token-shadow-light);

    /* Performance: composite on own layer */
    will-change: transform;

    :global(img) {
      width: 3rem;
      height: 3rem;
      border-radius: var(--token-radius-sm);
      object-fit: contain;
      transition: transform var(--animation-duration) var(--animation-ease);
    }

    @media (min-width: $breakpoint-md) {
      width: 4rem;
      height: 4rem;
    }
  }

  .skill__card:hover .skill__image,
  .skill__card:focus .skill__image {
    transform: scale(1.05);
    box-shadow: var(--token-shadow-interactive);

    :global(img) {
      transform: scale(1.1);
    }
  }

  .skill__level-indicator {
    position: absolute;
    top: calc(-1 * var(--token-space-1));
    right: calc(-1 * var(--token-space-1));
    width: var(--token-size-4);
    height: var(--token-size-4);
    border-radius: var(--token-radius-full);
    border: var(--token-border-default-small);
    z-index: var(--token-z-raised);
    transition: transform var(--animation-duration) var(--animation-ease);
    will-change: transform;

    @media (min-width: $breakpoint-md) {
      width: var(--token-size-5);
      height: var(--token-size-5);
    }
  }

  /* Reduced glow intensity for better performance */
  @each $level in expert, advanced, proficient, learning {
    .skill__level-indicator--#{$level} {
      background: var(--skill-#{$level});
      box-shadow: 0 0 var(--token-space-2) var(--glow-#{$level}-strong);
    }
  }

  .skill__card:hover .skill__level-indicator,
  .skill__card:focus .skill__level-indicator {
    transform: scale(1.2);
  }

  .skill__content {
    text-align: center;
    position: relative;
    z-index: 2;
    transition: transform var(--animation-duration) var(--animation-ease);
  }

  .skill__name {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-sm);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .skill__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-sm);
    margin-bottom: var(--token-space-fluid-md);
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }

  .skill__level {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);
    background: var(--token-surface-glass-strong);
    color: var(--token-text-overlay);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));
    transition: all var(--animation-duration) var(--animation-ease);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    }
  }

  @each $level in expert, advanced, proficient, learning {
    .skill__level--#{$level} {
      color: var(--skill-#{$level});
      border-color: var(--skill-#{$level});
    }

    .skill__card:hover .skill__level--#{$level},
    .skill__card:focus .skill__level--#{$level} {
      background: var(--skill-#{$level});
      color: var(--token-text-dark);
      box-shadow: 0 0 var(--token-space-1) var(--glow-#{$level});
    }
  }

  .skill__years {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    }
  }

  .skill__description {
    font-size: var(--token-font-size-sm);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-overlay);
    opacity: 0;
    transform: translateY(var(--token-space-fluid-sm));
    transition: all var(--animation-duration) var(--animation-ease);
    margin-top: var(--token-space-fluid-sm);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .skill__card:hover .skill__description,
  .skill__card:focus .skill__description {
    opacity: 1;
    transform: translateY(0);
  }

  .skills__summary {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.6s both;
    position: relative;
    overflow: hidden;
    box-shadow: var(--token-shadow-default);
    isolation: isolate;

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
      border-radius: var(--token-radius-xl);
    }
  }

  .summary__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-sm);
    margin-bottom: var(--token-space-fluid-2xl);

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--token-space-fluid-md);
    }
  }

  .summary__card {
    padding: var(--token-space-fluid-md);
    text-align: center;
    background: var(--token-gradients-stat-default);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    transition: all var(--animation-duration) var(--animation-ease);
    position: relative;
    cursor: pointer;
    overflow: hidden;
    will-change: transform;

    &:hover {
      transform: translateY(-5px) scale(1.02);
      background: var(--token-gradients-stat-hover);
      border-color: var(--token-border-color-hover);
      box-shadow:
        var(--token-shadow-interactive),
        var(--token-shadow-default),
        0 0 20px var(--token-shadow-glow-subtle);

      .summary__number {
        transform: scale(1.1);
        color: var(--token-text-heading);
      }
    }

    &:nth-child(even) {
      background: var(--token-gradients-stat-alt);

      &:hover {
        background: var(--token-gradients-stat-alt_hover);
      }
    }
  }

  .summary__number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-1);
    color: var(--token-text-emphasis-heading);
    transition: all var(--animation-duration) var(--animation-ease);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
    }
  }

  .summary__label {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    transition: color var(--animation-duration) var(--animation-ease);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
    }
  }

  .summary__card:hover .summary__label {
    color: var(--token-text-secondary);
  }

  .skills__legend {
    display: flex;
    justify-content: center;
    gap: var(--token-space-fluid-xl);
    flex-wrap: wrap;
    padding-top: var(--token-space-fluid-xl);
    border-top: var(--token-border-default-small);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.8s both;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }
  }

  .legend__item {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    cursor: pointer;
    transition: all var(--animation-duration) var(--animation-ease);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);
    will-change: transform;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }

    &:hover {
      color: var(--token-text-primary);
      transform: translateY(-2px);

      .legend__dot {
        transform: scale(1.3);
      }
    }
  }

  .legend__dot {
    width: var(--token-space-3);
    height: var(--token-space-3);
    border-radius: var(--token-radius-full);
    flex-shrink: 0;
    transition: all var(--animation-duration) var(--animation-ease);
    will-change: transform;

    @media (min-width: $breakpoint-md) {
      width: var(--token-space-4);
      height: var(--token-space-4);
    }
  }

  @each $level in expert, advanced, proficient, learning {
    .legend__item--#{$level} .legend__dot {
      background: var(--skill-#{$level});
      box-shadow: 0 0 var(--token-space-2) var(--glow-#{$level}-strong);
    }
  }

  /* Responsive Design */
  @media (max-width: #{$breakpoint-md}) {
    .skills {
      padding: var(--token-space-fluid-4xl) 0;
    }

    .skill__description {
      opacity: var(--token-opacity-medium);
      transform: translateY(0);
    }

    .skill__card:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    .skills__filters {
      flex-direction: column;
      align-items: center;
    }

    .summary__grid {
      grid-template-columns: 1fr;
    }

    .skills__legend {
      flex-direction: column;
      align-items: center;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(var(--token-space-fluid-xl));
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

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .skill__description {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .skill__card,
    .filter__button,
    .summary__card {
      border-width: var(--token-size-2);
      border-color: currentColor;
    }
  }

  @media print {
    .skills {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .skills__filters {
      display: none;
    }

    .skill__card {
      border: var(--token-border-default-small);
      box-shadow: none;
      break-inside: avoid;
    }

    .skill__description {
      opacity: 1;
      transform: none;
    }
  }
</style>
