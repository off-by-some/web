<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/SkillsSection',
    component: SkillsSection,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'Main section title'
      },
      subtitle: {
        control: { type: 'text' },
        description: 'Section subtitle/description'
      },
      enableAnimations: {
        control: { type: 'boolean' },
        description: 'Whether to enable orbital animations'
      },
      enableInteractions: {
        control: { type: 'boolean' },
        description: 'Whether to enable hover interactions'
      },
      skillCategories: {
        control: { type: 'object' },
        description: 'Array of skill categories with their skills'
      }
    },
    args: {
      skillSelect: fn(),
      categorySelect: fn(),
    }
  });
</script>

<Story name="Default" args={{
  title: "Technical Expertise",
  subtitle: "Mastery forged through years of hands-on experience",
  enableAnimations: true,
  enableInteractions: true,
  skillCategories: [
    {
      name: "Frontend Architecture",
      icon: "⚛️",
      color: "primary",
      mastery: "expert",
      skills: [
        {
          name: "React",
          level: "expert",
          years: 8,
          category: "framework",
          description: "Advanced patterns, performance optimization",
          image: "/react-logo.webp"
        },
        {
          name: "TypeScript",
          level: "expert",
          years: 6,
          category: "language",
          description: "Complex type systems, advanced generics",
          image: "/javascript logo.webp"
        },
        {
          name: "Next.js",
          level: "expert",
          years: 5,
          category: "framework",
          description: "SSR, SSG, App Router, performance",
          image: "/react-logo.webp"
        },
        {
          name: "Svelte",
          level: "advanced",
          years: 2,
          category: "framework",
          description: "Modern reactive patterns",
          image: "/javascript logo.webp"
        },
        {
          name: "GraphQL",
          level: "advanced",
          years: 4,
          category: "api",
          description: "Schema design, optimization",
          image: "/Graphql.webp"
        },
        {
          name: "CSS Architecture",
          level: "expert",
          years: 10,
          category: "styling",
          description: "SCSS, CSS-in-JS, design systems",
          image: "/CSS-logo.webp"
        },
      ],
    },
    {
      name: "Backend Systems",
      icon: "🔧",
      color: "secondary",
      mastery: "expert",
      skills: [
        {
          name: "Node.js",
          level: "expert",
          years: 7,
          category: "runtime",
          description: "Microservices, event-driven architecture",
          image: "/nodejs.webp"
        },
        {
          name: "Python",
          level: "expert",
          years: 6,
          category: "language",
          description: "Django, FastAPI, data processing",
          image: "/python logo.webp"
        },
        {
          name: "Go",
          level: "advanced",
          years: 3,
          category: "language",
          description: "High-performance services",
          image: "/golang logo.webp"
        },
        {
          name: "PostgreSQL",
          level: "expert",
          years: 8,
          category: "database",
          description: "Complex queries, optimization",
          image: "/postgresql.webp"
        },
        {
          name: "Redis",
          level: "advanced",
          years: 5,
          category: "cache",
          description: "Caching strategies, pub/sub",
          image: "/Redis-logo.webp"
        },
        {
          name: "Ruby on Rails",
          level: "expert",
          years: 9,
          category: "framework",
          description: "Full-stack web applications",
          image: "/RoR.webp"
        },
      ],
    },
    {
      name: "Cloud & DevOps",
      icon: "☁️",
      color: "tertiary",
      mastery: "advanced",
      skills: [
        {
          name: "AWS",
          level: "expert",
          years: 6,
          category: "cloud",
          description: "EC2, Lambda, RDS, S3, CloudFormation",
          image: "/AWS-logo.webp"
        },
        {
          name: "Kubernetes",
          level: "advanced",
          years: 4,
          category: "orchestration",
          description: "Container orchestration, scaling",
          image: "/kubernetes.webp"
        },
        {
          name: "Docker",
          level: "expert",
          years: 7,
          category: "containerization",
          description: "Multi-stage builds, optimization",
          image: "/docker-logo.webp"
        },
        {
          name: "Terraform",
          level: "advanced",
          years: 3,
          category: "iac",
          description: "Infrastructure as Code",
          image: "/terraform.webp"
        },
        {
          name: "CI/CD",
          level: "expert",
          years: 8,
          category: "automation",
          description: "GitHub Actions, Jenkins, deployment",
          image: "/circleci.webp"
        },
        {
          name: "Git",
          level: "advanced",
          years: 5,
          category: "version-control",
          description: "Version control, branching strategies",
          image: "/git.webp"
        },
      ],
    },
    {
      name: "Leadership & Strategy",
      icon: "🚀",
      color: "quaternary",
      mastery: "expert",
      skills: [
        {
          name: "Team Leadership",
          level: "expert",
          years: 8,
          category: "management",
          description: "Built and led 15+ engineering teams",
          image: "/agile.webp"
        },
        {
          name: "Architecture",
          level: "expert",
          years: 10,
          category: "design",
          description: "System design, scalability planning",
          image: "/agile.webp"
        },
        {
          name: "Mentoring",
          level: "expert",
          years: 9,
          category: "development",
          description: "Career development, technical growth",
          image: "/agile.webp"
        },
        {
          name: "Product Strategy",
          level: "advanced",
          years: 7,
          category: "business",
          description: "Technical roadmaps, stakeholder alignment",
          image: "/agile.webp"
        },
        {
          name: "Apache Kafka",
          level: "expert",
          years: 12,
          category: "messaging",
          description: "Event streaming, real-time data processing",
          image: "/apachekafka.webp"
        },
        {
          name: "Django",
          level: "expert",
          years: 10,
          category: "framework",
          description: "Python web framework, REST APIs",
          image: "/django.webp"
        },
      ],
    },
  ]
}}>
  <SkillsSection
    title="Technical Expertise"
    subtitle="Mastery forged through years of hands-on experience"
    enableAnimations={true}
    enableInteractions={true}
    skillCategories={[
      {
        name: "Frontend Architecture",
        icon: "⚛️",
        color: "primary",
        mastery: "expert",
        skills: [
          {
            name: "React",
            level: "expert",
            years: 8,
            category: "framework",
            description: "Advanced patterns, performance optimization",
            image: "/react-logo.webp"
          },
          {
            name: "TypeScript",
            level: "expert",
            years: 6,
            category: "language",
            description: "Complex type systems, advanced generics",
            image: "/javascript logo.webp"
          },
          {
            name: "Next.js",
            level: "expert",
            years: 5,
            category: "framework",
            description: "SSR, SSG, App Router, performance",
            image: "/react-logo.webp"
          },
          {
            name: "Svelte",
            level: "advanced",
            years: 2,
            category: "framework",
            description: "Modern reactive patterns",
            image: "/javascript logo.webp"
          },
          {
            name: "GraphQL",
            level: "advanced",
            years: 4,
            category: "api",
            description: "Schema design, optimization",
            image: "/Graphql.webp"
          },
          {
            name: "CSS Architecture",
            level: "expert",
            years: 10,
            category: "styling",
            description: "SCSS, CSS-in-JS, design systems",
            image: "/CSS-logo.webp"
          },
        ],
      },
      {
        name: "Backend Systems",
        icon: "🔧",
        color: "secondary",
        mastery: "expert",
        skills: [
          {
            name: "Node.js",
            level: "expert",
            years: 7,
            category: "runtime",
            description: "Microservices, event-driven architecture",
            image: "/nodejs.webp"
          },
          {
            name: "Python",
            level: "expert",
            years: 6,
            category: "language",
            description: "Django, FastAPI, data processing",
            image: "/python logo.webp"
          },
          {
            name: "Go",
            level: "advanced",
            years: 3,
            category: "language",
            description: "High-performance services",
            image: "/golang logo.webp"
          },
          {
            name: "PostgreSQL",
            level: "expert",
            years: 8,
            category: "database",
            description: "Complex queries, optimization",
            image: "/postgresql.webp"
          },
          {
            name: "Redis",
            level: "advanced",
            years: 5,
            category: "cache",
            description: "Caching strategies, pub/sub",
            image: "/Redis-logo.webp"
          },
          {
            name: "Ruby on Rails",
            level: "expert",
            years: 9,
            category: "framework",
            description: "Full-stack web applications",
            image: "/RoR.webp"
          },
        ],
      },
      {
        name: "Cloud & DevOps",
        icon: "☁️",
        color: "tertiary",
        mastery: "advanced",
        skills: [
          {
            name: "AWS",
            level: "expert",
            years: 6,
            category: "cloud",
            description: "EC2, Lambda, RDS, S3, CloudFormation",
            image: "/AWS-logo.webp"
          },
          {
            name: "Kubernetes",
            level: "advanced",
            years: 4,
            category: "orchestration",
            description: "Container orchestration, scaling",
            image: "/kubernetes.webp"
          },
          {
            name: "Docker",
            level: "expert",
            years: 7,
            category: "containerization",
            description: "Multi-stage builds, optimization",
            image: "/docker-logo.webp"
          },
          {
            name: "Terraform",
            level: "advanced",
            years: 3,
            category: "iac",
            description: "Infrastructure as Code",
            image: "/terraform.webp"
          },
          {
            name: "CI/CD",
            level: "expert",
            years: 8,
            category: "automation",
            description: "GitHub Actions, Jenkins, deployment",
            image: "/circleci.webp"
          },
          {
            name: "Git",
            level: "advanced",
            years: 5,
            category: "version-control",
            description: "Version control, branching strategies",
            image: "/git.webp"
          },
        ],
      },
      {
        name: "Leadership & Strategy",
        icon: "🚀",
        color: "quaternary",
        mastery: "expert",
        skills: [
          {
            name: "Team Leadership",
            level: "expert",
            years: 8,
            category: "management",
            description: "Built and led 15+ engineering teams",
            image: "/agile.webp"
          },
          {
            name: "Architecture",
            level: "expert",
            years: 10,
            category: "design",
            description: "System design, scalability planning",
            image: "/agile.webp"
          },
          {
            name: "Mentoring",
            level: "expert",
            years: 9,
            category: "development",
            description: "Career development, technical growth",
            image: "/agile.webp"
          },
          {
            name: "Product Strategy",
            level: "advanced",
            years: 7,
            category: "business",
            description: "Technical roadmaps, stakeholder alignment",
            image: "/agile.webp"
          },
          {
            name: "Apache Kafka",
            level: "expert",
            years: 12,
            category: "messaging",
            description: "Event streaming, real-time data processing",
            image: "/apachekafka.webp"
          },
          {
            name: "Django",
            level: "expert",
            years: 10,
            category: "framework",
            description: "Python web framework, REST APIs",
            image: "/django.webp"
          },
        ],
      },
    ]}
    on:skillSelect={(e) => console.log('Skill selected:', e.detail)}
    on:categorySelect={(e) => console.log('Category selected:', e.detail)}
  />
