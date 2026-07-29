<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dropdown from '$lib/components/primitives/forms/Dropdown';
  import Field from '$lib/components/primitives/forms/Field';
  import { hideControls } from '../../../helpers/controls';

  const options = [
    { value: 'discuss', label: "Let's discuss", description: 'Custom pricing for unique work' },
    { value: 'under-10k', label: 'Under $10K', description: 'Small projects and quick fixes' },
    { value: '25k-50k', label: '$25K - $50K', description: 'Complex web applications' },
  ];

  type Args = {
    id: string;
    options: typeof options;
    value: string;
    placeholder: string;
    ariaLabel: string;
    disabled: boolean;
    error: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Primitives/Forms/Dropdown',
    component: Dropdown,
    render: template,
    tags: ['autodocs'],
    args: {
      id: 'storybook-budget',
      options,
      value: 'discuss',
      placeholder: 'Select budget range',
      ariaLabel: 'Select your project budget range',
      disabled: false,
      error: false,
    },
    argTypes: {
      ...hideControls(['id', 'ariaLabel']),
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

{#snippet template(args: Args)}
  <div class="story-width">
    <Dropdown
      id={args.id}
      options={args.options}
      value={args.value}
      placeholder={args.placeholder}
      ariaLabel={args.ariaLabel}
      disabled={args.disabled}
      error={args.error}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Error" asChild>
  <div class="story-width">
    <Field
      id="storybook-budget-error"
      label="Budget range"
      error="Select a budget range to continue"
    >
      <Dropdown
        id="storybook-budget-error"
        {options}
        value=""
        placeholder="Select budget range"
        ariaLabel="Select your project budget range"
        error
      />
    </Field>
  </div>
</Story>

<style lang="scss">
  .story-width {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    max-inline-size: 34rem;
    min-block-size: 16rem;
  }
</style>
