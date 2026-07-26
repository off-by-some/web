<script lang="ts">
  import type { HeroHeadlineEmphasis, HeroValueModel } from '$lib/components/site/hero/types';

  type Segment = { key: string; text: string; kind: 'plain' | 'primary' | 'accent' };

  type Props = HeroValueModel;

  let { headline, headlineEmphasis, description }: Props = $props();

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
  function buildSegments(text: string, emphasis?: HeroHeadlineEmphasis): Segment[] {
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
      return [{ key: `plain-0-${text.length}`, text, kind: 'plain' }];
    }

    const segments: Segment[] = [];
    let cursor = 0;

    for (const match of matches) {
      if (match.start > cursor) {
        segments.push({
          key: `plain-${cursor}-${match.start}`,
          text: text.slice(cursor, match.start),
          kind: 'plain',
        });
      }
      segments.push({
        key: `${match.kind}-${match.start}-${match.end}`,
        text: match.match,
        kind: match.kind,
      });
      cursor = match.end;
    }

    if (cursor < text.length) {
      segments.push({
        key: `plain-${cursor}-${text.length}`,
        text: text.slice(cursor),
        kind: 'plain',
      });
    }

    return segments;
  }

  const headlineSegments = $derived(buildSegments(headline, headlineEmphasis));
</script>

<div class="value-section">
  <h2 class="value-headline">
    {#each headlineSegments as segment (segment.key)}
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
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .value-section {
    display: flex;
    flex-direction: column;
    gap: clamp(1.35rem, 2.7vh, 2.15rem);
    text-align: center;

    @include motion.fade-in-up(
      heroValueIn,
      1.5rem,
      var(--token-motion-duration-entrance),
      var(--token-motion-delay-slow)
    );

    @media (min-width: $breakpoint-lg) {
      text-align: left;
    }
  }

  .value-headline {
    max-inline-size: 16ch;
    font-size: clamp(var(--token-font-size-2xl), 7vw, var(--token-font-size-4xl));
    font-weight: var(--token-font-weight-medium);
    line-height: 1.14;
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-tight);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      max-inline-size: 21ch;
      font-size: clamp(var(--token-font-size-3xl), 5.2vw, var(--token-font-size-5xl));
      line-height: 1.12;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-lg) {
      max-inline-size: 22ch;
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
    inset-inline: 0.05em;
    block-size: 0.32em;
    inline-size: calc(100% - 0.1em);
    inset-block-end: -0.3em;
    color: var(--token-emphasis-color);
    overflow: visible;
  }

  .value-description {
    max-inline-size: 41rem;
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      line-height: var(--token-line-height-loose);
      max-inline-size: 44rem;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
      letter-spacing: var(--token-letter-spacing-wide);
      max-inline-size: 41rem;
      margin-inline: 0;
    }
  }

  @include motion.reduced-motion-reset('.value-section');

  @media (prefers-contrast: high) {
    .value-headline {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
    }
  }
</style>
