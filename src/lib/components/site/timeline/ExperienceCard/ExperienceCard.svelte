<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';
  import { withBasePath } from '$lib/utils/paths';

  interface Experience {
    title: string;
    company: string;
    logo: string;
    date: string;
    dateValue: string;
    location: string;
    summary: string;
    highlights: string[];
    skills: string[];
  }

  type Props = {
    experience: Experience;
    index: number;
    delay?: string;
    active?: boolean;
    expanded?: boolean;
    detailsClickable?: boolean;
    onDetailsToggleRequested?: () => void;
  };

  let {
    experience,
    index,
    delay = '0s',
    active = false,
    expanded = false,
    detailsClickable = false,
    onDetailsToggleRequested,
  }: Props = $props();

  function parseMarkdownToSegments(
    text: string,
  ): Array<{ type: 'text' | 'link'; content: string; url?: string }> {
    const segments: Array<{ type: 'text' | 'link'; content: string; url?: string }> = [];
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }

      const linkText = match[1];
      const url = match[2];

      if (url.match(/^(https?:\/\/|\/)/)) {
        segments.push({ type: 'link', content: linkText, url });
      } else {
        segments.push({ type: 'text', content: match[0] });
      }

      lastIndex = markdownLinkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      segments.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return segments;
  }

  const experienceDetailsId = $derived(
    `experience-${experience.company}-${experience.dateValue}-details`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  );

  const handleDetailsRequest = () => onDetailsToggleRequested?.();
  const handleExpandClick = (event: MouseEvent) => {
    event.stopPropagation();
    onDetailsToggleRequested?.();
  };
  const resolveHref = (href = ''): string => withBasePath(href);
</script>

<article
  class="timeline-item"
  class:timeline-item--active={active}
  class:timeline-item--expanded={expanded}
  class:timeline-item--left={index % 2 === 0}
  class:timeline-item--right={index % 2 === 1}
  data-timeline-index={index}
  data-company={experience.company}
  style="--timeline-item-delay: {delay};"
