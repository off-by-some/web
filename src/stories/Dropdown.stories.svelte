<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dropdown from '$lib/components/primitives/forms/Dropdown';

  const options = [
    { value: 'discuss', label: "Let's discuss", description: 'Custom pricing for unique work' },
    { value: 'under-10k', label: 'Under $10K', description: 'Small projects and quick fixes' },
    { value: '25k-50k', label: '$25K - $50K', description: 'Complex web applications' },
  ];

  const { Story } = defineMeta({
    title: 'Library/Primitives/Forms/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    args: {
      id: 'storybook-budget',
      options,
      value: 'discuss',
      placeholder: 'Select budget range',
      ariaLabel: 'Select your project budget range',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Custom listbox, not a native <select> — needed so each option can carry a description line under its label. That tradeoff only pays off if the keyboard behavior matches what a native select would do: try Arrow Up/Down, Home, End, and Escape here.',
        },
      },
    },
  });
</script>

<script lang="ts">
  let value = 'discuss';
</script>

<Story name="Default" asChild>
  <div class="story-width">
    <Dropdown
      id="storybook-budget"
      {options}
      bind:value
      placeholder="Select budget range"
      ariaLabel="Select your project budget range"
    />
  </div>
</Story>

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 34rem;
    min-height: 16rem;
  }
</style>
