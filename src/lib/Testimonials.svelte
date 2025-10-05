<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';

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

  export let title: string = 'Going Above & Beyond';
  export let subtitle: string =
    "Perspectives from colleagues, designers, and leaders I've collaborated with across different teams and projects.";

  export let testimonials: Testimonial[];

  const dispatch = createEventDispatcher<{
    testimonialView: { testimonial: Testimonial };
    testimonialInteraction: { testimonial: Testimonial; action: string; company?: string };
  }>();

  // State
  let activeIndex = 0;
  let isTransitioning = false;
  let sectionElement: HTMLElement;
  let progressValue = 0;
  let announcementText = '';
  let showFloatingNav = false;

  // Reactive values
  $: activeTestimonial = testimonials[activeIndex];
  $: progressValue = ((activeIndex + 1) / testimonials.length) * 100;

  // Navigation
  const setActiveTestimonial = (index: number) => {
    if (index === activeIndex || isTransitioning || !testimonials[index]) return;

    isTransitioning = true;
    activeIndex = index;

    const testimonial = testimonials[index];
    announcementText = `Now viewing testimonial ${index + 1} of ${testimonials.length} from ${testimonial.author}, ${testimonial.role} at ${testimonial.company}`;

    dispatch('testimonialView', { testimonial });

    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  };

  const navigateToTimeline = (companyName: string) => {
    const timelineSection = document.getElementById('experience');
    if (timelineSection) {
      const companyItems = document.querySelectorAll('[data-company]');
      const targetItem = Array.from(companyItems).find(
        (item) => item.getAttribute('data-company')?.toLowerCase() === companyName.toLowerCase(),
      );

      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      dispatch('testimonialInteraction', {
        testimonial: testimonials.find((t) => t.company === companyName) || testimonials[0],
        action: 'navigate-to-timeline',
        company: companyName,
      });
    }
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
  const handleScroll = () => {
    if (!sectionElement) return;

    const rect = sectionElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Show floating nav when section is in view and user has scrolled past the main nav
    const contentStart = rect.top + 400;
    const contentEnd = rect.bottom - viewportHeight * 0.75;

    showFloatingNav = contentStart < viewportHeight && contentEnd > 0;
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial scroll check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('scroll', handleScroll);
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
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="testimonials__container">
    <!-- Header -->
    <header class="header">
      <div class="header__content">
        <h2 class="header__title" id="testimonials-heading">{title}</h2>
        <p class="header__subtitle">{subtitle}</p>
      </div>
    </header>

    <!-- Navigation -->
    <div class="navigation" role="tablist" aria-label="Navigate testimonials">
      {#each testimonials as testimonial, index (testimonial.id)}
        <button
          class="nav-item"
          class:nav-item--active={index === activeIndex}
          on:click={() => setActiveTestimonial(index)}
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
        <div class="progress__fill" style="width: {progressValue}%"></div>
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
                on:click={() => navigateToTimeline(activeTestimonial.company)}
                aria-label="Go to {activeTestimonial.company} experience in timeline"
              >
                {activeTestimonial.company}
              </button>
              <div class="attribution__meta">
                <span>{activeTestimonial.relationship}</span>
                <span>•</span>
                <time datetime={activeTestimonial.date}>{activeTestimonial.date}</time>
              </div>
            </div>

            {#if activeTestimonial.companyLogo}
              <div class="attribution__logo">
                <Image
                  src={activeTestimonial.companyLogo}
                  alt="{activeTestimonial.company} logo"
                  sizes="48px"
                  loading="lazy"
                />
              </div>
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
                  <div class="context-card__logo">
                    <Image
                      src={testimonial.companyLogo}
                      alt="{testimonial.company} logo"
                      sizes="32px"
                      loading="lazy"
                    />
                  </div>
                {/if}
              </div>

              <div class="context-card__info">
                <h3 class="context-card__name" id="context-{testimonial.id}-title">
                  {testimonial.author}
                </h3>
                <div class="context-card__role">{testimonial.role}</div>
                <button
                  class="context-card__company"
                  on:click={() => navigateToTimeline(testimonial.company)}
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
                    style="animation-delay: {tagIndex * 0.1}s"
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
        <button
          class="floating-nav__arrow floating-nav__arrow--prev"
          on:click={() => setActiveTestimonial(Math.max(0, activeIndex - 1))}
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
        </button>

        <!-- Mini navigation dots -->
        <div class="floating-nav__dots">
          {#each testimonials as testimonial, index (testimonial.id)}
            <button
              class="floating-nav__dot"
              class:floating-nav__dot--active={index === activeIndex}
              on:click={() => setActiveTestimonial(index)}
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
        <button
          class="floating-nav__arrow floating-nav__arrow--next"
          on:click={() => setActiveTestimonial(Math.min(testimonials.length - 1, activeIndex + 1))}
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
        </button>

        <!-- Progress indicator -->
        <div class="floating-nav__progress">
          <span class="floating-nav__counter">{activeIndex + 1}/{testimonials.length}</span>
        </div>
      </div>
    </div>
  </Section>
</section>

<style lang="scss">
  @use '../styles/breakpoints' as *;

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

  .testimonials {
    position: relative;
    background: var(--token-gradients-contact);
    padding: var(--token-space-fluid-4xl) 0;
    overflow: hidden;
    min-height: 100vh;
    min-height: 100dvh;
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
      opacity: 0.6;
      pointer-events: none;
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-5xl) 0;
    }
  }

  .testimonials__container {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-lg);
    max-width: var(--token-container-max);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-2xl);
    }
  }

  // Header styles (keeping as requested)
  .header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-3xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) both;

    @media (min-width: $breakpoint-md) {
      margin-bottom: var(--token-space-fluid-4xl);
    }
  }

  .header__content {
    max-width: 110ch;
    margin: 0 auto;
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

  // Navigation styles
  .navigation {
    display: flex;
    gap: var(--token-space-fluid-sm);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--token-space-fluid-2xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.2s both;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-md);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-lg);
      margin-bottom: var(--token-space-fluid-3xl);
    }

    // Hide on mobile when floating nav is shown
    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    cursor: pointer;
    transition: all 0.4s var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity 0.4s var(--token-motion-ease-out);
    }

    &:hover {
      transform: translateY(-6px) scale(1.03);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.8;
      }

      .nav-item__avatar {
        transform: scale(1.1);
      }
    }

    &--active {
      background: var(--token-surface-glass-medium);
      border-color: var(--token-interactive-color);
      transform: translateY(-4px) scale(1.05);
      box-shadow:
        var(--token-shadow-focus),
        0 0 30px var(--token-interactive-glow);

      &::before {
        background: linear-gradient(135deg, var(--token-interactive-color) 0%, transparent 50%);
        opacity: 0.15;
      }

      .nav-item__avatar {
        border-color: var(--token-interactive-color);
        box-shadow: 0 0 20px var(--token-interactive-glow);
      }

      .nav-item__name {
        color: var(--token-text-primary);
      }
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.7;
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-md);
      padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
    }
  }

  .nav-item__avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--token-radius-full);
    overflow: hidden;
    border: 2px solid var(--token-border-color-default);
    flex-shrink: 0;
    transition: all 0.4s var(--token-motion-ease-out);
    position: relative;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-lg) {
      width: 3rem;
      height: 3rem;
    }
  }

  .nav-item__content {
    display: none;
    min-width: 0;

    @media (min-width: $breakpoint-lg) {
      display: block;
    }
  }

  .nav-item__name {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-overlay);
    line-height: var(--token-line-height-snug);
    white-space: nowrap;
    transition: color 0.4s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
    }
  }

  .nav-item__role {
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-snug);
    white-space: nowrap;

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
    }
  }

  // Progress styles
  .progress {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-3xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.4s both;

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-xl);
      margin-bottom: var(--token-space-fluid-4xl);
    }

    // Hide on mobile when floating nav is shown
    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .progress__track {
    width: 16rem;
    height: 4px;
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-full);
    overflow: hidden;
    position: relative;

    @media (min-width: $breakpoint-lg) {
      width: 20rem;
      height: 5px;
    }

    @media (min-width: $breakpoint-xlg) {
      width: 24rem;
      height: 6px;
    }
  }

  .progress__fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--token-interactive-color),
      var(--token-interactive-hover)
    );
    border-radius: inherit;
    transition: width 0.6s var(--token-motion-ease-out);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: var(--token-interactive-color);
      border-radius: var(--token-radius-full);
      box-shadow: 0 0 12px var(--token-interactive-glow);

      @media (min-width: $breakpoint-lg) {
        right: -5px;
        width: 10px;
        height: 10px;
      }
    }
  }

  .progress__counter {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-brand);
  }

  // Content layout
  .content {
    display: grid;
    gap: var(--token-space-fluid-3xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.6s both;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1.5fr 1fr;
      gap: var(--token-space-fluid-5xl);
      align-items: start;
    }
  }

  // Quote panel
  .quote-panel {
    position: relative;

    @media (min-width: $breakpoint-lg) {
      position: sticky;
      top: var(--token-space-fluid-4xl);
    }
  }

  .quote {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-2xl);
    padding: var(--token-space-fluid-2xl);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-elevated);
    position: relative;
    overflow: hidden;
    transition: all 0.4s var(--token-motion-ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0.4;
      border-radius: inherit;
      pointer-events: none;
      transition: opacity 0.4s var(--token-motion-ease-out);
    }

    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 40px var(--token-shadow-glow-subtle);

      &::before {
        opacity: 0.8;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-4xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-space-fluid-5xl);
    }
  }

  .quote__text {
    font-size: var(--token-font-size-lg);
    font-style: italic;
    line-height: var(--token-line-height-very-loose);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-2xl);
    position: relative;
    z-index: 1;
    white-space: pre-line;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
      margin-bottom: var(--token-space-fluid-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .quote__attribution {
    display: flex;
    align-items: flex-start;
    gap: var(--token-space-fluid-lg);
    border-top: var(--token-border-default-small);
    padding-top: var(--token-space-fluid-xl);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-xl);
      padding-top: var(--token-space-fluid-2xl);
    }
  }

  .attribution__avatar {
    width: 4rem;
    height: 4rem;
    border-radius: var(--token-radius-full);
    overflow: hidden;
    border: 3px solid var(--token-interactive-color);
    flex-shrink: 0;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-md) {
      width: 4.5rem;
      height: 4.5rem;
    }

    @media (min-width: $breakpoint-lg) {
      width: 5rem;
      height: 5rem;
    }
  }

  .attribution__content {
    flex: 1;
    min-width: 0;
  }

  .attribution__author {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-sm);
    line-height: var(--token-line-height-snug);
    font-style: normal;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .attribution__role {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    margin-bottom: var(--token-space-fluid-sm);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
    }
  }

  .attribution__company {
    background: none;
    border: none;
    text-align: left;
    padding: var(--token-space-fluid-xs) 0;
    font-size: var(--token-font-size-sm);
    color: var(--token-text-brand);
    font-weight: var(--token-font-weight-semibold);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    margin-bottom: var(--token-space-fluid-md);
    min-height: 2.75rem;
    display: flex;
    align-items: center;
    border-radius: var(--token-radius-sm);

    &:hover {
      color: var(--token-interactive-hover);
      transform: translateX(2px);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      background: var(--token-surface-glass-subtle);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
      min-height: auto;
      padding: 0;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
    }
  }

  .attribution__meta {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-sm);
    color: var(--token-text-tertiary);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .attribution__logo {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(0.1);
    }

    @media (min-width: $breakpoint-md) {
      width: 3rem;
      height: 3rem;
    }

    @media (min-width: $breakpoint-lg) {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  // Context panel (unchanged - works well)
  .context-panel {
    position: relative;
    height: 34rem;
    perspective: 1000px;

    @media (min-width: $breakpoint-md) {
      height: 38rem;
    }

    @media (min-width: $breakpoint-lg) {
      height: 42rem;
    }

    @media (min-width: $breakpoint-xlg) {
      height: 46rem;
    }
  }

  .context-card {
    position: absolute;
    inset: 0;
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-xl);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-default);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateX(100px) translateZ(-200px) rotateY(15deg) scale(0.8);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity 0.6s var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-background-color);
      opacity: 0;
      transition: opacity 0.6s var(--token-motion-ease-out);
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
      border-color: var(--token-border-color-hover);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 40px var(--token-shadow-glow-subtle);
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
          var(--token-shadow-elevated),
          0 0 60px var(--token-shadow-glow-subtle);

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
      padding: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: var(--token-space-fluid-3xl);
    }

    @media (min-width: $breakpoint-xlg) {
      padding: var(--token-space-fluid-4xl);
    }
  }

  .context-card__header {
    display: flex;
    align-items: flex-start;
    gap: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-xl);
    opacity: 0.7;
    transform: translateY(20px);
    transition: all 0.8s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-xl);
      margin-bottom: var(--token-space-fluid-2xl);
    }
  }

  .context-card__avatar {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: var(--token-radius-full);
    overflow: hidden;
    border: 3px solid var(--token-interactive-color);
    flex-shrink: 0;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (min-width: $breakpoint-md) {
      width: 5rem;
      height: 5rem;
    }

    @media (min-width: $breakpoint-lg) {
      width: 6rem;
      height: 6rem;
    }

    @media (min-width: $breakpoint-xlg) {
      width: 7rem;
      height: 7rem;
    }
  }

  .context-card__logo {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 1.5rem;
    height: 1.5rem;
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    padding: var(--token-space-1);
    display: flex;
    align-items: center;
    justify-content: center;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (min-width: $breakpoint-md) {
      width: 1.75rem;
      height: 1.75rem;
      bottom: -6px;
      right: -6px;
    }

    @media (min-width: $breakpoint-lg) {
      width: 2rem;
      height: 2rem;
      bottom: -8px;
      right: -8px;
    }
  }

  .context-card__info {
    flex: 1;
    min-width: 0;
  }

  .context-card__name {
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

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .context-card__role {
    font-size: var(--token-font-size-xs);
    color: var(--token-text-secondary);
    margin-bottom: var(--token-space-fluid-xs);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-lg);
    }
  }

  .context-card__company {
    background: none;
    border: none;
    padding: 0;
    font-size: var(--token-font-size-xs);
    color: var(--token-text-brand);
    font-weight: var(--token-font-weight-semibold);
    cursor: pointer;
    transition: color 0.3s var(--token-motion-ease-out);

    &:hover {
      color: var(--token-interactive-hover);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-sm);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
    }
  }

  .context-card__content {
    opacity: 0.7;
    transform: translateY(20px);
    transition: all 0.8s var(--token-motion-ease-out) 0.2s;
  }

  .context-detail {
    display: none;
    margin-bottom: var(--token-space-fluid-lg);
    padding: var(--token-space-fluid-md);
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);

    @media (min-width: 768px) {
      display: block;
    }

    @media (min-width: $breakpoint-lg) {
      margin-bottom: var(--token-space-fluid-xl);
      padding: var(--token-space-fluid-lg);
    }
  }

  .context-detail__label {
    display: block;
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    margin-bottom: var(--token-space-fluid-xs);
  }

  .context-detail__value {
    font-size: var(--token-font-size-sm);
    color: var(--token-text-secondary);
    font-weight: var(--token-font-weight-medium);
    line-height: var(--token-line-height-relaxed);

    @media (min-width: 768px) {
      font-size: var(--token-font-size-base);
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-sm);

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-md);
    }
  }

  .tag {
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
    background: var(--token-tint-highlight);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-primary);
    white-space: nowrap;
    transition: all 0.3s var(--token-motion-ease-out);
    opacity: 0;
    transform: translateY(10px);

    &:hover {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: translateY(-2px);
    }

    &--animated {
      animation: tagFadeIn 0.6s var(--token-motion-ease-out) forwards;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    }
  }

  // Enhanced Floating Navigation - Sticky Footer
  .floating-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s var(--token-motion-ease-out);
    z-index: 50;
    background: var(--token-surface-glass-stronger);
    backdrop-filter: blur(var(--token-blur-xl));
    border-top: var(--token-border-default-small);
    padding: var(--token-space-fluid-lg) var(--token-space-fluid-md);
    padding-bottom: calc(var(--token-space-fluid-lg) + env(safe-area-inset-bottom));

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
      background: var(--token-surface-glass-iridescent);
      opacity: 0.3;
      pointer-events: none;
    }
  }

  .floating-nav__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-xl);
    max-width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
      max-width: 28rem;
    }
  }

  .floating-nav__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    color: var(--token-text-primary);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    position: relative;
    z-index: 1;
    box-shadow: var(--token-shadow-default);

    &:hover:not(:disabled) {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: scale(1.1);
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 25px var(--token-interactive-glow);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }

  .floating-nav__dots {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-md);
    padding: var(--token-space-fluid-sm);
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-2xl);
    backdrop-filter: blur(var(--token-blur-md));

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-lg);
      padding: var(--token-space-fluid-md);
    }
  }

  .floating-nav__dot {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--token-radius-full);
    border: 2px solid var(--token-border-color-neutral);
    background: var(--token-surface-color);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    padding: 2px;
    position: relative;
    z-index: 1;
    box-shadow: var(--token-shadow-default);

    &:hover {
      transform: scale(1.1);
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 15px var(--token-interactive-glow);
    }

    &--active {
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 25px var(--token-interactive-glow);
      transform: scale(1.2);
      background: var(--token-surface-color);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    @media (min-width: $breakpoint-md) {
      width: 3rem;
      height: 3rem;
    }
  }

  .floating-nav__dot-avatar {
    width: 100%;
    height: 100%;
    border-radius: var(--token-radius-full);
    overflow: hidden;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .floating-nav__progress {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    height: 2.5rem;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    backdrop-filter: blur(var(--token-blur-md));
    position: relative;
    z-index: 1;
  }

  .floating-nav__counter {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-brand);
    white-space: nowrap;
    padding: 0 var(--token-space-fluid-sm);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  // Mobile responsive adjustments
  @media (max-width: calc($breakpoint-lg - 1px)) {
    .content {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-2xl);
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

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
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
    .header,
    .navigation,
    .progress,
    .content {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .header__title {
      animation: none;
    }

    .context-card,
    .nav-item,
    .tag {
      transition: none;
      animation: none;
    }

    .context-card {
      transform: none !important;
    }
  }

  @media (prefers-contrast: high) {
    .quote,
    .context-card,
    .nav-item {
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
    .testimonials {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .navigation,
    .progress,
    .floating-nav {
      display: none;
    }

    .content {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }

    .context-card {
      position: relative !important;
      opacity: 1 !important;
      transform: none !important;
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
    }

    .header__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
