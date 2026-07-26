<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import ContactMethodCard from '$lib/components/site/contact/ContactMethodCard';
  import type { ContactMethod } from './types';

  type Props = {
    title?: string;
    subtitle?: string;
    methods?: ContactMethod[];
    onContactRequested?: (method: ContactMethod) => void;
  };

  let {
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    methods = [],
    onContactRequested,
  }: Props = $props();
</script>

<Card as="section" className="contact-methods-panel" aria-labelledby="methods-title">
  <h3 id="methods-title">{title}</h3>
  <p>{subtitle}</p>

  <div class="methods__grid">
    {#each methods as method (`${method.type}-${method.href}`)}
      <ContactMethodCard
        href={method.href}
        type={method.type}
        label={method.label}
        value={method.value}
        imagePath={method.imagePath}
        description={method.description}
        onContactRequested={() => onContactRequested?.(method)}
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
      var(--token-theme-color-surface-glass-medium) 0%,
      var(--token-theme-color-surface-glass-strong) 100%
    );
    --card-radius: var(--token-reference-radius-lg);
    --card-padding: var(--token-reference-spacing-fluid-2xl);
    --card-hover-transform: none;
    --card-hover-shadow: var(--token-theme-shadow-elevated);
    --card-hover-iridescent-opacity: 1;

    position: relative;
    @include motion.fade-in-up(
      contactMethodsSlideInUp,
      var(--token-reference-spacing-fluid-2xl),
      var(--token-reference-motion-duration-slow),
      var(--token-reference-motion-delay-slow),
      both,
      0.95
    );

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-reference-spacing-fluid-3xl);
      --card-radius: var(--token-reference-radius-xl);
    }

    h3 {
      font-size: var(--token-reference-typography-size-lg);
      font-weight: var(--token-reference-typography-weight-semibold);
      color: var(--token-theme-color-text-primary);
      margin-block-end: var(--token-reference-spacing-fluid-sm);
      letter-spacing: var(--token-reference-typography-letter-spacing-normal);
      line-height: var(--token-reference-typography-line-height-snug);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-reference-typography-size-xl);
        line-height: var(--token-reference-typography-line-height-normal);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-reference-typography-size-2xl);
        letter-spacing: var(--token-reference-typography-letter-spacing-tight);
      }
    }

    p {
      font-size: var(--token-reference-typography-size-sm);
      color: var(--token-theme-color-text-overlay);
      line-height: var(--token-reference-typography-line-height-relaxed);
      margin-block-end: var(--token-reference-spacing-fluid-xl);
      letter-spacing: var(--token-reference-typography-letter-spacing-normal);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-reference-typography-size-base);
        line-height: var(--token-reference-typography-line-height-loose);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-reference-typography-size-lg);
        letter-spacing: var(--token-reference-typography-letter-spacing-wide);
      }
    }
  }

  .methods__grid {
    display: flex;
    flex-direction: column;
    gap: var(--token-reference-spacing-fluid-lg);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-xl);
    }
  }

  @media (max-width: #{$breakpoint-md}) {
    :global(.contact-methods-panel) {
      --card-padding: var(--token-reference-spacing-fluid-xl);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    :global(.contact-methods-panel) {
      --card-padding: var(--token-reference-spacing-fluid-lg);
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
      border-width: var(--token-reference-size-2);
      border-color: currentColor;
    }
  }

  @media print {
    :global(.contact-methods-panel) {
      border: var(--token-theme-border-default-small);
      background: Canvas;
      break-inside: avoid;
      box-shadow: none;
    }
  }
</style>
