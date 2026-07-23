<script lang="ts">
  type Props = {
    text: string;
    ariaLabel?: string;
    onclick?: (event: MouseEvent) => void;
  };

  let { text, ariaLabel = 'Lorem ipsum dolor sit amet', onclick }: Props = $props();
</script>

<button class="scroll-indicator" {onclick} type="button" aria-label={ariaLabel}>
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
    opacity: 0.6;
    cursor: pointer;
    animation: scrollFloat 2s ease-in-out infinite;
    z-index: 10;
    transition: all 0.3s var(--token-motion-ease-out);

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
        border-top-color: var(--token-attention-color);
      }
    }

    @media (max-height: 600px), (max-width: calc($breakpoint-sm - 1px)) {
      display: none;
    }
  }

  .scroll-mouse {
    width: var(--token-size-6);
    height: 1.75rem;
    border: var(--token-border-default-medium);
    border-radius: 0.625rem;
    position: relative;
    background: var(--token-surface-glass-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    transition: all 0.3s var(--token-motion-ease-out);
  }

  .scroll-wheel {
    position: absolute;
    width: 1.5px;
    height: var(--token-size-1);
    background: var(--token-interactive-color);
    left: 50%;
    top: 0.375rem;
    transform: translateX(-50%);
    border-radius: var(--token-radius-full);
    animation: wheelScroll 2s ease-in-out infinite;
    transition: background 0.3s var(--token-motion-ease-out);
  }

  .scroll-arrow {
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-top: 0.375rem solid var(--token-interactive-color);
    animation: arrowBounce 2s ease-in-out infinite 0.5s;
    transition: border-top-color 0.3s var(--token-motion-ease-out);
  }

  .scroll-text {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    color: var(--token-attention-color);
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
