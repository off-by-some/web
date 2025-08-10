<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
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

  let mounted = false;
  let statElements: HTMLElement[] = [];
  let techContainers: { [key: number]: HTMLElement } = {};
  let animatedCounters = new SvelteSet<HTMLElement>();

  const typeDescriptions = {
    years: 'years of experience',
    scale: 'scale metric',
    reliability: 'reliability percentage',
    performance: 'performance metric',
    expert: 'Expert level proficiency',
    advanced: 'Advanced level proficiency',
  };

  const createClone = (element: HTMLElement) => {
    const clone = element.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'absolute',
      visibility: 'hidden',
      top: '-9999px',
      width: getComputedStyle(element).width,
    });
    document.body.appendChild(clone);
    return clone;
  };

  const measureTagHeight = (clone: HTMLElement, technology: string) => {
    clone.innerHTML = '';
    const testTag = document.createElement('span');
    testTag.className = 'tech__tag';
    testTag.textContent = technology;
    clone.appendChild(testTag);
    return clone.offsetHeight;
  };

  function getVisibleTags(technologies: string[], containerElement: HTMLElement | null) {
    if (!technologies.length || !containerElement) {
      return { visible: technologies, overflow: 0 };
    }

    const clone = createClone(containerElement);

    try {
      const singleLineHeight = measureTagHeight(clone, technologies[0]);
      const maxHeight = singleLineHeight * 2;

      clone.innerHTML = '';
      let visibleCount = 0;

      for (const tech of technologies) {
        const tag = document.createElement('span');
        tag.className = 'tech__tag';
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
        overflowTag.className = 'tech__tag tech__tag--overflow';
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
  }

  let techStackWithVisibleTags = techStack.map((category, index) => ({
    ...category,
    visibleTags: getVisibleTags(category.technologies, techContainers[index]),
  }));

  function recomputeVisibleTags() {
    techStackWithVisibleTags = techStack.map((category, index) => ({
      ...category,
      visibleTags: getVisibleTags(category.technologies, techContainers[index]),
    }));
  }

  const animateCounter = (element: HTMLElement, target: string) => {
    const match = target.match(/^([\d.]+)(.*)$/);
    if (!match || animatedCounters.has(element)) return;

    const [, numStr, suffix] = match;
    const num = parseFloat(numStr);
    const decimalPlaces = numStr.includes('.') && !isNaN(num) ? 2 : 0;
    const duration = 2000;
    const startTime = performance.now();

    animatedCounters.add(element);
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('aria-atomic', 'true');

    const updateCounter = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easedProgress * num;

      element.textContent = currentValue.toFixed(decimalPlaces) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.setAttribute('aria-live', 'off');
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

  const createEventHandler =
    <T = unknown,>(eventType: string, payload?: T) =>
    () =>
      dispatch(eventType as never, payload as never);

  const createKeydownHandler = (callback: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  onMount(() => {
    mounted = true;
    initStatCounters();

    const resizeObserver = new ResizeObserver(() => {
      recomputeVisibleTags();
    });

    setTimeout(() => {
      Object.values(techContainers).forEach((container) => {
        if (container) resizeObserver.observe(container);
      });
    }, 100);

    return () => resizeObserver.disconnect();
  });

  const handlePrimaryAction = createEventHandler('primaryAction', { href: primaryButtonHref });
  const handleSecondaryAction = createEventHandler('secondaryAction', {
    href: secondaryButtonHref,
  });
  const handleScrollIndicator = createEventHandler('scrollIndicator');
  const handleAvatarClick = createEventHandler('avatarClick');
  const handleTechCategoryClick = (categoryTitle: string) =>
    createEventHandler('techCategoryClick', { category: categoryTitle })();

  const handleTechCategoryKeydown = (categoryTitle: string) =>
    createKeydownHandler(() => handleTechCategoryClick(categoryTitle));
  const handleAvatarKeydown = createKeydownHandler(handleAvatarClick);

  const getMasteryDescription = (level: 'expert' | 'advanced'): string => typeDescriptions[level];

  const getStatDescription = (stat: (typeof stats)[0]): string =>
    `${stat.count} ${typeDescriptions[stat.type]}: ${stat.label}`;
</script>

<section class="hero" id="about" role="main" aria-labelledby="profile-name">
  {#if showCanvasBackground}
    <div class="hero__canvas" id="hero-canvas-container" aria-hidden="true"></div>
  {/if}

  <Section className="hero__content">
    <div class="hero__container">
      <div class="hero__profile">
        <button
          class="avatar"
          on:click={handleAvatarClick}
          on:keydown={handleAvatarKeydown}
          aria-label="View profile details for {name}"
          type="button"
        >
          <div class="avatar__frame">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              className="avatar__image"
              sizes="150px"
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

        <div class="profile__content">
          <div class="profile__header">
            <h1 class="profile__name" id="profile-name">{name}</h1>
            <div class="profile__accent" aria-hidden="true"></div>
          </div>
          <p class="profile__role">{role}</p>
          <div class="profile__status" role="status" aria-live="polite">
            <div class="status__indicator" aria-hidden="true"></div>
            <span class="status__text">{statusText}</span>
          </div>
        </div>
      </div>

      <div class="hero__value">
        <h2 class="value__headline">{valueHeadline}</h2>
        <p class="value__description">{valueDescription}</p>

        <div class="hero__actions">
          <button
            class="btn btn--primary"
            on:click={handlePrimaryAction}
            aria-describedby="primary-btn-desc"
          >
            <span>{primaryButtonText}</span>
            <div class="btn__glow" aria-hidden="true"></div>
          </button>
          <span id="primary-btn-desc" class="sr-only">Navigate to {primaryButtonHref}</span>

          <button
            class="btn btn--secondary"
            on:click={handleSecondaryAction}
            aria-describedby="secondary-btn-desc"
          >
            <span>{secondaryButtonText}</span>
          </button>
          <span id="secondary-btn-desc" class="sr-only">Navigate to {secondaryButtonHref}</span>
        </div>
      </div>

      <section class="stats" aria-labelledby="stats-title">
        <div class="section__header">
          <h3 class="section__title" id="stats-title">Key Metrics</h3>
          <div class="section__accent" aria-hidden="true"></div>
        </div>
        <div class="stats__grid" role="group" aria-label="Performance statistics">
          {#each stats as stat, index (index)}
            <div
              class="stat"
              data-type={stat.type}
              role="img"
              aria-label={getStatDescription(stat)}
            >
              <div
                class="stat__number"
                data-count={stat.count}
                bind:this={statElements[index]}
                aria-label="Animated counter showing {stat.count}"
              >
                0
              </div>
              <div class="stat__label">{stat.label.split(' ').join('\n')}</div>
            </div>
          {/each}
        </div>
      </section>

      <section class="tech" aria-labelledby="tech-title">
        <div class="section__header">
          <h3 class="section__title" id="tech-title">Core Technologies & Skills</h3>
          <div class="section__accent" aria-hidden="true"></div>
        </div>
        <div class="tech__grid" role="group" aria-label="Technology categories">
          {#each techStackWithVisibleTags as category, index (index)}
            <button
              class="tech__category"
              on:click={() => handleTechCategoryClick(category.title)}
              on:keydown={handleTechCategoryKeydown(category.title)}
              aria-label="Explore {category.title} technologies - {getMasteryDescription(
                category.level,
              )}"
              aria-describedby="tech-category-{index}"
              type="button"
            >
              <div class="category__header">
                <span class="category__title">{category.title}</span>
                <div
                  class="mastery__indicator mastery__indicator--{category.level}"
                  aria-label={getMasteryDescription(category.level)}
                  role="img"
                ></div>
              </div>
              <div class="category__tags" bind:this={techContainers[index]} role="list">
                {#each category.visibleTags.visible as tech, tIdx (tIdx)}
                  <span class="tech__tag" role="listitem">{tech}</span>
                {/each}
                {#if category.visibleTags.overflow > 0}
                  <span
                    class="tech__tag tech__tag--overflow"
                    role="listitem"
                    aria-label="{category.visibleTags.overflow} more technologies"
                    >+{category.visibleTags.overflow}</span
                  >
                {/if}
              </div>
              <span id="tech-category-{index}" class="sr-only">
                Contains {category.technologies.length} technologies including {category.technologies
                  .slice(0, 3)
                  .join(', ')}
                {#if category.technologies.length > 3}and {category.technologies.length - 3} more{/if}
              </span>
            </button>
          {/each}
        </div>
      </section>
    </div>
  </Section>

  <button
    class="scroll__indicator"
    on:click={handleScrollIndicator}
    aria-label="Scroll to next section"
    type="button"
  >
    <div class="scroll__mouse" aria-hidden="true">
      <div class="scroll__wheel"></div>
    </div>
    <div class="scroll__arrow" aria-hidden="true"></div>
    <span class="scroll__text">{scrollText}</span>
  </button>
</section>

<style lang="scss">
  @use 'styles/animations.scss' as *;
  @use 'styles/_breakpoints.scss' as *;

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

  #about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--token-space-fluid-lg) var(--token-space-fluid-md);
  }

  .hero {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    background: var(--token-gradients-hero);
    overflow: hidden;
    padding: var(--token-space-fluid-2xl) var(--token-space-fluid-lg);
    font-family: var(--token-font-family-sans);
    font-feature-settings:
      'kern' 1,
      'liga' 1,
      'calt' 1,
      'ss01' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    will-change: transform;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-hero-glow);
      opacity: 0;
      animation: backgroundGlow 4s ease-in-out 1s both;
      pointer-events: none;
      z-index: var(--token-z-behind);
    }
  }

  .hero__content {
    position: relative;
    z-index: var(--token-z-base);
    width: 100%;
    max-width: var(--token-container-7xl);
    margin: 0 auto;

    @media (min-width: 100rem) {
      max-width: var(--token-container-max);
    }
  }

  .hero__container {
    display: grid;
    gap: var(--token-space-fluid-xl);
    animation: heroEntrance 1.2s var(--token-motion-ease-out) both;
    margin: auto;
    margin-top: var(--token-space-fluid-md);

    grid-template-columns: 1fr;
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
      grid-template-rows: auto auto;
      grid-template-areas:
        'profile stats'
        'value tech';
      gap: var(--token-space-fluid-2xl) var(--token-space-fluid-3xl);
      align-items: start;
    }

    @media (min-width: $breakpoint-xlg) {
      grid-template-columns: 1.4fr 0.9fr;
      gap: var(--token-space-fluid-3xl) var(--token-space-fluid-4xl);
    }
  }

  .hero__profile {
    grid-area: profile;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    text-align: center;
    animation: cardReveal 1.4s var(--token-motion-ease-out) 0.3s both;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      text-align: left;
      gap: var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }

  .avatar {
    position: relative;
    width: clamp(6rem, 16vw, 7rem);
    height: clamp(6rem, 16vw, 7rem);
    padding: var(--token-space-fluid-xs);
    flex-shrink: 0;
    cursor: pointer;
    transition: transform var(--token-motion-duration-normal) var(--token-motion-ease-out);
    background: none;
    border: none;

    @media (min-width: $breakpoint-lg) {
      width: var(--token-size-avatar-lg);
      height: var(--token-size-avatar-lg);
      margin-left: -15px;
    }

    &:focus-visible {
      outline: 3px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-full);
    }

    @media (hover: hover) {
      &:hover {
        transform: scale(1.05);

        .avatar__glow {
          opacity: var(--token-opacity-default);
          filter: blur(var(--token-blur-md));
        }

        .ring {
          opacity: var(--token-opacity-ring-hover);
        }
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.98);
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
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-frame);
      border-radius: inherit;
      opacity: 0;
      animation: frameRotate 8s linear infinite;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
    }

    @media (hover: hover) {
      .avatar:hover & {
        &::before {
          opacity: var(--token-opacity-default);
        }
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
    transition: filter var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (hover: hover) {
      .avatar:hover & {
        filter: brightness(1.1) contrast(1.1);
      }
    }
  }

  .avatar__glow {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    background: var(--token-gradients-hero);
    border-radius: var(--token-radius-full);
    filter: blur(var(--token-blur-sm));
    opacity: var(--token-opacity-ring-hover);
    z-index: -1;
    animation: avatarPulse 6s ease-in-out infinite alternate;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .avatar__rings {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    pointer-events: none;

    @media (max-width: $breakpoint-lg) {
      display: none;
    }
  }

  .ring {
    position: absolute;
    border: var(--token-border-hover-small);
    border-radius: var(--token-radius-full);
    opacity: var(--token-opacity-ring-default);
    transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);

    &.ring--1 {
      inset: 0;
      animation: ringRotate1 30s linear infinite;
      border-style: solid;
    }

    &.ring--2 {
      inset: var(--token-space-fluid-xs);
      border-style: dashed;
      animation: ringRotate2 45s linear infinite reverse;
    }

    &.ring--3 {
      inset: var(--token-space-fluid-sm);
      border-style: dotted;
      animation: ringRotate3 60s linear infinite;
    }
  }

  .profile__content {
    flex: 1;
    min-width: 0;
  }

  .profile__header {
    position: relative;
    margin-bottom: var(--token-space-fluid-sm);
  }

  .profile__name {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-fluid-xs);
    color: var(--token-text-heading);
    text-shadow: 0 0 5px var(--token-shadow-interactive);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;
    cursor: default;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      line-height: var(--token-line-height-snug);
      margin-left: -5px;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-5xl);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-6xl);
    }

    @media (hover: hover) {
      &:hover {
        animation-duration: 2s;
        text-shadow: 0 0 5px var(--token-interactive-hover);
      }
    }
  }

  .profile__accent {
    width: 0;
    height: 3px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    animation: accentExpand 1.8s var(--token-motion-ease-out) 0.8s both;
    position: relative;
    overflow: hidden;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      margin: 0;
    }
  }

  .profile__role {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-relaxed);
    opacity: 0;
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 1s both;
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

  .profile__status {
    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    margin-left: -5px;
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    backdrop-filter: blur(var(--token-blur-sm));
    animation: statusReveal var(--token-motion-duration-slow) var(--token-motion-ease-out) 1.4s both;
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    position: relative;
    overflow: hidden;
    min-height: var(--token-size-12);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 50%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
    }

    @media (hover: hover) {
      &:hover {
        transform: translateY(-2px);
        border-color: var(--token-border-color-hover);
        box-shadow: var(--token-shadow-interactive);

        &::before {
          opacity: 1;
        }

        .status__indicator {
          transform: scale(1.2);
          animation-duration: 1s;
        }
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }
  }

  .status__indicator {
    width: var(--token-size-3);
    height: var(--token-size-3);
    background: var(--token-attention-color);
    border-radius: var(--token-radius-full);
    animation: statusPulse var(--token-motion-duration-pulse) ease-in-out infinite;
    box-shadow: 0 0 10px var(--token-attention-glow);
    transition: transform var(--token-motion-duration-fast) var(--token-motion-ease-out);
  }

  .hero__value {
    grid-area: value;
    animation: valueReveal 1s var(--token-motion-ease-out) 0.6s both;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    text-align: center;

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  .value__headline {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-semibold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-primary);
    letter-spacing: var(--token-letter-spacing-tight);
    cursor: default;
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

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

    @media (hover: hover) {
      &:hover {
        color: var(--token-text-hovered);
      }
    }
  }

  .value__description {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-normal);
    font-weight: var(--token-font-weight-normal);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      margin-bottom: var(--token-space-fluid-sm);
      line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
    }

    @media (hover: hover) {
      &:hover {
        color: var(--token-text-primary);
      }
    }
  }

  .hero__actions {
    display: flex;
    gap: var(--token-space-fluid-md);
    animation: actionsReveal var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.8s
      both;

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
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    overflow: hidden;
    min-height: var(--token-size-12);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    will-change: transform;
    z-index: 1;

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
      min-width: var(--token-size-40);
    }

    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: transparent;
      border-radius: inherit;
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
      pointer-events: none;
      z-index: 0;
    }

    &--primary {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      box-shadow:
        var(--token-shadow-elevated),
        0 0 20px var(--token-interactive-glow);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          var(--token-tint-overlay-medium) 0%,
          transparent 50%,
          var(--token-tint-overlay-subtle) 100%
        );
        opacity: 0;
        transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
        border-radius: inherit;
        z-index: 0;
      }

      &::after {
        background: linear-gradient(
          135deg,
          var(--token-interactive-hover) 0%,
          var(--token-interactive-color) 100%
        );
      }

      @media (hover: hover) {
        &:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow:
            var(--token-shadow-interactive),
            var(--token-shadow-elevated),
            0 0 30px var(--token-state-hover-glow);

          &::before {
            opacity: 1;
          }

          &::after {
            opacity: 1;
          }
        }
      }

      &:active {
        transform: translateY(-2px) scale(1);
        box-shadow: var(--token-shadow-interactive), var(--token-shadow-default);
        transition: all 0.1s ease-out;
      }

      &:focus-visible {
        outline: var(--token-border-ring-large);
        outline-offset: 3px;
      }
    }

    &--secondary {
      background: var(--token-surface-glass-strong);
      color: var(--token-text-overlay);
      border: var(--token-border-default-medium);
      backdrop-filter: blur(var(--token-blur-sm));
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 50%);
        opacity: 0;
        transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
        border-radius: inherit;
        z-index: 0;
      }

      @media (hover: hover) {
        &:hover {
          transform: translateY(-3px) scale(1.02);
          background: var(--token-surface-glass-strong);
          border-color: var(--token-border-color-hover);
          color: var(--token-text-primary);
          box-shadow:
            var(--token-shadow-default),
            0 0 20px var(--token-shadow-glow-subtle);

          &::before {
            opacity: 1;
          }
        }
      }

      &:active {
        transform: translateY(-1px) scale(1);
        box-shadow: var(--token-shadow-light);
      }

      &:focus-visible {
        outline: 2px solid var(--token-border-ring);
        outline-offset: 2px;
      }
    }
  }

  .stats {
    grid-area: stats;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: statsReveal 1.4s var(--token-motion-ease-out) 0.5s both;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
    }

    @media (hover: hover) {
      &:hover::before {
        opacity: 1;
      }

      &:hover .section__accent {
        width: var(--token-space-fluid-xl);
      }

      &:hover .section__title {
        color: var(--token-text-secondary);
      }
    }

    @media (min-width: $breakpoint-lg) {
      background: var(--token-surface-glass-strong);
      border-color: var(--token-border-color-default);
    }
  }

  .section__header {
    margin-bottom: var(--token-space-fluid-lg);
  }

  .section__title {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    margin-bottom: var(--token-space-fluid-sm);
    line-height: var(--token-line-height-snug);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
      letter-spacing: var(--token-letter-spacing-widest);
    }
  }

  .section__accent {
    width: var(--token-space-fluid-md);
    height: 2px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    transition: width var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .stats__grid {
    display: grid;
    gap: var(--token-space-fluid-lg);

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--token-space-fluid-lg);
    }
  }

  .stat {
    padding: var(--token-space-fluid-lg);
    text-align: center;
    background: var(--token-gradients-stat-default);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    animation: statReveal 0.8s var(--token-motion-ease-bounce) both;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    min-height: var(--token-size-40);
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
      background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 70%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
    }

    @media (hover: hover) {
      &:hover {
        transform: translateY(-5px) scale(1.02);
        background: var(--token-gradients-stat-hover);
        border-color: var(--token-border-color-hover);
        box-shadow:
          var(--token-shadow-interactive),
          var(--token-shadow-default),
          0 0 20px var(--token-shadow-glow-subtle);

        &::before {
          opacity: 1;
        }

        .stat__number {
          transform: scale(1.1);
          color: var(--token-text-heading);
        }
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }

    &:nth-child(even) {
      background: var(--token-gradients-stat-alt);

      @media (hover: hover) {
        &:hover {
          background: var(--token-gradients-stat-alt_hover);
        }
      }
    }
  }

  .stat__number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-2);
    color: var(--token-text-emphasis-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
      line-height: var(--token-line-height-snug);
    }
  }

  .stat__label {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    line-height: var(--token-line-height-relaxed);
    white-space: pre-line;
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
      letter-spacing: var(--token-letter-spacing-extra-wide);
    }

    @media (hover: hover) {
      .stat:hover & {
        color: var(--token-text-secondary);
      }
    }
  }

  .tech {
    grid-area: tech;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: techReveal 1.4s var(--token-motion-ease-out) 0.7s both;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
    }

    @media (hover: hover) {
      &:hover::before {
        opacity: 1;
      }

      &:hover .section__title {
        color: var(--token-text-secondary);
      }

      &:hover .section__accent {
        width: var(--token-space-fluid-xl);
      }
    }

    @media (min-width: $breakpoint-lg) {
      background: var(--token-surface-glass-strong);
      border-color: var(--token-border-color-default);
    }

    @media (min-width: $breakpoint-md) {
      margin-bottom: var(--token-space-fluid-6xl);
    }
  }

  .tech__grid {
    display: grid;
    gap: var(--token-space-fluid-lg);

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      gap: var(--token-space-fluid-lg);
    }
  }

  .tech__category {
    background: var(--token-gradients-stat-default);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    padding: var(--token-space-fluid-lg);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    animation: categoryReveal 0.8s var(--token-motion-ease-out) both;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
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

    &:focus-visible {
      outline: 3px solid var(--token-interactive-color);
      outline-offset: 2px;
      z-index: 10;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--token-shadow-glow-subtle) 0%, transparent 60%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
    }

    @media (hover: hover) {
      &:hover {
        transform: translateY(-4px) scale(1.02);
        background: var(--token-gradients-stat-hover);
        border-color: var(--token-border-color-hover);
        box-shadow:
          var(--token-shadow-interactive),
          var(--token-shadow-default),
          0 0 15px var(--token-shadow-glow-subtle);

        &::before {
          opacity: 1;
        }

        .category__title {
          color: var(--token-text-heading);
        }

        .tech__tag {
          background: var(--token-surface-glass-strong);
          color: var(--token-text-primary);
          transform: scale(1.05);
        }
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.98);
      }
    }

    &:nth-child(even) {
      background: var(--token-gradients-stat-alt);

      @media (hover: hover) {
        &:hover {
          background: var(--token-gradients-stat-alt_hover);
        }
      }
    }
  }

  .category__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-space-fluid-sm);
    min-width: 0;
  }

  .category__title {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-overlay);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    flex: 1;

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
      letter-spacing: var(--token-letter-spacing-normal);
    }
  }

  .mastery__indicator {
    width: var(--token-size-4);
    height: var(--token-size-4);
    border-radius: var(--token-radius-full);
    flex-shrink: 0;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    &--expert,
    &--advanced {
      background: var(--token-interactive-color);
      box-shadow: 0 0 8px var(--token-interactive-glow);
    }

    @media (hover: hover) {
      .tech__category:hover & {
        transform: scale(1.3);
        box-shadow: 0 0 12px var(--token-state-hover-glow);
      }
    }
  }

  .category__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-2);
    align-content: flex-start;
  }

  .tech__tag {
    padding: var(--token-space-2) var(--token-space-4);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    white-space: nowrap;
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
    cursor: pointer;
    flex-shrink: 0;

    @media (max-width: $breakpoint-md) {
      padding: var(--token-space-3) var(--token-space-4);
      font-size: var(--token-font-size-base);
    }

    &--overflow {
      background: var(--token-surface-glass-medium);
      color: var(--token-text-tertiary);
      font-weight: var(--token-font-weight-semibold);
      border-style: dashed;
    }

    @media (hover: hover) {
      &:hover {
        background: var(--token-gradients-stat-hover);
        border-color: var(--token-border-color-hover);
        color: var(--token-text-primary);
        transform: scale(1.05);
      }
    }

    @media (hover: none) {
      &:active {
        transform: scale(0.95);
      }
    }
  }

  .scroll__indicator {
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
    opacity: var(--token-opacity-medium);
    cursor: pointer;
    animation: scrollFloat 2s ease-in-out infinite;
    z-index: var(--token-z-raised);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-sm);
    }

    @media (max-height: 600px) {
      display: none;
    }

    @media (max-width: $breakpoint-sm) {
      display: none;
    }

    @media (hover: hover) {
      &:hover {
        opacity: 1;
        transform: translateX(-50%) scale(1.1);

        .scroll__mouse {
          border-color: var(--token-attention-color);
          box-shadow: 0 0 15px var(--token-attention-glow);
        }

        .scroll__wheel {
          background: var(--token-attention-color);
          animation-duration: 1s;
        }

        .scroll__arrow {
          border-top-color: var(--token-attention-color);
          animation-duration: 1s;
        }
      }
    }
  }

  .scroll__mouse {
    width: var(--token-size-6);
    height: 1.75rem;
    border: var(--token-border-default-medium);
    border-radius: 0.625rem;
    position: relative;
    background: var(--token-surface-glass-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    animation: mouseFloat 3s ease-in-out infinite;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .scroll__wheel {
    position: absolute;
    width: 1.5px;
    height: var(--token-size-1);
    background: var(--token-interactive-color);
    left: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-radius-full);
    animation: wheelScroll var(--token-motion-duration-pulse) ease-in-out infinite;
    transition: background var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .scroll__arrow {
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-top: 0.375rem solid var(--token-interactive-color);
    animation: arrowBounce var(--token-motion-duration-pulse) ease-in-out infinite 0.5s;
    transition: border-top-color var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .scroll__text {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    opacity: var(--token-opacity-default);
    color: var(--token-attention-color);
    line-height: var(--token-line-height-snug);
    transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (hover: hover) {
      .scroll__indicator:hover & {
        opacity: 1;
      }
    }
  }

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

  @keyframes cardReveal {
    from {
      opacity: 0;
      transform: translateY(1.5rem) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes backgroundGlow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes frameRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes avatarPulse {
    from {
      opacity: var(--token-opacity-ring-hover);
      transform: scale(1);
    }
    to {
      opacity: var(--token-opacity-default);
      transform: scale(1.02);
    }
  }

  @keyframes ringRotate1 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ringRotate2 {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  @keyframes ringRotate3 {
    from {
      transform: rotate(0deg);
    }
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
    from {
      width: 0;
    }
    to {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }
  }

  @keyframes statusReveal {
    from {
      opacity: 0;
      transform: translateY(1rem) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes statusPulse {
    0%,
    100% {
      opacity: var(--token-opacity-medium);
      transform: scale(1);
      box-shadow: 0 0 10px var(--token-attention-glow);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 0 20px var(--token-state-hover-glow);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes valueReveal {
    from {
      opacity: 0;
      transform: translateY(1.5rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes actionsReveal {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes statsReveal {
    from {
      opacity: 0;
      transform: translateY(1.5rem) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
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

  @keyframes techReveal {
    from {
      opacity: 0;
      transform: translateY(1.5rem) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes categoryReveal {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(1rem);
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

  @keyframes mouseFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.25rem);
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
      opacity: var(--token-opacity-default);
    }
    50% {
      transform: translateY(0.25rem);
      opacity: 1;
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

    .profile__accent {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }

    .btn:hover,
    .stat:hover,
    .tech__category:hover,
    .avatar:hover {
      transform: none;
    }

    .avatar__rings {
      display: none;
    }
  }

  @media (prefers-contrast: high) {
    .stats,
    .stat,
    .tech,
    .tech__category {
      border-width: 2px;
      border-color: currentColor;
      background: var(--token-text-inverse);
    }

    .btn--primary {
      border: var(--token-border-neutral-large);
      background: var(--token-text-primary);
      color: var(--token-text-inverse);
    }

    .btn--secondary {
      border-width: 2px;
      border-color: currentColor;
    }

    .profile__name,
    .value__headline,
    .stat__number {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }

    .mastery__indicator {
      border: 2px solid currentColor;
    }
  }

  @media print {
    .hero {
      min-height: auto;
      height: auto;
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .hero__actions,
    .avatar__glow,
    .avatar__rings,
    .scroll__indicator {
      display: none;
    }

    .hero__container {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }

    .profile__name {
      font-size: var(--token-font-size-4xl);
      page-break-after: avoid;
      color: black;
      -webkit-text-fill-color: black;
    }

    .value__headline {
      font-size: var(--token-font-size-2xl);
      page-break-after: avoid;
      color: black;
    }

    .value__description {
      font-size: var(--token-font-size-base);
      line-height: var(--token-line-height-loose);
      color: black;
    }

    .stats__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .tech__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .hero,
  .hero__canvas,
  .avatar,
  .btn,
  .stat,
  .tech__category {
    will-change: transform;
  }

  .avatar__glow,
  .ring {
    will-change: transform, opacity;
  }

  .profile__name {
    will-change: background-position;
  }

  @media (hover: none) {
    .avatar__rings {
      display: none;
    }

    .btn,
    .stat,
    .tech__category {
      will-change: auto;
    }
  }
</style>
