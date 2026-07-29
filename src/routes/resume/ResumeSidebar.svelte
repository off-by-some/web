<script lang="ts">
  import { Card } from '$lib/components/primitives/surfaces';
  import { StatusPill } from '$lib/components/site/status';
  import type { ResumeContact, ResumeContactKind } from './resume-model';
  import ResumeContactIcon from './ResumeContactIcon.svelte';

  interface Props {
    contacts: ResumeContact[];
  }

  const { contacts }: Props = $props();

  function resolvedKind(contact: ResumeContact): ResumeContactKind {
    if (contact.kind) return contact.kind;
    if (!contact.href) return 'location';
    if (contact.href.startsWith('mailto:')) return 'email';
    if (contact.href.includes('linkedin')) return 'linkedin';
    if (contact.href.includes('github')) return 'github';
    return 'link';
  }
</script>

<aside class="sidebar" aria-label="Contact information">
  <StatusPill className="sidebar__status" />

  <Card className="sidebar__card">
    <p class="sidebar__label">Other ways to reach me</p>
    <ul class="sidebar__contacts">
      {#each contacts as contact (contact.label)}
        <li class="sidebar__contact">
          <span class="sidebar__icon">
            <ResumeContactIcon kind={resolvedKind(contact)} size={13} />
          </span>
          {#if contact.href}
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <a
              href={contact.href}
              class="sidebar__link"
              target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={contact.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >{contact.label}</a
            >
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          {:else}
            <span class="sidebar__text">{contact.label}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </Card>
</aside>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  :global(.sidebar__status) {
    align-self: flex-start;
  }

  :global(.sidebar__card) {
    --card-padding: 1rem 1.1rem;
    --card-radius: var(--token-reference-radius-lg, 0.75rem);
    --card-hover-transform: none;
    --card-hover-shadow: var(--token-theme-shadow-default);
  }

  .sidebar__label {
    font-size: 0.6875rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--token-theme-color-text-tertiary, rgba(255, 255, 255, 0.45));
    margin: 0 0 0.65rem;
  }

  .sidebar__contacts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .sidebar__contact {
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .sidebar__icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--token-theme-color-interactive-color, #1de9b6);
    opacity: 0.8;
  }

  .sidebar__link {
    font-size: 0.8125rem;
    color: var(--token-theme-color-text-secondary, rgba(255, 255, 255, 0.75));
    text-decoration: none;
    transition: color 150ms ease;

    &:hover {
      color: var(--token-theme-color-text-primary, rgba(255, 255, 255, 0.95));
      text-decoration: underline;
    }
  }

  .sidebar__text {
    font-size: 0.8125rem;
    color: var(--token-theme-color-text-tertiary, rgba(255, 255, 255, 0.45));
  }
</style>
