<script lang="ts">
  import { tick, onDestroy, onMount } from 'svelte';
  import Card from '$lib/components/primitives/surfaces/Card';
  import ToneDot from '$lib/components/primitives/status/ToneDot';

  type Props = {
    title: string;
    level: 'expert' | 'advanced';
    technologies?: string[];
    onclick?: (event: MouseEvent) => void;
  };

  let { title, level, technologies = [], onclick }: Props = $props();

  let tagsContainer: HTMLElement | undefined = $state();
  let resizeObserver: ResizeObserver | undefined;
  let measuredTags = $state<{ visible: string[]; overflow: number } | undefined>();
  const visibleTags = $derived(measuredTags ?? { visible: technologies, overflow: 0 });

  const getVisibleTags = () => {
    if (!technologies.length || !tagsContainer) {
      return { visible: technologies, overflow: 0 };
    }

    const clone = tagsContainer.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: 'absolute',
      visibility: 'hidden',
      top: '-9999px',
      width: getComputedStyle(tagsContainer).width,
    });
    document.body.appendChild(clone);

    try {
      clone.innerHTML = '';
      const testTag = document.createElement('span');
      testTag.className = 'tech-tag';
      testTag.textContent = technologies[0];
      clone.appendChild(testTag);
      const singleLineHeight = clone.offsetHeight;
      const maxHeight = singleLineHeight * 2;

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

  const recomputeVisibleTags = async () => {
    await tick();
    measuredTags = getVisibleTags();
  };

  $effect(() => {
    if (tagsContainer) {
      recomputeVisibleTags();
    }
  });

  onMount(() => {
    if (!tagsContainer) return;
    resizeObserver = new ResizeObserver(recomputeVisibleTags);
    resizeObserver.observe(tagsContainer);
    recomputeVisibleTags();
  });

  onDestroy(() => resizeObserver?.disconnect());
</script>

<Card
  as="button"
  className="tech-category"
  aria-label="Explore {title} technologies at {level} level"
  type="button"
  {onclick}
>
  <div class="category-header">
    <span class="category-title">{title}</span>
    <ToneDot tone="interactive" className="mastery-indicator" />
  </div>

  <div class="category-tags" bind:this={tagsContainer}>
    {#each visibleTags.visible as tech (tech)}
      <span class="tech-tag">{tech}</span>
    {/each}
    {#if visibleTags.overflow > 0}
      <span class="tech-tag tech-tag--overflow">+{visibleTags.overflow}</span>
    {/if}
  </div>
</Card>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  :global(.tech-category) {
    --card-background: var(--token-surface-glass-strong);
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-md);
    --card-hover-transform: translateY(-4px) scale(1.02);

    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-md);
    text-align: left;

    @include motion.fade-in-up(fadeInUp, 30px, 0.6s);

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

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-xl);
    }
  }

  :global(.tech-category:hover) .category-title {
    color: var(--token-text-heading);
  }

  :global(.tech-category:hover) .tech-tag {
    background: var(--token-surface-glass-strong);
    color: var(--token-text-primary);
    transform: scale(1.05);
  }

  :global(.tech-category:hover .mastery-indicator) {
    transform: scale(1.3);
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

  :global(.mastery-indicator) {
    --tone-dot-size: var(--token-size-4);

    flex-shrink: 0;
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
</style>
