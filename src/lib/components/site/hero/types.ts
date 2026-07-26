export interface HeroHeadlineEmphasis {
  primary?: string;
  accent?: string;
}

export interface HeroProfileModel {
  greeting?: string;
  name: string;
  role: string;
  titleId?: string;
}

export interface HeroValueModel {
  headline: string;
  headlineEmphasis?: HeroHeadlineEmphasis;
  description: string;
}

export interface HeroPortraitAnnotation {
  label: string;
}

export interface HeroPortraitModel {
  src: string;
  alt: string;
  annotations?: HeroPortraitAnnotation[];
}

export type HeroActionIcon = 'github' | 'linkedin' | 'download' | 'arrow' | 'star';
export type HeroActionShape = 'circle' | 'label';

export interface HeroIconAction {
  label: string;
  href: string;
  icon: Exclude<HeroActionIcon, 'arrow'>;
  external?: boolean;
  download?: string;
}

export interface HeroActionsModel {
  primaryLabel: string;
  primaryHref: string;
  exploreLabel?: string;
  exploreHref?: string;
  iconLinks?: HeroIconAction[];
  iconLinksLabel?: string;
}

export interface HeroScrollModel {
  text: string;
  ariaLabel?: string;
}
