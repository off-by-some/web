<script lang="ts">
  import { onDestroy } from 'svelte';
  import Card from '$lib/components/primitives/surfaces/Card';
  import { onVisible } from '$lib/components/primitives/behavior';

  type Props = {
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
    delay?: string;
  };

  let { count, label, type, delay = 'var(--token-motion-delay-none)' }: Props = $props();

  let numberElement: HTMLElement | undefined = $state();
  let hasAnimated = false;
  let displayedCount = $state('0');
  let lastCount = $state<string | undefined>();
  let animationFrame: number | undefined;

  const normalizeLabel = (value: string) =>
    value
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const displayLabel = $derived(normalizeLabel(label).split(' ').join('\n'));

  $effect(() => {
    if (lastCount === undefined) {
      lastCount = count;
      return;
    }

    if (count !== lastCount) {
      lastCount = count;
      hasAnimated = false;
      displayedCount = '0';
    }
  });

  const animateCounter = () => {
    const match = count.match(/^([\d.]+)(.*)$/);
    if (!match) {
      displayedCount = count;
      return;
    }

    if (hasAnimated || !numberElement) return;

    const [, numStr, suffix] = match;
    const num = parseFloat(numStr);
    const decimalPlaces = numStr.includes('.') && !isNaN(num) ? 2 : 0;
    const counterDuration = Number.parseFloat(
      getComputedStyle(numberElement).getPropertyValue('--stat-counter-duration'),
    );
    const duration = Number.isFinite(counterDuration) ? counterDuration : 2000;
    const startTime = performance.now();

    hasAnimated = true;

    const updateCounter = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easedProgress * num;

      displayedCount = currentValue.toFixed(decimalPlaces) + suffix;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
  };

  const counterVisibleOptions = { threshold: 0.5, onVisible: animateCounter };

  onDestroy(() => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
</script>

<Card className="stat-card" data-type={type} style="--stat-card-delay: {delay};">
  <div
    class="stat-number"
    data-count={count}
    bind:this={numberElement}
    use:onVisible={counterVisibleOptions}
  >
    {displayedCount}
  </div>
  <div class="stat-label">{displayLabel}</div>
</Card>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  :global(.stat-card) {
    --card-background: var(--token-surface-glass-strong);
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-md);
    --card-hover-transform: translateY(-4px) scale(1.02);
    --stat-counter-duration: var(--token-motion-duration-counter);

    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @include motion.fade-in-up(
      statReveal,
      20px,
      var(--token-motion-duration-narrative),
      var(--stat-card-delay),
      both,
      0.95
    );

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-xl);
    }
  }

  :global(.stat-card:hover) .stat-number {
    transform: scale(1.1);
    color: var(--token-text-heading);
  }

  :global(.stat-card:hover) .stat-label {
    color: var(--token-text-secondary);
  }

  .stat-number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-block-end: var(--token-space-2);
    color: var(--token-text-emphasis-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    transition:
      color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out);

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
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-base);
    }
  }

  @include motion.reduced-motion-reset(':global(.stat-card)');
</style>
