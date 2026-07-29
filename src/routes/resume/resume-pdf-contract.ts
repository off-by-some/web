export const RESUME_PDF_NODE = {
  document: 'document',
  page: 'page',
  rule: 'rule',
} as const;

export const RESUME_PDF_TEXT = {
  dom: 'dom',
  flow: 'flow',
} as const;

export type ResumePdfNode = (typeof RESUME_PDF_NODE)[keyof typeof RESUME_PDF_NODE];
export type ResumePdfTextMode = (typeof RESUME_PDF_TEXT)[keyof typeof RESUME_PDF_TEXT];

export function resumePdfNodeSelector(node: ResumePdfNode) {
  return `[data-resume-pdf="${node}"]`;
}
