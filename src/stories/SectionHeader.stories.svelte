<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SectionHeader from '$lib/components/site/section-headings/SectionHeader';

  const { Story } = defineMeta({
    title: 'Library/Site/Section Headings/Section Header',
    component: SectionHeader,
    tags: ['autodocs'],
    args: {
      title: 'Technical Expertise',
      subtitle: 'Mastery forged through years of hands-on experience',
      titleId: 'storybook-section-header',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Title-plus-subtitle pairing used at the top of every major page section. The title\'s gradient text shimmers on a slow 8s loop by default (disabled under reduced motion); `variant="compact"` only trims the bottom margin for tighter sections, it does not change either type size.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <SectionHeader
    title="Technical Expertise"
    subtitle="Mastery forged through years of hands-on experience"
    titleId="storybook-section-header"
  />
</Story>
