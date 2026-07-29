<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type HeadingSize = 1 | 2 | 3 | 4;
  type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

  type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
    size?: HeadingSize;
  };

  const { children, class: classProp = '', size = 2, ...rest }: Props = $props();
  const classes = $derived(
    ['pdf-heading', `pdf-heading--${size}`, classProp].filter(Boolean).join(' '),
  );
  const tag = $derived(`h${size}` as HeadingTag);
</script>

<svelte:element this={tag} {...rest} class={classes} data-pdf-heading={size}>
  {@render children()}
</svelte:element>

<style lang="scss">
  :global(:where(.pdf-heading)) {
    margin: 0;
    color: currentColor;
    font-weight: var(--token-reference-typography-weight-bold, 700);
    line-height: var(--token-reference-typography-line-height-tight, 1.1);
  }

  :global(:where(.pdf-heading--1)) {
    font-size: var(--pdf-heading-size-1, 2.7rem);
  }

  :global(:where(.pdf-heading--2)) {
    font-size: var(--pdf-heading-size-2, 1.1rem);
  }

  :global(:where(.pdf-heading--3)) {
    font-size: var(--pdf-heading-size-3, 0.98rem);
  }

  :global(:where(.pdf-heading--4)) {
    font-size: var(--pdf-heading-size-4, 0.625rem);
  }
</style>
