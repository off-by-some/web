<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';
  import ToneDot from '$lib/components/primitives/status/ToneDot';

  type Props = {
    text?: string;
    className?: string;
    entrance?: boolean;
    delay?: string;
  };

  let {
    text = 'Available for new opportunities',
    className = '',
    entrance = false,
    delay = 'var(--token-motion-delay-none)',
  }: Props = $props();

  const classes = $derived(
    ['status-pill', entrance && 'status-pill--entrance', className].filter(Boolean).join(' '),
  );
</script>

<Button
  as="div"
  variant="secondary"
  className={classes}
  role="status"
  aria-live="polite"
  style="--status-pill-delay: {delay};"
>
  <ToneDot tone="available" pulse className="status-pill__indicator" />
  <span class="status-pill__text">{text}</span>
</Button>

<style lang="scss">
  @use 'lib/components/primitives/motion' as motion;

  :global(.status-pill) {
    --button-padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    --button-padding-md: var(--token-space-fluid-md) var(--token-space-fluid-xl);
    --button-font-size: var(--token-font-size-sm);
    --button-font-size-md: var(--token-font-size-base);
    --button-secondary-hover-transform: translateY(-2px) scale(1.02);

    cursor: pointer;
  }

  :global(.status-pill--entrance) {
    @include motion.fade-in-up(
      statusPillIn,
      30px,
      var(--token-motion-duration-slow),
      var(--status-pill-delay)
    );
  }

  :global(.status-pill__indicator) {
    --tone-dot-size: var(--token-size-3);
    --tone-dot-glow-size: var(--token-blur-sm);
  }

  :global(.status-pill:hover .status-pill__indicator) {
    transform: scale(1.2);
    box-shadow: 0 0 var(--token-blur-sm) var(--token-attention-glow);
  }

  .status-pill__text {
    min-width: 0;
  }

  @include motion.reduced-motion-reset(':global(.status-pill--entrance)');
</style>
