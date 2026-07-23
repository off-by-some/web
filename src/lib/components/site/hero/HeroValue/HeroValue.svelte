<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';

  type Props = {
    headline: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    onPrimaryAction?: () => void;
    onSecondaryAction?: () => void;
  };

  let {
    headline,
    description,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryAction,
    onSecondaryAction,
  }: Props = $props();
</script>

<div class="value-section">
  <h2 class="value-headline">{headline}</h2>
  <p class="value-description">{description}</p>

  <div class="actions">
    <Button variant="primary" onclick={() => onPrimaryAction?.()}>
      {primaryButtonText}
    </Button>
    <Button variant="secondary" onclick={() => onSecondaryAction?.()}>
      {secondaryButtonText}
    </Button>
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .value-section {
    grid-area: value;
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    text-align: center;

    @include motion.fade-in-up(heroValueIn, 1.5rem, 1s, 0.6s);

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  .value-headline {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-semibold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-primary);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
      font-weight: var(--token-font-weight-medium);
      letter-spacing: var(--token-letter-spacing-normal);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-4xl);
    }

    &:hover {
      color: var(--token-text-hovered);
    }
  }

  .value-description {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
    }

    &:hover {
      color: var(--token-text-primary);
    }
  }

  .actions {
    display: flex;
    gap: var(--token-space-fluid-md);
    flex-direction: column;
    margin-top: var(--token-space-fluid-md);

    @include motion.fade-in-up(heroActionsIn, 1.5rem, 0.6s, 0.8s);

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      gap: var(--token-space-fluid-lg);
    }
  }

  @include motion.reduced-motion-reset('.value-section, .actions');

  @media (prefers-contrast: high) {
    .value-headline {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .actions {
      display: none;
    }
  }
</style>
