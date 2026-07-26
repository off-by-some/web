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
  <div class="scroll-mouse">
    <div class="scroll-wheel"></div>
  </div>
  <div class="scroll-arrow"></div>
  <span class="scroll-text">{text}</span>
</button>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .scroll-indicator {
    position: absolute;
    inset-block-end: var(--token-space-fluid-2xl);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: none;
    border: none;
    color: var(--token-attention-color);
    opacity: 0.74;
    cursor: pointer;
    animation: scrollFloat var(--scroll-indicator-duration, var(--token-motion-duration-pulse))
      var(--token-motion-ease-out) infinite;
    z-index: 10;
    transition:
      color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      opacity var(--token-motion-duration-normal) var(--token-motion-ease-out),
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out);

    &:focus {
      outline: var(--token-focus-outline);
      outline-offset: var(--token-focus-offset-lg);
      border-radius: var(--token-radius-sm);
    }

    &:hover {
      opacity: 1;
      transform: translateX(-50%) scale(1.1);

      .scroll-mouse {
        border-color: var(--token-attention-color);
        box-shadow: var(
          --scroll-indicator-hover-shadow,
          0 0 var(--token-blur-md) var(--token-attention-glow)
        );
      }

      .scroll-wheel {
        background: var(--token-attention-color);
      }

      .scroll-arrow {
        border-block-start-color: var(--token-attention-color);
      }
    }

    @media (max-height: 600px), (max-width: calc($breakpoint-sm - 1px)) {
      display: none;
    }
  }

  .scroll-mouse {
    inline-size: var(--token-size-6);
    block-size: 1.75rem;
    border: var(--scroll-indicator-border-width, var(--token-border-size-small)) solid
      color-mix(in srgb, var(--token-interactive-color) 44%, var(--token-border-color));
    border-radius: var(--scroll-indicator-radius, var(--token-radius-md));
    position: relative;
    background: var(--token-surface-glass-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    transition:
      background-color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      border-color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .scroll-wheel {
    position: absolute;
    inline-size: 1.5px;
    block-size: var(--token-size-1);
    background: color-mix(in srgb, var(--token-interactive-color) 82%, var(--token-text-primary));
    inset-inline-start: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-radius-full);
    animation: wheelScroll var(--scroll-indicator-duration, var(--token-motion-duration-pulse))
      var(--token-motion-ease-out) infinite;
    transition: background var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  .scroll-arrow {
    inline-size: 0;
    block-size: 0;
    border-inline-start: 0.25rem solid transparent;
    border-inline-end: 0.25rem solid transparent;
    border-block-start: 0.375rem solid
      color-mix(in srgb, var(--token-interactive-color) 78%, var(--token-text-primary));
    animation: arrowBounce var(--scroll-indicator-duration, var(--token-motion-duration-pulse))
      var(--token-motion-ease-out) infinite
      var(--scroll-indicator-arrow-delay, calc(var(--token-motion-duration-pulse) / 4));
    transition: border-block-start-color var(--token-motion-duration-normal)
      var(--token-motion-ease-out);
  }

  .scroll-text {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    color: color-mix(in srgb, var(--token-attention-color) 78%, var(--token-text-secondary));
    line-height: var(--token-line-height-snug);
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
    .scroll-indicator,
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
