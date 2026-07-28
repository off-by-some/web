<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './components/primitives/actions/Button';
  import VisuallyHidden from './components/primitives/accessibility/VisuallyHidden';
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
    experiences?: Experience[];
    title?: string;
    subtitle?: string;
    initialActiveIndex?: number;
    initialExpandedItems?: number[];
    onExperienceDetailsToggleRequested?: (experience: Experience) => void;
  };

  let {
    experiences = [],
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    initialActiveIndex = 0,
    initialExpandedItems = [],
    onExperienceDetailsToggleRequested,
  }: Props = $props();

  // State
  let timelineElement: HTMLElement | undefined = $state();
  let progressElement: HTMLElement | undefined = $state();
  const createInitialActiveIndex = () => initialActiveIndex;
  const createInitialExpandedItems = () => new Set(initialExpandedItems);

  let activeIndex = $state(createInitialActiveIndex());
  let expandedItems = $state(createInitialExpandedItems());
  let announcementText = $state('');
  let showFloatingNav = $state(false);
  let isDesktop = $state(false);
  let scrollTrackingEnabled = false;
  let scrollFrame: number | undefined;
  let progressFrame: number | undefined;

  const progressValue = $derived(
    experiences.length > 0 ? ((activeIndex + 1) / experiences.length) * 100 : 0,
  );

  // Check if we're on desktop
  const checkDesktop = () => {
    isDesktop = window.innerWidth >= 1376; // $breakpoint-lg

    // Update floating nav visibility when switching views
    if (scrollTrackingEnabled) scheduleScrollLayout();
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
    if (!experience) return;

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

    onExperienceDetailsToggleRequested?.(experience);
  };

  const updateProgress = () => {
    if (!progressElement) return;

    if (progressFrame) cancelAnimationFrame(progressFrame);
    progressFrame = requestAnimationFrame(() => {
      if (progressElement) progressElement.style.transform = `scaleY(${progressValue / 100})`;
      progressFrame = undefined;
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
  const updateScrollLayout = () => {
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

  const scheduleScrollLayout = () => {
    if (scrollFrame) return;

    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = undefined;
      updateScrollLayout();
    });
  };

  const getExperienceDelay = (index: number) => `${index * 0.1}s`;

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
    let timelineObserver: IntersectionObserver | undefined;

    const enableScrollTracking = () => {
      if (scrollTrackingEnabled) return;
      scrollTrackingEnabled = true;
      window.addEventListener('scroll', scheduleScrollLayout, scrollOptions);
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', checkDesktop);

    checkDesktop(); // Set initial desktop state

    if (timelineElement && 'IntersectionObserver' in window) {
      timelineObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          enableScrollTracking();
          timelineObserver?.disconnect();
        },
        { rootMargin: '0px' },
      );
      timelineObserver.observe(timelineElement);
    } else {
      enableScrollTracking();
    }

    return () => {
      if (scrollTrackingEnabled) window.removeEventListener('scroll', scheduleScrollLayout);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', checkDesktop);
      timelineObserver?.disconnect();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (progressFrame) cancelAnimationFrame(progressFrame);
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
  <VisuallyHidden as="div" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </VisuallyHidden>

  <Section className="timeline__container">
    <!-- Header -->
    <div class="timeline__header">
      <SectionHeader {title} {subtitle} titleId="timeline-heading" />
    </div>

    <!-- Timeline Content -->
    <div class="timeline-content">
      <!-- Progress Line -->
      <div class="timeline-line" aria-hidden="true">
        <div class="timeline-progress" bind:this={progressElement}></div>
      </div>

      <!-- Experience Items -->
      <div class="timeline-items" aria-label="Professional experience timeline">
        {#each experiences as experience, index (`${experience.company}-${experience.dateValue}`)}
          <ExperienceCard
            {experience}
            {index}
            delay={getExperienceDelay(index)}
            active={activeIndex === index}
            expanded={expandedItems.has(index)}
            detailsClickable={isDesktop}
            onDetailsToggleRequested={() => toggleExpanded(index)}
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
        <Button
          variant="secondary"
          className="timeline-floating-nav__button timeline-floating-nav__button--prev"
          onclick={() => setActiveExperience(Math.max(0, activeIndex - 1), true)}
          disabled={activeIndex === 0}
          aria-label="Previous experience"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M18 15L12 9L6 15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>

        <div class="floating-nav__progress">
          <div class="floating-nav__track">
            <div class="floating-nav__fill" style="--timeline-progress: {progressValue}%"></div>
          </div>
          <span class="floating-nav__counter">{activeIndex + 1}/{experiences.length}</span>
        </div>

        <Button
          variant="secondary"
          className="timeline-floating-nav__button timeline-floating-nav__button--next"
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
        </Button>
      </div>
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/_breakpoints' as *;

  .timeline {
    position: relative;
    background: var(--token-feature-timeline-background);
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
      opacity: 0.4;
      pointer-events: none;
    }
  }

  :global(.timeline__container) {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 0 var(--token-reference-spacing-fluid-lg);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-reference-spacing-fluid-2xl);
    }
  }

  .timeline__header {
    margin-block-end: var(--token-reference-spacing-fluid-5xl);
  }

  .timeline-content {
    position: relative;
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-300) both;
  }

  .timeline-line {
    position: absolute;
    inset-block-start: 0;
    inset-block-end: 0;
    inline-size: 2px;
    inset-inline-start: var(--token-reference-spacing-fluid-2xl);
    background: var(--token-theme-color-surface-glass-strong);
    border-radius: var(--token-reference-radius-full);
    opacity: 0.3;

    @media (min-width: $breakpoint-md) {
      inset-inline-start: var(--token-reference-spacing-fluid-3xl);
      inline-size: 3px;
    }

    @media (min-width: $breakpoint-lg) {
      inset-inline-start: 50%;
      transform: translateX(-50%);
      inline-size: 4px;
    }
  }

  .timeline-progress {
    inline-size: 100%;
    block-size: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--token-theme-color-interactive-color) 10%,
      var(--token-theme-color-interactive-color) 90%,
      transparent 100%
    );
    border-radius: inherit;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform var(--token-theme-motion-feedback-slow)
      var(--token-reference-motion-easing-standard);
    box-shadow: 0 0 var(--token-reference-blur-sm) var(--token-theme-color-interactive-glow);
  }

  .timeline-items {
    position: relative;
  }

  // Floating navigation
  .floating-nav {
    position: fixed;
    inset-block-end: var(--token-reference-spacing-fluid-2xl);
    inset-inline-start: 50%;
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
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
    gap: var(--token-reference-spacing-fluid-md);
    background: var(--token-theme-color-surface-glass-near-opaque);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-xl);
    padding: var(--token-reference-spacing-fluid-md);
    backdrop-filter: blur(var(--token-reference-blur-xl));
    box-shadow:
      var(--token-theme-shadow-elevated),
      0 0 40px var(--token-theme-shadow-glow-subtle);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-surface-glass-iridescent);
      opacity: 0.3;
      border-radius: inherit;
      pointer-events: none;
    }
  }

  :global(.timeline-floating-nav__button) {
    --button-width: 2.5rem;
    --button-min-height: 2.5rem;
    --button-padding: 0;
    --button-padding-md: 0;
    --button-radius: var(--token-reference-radius-lg);
    --button-secondary-background: var(--token-theme-color-surface-glass-medium);
    --button-secondary-color: var(--token-theme-color-text-secondary);
    --button-secondary-hover-transform: scale(1.1);
    --button-secondary-hover-shadow: none;

    flex-shrink: 0;
    z-index: 1;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      --button-secondary-background: var(--token-theme-color-interactive-color);
      --button-secondary-color: var(--token-theme-color-text-dark);
    }

    &:disabled {
      opacity: 0.4;
    }
  }

  .floating-nav__progress {
    display: flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-md);
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .floating-nav__track {
    inline-size: 4px;
    block-size: 3rem;
    background: var(--token-theme-color-surface-glass-strong);
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;
    position: relative;
  }

  .floating-nav__fill {
    inline-size: 100%;
    block-size: var(--timeline-progress);
    background: linear-gradient(
      to top,
      var(--token-theme-color-interactive-color),
      var(--token-theme-color-interactive-hover)
    );
    border-radius: inherit;
    transition: block-size var(--token-theme-motion-feedback-slow)
      var(--token-reference-motion-easing-standard);
    transform-origin: bottom;
  }

  .floating-nav__counter {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-brand);
    white-space: nowrap;
  }

  // Mobile responsive adjustments for smallest screens
  @media (max-width: calc($breakpoint-sm - 1px)) {
    .timeline {
      padding: var(--token-reference-spacing-fluid-4xl) 0;
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
      background: Canvas;
      color: CanvasText;
      padding: var(--token-reference-spacing-fluid-lg);
    }

    .floating-nav {
      display: none;
    }
  }
</style>
