<script lang="ts">
  import { PdfFlowText } from '$lib/pdf/primitives';

  import type { Experience } from './resume-model';

  interface Props {
    density?: 'primary' | 'compact';
    experience: Experience;
  }

  const { density = 'primary', experience }: Props = $props();
</script>

<div class="resume-experience" class:resume-experience--compact={density === 'compact'}>
  <div class="resume-experience__header">
    <div class="resume-experience__identity">
      <span class="resume-experience__title">{experience.title}</span>
      <span class="resume-experience__company">{experience.company}</span>
    </div>
    <div class="resume-experience__context">
      <span class="resume-experience__date">{experience.date}</span>
      <span class="resume-experience__location">{experience.location}</span>
    </div>
  </div>
  <ul class="resume-experience__highlights">
    {#each experience.highlights as bullet, bi (`${bi}:${bullet}`)}
      <li class="resume-experience__highlight">
        <span class="resume-experience__marker">-</span>
        <PdfFlowText class="resume-experience__highlight-text">{bullet}</PdfFlowText>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .resume-experience {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-experience__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.625rem;
    margin-block-end: 0.22rem;
  }

  .resume-experience--compact .resume-experience__header {
    margin-block-end: 0.18rem;
  }

  .resume-experience__identity {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .resume-experience__context {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
    flex-shrink: 0;
  }

  .resume-experience__title {
    font-size: 0.98rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-ink, #0d1117);
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .resume-experience--compact .resume-experience__title {
    font-size: 0.9rem;
  }

  .resume-experience__company {
    font-size: 0.8125rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    color: var(--resume-color-highlight, #be185d);
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .resume-experience--compact .resume-experience__company,
  .resume-experience--compact .resume-experience__date {
    font-size: 0.78rem;
  }

  .resume-experience__date {
    font-size: 0.8125rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    color: var(--resume-color-body, #374151);
    white-space: nowrap;
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .resume-experience__location {
    font-size: 0.75rem;
    color: var(--resume-color-muted, #6b7280);
    text-align: end;
  }

  .resume-experience__highlights {
    margin: 0;
    padding-inline-start: 0;
    display: flex;
    flex-direction: column;
    gap: 0.16rem;
    list-style: none;
  }

  .resume-experience__highlight {
    display: grid;
    grid-template-columns: 0.8rem minmax(0, 1fr);
    font-size: 0.8125rem;
    line-height: var(--token-reference-typography-line-height-relaxed, 1.5);
    color: var(--resume-color-body, #374151);
  }

  .resume-experience__marker {
    color: var(--resume-color-section, #136353);
    font-weight: var(--token-reference-typography-weight-semibold, 600);
  }

  .resume-experience--compact .resume-experience__highlight {
    font-size: 0.785rem;
    line-height: var(--token-reference-typography-line-height-normal, 1.4);
  }
</style>
