<script lang="ts">
  import { Bold, Italic, Link, Paragraph } from '$lib/pdf/primitives';

  import type { Project } from './resume-model';

  interface Props {
    project: Project;
  }

  const { project }: Props = $props();
</script>

<div class="resume-project">
  <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
  <Link href={project.href} class="resume-project__link" target="_blank" rel="noopener noreferrer">
    <Bold class="resume-project__name">{project.name}</Bold>
    <span class="resume-project__url">{project.displayHref}</span>
  </Link>
  <p class="resume-project__tagline">
    <Paragraph><Italic>{project.tagline}</Italic></Paragraph>
  </p>
</div>

<style lang="scss">
  .resume-project {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  :global(.resume-project__link) {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.625rem;
    margin-block-end: 0.05rem;
    color: inherit;
    text-decoration: none;
  }

  :global(.resume-project__link:hover .resume-project__name),
  :global(.resume-project__link:hover .resume-project__url) {
    text-decoration: underline;
  }

  :global(.resume-project__name) {
    font-size: 0.9rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-ink, #0d1117);
    flex-shrink: 0;
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
  }
</style>
