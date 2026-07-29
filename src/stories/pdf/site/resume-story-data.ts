import { resumeContent } from '$lib/content';
import type {
  Experience,
  ExperienceSection,
  Project,
  ProjectsSection,
  ResumeData,
  SkillsSection,
} from '$lib/pdf/site';

export const storyResume = resumeContent as ResumeData;

function requireStoryValue<T>(value: T | undefined, label: string) {
  if (!value) {
    throw new Error(`Resume PDF story requires ${label}.`);
  }

  return value;
}

export const storyExperience = requireStoryValue<Experience>(
  storyResume.pages
    .flatMap((page) => page.sections)
    .find((section): section is ExperienceSection => section.kind === 'experience')?.entries[0],
  'an experience entry',
);

export const storyProject = requireStoryValue<Project>(
  storyResume.pages
    .flatMap((page) => page.sections)
    .find((section): section is ProjectsSection => section.kind === 'projects')?.entries[0],
  'a project entry',
);

export const storySkillCategories =
  storyResume.pages
    .flatMap((page) => page.sections)
    .find((section): section is SkillsSection => section.kind === 'skills')?.categories ?? [];
