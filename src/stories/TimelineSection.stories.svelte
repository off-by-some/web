<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import { fn } from 'storybook/test';

  const defaultExperiences = [
    {
      title: "Scribe – Senior Software Engineer",
      company: "Scribe",
      logo: "/company_logos/scribehow_logo.webp",
      date: "Apr 2023 – Dec 2024",
      dateValue: "Apr 2023",
      location: "Remote",
      summary: "Drove major performance optimizations (CPU spikes 99% to 15%, 83% memory reduction), led critical refactoring efforts, and built AI-powered developer tools to boost stability and velocity.",
      highlights: [
        "Reduced constant CPU spikes from 99% to 15% & memory usage by 83% via performance overhaul.",
        "Led large-scale refactor: eliminated 15,000+ lines legacy code, migrated 60+ Redux dispatches to TypeScript/React Query.",
        "Developed 'Bug Buddy,' an AI tool automating issue triage, reducing triage time by 72%.",
        "Slashed API calls by 80% & improved render time by 53%, enabling complex enterprise workflows.",
        "Revamped image handling, cutting re-renders by 99.9% & load times by 20%.",
        "Created LLM-powered migration tool automating 80% of Redux-to-React Query refactoring."
      ],
      skills: ["React", "Node.js", "TypeScript", "Performance Optimization", "AI Integration", "React Query"]
    },
    {
      title: "Green Bits Inc & Dutchie – Senior Software Engineer II",
      company: "Green Bits Inc & Dutchie",
      logo: "/company_logos/getdutchie_logo.webp",
      date: "Apr 2017 – Dec 2022",
      dateValue: "Apr 2017",
      location: "Remote",
      summary: "Architected distributed systems achieving 99.9% uptime during 400% traffic surges, built foundational React products saving clients 40+ hrs/week, and pioneered Kubernetes environments accelerating testing by 80%.",
      highlights: [
        "Achieved 99.9% uptime during 400% traffic surges via chaos engineering & performance tuning.",
        "Engineered per-branch Kubernetes staging environments, accelerating testing cycles by 80%.",
        "Built Greenbit's first React-based dispensary menu, saving dispensaries 40+ hours/week.",
        "Designed first iteration of 'Brick,' an offline-first data persistence framework (TypeScript/React Native).",
        "Reduced new engineer ramp-up time from weeks to days through improved onboarding & documentation.",
        "Implemented parallelized testing & containerized environments, cutting test execution time by 40%."
      ],
      skills: ["Kubernetes", "AWS", "Distributed Systems", "React", "TypeScript", "Ruby on Rails", "React Native"]
    },
    {
      title: "Import.io – Front-End Engineer",
      company: "Import.io",
      logo: "/company_logos/import_io_logo.webp",
      date: "Aug 2016 – Apr 2017",
      dateValue: "Aug 2016",
      location: "Los Gatos, California",
      summary: "Engineered a feature-complete spreadsheet interface saving users hundreds of hours. Led Angular-to-React migration improving load times by 60%.",
      highlights: [
        "Engineered a spreadsheet interface with Excel formulas, saving users hundreds of hours in manual data cleaning.",
        "Led Angular 1 to React migration, reducing bundle size by 45% & improving load times by 60%.",
        "Streamlined product development through architecture improvements.",
        "Mentored junior developers in React best practices."
      ],
      skills: ["React", "Angular", "UI Architecture", "Mentoring", "JavaScript"]
    },
    {
      title: "UpGuard – Software Engineer",
      company: "UpGuard",
      logo: "/company_logos/upguard_logo.webp",
      date: "Oct 2016 – Sep 2017",
      dateValue: "Oct 2016",
      location: "Mountain View, California",
      summary: "Spearheaded Angular 1 to React migration, eliminating 20K+ lines of tech debt. Cut end-to-end test suite execution time by 6 hours.",
      highlights: [
        "Spearheaded Angular 1 to React migration, eliminating 20K+ lines of tech debt & modernizing architecture.",
        "Cut end-to-end test suite execution time by 6 hours through elevated standards & test refactoring.",
        "Championed best practices, trained team members, and implemented quality initiatives for testing & code review.",
        "Worked with diverse technologies including Docker, Go, and Ruby on Rails."
      ],
      skills: ["React", "Docker", "Go", "Ruby on Rails", "Angular"]
    },
    {
      title: "LaunchBadge LLC – Full-Stack Developer / CTO",
      company: "LaunchBadge LLC",
      logo: "/company_logos/launchbadge_logo.webp",
      date: "Feb 2015 – Sep 2016",
      dateValue: "Feb 2015",
      location: "Sacramento, California Area",
      summary: "Led full-stack development driving $1.2M+ annual revenue. Served as interim CTO, improving collaboration and aligning technical strategy with business goals.",
      highlights: [
        "Led front-end & API development driving $1.2M+ annual revenue through strategic project delivery.",
        "Served as interim CTO for 6 weeks, improving cross-team collaboration and reducing project defects.",
        "Orchestrated development roadmaps, resource allocation, and budget planning across multiple projects.",
        "Implemented agile methodologies and led technical planning aligned with business goals."
      ],
      skills: ["React Native", "Go", "Python", "Node.js", "Full-stack", "API Design"]
    }
  ];

  const minimalExperiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Company",
      logo: "/company_logos/concordus-applications.webp",
      date: "2023 – Present",
      dateValue: "2023",
      location: "Remote",
      summary: "Leading development of scalable web applications with modern technologies.",
      highlights: [
        "Built responsive React applications with TypeScript",
        "Implemented CI/CD pipelines reducing deployment time by 50%",
        "Mentored junior developers in best practices"
      ],
      skills: ["React", "TypeScript", "Node.js", "AWS"]
    },
    {
      title: "Frontend Developer",
      company: "Startup Inc",
      logo: "/company_logos/rezku-dark-acc4b79577.webp",
      date: "2021 – 2023",
      dateValue: "2021",
      location: "San Francisco, CA",
      summary: "Developed user-facing features for a fast-growing SaaS platform.",
      highlights: [
        "Created interactive dashboards using React and D3.js",
        "Improved application performance by 40%",
        "Collaborated with design team on UX improvements"
      ],
      skills: ["React", "JavaScript", "D3.js", "CSS"]
    }
  ];

  const { Story } = defineMeta({
    title: 'Components/TimelineSection',
    component: TimelineSection,
    tags: ['autodocs'],
    parameters: {
      backgrounds: {
        default: 'dark',
        values: [
          { name: 'dark', value: '#0F0F23' },
          { name: 'light', value: '#ffffff' }
        ]
      },
      docs: {
        description: {
          component: `
# TimelineSection Component

A sophisticated timeline component for displaying professional experience with interactive features, animations, and responsive design.

## Features

- **3-Column Grid Layout**: Desktop displays with left/right alternating items and center timeline
- **Interactive Timeline Indicator**: Tracks current position as user scrolls
- **Expandable Details**: Click "Read more" to reveal additional information
- **Performance Optimized**: Adaptive particle effects based on device capabilities
- **Responsive Design**: Transforms to single-column layout on mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Smooth Animations**: Staggered item reveals and hover effects
- **Profile Integration**: Optional profile section with progress tracking

## Usage

\`\`\`svelte
<TimelineSection 
  experiences={experienceData}
  title="Professional Experience"
  enableParticles={true}
  enableProfileEffects={true}
  profileImage="/headshot.webp"
  profileName="John Doe"
  profileTitle="Software Engineer"
  on:experienceSelect={handleExperienceSelect}
  on:profileClick={handleProfileClick}
/>
\`\`\`

## Data Structure

Each experience item should have:
- \`title\`: Job title and company
- \`company\`: Company name
- \`logo\`: Company logo URL
- \`date\`: Display date range
- \`dateValue\`: Sortable date value
- \`location\`: Job location
- \`summary\`: Brief role description
- \`highlights\`: Array of key achievements
- \`skills\`: Array of relevant technologies/skills
          `
        }
      }
    },
    argTypes: {
      experiences: {
        control: { type: 'object' },
        description: 'Array of experience objects to display in timeline'
      },
      title: {
        control: { type: 'text' },
        description: 'Main section title'
      },
      enableParticles: {
        control: { type: 'boolean' },
        description: 'Enable background particle effects'
      },
      enableProfileEffects: {
        control: { type: 'boolean' },
        description: 'Enable profile interaction effects'
      },
      profileImage: {
        control: { type: 'text' },
        description: 'URL for profile image'
      },
      profileName: {
        control: { type: 'text' },
        description: 'Name to display in profile section'
      },
      profileTitle: {
        control: { type: 'text' },
        description: 'Title to display in profile section'
      }
    },
    args: {
      experienceSelect: fn(),
      profileClick: fn(),
    }
  });