</Story>

<Story name="Simplified" args={{
  title: "Core Skills",
  subtitle: "Essential technologies and expertise",
  enableAnimations: false,
  enableInteractions: true,
  skillCategories: [
    {
      name: "Frontend",
      icon: "⚛️",
      color: "primary",
      mastery: "expert",
      skills: [
        {
          name: "React",
          level: "expert",
          years: 8,
          category: "framework",
          description: "Advanced patterns, performance optimization",
          image: "/react-logo.webp"
        },
        {
          name: "TypeScript",
          level: "expert",
          years: 6,
          category: "language",
          description: "Complex type systems, advanced generics",
          image: "/javascript logo.webp"
        },
        {
          name: "CSS",
          level: "expert",
          years: 10,
          category: "styling",
          description: "SCSS, CSS-in-JS, design systems",
          image: "/CSS-logo.webp"
        },
      ],
    },
    {
      name: "Backend",
      icon: "🔧",
      color: "secondary",
      mastery: "expert",
      skills: [
        {
          name: "Node.js",
          level: "expert",
          years: 7,
          category: "runtime",
          description: "Microservices, event-driven architecture",
          image: "/nodejs.webp"
        },
        {
          name: "Python",
          level: "expert",
          years: 6,
          category: "language",
          description: "Django, FastAPI, data processing",
          image: "/python logo.webp"
        },
        {
          name: "PostgreSQL",
          level: "expert",
          years: 8,
          category: "database",
          description: "Complex queries, optimization",
          image: "/postgresql.webp"
        },
      ],
    },
  ]
}}>
  <SkillsSection
    title="Core Skills"
    subtitle="Essential technologies and expertise"
    enableAnimations={false}
    enableInteractions={true}
    skillCategories={[
      {
        name: "Frontend",
        icon: "⚛️",
        color: "primary",
        mastery: "expert",
        skills: [
          {
            name: "React",
            level: "expert",
            years: 8,
            category: "framework",
            description: "Advanced patterns, performance optimization",
            image: "/react-logo.webp"
          },
          {
            name: "TypeScript",
            level: "expert",
            years: 6,
            category: "language",
            description: "Complex type systems, advanced generics",
            image: "/javascript logo.webp"
          },
          {
            name: "CSS",
            level: "expert",
            years: 10,
            category: "styling",
            description: "SCSS, CSS-in-JS, design systems",
            image: "/CSS-logo.webp"
          },
        ],
      },
      {
        name: "Backend",
        icon: "🔧",
        color: "secondary",
        mastery: "expert",
        skills: [
          {
            name: "Node.js",
            level: "expert",
            years: 7,
            category: "runtime",
            description: "Microservices, event-driven architecture",
            image: "/nodejs.webp"
          },
          {
            name: "Python",
            level: "expert",
            years: 6,
            category: "language",
            description: "Django, FastAPI, data processing",
            image: "/python logo.webp"
          },
          {
            name: "PostgreSQL",
            level: "expert",
            years: 8,
            category: "database",
            description: "Complex queries, optimization",
            image: "/postgresql.webp"
          },
        ],
      },
    ]}
    on:skillSelect={(e) => console.log('Skill selected:', e.detail)}
    on:categorySelect={(e) => console.log('Category selected:', e.detail)}
  />
