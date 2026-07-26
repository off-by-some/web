<script lang="ts">
  import { onMount } from 'svelte';
  import Button from './components/primitives/actions/Button';
  import VisuallyHidden from './components/primitives/accessibility/VisuallyHidden';
  import Image from './components/primitives/media/Image/Image.svelte';
  import Section from './components/primitives/layout/Section';
  import IconTile from './components/primitives/surfaces/IconTile';
  import SectionHeader from './components/site/section-headings/SectionHeader';

  interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    relationship: string;
    date: string;
    avatar: string;
    companyLogo?: string;
    context: string;
    projectHighlight?: string;
    tags: string[];
  }

  type Props = {
    title?: string;
    subtitle?: string;
    testimonials: Testimonial[];
    linkedinUrl?: string;
    onTestimonialSelectionRequested?: (testimonial: Testimonial) => void;
    onTimelineNavigationRequested?: (payload: {
      testimonial: Testimonial;
      company: string;
    }) => void;
  };

  let {
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    testimonials,
    linkedinUrl,
    onTestimonialSelectionRequested,
    onTimelineNavigationRequested,
  }: Props = $props();

  // State
  let activeIndex = $state(0);
  let isTransitioning = $state(false);
  let sectionElement: HTMLElement | undefined = $state();
  let announcementText = $state('');
  let showFloatingNav = $state(false);
  let scrollFrame: number | undefined;

  // Reactive values
  const activeTestimonial = $derived(testimonials[activeIndex]);
  const progressValue = $derived(
    testimonials.length > 0 ? ((activeIndex + 1) / testimonials.length) * 100 : 0,
  );

  // Navigation
  const setActiveTestimonial = (index: number) => {
    if (index === activeIndex || isTransitioning || !testimonials[index]) return;

    isTransitioning = true;
    activeIndex = index;

    const testimonial = testimonials[index];
    announcementText = `Now viewing testimonial ${index + 1} of ${testimonials.length} from ${testimonial.author}, ${testimonial.role} at ${testimonial.company}`;

    onTestimonialSelectionRequested?.(testimonial);

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  };

  const requestTimelineNavigation = (companyName: string) => {
    const testimonial = testimonials.find((item) => item.company === companyName);
    if (!testimonial) return;

    onTimelineNavigationRequested?.({
      testimonial,
      company: companyName,
    });
  };

  // Keyboard navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (!sectionElement?.contains(event.target as Node)) return;

    const actions: Record<string, () => void> = {
      ArrowUp: () => setActiveTestimonial(Math.max(0, activeIndex - 1)),
      ArrowLeft: () => setActiveTestimonial(Math.max(0, activeIndex - 1)),
      ArrowDown: () => setActiveTestimonial(Math.min(testimonials.length - 1, activeIndex + 1)),
      ArrowRight: () => setActiveTestimonial(Math.min(testimonials.length - 1, activeIndex + 1)),
      Home: () => setActiveTestimonial(0),
      End: () => setActiveTestimonial(testimonials.length - 1),
    };

    if (actions[event.key]) {
      event.preventDefault();
      actions[event.key]();
    }
  };

  // Floating navigation visibility - only show on mobile
  const updateScrollLayout = () => {
    if (!sectionElement) return;

    const rect = sectionElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Show floating nav when section is in view and user has scrolled past the main nav
    const contentStart = rect.top + 400;
    const contentEnd = rect.bottom - viewportHeight * 0.75;

    showFloatingNav = contentStart < viewportHeight && contentEnd > 0;
  };

  const scheduleScrollLayout = () => {
    if (scrollFrame) return;

    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = undefined;
      updateScrollLayout();
    });
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', scheduleScrollLayout, { passive: true });

    // Initial scroll check
    requestAnimationFrame(scheduleScrollLayout);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', scheduleScrollLayout);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  });
</script>

<section
  class="testimonials"
  id="testimonials"
  aria-labelledby="testimonials-heading"
  bind:this={sectionElement}
