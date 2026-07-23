<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactForm from '$lib/components/site/contact/ContactForm';

  const { Story } = defineMeta({
    title: 'Library/Site/Contact/Contact Form',
    component: ContactForm,
    tags: ['autodocs'],
    args: {
      emailAddress: 'cassidy@example.com',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Wires Field, Input, and Dropdown together into the actual submission flow, including the validation and error copy a visitor hits when a required field is missed. Try submitting empty to see the real error states, not just the isolated ones shown on Field.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <ContactForm emailAddress="cassidy@example.com" />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 56rem;
  }
</style>
