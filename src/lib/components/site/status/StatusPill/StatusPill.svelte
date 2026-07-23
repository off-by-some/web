<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';
  import ToneDot from '$lib/components/primitives/status/ToneDot';

  type Props = {
    text: string;
    className?: string;
  };

  let { text, className = '' }: Props = $props();
</script>

<Button
  as="div"
  variant="secondary"
  className="status-pill {className}"
  role="status"
  aria-live="polite"
>
  <ToneDot tone="available" pulse className="status-pill__indicator" />
  <span class="status-pill__text">{text}</span>
</Button>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  :global(.status-pill) {
    --button-padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    --button-padding-md: var(--token-space-fluid-md) var(--token-space-fluid-xl);
    --button-font-size: var(--token-font-size-sm);
    --button-font-size-md: var(--token-font-size-base);
    --button-secondary-hover-transform: translateY(-2px) scale(1.02);

    cursor: pointer;
  }

  :global(.status-pill__indicator) {
    --tone-dot-size: var(--token-size-3);
    --tone-dot-glow-size: 10px;
  }

  :global(.status-pill:hover .status-pill__indicator) {
    transform: scale(1.2);
    box-shadow: 0 0 var(--token-space-4) var(--token-attention-glow);
  }

  .status-pill__text {
    min-width: 0;
  }
</style>
