<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FilterButton from '$lib/components/site/skills/FilterButton';
  import { hideControls } from '../../../helpers/controls';

  const { Story } = defineMeta({
    title: 'Component Library/Site/Skills/Filter Button',
    component: FilterButton,
    tags: ['autodocs'],
    args: {
      label: 'All Skills',
      count: 41,
      icon: '',
      active: true,
    },
    argTypes: {
      ...hideControls(['onSelectRequested']),
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

  const demoCategories = [
    { label: 'All Skills', count: 41 },
    { label: 'Frontend', count: 18 },
    { label: 'Backend', count: 14 },
    { label: 'Infrastructure', count: 9 },
  ];
</script>

<script lang="ts">
  let selectedDemoIndex = $state(0);
</script>

<Story name="Default" />

<Story name="Inactive" args={{ active: false }} />

<Story name="Interactive" asChild>
  <div class="story-row" role="tablist" aria-label="Filter skills by category">
    {#each demoCategories as category, index (category.label)}
      <FilterButton
        label={category.label}
        count={category.count}
        active={selectedDemoIndex === index}
        onSelectRequested={() => (selectedDemoIndex = index)}
      />
    {/each}
  </div>
</Story>

<style lang="scss">
  .story-row {
    align-items: center;
    color: var(--token-theme-color-text-primary);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--token-reference-typography-family-sans);
    gap: var(--token-reference-spacing-fluid-lg);
  }
</style>
