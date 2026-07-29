<script lang="ts">
  import type { Experience } from './resume-model';
  import { RESUME_PDF_TEXT } from './resume-pdf-contract';

  interface Props {
    density?: 'primary' | 'compact';
    experience: Experience;
  }

  const { density = 'primary', experience }: Props = $props();
</script>

<div class="exp" class:exp--compact={density === 'compact'}>
  <div class="exp__header">
    <div class="exp__left">
      <span class="exp__title">{experience.title}</span>
      <span class="exp__company">{experience.company}</span>
    </div>
    <div class="exp__right">
      <span class="exp__date">{experience.date}</span>
      <span class="exp__loc">{experience.location}</span>
    </div>
  </div>
  <ul class="exp__list">
    {#each experience.highlights as bullet, bi (`${bi}:${bullet}`)}
      <li class="exp__bullet">
        <span class="exp__marker">-</span>
        <span class="exp__bullet-text" data-pdf-text={RESUME_PDF_TEXT.flow}>{bullet}</span>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .exp {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .exp__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.625rem;
    margin-block-end: 0.22rem;
  }

  .exp--compact .exp__header {
    margin-block-end: 0.18rem;
  }

  .exp__left {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .exp__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
    flex-shrink: 0;
  }

  .exp__title {
    font-size: 0.98rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-ink, #0d1117);
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .exp--compact .exp__title {
    font-size: 0.9rem;
  }

  .exp__company {
    font-size: 0.8125rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    color: var(--resume-color-highlight, #be185d);
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .exp--compact .exp__company,
  .exp--compact .exp__date {
    font-size: 0.78rem;
  }

  .exp__date {
    font-size: 0.8125rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    color: var(--resume-color-body, #374151);
    white-space: nowrap;
    line-height: var(--token-reference-typography-line-height-snug, 1.25);
  }

  .exp__loc {
    font-size: 0.75rem;
    color: var(--resume-color-muted, #6b7280);
    text-align: end;
  }

  .exp__list {
    margin: 0;
    padding-inline-start: 0;
    display: flex;
    flex-direction: column;
    gap: 0.16rem;
    list-style: none;
  }

  .exp__bullet {
    display: grid;
    grid-template-columns: 0.8rem minmax(0, 1fr);
    font-size: 0.8125rem;
    line-height: var(--token-reference-typography-line-height-relaxed, 1.5);
    color: var(--resume-color-body, #374151);
  }

  .exp__marker {
    color: var(--resume-color-section, #136353);
    font-weight: var(--token-reference-typography-weight-semibold, 600);
  }

  .exp--compact .exp__bullet {
    font-size: 0.785rem;
    line-height: var(--token-reference-typography-line-height-normal, 1.4);
  }
</style>
