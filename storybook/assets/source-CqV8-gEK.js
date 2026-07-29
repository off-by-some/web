const e=`<script lang="ts">
  import { PdfDocument, PdfPage } from '$lib/pdf/primitives';

  let download: (() => Promise<void>) | undefined = $state();
<\/script>

<button onclick={() => download?.()}>Download PDF</button>

<PdfDocument bind:download filename="document.pdf" renderWidth="34rem">
  <PdfPage>
    <!-- PDF content -->
  </PdfPage>
</PdfDocument>`,d=`<PdfDocument bind:download filename="page.pdf" renderWidth="34rem">
  <PdfPage class="document-page" aria-label="Blank PDF page" />
</PdfDocument>`;export{d as a,e as p};
