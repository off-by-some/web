<script lang="ts">
  import type { SkillCategory } from './resume-model';

  interface Props {
    categories: SkillCategory[];
  }

  const { categories }: Props = $props();
</script>

<dl class="skills">
  {#each categories as category (category.name)}
    <div class="skills__row">
      <dt class="skills__cat">{category.name}:</dt>
      <dd class="skills__list">{category.skills.join(', ')}</dd>
    </div>
  {/each}
</dl>

<style lang="scss">
  .skills {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
  }

  .skills__row {
    display: grid;
    grid-template-columns: 10.25rem minmax(0, 1fr);
    gap: 0.45rem;
    align-items: start;
  }

  .skills__cat {
    font-size: 0.8125rem;
    font-weight: var(--token-reference-typography-weight-semibold, 600);
    color: var(--resume-color-ink, #0d1117);
    white-space: nowrap;
    line-height: var(--token-reference-typography-line-height-normal, 1.4);
  }

  .skills__list {
    font-size: 0.8125rem;
    color: var(--resume-color-body, #374151);
    line-height: var(--token-reference-typography-line-height-normal, 1.4);
    margin: 0;
  }
</style>
