<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';

  export let name: string;
  export let role: string;
  export let statusText: string;
  export let valueHeadline: string;
  export let valueDescription: string;
  export let avatarSrc: string;
  export let avatarAlt: string;
  export let primaryButtonText: string;
  export let primaryButtonHref: string;
  export let secondaryButtonText: string;
  export let secondaryButtonHref: string;
  export let scrollText: string;
  export let showCanvasBackground: boolean;

  export let stats: Array<{
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance';
  }>;

  export let techStack: Array<{
    title: string;
    level: 'expert' | 'advanced';
    technologies: string[];
  }>;

  const dispatch = createEventDispatcher<{
    primaryAction: { href: string };
    secondaryAction: { href: string };
    scrollIndicator: void;
    techCategoryClick: { category: string };
    avatarClick: void;
  }>();

  // Breakpoints
  const breakpoints = {
    sm: 30, // 480px
    md: 48, // 768px
    lg: 86, // 1376px
    xlg: 160, // 2560px
  };

  // State
  let mounted = false;
  let statElements: HTMLElement[] = [];
  let techContainers: { [key: number]: HTMLElement } = {};
  let animatedCounters: HTMLElement[] = [];

  // Tech stack with visible tags
  let techStackWithVisibleTags = techStack.map((category) => ({
    ...category,
    visibleTags: { visible: category.technologies, overflow: 0 },
  }));

  // Reactive statement to update visible tags when containers are available
  $: if (Object.keys(techContainers).length > 0) {
    techStackWithVisibleTags = techStack.map((category, index) => ({
      ...category,
      visibleTags: getVisibleTags(category.technologies, techContainers[index]),
    }));
  }

  // Helper functions
  const getVisibleTags = (technologies: string[], containerElement: HTMLElement | null) => {
    if (!technologies.length || !containerElement) {
      return { visible: technologies, overflow: 0 };
    }

    const clone = containerElement.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'absolute',
      visibility: 'hidden',
      top: '-9999px',
      width: getComputedStyle(containerElement).width,
    });
    document.body.appendChild(clone);

    try {
      // Measure single line height
      clone.innerHTML = '';
      const testTag = document.createElement('span');
      testTag.className = 'tech-tag';
      testTag.textContent = technologies[0];
      clone.appendChild(testTag);
      const singleLineHeight = clone.offsetHeight;
      const maxHeight = singleLineHeight * 2;

      // Test how many tags fit
      clone.innerHTML = '';
      let visibleCount = 0;

      for (const tech of technologies) {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        clone.appendChild(tag);

        if (clone.offsetHeight > maxHeight) {
          clone.removeChild(tag);
          break;
        }
        visibleCount++;
      }

      const overflow = technologies.length - visibleCount;
      if (overflow > 0) {
        const overflowTag = document.createElement('span');
        overflowTag.className = 'tech-tag tech-tag--overflow';
        overflowTag.textContent = `+${overflow}`;
        clone.appendChild(overflowTag);

        if (clone.offsetHeight > maxHeight && visibleCount > 1) {
          visibleCount--;
        }
      }

      return {
        visible: technologies.slice(0, visibleCount),
        overflow: technologies.length - visibleCount,
      };
    } finally {
      document.body.removeChild(clone);
    }
  };

  const animateCounter = (element: HTMLElement, target: string) => {
    const match = target.match(/^([\d.]+)(.*)$/);
    if (!match || animatedCounters.includes(element)) return;

    const [, numStr, suffix] = match;
    const num = parseFloat(numStr);
    const decimalPlaces = numStr.includes('.') && !isNaN(num) ? 2 : 0;
    const duration = 2000;
    const startTime = performance.now();

    animatedCounters = [...animatedCounters, element];

    const updateCounter = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easedProgress * num;

      element.textContent = currentValue.toFixed(decimalPlaces) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const initStatCounters = () => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataCount = entry.target.getAttribute('data-count');
            if (dataCount) {
              animateCounter(entry.target as HTMLElement, dataCount);
            }
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.5 },
    );

    statElements.forEach((stat) => observer.observe(stat));
  };

  const recomputeVisibleTags = () => {
    techStackWithVisibleTags = techStack.map((category, index) => ({
      ...category,
      visibleTags: getVisibleTags(category.technologies, techContainers[index]),
    }));
  };

  // Event handlers
  const handlePrimaryAction = () => dispatch('primaryAction', { href: primaryButtonHref });
  const handleSecondaryAction = () => dispatch('secondaryAction', { href: secondaryButtonHref });
  const handleScrollIndicator = () => dispatch('scrollIndicator');
  const handleAvatarClick = () => dispatch('avatarClick');
  const handleTechCategoryClick = (categoryTitle: string) =>
    dispatch('techCategoryClick', { category: categoryTitle });

  onMount(() => {
    mounted = true;
    initStatCounters();

    const resizeObserver = new ResizeObserver(recomputeVisibleTags);

    setTimeout(() => {
      Object.values(techContainers).forEach((container) => {
        if (container) resizeObserver.observe(container);
      });
    }, 100);

    return () => resizeObserver.disconnect();
  });
