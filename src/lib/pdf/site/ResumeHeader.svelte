<script lang="ts">
  import type { ResumeData } from './resume-model';
  import { resolveResumeContactKind } from './resume-model';
  import ResumeContactIcon from './ResumeContactIcon.svelte';

  interface Props {
    name: ResumeData['name'];
    role: ResumeData['role'];
    contacts: ResumeData['contacts'];
  }

  const { name, role, contacts }: Props = $props();
</script>

<header class="resume-header">
  <h1 class="resume-header__name">{name}</h1>
  <p class="resume-header__role">{role}</p>
  <div class="resume-header__contacts">
    {#each contacts as contact, i (contact.label)}
      {#if i > 0}
        <span class="resume-header__separator" aria-hidden="true">|</span>
      {/if}
      <span class="resume-header__contact">
        <span class="resume-header__icon" aria-hidden="true">
          <ResumeContactIcon kind={resolveResumeContactKind(contact)} />
        </span>
        {#if contact.href}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={contact.href}
            class="resume-header__link"
            target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={contact.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >{contact.label}</a
          >
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {:else}
          <span>{contact.label}</span>
        {/if}
      </span>
    {/each}
  </div>
</header>

<style lang="scss">
  .resume-header {
    text-align: center;
  }

  .resume-header__name {
    font-size: 2.7rem;
    font-weight: var(--token-reference-typography-weight-bold, 700);
    letter-spacing: var(--token-reference-typography-letter-spacing-tight, -0.015em);
    color: var(--resume-color-ink);
    margin: 0;
    margin-block-end: 0.2rem;
    line-height: var(--token-reference-typography-line-height-tight, 1.1);
  }

  .resume-header__role {
    display: block;
    inline-size: 100%;
    font-size: 0.72rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-section);
    letter-spacing: 0.12em;
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    margin-block-end: 0.6rem;
  }

  .resume-header__contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.15rem 0;
    align-items: center;
    justify-content: center;
  }

  .resume-header__contact {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--resume-color-muted);
  }

  .resume-header__icon {
    display: inline-flex;
    align-items: center;
    color: var(--resume-color-section);
    flex-shrink: 0;
  }

  .resume-header__link {
    color: var(--resume-color-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .resume-header__separator {
    color: var(--resume-color-soft);
    font-size: 0.75rem;
    padding-inline: 0.45rem;
    opacity: 0.5;
  }
</style>
