<script lang="ts">
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';

  type Props = {
    href: string;
    label?: string;
  };

  let { href, label = 'Lorem ipsum dolor sit amet' }: Props = $props();
</script>

<HeroActionLink
  {href}
  {label}
  icon="github"
  shape="corner"
  target="_blank"
  rel="noopener noreferrer"
/>
