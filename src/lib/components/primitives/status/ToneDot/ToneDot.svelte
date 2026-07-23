<script lang="ts">
  type Props = {
    tone?: 'expert' | 'advanced' | 'proficient' | 'learning' | 'available' | 'interactive';
    pulse?: boolean;
    className?: string;
  };

  let { tone = 'interactive', pulse = false, className = '' }: Props = $props();
</script>

<span class="tone-dot tone-dot--{tone} {className}" class:tone-dot--pulse={pulse} aria-hidden="true"
></span>

<style lang="scss">
  @use 'lib/components/primitives/tone' as tone;
  @use 'lib/components/primitives/root' as root;

  .tone-dot {
    @include root.component-root;

    --tone-dot-size: var(--token-size-4);
    --tone-dot-border: none;
    --tone-dot-glow-size: 8px;

    display: inline-block;
    width: var(--tone-dot-size);
    height: var(--tone-dot-size);
    background: var(--tone-color);
    border: var(--tone-dot-border);
    border-radius: var(--token-radius-full);
    box-shadow: 0 0 var(--tone-dot-glow-size) var(--tone-glow);
    flex-shrink: 0;
    transition:
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out),
      box-shadow var(--token-motion-duration-normal) var(--token-motion-ease-out);
  }

  @each $tone-name, $config in tone.$tones {
    .tone-dot--#{$tone-name} {
      @include tone.vars($tone-name);
    }
  }

  .tone-dot--pulse {
    animation: toneDotPulse 2s ease-in-out infinite;
  }

  @keyframes toneDotPulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tone-dot--pulse {
      animation: none;
    }
  }
</style>
