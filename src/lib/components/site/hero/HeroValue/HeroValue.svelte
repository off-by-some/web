<script lang="ts">
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';

  type Emphasis = { primary?: string; accent?: string };
  type Segment = { text: string; kind: 'plain' | 'primary' | 'accent' };

  type Props = {
    headline: string;
    headlineEmphasis?: Emphasis;
    description: string;
    primaryButtonText: string;
    exploreLinkText?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    repoUrl?: string;
    resumeHref?: string;
    resumeFilename?: string;
    onPrimaryAction?: () => void;
    onExploreClick?: () => void;
  };

  let {
    headline,
    headlineEmphasis,
    description,
    primaryButtonText,
    exploreLinkText,
    linkedinUrl,
    githubUrl,
    repoUrl,
    resumeHref,
    resumeFilename = 'Cassidy-Bridges-Software-Engineering.pdf',
    onPrimaryAction,
    onExploreClick,
  }: Props = $props();

  function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function findWord(
    text: string,
    word: string,
  ): { start: number; end: number; match: string } | null {
    const found = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i').exec(text);
    return found
      ? { start: found.index, end: found.index + found[0].length, match: found[0] }
      : null;
  }

  // Splits the headline around the primary/accent words (if present) so each
  // can be styled distinctly, without requiring markup inside content copy.
  function buildSegments(text: string, emphasis?: Emphasis): Segment[] {
    const matches = (['primary', 'accent'] as const)
      .map((kind) => {
        const word = emphasis?.[kind];
        const found = word ? findWord(text, word) : null;
        return found ? { ...found, kind } : null;
      })
      .filter(
        (
          value,
        ): value is { start: number; end: number; match: string; kind: 'primary' | 'accent' } =>
          value !== null,
      )
      .sort((a, b) => a.start - b.start);

    if (!matches.length) {
      return [{ text, kind: 'plain' }];
    }

    const segments: Segment[] = [];
    let cursor = 0;

    for (const match of matches) {
      if (match.start > cursor) {
        segments.push({ text: text.slice(cursor, match.start), kind: 'plain' });
      }
      segments.push({ text: match.match, kind: match.kind });
      cursor = match.end;
    }

    if (cursor < text.length) {
      segments.push({ text: text.slice(cursor), kind: 'plain' });
    }

    return segments;
  }

  const headlineSegments = $derived(buildSegments(headline, headlineEmphasis));

  function handleContactClick(event: MouseEvent) {
    if (onPrimaryAction) {
      event.preventDefault();
      onPrimaryAction();
    }
  }

  function handleExploreClick(event: MouseEvent) {
    if (onExploreClick) {
      event.preventDefault();
      onExploreClick();
    }
  }
</script>

<div class="value-section">
  <h2 class="value-headline">
    {#each headlineSegments as segment, index (index)}
      {#if segment.kind === 'primary'}<mark class="value-headline__hl value-headline__hl--primary"
          >{segment.text}</mark
        >{:else if segment.kind === 'accent'}<mark
          class="value-headline__hl value-headline__hl--accent"
          >{segment.text}<svg
            class="value-headline__underline"
            viewBox="0 0 100 14"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2,5 Q50,15 98,5"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg></mark
        >{:else}{segment.text}{/if}
    {/each}
  </h2>
  <p class="value-description">{description}</p>

  <div class="actions">
    <div class="actions__row">
      <HeroActionLink
        href="#contact"
        label={primaryButtonText}
        icon="arrow"
        shape="label"
        onclick={handleContactClick}
      />

      {#if exploreLinkText}
        <a class="actions__explore" href="#experience" onclick={handleExploreClick}>
          {exploreLinkText}
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      {/if}
    </div>

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

      {#if repoUrl}
        <HeroActionLink
          href={repoUrl}
          label="Star this project on GitHub"
          icon="star"
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
    </div>
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .value-section {
    display: flex;
    flex-direction: column;
    gap: clamp(1.35rem, 2.7vh, 2.15rem);
    text-align: center;

    @include motion.fade-in-up(heroValueIn, 1.5rem, 1s, 0.6s);

    @media (min-width: $breakpoint-lg) {
      text-align: left;
    }
  }

  .value-headline {
    max-width: 16ch;
    font-size: clamp(var(--token-font-size-2xl), 7vw, var(--token-font-size-4xl));
    font-weight: var(--token-font-weight-medium);
    line-height: 1.14;
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-tight);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      max-width: 21ch;
      font-size: clamp(var(--token-font-size-3xl), 5.2vw, var(--token-font-size-5xl));
      line-height: 1.12;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-lg) {
      max-width: 22ch;
      font-size: clamp(var(--token-font-size-3xl), 2.65vw, var(--token-font-size-5xl));
      letter-spacing: var(--token-letter-spacing-normal);
      margin-inline: 0;
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: clamp(var(--token-font-size-4xl), 2.45vw, var(--token-font-size-6xl));
    }
  }

  .value-headline__hl {
    position: relative;
    background: none;
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-interactive-color);
  }

  .value-headline__underline {
    position: absolute;
    left: 0.05em;
    right: 0.05em;
    bottom: -0.3em;
    width: calc(100% - 0.1em);
    height: 0.32em;
    color: var(--token-emphasis-color);
    overflow: visible;
  }

  .value-description {
    max-width: 41rem;
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      line-height: var(--token-line-height-loose);
      max-width: 44rem;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
      max-width: 41rem;
      margin-inline: 0;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.95rem, 2vh, 1.55rem);
    flex-direction: column;
    margin-top: var(--token-space-fluid-md);

    @include motion.fade-in-up(heroActionsIn, 1.5rem, 0.6s, 0.8s);

    @media (min-width: $breakpoint-lg) {
      align-items: flex-start;
    }
  }

  .actions__row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-md) var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-lg) {
      justify-content: flex-start;
    }
  }

  .actions__explore {
    --explore-link-color: color-mix(
      in srgb,
      var(--token-interactive-color) 54%,
      var(--token-text-secondary)
    );

    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    color: var(--explore-link-color);
    font-weight: var(--token-font-weight-semibold);
    text-decoration: none;
    transition:
      color 0.3s var(--token-motion-ease-out),
      gap 0.3s var(--token-motion-ease-out);

    &:hover,
    &:focus-visible {
      color: var(--token-attention-color);
      gap: var(--token-space-fluid-sm);
    }

    &:focus-visible {
      outline: 2px solid var(--explore-link-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-xs);
    }
  }

  .action-icons {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-md);

    @media (max-width: $breakpoint-sm) {
      gap: var(--token-space-fluid-sm);
    }
  }

  @include motion.reduced-motion-reset('.value-section, .actions');

  @media (prefers-contrast: high) {
    .value-headline {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
    }
  }

  @media print {
    .actions {
      display: none;
    }
  }
</style>