>
  <div class="timeline-marker" aria-hidden="true">
    <div class="timeline-dot"></div>
    <div class="timeline-date">{experience.dateValue}</div>
  </div>

  <Card
    className="experience-card {detailsClickable ? 'experience-card--clickable' : ''}"
    onclick={detailsClickable ? handleDetailsRequest : undefined}
    aria-label={detailsClickable
      ? `View details for ${experience.title} at ${experience.company}`
      : undefined}
  >
    <header class="card-header">
      <IconTile src={experience.logo} alt="" sizes="56px" className="card-logo" />

      <div class="card-meta">
        <h3 class="card-title">{experience.title}</h3>
        <div class="card-company">{experience.company}</div>
        <div class="card-period">{experience.date} • {experience.location}</div>
      </div>

      <button
        class="expand-button"
        onclick={handleExpandClick}
        aria-expanded={expanded}
        aria-controls={experienceDetailsId}
        aria-label="{expanded ? 'Less' : 'More'} - {expanded
          ? 'hide'
          : 'show'} details for {experience.title}"
      >
        <span class="expand-button__text">{expanded ? 'Less' : 'More'}</span>
        <svg class="expand-button__icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>

    <div class="card-summary">
      {#each parseMarkdownToSegments(experience.summary) as segment, i (segment.type + i)}
        {#if segment.type === 'link'}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={resolveHref(segment.url)}
            target="_blank"
            rel="noopener noreferrer"
            class="highlight-link"
          >
            {segment.content}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {:else}
          {segment.content}
        {/if}
      {/each}
    </div>

    <div
      class="card-details"
      class:card-details--expanded={expanded}
      id={experienceDetailsId}
      aria-hidden={!expanded}
      inert={!expanded || undefined}
    >
      <Card className="highlights">
        <h4 class="highlights__title">Key Achievements</h4>
        <ul class="highlights__list">
          {#each experience.highlights as highlight (highlight)}
            <li class="highlights__item">
              {#each parseMarkdownToSegments(highlight) as segment, j (segment.type + j)}
                {#if segment.type === 'link'}
                  <!-- eslint-disable svelte/no-navigation-without-resolve -->
                  <a
                    href={resolveHref(segment.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="highlight-link">{segment.content}</a
                  >
                  <!-- eslint-enable svelte/no-navigation-without-resolve -->
                {:else}
                  {segment.content}
                {/if}
              {/each}
            </li>
          {/each}
        </ul>
      </Card>

      <div class="skills">
        {#each experience.skills as skill (skill)}
          <span class="skill">{skill}</span>
        {/each}
      </div>
    </div>
  </Card>
</article>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .timeline-item {
    position: relative;
    margin-block-end: var(--token-space-fluid-4xl);
    padding-inline-start: var(--token-space-fluid-5xl);

    @include motion.fade-in-up(
      timelineItemFadeIn,
      40px,
      0.8s,
      var(--timeline-item-delay),
      forwards
    );

    @media (min-width: $breakpoint-md) {
      padding-inline-start: var(--token-space-fluid-6xl);
    }

    @media (min-width: $breakpoint-lg) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: var(--token-space-fluid-2xl);
      padding-inline-start: 0;
      margin-block-end: var(--token-space-fluid-5xl);

      &--left :global(.experience-card) {
        grid-column: 1;
        justify-self: end;
        margin-block-start: -5rem;
      }

      &--right :global(.experience-card) {
        margin-block-start: 2rem;
        grid-column: 3;
        justify-self: start;
      }
    }
  }

  .timeline-marker {
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: var(--token-space-fluid-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      inset-inline-start: var(--token-space-fluid-sm);
    }

    @media (min-width: $breakpoint-lg) {
      grid-column: 2;
      position: relative;
      inset-inline-start: auto;
      inset-block-start: var(--token-space-fluid-2xl);
    }
  }

  .timeline-dot {
    inline-size: 1rem;
    block-size: 1rem;
    border-radius: var(--token-radius-full);
    background: var(--token-surface-glass-strong);
    border: 2px solid var(--token-border-color-default);
    transition:
      background-color 0.4s var(--token-motion-ease-out),
      border-color 0.4s var(--token-motion-ease-out),
      box-shadow 0.4s var(--token-motion-ease-out),
      opacity 0.4s var(--token-motion-ease-out),
      transform 0.4s var(--token-motion-ease-out);
    opacity: 0.6;
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      inline-size: 1.25rem;
      block-size: 1.25rem;
    }

    @media (min-width: $breakpoint-lg) {
      inline-size: 1.5rem;
      block-size: 1.5rem;
    }

    .timeline-item--active & {
      background: var(--token-interactive-color);
      border-color: var(--token-interactive-color);
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 0 20px var(--token-interactive-glow);
    }
  }

  .timeline-date {
    margin-block-start: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    white-space: nowrap;
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    border-radius: var(--token-radius-sm);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-lg));

    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  :global(.experience-card) {
    --card-padding: var(--token-space-fluid-xl);
    --card-hover-transform: translateY(-4px) scale(1.01);
    --card-hover-iridescent-opacity: 0.6;

    inline-size: 100%;
    text-align: left;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
      --card-padding: var(--token-space-fluid-3xl);
    }
  }

  :global(.experience-card--clickable) {
    cursor: pointer;
    --card-active-transform: translateY(-2px) scale(1.005);
  }

  .timeline-item--active :global(.experience-card) {
    --card-hover-shadow: var(--token-shadow-elevated), 0 0 40px var(--token-interactive-glow);
    --card-hover-iridescent-opacity: 0.8;

    border-color: var(--token-interactive-color);
    box-shadow:
      var(--token-shadow-elevated),
      0 0 30px var(--token-interactive-glow);
  }

  .timeline-item--expanded :global(.experience-card) {
    box-shadow:
      var(--token-shadow-elevated),
      0 0 25px var(--token-shadow-glow-subtle);
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: var(--token-space-fluid-lg);
    margin-block-end: var(--token-space-fluid-lg);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-xl);
    }
  }

  .card-header :global(.card-logo) {
    --icon-tile-size: 3.5rem;
    --icon-tile-padding: var(--token-space-2);
    --icon-tile-background: var(--token-surface-color);
    --icon-tile-radius: var(--token-radius-lg);
    --icon-tile-image-filter: grayscale(0.2);
  }

  .card-header :global(.card-logo:hover) {
    transform: scale(1.05);
  }

  @media (min-width: $breakpoint-md) {
    .card-header :global(.card-logo) {
      --icon-tile-size: 4rem;
    }
  }

  .card-meta {
    flex: 1;
    min-inline-size: 0;
  }

  .card-title {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-block-end: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
    }
  }

  .card-company {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-emphasis-default);
    margin-block-end: var(--token-space-fluid-xs);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .card-period {
    font-size: var(--token-font-size-sm);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-relaxed);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .expand-button {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    cursor: pointer;
    transition:
      background-color 0.3s var(--token-motion-ease-out),
      border-color 0.3s var(--token-motion-ease-out),
      box-shadow 0.3s var(--token-motion-ease-out),
      color 0.3s var(--token-motion-ease-out),
      transform 0.3s var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    flex-shrink: 0;

    &:hover {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: translateY(-2px) scale(1.05);
      border-color: var(--token-interactive-color);
      box-shadow: 0 0 15px var(--token-interactive-glow);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
    }

    .timeline-item--expanded & {
      .expand-button__icon {
        transform: rotate(180deg);
      }
    }

    @media (max-width: calc($breakpoint-sm - 1px)) {
      padding: var(--token-space-2);
      border-radius: var(--token-radius-full);
      min-inline-size: 2.5rem;
      block-size: 2.5rem;
      justify-content: center;

      .expand-button__text {
        display: none;
      }
    }
  }

  .expand-button__icon {
    transition: transform var(--token-motion-duration-normal) var(--token-motion-ease-out);
    flex-shrink: 0;
  }

  .card-summary {
    font-size: var(--token-font-size-base);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin-block-end: var(--token-space-fluid-lg);
    position: relative;
    z-index: 1;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .highlight-link {
    color: var(--token-interactive-color);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 2px;
    transition:
      color var(--token-motion-duration-fast) var(--token-motion-ease-out),
      text-decoration-color var(--token-motion-duration-fast) var(--token-motion-ease-out);
    font-weight: var(--token-font-weight-medium);

    &:hover {
      color: var(--token-interactive-hover);
      text-decoration-color: var(--token-interactive-hover);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
      border-radius: var(--token-radius-xs);
    }
  }

  .card-details {
    max-block-size: 0;
    overflow: hidden;
    transition: max-block-size var(--token-motion-duration-emphasis) var(--token-motion-ease-out);
    position: relative;
    z-index: 1;

    &--expanded {
      max-block-size: 100rem;
    }
  }

  :global(.highlights) {
    --card-background: var(--token-surface-glass-strong);
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-lg);
    --card-hover-transform: none;
    --card-hover-iridescent-opacity: 0.3;

    margin-block-end: var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-xl);
    }
  }

  .highlights__title {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-block-end: var(--token-space-fluid-md);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }
  }

  .highlights__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlights__item {
    position: relative;
    padding-inline-start: var(--token-space-fluid-lg);
    margin-block-end: var(--token-space-fluid-sm);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    font-size: var(--token-font-size-sm);

    &::before {
      content: '✓';
      position: absolute;
      inset-inline-start: 0;
      color: var(--token-text-emphasis-default);
      font-weight: var(--token-font-weight-semibold);
    }

    &:last-child {
      margin-block-end: 0;
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-sm);
  }

  .skill {
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    background: var(--token-tint-highlight);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-primary);
    white-space: nowrap;
    transition:
      background-color 0.3s var(--token-motion-ease-out),
      color 0.3s var(--token-motion-ease-out),
      transform 0.3s var(--token-motion-ease-out);

    &:hover {
      background: var(--token-interactive-color);
      color: var(--token-text-dark);
      transform: translateY(-1px);
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
    }
  }

  @media (max-width: calc($breakpoint-sm - 1px)) {
    .timeline-item {
      padding-inline-start: 0;
      margin-block-end: var(--token-space-fluid-2xl);
    }

    .timeline-marker {
      display: none;
    }

    :global(.experience-card) {
      --card-padding: var(--token-space-fluid-lg);
      --card-radius: var(--token-radius-lg) var(--token-radius-lg) var(--token-radius-lg)
        var(--token-radius-sm);

      border-inline-start: 3px solid transparent;
    }

    .timeline-item--active :global(.experience-card) {
      border-inline-start-color: var(--token-interactive-color);
      box-shadow:
        var(--token-shadow-elevated),
        3px 0 20px var(--token-interactive-glow);
    }

    .card-header {
      gap: var(--token-space-fluid-md);
      margin-block-end: var(--token-space-fluid-md);
    }

    .card-header :global(.card-logo) {
      --icon-tile-size: 3rem;
    }

    .card-title {
      font-size: var(--token-font-size-lg);
      margin-block-end: var(--token-space-1);
    }

    .card-company {
      font-size: var(--token-font-size-base);
      margin-block-end: var(--token-space-1);
    }

    .card-period {
      font-size: var(--token-font-size-sm);
    }

    .card-summary {
      font-size: var(--token-font-size-base);
      margin-block-end: var(--token-space-fluid-md);
    }

    .expand-button {
      padding: var(--token-space-2);
      border-radius: var(--token-radius-full);
      min-inline-size: 2.5rem;
      block-size: 2.5rem;
      justify-content: center;

      .expand-button__text {
        display: none;
      }
    }

    :global(.highlights) {
      --card-padding: var(--token-space-fluid-md);
      margin-block-end: var(--token-space-fluid-md);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline-item {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .timeline-dot,
    :global(.experience-card),
    .expand-button,
    .skill {
      transition: none;
    }
  }

  @media (prefers-contrast: high) {
    :global(.experience-card),
    :global(.highlights) {
      border-width: 2px;
      border-color: currentColor;
    }
  }

  @media print {
    :global(.experience-card) {
      --card-background: white;

      border: var(--token-border-default-small);
      break-inside: avoid;
    }

    .expand-button {
      display: none;
    }

    .card-details {
      max-block-size: none;
      overflow: visible;
    }
  }
  @include motion.reduced-motion-reset('.timeline-item');
</style>
