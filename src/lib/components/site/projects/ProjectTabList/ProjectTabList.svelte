<script lang="ts">
  import ToneDot from '$lib/components/primitives/status/ToneDot';
  import {
    getProjectKey,
    projectPanelId,
    projectTabId,
    type ProjectModel,
    type ProjectSelectMetadata,
  } from '$lib/components/site/projects/types';

  type Props = {
    projects: ProjectModel[];
    activeIndex: number;
    onSelectRequested?: (index: number, metadata: ProjectSelectMetadata) => void;
  };

  let { projects, activeIndex, onSelectRequested }: Props = $props();
  let tablistElement: HTMLElement | undefined = $state();

  const focusTab = (index: number) => {
    requestAnimationFrame(() => {
      tablistElement?.querySelector<HTMLElement>(`[data-tab-index="${index}"]`)?.focus();
    });
  };

  const requestSelection = (index: number, metadata: ProjectSelectMetadata) => {
    onSelectRequested?.(index, metadata);
    if (metadata.cause === 'keyboard') focusTab(index);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (projects.length === 0) return;

    const lastIndex = projects.length - 1;
    const actions: Record<string, () => void> = {
      ArrowDown: () =>
        requestSelection(Math.min(activeIndex + 1, lastIndex), { cause: 'keyboard' }),
      ArrowUp: () => requestSelection(Math.max(activeIndex - 1, 0), { cause: 'keyboard' }),
      Home: () => requestSelection(0, { cause: 'keyboard' }),
      End: () => requestSelection(lastIndex, { cause: 'keyboard' }),
    };

    const action = actions[event.key];
    if (!action) return;

    event.preventDefault();
    action();
  };
</script>

<div
  class="project-tab-list"
  role="tablist"
  aria-orientation="vertical"
  aria-label="Projects"
  tabindex="-1"
  bind:this={tablistElement}
  onkeydown={handleKeydown}
>
  {#each projects as project, index (getProjectKey(project))}
    <button
      type="button"
      class="project-tab-list__item"
      data-state={index === activeIndex ? 'selected' : 'idle'}
      role="tab"
      id={projectTabId(project)}
      aria-selected={index === activeIndex}
      aria-controls={projectPanelId(project)}
      tabindex={index === activeIndex ? 0 : -1}
      data-tab-index={index}
      onclick={() => requestSelection(index, { cause: 'pointer' })}
    >
      <span class="project-tab-list__marker" aria-hidden="true">
        <ToneDot
          tone="interactive"
          pulse={index === activeIndex}
          className="project-tab-list__dot {index === activeIndex
            ? ''
            : 'project-tab-list__dot--idle'}"
        />
      </span>
      <span class="project-tab-list__body">
        <span class="project-tab-list__name">{project.name}</span>
        <span class="project-tab-list__tagline">{project.tagline}</span>
      </span>
    </button>
  {/each}
</div>

<style lang="scss">
  .project-tab-list {
    --project-tab-list-paint-bleed: var(--token-space-2);
    --project-tab-accent-color: transparent;
    --project-tab-shadow: 0 0 0 transparent;

    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-sm);
    inline-size: 100%;
    min-inline-size: 0;
    margin: calc(var(--project-tab-list-paint-bleed) * -1);
    padding: var(--project-tab-list-paint-bleed);
    overflow: visible;
  }

  .project-tab-list__item {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-md);
    inline-size: 100%;
    min-inline-size: 0;
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    background: var(--token-surface-glass-subtle);
    box-shadow:
      inset 2px 0 0 var(--project-tab-accent-color),
      var(--project-tab-shadow);
    color: inherit;
    cursor: pointer;
    text-align: start;
    transition:
      background var(--token-motion-delay-normal) var(--token-motion-ease-out),
      border-color var(--token-motion-delay-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-delay-normal) var(--token-motion-ease-out),
      transform var(--token-motion-delay-normal) var(--token-motion-ease-out);

    &:hover {
      background: var(--token-surface-glass-light);
      transform: translateX(2px);
    }

    &:focus-visible {
      outline: var(--token-focus-outline);
      outline-offset: var(--token-focus-offset-sm);
    }
  }

  .project-tab-list__item[data-state='selected'] {
    --project-tab-accent-color: var(--token-interactive-color);
    --project-tab-shadow: var(
      --project-tab-selected-shadow,
      0 0 var(--token-blur-md) var(--token-interactive-glow)
    );

    border-color: var(--token-interactive-color);
    background: var(--token-surface-glass-medium);

    .project-tab-list__name {
      color: var(--token-text-heading);
    }
  }

  .project-tab-list__marker {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    inline-size: var(--token-size-3);
  }

  :global(.project-tab-list__dot) {
    --tone-dot-size: var(--token-size-3);
    --tone-dot-glow-size: 6px;

    transition:
      opacity var(--token-motion-duration-normal) var(--token-motion-ease-out),
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  :global(.project-tab-list__dot--idle) {
    opacity: 0.35;
  }

  .project-tab-list__body {
    display: flex;
    min-inline-size: 0;
    flex-direction: column;
    gap: var(--token-space-1);
  }

  .project-tab-list__name {
    overflow-wrap: anywhere;
    color: var(--token-text-primary);
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .project-tab-list__tagline {
    color: var(--token-text-tertiary);
    font-size: var(--token-font-size-sm);
    line-height: var(--token-line-height-snug);
  }

  @media (prefers-reduced-motion: reduce) {
    .project-tab-list__item,
    :global(.project-tab-list__dot),
    .project-tab-list__name {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .project-tab-list__item {
      border-color: CanvasText;
      border-width: var(--token-border-size-large);
    }
  }
</style>
