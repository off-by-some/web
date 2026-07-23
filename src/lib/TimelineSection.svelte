<script lang="ts">
  import { onMount } from 'svelte';
  import Section from './components/primitives/layout/Section';
  import ExperienceCard from './components/site/timeline/ExperienceCard';
  import SectionHeader from './components/site/section-headings/SectionHeader';

  interface Experience {
    title: string;
    company: string;
    logo: string;
    date: string;
    dateValue: string;
    location: string;
    summary: string;
    highlights: string[];
    skills: string[];
  }

  type Props = {
    experiences: Experience[];
    title?: string;
    subtitle?: string;
    onExperienceSelect?: (experience: Experience) => void;
  };

  let {
    experiences,
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    onExperienceSelect,
  }: Props = $props();

  // State
  let timelineElement: HTMLElement | undefined = $state();
  let progressElement: HTMLElement | undefined = $state();
  let activeIndex = $state(0);
  let expandedItems = $state(new Set<number>());
  let announcementText = $state('');
  let showFloatingNav = $state(false);
  let isDesktop = $state(false);

  const progressValue = $derived(((activeIndex + 1) / experiences.length) * 100);

  // Check if we're on desktop
  const checkDesktop = () => {
    isDesktop = window.innerWidth >= 1376; // $breakpoint-lg

    // Update floating nav visibility when switching views
    updateFloatingNavVisibility();
  };

  // Navigation
  const setActiveExperience = (index: number, shouldScroll: boolean = true) => {
    if (index === activeIndex || index < 0 || index >= experiences.length) return;

    activeIndex = index;
    updateProgress();

    const experience = experiences[index];
    announcementText = `Focused on ${experience.title} at ${experience.company}, ${experience.date}`;

    if (shouldScroll) {
      const item = timelineElement?.querySelector(`[data-timeline-index="${index}"]`);
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const toggleExpanded = (index: number) => {
    const experience = experiences[index];
    const nextExpandedItems = new Set(expandedItems);
    const wasExpanded = nextExpandedItems.has(index);

    if (wasExpanded) {
      nextExpandedItems.delete(index);
    } else {
      nextExpandedItems.add(index);
    }
    expandedItems = nextExpandedItems;

    const action = wasExpanded ? 'Collapsed' : 'Expanded';
    announcementText = `${action} details for ${experience.title} at ${experience.company}`;

    onExperienceSelect?.(experience);
  };

  const updateProgress = () => {
    if (!progressElement) return;

    requestAnimationFrame(() => {
      if (progressElement) progressElement.style.transform = `scaleY(${progressValue / 100})`;
    });
  };

  // Handle floating navigation visibility
  const updateFloatingNavVisibility = () => {
    if (!timelineElement) return;

    const rect = timelineElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Show floating nav when section is in view
    const contentStart = rect.top + 200;
    const contentEnd = rect.bottom - viewportHeight * 0.65;
    showFloatingNav = contentStart < viewportHeight && contentEnd > 0;
  };

  // Scroll detection for active item (works on both desktop and mobile)
  const handleScroll = () => {
    // Only handle scroll-based active item detection if timeline element exists
    if (!timelineElement) return;

    updateFloatingNavVisibility();

    const items = timelineElement.querySelectorAll('[data-timeline-index]');
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (activeIndex !== closestIndex) {
      activeIndex = closestIndex;
      updateProgress();
    }
  };

  // Keyboard navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (!timelineElement?.contains(event.target as Node)) return;

    const actions: Record<string, () => void> = {
      ArrowUp: () => setActiveExperience(Math.max(0, activeIndex - 1), true),
      ArrowDown: () => setActiveExperience(Math.min(experiences.length - 1, activeIndex + 1), true),
      Home: () => setActiveExperience(0, true),
      End: () => setActiveExperience(experiences.length - 1, true),
    };

    if (actions[event.key]) {
      event.preventDefault();
      actions[event.key]();
    }
  };

  onMount(() => {
    // Initialize progress
    updateProgress();

    // Event listeners
    const scrollOptions = { passive: true };

    // Add scroll listener for both desktop and mobile
    window.addEventListener('scroll', handleScroll, scrollOptions);

    // Update floating nav visibility on mount
    updateFloatingNavVisibility();

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', checkDesktop);

    checkDesktop(); // Set initial desktop state

    // Initial scroll check to set active index
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', checkDesktop);
    };
  });
</script>

<section
  class="timeline"
  id="experience"
  aria-labelledby="timeline-heading"
  bind:this={timelineElement}
