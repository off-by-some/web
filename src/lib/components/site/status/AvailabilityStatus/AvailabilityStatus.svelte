<script lang="ts">
  import StatusPill from '$lib/components/site/status/StatusPill';

  type Props = {
    text?: string;
    className?: string;
    entrance?: boolean;
    delay?: string;
  };

  let {
    text = 'Lorem ipsum dolor sit amet',
    className = '',
    entrance = false,
    delay = '0s',
  }: Props = $props();
</script>

<div
  class="availability-status"
  class:availability-status--entrance={entrance}
  style="--availability-status-delay: {delay};"
>
  <StatusPill {text} className="availability-status__pill {className}" />
</div>

<style lang="scss">
  @use 'lib/components/primitives/motion' as motion;

  .availability-status {
    display: inline-flex;
  }

  .availability-status--entrance {
    @include motion.fade-in-up(availabilityStatusIn, 30px, 0.6s, var(--availability-status-delay));
  }

  @include motion.reduced-motion-reset('.availability-status--entrance');
</style>
