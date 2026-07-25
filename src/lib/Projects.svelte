<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Section from './components/primitives/layout/Section';
  import Card from './components/primitives/surfaces/Card';
  import Button from './components/primitives/actions/Button';
  import Image from './components/primitives/media/Image';
  import { preloadImageSources } from './components/primitives/media/Image/image-path';
  import ToneDot from './components/primitives/status/ToneDot';
  import SectionHeader from './components/site/section-headings/SectionHeader';

  interface ProjectHighlight {
    label: string;
    detail: string;
  }

  interface ProjectBadge {
    label: string;
    imageSrc: string;
    href?: string;
  }

  interface ProjectSecondaryLink {
    label: string;
    href: string;
    icon: 'docs' | 'dockerhub' | 'storybook';
  }

  interface Project {
    name: string;
    tagline: string;
    description: string[];
    bannerSrc: string;
    href: string;
    tags: string[];
    highlights?: ProjectHighlight[];
    badges?: ProjectBadge[];
    secondaryLink?: ProjectSecondaryLink;
  }

  type Props = {
    projects: Project[];
    title?: string;
    subtitle?: string;
  };

  let { projects, title = 'Projects', subtitle = '' }: Props = $props();

  let activeIndex = $state(0);
  let tablistElement: HTMLElement | undefined = $state();
  let topDotsElement: HTMLElement | undefined = $state();
  let bottomDotsElement: HTMLElement | undefined = $state();
  let topDotsVisible = $state(true);
  let bottomDotsVisible = $state(false);
  let announcementText = $state('');

  const activeProject = $derived(projects[activeIndex]);

  function shouldPrefetchBanners(): boolean {
    const userAgent = window.navigator.userAgent;
    const connection = window.navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    return (
      !window.navigator.webdriver &&
      !userAgent.includes('Chrome-Lighthouse') &&
      connection.connection?.saveData !== true
    );
  }

  function scheduleBannerPrefetch(): () => void {
    if (!shouldPrefetchBanners()) return () => {};

    const bannerSources = projects.map((project) => project.bannerSrc).filter(Boolean);
    if (bannerSources.length === 0) return () => {};

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      void preloadImageSources(bannerSources, 800);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(run, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(handle);
      };
    }

    const handle = window.setTimeout(run, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }

  onMount(() => {
    const observers: IntersectionObserver[] = [];
    const earlyTriggerPx = 50;
    const cancelBannerPrefetch = scheduleBannerPrefetch();

    if (topDotsElement) {
      // Shrinks the root's top edge inward, so this flips to "not
      // intersecting" while the rail still has 50px left inside the
      // viewport — it fades out before it's fully scrolled away.
      const topObserver = new IntersectionObserver(
        ([entry]) => {
          topDotsVisible = entry.isIntersecting;
        },
        { rootMargin: `-${earlyTriggerPx}px 0px 0px 0px` },
      );
      topObserver.observe(topDotsElement);
      observers.push(topObserver);
    }

    if (bottomDotsElement) {
      // Grows the root's bottom edge outward, so this flips to
      // "intersecting" while the rail is still 50px below the viewport —
      // it fades in before it's technically on-screen.
      const bottomObserver = new IntersectionObserver(
        ([entry]) => {
          bottomDotsVisible = entry.isIntersecting;
        },
        { rootMargin: `0px 0px ${earlyTriggerPx}px 0px` },
      );
      bottomObserver.observe(bottomDotsElement);
      observers.push(bottomObserver);
    }

    return () => {
      cancelBannerPrefetch();
      observers.forEach((observer) => observer.disconnect());
    };
  });

  const focusTab = async (index: number) => {
    await tick();
    tablistElement?.querySelector<HTMLElement>(`[data-tab-index="${index}"]`)?.focus();
  };

  const selectProject = (index: number, focus: boolean = false) => {
    if (index === activeIndex) return;

    activeIndex = index;
    announcementText = `Now showing ${projects[index].name}`;

    if (focus) focusTab(index);
  };

  const handleTablistKeydown = (event: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      ArrowDown: () => selectProject(Math.min(activeIndex + 1, projects.length - 1), true),
      ArrowUp: () => selectProject(Math.max(activeIndex - 1, 0), true),
      Home: () => selectProject(0, true),
      End: () => selectProject(projects.length - 1, true),
    };

    if (actions[event.key]) {
      event.preventDefault();
      actions[event.key]();
    }
  };
</script>

