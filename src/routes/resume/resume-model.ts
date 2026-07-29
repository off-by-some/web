import resumeContent from '$lib/content/resume.json';

export type ResumeContactKind = 'location' | 'email' | 'linkedin' | 'github' | 'link';

export interface ResumeContact {
  href?: string;
  kind?: ResumeContactKind;
  label: string;
}

export interface Experience {
  company: string;
  date: string;
  highlights: string[];
  location: string;
  title: string;
}

export interface Project {
  displayHref: string;
  href: string;
  name: string;
  tagline: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SummarySection {
  body: string;
  id: string;
  kind: 'summary';
  title: string;
}

export interface ExperienceSection {
  density?: 'primary' | 'compact';
  entries: Experience[];
  id: string;
  kind: 'experience';
  title: string;
}

export interface ProjectsSection {
  entries: Project[];
  id: string;
  kind: 'projects';
  title: string;
}

export interface SkillsSection {
  categories: SkillCategory[];
  id: string;
  kind: 'skills';
  title: string;
}

export type ResumeSection = SummarySection | ExperienceSection | ProjectsSection | SkillsSection;

export interface ResumePage {
  ariaLabel: string;
  id: string;
  sections: ResumeSection[];
  showHeader?: boolean;
}

export interface ResumeData {
  contacts: ResumeContact[];
  filename: string;
  name: string;
  pages: ResumePage[];
  role: string;
}

export const resume = resumeContent as ResumeData;
export const RESUME_PDF_FILENAME = resume.filename;

export function resolveResumeContactKind(contact: ResumeContact): ResumeContactKind {
  if (contact.kind) return contact.kind;
  if (!contact.href) return 'location';
  if (contact.href.startsWith('mailto:')) return 'email';
  if (contact.href.includes('linkedin')) return 'linkedin';
  if (contact.href.includes('github')) return 'github';
  return 'link';
}
