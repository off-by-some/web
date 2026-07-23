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
    onclick?: (event: MouseEvent) => void;
  };

  let { href, type, label, value, imagePath, description, onclick }: Props = $props();
</script>

<Card
  as="a"
  {href}
  className="method-card"
  {onclick}
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
      var(--token-surface-glass-strong) 0%,
      var(--token-surface-glass-medium) 100%
    );
    --card-iridescent-background: linear-gradient(
      135deg,
      var(--token-tint-overlay-subtle) 0%,
      transparent 50%
    );
    --card-padding: var(--token-space-fluid-lg);
    --card-radius: var(--token-radius-lg);
    --card-shadow: var(--token-shadow-light);
    --card-hover-shadow: var(--token-shadow-default), 0 0 20px var(--token-shadow-glow-subtle);
    --card-hover-transform: translateY(-3px) scale(1.02);
    --card-active-transform: translateY(-1px) scale(1);
    --card-focus-outline: 3px solid var(--token-interactive-color);

    align-items: center;
    display: flex;
    gap: var(--token-space-fluid-lg);
    text-decoration: none;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-xl);
      --card-radius: var(--token-radius-xl);

      gap: var(--token-space-fluid-xl);
    }

    @media (max-width: #{$breakpoint-sm}) {
      flex-direction: column;
      gap: var(--token-space-fluid-md);
      text-align: center;
    }
  }

  :global(.method-card:hover .method__icon) {
    transform: scale(1.05);
    box-shadow: var(--token-shadow-default);
  }

  :global(.method-card:hover .method__icon img) {
    transform: scale(1.1);
    filter: var(--token-icon-filter-hover, var(--token-icon-filter, none));
  }

  :global(.method__icon) {
    --icon-tile-size: var(--token-size-12);
    --icon-tile-padding: 0;
    --icon-tile-image-size: var(--icon-tile-size);
    --icon-tile-background: var(--token-surface-glass-medium);
    --icon-tile-radius: var(--token-radius-lg);
    --icon-tile-shadow: var(--token-shadow-light);
    --icon-tile-z-index: 2;
    --icon-tile-image-filter: var(--token-icon-filter, none);
    --icon-tile-overflow: hidden;

    @media (min-width: $breakpoint-md) {
      --icon-tile-size: 4rem;
      --icon-tile-radius: var(--token-radius-xl);
    }
  }

  .method__content {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 2;
  }

  .method__label {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-1);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
      line-height: var(--token-line-height-normal);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
      letter-spacing: var(--token-letter-spacing-tight);
    }
  }

  .method__value {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-brand);
    margin-bottom: var(--token-space-2);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
    word-break: break-word;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .method__description {
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-normal);
    letter-spacing: var(--token-letter-spacing-wide);
    display: block;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }
  }
</style>