>
  <!-- Screen reader announcements -->
  <VisuallyHidden as="div" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </VisuallyHidden>

  <Section className="testimonials__container">
    <!-- Header -->
    <div class="testimonials__header">
      <SectionHeader
        {title}
        {subtitle}
        titleId="testimonials-heading"
        contentClass="header__content"
      />
    </div>

    {#if activeTestimonial}
      <!-- Navigation -->
      <div class="navigation" role="tablist" aria-label="Navigate testimonials">
        {#each testimonials as testimonial, index (testimonial.id)}
          <button
            class="nav-item"
            class:nav-item--active={index === activeIndex}
            onclick={() => setActiveTestimonial(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls="testimonial-{testimonial.id}"
            aria-label="View testimonial from {testimonial.author}"
            disabled={isTransitioning}
          >
            <div class="nav-item__avatar">
              <Image src={testimonial.avatar} alt="" sizes="48px" loading="lazy" />
            </div>
            <div class="nav-item__content">
              <span class="nav-item__name">{testimonial.author}</span>
              <span class="nav-item__role">{testimonial.role}</span>
            </div>
          </button>
        {/each}
      </div>

      <!-- Progress indicator -->
      <div class="progress">
        <div class="progress__track">
          <div class="progress__fill" style="--testimonial-progress: {progressValue}%"></div>
        </div>
        <div class="progress__counter">
          {activeIndex + 1} / {testimonials.length}
        </div>
      </div>

      <!-- Main content -->
      <div class="content">
        <!-- Quote panel -->
        <div class="quote-panel">
          <div class="quote">
            <blockquote class="quote__text">
              "{activeTestimonial.quote}"
            </blockquote>

            <footer class="quote__attribution">
              <div class="attribution__avatar">
                <Image
                  src={activeTestimonial.avatar}
                  alt="Profile photo of {activeTestimonial.author}"
                  sizes="64px"
                  loading="lazy"
                />
              </div>

              <div class="attribution__content">
                <cite class="attribution__author">{activeTestimonial.author}</cite>
                <div class="attribution__role">{activeTestimonial.role}</div>
                <button
                  class="attribution__company"
                  onclick={() => requestTimelineNavigation(activeTestimonial.company)}
                  aria-label="Go to {activeTestimonial.company} experience in timeline"
                >
                  {activeTestimonial.company}
                </button>
                <div class="attribution__meta">
                  <span>{activeTestimonial.relationship}</span>
                  <span>•</span>
                  <time datetime={activeTestimonial.date}>{activeTestimonial.date}</time>
                  {#if linkedinUrl}
                    <span>•</span>
                    <!-- eslint-disable svelte/no-navigation-without-resolve -->
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="attribution__linkedin"
                    >
                      View on LinkedIn
                    </a>
                    <!-- eslint-enable svelte/no-navigation-without-resolve -->
                  {/if}
                </div>
              </div>

              {#if activeTestimonial.companyLogo}
                <IconTile
                  src={activeTestimonial.companyLogo}
                  alt="{activeTestimonial.company} logo"
                  sizes="48px"
                  className="attribution__logo"
                />
              {/if}
            </footer>
          </div>
        </div>

        <!-- Context panel -->
        <div class="context-panel">
          {#each testimonials as testimonial, index (testimonial.id)}
            <article
              class="context-card"
              class:context-card--active={index === activeIndex}
              class:context-card--prev={index < activeIndex}
              class:context-card--next={index > activeIndex}
              id="testimonial-{testimonial.id}"
              aria-labelledby="context-{testimonial.id}-title"
              aria-hidden={index !== activeIndex}
            >
              <header class="context-card__header">
                <div class="context-card__avatar">
                  <Image
                    src={testimonial.avatar}
                    alt="Profile photo of {testimonial.author}"
                    sizes="96px"
                    loading="lazy"
                  />
                  {#if testimonial.companyLogo}
                    <IconTile
                      src={testimonial.companyLogo}
                      alt="{testimonial.company} logo"
                      sizes="32px"
                      className="context-card__logo"
                    />
                  {/if}
                </div>

                <div class="context-card__info">
                  <h3 class="context-card__name" id="context-{testimonial.id}-title">
                    {testimonial.author}
                  </h3>
                  <div class="context-card__role">{testimonial.role}</div>
                  <button
                    class="context-card__company"
                    onclick={() => requestTimelineNavigation(testimonial.company)}
                  >
                    {testimonial.company}
                  </button>
                </div>
              </header>

              <div class="context-card__content">
                <div class="context-detail">
                  <span class="context-detail__label">Focus Area</span>
                  <span class="context-detail__value">{testimonial.context}</span>
                </div>

                {#if testimonial.projectHighlight}
                  <div class="context-detail">
                    <span class="context-detail__label">Key Project</span>
                    <span class="context-detail__value">{testimonial.projectHighlight}</span>
                  </div>
                {/if}

                <div class="tags">
                  {#each testimonial.tags as tag, tagIndex (tag)}
                    <span
                      class="tag"
                      class:tag--animated={index === activeIndex}
                      style="--testimonial-tag-delay: {tagIndex * 0.1}s"
                    >
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </div>

      <!-- Floating Navigation - Mobile Only -->
      <div
        class="floating-nav"
        class:floating-nav--visible={showFloatingNav}
        role="navigation"
        aria-label="Quick testimonial navigation"
      >
        <div class="floating-nav__content">
          <!-- Previous/Next arrows -->
          <Button
            variant="secondary"
            className="testimonial-floating-nav__arrow testimonial-floating-nav__arrow--prev"
            onclick={() => setActiveTestimonial(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0 || isTransitioning}
            aria-label="Previous testimonial"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>

          <!-- Mini navigation dots -->
          <div class="floating-nav__dots">
            {#each testimonials as testimonial, index (testimonial.id)}
              <button
                class="floating-nav__dot"
                class:floating-nav__dot--active={index === activeIndex}
                onclick={() => setActiveTestimonial(index)}
                disabled={isTransitioning}
                aria-label="Go to testimonial {index + 1}: {testimonial.author}"
              >
                <div class="floating-nav__dot-avatar">
                  <Image src={testimonial.avatar} alt="" sizes="24px" loading="lazy" />
                </div>
              </button>
            {/each}
          </div>

          <!-- Next arrow -->
          <Button
            variant="secondary"
            className="testimonial-floating-nav__arrow testimonial-floating-nav__arrow--next"
            onclick={() => setActiveTestimonial(Math.min(testimonials.length - 1, activeIndex + 1))}
            disabled={activeIndex === testimonials.length - 1 || isTransitioning}
            aria-label="Next testimonial"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>

          <!-- Progress indicator -->
          <div class="floating-nav__progress">
            <span class="floating-nav__counter">{activeIndex + 1}/{testimonials.length}</span>
          </div>
        </div>
      </div>
    {:else}
      <p class="empty-state">Testimonials will appear here once they are available.</p>
    {/if}
  </Section>
</section>

<style lang="scss">
  @use '../styles/breakpoints' as *;

  .testimonials {
    position: relative;
    background: var(--token-feature-contact-background);
    padding: var(--token-reference-spacing-fluid-4xl) 0;
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
      opacity: 0.6;
      pointer-events: none;
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-reference-spacing-fluid-5xl) 0;
    }
  }

  :global(.testimonials__container) {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 0 var(--token-reference-spacing-fluid-lg);
    max-inline-size: var(--token-reference-container-max);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-reference-spacing-fluid-2xl);
    }
  }

  .testimonials__header {
    margin-block-end: var(--token-reference-spacing-fluid-3xl);

    @media (min-width: $breakpoint-md) {
      margin-block-end: var(--token-reference-spacing-fluid-4xl);
    }
  }

  .navigation {
    display: flex;
    gap: var(--token-reference-spacing-fluid-sm);
    justify-content: center;
    flex-wrap: wrap;
    margin-block-end: var(--token-reference-spacing-fluid-2xl);
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-200) both;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-md);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-lg);
      margin-block-end: var(--token-reference-spacing-fluid-3xl);
    }

    // Hide on mobile when floating nav is shown
    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-sm);
    background: var(--token-theme-color-surface-glass-strong);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-xl);
    padding: var(--token-reference-spacing-fluid-md) var(--token-reference-spacing-fluid-lg);
    cursor: pointer;
    transition:
      background-color var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      border-color var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
    backdrop-filter: blur(var(--token-reference-blur-lg));
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
    }

    &:hover {
      transform: translateY(-6px) scale(1.03);
      border-color: var(--token-theme-color-border-hover);
      box-shadow: var(--token-theme-shadow-elevated);

      &::before {
        opacity: 0.8;
      }

      .nav-item__avatar {
        transform: scale(1.1);
      }
    }

    &--active {
      background: var(--token-theme-color-surface-glass-medium);
      border-color: var(--token-theme-color-interactive-color);
      transform: translateY(-4px) scale(1.05);
      box-shadow:
        var(--token-theme-shadow-focus),
        0 0 30px var(--token-theme-color-interactive-glow);

      &::before {
        background: linear-gradient(
          135deg,
          var(--token-theme-color-interactive-color) 0%,
          transparent 50%
        );
        opacity: 0.15;
      }

      .nav-item__avatar {
        border-color: var(--token-theme-color-interactive-color);
        box-shadow: 0 0 var(--token-reference-blur-md) var(--token-theme-color-interactive-glow);
      }

      .nav-item__name {
        color: var(--token-theme-color-text-primary);
      }
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.7;
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-md);
      padding: var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-xl);
    }
  }

  .nav-item__avatar {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;
    border: var(--token-reference-border-width-large) solid var(--token-theme-color-border-default);
    flex-shrink: 0;
    transition:
      border-color var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
    position: relative;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-lg) {
      inline-size: 3rem;
      block-size: 3rem;
    }
  }

  .nav-item__content {
    display: none;
    min-inline-size: 0;

    @media (min-width: $breakpoint-lg) {
      display: block;
    }
  }

  .nav-item__name {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-overlay);
    line-height: var(--token-reference-typography-line-height-snug);
    white-space: nowrap;
    transition: color var(--token-theme-motion-feedback-emphasis)
      var(--token-reference-motion-easing-standard);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .nav-item__role {
    font-size: var(--token-reference-typography-size-xs);
    color: var(--token-theme-color-text-tertiary);
    line-height: var(--token-reference-typography-line-height-snug);
    white-space: nowrap;

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }

  // Progress styles
  .progress {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-reference-spacing-fluid-lg);
    margin-block-end: var(--token-reference-spacing-fluid-3xl);
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-400) both;

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-xl);
      margin-block-end: var(--token-reference-spacing-fluid-4xl);
    }

    // Hide on mobile when floating nav is shown
    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .progress__track {
    inline-size: 16rem;
    block-size: 4px;
    background: var(--token-theme-color-surface-glass-strong);
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;
    position: relative;

    @media (min-width: $breakpoint-lg) {
      inline-size: 20rem;
      block-size: 5px;
    }

    @media (min-width: $breakpoint-xlg) {
      inline-size: 24rem;
      block-size: 6px;
    }
  }

  .progress__fill {
    inline-size: var(--testimonial-progress);
    block-size: 100%;
    background: linear-gradient(
      90deg,
      var(--token-theme-color-interactive-color),
      var(--token-theme-color-interactive-hover)
    );
    border-radius: inherit;
    transition: inline-size var(--token-theme-motion-feedback-slow)
      var(--token-reference-motion-easing-standard);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      inset-inline-end: -4px;
      inset-block-start: 50%;
      transform: translateY(-50%);
      inline-size: 8px;
      block-size: 8px;
      background: var(--token-theme-color-interactive-color);
      border-radius: var(--token-reference-radius-full);
      box-shadow: 0 0 var(--token-reference-blur-sm) var(--token-theme-color-interactive-glow);

      @media (min-width: $breakpoint-lg) {
        inset-inline-end: -5px;
        inline-size: 10px;
        block-size: 10px;
      }
    }
  }

  .progress__counter {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-brand);
  }

  // Content layout
  .content {
    display: grid;
    gap: var(--token-reference-spacing-fluid-3xl);
    animation: fadeInUp var(--token-theme-motion-enter-default)
      var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-600) both;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1.5fr 1fr;
      gap: var(--token-reference-spacing-fluid-5xl);
      align-items: start;
    }
  }

  // Quote panel
  .quote-panel {
    position: relative;

    @media (min-width: $breakpoint-lg) {
      position: sticky;
      inset-block-start: var(--token-reference-spacing-fluid-4xl);
    }
  }

  .quote {
    background: var(--token-theme-color-surface-glass-medium);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-2xl);
    padding: var(--token-reference-spacing-fluid-2xl);
    backdrop-filter: blur(var(--token-reference-blur-lg));
    box-shadow: var(--token-theme-shadow-elevated);
    position: relative;
    overflow: hidden;
    transition:
      box-shadow var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-surface-glass-iridescent);
      opacity: 0.4;
      border-radius: inherit;
      pointer-events: none;
      transition: opacity var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
    }

    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow:
        var(--token-theme-shadow-elevated),
        0 0 40px var(--token-theme-shadow-glow-subtle);

      &::before {
        opacity: 0.8;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-reference-spacing-fluid-4xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-reference-spacing-fluid-5xl);
    }
  }

  .quote__text {
    font-size: var(--token-reference-typography-size-lg);
    font-style: italic;
    line-height: var(--token-reference-typography-line-height-very-loose);
    color: var(--token-theme-color-text-primary);
    margin-block-end: var(--token-reference-spacing-fluid-2xl);
    position: relative;
    z-index: 1;
    white-space: pre-line;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-xl);
      margin-block-end: var(--token-reference-spacing-fluid-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-2xl);
    }
  }

  .quote__attribution {
    display: flex;
    align-items: flex-start;
    gap: var(--token-reference-spacing-fluid-lg);
    border-top: var(--token-theme-border-default-small);
    padding-block-start: var(--token-reference-spacing-fluid-xl);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-xl);
      padding-block-start: var(--token-reference-spacing-fluid-2xl);
    }
  }

  .attribution__avatar {
    inline-size: 4rem;
    block-size: 4rem;
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;
    border: var(--token-reference-border-width-accent) solid
      var(--token-theme-color-interactive-color);
    flex-shrink: 0;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-md) {
      inline-size: 4.5rem;
      block-size: 4.5rem;
    }

    @media (min-width: $breakpoint-lg) {
      inline-size: 5rem;
      block-size: 5rem;
    }
  }

  .attribution__content {
    flex: 1;
    min-inline-size: 0;
  }

  .attribution__author {
    font-size: var(--token-reference-typography-size-lg);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-primary);
    margin-block-end: var(--token-reference-spacing-fluid-sm);
    line-height: var(--token-reference-typography-line-height-snug);
    font-style: normal;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-2xl);
    }
  }

  .attribution__role {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-secondary);
    margin-block-end: var(--token-reference-spacing-fluid-sm);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-lg);
    }
  }

  .attribution__company {
    background: none;
    border: none;
    text-align: left;
    padding: var(--token-reference-spacing-fluid-xs) 0;
    font-size: var(--token-reference-typography-size-sm);
    color: var(--token-theme-color-text-brand);
    font-weight: var(--token-reference-typography-weight-semibold);
    cursor: pointer;
    transition:
      background-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    margin-block-end: var(--token-reference-spacing-fluid-md);
    min-block-size: 2.75rem;
    display: flex;
    align-items: center;
    border-radius: var(--token-reference-radius-sm);

    &:hover {
      color: var(--token-theme-color-interactive-hover);
      transform: translateX(2px);
    }

    &:focus {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-sm);
      background: var(--token-theme-color-surface-glass-subtle);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
      min-block-size: auto;
      padding: 0;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-lg);
    }
  }

  .attribution__meta {
    display: flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-sm);
    font-size: var(--token-reference-typography-size-sm);
    color: var(--token-theme-color-text-tertiary);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  // Same visual weight as its sibling spans in .attribution__meta — just
  // one more dot-separated fact about this recommendation, not its own CTA.
  .attribution__linkedin {
    color: var(--token-theme-color-text-tertiary);
    text-decoration: none;
    transition: color var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);

    &:hover {
      color: var(--token-theme-color-text-brand);
      text-decoration: underline;
    }

    &:focus-visible {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-sm);
      border-radius: var(--token-reference-radius-sm);
    }
  }

  :global(.attribution__logo) {
    --icon-tile-size: 2.5rem;
    --icon-tile-padding: var(--token-reference-spacing-2);
    --icon-tile-image-filter: grayscale(0.1);

    @media (min-width: $breakpoint-md) {
      --icon-tile-size: 3rem;
    }

    @media (min-width: $breakpoint-lg) {
      --icon-tile-size: 3.5rem;
    }
  }

  // Context panel — only visible from $breakpoint-lg up (hidden on mobile
  // below), so only the lg/xlg heights matter; both trimmed closer to what
  // the card's content actually needs instead of padding out to fill 100vh.
  .context-panel {
    position: relative;
    block-size: 34rem;
    perspective: 1000px;

    @media (min-width: $breakpoint-md) {
      block-size: 38rem;
    }

    @media (min-width: $breakpoint-lg) {
      block-size: 39rem;
    }

    @media (min-width: $breakpoint-xlg) {
      block-size: 43rem;
    }
  }

  .context-card {
    position: absolute;
    inset: 0;
    background: var(--token-theme-color-surface-glass-strong);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-xl);
    padding: var(--token-reference-spacing-fluid-xl);
    backdrop-filter: blur(var(--token-reference-blur-lg));
    box-shadow: var(--token-theme-shadow-default);
    transition:
      box-shadow var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard);
    opacity: 0;
    transform: translateX(100px) translateZ(-200px) rotateY(15deg) scale(0.8);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-theme-motion-feedback-slow)
        var(--token-reference-motion-easing-standard);
      border-radius: inherit;
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-background-color);
      opacity: 0;
      transition: opacity var(--token-theme-motion-feedback-slow)
        var(--token-reference-motion-easing-standard);
      border-radius: inherit;
      pointer-events: none;
      z-index: -1;
    }

    &--prev {
      opacity: 0;
      transform: translateX(-100px) translateZ(-300px) rotateY(-15deg) scale(0.7);
      pointer-events: none;
      filter: blur(2px);
      z-index: 1;

      &::after {
        opacity: 0.3;
      }
    }

    &--active {
      opacity: 1;
      transform: translateX(0) translateZ(0) rotateY(0deg) scale(1);
      border-color: var(--token-theme-color-border-hover);
      box-shadow:
        var(--token-theme-shadow-elevated),
        0 0 40px var(--token-theme-shadow-glow-subtle);
      z-index: 20;

      &::before {
        opacity: 0.6;
      }

      &::after {
        opacity: 0;
      }

      &:hover {
        transform: translateX(0) translateZ(0) rotateY(0deg) scale(1.02);
        box-shadow:
          var(--token-theme-shadow-elevated),
          0 0 60px var(--token-theme-shadow-glow-subtle);

        &::before {
          opacity: 1;
        }
      }

      .context-card__header,
      .context-card__content {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &--next {
      opacity: 0;
      transform: translateX(100px) translateZ(-300px) rotateY(15deg) scale(0.7);
      pointer-events: none;
      filter: blur(2px);
      z-index: 1;

      &::after {
        opacity: 0.3;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-reference-spacing-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-reference-spacing-fluid-3xl);
    }

    @media (min-width: $breakpoint-xlg) {
      padding: var(--token-reference-spacing-fluid-4xl);
    }
  }

  .context-card__header {
    display: flex;
    align-items: flex-start;
    gap: var(--token-reference-spacing-fluid-lg);
    margin-block-end: var(--token-reference-spacing-fluid-xl);
    opacity: 0.7;
    transform: translateY(20px);
    transition:
      opacity var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard);

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-xl);
      margin-block-end: var(--token-reference-spacing-fluid-2xl);
    }
  }

  .context-card__avatar {
    position: relative;
    inline-size: 4rem;
    block-size: 4rem;
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;
    border: var(--token-reference-border-width-accent) solid
      var(--token-theme-color-interactive-color);
    flex-shrink: 0;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-md) {
      inline-size: 5rem;
      block-size: 5rem;
    }

    @media (min-width: $breakpoint-lg) {
      inline-size: 6rem;
      block-size: 6rem;
    }

    @media (min-width: $breakpoint-xlg) {
      inline-size: 7rem;
      block-size: 7rem;
    }
  }

  :global(.context-card__logo) {
    --icon-tile-size: 1.5rem;
    --icon-tile-padding: var(--token-reference-spacing-1);
    --icon-tile-radius: var(--token-reference-radius-md);

    position: absolute;
    inset-block-end: -4px;
    inset-inline-end: -4px;

    @media (min-width: $breakpoint-md) {
      --icon-tile-size: 1.75rem;

      inset-block-end: -6px;
      inset-inline-end: -6px;
    }

    @media (min-width: $breakpoint-lg) {
      --icon-tile-size: 2rem;

      inset-block-end: -8px;
      inset-inline-end: -8px;
    }
  }

  .context-card__info {
    flex: 1;
    min-inline-size: 0;
  }

  .context-card__name {
    font-size: var(--token-reference-typography-size-base);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-primary);
    margin-block-end: var(--token-reference-spacing-fluid-xs);
    line-height: var(--token-reference-typography-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-lg);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-xl);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-reference-typography-size-2xl);
    }
  }

  .context-card__role {
    font-size: var(--token-reference-typography-size-xs);
    color: var(--token-theme-color-text-secondary);
    margin-block-end: var(--token-reference-spacing-fluid-xs);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-base);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-reference-typography-size-lg);
    }
  }

  .context-card__company {
    background: none;
    border: none;
    padding: 0;
    font-size: var(--token-reference-typography-size-xs);
    color: var(--token-theme-color-text-brand);
    font-weight: var(--token-reference-typography-weight-semibold);
    cursor: pointer;
    transition: color var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);

    &:hover {
      color: var(--token-theme-color-interactive-hover);
    }

    &:focus {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-sm);
      border-radius: var(--token-reference-radius-sm);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .context-card__content {
    opacity: 0.7;
    transform: translateY(20px);
    transition:
      opacity var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-200),
      transform var(--token-theme-motion-enter-narrative)
        var(--token-reference-motion-easing-standard) var(--token-reference-motion-delay-200);
  }

  .context-detail {
    display: none;
    margin-block-end: var(--token-reference-spacing-fluid-lg);
    padding: var(--token-reference-spacing-fluid-md);
    background: var(--token-theme-color-surface-glass-medium);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-md);

    @media (min-width: 768px) {
      display: block;
    }

    @media (min-width: $breakpoint-lg) {
      margin-block-end: var(--token-reference-spacing-fluid-xl);
      padding: var(--token-reference-spacing-fluid-lg);
    }
  }

  .context-detail__label {
    display: block;
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-reference-typography-letter-spacing-widest);
    margin-block-end: var(--token-reference-spacing-fluid-xs);
  }

  .context-detail__value {
    font-size: var(--token-reference-typography-size-sm);
    color: var(--token-theme-color-text-secondary);
    font-weight: var(--token-reference-typography-weight-medium);
    line-height: var(--token-reference-typography-line-height-relaxed);

    @media (min-width: 768px) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-fluid-sm);

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-reference-spacing-fluid-md);
    }
  }

  .tag {
    padding: var(--token-reference-spacing-fluid-sm) var(--token-reference-spacing-fluid-md);
    background: var(--token-theme-color-tint-highlight);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-md);
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-primary);
    white-space: nowrap;
    transition:
      background-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    opacity: 0;
    transform: translateY(10px);

    &:hover {
      background: var(--token-theme-color-interactive-color);
      color: var(--token-theme-color-text-dark);
      transform: translateY(-2px);
    }

    &--animated {
      animation: tagFadeIn var(--token-theme-motion-feedback-slow)
        var(--token-reference-motion-easing-standard) forwards;
      animation-delay: var(--testimonial-tag-delay);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-sm);
      padding: var(--token-reference-spacing-fluid-md) var(--token-reference-spacing-fluid-lg);
    }
  }

  // Enhanced Floating Navigation - Sticky Footer
  .floating-nav {
    position: fixed;
    inset-block-end: 0;
    inset-inline: 0;
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-emphasis)
        var(--token-reference-motion-easing-standard);
    z-index: 50;
    background: var(--token-theme-color-surface-glass-near-opaque);
    backdrop-filter: blur(var(--token-reference-blur-xl));
    border-top: var(--token-theme-border-default-small);
    padding: var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-md);
    padding-block-end: calc(var(--token-reference-spacing-fluid-lg) + env(safe-area-inset-bottom));

    &--visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    // Show only on mobile
    @media (min-width: $breakpoint-lg) {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-theme-color-surface-glass-iridescent);
      opacity: 0.3;
      pointer-events: none;
    }
  }

  .floating-nav__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-reference-spacing-fluid-xl);
    max-inline-size: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-2xl);
      max-inline-size: 28rem;
    }
  }

  :global(.testimonial-floating-nav__arrow) {
    --button-width: 3.5rem;
    --button-min-height: 3.5rem;
    --button-padding: 0;
    --button-padding-md: 0;
    --button-radius: var(--token-reference-radius-xl);
    --button-secondary-background: var(--token-theme-color-surface-color);
    --button-secondary-color: var(--token-theme-color-text-primary);
    --button-secondary-shadow: var(--token-theme-shadow-default);
    --button-secondary-hover-transform: scale(1.1);
    --button-secondary-hover-shadow: 0 0 25px var(--token-theme-color-interactive-glow);

    z-index: 1;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      --button-secondary-background: var(--token-theme-color-interactive-color);
      --button-secondary-color: var(--token-theme-color-text-dark);
    }

    &:disabled {
      opacity: 0.4;
    }

    svg {
      inline-size: 22px;
      block-size: 22px;
    }
  }

  .floating-nav__dots {
    display: flex;
    align-items: center;
    gap: var(--token-reference-spacing-fluid-md);
    padding: var(--token-reference-spacing-fluid-sm);
    background: var(--token-theme-color-surface-glass-medium);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-2xl);
    backdrop-filter: blur(var(--token-reference-blur-md));

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-lg);
      padding: var(--token-reference-spacing-fluid-md);
    }
  }

  .floating-nav__dot {
    inline-size: 2.75rem;
    block-size: 2.75rem;
    border-radius: var(--token-reference-radius-full);
    border: var(--token-reference-border-width-large) solid var(--token-theme-color-border-neutral);
    background: var(--token-theme-color-surface-color);
    cursor: pointer;
    transition:
      border-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
    padding: 2px;
    position: relative;
    z-index: 1;
    box-shadow: var(--token-theme-shadow-default);

    &:hover {
      transform: scale(1.1);
      border-color: var(--token-theme-color-interactive-color);
      box-shadow: 0 0 var(--token-reference-blur-sm) var(--token-theme-color-interactive-glow);
    }

    &--active {
      border-color: var(--token-theme-color-interactive-color);
      box-shadow: 0 0 calc(var(--token-reference-blur-md) + var(--token-reference-spacing-1))
        var(--token-theme-color-interactive-glow);
      transform: scale(1.2);
      background: var(--token-theme-color-surface-color);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:focus {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-md);
    }

    @media (min-width: $breakpoint-md) {
      inline-size: 3rem;
      block-size: 3rem;
    }
  }

  .floating-nav__dot-avatar {
    inline-size: 100%;
    block-size: 100%;
    border-radius: var(--token-reference-radius-full);
    overflow: hidden;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }
  }

  .floating-nav__progress {
    display: flex;
    align-items: center;
    justify-content: center;
    min-inline-size: 3rem;
    block-size: 2.5rem;
    background: var(--token-theme-color-surface-glass-medium);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-lg);
    backdrop-filter: blur(var(--token-reference-blur-md));
    position: relative;
    z-index: 1;
  }

  .floating-nav__counter {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-brand);
    white-space: nowrap;
    padding: 0 var(--token-reference-spacing-fluid-sm);
    text-shadow: var(--token-theme-shadow-text-subtle);
  }

  // Mobile responsive adjustments
  @media (max-width: calc($breakpoint-lg - 1px)) {
    .content {
      grid-template-columns: 1fr;
      gap: var(--token-reference-spacing-fluid-2xl);
    }

    .quote-panel {
      order: 2;
    }

    .context-panel {
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

  @keyframes tagFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // Accessibility & Motion Preferences
  @media (prefers-reduced-motion: reduce) {
    .navigation,
    .progress,
    .content {
      animation: none;
      opacity: 1;
      transform: none;
    }
    .context-card,
    .nav-item,
    .tag {
      transition: none;
      animation: none;
    }

    .context-card {
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .quote,
    .context-card,
    .nav-item {
      border-width: var(--token-reference-border-width-large);
      border-color: currentColor;
    }
  }

  @media print {
    .testimonials {
      background: Canvas;
      color: CanvasText;
      padding: var(--token-reference-spacing-fluid-lg);
    }

    .navigation,
    .progress,
    .floating-nav {
      display: none;
    }

    .content {
      grid-template-columns: 1fr;
      gap: var(--token-reference-spacing-fluid-lg);
    }

    .context-card {
      position: relative;
      opacity: 1;
      transform: none;
      border: var(--token-theme-border-default-small);
      background: Canvas;
      break-inside: avoid;
    }
  }
</style>
