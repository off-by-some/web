<script lang="ts">
  import type { ResumeData, ResumeSection as ResumeSectionData } from './resume-model';
  import ResumeExperience from './ResumeExperience.svelte';
  import ResumeHeader from './ResumeHeader.svelte';
  import ResumeProject from './ResumeProject.svelte';
  import ResumeSection from './ResumeSection.svelte';
  import ResumeSkills from './ResumeSkills.svelte';

  interface Props {
    resume: ResumeData;
  }

  const { resume }: Props = $props();

  function sectionIsLast(sections: ResumeSectionData[], index: number) {
    return index === sections.length - 1;
  }
</script>

<div class="sheet" data-resume-document>
  {#each resume.pages as page, pi (page.id)}
    <div class="page-stage">
      <article class="resume-page" data-resume-page aria-label={page.ariaLabel}>
        {#if page.showHeader}
          <ResumeHeader name={resume.name} role={resume.role} contacts={resume.contacts} />
        {/if}

        {#each page.sections as section, i (section.id)}
          <ResumeSection title={section.title} last={sectionIsLast(page.sections, i)}>
            {#if section.kind === 'summary'}
              <p class="rs__body">{section.body}</p>
            {:else if section.kind === 'experience'}
              {#each section.entries as exp, ei (`${section.id}:${exp.company}:${exp.title}:${exp.date}`)}
                <ResumeExperience density={section.density} experience={exp} index={ei} />
              {/each}
            {:else if section.kind === 'projects'}
              {#each section.entries as project (project.href)}
                <ResumeProject {project} />
              {/each}
            {:else if section.kind === 'skills'}
              <ResumeSkills categories={section.categories} />
            {/if}
          </ResumeSection>
        {/each}
      </article>

      <div class="page-label" aria-hidden="true">
        Page {pi + 1} <span class="page-label__of">of {resume.pages.length}</span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .sheet {
    --resume-font-family: Helvetica, 'Nimbus Sans', Arial, sans-serif;
    --resume-color-paper: #fff;
    --resume-color-ink: var(--token-theme-color-text-dark, #0d1117);
    --resume-color-body: color-mix(in srgb, var(--resume-color-ink) 74%, var(--resume-color-paper));
    --resume-color-muted: color-mix(
      in srgb,
      var(--resume-color-ink) 54%,
      var(--resume-color-paper)
    );
    --resume-color-soft: color-mix(in srgb, var(--resume-color-ink) 36%, var(--resume-color-paper));
    --resume-color-link: color-mix(in srgb, #0969da 30%, var(--resume-color-section, #136353));
    --resume-color-accent: var(--token-theme-color-interactive-color, #1de9b6);
    --resume-color-section: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color, #1de9b6) 38%,
      var(--resume-color-ink)
    );
    --resume-color-highlight: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color, #1de9b6) 38%,
      var(--resume-color-ink)
    );
    --resume-shadow-page:
      0 1px 3px color-mix(in srgb, var(--resume-color-ink) 18%, transparent),
      0 6px 20px color-mix(in srgb, var(--resume-color-ink) 36%, transparent),
      0 28px 56px color-mix(in srgb, var(--resume-color-ink) 48%, transparent),
      0 0 0 1px color-mix(in srgb, var(--resume-color-paper) 6%, transparent),
      0 0 90px -25px color-mix(in srgb, var(--resume-color-accent) 22%, transparent);

    max-width: 52rem;
    margin: 0 auto;
    font-family: var(--resume-font-family);
  }

  .page-stage {
    & + & {
      margin-block-start: 2rem;
    }
  }

  .resume-page {
    position: relative;
    aspect-ratio: 8.5 / 11;
    background: var(--resume-color-paper);
    color: var(--resume-color-body);
    border-radius: var(--token-reference-radius-xs, 0.375rem);
    box-shadow: var(--resume-shadow-page);
    padding: 2.85rem 3.35rem 3rem;

    &::before {
      content: '';
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      width: 3px;
      background: linear-gradient(
        to bottom,
        var(--resume-color-accent, #1de9b6),
        color-mix(in srgb, var(--resume-color-accent, #1de9b6) 20%, transparent)
      );
      border-radius: 0.375rem 0 0 0.375rem;
      pointer-events: none;
    }
  }

  .page-label {
    margin-block-start: 0.85rem;
    text-align: center;
    font-size: 0.6875rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--resume-color-accent, #1de9b6) 45%, rgba(255, 255, 255, 0.2));
    user-select: none;
  }

  .page-label__of {
    opacity: 0.55;
  }

  .rs__body {
    font-size: 0.86rem;
    line-height: var(--token-reference-typography-line-height-normal, 1.4);
    color: var(--resume-color-body);
    margin: 0;
  }
</style>
