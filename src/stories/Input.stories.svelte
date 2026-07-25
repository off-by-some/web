<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Input from '$lib/components/primitives/forms/Input';
  import { designReferences } from './docs/design-notes';
  import { hideControls } from './helpers/controls';

  type Args = {
    as: 'input' | 'textarea';
    value: string;
    placeholder: string;
    error: boolean;
    success: boolean;
    warning: boolean;
    rows: number;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Forms/Input',
    component: Input,
    render: template,
    tags: ['autodocs'],
    args: {
      as: 'input',
      value: 'Filled value',
      placeholder: 'Type here',
      error: false,
      success: false,
      warning: false,
      rows: 4,
    },
    argTypes: {
      ...hideControls(['type', 'filled']),
      as: { control: 'select', options: ['input', 'textarea'] },
      value: { control: 'text' },
      placeholder: { control: 'text' },
      error: { control: 'boolean' },
      success: { control: 'boolean' },
      warning: { control: 'boolean' },
      rows: { control: { type: 'number', min: 1, max: 12 } },
    },
    parameters: {
      docs: {
        description: {
          component: `The text control underneath every Field — the empty, filled, and error states shown here are the same ones Field composes with a label and error message, not a separate visual language. Reference: [W3C Focus Appearance](${designReferences.focusAppearance}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-stack">
    <Input
      as={args.as}
      value={args.value}
      placeholder={args.placeholder}
      error={args.error}
      success={args.success}
      warning={args.warning}
      rows={args.as === 'textarea' ? args.rows : undefined}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Error" args={{ error: true, value: 'Needs attention', placeholder: 'Error input' }} />

<Story
  name="Textarea"
  args={{
    as: 'textarea',
    value: 'Tell me about your project.',
    placeholder: 'Textarea',
    rows: 4,
  }}
/>

<style lang="scss">
  .story-stack {
    display: grid;
    gap: var(--token-space-fluid-lg);
    max-width: 34rem;
  }
</style>
