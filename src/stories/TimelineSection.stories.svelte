<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimelineSection from '$lib/TimelineSection.svelte';

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Scribe',
      logo: 'company_logos/scribehow_logo.webp',
      date: 'Apr 2023 - Dec 2024',
      dateValue: '2023',
      location: 'Remote',
      summary:
        'Drove major performance optimizations, led critical refactoring efforts, and built AI-powered developer tools to boost stability and velocity.',
      highlights: [
        'Reduced constant CPU spikes and memory usage through a focused performance overhaul.',
        'Led a large-scale refactor that removed legacy code and improved product delivery.',
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'Performance Optimization'],
    },
    {
      title: 'Senior Software Engineer II',
      company: 'Green Bits Inc & Dutchie',
      logo: 'company_logos/getdutchie_logo.webp',
      date: 'Apr 2017 - Dec 2022',
      dateValue: '2017',
      location: 'Remote',
      summary:
        'Architected distributed systems, built foundational React products, and pioneered Kubernetes environments that accelerated testing.',
      highlights: [
        'Improved uptime during large traffic surges through chaos engineering and performance tuning.',
        'Built foundational frontend products that saved operators meaningful weekly effort.',
      ],
      skills: ['Kubernetes', 'AWS', 'Distributed Systems', 'React'],
    },
    {
      title: 'Senior Frontend Engineer',
      company: 'UpGuard',
      logo: 'company_logos/upguard_logo.webp',
      date: 'Jan 2016 - Mar 2017',
      dateValue: '2016',
      location: 'Portland, OR',
      summary:
        'Built security-focused product interfaces and helped establish a durable frontend architecture for fast-moving product teams.',
      highlights: [
        'Created reusable interface patterns that improved product consistency.',
        'Partnered across design and backend teams to ship complex workflows cleanly.',
      ],
      skills: ['React', 'Security UX', 'Design Systems', 'API Integration'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Import.io',
      logo: 'company_logos/import_io_logo.webp',
      date: 'Feb 2014 - Dec 2015',
      dateValue: '2014',
      location: 'Remote',
      summary:
        'Built data extraction tools, customer-facing interfaces, and backend services for high-volume web data workflows.',
      highlights: [
        'Improved reliability for complex extraction flows used by enterprise customers.',
        'Delivered UI and API improvements that made data workflows easier to operate.',
      ],
      skills: ['JavaScript', 'Ruby', 'APIs', 'Data Products'],
    },
    {
      title: 'Software Engineer',
      company: 'Concordus Applications',
      logo: 'company_logos/concordus-applications.jpg',
      date: 'Jun 2011 - Jan 2014',
      dateValue: '2011',
      location: 'Denver, CO',
      summary:
        'Shipped web applications across frontend, backend, and deployment workflows while building the foundations of a full-stack practice.',
      highlights: [
        'Delivered custom applications from planning through production support.',
        'Developed pragmatic engineering habits across testing, deployment, and maintainability.',
      ],
      skills: ['JavaScript', 'Ruby on Rails', 'PostgreSQL', 'Product Engineering'],
    },
  ];

  const { Story } = defineMeta({
    title: 'Page Sections/Timeline',
    component: TimelineSection,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Which experience is "active" can be set three different ways that all write to the same state: scrolling (closest item to viewport center wins), Arrow Up/Down/Home/End while focus is inside the timeline, and the floating mobile nav\'s prev/next buttons — so a scroll-driven change can override a keyboard one a moment later. Each ExperienceCard only becomes clickable at a hardcoded 1376px desktop breakpoint, not a prop you can override from here.',
        },
      },
    },
  });
</script>

<Story name="Default">
  <TimelineSection {experiences} title="Professional Experience" />
</Story>

<Story name="Single Experience">
  <TimelineSection experiences={[experiences[0]]} title="Work Experience" />
</Story>
