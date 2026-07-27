<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';
  import Image from '$lib/components/primitives/media/Image';
  import Card from '$lib/components/primitives/surfaces/Card';
  import type { ProjectModel, ProjectSecondaryLinkIcon } from '$lib/components/site/projects/types';

  type Props = {
    project: ProjectModel;
    mediaReady?: boolean;
  };

  let { project, mediaReady = true }: Props = $props();
</script>

<Card as="article" className="project-card">
  <Card
    as="a"
    className="project-card__banner"
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open {project.name} on GitHub"
  >
    {#if mediaReady}
      <Image
        src={project.bannerSrc}
        alt=""
        width={800}
        height={450}
        className="project-card__banner-image"
        loading="lazy"
        sizes="(max-width: 1376px) 100vw, 640px"
      />
    {/if}
  </Card>

  {#if project.badges?.length}
    <div class="project-card__badges" role="group" aria-label="{project.name} project metadata">
      {#each project.badges as badge (`${badge.href ?? 'badge'}-${badge.label}`)}
        {#if badge.href}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            class="project-card__badge-link"
            aria-label={badge.label}
          >
            {#if mediaReady}
              <img
                src={badge.imageSrc}
                alt=""
                class="project-card__badge"
                loading="lazy"
                width="110"
                height="20"
              />
            {/if}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {:else if mediaReady}
          <img
            src={badge.imageSrc}
            alt={badge.label}
            class="project-card__badge"
            loading="lazy"
            width="110"
            height="20"
          />
        {/if}
      {/each}
    </div>
  {/if}

  <div class="project-card__content">
    <h3 class="project-card__title">{project.name}</h3>
    <p class="project-card__tagline">{project.tagline}</p>

    {#each project.description as paragraph, index (`${project.href}-description-${index}`)}
      <p class="project-card__description">{paragraph}</p>
    {/each}

    {#if project.highlights?.length}
      <Card className="project-card__highlights">
        <ul class="project-card__highlight-list">
          {#each project.highlights as highlight (`${project.href}-${highlight.label}`)}
            <li class="project-card__highlight-item">
              <span class="project-card__highlight-label">{highlight.label}</span>
              {highlight.detail}
            </li>
          {/each}
        </ul>
      </Card>
    {/if}

    <ul class="project-card__tags" aria-label="{project.name} technologies">
      {#each project.tags as tag (`${project.href}-${tag}`)}
        <li class="project-card__tag">{tag}</li>
      {/each}
    </ul>

    <div class="project-card__actions">
      <Button
        as="a"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
      >
        {@render projectActionIcon('github')}
        View on GitHub
      </Button>

      {#if project.secondaryLink}
        <Button
          as="a"
          href={project.secondaryLink.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          {@render projectActionIcon(project.secondaryLink.icon)}
          {project.secondaryLink.label}
        </Button>
      {/if}
    </div>
  </div>
</Card>

{#snippet projectActionIcon(icon: ProjectSecondaryLinkIcon | 'github')}
  <span class="project-card__action-icon" aria-hidden="true">
    {#if icon === 'github'}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
    {:else if icon === 'docs'}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM15 2v5h5M8 13h8M8 17h8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else if icon === 'dockerhub'}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 3v9M12 12l8-4.5M12 12l-8-4.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5" />
        <rect
          x="13"
          y="13"
          width="8"
          height="8"
          rx="1.5"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    {/if}
  </span>
{/snippet}

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  :global(.project-card) {
    --card-padding: var(--token-reference-spacing-fluid-xl);
    --card-hover-transform: none;

    display: flex;
    flex-direction: column;
    gap: var(--token-reference-spacing-fluid-xl);
    inline-size: 100%;
    min-inline-size: 0;
    text-align: start;
    container-type: inline-size;

    @include motion.fade-in-up(projectCardEnter, 14px, var(--token-theme-motion-feedback-emphasis));

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-reference-spacing-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      --card-padding: var(--token-reference-spacing-fluid-3xl);
    }
  }

  :global(.project-card__banner) {
    --card-background: var(--token-theme-color-surface-glass-medium);
    --card-padding: var(--token-reference-spacing-fluid-xl);
    --card-hover-transform: scale(1.008);
    --card-hover-iridescent-opacity: 0.6;

    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    min-block-size: var(--project-card-banner-min-block-size, 11rem);

    @container (inline-size >= 36rem) {
      --card-padding: var(--token-reference-spacing-fluid-2xl);
      --project-card-banner-min-block-size: 14rem;
    }

    @container (inline-size >= 56rem) {
      --project-card-banner-min-block-size: 17rem;
    }
  }

  :global(.project-card__banner-image) {
    max-inline-size: 100%;
    max-block-size: var(--project-card-banner-image-max-block-size, 11rem);
    inline-size: auto;
    block-size: auto;
    object-fit: contain;

    @container (inline-size >= 36rem) {
      --project-card-banner-image-max-block-size: 14rem;
    }

    @container (inline-size >= 56rem) {
      --project-card-banner-image-max-block-size: 17rem;
    }
  }

  .project-card__badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--token-reference-spacing-2) var(--token-reference-spacing-3);
  }

  .project-card__badge-link {
    display: flex;
    transition: transform var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);

    &:hover {
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: var(--token-theme-focus-outline);
      outline-offset: var(--token-theme-focus-offset-sm);
      border-radius: var(--token-reference-radius-xs);
    }
  }

  .project-card__badge {
    display: block;
    inline-size: auto;
    block-size: 1.25rem;
  }

  .project-card__content {
    min-inline-size: 0;
    flex: 1;
  }

  .project-card__title {
    margin: 0 0 var(--token-reference-spacing-fluid-xs);
    overflow-wrap: anywhere;
    color: var(--token-theme-color-text-primary);
    font-size: var(--token-reference-typography-size-2xl);
    font-weight: var(--token-reference-typography-weight-semibold);
    line-height: var(--token-reference-typography-line-height-snug);

    @container (inline-size >= 56rem) {
      font-size: var(--token-reference-typography-size-3xl);
    }
  }

  .project-card__tagline {
    margin: 0 0 var(--token-reference-spacing-fluid-lg);
    color: var(--token-theme-color-emphasis-color);
    font-size: var(--token-reference-typography-size-base);
    font-weight: var(--token-reference-typography-weight-medium);

    @container (inline-size >= 36rem) {
      font-size: var(--token-reference-typography-size-lg);
    }
  }

  .project-card__description {
    margin: 0 0 var(--token-reference-spacing-fluid-lg);
    color: var(--token-theme-color-text-secondary);
    font-size: var(--token-reference-typography-size-base);
    line-height: var(--token-reference-typography-line-height-relaxed);

    @container (inline-size >= 36rem) {
      font-size: var(--token-reference-typography-size-lg);
    }
  }

  :global(.project-card__highlights) {
    --card-background: var(--token-theme-color-surface-glass-strong);
    --card-radius: var(--token-reference-radius-lg);
    --card-padding: var(--token-reference-spacing-fluid-lg);
    --card-hover-transform: none;
    --card-hover-iridescent-opacity: 0.3;

    margin-block-end: var(--token-reference-spacing-fluid-lg);
  }

  .project-card__highlight-list {
    display: flex;
    flex-direction: column;
    gap: var(--token-reference-spacing-fluid-sm);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .project-card__highlight-item {
    color: var(--token-theme-color-text-secondary);
    font-size: var(--token-reference-typography-size-sm);
    line-height: var(--token-reference-typography-line-height-relaxed);

    @container (inline-size >= 36rem) {
      font-size: var(--token-reference-typography-size-base);
    }
  }

  .project-card__highlight-label {
    margin-inline-end: var(--token-reference-spacing-2);
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-mono, monospace);
    font-weight: var(--token-reference-typography-weight-semibold);
  }

  .project-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-2);
    margin: 0 0 var(--token-reference-spacing-fluid-xl);
    padding: 0;
    list-style: none;
  }

  .project-card__tag {
    padding: var(--token-reference-spacing-1) var(--token-reference-spacing-3);
    border: var(--token-theme-border-default-small);
    border-radius: var(--token-reference-radius-full);
    background: var(--token-theme-color-surface-glass-strong);
    color: var(--token-theme-color-text-secondary);
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-medium);

    @container (inline-size >= 36rem) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }

  .project-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-reference-spacing-fluid-md);
  }

  .project-card__action-icon {
    display: inline-flex;
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.project-card),
    .project-card__badge-link {
      animation: none;
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  @media (forced-colors: active) {
    :global(.project-card),
    :global(.project-card__banner),
    :global(.project-card__highlights) {
      border-color: CanvasText;
      border-width: var(--token-reference-border-width-large);
    }
  }
</style>
