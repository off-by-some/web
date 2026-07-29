<script lang="ts">
  import { Document, Page, Paragraph } from '$lib/pdf/primitives';
  import { interPdfFonts } from '$lib/pdf/fonts';

  import type { ResumeData } from './resume-model';
  import ResumeExperience from './ResumeExperience.svelte';
  import ResumeHeader from './ResumeHeader.svelte';
  import ResumeProject from './ResumeProject.svelte';
  import ResumeSection from './ResumeSection.svelte';
  import ResumeSkills from './ResumeSkills.svelte';

  interface Props {
    download?: (() => Promise<void>) | undefined;
    resume: ResumeData;
  }

  let { download = $bindable(), resume }: Props = $props();
</script>

<Document
  bind:download
  filename={resume.filename}
  fonts={interPdfFonts}
  renderWidth="52rem"
  class="resume-document"
>
  {#each resume.pages as page, pi (page.id)}
    <div class="resume-document__page-stage">
      <Page class="resume-page" aria-label={page.ariaLabel}>
        <span class="resume-page__accent" aria-hidden="true"></span>

        {#if page.showHeader}
          <div class="resume-page__header">
            <ResumeHeader name={resume.name} role={resume.role} contacts={resume.contacts} />
          </div>
        {/if}

        <div class="resume-page__sections">
          {#each page.sections as section (section.id)}
            <ResumeSection title={section.title}>
              {#if section.kind === 'summary'}
                <Paragraph class="resume-section-body">{section.body}</Paragraph>
              {:else if section.kind === 'experience'}
                <div
                  class="resume-section-stack resume-section-stack--experience"
                  class:resume-section-stack--compact={section.density === 'compact'}
                >
                  {#each section.entries as exp (`${section.id}:${exp.company}:${exp.title}:${exp.date}`)}
                    <ResumeExperience density={section.density} experience={exp} />
                  {/each}
                </div>
              {:else if section.kind === 'projects'}
                <div class="resume-section-stack resume-section-stack--projects">
                  {#each section.entries as project (project.href)}
                    <ResumeProject {project} />
                  {/each}
                </div>
              {:else if section.kind === 'skills'}
                <ResumeSkills categories={section.categories} />
              {/if}
            </ResumeSection>
          {/each}
        </div>
      </Page>

      <div class="resume-document__page-label" aria-hidden="true">
        Page {pi + 1} <span class="resume-document__page-count">of {resume.pages.length}</span>
      </div>
    </div>
  {/each}
</Document>

<style lang="scss">
  :global(.resume-document) {
    --resume-font-family: Inter, Helvetica, 'Nimbus Sans', Arial, sans-serif;
    --resume-color-paper: #fff;
    --resume-color-ink: #080a18;
    --resume-color-name: #000;
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
    --resume-color-highlight: var(--resume-color-section);
    --resume-shadow-page:
      0 1px 3px color-mix(in srgb, var(--resume-color-ink) 18%, transparent),
      0 6px 20px color-mix(in srgb, var(--resume-color-ink) 36%, transparent),
      0 28px 56px color-mix(in srgb, var(--resume-color-ink) 48%, transparent),
      0 0 0 1px color-mix(in srgb, var(--resume-color-paper) 6%, transparent),
      0 0 90px -25px color-mix(in srgb, var(--resume-color-accent) 22%, transparent);

    inline-size: min(100%, 52rem);
    max-inline-size: 52rem;
    margin-block: 0;
    margin-inline: auto;
    font-family: var(--resume-font-family);
  }

  .resume-document__page-stage {
    & + & {
      margin-block-start: 2rem;
    }
  }

  :global(.resume-page) {
    position: relative;
    aspect-ratio: 8.5 / 11;
    background: var(--resume-color-paper);
    color: var(--resume-color-body);
    border-radius: var(--token-reference-radius-xs, 0.375rem);
    box-shadow: var(--resume-shadow-page);
    padding-block-start: 2.85rem;
    padding-block-end: 3rem;
    padding-inline: 3.35rem;
    display: flex;
    flex-direction: column;
  }

  .resume-page__accent {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    inline-size: 3px;
    background-color: var(--resume-color-accent, #1de9b6);
    opacity: 0.72;
    border-start-start-radius: 0.375rem;
    border-end-start-radius: 0.375rem;
    pointer-events: none;
  }

  .resume-page__header {
    margin-block-end: 1.2rem;
  }

  .resume-page__sections {
    display: flex;
    flex-direction: column;
    gap: 1.08rem;
  }

  .resume-section-stack {
    display: flex;
    flex-direction: column;
  }

  .resume-section-stack--experience {
    gap: 0.95rem;
  }

  .resume-section-stack--compact {
    gap: 0.72rem;
  }

  .resume-section-stack--projects {
    gap: 0.58rem;
  }

  .resume-document__page-label {
    margin-block-start: 0.85rem;
    text-align: center;
    font-size: 0.6875rem;
    font-weight: var(--token-reference-typography-weight-medium, 500);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--resume-color-accent, #1de9b6) 45%, rgba(255, 255, 255, 0.2));
    user-select: none;
  }

  .resume-document__page-count {
    opacity: 0.55;
  }

  :global(.resume-section-body) {
    font-size: 0.86rem;
    line-height: 1.36;
    color: var(--resume-color-body);
    margin: 0;
  }
</style>
