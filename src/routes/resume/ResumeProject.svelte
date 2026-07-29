<script lang="ts">
  import type { Project } from './resume-model';

  interface Props {
    project: Project;
  }

  const { project }: Props = $props();
</script>

<div class="proj">
  <div class="proj__title-row">
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={project.href} class="proj__name" target="_blank" rel="noopener noreferrer"
      >{project.name}</a
    >
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={project.href} class="proj__url" target="_blank" rel="noopener noreferrer"
      >{project.displayHref}</a
    >
  </div>
  <p class="proj__tagline">{project.tagline}</p>
</div>

<style lang="scss">
  .proj {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .proj__title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.625rem;
    margin-block-end: 0.05rem;
  }

  .proj__name {
    font-size: 0.9rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-ink, #0d1117);
    text-decoration: none;
    flex-shrink: 0;

    &:hover {
      color: var(--resume-color-link, #0969da);
      text-decoration: underline;
    }
  }

  .proj__url {
    font-size: 0.75rem;
    color: var(--resume-color-link, #0969da);
    text-decoration: none;
    text-align: end;
    overflow-wrap: anywhere;

    &:hover {
      text-decoration: underline;
    }
  }

  .proj__tagline {
    font-size: 0.79rem;
    color: var(--resume-color-body, #374151);
    margin: 0;
    font-style: italic;
  }
</style>
