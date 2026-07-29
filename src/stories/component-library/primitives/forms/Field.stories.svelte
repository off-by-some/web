<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Field from '$lib/components/primitives/forms/Field';
  import Input from '$lib/components/primitives/forms/Input';
  import { designReferences } from '../../../docs/design-notes';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    id: string;
    label: string;
    required: boolean;
    error: string;
    value: string;
    placeholder: string;
    counter: string;
    as: 'input' | 'textarea';
    rows: number;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Primitives/Forms/Field',
    component: Field,
    render: template,
    tags: ['autodocs'],
    args: {
      id: 'story-field',
      label: 'Name',
      required: true,
      error: '',
      value: 'Cassidy Bridges',
      placeholder: 'Your full name',
      counter: '',
      as: 'input',
      rows: 4,
    },
    argTypes: {
      ...hideControls(['id', 'errorId', 'counterId', 'counterAriaLabel']),
      as: { control: 'select', options: ['input', 'textarea'] },
      label: { control: 'text' },
      required: { control: 'boolean' },
      error: { control: 'text' },
      value: { control: 'text' },
      placeholder: { control: 'text' },
      counter: { control: 'text' },
      rows: { control: { type: 'number', min: 1, max: 12 } },
    },
    parameters: {
      docs: {
        description: {
          component: `Keeps label, required marker, error text, and character counter attached to one control, so a validation error always has an obvious anchor instead of floating text somewhere else on the page. Reference: [W3C cognitive accessibility guidance](${designReferences.cognitive}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-stack">
    <Field
      id={args.id}
      label={args.label}
      required={args.required}
      error={args.error}
      counter={args.counter}
    >
      <Input
        as={args.as}
        id={args.id}
        value={args.value}
        placeholder={args.placeholder}
        error={Boolean(args.error)}
        rows={args.as === 'textarea' ? args.rows : undefined}
      />
    </Field>
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="With Counter"
  args={{
    id: 'story-message',
    label: 'Message',
    required: false,
    value: 'A short project note.',
    placeholder: 'Project details',
    counter: '21 characters',
    as: 'textarea',
  }}
/>

<Story
  name="Error"
  args={{
    id: 'story-error',
    label: 'Email',
    required: true,
    value: 'cassidy',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
  }}
/>

<style lang="scss">
  .story-stack {
    color: var(--token-theme-color-text-primary);
    display: grid;
    font-family: var(--token-reference-typography-family-sans);
    gap: var(--token-reference-spacing-fluid-2xl);
    max-inline-size: 34rem;
  }
</style>