</script>

<section class="hero" id="about" role="main" aria-labelledby="profile-name" data-section="about-me">
  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__container">
    <div class="hero-grid">
      <!-- Profile Section -->
      <div class="profile-section">
        <button
          class="avatar"
          on:click={handleAvatarClick}
          aria-label="View profile details for {name}"
          type="button"
        >
          <div class="avatar__frame">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              className="avatar__image"
              sizes="(max-width: 768px) 120px, (max-width: 1376px) 150px, 180px"
              loading="lazy"
            />
            <div class="avatar__glow" aria-hidden="true"></div>
          </div>
          <div class="avatar__rings" aria-hidden="true">
            <div class="ring ring--1"></div>
            <div class="ring ring--2"></div>
            <div class="ring ring--3"></div>
          </div>
        </button>

        <div class="profile-content">
          <div class="profile-header">
            <h1 class="profile-name" id="profile-name">{name}</h1>
            <div class="profile-accent" aria-hidden="true"></div>
          </div>

          <p class="profile-role">{role}</p>

          <div class="profile-status" role="status" aria-live="polite">
            <div class="status-indicator" aria-hidden="true"></div>
            <span class="status-text">{statusText}</span>
          </div>
        </div>
      </div>

      <!-- Value Proposition -->
      <div class="value-section">
        <h2 class="value-headline">{valueHeadline}</h2>
        <p class="value-description">{valueDescription}</p>

        <div class="actions">
          <button class="btn btn--primary" on:click={handlePrimaryAction}>
            <span>{primaryButtonText}</span>
            <div class="btn__glow" aria-hidden="true"></div>
          </button>

          <button class="btn btn--secondary" on:click={handleSecondaryAction}>
            <span>{secondaryButtonText}</span>
          </button>
        </div>
      </div>

      <!-- Stats Section -->
      <section class="stats-section" aria-labelledby="stats-title">
        <div class="section-header">
          <h3 class="section-title" id="stats-title">Key Metrics</h3>
          <div class="section-accent" aria-hidden="true"></div>
        </div>

        <div class="stats-grid">
          {#each stats as stat, index (index)}
            <div class="stat-card" data-type={stat.type}>
              <div class="stat-number" data-count={stat.count} bind:this={statElements[index]}>
                0
              </div>
              <div class="stat-label">{stat.label.split(' ').join('\n')}</div>
            </div>
          {/each}
        </div>
      </section>

      <!-- Tech Section -->
      <section class="tech-section" aria-labelledby="tech-title">
        <div class="section-header">
          <h3 class="section-title" id="tech-title">Core Technologies & Skills</h3>
          <div class="section-accent" aria-hidden="true"></div>
        </div>

        <div class="tech-grid">
          {#each techStackWithVisibleTags as category, index (index)}
            <button
              class="tech-category"
              on:click={() => handleTechCategoryClick(category.title)}
              aria-label="Explore {category.title} technologies"
              type="button"
            >
              <div class="category-header">
                <span class="category-title">{category.title}</span>
                <div class="mastery-indicator mastery-indicator--{category.level}"></div>
              </div>

              <div class="category-tags" bind:this={techContainers[index]}>
                {#each category.visibleTags.visible as tech (tech)}
                  <span class="tech-tag">{tech}</span>
                {/each}
                {#if category.visibleTags.overflow > 0}
                  <span class="tech-tag tech-tag--overflow">
                    +{category.visibleTags.overflow}
                  </span>
                {/if}
              </div>
            </button>
          {/each}
        </div>
      </section>
    </div>
  </Section>

  <!-- Scroll Indicator -->
  <button
    class="scroll-indicator"
    on:click={handleScrollIndicator}
    aria-label="Scroll to next section"
    type="button"
  >
    <div class="scroll-mouse" aria-hidden="true">
      <div class="scroll-wheel"></div>
    </div>
    <div class="scroll-arrow" aria-hidden="true"></div>
    <span class="scroll-text">{scrollText}</span>
  </button>
</section>

<style lang="scss">
  @use '../styles/breakpoints' as *;

  .hero {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--token-gradients-hero);
    overflow: hidden;
    padding: var(--token-space-fluid-2xl) 0;
    font-family: var(--token-font-family-sans);
    font-feature-settings:
      'kern' 1,
      'liga' 1,
      'calt' 1,
      'ss01' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-hero-glow);
      opacity: 0;
      animation: backgroundGlow 4s ease-in-out 1s both;
      pointer-events: none;
    }

    @media (max-height: 600px) {
      padding: var(--token-space-fluid-lg) 0;
    }
  }

  .hero__container {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: min(var(--token-container-max), calc(100vw - var(--token-space-fluid-2xl)));
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-lg);
    width: 100%;

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-2xl);
    }
  }

  .hero-grid {
    display: grid;
    gap: var(--token-space-fluid-xl);
    animation: heroEntrance 1.2s var(--token-motion-ease-out) both;
    width: 100%;
    overflow: hidden;

    grid-template-areas:
      'profile'
      'value'
      'stats'
      'tech';

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1.3fr 1fr;
      scale: clamp(
        0.9,
        0.9 + 0.05 * (100vw - $breakpoint-lg) / ($breakpoint-xlg - $breakpoint-lg),
        0.95
      );
      grid-template-areas:
        'profile stats'
        'value tech';
      gap: var(--token-space-fluid-2xl) var(--token-space-fluid-3xl);
      align-items: start;
    }

    @media (min-width: $breakpoint-xlg) {
      scale: 1;
      grid-template-columns: 1.4fr 0.9fr;
      gap: var(--token-space-fluid-3xl) var(--token-space-fluid-4xl);
    }

    @media (max-height: 600px) {
      max-height: calc(100vh - var(--token-space-fluid-2xl));
      gap: var(--token-space-fluid-lg);
    }
  }

  // Profile Section
  .profile-section {
    grid-area: profile;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    text-align: center;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.3s both;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      text-align: left;
      gap: var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }

  .avatar {
    position: relative;
    width: var(--token-size-avatar-sm);
    height: var(--token-size-avatar-sm);
    padding: var(--token-space-fluid-xs);
    flex-shrink: 0;
    cursor: pointer;
    transition: transform 0.4s var(--token-motion-ease-out);
    background: none;
    border: none;

    @media (min-width: $breakpoint-lg) {
      width: var(--token-size-avatar-lg);
      height: var(--token-size-avatar-lg);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-full);
    }

    &:hover {
      transform: scale(1.05);

      .avatar__glow {
        opacity: 0.6;
        filter: blur(var(--token-blur-md));
      }

      .ring {
        opacity: 0.8;
      }
    }
  }

  .avatar__frame {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--token-radius-full);
    background: var(--token-gradients-hero);
    padding: 3px;
    overflow: hidden;
    transition: all 0.4s var(--token-motion-ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-frame);
      border-radius: inherit;
      opacity: 0;
      animation: frameRotate 8s linear infinite;
      transition: opacity 0.4s var(--token-motion-ease-out);
    }

    .avatar:hover & {
      &::before {
        opacity: 0.6;
      }
    }
  }

  .avatar__image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--token-radius-full);
    object-fit: cover;
    border: var(--token-border-default-small);
    z-index: 1;
    transition: filter 0.4s var(--token-motion-ease-out);

    .avatar:hover & {
      filter: brightness(1.1) contrast(1.1);
    }
  }

  .avatar__glow {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    background: var(--token-gradients-hero);
    border-radius: var(--token-radius-full);
    filter: blur(var(--token-blur-sm));
    opacity: 0.2;
    z-index: -1;
    animation: avatarPulse 6s ease-in-out infinite alternate;
    transition: all 0.4s var(--token-motion-ease-out);
  }

  .avatar__rings {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    pointer-events: none;

    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .ring {
    position: absolute;
    border: var(--token-border-hover-small);
    border-radius: var(--token-radius-full);
    opacity: 0.15;
    transition: opacity 0.4s var(--token-motion-ease-out);

    &--1 {
      inset: 0;
      animation: ringRotate1 30s linear infinite;
      border-style: solid;
    }

    &--2 {
      inset: var(--token-space-fluid-xs);
      border-style: dashed;
      animation: ringRotate2 45s linear infinite reverse;
    }

    &--3 {
      inset: var(--token-space-fluid-sm);
      border-style: dotted;
      animation: ringRotate3 60s linear infinite;
    }
  }

  .profile-content {
    flex: 1;
    min-width: 0;
  }

  .profile-header {
    position: relative;
    margin-bottom: var(--token-space-fluid-sm);
  }

  .profile-name {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-fluid-xs);
    color: var(--token-text-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-5xl);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-6xl);
    }
  }

  .profile-accent {
    width: 0;
    height: 3px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    animation: accentExpand 1.8s var(--token-motion-ease-out) 0.8s both;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      margin: 0;
    }
  }

  .profile-role {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-relaxed);
    opacity: 0;
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 1s both;
    margin-bottom: var(--token-space-fluid-2xl);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
      font-weight: var(--token-font-weight-normal);
      letter-spacing: var(--token-letter-spacing-normal);
    }
  }

  .profile-status {
    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 1.4s both;
    transition: all 0.3s var(--token-motion-ease-out);
    position: relative;
    overflow: hidden;
    cursor: pointer;

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

    &:hover {
      transform: translateY(-2px);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.8;
      }

      .status-indicator {
        transform: scale(1.2);
      }
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-full);
    }
  }

  .status-indicator {
    width: var(--token-size-3);
    height: var(--token-size-3);
    background: var(--token-attention-color);
    border-radius: var(--token-radius-full);
    animation: statusPulse 2s ease-in-out infinite;
    box-shadow: 0 0 10px var(--token-attention-glow);
    transition: transform 0.3s var(--token-motion-ease-out);
  }

  // Value Section
  .value-section {
    grid-area: value;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.6s both;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    text-align: center;

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  .value-headline {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-semibold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-primary);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
      font-weight: var(--token-font-weight-medium);
      letter-spacing: var(--token-letter-spacing-normal);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-4xl);
    }

    &:hover {
      color: var(--token-text-hovered);
    }
  }

  .value-description {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
    }

    &:hover {
      color: var(--token-text-primary);
    }
  }

  .actions {
    display: flex;
    gap: var(--token-space-fluid-md);
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 0.8s both;
    flex-direction: column;
    margin-top: var(--token-space-fluid-md);

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      gap: var(--token-space-fluid-lg);
    }
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-sm);
    padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
    font-family: inherit;
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-medium);
    border: none;
    border-radius: var(--token-radius-full);
    cursor: pointer;
    transition: all 0.3s var(--token-motion-ease-out);
    overflow: hidden;
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);

    span {
      position: relative;
      z-index: 2;
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      padding: var(--token-space-fluid-lg) var(--token-space-fluid-2xl);
      flex: 1;
    }

    @media (min-width: $breakpoint-lg) {
      flex: 0 1 auto;
      min-width: 10rem;
    }

    &--primary {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 20px var(--token-interactive-glow);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity 0.3s var(--token-motion-ease-out);
        border-radius: inherit;
        z-index: 0;
      }

      &:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow:
          var(--token-shadow-elevated),
          0 0 30px var(--token-interactive-glow);

        &::before {
          opacity: 0.8;
        }
      }

      &:focus {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 3px;
        border-radius: var(--token-radius-full);
      }

      &:active {
        transform: translateY(-2px) scale(1);
      }
    }

    &--secondary {
      background: var(--token-surface-glass-strong);
      color: var(--token-text-overlay);
      border: var(--token-border-default-small);
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
        z-index: 0;
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

      &:active {
        transform: translateY(-1px) scale(1);
      }
    }
  }

  // Stats Section
  .stats-section {
    grid-area: stats;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-md);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.5s both;
    position: relative;
    overflow: hidden;
    transform: scale(0.8);
    transform-origin: top left;
    margin-top: auto;

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

    &:hover {
      &::before {
        opacity: 0.6;
      }

      .section-accent {
        width: var(--token-space-fluid-md);
      }

      .section-title {
        color: var(--token-text-secondary);
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-md);
    }
  }

  .section-header {
    margin-bottom: var(--token-space-fluid-md);
  }

  .section-title {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
    }
  }

  .section-accent {
    width: var(--token-space-fluid-md);
    height: 2px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    transition: width 0.3s var(--token-motion-ease-out);
  }

  .stats-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .stat-card {
    padding: var(--token-space-fluid-md);
    text-align: center;
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    transition: all 0.3s var(--token-motion-ease-out);
    animation: statReveal 0.8s var(--token-motion-ease-out) both;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:nth-child(1) {
      animation-delay: 1s;
    }
    &:nth-child(2) {
      animation-delay: 1.1s;
    }
    &:nth-child(3) {
      animation-delay: 1.2s;
    }
    &:nth-child(4) {
      animation-delay: 1.3s;
    }

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

    &:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.8;
      }

      .stat-number {
        transform: scale(1.1);
        color: var(--token-text-heading);
      }

      .stat-label {
        color: var(--token-text-secondary);
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
    }
  }

  .stat-number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-2);
    color: var(--token-text-emphasis-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: all 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
    }
  }

  .stat-label {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    line-height: var(--token-line-height-relaxed);
    white-space: pre-line;
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
    }
  }

  // Tech Section
  .tech-section {
    grid-area: tech;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-xl);
    padding: var(--token-space-fluid-md);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.7s both;
    position: relative;
    overflow: hidden;
    transform: scale(0.8);
    transform-origin: top left;
    margin-top: auto;

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

    &:hover {
      &::before {
        opacity: 0.6;
      }

      .section-title {
        color: var(--token-text-secondary);
      }

      .section-accent {
        width: var(--token-space-fluid-md);
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-md);
    }
  }

  .tech-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .tech-category {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md);
    transition: all 0.3s var(--token-motion-ease-out);
    animation: fadeInUp 0.6s var(--token-motion-ease-out) both;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-md);
    text-align: left;

    &:nth-child(1) {
      animation-delay: 1.4s;
    }
    &:nth-child(2) {
      animation-delay: 1.5s;
    }
    &:nth-child(3) {
      animation-delay: 1.6s;
    }
    &:nth-child(4) {
      animation-delay: 1.7s;
    }

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

    &:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--token-border-color-hover);
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 0.8;
      }

      .category-title {
        color: var(--token-text-heading);
      }

      .tech-tag {
        background: var(--token-surface-glass-strong);
        color: var(--token-text-primary);
        transform: scale(1.05);
      }

      .mastery-indicator {
        transform: scale(1.3);
      }
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-lg);
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
    }
  }

  .category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-space-fluid-xs);
  }

  .category-title {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-overlay);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    transition: color 0.3s var(--token-motion-ease-out);
    flex: 1;
    min-width: 0;

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
    }
  }

  .mastery-indicator {
    width: var(--token-size-4);
    height: var(--token-size-4);
    border-radius: var(--token-radius-full);
    flex-shrink: 0;
    transition: transform 0.3s var(--token-motion-ease-out);

    &--expert,
    &--advanced {
      background: var(--token-interactive-color);
      box-shadow: 0 0 8px var(--token-interactive-glow);
    }
  }

  .category-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-2);
  }

  .tech-tag {
    padding: var(--token-space-1) var(--token-space-3);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    transition: all 0.3s var(--token-motion-ease-out);
    white-space: nowrap;
    flex-shrink: 0;

    &--overflow {
      background: var(--token-surface-glass-medium);
      color: var(--token-text-tertiary);
      font-weight: var(--token-font-weight-semibold);
      border-style: dashed;
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-2) var(--token-space-3);
      font-size: var(--token-font-size-sm);
    }
  }

  // Scroll Indicator
  .scroll-indicator {
    position: absolute;
    bottom: var(--token-space-fluid-2xl);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: none;
    border: none;
    color: var(--token-attention-color);
    opacity: 0.6;
    cursor: pointer;
    animation: scrollFloat 2s ease-in-out infinite;
    z-index: 10;
    transition: all 0.3s var(--token-motion-ease-out);

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-sm);
    }

    &:hover {
      opacity: 1;
      transform: translateX(-50%) scale(1.1);

      .scroll-mouse {
        border-color: var(--token-attention-color);
        box-shadow: 0 0 15px var(--token-attention-glow);
      }

      .scroll-wheel {
        background: var(--token-attention-color);
      }

      .scroll-arrow {
        border-top-color: var(--token-attention-color);
      }
    }

    @media (max-height: 600px), (max-width: calc($breakpoint-sm - 1px)) {
      display: none;
    }
  }

  .scroll-mouse {
    width: var(--token-size-6);
    height: 1.75rem;
    border: var(--token-border-default-medium);
    border-radius: 0.625rem;
    position: relative;
    background: var(--token-surface-glass-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    transition: all 0.3s var(--token-motion-ease-out);
  }

  .scroll-wheel {
    position: absolute;
    width: 1.5px;
    height: var(--token-size-1);
    background: var(--token-interactive-color);
    left: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-radius-full);
    animation: wheelScroll 2s ease-in-out infinite;
    transition: background 0.3s var(--token-motion-ease-out);
  }

  .scroll-arrow {
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-top: 0.375rem solid var(--token-interactive-color);
    animation: arrowBounce 2s ease-in-out infinite 0.5s;
    transition: border-top-color 0.3s var(--token-motion-ease-out);
  }

  .scroll-text {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    color: var(--token-attention-color);
    line-height: var(--token-line-height-snug);
  }

  // Animations
  @keyframes heroEntrance {
    from {
      opacity: 0;
      transform: translateY(2rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes backgroundGlow {
    to {
      opacity: 1;
    }
  }

  @keyframes frameRotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes avatarPulse {
    from {
      opacity: 0.2;
      transform: scale(1);
    }
    to {
      opacity: 0.4;
      transform: scale(1.02);
    }
  }

  @keyframes ringRotate1 {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ringRotate2 {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes ringRotate3 {
    to {
      transform: rotate(360deg);
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

  @keyframes accentExpand {
    to {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }
  }

  @keyframes statusPulse {
    0%,
    100% {
      opacity: 0.8;
      transform: scale(1);
      box-shadow: 0 0 10px var(--token-attention-glow);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 0 20px var(--token-attention-glow);
    }
  }

  @keyframes statReveal {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(1rem);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes scrollFloat {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-0.5rem);
    }
  }

  @keyframes wheelScroll {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    50% {
      opacity: 0.4;
      transform: translateX(-50%) translateY(0.5rem);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes arrowBounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    50% {
      transform: translateY(0.25rem);
      opacity: 1;
    }
  }

  // Accessibility & Motion Preferences
  @media (prefers-reduced-motion: reduce) {
    .hero-grid,
    .profile-section,
    .value-section,
    .stats-section,
    .tech-section,
    .stat-card,
    .tech-category {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .profile-name {
      animation: none;
    }

    .profile-accent {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }

    .avatar__rings {
      display: none;
    }

    .btn:hover,
    .stat-card:hover,
    .tech-category:hover,
    .avatar:hover {
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .stats-section,
    .stat-card,
    .tech-section,
    .tech-category {
      border-width: 2px;
      border-color: currentColor;
    }

    .btn--primary {
      border: 2px solid currentColor;
    }

    .profile-name,
    .value-headline,
    .stat-number {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .hero {
      min-height: auto;
      max-height: none;
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .actions,
    .avatar__glow,
    .avatar__rings,
    .scroll-indicator {
      display: none;
    }

    .hero-grid {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }

    .profile-name {
      color: black;
      -webkit-text-fill-color: black;
    }

    .stats-grid,
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
