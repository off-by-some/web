<script lang="ts">
  import type { ResumeContact, ResumeContactKind, ResumeData } from './resume-model';
  import ResumeContactIcon from './ResumeContactIcon.svelte';

  interface Props {
    name: ResumeData['name'];
    role: ResumeData['role'];
    contacts: ResumeData['contacts'];
  }

  const { name, role, contacts }: Props = $props();

  function resolvedKind(contact: ResumeContact): ResumeContactKind {
    if (contact.kind) return contact.kind;
    if (!contact.href) return 'location';
    if (contact.href.startsWith('mailto:')) return 'email';
    if (contact.href.includes('linkedin')) return 'linkedin';
    if (contact.href.includes('github')) return 'github';
    return 'link';
  }
</script>

<header class="rh">
  <h1 class="rh__name">{name}</h1>
  <p class="rh__role">{role}</p>
  <div class="rh__contacts">
    {#each contacts as contact, i (contact.label)}
      {#if i > 0}
        <span class="rh__sep" aria-hidden="true">|</span>
      {/if}
      <span class="rh__contact">
        <span class="rh__icon" aria-hidden="true">
          <ResumeContactIcon kind={resolvedKind(contact)} />
        </span>
        {#if contact.href}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={contact.href}
            class="rh__link"
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
  .rh {
    text-align: center;
    margin-block-end: 1.1rem;
  }

  .rh__name {
    font-size: clamp(2rem, 4.5vw, 2.7rem);
    font-weight: var(--token-reference-typography-weight-bold, 700);
    letter-spacing: var(--token-reference-typography-letter-spacing-tight, -0.015em);
    color: var(--resume-color-ink);
    margin: 0 0 0.2rem;
    line-height: var(--token-reference-typography-line-height-tight, 1.1);
  }

  .rh__role {
    font-size: 0.72rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-section);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0 0 0.6rem;
  }

  .rh__contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.15rem 0;
    align-items: center;
    justify-content: center;
  }

  .rh__contact {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: var(--resume-color-muted);
  }

  .rh__icon {
    display: inline-flex;
    align-items: center;
    color: var(--resume-color-section);
    flex-shrink: 0;
  }

  .rh__link {
    color: var(--resume-color-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .rh__sep {
    color: var(--resume-color-soft);
    font-size: 0.75rem;
    padding: 0 0.45rem;
    opacity: 0.5;
  }
</style>
