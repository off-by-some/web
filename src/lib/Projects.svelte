<script lang="ts">
  import { onMount } from 'svelte';
  import VisuallyHidden from './components/primitives/accessibility/VisuallyHidden';
  import Section from './components/primitives/layout/Section';
  import { preloadImageSources } from './components/primitives/media/Image/image-path';
  import {
    ProjectCard,
    ProjectDotNav,
    ProjectTabList,
    getProjectKey,
    projectPanelId,
    projectTabId,
    type ProjectModel,
    type ProjectSelectMetadata,
  } from './components/site/projects';
  import SectionHeader from './components/site/section-headings/SectionHeader';

  type Props = {
    projects: ProjectModel[];
    title?: string;
    subtitle?: string;
    mediaPrefetchDistance?: number;
  };

  let {
    projects,
    title = 'Projects',
    subtitle = '',
    mediaPrefetchDistance = 1000,
  }: Props = $props();

  let activeIndex = $state(0);
  let topDotsElement: HTMLElement | undefined = $state();
  let bottomDotsElement: HTMLElement | undefined = $state();
  let projectsElement: HTMLElement | undefined = $state();
  let topDotsVisible = $state(true);
  let bottomDotsVisible = $state(false);
  let mediaReady = $state(false);
  let announcementText = $state('');

  const activeProject = $derived(projects[activeIndex]);

  function shouldPrefetchBanners(): boolean {
    const connection = window.navigator as Navigator & {
      connection?: { saveData?: boolean };
    };

    return connection.connection?.saveData !== true;
  }

  function scheduleBannerPrefetch(): () => void {
    if (!projectsElement) return () => {};

    if (typeof window.IntersectionObserver !== 'function') {
      mediaReady = true;
      return () => {};
    }

    const bannerSources = projects.map((project) => project.bannerSrc).filter(Boolean);

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const run = () => {
      if (cancelled) return;
      void preloadImageSources(bannerSources, 800);
    };

    const schedule = () => {
      mediaReady = true;

      if (!shouldPrefetchBanners() || bannerSources.length === 0) return;

      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(run, { timeout: 2000 });
        return;
      }

      timeoutHandle = window.setTimeout(run, 900);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        schedule();
      },
      {
        rootMargin: `${Math.max(0, Math.round(mediaPrefetchDistance))}px 0px ${Math.max(0, Math.round(mediaPrefetchDistance))}px 0px`,
      },
    );

    observer.observe(projectsElement);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }

  onMount(() => {
    const observers: IntersectionObserver[] = [];
    const earlyTriggerPx = 50;
    const cancelBannerPrefetch = scheduleBannerPrefetch();

    if (topDotsElement) {
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

  const selectProject = (index: number) => {
    if (index === activeIndex) return;

    activeIndex = index;
    announcementText = `Now showing ${projects[index].name}`;
  };

  const handleProjectSelectRequested = (index: number, _metadata?: ProjectSelectMetadata) => {
    selectProject(index);
  };
</script>

<section
  class="projects"
  id="projects"
  aria-labelledby="projects-heading"
  bind:this={projectsElement}
>
  <VisuallyHidden as="div" role="status" aria-live="polite" aria-atomic="true">
    {announcementText}
  </VisuallyHidden>

  <Section className="projects__container">
    <div class="projects__header">
      <SectionHeader {title} {subtitle} titleId="projects-heading" />
    </div>

    <div class="projects__dot-rail projects__dot-rail--top" bind:this={topDotsElement}>
      <ProjectDotNav
        {projects}
        {activeIndex}
        visible={topDotsVisible}
        position="top"
        {mediaReady}
        onSelectRequested={selectProject}
      />
    </div>

    <div class="projects__layout">
      <div class="projects__nav">
        <ProjectTabList {projects} {activeIndex} onSelectRequested={handleProjectSelectRequested} />
      </div>

      {#if activeProject}
        {#key getProjectKey(activeProject)}
          <div
            class="projects__panel"
            role="tabpanel"
            id={projectPanelId(activeProject)}
            aria-labelledby={projectTabId(activeProject)}
            tabindex="0"
          >
            <ProjectCard project={activeProject} {mediaReady} />
          </div>
        {/key}
      {/if}
    </div>

    <div class="projects__dot-rail projects__dot-rail--bottom" bind:this={bottomDotsElement}>
      <ProjectDotNav
        {projects}
        {activeIndex}
        visible={bottomDotsVisible}
        position="bottom"
        {mediaReady}
        onSelectRequested={selectProject}
      />
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .projects {
    position: relative;
    overflow: hidden;
    padding-block: var(--token-reference-spacing-fluid-6xl);
    background: var(--token-feature-projects-background);
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
      opacity: 0.3;
      pointer-events: none;
    }
  }

  :global(.projects__container) {
    position: relative;
    z-index: 1;
    margin-inline: auto;
    padding-inline: var(--token-reference-spacing-fluid-lg);

    @media (min-width: $breakpoint-md) {
      padding-inline: var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      padding-inline: var(--token-reference-spacing-fluid-2xl);
    }
  }

  .projects__layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--token-reference-spacing-fluid-xl);
    overflow: visible;

    @include motion.fade-in-up(
      projectsSectionEnter,
      30px,
      var(--token-reference-motion-duration-entrance),
      var(--token-reference-motion-delay-short)
    );

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: minmax(16rem, 24%) minmax(0, 1fr);
      align-items: start;
      gap: var(--token-reference-spacing-fluid-3xl);
    }
  }

  .projects__header {
    margin-block-end: var(--token-reference-spacing-fluid-5xl);
  }

  .projects__nav {
    display: none;

    @media (min-width: $breakpoint-lg) {
      position: sticky;
      inset-block-start: var(--token-reference-spacing-fluid-2xl);
      display: block;
      min-inline-size: 0;
      overflow: visible;
    }
  }

  .projects__panel {
    min-inline-size: 0;

    &:focus-visible {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-lg);
      border-radius: var(--token-reference-radius-xl);
    }
  }

  .projects__dot-rail {
    display: grid;
    justify-items: center;

    @media (min-width: $breakpoint-lg) {
      display: none;
    }
  }

  .projects__dot-rail--top {
    @media (max-width: calc($breakpoint-lg - 1px)) {
      margin-block-end: var(--token-reference-spacing-fluid-xl);
    }
  }

  .projects__dot-rail--bottom {
    @media (max-width: calc($breakpoint-lg - 1px)) {
      margin-block-start: var(--token-reference-spacing-fluid-xl);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .projects__layout {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media print {
    .projects {
      padding: var(--token-reference-spacing-fluid-lg);
      background: Canvas;
      color: CanvasText;
    }

    .projects__nav,
    .projects__dot-rail {
      display: none;
    }
  }
</style>
