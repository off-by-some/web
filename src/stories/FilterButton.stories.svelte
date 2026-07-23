<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FilterButton from '$lib/components/site/skills/FilterButton';

  const { Story } = defineMeta({
    title: 'Library/Site/Skills/Filter Button',
    component: FilterButton,
    tags: ['autodocs'],
    args: {
      label: 'All Skills',
      count: 41,
      active: true,
    },
    parameters: {
      docs: {
        description: {
          component:
            'A secondary Button with an active state and count badge layered on — that\'s the entire component. It renders `role="tab"` and `aria-selected`, so it only makes sense inside a `role="tablist"` container the way SkillsSection uses it; dropped in on its own, the ARIA roles would be misleading.',
        },
      },
    },
  });
</script>

<Story name="Skill Filters" asChild>
  <div class="story-row">
    <FilterButton label="All Skills" count={41} active />
    <FilterButton label="Frontend Architecture" count={13} />
    <FilterButton label="Cloud & DevOps" count={10} />
  </div>
</Story>

<style lang="scss">
  .story-row {
    align-items: center;
    color: var(--token-text-primary);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--token-font-family-sans);
    gap: var(--token-space-fluid-lg);
  }
</style>
