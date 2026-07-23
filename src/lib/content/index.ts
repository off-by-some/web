import en from './en.json';

export const t = en;

export type ContactFormContent = typeof en.contactMe.contactForm;

export function format(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