>
  <!-- Screen reader announcements -->
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="timeline__container">
    <!-- Header -->
    <SectionHeader {title} {subtitle} titleId="timeline-heading" />

    <!-- Timeline Content -->
    <div class="timeline-content">
      <!-- Progress Line -->
      <div class="timeline-line" aria-hidden="true">
        <div class="timeline-progress" bind:this={progressElement}></div>
      </div>

      <!-- Experience Items -->
      <div class="timeline-items" aria-label="Professional experience timeline">
        {#each experiences as experience, index (index)}
          <ExperienceCard
            {experience}
            {index}
            active={activeIndex === index}
            expanded={expandedItems.has(index)}
            clickable={isDesktop}
            onSelect={() => toggleExpanded(index)}
            onToggle={() => toggleExpanded(index)}
          />
        {/each}
      </div>
    </div>

    <!-- Floating Mobile Navigation -->
    <div
      class="floating-nav"
      class:floating-nav--visible={showFloatingNav}
      aria-label="Timeline navigation"
    >
      <div class="floating-nav__content">
        <button
          class="floating-nav__button floating-nav__button--prev"
          onclick={() => setActiveExperience(Math.max(0, activeIndex - 1), true)}
          disabled={activeIndex === 0}
          aria-label="Previous experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 15L12 9L6 15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="floating-nav__progress">
          <div class="floating-nav__track">
            <div class="floating-nav__fill" style="height: {progressValue}%"></div>
          </div>
          <span class="floating-nav__counter">{activeIndex + 1}/{experiences.length}</span>
        </div>

        <button
          class="floating-nav__button floating-nav__button--next"
          onclick={() =>
            setActiveExperience(Math.min(experiences.length - 1, activeIndex + 1), true)}
          disabled={activeIndex === experiences.length - 1}
          aria-label="Next experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
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

  .timeline {
    position: relative;
    background: var(--token-gradients-timeline);
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
      opacity: 0.4;
      pointer-events: none;
    }
  }

  :global(.timeline__container) {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-2xl);
    }
  }

  .timeline-content {
    position: relative;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.3s both;
  }

  .timeline-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    left: var(--token-space-fluid-2xl);
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-full);
    opacity: 0.3;

    @media (min-width: $breakpoint-md) {
      left: var(--token-space-fluid-3xl);
      width: 3px;
    }

    @media (min-width: $breakpoint-lg) {
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
    }
  }

  .timeline-progress {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--token-interactive-color) 10%,
      var(--token-interactive-color) 90%,
      transparent 100%
    );
    border-radius: inherit;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.6s var(--token-motion-ease-out);
    box-shadow: 0 0 12px var(--token-interactive-glow);
  }

  .timeline-items {
    position: relative;
  }

  // Floating navigation
  .floating-nav {
    position: fixed;
    bottom: var(--token-space-fluid-2xl);
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s var(--token-motion-ease-out);
    z-index: 50;

    &--visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: all;
    }

    @media (min-width: $breakpoint-lg) {
      display: none;
    }
  }

  .floating-nav__content {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-md);
    background: var(--token-surface-glass-stronger);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-md);
    backdrop-filter: blur(var(--token-blur-xl));
    box-shadow:
      var(--token-shadow-elevated),
      0 0 40px var(--token-shadow-glow-subtle);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0.3;
      border-radius: inherit;
      pointer-events: none;
    }
  }

  .floating-nav__button {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    color: var(--token-text-secondary);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;

    &:hover:not(:disabled) {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: scale(1.1);
      border-color: var(--token-interactive-color);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .floating-nav__progress {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-md);
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .floating-nav__track {
    width: 4px;
    height: 3rem;
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-full);
    overflow: hidden;
    position: relative;
  }

  .floating-nav__fill {
    width: 100%;
    background: linear-gradient(
      to top,
      var(--token-interactive-color),
      var(--token-interactive-hover)
    );
    border-radius: inherit;
    transition: height 0.6s var(--token-motion-ease-out);
    transform-origin: bottom;
  }

  .floating-nav__counter {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-brand);
    white-space: nowrap;
  }

  // Mobile responsive adjustments for smallest screens
  @media (max-width: calc($breakpoint-sm - 1px)) {
    .timeline {
      padding: var(--token-space-fluid-4xl) 0;
    }

    .timeline-line {
      display: none;
    }
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

  @keyframes timelineItemFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Accessibility & Motion Preferences
  @media (prefers-reduced-motion: reduce) {
    .timeline-content {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media print {
    .timeline {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .floating-nav {
      display: none;
    }
  }
</style>