</script>

<Story name="Default" args={{
  experiences: defaultExperiences,
  title: "Professional Experience",
  enableProfileEffects: true,
  profileImage: null,
  profileName: "",
  profileTitle: ""
}}>
  <TimelineSection
    experiences={defaultExperiences}
    title="Professional Experience"
    enableProfileEffects={true}
    profileImage={null}
    profileName=""
    profileTitle=""
    on:experienceSelect={(e) => console.log('Experience selected:', e.detail)}
    on:profileClick={() => console.log('Profile clicked')}
  />
</Story>

<Story name="Minimal" args={{
  experiences: minimalExperiences,
  title: "Work Experience",
  enableProfileEffects: false,
  profileImage: null,
  profileName: "",
  profileTitle: ""
}}>
  <TimelineSection
    experiences={minimalExperiences}
    title="Work Experience"
    enableProfileEffects={false}
    profileImage={null}
    profileName=""
    profileTitle=""
    on:experienceSelect={(e) => console.log('Experience selected:', e.detail)}
    on:profileClick={() => console.log('Profile clicked')}
  />
</Story>

<Story name="WithProfile" args={{
  experiences: defaultExperiences,
  title: "Professional Experience",
  enableProfileEffects: true,
  profileImage: "/headshot.webp",
  profileName: "Cassidy Bridges",
  profileTitle: "Software Engineering Leader"
}}>
  <TimelineSection
    experiences={defaultExperiences}
    title="Professional Experience"
    enableProfileEffects={true}
    profileImage="/headshot.webp"
    profileName="Cassidy Bridges"
    profileTitle="Software Engineering Leader"
    on:experienceSelect={(e) => console.log('Experience selected:', e.detail)}
    on:profileClick={() => console.log('Profile clicked')}
  />
</Story>