</Story>

<Story name="Static" args={{
  title: "Technical Skills",
  subtitle: "No animations or auto-rotation",
  enableAnimations: false,
  enableInteractions: false,
  skillCategories: [
    {
      name: "Frontend",
      icon: "⚛️",
      color: "primary",
      mastery: "expert",
      skills: [
        {
          name: "React",
          level: "expert",
          years: 8,
          category: "framework",
          description: "Advanced patterns, performance optimization",
          image: "/react-logo.webp"
        },
        {
          name: "TypeScript",
          level: "expert",
          years: 6,
          category: "language",
          description: "Complex type systems, advanced generics",
          image: "/javascript logo.webp"
        },
      ],
    },
    {
      name: "Backend",
      icon: "🔧",
      color: "secondary",
      mastery: "expert",
      skills: [
        {
          name: "Node.js",
          level: "expert",
          years: 7,
          category: "runtime",
          description: "Microservices, event-driven architecture",
          image: "/nodejs.webp"
        },
        {
          name: "Python",
          level: "expert",
          years: 6,
          category: "language",
          description: "Django, FastAPI, data processing",
          image: "/python logo.webp"
        },
      ],
    },
  ]
}}>
  <SkillsSection
    title="Technical Skills"
    subtitle="No animations or auto-rotation"
    enableAnimations={false}
    enableInteractions={false}
    skillCategories={[
      {
        name: "Frontend",
        icon: "⚛️",
        color: "primary",
        mastery: "expert",
        skills: [
          {
            name: "React",
            level: "expert",
            years: 8,
            category: "framework",
            description: "Advanced patterns, performance optimization",
            image: "/react-logo.webp"
          },
          {
            name: "TypeScript",
            level: "expert",
            years: 6,
            category: "language",
            description: "Complex type systems, advanced generics",
            image: "/javascript logo.webp"
          },
        ],
      },
      {
        name: "Backend",
        icon: "🔧",
        color: "secondary",
        mastery: "expert",
        skills: [
          {
            name: "Node.js",
            level: "expert",
            years: 7,
            category: "runtime",
            description: "Microservices, event-driven architecture",
            image: "/nodejs.webp"
          },
          {
            name: "Python",
            level: "expert",
            years: 6,
            category: "language",
            description: "Django, FastAPI, data processing",
            image: "/python logo.webp"
          },
        ],
      },
    ]}
    on:skillSelect={(e) => console.log('Skill selected:', e.detail)}
    on:categorySelect={(e) => console.log('Category selected:', e.detail)}
  />
</Story> 