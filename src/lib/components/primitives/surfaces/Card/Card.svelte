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

    background: var(--card-background, var(--token-theme-color-surface-glass-medium));
    border: var(--card-border, var(--token-theme-border-default-small));
    border-radius: var(--card-radius, var(--token-reference-radius-xl));
    padding: var(--card-padding, var(--token-reference-spacing-fluid-xl));
    backdrop-filter: var(--card-backdrop-filter, none);
    -webkit-backdrop-filter: var(--card-backdrop-filter, none);
    box-shadow: var(--card-shadow, var(--token-theme-shadow-default));
    color: inherit;
    isolation: isolate;
    position: relative;
    overflow: var(--card-overflow, hidden);
    transition:
      transform var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out),
      border-color var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out),
      box-shadow var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out),
      color var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out),
      background var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out);

    &::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      inset: 0;
      background: var(
        --card-iridescent-background,
        var(--token-theme-color-surface-glass-iridescent)
      );
      opacity: var(--card-iridescent-opacity, 0);
      transition: opacity
        var(--card-transition-duration, var(--token-reference-motion-duration-emphasis))
        var(--token-reference-motion-easing-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: var(--card-hover-transform, translateY(-4px) scale(1.01));
      border-color: var(--card-hover-border-color, var(--token-theme-color-border-hover));
      box-shadow: var(--card-hover-shadow, var(--token-theme-shadow-elevated));

      &::before {
        opacity: var(--card-hover-iridescent-opacity, 0.8);
      }
    }

    &:active {
      transform: var(--card-active-transform, translateY(-2px) scale(1));
      transition-duration: var(
        --card-active-duration,
        var(--token-reference-motion-duration-press)
      );
    }

    &:focus,
    &:focus-visible {
      outline: var(--card-focus-outline, var(--token-theme-focus-outline));
      outline-offset: var(--card-focus-outline-offset, var(--token-theme-focus-offset-sm));
    }
  }

  @media (forced-colors: active) {
    .card {
      border-color: CanvasText;
      box-shadow: none;
    }
  }
</style>
