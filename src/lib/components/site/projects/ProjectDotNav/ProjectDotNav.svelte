<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';
  import {
    getProjectKey,
    type ProjectModel,
    type ProjectSelectMetadata,
  } from '$lib/components/site/projects/types';

  type Props = {
    projects: ProjectModel[];
    activeIndex: number;
    visible?: boolean;
    position?: 'top' | 'bottom';
    mediaReady?: boolean;
    onSelectRequested?: (index: number, metadata: ProjectSelectMetadata) => void;
  };

  let {
    projects,
    activeIndex,
    visible = true,
    position = 'top',
    mediaReady = true,
    onSelectRequested,
  }: Props = $props();
</script>

<div
  class="project-dot-nav"
  data-position={position}
  data-state={visible ? 'visible' : 'hidden'}
  role="navigation"
  aria-label="Quick project navigation"
  aria-hidden={!visible}
>
  {#each projects as project, index (getProjectKey(project))}
    <button
      type="button"
      class="project-dot-nav__item"
      data-state={index === activeIndex ? 'selected' : 'idle'}
      onclick={() => onSelectRequested?.(index, { cause: 'pointer' })}
      aria-label="View {project.name}"
      aria-current={index === activeIndex ? 'true' : undefined}
      tabindex={visible ? 0 : -1}
      disabled={!visible}
    >
      <span class="project-dot-nav__avatar" aria-hidden="true">
        {#if mediaReady}
          <Image
            src={project.bannerSrc}
            alt=""
            sizes="48px"
            width={48}
            height={48}
            loading="lazy"
          />
        {/if}
      </span>
    </button>
  {/each}
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .project-dot-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-md);
    inline-size: fit-content;
    padding: var(--token-space-fluid-sm);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-2xl);
    background: var(--token-surface-glass-medium);
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(var(--token-blur-md));
    transition:
      opacity 0.4s var(--token-motion-ease-out),
      transform 0.4s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-lg);
      padding: var(--token-space-fluid-md);
    }
  }

  .project-dot-nav[data-position='top'] {
    transform: translateY(-8px);
  }

  .project-dot-nav[data-position='bottom'] {
    transform: translateY(8px);
  }

  .project-dot-nav[data-state='visible'] {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .project-dot-nav__item {
    flex-shrink: 0;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    padding: 2px;
    border: 2px solid var(--token-border-color-neutral);
    border-radius: var(--token-radius-full);
    background: var(--token-surface-color);
    cursor: pointer;
    box-shadow: var(--token-shadow-default);
    transition:
      border-color 0.3s var(--token-motion-ease-out),
      box-shadow 0.3s var(--token-motion-ease-out),
      transform 0.3s var(--token-motion-ease-out);

    &:hover:not(:disabled) {
      border-color: var(--token-interactive-color);
      box-shadow: var(
        --project-dot-nav-hover-shadow,
        0 0 var(--token-blur-md) var(--token-interactive-glow)
      );
      transform: scale(1.1);
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    &:disabled {
      cursor: default;
    }

    @media (min-width: $breakpoint-md) {
      inline-size: 3rem;
      block-size: 3rem;
    }
  }

  .project-dot-nav__item[data-state='selected'] {
    border-color: var(--token-interactive-color);
    box-shadow: var(
      --project-dot-nav-selected-shadow,
      0 0 var(--token-blur-lg) var(--token-interactive-glow)
    );
    transform: scale(1.2);
  }

  .project-dot-nav__avatar {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: var(--token-radius-full);
    overflow: hidden;

    :global(img) {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-dot-nav,
    .project-dot-nav__item {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .project-dot-nav,
    .project-dot-nav__item {
      border-color: CanvasText;
      border-width: 2px;
    }
  }
</style>
