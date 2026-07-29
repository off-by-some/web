<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
  };

  const { children, class: classProp = '', ...rest }: Props = $props();
  const classes = $derived([classProp].filter(Boolean).join(' '));
</script>

<em {...rest} class={classes}>
  {@render children()}
</em>