{#snippet projectDots(visible: boolean)}
  {#each projects as project, index (project.name)}
    <button
      type="button"
      class="project-dots__dot"
      class:project-dots__dot--active={index === activeIndex}
      onclick={() => selectProject(index)}
      aria-label="View {project.name}"
      aria-current={index === activeIndex ? 'true' : undefined}
      tabindex={visible ? 0 : -1}
      disabled={!visible}
    >
      <span class="project-dots__dot-avatar">
        <Image src={project.bannerSrc} alt="" sizes="48px" width={48} height={48} loading="lazy" />
      </span>
    </button>
  {/each}
{/snippet}

<section class="projects" id="projects" aria-labelledby="projects-heading">
  <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </div>

  <Section className="projects__container">
    <SectionHeader {title} {subtitle} titleId="projects-heading" />

    <div
      class="project-dots project-dots--top"
      class:project-dots--visible={topDotsVisible}
      bind:this={topDotsElement}
      role="navigation"
      aria-label="Quick project navigation"
      aria-hidden={!topDotsVisible}
    >
      {@render projectDots(topDotsVisible)}
    </div>

    <div class="projects-layout">
      <div
        class="projects-nav"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Projects"
        tabindex="-1"
        bind:this={tablistElement}
        onkeydown={handleTablistKeydown}
      >
        {#each projects as project, index (project.name)}
          <button
            type="button"
            class="project-tab"
            class:project-tab--active={index === activeIndex}
            role="tab"
            id="project-tab-{index}"
            aria-selected={index === activeIndex}
            aria-controls="project-panel"
            tabindex={index === activeIndex ? 0 : -1}
            data-tab-index={index}
            onclick={() => selectProject(index)}
          >
            <span class="project-tab__marker" aria-hidden="true">
              <ToneDot
                tone="interactive"
                pulse={index === activeIndex}
                className="project-tab__dot {index === activeIndex ? '' : 'project-tab__dot--idle'}"
              />
            </span>
            <span class="project-tab__body">
              <span class="project-tab__name">{project.name}</span>
              <span class="project-tab__tagline">{project.tagline}</span>
            </span>
          </button>
        {/each}
      </div>

      {#key activeProject.name}
        <div
          class="project-panel"
          role="tabpanel"
          id="project-panel"
          aria-labelledby="project-tab-{activeIndex}"
          tabindex="0"
        >
          <Card as="article" className="project-card">
            <Card
              as="a"
              className="project-banner"
              href={activeProject.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open {activeProject.name} on GitHub"
            >
              <Image
                src={activeProject.bannerSrc}
                alt=""
                width={800}
                height={450}
                className="project-banner__image"
                loading="lazy"
                sizes="(max-width: 1376px) 100vw, 640px"
              />
            </Card>

            {#if activeProject.badges?.length}
              <div class="project-badges">
                {#each activeProject.badges as badge (badge.label)}
                  {#if badge.href}
                    <!-- eslint-disable svelte/no-navigation-without-resolve -->
                    <a
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="project-badge-link"
                    >
                      <img
                        src={badge.imageSrc}
                        alt={badge.label}
                        class="project-badge"
                        loading="lazy"
                        width="110"
                        height="20"
                      />
                    </a>
                    <!-- eslint-enable svelte/no-navigation-without-resolve -->
                  {:else}
                    <img
                      src={badge.imageSrc}
                      alt={badge.label}
                      class="project-badge"
                      loading="lazy"
                      width="110"
                      height="20"
                    />
                  {/if}
                {/each}
              </div>
            {/if}

            <div class="project-content">
              <h3 class="project-title">{activeProject.name}</h3>
              <p class="project-tagline">{activeProject.tagline}</p>

              {#each activeProject.description as paragraph, i (i)}
                <p class="project-description">{paragraph}</p>
              {/each}

              {#if activeProject.highlights?.length}
                <Card className="project-highlights">
                  <ul class="project-highlights__list">
                    {#each activeProject.highlights as highlight (highlight.label)}
                      <li class="project-highlights__item">
                        <span class="project-highlights__label">{highlight.label}</span>
                        {highlight.detail}
                      </li>
                    {/each}
                  </ul>
                </Card>
              {/if}

              <div class="project-tags">
                {#each activeProject.tags as tag (tag)}
                  <span class="project-tag">{tag}</span>
                {/each}
              </div>

              <div class="project-actions">
                <Button
                  as="a"
                  href={activeProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  <svg
                    class="project-actions__icon"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  View on GitHub
                </Button>

                {#if activeProject.secondaryLink}
                  <Button
                    as="a"
                    href={activeProject.secondaryLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    {#if activeProject.secondaryLink.icon === 'docs'}
                      <svg
                        class="project-actions__icon"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 2v5h5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <line
                          x1="8"
                          y1="13"
                          x2="16"
                          y2="13"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <line
                          x1="8"
                          y1="17"
                          x2="16"
                          y2="17"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    {:else if activeProject.secondaryLink.icon === 'dockerhub'}
                      <svg
                        class="project-actions__icon"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 3v9M12 12l8-4.5M12 12l-8-4.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linejoin="round"
                        />
                      </svg>
                    {:else if activeProject.secondaryLink.icon === 'storybook'}
                      <svg
                        class="project-actions__icon"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="8"
                          height="8"
                          rx="1.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <rect
                          x="13"
                          y="3"
                          width="8"
                          height="8"
                          rx="1.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <rect
                          x="3"
                          y="13"
                          width="8"
                          height="8"
                          rx="1.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                        <rect
                          x="13"
                          y="13"
                          width="8"
                          height="8"
                          rx="1.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                      </svg>
                    {/if}
                    {activeProject.secondaryLink.label}
                  </Button>
                {/if}
              </div>
            </div>
          </Card>
        </div>
      {/key}
    </div>

    <div
      class="project-dots project-dots--bottom"
      class:project-dots--visible={bottomDotsVisible}
      bind:this={bottomDotsElement}
      role="navigation"
      aria-label="Quick project navigation"
      aria-hidden={!bottomDotsVisible}
    >
      {@render projectDots(bottomDotsVisible)}
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

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

  .projects {
    position: relative;
    background: var(--token-gradients-projects);
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

  :global(.projects__container) {
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

  .projects-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--token-space-fluid-xl);
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.2s both;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: minmax(16rem, 24%) 1fr;
      align-items: start;
      gap: var(--token-space-fluid-3xl);
    }
  }

  // Tab rail — desktop only; mobile relies on .project-dots instead
  .projects-nav {
    display: none;

    @media (min-width: $breakpoint-lg) {
      display: flex;
      flex-direction: column;
      gap: var(--token-space-fluid-sm);
      position: sticky;
      top: var(--token-space-fluid-2xl);
    }
  }

  .project-tab {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-md);
    text-align: left;
    background: var(--token-surface-glass-subtle);
    border: var(--token-border-default-small);
    border-left: 2px solid transparent;
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    cursor: pointer;
    transition:
      background 0.3s var(--token-motion-ease-out),
      border-color 0.3s var(--token-motion-ease-out),
      transform 0.3s var(--token-motion-ease-out);

    &:hover {
      background: var(--token-surface-glass-light);
      transform: translateX(2px);
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
    }
  }

  .project-tab--active {
    background: var(--token-surface-glass-medium);
    border-color: var(--token-interactive-color);
    box-shadow: 0 0 20px var(--token-interactive-glow);

    .project-tab__name {
      color: var(--token-text-heading);
    }
  }

  .project-tab__marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--token-size-3);
    flex-shrink: 0;
  }

  :global(.project-tab__dot) {
    --tone-dot-size: var(--token-size-3);
    --tone-dot-glow-size: 6px;

    transition:
      opacity var(--token-motion-duration-normal) var(--token-motion-ease-out),
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  :global(.project-tab__dot--idle) {
    opacity: 0.35;
  }

  .project-tab__body {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-1);
    min-width: 0;
  }

  .project-tab__name {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    transition: color 0.3s var(--token-motion-ease-out);
  }

  .project-tab__tagline {
    font-size: var(--token-font-size-sm);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-snug);
  }

  // Detail panel
  .project-panel {
    min-width: 0;

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-xl);
    }
  }

  :global(.project-card) {
    --card-padding: var(--token-space-fluid-xl);
    --card-hover-transform: none;

    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-xl);
    text-align: left;

    @include motion.fade-in-up(projectPanelIn, 14px, 0.45s);

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      --card-padding: var(--token-space-fluid-3xl);
    }
  }

  :global(.project-banner) {
    --card-background: var(--token-surface-glass-medium);
    --card-padding: var(--token-space-fluid-xl);
    --card-hover-transform: scale(1.008);
    --card-hover-iridescent-opacity: 0.6;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    // Reserved so switching projects can't collapse-then-pop as a fresh
    // external banner image loads — matches .project-banner__image's max-height.
    min-height: 11rem;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-2xl);
      min-height: 14rem;
    }

    @media (min-width: $breakpoint-lg) {
      min-height: 17rem;
    }
  }

  :global(.project-banner__image) {
    max-width: 100%;
    max-height: 11rem;
    width: auto;
    height: auto;
    object-fit: contain;

    @media (min-width: $breakpoint-md) {
      max-height: 14rem;
    }

    @media (min-width: $breakpoint-lg) {
      max-height: 17rem;
    }
  }

  // Status badges — real shields.io images pulled straight from each
  // project's own README, not recreated as internal chips.
  .project-badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-2) var(--token-space-3);
  }

  .project-badge-link {
    display: flex;
    transition: transform 0.3s var(--token-motion-ease-out);

    &:hover {
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-xs);
    }
  }

  .project-badge {
    display: block;
    height: 1.25rem;
    width: auto;
  }

  .project-content {
    min-width: 0;
    flex: 1;
  }

  .project-title {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    line-height: var(--token-line-height-snug);
    margin-bottom: var(--token-space-fluid-xs);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-3xl);
    }
  }

  .project-tagline {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-emphasis-default);
    margin-bottom: var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .project-description {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin-bottom: var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  :global(.project-highlights) {
    --card-background: var(--token-surface-glass-strong);
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-lg);
    --card-hover-transform: none;
    --card-hover-iridescent-opacity: 0.3;

    margin-bottom: var(--token-space-fluid-lg);
  }

  .project-highlights__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-sm);
  }

  .project-highlights__item {
    font-size: var(--token-font-size-sm);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .project-highlights__label {
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    font-family: var(--token-font-family-mono, monospace);
    margin-right: var(--token-space-2);
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-2);
    margin-bottom: var(--token-space-fluid-xl);
  }

  .project-tag {
    padding: var(--token-space-1) var(--token-space-3);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }
  }

  .project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-md);
  }

  .project-actions__icon {
    flex-shrink: 0;
  }

  // Mobile dot navigation — a static rail above the projects that fades out
  // once scrolled past, and a twin that fades in beneath the panel once its
  // bottom comes into view, so you can jump between projects either way
  // without scrolling back up to the tab list. Mirrors Testimonials'
  // .floating-nav__dots, minus the fixed positioning (this section is short
  // enough not to need a persistent sticky control).
  .project-dots {
    display: none;

    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--token-space-fluid-md);
      width: fit-content;
      margin: 0 auto;
      padding: var(--token-space-fluid-sm);
      background: var(--token-surface-glass-medium);
      border: var(--token-border-default-small);
      border-radius: var(--token-radius-2xl);
      backdrop-filter: blur(var(--token-blur-md));
      opacity: 0;
      pointer-events: none;
      transition:
        opacity 0.4s var(--token-motion-ease-out),
        transform 0.4s var(--token-motion-ease-out);
    }

    @media (min-width: $breakpoint-md) and (max-width: calc($breakpoint-lg - 1px)) {
      gap: var(--token-space-fluid-lg);
      padding: var(--token-space-fluid-md);
    }
  }

  // Slide in from the direction each rail sits relative to the content —
  // top drops down into place, bottom rises up — so the fade reads as
  // arriving from off-screen rather than just materializing.
  .project-dots--top {
    @media (max-width: calc($breakpoint-lg - 1px)) {
      margin-bottom: var(--token-space-fluid-xl);
      transform: translateY(-8px);
    }
  }

  .project-dots--bottom {
    @media (max-width: calc($breakpoint-lg - 1px)) {
      margin-top: var(--token-space-fluid-xl);
      transform: translateY(8px);
    }
  }

  .project-dots--visible {
    @media (max-width: calc($breakpoint-lg - 1px)) {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }

  .project-dots__dot {
    width: 2.75rem;
    height: 2.75rem;
    flex-shrink: 0;
    border-radius: var(--token-radius-full);
    border: 2px solid var(--token-border-color-neutral);
    background: var(--token-surface-color);
    padding: 2px;
    cursor: pointer;
    box-shadow: var(--token-shadow-default);
    transition: all 0.3s var(--token-motion-ease-out);

    &:hover {
      transform: scale(1.1);
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 15px var(--token-interactive-glow);
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    @media (min-width: $breakpoint-md) {
      width: 3rem;
      height: 3rem;
    }
  }

  .project-dots__dot--active {
    border-color: var(--token-interactive-color);
    box-shadow: 0 0 25px var(--token-interactive-glow);
    transform: scale(1.2);
  }

  .project-dots__dot-avatar {
    display: block;
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

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .projects-layout {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .project-tab,
    .project-dots,
    .project-dots__dot,
    .project-badge-link {
      transition: none;
    }
  }

  @media (prefers-contrast: high) {
    .project-tab,
    .project-dots,
    :global(.project-card),
    :global(.project-banner),
    :global(.project-highlights) {
      border-width: 2px;
      border-color: currentColor;
    }
  }

  @media print {
    .projects {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .projects-nav,
    .project-dots {
      display: none;
    }

    .project-actions {
      display: none;
    }
  }

  @include motion.reduced-motion-reset(':global(.project-card)');
</style>
