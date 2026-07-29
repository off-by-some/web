import { format, t } from '$lib/content';
import type {
  HeroActionsModel,
  HeroPortraitModel,
  HeroProfileModel,
  HeroScrollModel,
  HeroValueModel,
} from '$lib/components/site/hero/types';
import type { ProjectModel } from '$lib/components/site/projects';

interface Skill {
  name: string;
  level?: 'expert' | 'advanced' | 'proficient' | 'learning';
  years?: number;
  category: string;
  description?: string;
  image: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
  mastery: 'expert' | 'advanced' | 'proficient';
}

interface Experience {
  title: string;
  company: string;
  logo: string;
  date: string;
  dateValue: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

interface ContactMethod {
  type: 'email' | 'linkedin' | 'github' | 'calendar';
  label: string;
  value: string;
  href: string;
  imagePath: string;
  description: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  avatar: string;
  companyLogo?: string;
  context: string;
  projectHighlight?: string;
  tags: string[];
}

export function load() {
  const emailAddress = t.contactMe.emailAddress;
  const contactMethods = t.contactMe.methods as ContactMethod[];
  const skillCategories = t.skillsSection.categories as SkillCategory[];
  const experiences = t.timelineSection.experiences as Experience[];
  const projects = t.projectsSection.projects as ProjectModel[];
  const testimonials = t.testimonials.entries as Testimonial[];
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;

  const heroProfile: HeroProfileModel = {
    greeting: t.aboutMe.greeting,
    name: t.aboutMe.name,
    role: t.aboutMe.role,
  };

  const heroValue: HeroValueModel = {
    headline: t.aboutMe.valueHeadline,
    headlineEmphasis: t.aboutMe.valueHeadlineEmphasis,
    description: t.aboutMe.valueDescription,
  };

  const heroPortrait: HeroPortraitModel = {
    src: t.aboutMe.avatarSrc,
    alt: t.aboutMe.avatarAlt,
    annotations: t.aboutMe.portraitAnnotations,
  };

  const heroActions: HeroActionsModel = {
    primaryLabel: t.aboutMe.primaryButtonText,
    primaryHref: '#contact',
    exploreLabel: t.aboutMe.exploreLinkText,
    exploreHref: '/resume',
    iconLinksLabel: 'Profile links',
    iconLinks: [
      ...(linkedinUrl
        ? [
            {
              label: 'Open LinkedIn profile',
              href: linkedinUrl,
              icon: 'linkedin' as const,
              external: true,
            },
          ]
        : []),
      ...(githubUrl
        ? [
            {
              label: 'Open GitHub profile',
              href: githubUrl,
              icon: 'github' as const,
              external: true,
            },
          ]
        : []),
      {
        label: 'Open Storybook',
        href: '/web/storybook',
        icon: 'storybook' as const,
        external: true,
      },
      {
        label: 'Star this project on GitHub',
        href: 'https://github.com/off-by-some/web',
        icon: 'star' as const,
        external: true,
      },
    ],
  };

  const heroScroll: HeroScrollModel = {
    text: t.aboutMe.scrollText,
    ariaLabel: t.aboutMe.scrollIndicatorAriaLabel,
  };

  return {
    emailAddress,
    contactMethods,
    experiences,
    githubUrl,
    heroActions,
    heroPortrait,
    heroProfile,
    heroScroll,
    heroValue,
    linkedinUrl,
    projects,
    skillCategories,
    testimonials,
    contact: {
      title: t.contactMe.title,
      subtitle: t.contactMe.subtitle,
      availabilityText: t.contactMe.availabilityText,
      formContent: t.contactMe.contactForm,
      methodsTitle: t.contactMe.contactMethodsPanel.title,
      methodsSubtitle: t.contactMe.contactMethodsPanel.subtitle,
    },
    projectsSection: {
      title: t.projectsSection.title,
      subtitle: t.projectsSection.subtitle,
    },
    skillsSection: {
      title: t.skillsSection.title,
      subtitle: t.skillsSection.subtitle,
    },
    testimonialsSection: {
      title: t.testimonials.title,
      subtitle: t.testimonials.subtitle,
    },
    timelineSection: {
      title: t.timelineSection.title,
      subtitle: format(t.timelineSection.subtitle, { count: experiences.length }),
    },
  };
}
