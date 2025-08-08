<script lang="ts">
	import AboutMe from '$lib/AboutMe.svelte';
	import TimelineSection from '$lib/TimelineSection.svelte';
	import SkillsSection from '$lib/SkillsSection.svelte';
	import ContactMe from '$lib/ContactMe.svelte';
	import { base } from '$app/paths';

	interface Skill {
		name: string;
		level: "expert" | "advanced" | "proficient" | "learning";
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
		mastery: "expert" | "advanced" | "proficient";
	}

	// Types for AboutMe
	interface Stat {
		count: string;
		label: string;
		type: "years" | "scale" | "reliability" | "performance";
	}

	interface TechStack {
		title: string;
		level: "expert" | "advanced";
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
		type: "email" | "linkedin" | "github" | "calendar";
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
				behavior: 'smooth'
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
		smoothScrollTo('skills', 100); // Scroll to skills section with offset
	}

	// AboutMe data
	const aboutMeStats: Stat[] = [
		{ count: "12", label: "Years<br>Experience", type: "years" },
		{ count: "15", label: "Teams<br>Led", type: "scale" },
		{ count: "99.99%", label: "System<br>Uptime", type: "reliability" },
		{ count: "16x", label: "Code<br>Reduction", type: "performance" },
	];

	// Contact methods data (moved from ContactMe component)
	const emailAddress = "cassidybridges@gmail.com";
	const contactMethods: ContactMethod[] = [
		{
			type: "email",
			label: "Email",
			value: emailAddress,
			href: `mailto:${emailAddress}`,
			imagePath: `${base}/email_brand_icon.svg`,
			description: "Direct message"
		},
		{
			type: "linkedin",
			label: "LinkedIn",
			value: "/in/cassidy-bridges-tech",
			href: "https://linkedin.com/in/cassidy-bridges-tech",
			imagePath: `${base}/linkedin_brand_icon.svg`,
			description: "Professional network"
		},
		{
			type: "github",
			label: "GitHub",
			value: "@off-by-some",
			href: "https://github.com/off-by-some",
			imagePath: `${base}/github_brand_icon.svg`,
			description: "View my code"
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
			name: "Frontend Architecture",
			icon: "",
			color: "primary",
			mastery: "expert",
			skills: [
				{
					name: "React",
					level: "expert",
					years: 11,
					category: "framework",
					description: "Advanced patterns, performance optimization",
					image: `${base}/react-logo.webp`
				},
				{
					name: "TypeScript",
					level: "expert",
					years: 9,
					category: "language",
					description: "Complex type systems, advanced generics",
					image: `${base}/Typescript_logo.svg`
				},
				{
					name: "Redux",
					level: "expert",
					years: 10,
					category: "framework",
					description: "Predictable global state container with immutable updates.",
					image: `${base}/redux.svg`
				},
				{
					name: "MobX",
					level: "expert",
					years: 8,
					category: "framework",
					description: "Transparent reactive state management with zero boilerplate.",
					image: `${base}/mobx.svg`
				},
				{
					name: "SCSS",
					level: "expert",
					years: 11,
					category: "styling",
					description: "Advanced CSS preprocessor.",
					image: `${base}/sass-logo.webp`
				},
				{
					name: "Next.js",
					level: "advanced",
					years: 5,
					category: "framework",
					description: "SSR, SSG, App Router, performance",
					image: `${base}/nextjs.webp`
				},
				{
					name: "Svelte",
					level: "learning",
					years: 1,
					category: "framework",
					description: "Modern reactive patterns",
					image: `${base}/Svelte_Logo.svg`
				},
				{
					name: "GraphQL",
					level: "advanced",
					years: 4,
					category: "api",
					description: "Schema design, optimization",
					image: `${base}/GraphQL_Logo.svg`
				},
				{
					name: "Jest",
					level: "expert",
					years: 10,
					category: "testing",
					description: "Unit testing, integration testing, end-to-end testing",
					image: `${base}/Jest.svg`
				},
				{
					name: "Tailwind",
					level: "advanced",
					years: 4,
					category: "styling",
					description: "Tailwind, CSS-in-JS, design systems, scalable token systems",
					image: `${base}/Tailwind_CSS_Logo.svg`
				},
				{
					name: "Storybook",
					level: "expert",
					years: 7,
					category: "testing",
					description: "Component library, documentation, and testing",
					image: `${base}/storybook-icon.svg`
				},
				{
					name: "Webpack",
					level: "expert",
					years: 11,
					category: "framework",
					description: "Module bundler, performance optimization",
					image: `${base}/webpack.webp`
				},
				{
					name: "Vite",
					level: "advanced",
					years: 3,
					category: "framework",
					description: "Fast build times, performance optimization",
					image: `${base}/vite-logo.svg`
				},
			],
		},
		{
			name: "Backend Systems",
			icon: "",
			color: "secondary",
			mastery: "expert",
			skills: [
				{
					name: "Node.js",
					level: "expert",
					years: 11,
					category: "runtime",
					description: "Microservices, event-driven architecture",
					image: `${base}/javascript logo.webp`
				},
				{
					name: "Python",
					level: "expert",
					years: 15,
					category: "language",
					description: "Django, FastAPI, data processing",
					image: `${base}/python logo.webp`
				},
				{
					name: "Ruby",
					level: "expert",
					years: 13,
					category: "language",
					description: "Ruby on Rails, Personal Scripting, and more.",
					image: `${base}/Ruby_logo.svg`
				},
				{
					name: "Go",
					level: "advanced",
					years: 5,
					category: "language",
					description: "High-performance services",
					image: `${base}/golang logo.webp`
				},
				{
					name: "PostgreSQL",
					level: "expert",
					years: 15,
					category: "database",
					description: "Complex queries, optimization",
					image: `${base}/postgresql.webp`
				},
				{
					name: "Redis",
					level: "advanced",
					years: 5,
					category: "cache",
					description: "Caching strategies, pub/sub",
					image: `${base}/Redis-logo.webp`
				},
				{
					name: "Ruby on Rails",
					level: "expert",
					years: 9,
					category: "framework",
					description: "Full-stack web applications",
					image: `${base}/RoR.webp`
				},
				{
					name: "Apache Kafka",
					level: "advanced",
					years: 3,
					category: "messaging",
					description: "Event streaming, real-time data processing",
					image: `${base}/apachekafka.webp`
				},
				{
					name: "Elasticsearch",
					level: "advanced",
					years: 3,
					category: "database",
					description: "Search & analytics",
					image: `${base}/elasticsearch-logo.webp`
				},
				{
					name: "Django",
					level: "expert",
					years: 10,
					category: "framework",
					description: "Python web framework, REST APIs",
					image: `${base}/django-icon.svg`
				},
				{
					name: "LangChain",
					level: "advanced",
					years: 2,
					category: "framework",
					description: "AI agentic workflows, LLM integration, developer tools, and more.",
					image: `${base}/langchain-text.webp`
				},

			],
		},
		{
			name: "Cloud & DevOps",
			icon: "",
			color: "tertiary",
			mastery: "advanced",
			skills: [
				{
					name: "AWS",
					level: "expert",
					years: 6,
					category: "cloud",
					description: "EC2, Lambda, RDS, S3, CloudFormation",
					image: `${base}/aws-white.webp`
				},
				{
					name: "Kubernetes",
					level: "advanced",
					years: 4,
					category: "orchestration",
					description: "Container orchestration, scaling",
					image: `${base}/kubernetes.webp`
				},
				{
					name: "Helm",
					level: "advanced",
					years: 4,
					category: "orchestration",
					description: "Container orchestration, scaling",
					image: `${base}/helm.webp`
				},
				{
					name: "Docker",
					level: "expert",
					years: 7,
					category: "containerization",
					description: "Multi-stage builds, optimization",
					image: `${base}/docker.webp`
				},
				{
					name: "Terraform",
					level: "advanced",
					years: 3,
					category: "iac",
					description: "Infrastructure as Code",
					image: `${base}/terraform.webp`
				},
				{
					name: "CI/CD",
					level: "expert",
					years: 8,
					category: "automation",
					description: "GitHub Actions, Jenkins, deployment",
					image: `${base}/GitHub Actions.webp`
				},
				{
					name: "Git",
					level: "expert",
					years: 15,
					category: "version-control",
					description: "Version control, branching strategies",
					image: `${base}/git.webp`
				},
				{
					name: "Bash",
					level: "expert",
					years: 15,
					category: "automation",
					description: "Automated workflows, scripting",
					image: `${base}/bash.svg`
				},
				{
					name: "Locust",
					level: "advanced",
					years: 2,
					category: "framework",
					description: "Load testing, Chaos Engineering, performance optimization",
					image: `${base}/locust.webp`
				},
				{
					name: "Datadog",
					level: "advanced",
					years: 4,
					category: "monitoring",
					description: "Monitoring, logging, and alerting",
					image: `${base}/dd_icon_white.webp`
				}
			],
		},
		{
			name: "Leadership & Strategy",
			icon: "",
			color: "quaternary",
			mastery: "expert",
			skills: [
				{
					name: "Team Leadership",
					level: "expert",
					years: 8,
					category: "management",
					description: "Led over 15+ engineering teams",
					image: `${base}/Team Leadership.webp`
				},
				{
					name: "Software Architecture",
					level: "expert",
					years: 10,
					category: "design",
					description: "System design, scalability planning",
					image: `${base}/Architecture.webp`
				},
				{
					name: "Mentoring",
					level: "expert",
					years: 9,
					category: "development",
					description: "Career development, technical growth",
					image: `${base}/Mentorship.webp`
				},
				{
					name: "Product Strategy",
					level: "expert",
					years: 7,
					category: "business",
					description: "Technical roadmaps, stakeholder alignment",
					image: `${base}/Product Strategy.webp`
				},

				{
					name: "ADA Accessibility",
					level: "expert",
					years: 15,
					category: "business",
					description: "WCAG, ACAA & ADA standards for accessible and equitable workplaces.",
					image: `${base}/ADA.svg`
				},

				{
					name: "Documentation",
					level: "expert",
					years: 15,
					category: "business",
					description: "Creating structured, accessible resources for fast onboarding and clear communication.",
					image: `${base}/Notion-logo.svg`
				},

				{
					name: "Project Management",
					level: "expert",
					years: 10,
					category: "business",
					description: "Jira, Notion, Linear, Confluence, and other project management tools.",
					image: `${base}/Jira.webp`
				},

			],
		},
	];


	// Dynamically generate tech stack from skill categories
	const aboutMeTechStack: TechStack[] = skillCategories.map(category => ({
		title: category.name,
		level: category.mastery as "expert" | "advanced",
		technologies: category.skills
			.map(skill => skill.name)
			.sort((a, b) => a.length - b.length) // Sort by character count, shortest first
	}));

	// Timeline data
	const experiences: Experience[] = [
		{
			title: "Senior Software Engineer",
			company: "Scribe",
			logo: `${base}/company_logos/scribehow_logo.webp`,
			date: "Apr 2023 – Dec 2024",
			dateValue: "Apr 2023",
			location: "Remote",
			summary:
				"At Scribe, I dove head-first into Scribe's messiest code and turned it into a well-oiled machine, eliminating CPU spikes, squashing memory leaks, and building next-gen AI tooling so the team could finally focus on shipping instead of firefighting.",
			highlights: [
				"Led performance overhaul that knocked CPU peaks from 99% to 15% and cut memory use by 83%, dramatically boosting developer velocity and enabling enterprise-scale workloads.",
				"Built \"Bug Buddy,\" an AI-powered triage assistant that slashed manual triage time by 72% and cut downstream bug volume by 90%.",
				"Architected and executed a multi-team refactor—wiped out 15,000+ lines of legacy code and migrated the entire front end to TypeScript.",
				"Rebuilt the front-end API layer, cutting API calls by 80% and speeding time-to-render by 53%—all without pausing active feature work.",
				"Designed democratic decision processes and living documentation so engineering teams could ship and review features faster together.",
				"Overhauled image processing and error-reporting pipelines—introduced WebP, eliminated data-integrity issues, and sliced load times by 20%.",
				"Prototyped an LLM-driven migration tool that automated 80% of our Redux→React Query conversion, saving the team dozens of hours.",
			],
			skills: [
				"React & React Query",
				"Node.js & TypeScript",
				"Python & Django",
				"Performance Optimization",
				"AI-Powered Tooling",
				"Profiling & Scalability",
				"Process & Project Design",
				"Software Architecture",
			],
		},
		{
			title: "Senior Software Engineer II",
			company: "Green Bits Inc & Dutchie",
			logo: `${base}/company_logos/getdutchie_logo.webp`,
			date: "Apr 2017 – Dec 2022",
			dateValue: "Apr 2017",
			location: "Remote",
			summary:
				"At Green Bits (acquired by Dutchie), I architected solutions to sustain 99.9% uptime under 400% traffic surges, built our first white-labeled React dispensary menu that cut clients' manual work by over 40 hours a week, and managed the company's DevEx pipeline.",
			highlights: [
				"Built the first white-labeled React dispensary menu, cutting manual inventory updates and custom branding chores by 40+ hours/week.",
				"Performed Load Testing, Complex Query Analysis, & Chaos Engineering to ensure the company's systems were resilient to 400% traffic surges.",
				"Implemented redundant data storage and replication alongside failover strategies, ensuring data integrity and reliability across multiple data centers.",
				"Owned the DevEx team's Product Roadmap, working with other teams to distill criteria into actionable items, and ensure the team was always shipping high-value features.",
				"Engineered pre-production & staging environments with feature-branches & Kubernetes—eliminating QA environment wait times and accelerating inefficient test cycles by over 80% ",
				"Prototyped \"Brick\", an offline-first data persistence layer (TypeScript/React Native → later Dart) to guarantee seamless UX and government reporting when networks hiccup.",
				"Maintained & responsible for the company's CI/CD pipeline, implementing containerization, and parallelized testing, cutting test execution time with reliable deployments.",
			],
			skills: [
				"AWS",
				"React",
				"TypeScript",
				"Ruby on Rails",
				"Kubernetes",
				"Terraform",
				"CI/CD",
				"Load Testing",
				"Chaos Engineering",
			],
		},
		{
			title: "Front-End Engineer",
			company: "Import.io",
			logo: `${base}/company_logos/import_io_logo.webp`,
			date: "Aug 2016 – Apr 2017",
			dateValue: "Aug 2016",
			location: "Los Gatos, California",
			summary:
				"At Import.io, I delivered a React-powered, Excel-style spreadsheet UI that automated large-dataset cleaning—saving customers hundreds of hours—and led a full Angular 1→React rewrite that cut bundle size by 45% and load times by 60%.",
			highlights: [
				"Established foundational engineering workflows—unit/E2E tests, structured ticketing, and sprint estimates—to transform a fragile codebase into a maintainable, predictable system.",
				"Architected a high-performance spreadsheet engine with live formulas, and virtual rendering, eliminating manual scripts and saving users hundreds of hours",
				"Created solutions for complex problems, such as a number system to efficiently generate combinatorial slices on-the-fly in O(n) time, enabling advanced generation features.",
				"Designed and implemented the full Angular 1→React migration, reducing the JS bundle by 45% and cutting initial load times by 60%, all without a single customer-facing regression ",
				"Mentored junior developers through pair programming and code reviews, embedding React best practices and lifting the entire team's frontend expertise.",
				"Process collaboration: Partnered with Product & Design to shape requirements, ran regular design-dev syncs, and delivered iterative UI improvements based on real user feedback.",
			],
			skills: [
				"React",
				"Angular",
				"UI Architecture",
				"Mentoring",
				"JavaScript",
				"Testing",
				"Code Review",
				"Product & Design Collaboration",
				"Process Design",
				"Performance Optimization",
				"Data Structures & Algorithms",
			],
		},
		{
			title: "Software Engineer",
			company: "UpGuard",
			logo: `${base}/company_logos/upguard_logo.webp`,
			date: "Oct 2016 – Sep 2017",
			dateValue: "Oct 2016",
			location: "Mountain View, California",
			summary:
				"At UpGuard, I initiated the migration of our front-end by migrating key modules from Angular 1 to React—streamlining the component architecture and boosting developer velocity—then revamped and rewrote our E2E test suite, slicing six hours off nightly runs.",
			highlights: [
				"Contributed to our vulnerability-scanning engine—adding support for diverse machine environments—to broaden security coverage and strengthen proactive detection.",
				"Prototyped the phased migration from Angular 1 to React, replacing monolithic controllers with modular & isolated components, improving maintainability.",
				"Overhauled the end-to-end tests using best practices found within TDD, BDD, and E2E testing, reducing total suite runtime by six hours and catching regressions far earlier.",
				"Containerized development environments with Docker to mirror staging, reducing setup friction and improving release consistency.",
				"Instituted code-review standards and led paired workshops to embed maintainability and testing culture.",
			],
			skills: ["React", "Docker", "Go", "Ruby on Rails", "Angular"],
		},
		{
			title: "Full-Stack Developer / CTO",
			company: "LaunchBadge LLC",
			logo: `${base}/company_logos/launchbadge_logo.webp`,
			date: "Feb 2015 – Sep 2016",
			dateValue: "Feb 2015",
			location: "Sacramento, California Area",
			summary:
				"I drove end-to-end delivery of LaunchBadge's full-stack platform—powering $1.2M+ in annual revenue—and stepped in as interim CTO to break down silos, align our technical roadmap with business goals, and smooth out collaboration.",
			highlights: [
				"Built the React Native mobile app alongside Go, Python, and Node.js backends, laying the foundation for a product that generated $1.2M+ in bookings.",
				"For six weeks, facilitated cross-functional standups, set OKRs, and prioritized features—cutting project defects and ramping up team alignment.",
				"Owned the product roadmap, balanced feature priorities against resource and budget constraints, and kept multiple projects on time and on budget.",
				"Introduced agile practices—sprint planning, backlog grooming, retrospectives—that improved predictability and boosted delivery velocity.",
				"Onboarded new engineers with clear documentation and paired sessions, established coding standards, and coached teammates on full-stack best practices to scale the team without friction."
			],
			skills: [
				"React Native",
				"Go",
				"Python",
				"Node.js",
				"Full-stack",
				"API Design",
			],
		},
	];
</script>



<main>
	<!-- About Me Section -->
	<AboutMe
		name="Cassidy Bridges"
		role="Software Engineering Leader"
		statusText="Available for new opportunities"
		valueHeadline="I architect systems that scale, lead teams that thrive, and build products that last."
		valueDescription="With over a decade of experience turning complex challenges into elegant solutions, I specialize in building high-performance engineering teams and resilient distributed systems. From React frontends to cloud infrastructure, I create technology that just works."
		avatarSrc={`${base}/headshot.webp`}
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

	<!-- Timeline Section -->
	<TimelineSection
		{experiences}
		on:experienceSelect={(e) => console.log('Experience selected:', e.detail)}
		on:profileClick={() => console.log('Profile clicked')}
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
	@use "styles/_reset.scss" as *;

	main {
		min-height: 100vh;
		background: var(--token-surface-color, #0a0a0a);
	}
</style>
