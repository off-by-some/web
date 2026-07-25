<script lang="ts">
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';

  type Props = {
    headline: string;
    description: string;
    primaryButtonText: string;
    linkedinUrl?: string;
    githubUrl?: string;
    repoUrl?: string;
    resumeHref?: string;
    resumeFilename?: string;
    onPrimaryAction?: () => void;
  };

  let {
    headline,
    description,
    primaryButtonText,
    linkedinUrl,
    githubUrl,
    repoUrl,
    resumeHref,
    resumeFilename = 'Cassidy-Bridges-Software-Engineering.pdf',
    onPrimaryAction,
  }: Props = $props();

  function handleContactClick(event: MouseEvent) {
    if (onPrimaryAction) {
      event.preventDefault();
      onPrimaryAction();
    }
  }
</script>

<div class="value-section">
  <h2 class="value-headline">{headline}</h2>
  <p class="value-description">{description}</p>

  <div class="actions">
    <div class="action-icons" role="group" aria-label="Profile links">
      {#if linkedinUrl}
        <HeroActionLink
          href={linkedinUrl}
          label="Open LinkedIn profile"
          icon="linkedin"
          target="_blank"
          rel="noopener noreferrer"
        />
      {/if}

      {#if githubUrl}
        <HeroActionLink
          href={githubUrl}
          label="Open GitHub profile"
          icon="github"
          target="_blank"
          rel="noopener noreferrer"
        />
      {/if}

      {#if resumeHref}
        <HeroActionLink
          href={resumeHref}
          label="Download resume"
          icon="download"
          download={resumeFilename}
        />
      {/if}

      {#if repoUrl}
        <HeroActionLink
          href={repoUrl}
          label="Star this project on GitHub"
          icon="star"
          target="_blank"
          rel="noopener noreferrer"
        />
      {/if}
    </div>

    <div class="actions__divider" aria-hidden="true"></div>

    <HeroActionLink
      href="#contact"
      label={primaryButtonText}
      icon="arrow"
      shape="label"
      onclick={handleContactClick}
    />
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .value-section {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    text-align: center;

    @include motion.fade-in-up(heroValueIn, 1.5rem, 1s, 0.6s);

    @media (min-width: $breakpoint-md) {
      text-align: left;
    }
  }

  .value-headline {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-medium);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
      letter-spacing: var(--token-letter-spacing-normal);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-4xl);
    }

    &:hover {
      color: var(--token-text-primary);
    }
  }

  .value-description {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
    }

    &:hover {
      color: var(--token-text-primary);
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-lg);
    flex-direction: column;
    margin-top: var(--token-space-fluid-md);

    @include motion.fade-in-up(heroActionsIn, 1.5rem, 0.6s, 0.8s);

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      justify-content: flex-start;
      gap: var(--token-space-fluid-xl);
    }
  }

  .action-icons {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-md);
  }

  .actions__divider {
    width: min(12rem, 60%);
    height: 1px;
    background: var(--token-border-color-neutral);
    opacity: 0.4;

    @media (min-width: $breakpoint-md) {
      width: 1px;
      height: calc(var(--token-size-12) + var(--token-space-fluid-sm));
    }
  }

  @include motion.reduced-motion-reset('.value-section, .actions');

  @media (prefers-contrast: high) {
    .value-headline {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .actions {
      display: none;
    }
  }
</style>
