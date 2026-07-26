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
    animation: scrollFloat 2s ease-in-out infinite;
    z-index: 10;
    transition:
      color 0.3s var(--token-motion-ease-out),
      opacity 0.3s var(--token-motion-ease-out),
      transform 0.3s var(--token-motion-ease-out);

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
    border: 1px solid
      color-mix(in srgb, var(--token-interactive-color) 44%, var(--token-border-color));
    border-radius: 0.625rem;
    position: relative;
    background: var(--token-surface-glass-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    transition:
      background-color 0.3s var(--token-motion-ease-out),
      border-color 0.3s var(--token-motion-ease-out),
      box-shadow 0.3s var(--token-motion-ease-out);
  }

  .scroll-wheel {
    position: absolute;
    inline-size: 1.5px;
    block-size: var(--token-size-1);
    background: color-mix(in srgb, var(--token-interactive-color) 82%, white);
    inset-inline-start: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-radius-full);
    animation: wheelScroll 2s ease-in-out infinite;
    transition: background 0.3s var(--token-motion-ease-out);
  }

  .scroll-arrow {
    inline-size: 0;
    block-size: 0;
    border-inline-start: 0.25rem solid transparent;
    border-inline-end: 0.25rem solid transparent;
    border-block-start: 0.375rem solid color-mix(in srgb, var(--token-interactive-color) 78%, white);
    animation: arrowBounce 2s ease-in-out infinite 0.5s;
    transition: border-block-start-color 0.3s var(--token-motion-ease-out);
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
