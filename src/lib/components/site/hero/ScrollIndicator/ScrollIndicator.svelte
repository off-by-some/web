<script lang="ts">
  type Props = {
    text: string;
    ariaLabel?: string;
    onScrollRequested?: () => void;
  };

  let { text, ariaLabel = 'Lorem ipsum dolor sit amet', onScrollRequested }: Props = $props();

  const resolvedAriaLabel = $derived(
    ariaLabel.toLowerCase().includes(text.toLowerCase()) ? ariaLabel : `${text}, ${ariaLabel}`,
  );
</script>

<button
  class="scroll-indicator"
  onclick={() => onScrollRequested?.()}
  type="button"
  aria-label={resolvedAriaLabel}
>
  <span class="scroll-indicator__motion" aria-hidden="true">
    <span class="scroll-mouse">
      <span class="scroll-wheel"></span>
    </span>
    <span class="scroll-arrow"></span>
  </span>
  <span class="scroll-text">{text}</span>
</button>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .scroll-indicator {
    --scroll-indicator-gap: var(--token-reference-spacing-fluid-sm);
    --scroll-mouse-block-size: 1.75rem;
    --scroll-arrow-block-size: 0.375rem;
    --scroll-text-block-size: calc(
      var(--token-reference-typography-size-xs) * var(--token-reference-typography-line-height-snug)
    );

    position: absolute;
    inset-block-end: calc(var(--token-reference-spacing-fluid-2xl) + env(safe-area-inset-bottom));
    inset-inline-start: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--scroll-indicator-gap);
    inline-size: max-content;
    block-size: calc(
      var(--scroll-mouse-block-size) + var(--scroll-arrow-block-size) +
        var(--scroll-text-block-size) + (var(--scroll-indicator-gap) * 2)
    );
    background: none;
    border: none;
    color: var(--token-theme-color-attention-color);
    opacity: 0.74;
    cursor: pointer;
    contain: layout;
    z-index: 10;
    transition:
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);

    &:focus {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-lg);
      border-radius: var(--token-reference-radius-sm);
    }

    &:hover {
      opacity: 1;
      transform: translateX(-50%) scale(1.1);

      .scroll-mouse {
        border-color: var(--token-theme-color-attention-color);
        box-shadow: var(
          --scroll-indicator-hover-shadow,
          0 0 var(--token-reference-blur-md) var(--token-theme-color-attention-glow)
        );
      }

      .scroll-wheel {
        background: var(--token-theme-color-attention-color);
      }

      .scroll-arrow {
        border-block-start-color: var(--token-theme-color-attention-color);
      }
    }

    @media (max-height: 600px), (max-width: calc($breakpoint-sm - 1px)) {
      display: none;
    }
  }

  .scroll-indicator__motion {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--scroll-indicator-gap);
    animation: scrollFloat
      var(--scroll-indicator-duration, var(--token-theme-motion-feedback-pulse))
      var(--token-reference-motion-easing-standard) infinite;
    will-change: transform;
  }

  .scroll-mouse {
    inline-size: var(--token-reference-size-6);
    block-size: var(--scroll-mouse-block-size);
    border: var(--scroll-indicator-border-width, var(--token-reference-border-width-small)) solid
      color-mix(
        in srgb,
        var(--token-theme-color-interactive-color) 44%,
        var(--token-theme-color-border-default)
      );
    border-radius: var(--scroll-indicator-radius, var(--token-reference-radius-md));
    position: relative;
    background: var(--token-theme-color-surface-glass-medium);
    backdrop-filter: blur(var(--token-reference-blur-sm));
    transition:
      background-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      border-color var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      box-shadow var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
  }

  .scroll-wheel {
    position: absolute;
    inline-size: 1.5px;
    block-size: var(--token-reference-size-1);
    background: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color) 82%,
      var(--token-theme-color-text-primary)
    );
    inset-inline-start: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-reference-radius-full);
    animation: wheelScroll
      var(--scroll-indicator-duration, var(--token-theme-motion-feedback-pulse))
      var(--token-reference-motion-easing-standard) infinite;
    transition: background var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);
  }

  .scroll-arrow {
    inline-size: 0;
    block-size: var(--scroll-arrow-block-size);
    border-inline-start: 0.25rem solid transparent;
    border-inline-end: 0.25rem solid transparent;
    border-block-start: 0.375rem solid
      color-mix(
        in srgb,
        var(--token-theme-color-interactive-color) 78%,
        var(--token-theme-color-text-primary)
      );
    animation: arrowBounce
      var(--scroll-indicator-duration, var(--token-theme-motion-feedback-pulse))
      var(--token-reference-motion-easing-standard) infinite
      var(--scroll-indicator-arrow-delay, calc(var(--token-theme-motion-feedback-pulse) / 4));
    transition: border-block-start-color var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);
  }

  .scroll-text {
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--token-reference-typography-letter-spacing-extra-wide);
    color: color-mix(
      in srgb,
      var(--token-theme-color-attention-color) 78%,
      var(--token-theme-color-text-secondary)
    );
    line-height: var(--token-reference-typography-line-height-snug);
    block-size: var(--scroll-text-block-size);
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

  @media (prefers-reduced-motion: reduce) {
    .scroll-indicator__motion,
    .scroll-wheel,
    .scroll-arrow {
      animation: none;
    }
  }

  @media print {
    .scroll-indicator {
      display: none;
    }
  }
</style>
