export interface ProjectHighlight {
  label: string;
  detail: string;
}

export interface ProjectBadge {
  label: string;
  imageSrc: string;
  href?: string;
}

export type ProjectSecondaryLinkIcon = 'docs' | 'dockerhub' | 'storybook';

export interface ProjectSecondaryLink {
  label: string;
  href: string;
  icon: ProjectSecondaryLinkIcon;
}

export interface ProjectModel {
  name: string;
  tagline: string;
  description: string[];
  bannerSrc: string;
  href: string;
  tags: string[];
  highlights?: ProjectHighlight[];
  badges?: ProjectBadge[];
  secondaryLink?: ProjectSecondaryLink;
}

export interface ProjectSelectMetadata {
  cause: 'pointer' | 'keyboard';
}

export function getProjectKey(project: ProjectModel): string {
  return project.href || project.name;
}

export function projectTabId(project: ProjectModel): string {
  return `project-tab-${toDomId(getProjectKey(project))}`;
}

export function projectPanelId(project: ProjectModel): string {
  return `project-panel-${toDomId(getProjectKey(project))}`;
}

function toDomId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
