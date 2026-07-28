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
    gap: clamp(1.05rem, 4svw, 1.75rem);
    text-align: center;
    container-type: inline-size;

    @include motion.fade-in-up(
      heroValueIn,
      1.5rem,
      var(--token-theme-motion-enter-default),
      var(--token-reference-motion-delay-600)
    );

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      text-align: left;
    }
  }

  .value-headline {
    max-inline-size: 17ch;
    font-size: clamp(
      var(--token-reference-typography-size-2xl),
      6.65vw,
      var(--token-reference-typography-size-4xl)
    );
    font-weight: var(--token-reference-typography-weight-medium);
    line-height: 1.14;
    color: var(--token-theme-color-text-secondary);
    letter-spacing: var(--token-reference-typography-letter-spacing-tight);
    margin: 0 auto;
    text-wrap: balance;

    @media (min-width: $breakpoint-md) {
      max-inline-size: 21ch;
      font-size: clamp(
        var(--token-reference-typography-size-3xl),
        4.6vw,
        var(--token-reference-typography-size-4xl)
      );
      line-height: 1.12;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      max-inline-size: 24ch;
      font-size: clamp(2.25rem, 5.8cqw, 4.6rem);
      line-height: 1.11;
      letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
      margin-inline: 0;
    }
  }

  .value-headline__hl {
    position: relative;
    background: none;
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-interactive-color);
  }

  .value-headline__underline {
    position: absolute;
    inset-inline: 0.05em;
    block-size: 0.32em;
    inline-size: calc(100% - 0.1em);
    inset-block-end: -0.3em;
    color: var(--token-theme-color-emphasis-color);
    overflow: visible;
  }

  .value-description {
    max-inline-size: 36rem;
    font-size: var(--token-reference-typography-size-base);
    line-height: var(--token-reference-typography-line-height-relaxed);
    color: var(--token-theme-color-text-secondary);
    margin: 0 auto;
    text-wrap: pretty;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-lg);
      line-height: var(--token-reference-typography-line-height-loose);
      max-inline-size: 47rem;
      margin-inline: auto;
    }

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      font-size: clamp(
        var(--token-reference-typography-size-lg),
        2.5cqw,
        var(--token-reference-typography-size-xl)
      );
      letter-spacing: var(--token-reference-typography-letter-spacing-wide);
      max-inline-size: clamp(39rem, 88cqw, 41rem);
      margin-inline: 0;
    }
  }

  @include motion.reduced-motion-reset('.value-section');

  @media (prefers-contrast: high) {
    .value-headline {
      text-shadow: none;
      font-weight: var(--token-reference-typography-weight-bold);
      color: var(--token-theme-color-text-primary);
    }
  }
</style>
