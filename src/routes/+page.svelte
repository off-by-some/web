<script lang="ts">
  import AboutMe from '$lib/AboutMe.svelte';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import ContactMe from '$lib/ContactMe.svelte';
  import { base } from '$app/paths';

  interface Skill {
    name: string;
    level: 'expert' | 'advanced' | 'proficient' | 'learning';
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

  // Types for AboutMe
  interface Stat {
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance';
  }

  interface TechStack {
    title: string;
    level: 'expert' | 'advanced';
    technologies: string[];
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

  // Types for ContactMe
  interface ContactMethod {
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    href: string;
    imagePath: string;
    description: string;
  }

  function smoothScrollTo(elementId: string, offset: number = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  // State for selected skills category
  let selectedSkillsCategory: string | null = null;

  function handlePrimaryAction() {
    smoothScrollTo('experience');
  }

  function handleSecondaryAction() {
    smoothScrollTo('contact');
  }

  function handleScrollIndicator() {
    smoothScrollTo('experience');
  }

  // Handle tech category clicks from AboutMe
  function handleTechCategoryClick(event: CustomEvent) {
    selectedSkillsCategory = event.detail.category;
    smoothScrollTo('skills'); // Scroll to skills section with offset
  }

  // Contact methods data (moved from ContactMe component)
  const emailAddress = 'cassidybridges@gmail.com';
  const contactMethods: ContactMethod[] = [
    {
      type: 'email',
      label: 'Email',
      value: emailAddress,
      href: `mailto:${emailAddress}`,
      imagePath: 'svg/email_brand_icon.svg',
      description: 'Direct message',
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: '/in/cassidy-bridges-tech',
      href: 'https://linkedin.com/in/cassidy-bridges-tech',
      imagePath: 'svg/linkedin_brand_icon.svg',
      description: 'Professional network',
    },
    {
      type: 'github',
      label: 'GitHub',
      value: '@off-by-some',
      href: 'https://github.com/off-by-some',
      imagePath: 'svg/github_brand_icon.svg',
      description: 'View my code',
    },
    // {
    //     type: "calendar",
    //     label: "Schedule Call",
    //     value: "30min meeting",
    //     href: "https://calendly.com/cassidybridges",
    //     icon: "📅",
    //     description: "Book time to chat"
    // }
  ];

  // Skills data
  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Architecture',
      icon: '',
      color: 'primary',
      mastery: 'expert',
      skills: [
        {
          name: 'React',
          years: 11,
          category: 'framework',
          description: 'Advanced patterns, performance optimization',
          image: 'icons/react-logo.png',
        },
        {
          name: 'TypeScript',
          years: 9,
          category: 'language',
          description: 'Complex type systems, advanced generics',
          image: 'svg/Typescript_logo.svg',
        },
        {
          name: 'Redux',
          years: 10,
          category: 'framework',
          description: 'Predictable global state container with immutable updates.',
          image: 'svg/redux.svg',
        },
        {
          name: 'MobX',
          years: 8,
          category: 'framework',
          description: 'Transparent reactive state management with zero boilerplate.',
          image: 'svg/mobx.svg',
        },
        {
          name: 'SCSS',
          years: 11,
          category: 'styling',
          description: 'Advanced CSS preprocessor.',
          image: 'icons/sass-logo.png',
        },
        {
          name: 'Next.js',
          years: 5,
          category: 'framework',
          description: 'SSR, SSG, App Router, performance',
          image: 'icons/nextjs.png',
        },
        {
          name: 'Svelte',
          years: 1,
          category: 'framework',
          description: 'Modern reactive patterns',
          image: 'svg/Svelte_Logo.svg',
        },
        {
          name: 'GraphQL',
          years: 4,
          category: 'api',
          description: 'Schema design, optimization',
          image: 'svg/GraphQL_Logo.svg',
        },
        {
          name: 'Jest',
          years: 10,
          category: 'testing',
          description: 'Unit testing, integration testing, end-to-end testing',
          image: 'svg/Jest.svg',
        },
        {
          name: 'Tailwind',
          years: 4,
          category: 'styling',
          description: 'Tailwind, CSS-in-JS, design systems, scalable token systems',
          image: 'svg/Tailwind_CSS_Logo.svg',
        },
        {
          name: 'Storybook',
          years: 7,
          category: 'testing',
          description: 'Component library, documentation, and testing',
          image: 'svg/storybook-icon.svg',
        },
        {
          name: 'Webpack',
          years: 11,
          category: 'framework',
          description: 'Module bundler, performance optimization',
          image: 'icons/webpack.png',
        },
        {
          name: 'Vite',
          years: 3,
          category: 'framework',
          description: 'Fast build times, performance optimization',
          image: 'svg/vite-logo.svg',
        },
      ],
    },
    {
      name: 'Backend Systems',
      icon: '',
      color: 'secondary',
      mastery: 'expert',
      skills: [
        {
          name: 'Node.js',
          years: 11,
          category: 'runtime',
          description: 'Microservices, event-driven architecture',
          image: 'icons/nodejs.png',
        },
        {
          name: 'Python',
          years: 15,
          category: 'language',
          description: 'Django, FastAPI, data processing',
          image: 'icons/python logo.png',
        },
        {
          name: 'Ruby',
          years: 13,
          category: 'language',
          description: 'Ruby on Rails, Personal Scripting, and more.',
          image: 'svg/Ruby_logo.svg',
        },
        {
          name: 'Go',
          years: 5,
          category: 'language',
          description: 'High-performance services',
          image: 'icons/golang logo.png',
        },
        {
          name: 'PostgreSQL',
          years: 15,
          category: 'database',
          description: 'Complex queries, optimization',
          image: 'icons/postgresql.png',
        },
        {
          name: 'Redis',
          years: 5,
          category: 'cache',
          description: 'Caching strategies, pub/sub',
          image: 'icons/Redis-logo.png',
        },
        {
          name: 'Ruby on Rails',
          years: 9,
          category: 'framework',
          description: 'Full-stack web applications',
          image: 'icons/RoR.png',
        },
        {
          name: 'Apache Kafka',
          years: 3,
          category: 'messaging',
          description: 'Event streaming, real-time data processing',
          image: 'icons/apachekafka.png',
        },
        {
          name: 'Elasticsearch',
          years: 3,
          category: 'database',
          description: 'Search & analytics',
          image: 'icons/elasticsearch-logo.png',
        },
        {
          name: 'Django',
          years: 10,
          category: 'framework',
          description: 'Python web framework, REST APIs',
          image: 'svg/django-icon.svg',
        },
        {
          name: 'LangChain',
          years: 2,
          category: 'framework',
          description: 'AI agentic workflows, LLM integration, developer tools, and more.',
          image: 'icons/langchain-text.png',
        },
      ],
    },
    {
      name: 'Cloud & DevOps',
      icon: '',
      color: 'tertiary',
      mastery: 'advanced',
      skills: [
        {
          name: 'AWS',
          years: 6,
          category: 'cloud',
          description: 'EC2, Lambda, RDS, S3, CloudFormation',
          image: 'icons/aws-white.webp',
        },
        {
          name: 'Kubernetes',
          years: 4,
          category: 'orchestration',
          description: 'Container orchestration, scaling',
          image: 'icons/kubernetes.png',
        },
        {
          name: 'Helm',
          years: 4,
          category: 'orchestration',
          description: 'Container orchestration, scaling',
          image: 'icons/helm.webp',
        },
        {
          name: 'Docker',
          years: 7,
          category: 'containerization',
          description: 'Multi-stage builds, optimization',
          image: 'icons/docker.png',
        },
        {
          name: 'Terraform',
          years: 3,
          category: 'iac',
          description: 'Infrastructure as Code',
          image: 'icons/terraform.png',
        },
        {
          name: 'CI/CD',
          years: 8,
          category: 'automation',
          description: 'GitHub Actions, Jenkins, deployment',
          image: 'icons/GitHub Actions.png',
        },
        {
          name: 'Git',
          years: 15,
          category: 'version-control',
          description: 'Version control, branching strategies',
          image: 'icons/git.png',
        },
        {
          name: 'Bash',
          years: 15,
          category: 'automation',
          description: 'Automated workflows, scripting',
          image: 'svg/bash.svg',
        },
        {
          name: 'Locust',
          years: 2,
          category: 'framework',
          description: 'Load testing, Chaos Engineering, performance optimization',
          image: 'icons/locust.png',
        },
        {
          name: 'Datadog',
          years: 4,
          category: 'monitoring',
          description: 'Monitoring, logging, and alerting',
          image: 'icons/dd_icon_white.png',
        },
      ],
    },
    {
      name: 'Leadership & Strategy',
      icon: '',
      color: 'quaternary',
      mastery: 'expert',
      skills: [
        {
          name: 'Team Leadership',
          years: 8,
          category: 'management',
          description: 'Led over 15+ engineering teams',
          image: 'icons/Team Leadership.png',
        },
        {
          name: 'Software Architecture',
          years: 10,
          category: 'design',
          description: 'System design, scalability planning',
          image: 'icons/Architecture.png',
        },
        {
          name: 'Mentoring',
          years: 9,
          category: 'development',
          description: 'Career development, technical growth',
          image: 'icons/Mentorship.png',
        },
        {
          name: 'Product Strategy',
          years: 7,
          category: 'business',
          description: 'Technical roadmaps, stakeholder alignment',
          image: 'icons/Product Strategy.png',
        },

        {
          name: 'ADA Accessibility',
          years: 15,
          category: 'business',
          description: 'WCAG, ACAA & ADA standards for accessible and equitable workplaces.',
          image: 'svg/ADA.svg',
        },

        {
          name: 'Documentation',
          years: 15,
          category: 'business',
          description:
            'Creating structured, accessible resources for fast onboarding and clear communication.',
          image: 'svg/Notion-logo.svg',
        },

        {
          name: 'Project Management',
          years: 10,
          category: 'business',
          description: 'Jira, Notion, Linear, Confluence, and other project management tools.',
          image: 'icons/Jira.png',
        },
      ],
    },
  ];

  // Dynamically generate tech stack from skill categories
  const aboutMeTechStack: TechStack[] = skillCategories.map((category) => ({
    title: category.name,
    level: category.mastery as 'expert' | 'advanced',
    technologies: category.skills.map((skill) => skill.name).sort((a, b) => a.length - b.length), // Sort by character count, shortest first
  }));

  // Timeline data
  const experiences: Experience[] = [
    {
      title: 'Independent Research',
      company: 'Information Theory & Theoretical Physics',
      logo: 'company_logos/independent-research.png',
      date: 'Jan 2025 – Sep 2025',
      dateValue: 'Jan 2025',
      location: 'Remote',
      summary:
        'I developed a mathematical framework measuring the cost of forcing incompatible perspectives to agree—showing that disagreement obeys precise information-theoretic laws. From this work, I created tools for quantifying and managing these trade-offs in real systems.',
      highlights: [
        'Authored ["A Mathematical Theory of Contradiction"](https://zenodo.org/records/17203336), showing that any valid measure of disagreement must take a specific form, and introducing the contradiction bit as a fundamental quantity alongside Shannon entropy.',
        'Demonstrated that this "K-bit tax" emerges universally: compression requires K extra bits per symbol, predictions lose accuracy at an exponential rate, and communication capacity drops by K—all from one principle.',
        'Showed the framework is mathematically inevitable: starting from six axioms, the contradiction measure is uniquely determined.',
        'Built [contrakit](https://github.com/off-by-some/contrakit), an open-source Python library implementing concepts from the paper alongside reproducible examples—making the theory directly usable by researchers and engineers.',
        'Revealed deep unifications: the same measure explains conflicts in quantum measurement, distributed consensus, ensemble models, and voting paradoxes.',
        "Derived fundamental laws: contradiction can't be created by simplification, it accumulates across independent systems like entropy, and vanishes only when perspectives perfectly align.",
        'Designed coordination protocols that treat disagreement as a measurable resource—distinguishing when consensus is impossible versus merely costly.',
      ],
      skills: [
        'Python',
        'Computer Science',
        'Information Theory',
        'Statistics & Probability',
        'Quantum Physics',
        'Open-Source Development',
        'Technical Writing',
        'Philosophy of Science',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Scribe',
      logo: 'company_logos/scribehow_logo.jpg',
      date: 'Apr 2023 – Dec 2024',
      dateValue: 'Apr 2023',
      location: 'Remote',
      summary:
        "At Scribe, I dove head-first into Scribe's messiest code and turned it into a well-oiled machine, eliminating CPU spikes, squashing memory leaks, and building next-gen AI tooling so the team could finally focus on shipping instead of firefighting.",
      highlights: [
        'Led performance overhaul that knocked CPU peaks from 99% to 15% and cut memory use by 83%, dramatically boosting developer velocity and enabling enterprise-scale workloads.',
        'Built "Bug Buddy," an AI-powered triage assistant that slashed manual triage time by 72% and cut downstream bug volume by 90%.',
        'Architected and executed a multi-team refactor—wiped out 15,000+ lines of legacy code and migrated the entire front end to TypeScript.',
        'Rebuilt the front-end API layer, cutting API calls by 80% and speeding time-to-render by 53%—all without pausing active feature work.',
        'Designed democratic decision processes and living documentation so engineering teams could ship and review features faster together.',
        'Overhauled image processing and error-reporting pipelines—introduced WebP, eliminated data-integrity issues, and sliced load times by 20%.',
        'Prototyped an LLM-driven migration tool that automated 80% of our Redux→React Query conversion, saving the team dozens of hours.',
      ],
      skills: [
        'React & React Query',
        'Node.js & TypeScript',
        'Python & Django',
        'Performance Optimization',
        'AI-Powered Tooling',
        'Profiling & Scalability',
        'Process & Project Design',
        'Software Architecture',
      ],
    },
    {
      title: 'Senior Software Engineer II',
      company: 'Green Bits Inc & Dutchie',
      logo: 'company_logos/getdutchie_logo.jpg',
      date: 'Apr 2017 – Dec 2022',
      dateValue: 'Apr 2017',
      location: 'Remote',
      summary:
        "At Green Bits (acquired by Dutchie), I architected solutions to sustain 99.9% uptime under 400% traffic surges, built our first white-labeled React dispensary menu that cut clients' manual work by over 40 hours a week, and managed the company's DevEx pipeline.",
      highlights: [
        'Built the first white-labeled React dispensary menu, cutting manual inventory updates and custom branding chores by 40+ hours/week.',
        "Performed Load Testing, Complex Query Analysis, & Chaos Engineering to ensure the company's systems were resilient to 400% traffic surges.",
        'Implemented redundant data storage and replication alongside failover strategies, ensuring data integrity and reliability across multiple data centers.',
        "Owned the DevEx team's Product Roadmap, working with other teams to distill criteria into actionable items, and ensure the team was always shipping high-value features.",
        'Engineered pre-production & staging environments with feature-branches & Kubernetes—eliminating QA environment wait times and accelerating inefficient test cycles by over 80% ',
        'Prototyped "Brick", an offline-first data persistence layer (TypeScript/React Native → later Dart) to guarantee seamless UX and government reporting when networks hiccup.',
        "Maintained & responsible for the company's CI/CD pipeline, implementing containerization, and parallelized testing, cutting test execution time with reliable deployments.",
      ],
      skills: [
        'AWS',
        'React',
        'TypeScript',
        'Ruby on Rails',
        'Kubernetes',
        'Terraform',
        'CI/CD',
        'Load Testing',
        'Chaos Engineering',
      ],
    },
    {
      title: 'Front-End Engineer',
      company: 'Import.io',
      logo: 'company_logos/import_io_logo.jpg',
      date: 'Aug 2016 – Apr 2017',
      dateValue: 'Aug 2016',
      location: 'Los Gatos, California',
      summary:
        'At Import.io, I delivered a React-powered, Excel-style spreadsheet UI that automated large-dataset cleaning—saving customers hundreds of hours—and led a full Angular 1→React rewrite that cut bundle size by 45% and load times by 60%.',
      highlights: [
        'Established foundational engineering workflows—unit/E2E tests, structured ticketing, and sprint estimates—to transform a fragile codebase into a maintainable, predictable system.',
        'Architected a high-performance spreadsheet engine with live formulas, and virtual rendering, eliminating manual scripts and saving users hundreds of hours',
        'Created solutions for complex problems, such as a number system to efficiently generate combinatorial slices on-the-fly in O(n) time, enabling advanced generation features.',
        'Designed and implemented the full Angular 1→React migration, reducing the JS bundle by 45% and cutting initial load times by 60%, all without a single customer-facing regression ',
        "Mentored junior developers through pair programming and code reviews, embedding React best practices and lifting the entire team's frontend expertise.",
        'Process collaboration: Partnered with Product & Design to shape requirements, ran regular design-dev syncs, and delivered iterative UI improvements based on real user feedback.',
      ],
      skills: [
        'React',
        'Angular',
        'UI Architecture',
        'Mentoring',
        'JavaScript',
        'Testing',
        'Code Review',
        'Product & Design Collaboration',
        'Process Design',
        'Performance Optimization',
        'Data Structures & Algorithms',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'UpGuard',
      logo: 'company_logos/upguard_logo.jpg',
      date: 'Oct 2016 – Sep 2017',
      dateValue: 'Oct 2016',
      location: 'Mountain View, California',
      summary:
        'At UpGuard, I initiated the migration of our front-end by migrating key modules from Angular 1 to React—streamlining the component architecture and boosting developer velocity—then revamped and rewrote our E2E test suite, slicing six hours off nightly runs.',
      highlights: [
        'Contributed to our vulnerability-scanning engine—adding support for diverse machine environments—to broaden security coverage and strengthen proactive detection.',
        'Prototyped the phased migration from Angular 1 to React, replacing monolithic controllers with modular & isolated components, improving maintainability.',
        'Overhauled the end-to-end tests using best practices found within TDD, BDD, and E2E testing, reducing total suite runtime by six hours and catching regressions far earlier.',
        'Containerized development environments with Docker to mirror staging, reducing setup friction and improving release consistency.',
        'Instituted code-review standards and led paired workshops to embed maintainability and testing culture.',
      ],
      skills: ['React', 'Docker', 'Go', 'Ruby on Rails', 'Angular'],
    },
    {
      title: 'Full-Stack Developer / CTO',
      company: 'LaunchBadge LLC',
      logo: 'company_logos/launchbadge_logo.jpg',
      date: 'Feb 2015 – Sep 2016',
      dateValue: 'Feb 2015',
      location: 'Sacramento, California Area',
      summary:
        "I drove end-to-end delivery of LaunchBadge's full-stack platform—powering $1.2M+ in annual revenue—and stepped in as interim CTO to break down silos, align our technical roadmap with business goals, and smooth out collaboration.",
      highlights: [
        'Built the React Native mobile app alongside Go, Python, and Node.js backends, laying the foundation for a product that generated $1.2M+ in bookings.',
        'For six weeks, facilitated cross-functional standups, set OKRs, and prioritized features—cutting project defects and ramping up team alignment.',
        'Owned the product roadmap, balanced feature priorities against resource and budget constraints, and kept multiple projects on time and on budget.',
        'Introduced agile practices—sprint planning, backlog grooming, retrospectives—that improved predictability and boosted delivery velocity.',
        'Onboarded new engineers with clear documentation and paired sessions, established coding standards, and coached teammates on full-stack best practices to scale the team without friction.',
      ],
      skills: ['React Native', 'Go', 'Python', 'Node.js', 'Full-stack', 'API Design'],
    },
  ];

  const companyCount = experiences.reduce((acc, experience) => acc + 1, 0);

  // Testimonials data
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

  const testimonials: Testimonial[] = [
    {
      id: 'jourdan',
      quote:
        'I had the pleasure of working closely with Cassidy during our time at Scribe, where they brought over a decade of frontend development experience and a strong enthusiasm for modernizing our stack.\n\nWhat stood out most to me was their early and active interest in AI tooling and workflows, well before it became a company-wide focus.',
      author: 'Jourdan Rodrigues',
      role: 'Software Engineer',
      company: 'Scribe',
      relationship: 'Same Team',
      date: 'July 2025',
      avatar: 'employees/jourdan.jpg',
      companyLogo: 'company_logos/scribehow_logo.jpg',
      context: 'Frontend Architecture & AI Innovation',
      projectHighlight: 'Redux to React Query Migration',
      tags: ['Technical Leadership', 'AI/ML', 'React', 'Architecture'],
    },
    {
      id: 'alex',
      quote:
        'Cassidy is a great technical and cultural resource.\n\nWhen working together and adjacently on differing teams, I found them a great sounding board for technical ideas and approaches that helped hone the product perspective on the way things were being built, implemented, or already had been done.',
      author: 'Alex Gong',
      role: 'Product Leader',
      company: 'Green Bits Inc & Dutchie',
      relationship: 'Cross-functional Partner',
      date: 'March 2023',
      avatar: 'employees/alex_gong.jpg',
      companyLogo: 'company_logos/greenbitslogo.jpg',
      context: 'Technical Strategy & Team Culture',
      projectHighlight: 'Product-Engineering Collaboration',
      tags: ['Product Strategy', 'Team Culture', 'Cross-functional', 'Leadership'],
    },
    {
      id: 'seth',
      quote:
        "Cassidy is one of those rare engineers that can tackle any problem or any language you throw at them.\n\nIf they don't know something they can jump in, attack the problem from multiple angles, and get up to speed in record time.\n\nAs a designer, you can't ask for a more capable partner in bringing solutions to life.",
      author: 'Seth B',
      role: 'Product Designer',
      company: 'Green Bits Inc & Dutchie',
      relationship: 'Design Partner',
      date: 'August 2019',
      avatar: 'employees/seth.jpg',
      companyLogo: 'company_logos/greenbitslogo.jpg',
      context: 'Design-Engineering Partnership',
      projectHighlight: 'Multi-language Problem Solving',
      tags: ['Design Systems', 'Full-stack', 'Problem Solving', 'Adaptability'],
    },
    {
      id: 'cliff',
      quote:
        'During my time working with Cassidy I found them to be a very productive contributor to the team.\n\nThey care very deeply about frontend architecture as well as design and UX.\n\nCassidy is relentlessly positive in their approach to work, and is a pleasure to be around.',
      author: 'Cliff Moon',
      role: 'Engineering Manager',
      company: 'UpGuard',
      relationship: 'Direct Manager',
      date: 'July 2017',
      avatar: 'employees/cliff_moon.jpg',
      companyLogo: 'company_logos/upguard_logo.jpg',
      context: 'Frontend Architecture & Team Leadership',
      projectHighlight: 'UX-Focused Development',
      tags: ['Frontend', 'UX/UI', 'Team Leadership', 'Architecture'],
    },
  ];

  // AboutMe data
  const aboutMeStats: Stat[] = [
    { count: '12', label: 'Years Experience', type: 'years' },
    { count: '15', label: 'Teams Led', type: 'scale' },
    { count: '8', label: 'Programming Languages', type: 'languages' },
    { count: companyCount.toString(), label: 'Companies Served', type: 'performance' },
  ];
</script>

<main>
  <!-- About Me Section -->
  <AboutMe
    name="Cassidy Bridges"
    role="Software Engineering Leader"
    statusText="Available for new opportunities"
    valueHeadline="I architect systems that scale, lead teams that thrive, and build products that last."
    valueDescription="With over a decade of experience turning complex challenges into elegant solutions, I specialize in helping high-performance engineering teams thrive while designing resilient distributed systems. From React frontends to cloud infrastructure, I create technology that just works."
    avatarSrc="headshot.png"
    avatarAlt="Cassidy Bridges"
    primaryButtonText="View Experience"
    primaryButtonHref="#experience"
    secondaryButtonText="Get in Touch"
    secondaryButtonHref="#contact"
    scrollText="Explore my work"
    showCanvasBackground={true}
    stats={aboutMeStats}
    techStack={aboutMeTechStack}
    on:primaryAction={handlePrimaryAction}
    on:secondaryAction={handleSecondaryAction}
    on:scrollIndicator={handleScrollIndicator}
    on:techCategoryClick={handleTechCategoryClick}
  />

  <!-- Skills Section -->
  <SkillsSection
    title="Technical Expertise"
    subtitle="Skills shaped by curiosity, tested through years of real-world impact."
    {skillCategories}
    initialSelectedCategory={selectedSkillsCategory || skillCategories[0]?.name}
    on:skillSelect={(e) => console.log('Skill selected:', e.detail)}
    on:categorySelect={(e) => console.log('Category selected:', e.detail)}
  />

  <!-- Timeline Section -->
  <TimelineSection
    {experiences}
    on:experienceSelect={(e) => console.log('Experience selected:', e.detail)}
    on:profileClick={() => console.log('Profile clicked')}
  />

  <!-- Testimonials Section -->
  <Testimonials {testimonials} />

  <!-- Contact Me Section -->
  <ContactMe
    title="Let's Build Something Amazing"
    subtitle="Ready to turn your vision into reality? I'd love to hear about your project."
    {emailAddress}
    {contactMethods}
    on:formSubmit={(e) => console.log('Form submitted:', e.detail)}
    on:contactMethodClick={(e) => console.log('Contact method clicked:', e.detail)}
  />
</main>

<style lang="scss">
  main {
    min-height: 100vh;
    background: var(--token-surface-color, #0a0a0a);
  }
</style>
