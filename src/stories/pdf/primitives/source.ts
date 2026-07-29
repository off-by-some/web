export const documentSource = `<script lang="ts">
  import { Document, Page } from '$lib/pdf/primitives';

  let download: (() => Promise<void>) | undefined = $state();
</script>

<button onclick={() => download?.()}>Download PDF</button>

<Document bind:download filename="document.pdf" renderWidth="34rem">
  <Page>
    <!-- PDF content -->
  </Page>
</Document>`;

export const pageSource = `<Document bind:download filename="page.pdf" renderWidth="34rem">
  <Page class="document-page" aria-label="Blank PDF page" />
</Document>`;
