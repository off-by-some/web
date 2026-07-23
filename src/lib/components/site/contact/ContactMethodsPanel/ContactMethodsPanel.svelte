<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import ContactMethodCard from '$lib/components/site/contact/ContactMethodCard';
  import type { ContactMethod } from './types';

  type Props = {
    title?: string;
    subtitle?: string;
    methods?: ContactMethod[];
    onMethodClick?: (method: ContactMethod) => void;
  };

  let {
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    methods = [],
    onMethodClick,
  }: Props = $props();
</script>

<Card as="section" className="contact-methods-panel" aria-labelledby="methods-title">
  <h3 id="methods-title">{title}</h3>
  <p>{subtitle}</p>

  <div class="methods__grid" role="list" aria-label="Contact methods">
    {#each methods as method, mIdx (mIdx)}
      <ContactMethodCard
        href={method.href}
        type={method.type}
        label={method.label}
        value={method.value}
        imagePath={method.imagePath}
        description={method.description}
        onclick={() => onMethodClick?.(method)}
      />
    {/each}
  </div>
</Card>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  :global(.contact-methods-panel) {
    --card-background: linear-gradient(
      135deg,
      var(--token-surface-glass-medium) 0%,
      var(--token-surface-glass-strong) 100%
    );
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-2xl);
    --card-hover-transform: none;
    --card-hover-shadow: var(--token-shadow-elevated);
    --card-hover-iridescent-opacity: 1;

    position: relative;
    @include motion.fade-in-up(
      contactMethodsSlideInUp,
      var(--token-space-fluid-2xl),
      var(--token-motion-duration-slow),
      0.6s,
      both,
      0.95
    );

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-3xl);
      --card-radius: var(--token-radius-xl);
    }

    h3 {
      font-size: var(--token-font-size-lg);
      font-weight: var(--token-font-weight-semibold);
      color: var(--token-text-primary);
      margin-bottom: var(--token-space-fluid-sm);
      letter-spacing: var(--token-letter-spacing-normal);
      line-height: var(--token-line-height-snug);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-normal);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-tight);
      }
    }

    p {
      font-size: var(--token-font-size-sm);
      color: var(--token-text-overlay);
      line-height: var(--token-line-height-relaxed);
      margin-bottom: var(--token-space-fluid-xl);
      letter-spacing: var(--token-letter-spacing-normal);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-base);
        line-height: var(--token-line-height-loose);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-lg);
        letter-spacing: var(--token-letter-spacing-wide);
      }
    }
  }

  .methods__grid {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-xl);
    }
  }

  @media (max-width: #{$breakpoint-md}) {
    :global(.contact-methods-panel) {
      --card-padding: var(--token-space-fluid-xl);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    :global(.contact-methods-panel) {
      --card-padding: var(--token-space-fluid-lg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.contact-methods-panel) {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    :global(.contact-methods-panel) {
      border-width: var(--token-size-2);
      border-color: currentColor;
    }
  }

  @media print {
    :global(.contact-methods-panel) {
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
      box-shadow: none;
    }
  }
</style>
