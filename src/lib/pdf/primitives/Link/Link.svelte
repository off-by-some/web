<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAnchorAttributes, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
    href: string;
  };

  const { children, class: classProp = '', href, rel, target, ...rest }: Props = $props();
  const classes = $derived([classProp].filter(Boolean).join(' '));
  const resolvedRel = $derived(rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined));
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {...rest} {href} rel={resolvedRel} {target} class={classes}>
  {@render children()}
</a>
