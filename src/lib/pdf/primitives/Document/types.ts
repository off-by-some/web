import type { HtmlPdfFont } from '../html-pdf';

export type DocumentFont = Omit<HtmlPdfFont, 'data'> & {
  url: string;
};
