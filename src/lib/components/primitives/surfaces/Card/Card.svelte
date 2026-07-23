<script lang="ts">
  import type { Snippet } from 'svelte';
  import { pressableAttrs } from '$lib/components/primitives/internal/pressable';

  type Props = {
    as?: 'div' | 'article' | 'section' | 'button' | 'a';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
    [key: string]: unknown;
  };

  let { as = 'div', type = 'button', className = '', onclick, children, ...rest }: Props = $props();

  const classes = $derived(['card', className].filter(Boolean).join(' '));

  // Renders as a plain container by default. Handing it an `onclick` on a
  // non-interactive `as` (the default `div`, or `section`/`article`) is
  // what opts a card into being pressable — that's when it earns a role,
  // tab focus, and Enter/Space activation instead of silently missing them.
  const pressable = $derived(pressableAttrs({ as, onclick }));
</script>

<svelte:element
  this={as}
  class={classes}
  type={as === 'button' ? type : undefined}
  role={pressable.role}
  tabindex={pressable.tabindex}
  onkeydown={pressable.onkeydown}
  {onclick}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style lang="scss">
  @use 'lib/components/primitives/root' as root;

  .card {
    @include root.interactive-root;

    background: var(--card-background, var(--token-surface-glass-medium));
    border: var(--card-border, var(--token-border-default-small));
    border-radius: var(--card-radius, var(--token-radius-xl));
    padding: var(--card-padding, var(--token-space-fluid-xl));
    backdrop-filter: var(--card-backdrop-filter, none);
    -webkit-backdrop-filter: var(--card-backdrop-filter, none);
    box-shadow: var(--card-shadow, var(--token-shadow-default));
    color: inherit;
    isolation: isolate;
    position: relative;
    overflow: hidden;
    transition:
      transform var(--card-transition-duration, 0.4s) var(--token-motion-ease-out),
      border-color var(--card-transition-duration, 0.4s) var(--token-motion-ease-out),
      box-shadow var(--card-transition-duration, 0.4s) var(--token-motion-ease-out),
      color var(--card-transition-duration, 0.4s) var(--token-motion-ease-out),
      background var(--card-transition-duration, 0.4s) var(--token-motion-ease-out);

    &::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      inset: 0;
      background: var(--card-iridescent-background, var(--token-surface-glass-iridescent));
      opacity: var(--card-iridescent-opacity, 0);
      transition: opacity var(--card-transition-duration, 0.4s) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: var(--card-hover-transform, translateY(-4px) scale(1.01));
      border-color: var(--card-hover-border-color, var(--token-border-color-hover));
      box-shadow: var(--card-hover-shadow, var(--token-shadow-elevated));

      &::before {
        opacity: var(--card-hover-iridescent-opacity, 0.8);
      }
    }

    &:active {
      transform: var(--card-active-transform, translateY(-2px) scale(1));
      transition-duration: 0.1s;
    }

    &:focus,
    &:focus-visible {
      outline: var(--card-focus-outline, 2px solid var(--token-interactive-color));
      outline-offset: var(--card-focus-outline-offset, 2px);
    }
  }
</style>
