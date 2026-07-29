<script lang="ts">
  import type { Project } from './resume-model';

  interface Props {
    project: Project;
  }

  const { project }: Props = $props();
</script>

<div class="resume-project">
  <div class="resume-project__header">
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={project.href} class="resume-project__name" target="_blank" rel="noopener noreferrer"
      >{project.name}</a
    >
    <span class="resume-project__url" aria-hidden="true">{project.displayHref}</span>
  </div>
  <p class="resume-project__tagline">{project.tagline}</p>
</div>

<style lang="scss">
  .resume-project {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .resume-project__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.625rem;
    margin-block-end: 0.05rem;
  }

  .resume-project__name {
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

  .resume-project__url {
    font-size: 0.75rem;
    color: var(--resume-color-link, #0969da);
    text-align: end;
    overflow-wrap: anywhere;
  }

  .resume-project__tagline {
    font-size: 0.79rem;
    color: var(--resume-color-body, #374151);
    margin: 0;
    font-style: italic;
  }
</style>
