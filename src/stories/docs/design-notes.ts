export const designNotes = {
  availability:
    'Gold is reserved for small, sparingly used elements such as availability because it is the site\'s most important "notice me" state: a small cue that should draw the eye without overpowering the section. Hero and contact both use this shared component so opportunity status reads consistently wherever it appears.',
  image:
    'The Image primitive resolves assets from the local image catalog, emits responsive raster sources when available, preserves SVGs as vectors, and caches resolved metadata so repeated components do not redo the same work.',
} as const;

export const designReferences = {
  cognitive: 'https://www.w3.org/TR/coga-usable/',
  visualPresentation: 'https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html',
  focusAppearance: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html',
  dyslexiaPrinting:
    'https://www.ifla.org/g/eals/guidelines-for-library-services-to-persons-with-dyslexia-knowledge-base/',
} as const;
