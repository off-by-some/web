<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';

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

  export let experiences: Experience[];
  export let title: string = 'Professional Experience';

  const dispatch = createEventDispatcher<{
    experienceSelect: { experience: Experience };
  }>();

  // State
  let timelineElement: HTMLElement;
  let progressElement: HTMLElement;
  let activeIndex = 0;
  let expandedItems = new Set<number>();
  let announcementText = '';
  let showFloatingNav = false;
  let isDesktop = false;

  $: progressValue = ((activeIndex + 1) / experiences.length) * 100;

  // Check if we're on desktop
  const checkDesktop = () => {
    isDesktop = window.innerWidth >= 1376; // $breakpoint-lg

    // Update floating nav visibility when switching views
    updateFloatingNavVisibility();
  };

  // Handle card click for desktop expansion
  const handleCardClick = (index: number, event: MouseEvent) => {
    // Only handle card clicks on desktop
    if (!isDesktop) return;

    // Don't expand if clicking on the expand button (let button handle it)
    if ((event.target as Element)?.closest('.expand-button')) return;

    toggleExpanded(index);
  };

  // Handle card keyboard events for desktop
  const handleCardKeydown = (index: number, event: KeyboardEvent) => {
    if (!isDesktop) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(index, event as any);
    }
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
    const wasExpanded = expandedItems.has(index);

    if (wasExpanded) {
      expandedItems.delete(index);
    } else {
      expandedItems.add(index);
    }
    expandedItems = expandedItems; // Trigger reactivity

    const action = wasExpanded ? 'Collapsed' : 'Expanded';
    announcementText = `${action} details for ${experience.title} at ${experience.company}`;

    dispatch('experienceSelect', { experience });
  };

  const updateProgress = () => {
    if (!progressElement) return;

    requestAnimationFrame(() => {
      progressElement.style.transform = `scaleY(${progressValue / 100})`;
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
    <header class="header">
      <h2 class="header__title" id="timeline-heading">{title}</h2>
      <p class="header__subtitle">
        Engineering exceptional products & empowering exceptional teams across {experiences.length} organizations.
      </p>
    </header>

    <!-- Timeline Content -->
    <div class="timeline-content">
      <!-- Progress Line -->
      <div class="timeline-line" aria-hidden="true">
        <div class="timeline-progress" bind:this={progressElement}></div>
      </div>

      <!-- Experience Items -->
      <div class="timeline-items" role="list" aria-label="Professional experience timeline">
        {#each experiences as experience, index (index)}
          <article
            class="timeline-item"
            class:timeline-item--active={activeIndex === index}
            class:timeline-item--expanded={expandedItems.has(index)}
            class:timeline-item--left={index % 2 === 0}
            class:timeline-item--right={index % 2 === 1}
            data-timeline-index={index}
            data-company={experience.company}
            role="listitem"
            style="animation-delay: {index * 0.1}s"
          >
            <!-- Timeline Marker -->
            <div class="timeline-marker" aria-hidden="true">
              <div class="timeline-dot"></div>
              <div class="timeline-date">{experience.dateValue}</div>
            </div>

            <!-- Experience Card -->
            <div
              class="experience-card"
              class:experience-card--clickable={isDesktop}
              on:click={isDesktop ? (event) => handleCardClick(index, event) : undefined}
              on:keydown={isDesktop ? (event) => handleCardKeydown(index, event) : undefined}
              role={isDesktop ? 'button' : undefined}
            >
              <header class="card-header">
                <div class="card-logo">
                  <Image src={experience.logo} alt="" sizes="56px" loading="lazy" />
                </div>

                <div class="card-meta">
                  <h3 class="card-title">{experience.title}</h3>
                  <div class="card-company">{experience.company}</div>
                  <div class="card-period">{experience.date} • {experience.location}</div>
                </div>

                <button
                  class="expand-button"
                  on:click={() => toggleExpanded(index)}
                  aria-expanded={expandedItems.has(index)}
                  aria-controls="experience-{index}-details"
                  aria-label="{expandedItems.has(index)
                    ? 'Hide'
                    : 'Show'} details for {experience.title}"
                >
                  <span class="expand-button__text">
                    {expandedItems.has(index) ? 'Less' : 'More'}
                  </span>
                  <svg
                    class="expand-button__icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </header>

              <div class="card-summary">{experience.summary}</div>

              <div
                class="card-details"
                class:card-details--expanded={expandedItems.has(index)}
                id="experience-{index}-details"
                aria-hidden={!expandedItems.has(index)}
              >
                <div class="highlights">
                  <h4 class="highlights__title">Key Achievements</h4>
                  <ul class="highlights__list">
                    {#each experience.highlights as highlight, highlightIndex (highlightIndex)}
                      <li class="highlights__item">{highlight}</li>
                    {/each}
                  </ul>
                </div>

                <div class="skills">
                  {#each experience.skills as skill, skillIndex (skillIndex)}
                    <span class="skill">{skill}</span>
                  {/each}
                </div>
              </div>
            </div>
          </article>
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
          on:click={() => setActiveExperience(Math.max(0, activeIndex - 1), true)}
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
          on:click={() =>
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

  .timeline__container {
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

  // Timeline content
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

  .timeline-item {
    position: relative;
    margin-bottom: var(--token-space-fluid-4xl);
    padding-left: var(--token-space-fluid-5xl);
    opacity: 0;
    transform: translateY(40px);
    animation: timelineItemFadeIn 0.8s var(--token-motion-ease-out) forwards;

    @media (min-width: $breakpoint-md) {
      padding-left: var(--token-space-fluid-6xl);
    }

    @media (min-width: $breakpoint-lg) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: var(--token-space-fluid-2xl);
      padding-left: 0;
      margin-bottom: var(--token-space-fluid-5xl);
    }

    @media (min-width: $breakpoint-lg) {
      &--left .experience-card {
        grid-column: 1;
        justify-self: end;
        margin-top: -5rem;
      }

      &--right .experience-card {
        margin-top: 2rem;
        grid-column: 3;
        justify-self: start;
      }
    }
  }

  // Timeline markers
  .timeline-marker {
    position: absolute;
    left: 0;
    top: var(--token-space-fluid-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      left: var(--token-space-fluid-sm);
    }

    @media (min-width: $breakpoint-lg) {
      grid-column: 2;
      position: relative;
      left: auto;
      top: var(--token-space-fluid-2xl);
    }
  }

  .timeline-dot {
    width: 1rem;
    height: 1rem;
    border-radius: var(--token-radius-full);
    background: var(--token-surface-glass-strong);
    border: 2px solid var(--token-border-color-default);
    transition: all 0.4s var(--token-motion-ease-out);
    opacity: 0.6;
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      width: 1.25rem;
      height: 1.25rem;
    }

    @media (min-width: $breakpoint-lg) {
      width: 1.5rem;
      height: 1.5rem;
    }

    .timeline-item--active & {
      background: var(--token-interactive-color);
      border-color: var(--token-interactive-color);
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0 20px var(--token-interactive-glow);
    }
  }

  .timeline-date {
    margin-top: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    white-space: nowrap;
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    border-radius: var(--token-radius-sm);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-lg));

    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  // Experience cards
  .experience-card {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-xl);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-default);
    position: relative;
    overflow: hidden;
    transition: all 0.4s var(--token-motion-ease-out);
    width: 100%;
    font-family: inherit;
    text-align: left;

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
      transform: translateY(-4px) scale(1.01);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.6;
      }
    }

    // Desktop clickable state
    &--clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-4px) scale(1.01);
        border-color: var(--token-border-color-hover);
        box-shadow: var(--token-shadow-elevated);

        &::before {
          opacity: 0.6;
        }
      }

      &:active {
        transform: translateY(-2px) scale(1.005);
        transition: transform 0.1s var(--token-motion-ease-out);
      }

      &:focus {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 2px;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-space-fluid-3xl);
    }

    .timeline-item--active & {
      border-color: var(--token-interactive-color);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 30px var(--token-interactive-glow);

      &::before {
        opacity: 0.4;
      }

      &:hover {
        box-shadow:
          var(--token-shadow-elevated),
          0 0 40px var(--token-interactive-glow);

        &::before {
          opacity: 0.8;
        }
      }
    }

    .timeline-item--expanded & {
      box-shadow:
        var(--token-shadow-elevated),
        0 0 25px var(--token-shadow-glow-subtle);
    }
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-lg);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-xl);
    }
  }

  .card-logo {
    width: 3.5rem;
    height: 3.5rem;
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s var(--token-motion-ease-out);

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(0.2);
    }

    &:hover {
      transform: scale(1.05);
    }

    @media (min-width: $breakpoint-md) {
      width: 4rem;
      height: 4rem;
    }
  }

  .card-meta {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .card-company {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-emphasis-default);
    margin-bottom: var(--token-space-fluid-xs);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .card-period {
    font-size: var(--token-font-size-sm);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-relaxed);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .expand-button {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    flex-shrink: 0;

    &:hover {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: translateY(-2px) scale(1.05);
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 15px var(--token-interactive-glow);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
    }

    .timeline-item--expanded & {
      .expand-button__icon {
        transform: rotate(180deg);
      }
    }

    @media (max-width: calc($breakpoint-sm - 1px)) {
      padding: var(--token-space-2);
      border-radius: var(--token-radius-full);
      min-width: 2.5rem;
      height: 2.5rem;
      justify-content: center;

      .expand-button__text {
        display: none;
      }
    }
  }

  .expand-button__icon {
    transition: transform 0.3s var(--token-motion-ease-out);
    flex-shrink: 0;
  }

  .card-summary {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin-bottom: var(--token-space-fluid-lg);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .card-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s var(--token-motion-ease-out);
    position: relative;
    z-index: 1;

    &--expanded {
      max-height: 100rem;
    }
  }

  .highlights {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity 0.3s var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover::before {
      opacity: 0.3;
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
    }
  }

  .highlights__title {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-md);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .highlights__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlights__item {
    position: relative;
    padding-left: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-sm);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    font-size: var(--token-font-size-sm);

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--token-text-emphasis-default);
      font-weight: var(--token-font-weight-semibold);
    }

    &:last-child {
      margin-bottom: 0;
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-sm);
  }

  .skill {
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    background: var(--token-tint-highlight);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-primary);
    white-space: nowrap;
    transition: all 0.3s var(--token-motion-ease-out);

    &:hover {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: translateY(-1px);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
    }
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

    .timeline-item {
      padding-left: 0;
      margin-bottom: var(--token-space-fluid-2xl);
    }

    .timeline-marker {
      display: none;
    }

    .experience-card {
      padding: var(--token-space-fluid-lg);
      border-left: 3px solid transparent;
      border-radius: var(--token-radius-lg) var(--token-radius-lg) var(--token-radius-lg)
        var(--token-radius-sm);
    }

    .timeline-item--active .experience-card {
      border-left-color: var(--token-interactive-color);
      box-shadow:
        var(--token-shadow-elevated),
        3px 0 20px var(--token-interactive-glow);
    }

    .card-header {
      gap: var(--token-space-fluid-md);
      margin-bottom: var(--token-space-fluid-md);
    }

    .card-logo {
      width: 3rem;
      height: 3rem;
    }

    .card-title {
      font-size: var(--token-font-size-lg);
      margin-bottom: var(--token-space-1);
    }

    .card-company {
      font-size: var(--token-font-size-base);
      margin-bottom: var(--token-space-1);
    }

    .card-period {
      font-size: var(--token-font-size-sm);
    }

    .card-summary {
      font-size: var(--token-font-size-base);
      margin-bottom: var(--token-space-fluid-md);
    }

    .expand-button {
      padding: var(--token-space-2);
      border-radius: var(--token-radius-full);
      min-width: 2.5rem;
      height: 2.5rem;
      justify-content: center;

      .expand-button__text {
        display: none;
      }
    }

    .highlights {
      padding: var(--token-space-fluid-md);
      margin-bottom: var(--token-space-fluid-md);
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

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
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
    .header,
    .timeline-content,
    .timeline-item {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .header__title {
      animation: none;
    }

    .timeline-dot,
    .experience-card,
    .expand-button,
    .skill {
      transition: none;
    }
  }

  @media (prefers-contrast: high) {
    .experience-card,
    .highlights {
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
    .timeline {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .floating-nav {
      display: none;
    }

    .experience-card {
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
    }

    .expand-button {
      display: none;
    }

    .card-details {
      max-height: none !important;
      overflow: visible !important;
    }

    .header__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
