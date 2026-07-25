<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Action Link',
    component: HeroActionLink,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some',
      label: 'Open GitHub profile',
      icon: 'github',
      shape: 'circle',
    },
    argTypes: {
      href: { control: { type: 'text' } },
      label: { control: { type: 'text' } },
      icon: { control: { type: 'select' }, options: ['github', 'linkedin', 'download', 'arrow'] },
      shape: { control: { type: 'select' }, options: ['circle', 'label', 'corner'] },
      download: { control: { type: 'text' } },
      target: { control: { type: 'select' }, options: ['_self', '_blank'] },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Reusable hero action link for the circular social controls, resume download button, text-arrow contact CTA, and the expanding project link in the corner. This keeps the hero action language centralized instead of restyling each link separately.',
        },
      },
    },
  });
</script>

<Story name="Action Row" asChild>
  <div class="story-row">
    <HeroActionLink
      href="https://linkedin.com/in/cassidy-bridges-tech"
      label="Open LinkedIn profile"
      icon="linkedin"
      target="_blank"
      rel="noopener noreferrer"
    />
    <HeroActionLink
      href="https://github.com/off-by-some"
      label="Open GitHub profile"
      icon="github"
      target="_blank"
      rel="noopener noreferrer"
    />
    <HeroActionLink
      href="/resume/Cassidy-Bridges-Software-Engineering.pdf"
      label="Download resume"
      icon="download"
      download="Cassidy-Bridges-Software-Engineering.pdf"
    />
    <span class="story-divider" aria-hidden="true"></span>
    <HeroActionLink href="#contact" label="Contact Me" icon="arrow" shape="label" />
  </div>
</Story>

<Story name="Corner" asChild>
  <div class="story-corner">
    <HeroActionLink
      href="https://github.com/off-by-some/web"
      label="Check out this project on GitHub"
      icon="github"
      shape="corner"
      target="_blank"
      rel="noopener noreferrer"
    />
  </div>
</Story>

<style lang="scss">
  .story-row {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    min-height: 7rem;
  }

  .story-divider {
    width: 1px;
    height: var(--token-size-12);
    background: var(--token-border-color-neutral);
  }

  .story-corner {
    min-height: 8rem;
    position: relative;
  }
</style>
