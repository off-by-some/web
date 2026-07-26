<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';

  type Props = {
    href: string;
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    imagePath: string;
    description: string;
    onContactRequested?: () => void;
  };

  let { href, type, label, value, imagePath, description, onContactRequested }: Props = $props();
</script>

<Card
  as="a"
  {href}
  className="method-card"
  onclick={() => onContactRequested?.()}
  target={type === 'email' ? '_self' : '_blank'}
  rel={type === 'email' ? '' : 'noopener noreferrer'}
  aria-label="Contact via {label}: {value} - {description}"
>
  <IconTile src={imagePath} alt="" sizes="48px" className="method__icon" />
  <div class="method__content">
    <h4 class="method__label">{label}</h4>
    <p class="method__value">{value}</p>
    <span class="method__description">{description}</span>
  </div>
</Card>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  :global(.method-card) {
    --card-background: linear-gradient(
      135deg,
      var(--token-theme-color-surface-glass-strong) 0%,
      var(--token-theme-color-surface-glass-medium) 100%
    );
    --card-iridescent-background: linear-gradient(
      135deg,
      var(--token-theme-color-tint-overlay-subtle) 0%,
      transparent 50%
    );
    --card-padding: var(--token-reference-spacing-fluid-lg);
    --card-radius: var(--token-reference-radius-lg);
    --card-shadow: var(--token-theme-shadow-light);
    --card-hover-shadow:
      var(--token-theme-shadow-default),
      0 0 var(--token-reference-blur-md) var(--token-theme-shadow-glow-subtle);
    --card-hover-transform: translateY(-3px) scale(1.02);
    --card-active-transform: translateY(-1px) scale(1);
    --card-focus-outline: var(--token-reference-border-width-accent) solid
      var(--token-theme-color-interactive-color);

    align-items: center;
    display: flex;
    gap: var(--token-reference-spacing-fluid-lg);
    text-decoration: none;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-reference-spacing-fluid-xl);
      --card-radius: var(--token-reference-radius-xl);

      gap: var(--token-reference-spacing-fluid-xl);
    }

    @media (max-width: #{$breakpoint-sm}) {
      flex-direction: column;
      gap: var(--token-reference-spacing-fluid-md);
      text-align: center;
    }
  }

  :global(.method-card:hover .method__icon) {
    --icon-tile-image-filter: var(
      --contact-method-icon-filter-hover,
      var(--contact-method-icon-filter, none)
    );
    --icon-tile-image-transform: scale(1.1);

    transform: scale(1.05);
    box-shadow: var(--token-theme-shadow-default);
  }

  :global(.method__icon) {
    --icon-tile-size: var(--token-reference-size-12);
    --icon-tile-padding: 0;
    --icon-tile-image-size: var(--icon-tile-size);
    --icon-tile-background: var(--token-theme-color-surface-glass-medium);
    --icon-tile-radius: var(--token-reference-radius-lg);
    --icon-tile-shadow: var(--token-theme-shadow-light);
    --icon-tile-z-index: var(--token-reference-layer-raised);
    --icon-tile-image-filter: var(--contact-method-icon-filter, none);
    --icon-tile-overflow: hidden;

    @media (min-width: $breakpoint-md) {
      --icon-tile-size: 4rem;
      --icon-tile-radius: var(--token-reference-radius-xl);
    }
  }

  .method__content {
    flex: 1;
    min-inline-size: 0;
    position: relative;
    z-index: var(--token-reference-layer-raised);
  }

  .method__label {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-primary);
    margin-block-end: var(--token-reference-spacing-1);
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    line-height: var(--token-reference-typography-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
      line-height: var(--token-reference-typography-line-height-normal);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-lg);
      letter-spacing: var(--token-reference-typography-letter-spacing-tight);
    }
  }

  .method__value {
    font-size: var(--token-reference-typography-size-sm);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-brand);
    margin-block-end: var(--token-reference-spacing-2);
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    line-height: var(--token-reference-typography-line-height-snug);
    word-break: break-word;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .method__description {
    font-size: var(--token-reference-typography-size-xs);
    color: var(--token-theme-color-text-tertiary);
    line-height: var(--token-reference-typography-line-height-normal);
    letter-spacing: var(--token-reference-typography-letter-spacing-wide);
    display: block;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }
</style>
