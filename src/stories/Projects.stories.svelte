<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Projects from '$lib/Projects.svelte';

  interface ProjectHighlight {
    label: string;
    detail: string;
  }

  interface ProjectBadge {
    label: string;
    imageSrc: string;
    href?: string;
  }

  interface ProjectSecondaryLink {
    label: string;
    href: string;
    icon: 'docs' | 'dockerhub' | 'storybook';
  }

  interface Project {
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

  const projects: Project[] = [
    {
      name: 'FynX',
      tagline: 'Reactive incremental computation for Python',
      description: [
        'FynX is a reactive incremental-computation library for Python, designed for application state and any other problem where results must remain synchronized with inputs that change over time. You describe a graph of changing values and the computations derived from them; when an input changes, FynX recomputes the affected part of the graph, keeps unobserved work lazy, and notifies subscribers where a result meets the outside world.',
        'Inspired by MobX and functional reactive programming, FynX works with ordinary Python functions and has zero core dependencies. It can be introduced around a single computation without requiring the rest of the project to adopt a new architecture.',
      ],
      bannerSrc: 'https://github.com/off-by-some/fynx/raw/main/docs/images/banner.svg',
      href: 'https://github.com/off-by-some/fynx',
      secondaryLink: {
        label: 'View the Documentation',
        href: 'https://off-by-some.github.io/fynx/',
        icon: 'docs',
      },
      badges: [
        {
          label: 'PyPI Version',
          imageSrc: 'https://img.shields.io/pypi/v/fynx.svg?color=4169E1&label=PyPI',
          href: 'https://pypi.org/project/fynx/',
        },
        {
          label: 'Build Status',
          imageSrc:
            'https://img.shields.io/github/actions/workflow/status/off-by-some/fynx/test.yml?branch=main&label=CI&color=2E8B57',
          href: 'https://github.com/off-by-some/fynx/actions/workflows/test.yml',
        },
        {
          label: 'Coverage status',
          imageSrc: 'https://codecov.io/github/off-by-some/fynx/graph/badge.svg?token=NX2QHA8V8L',
          href: 'https://codecov.io/github/off-by-some/fynx',
        },
        {
          label: 'License: MIT',
          imageSrc: 'https://img.shields.io/badge/License-MIT-FF6B35.svg',
          href: 'https://opensource.org/licenses/MIT',
        },
        {
          label: 'Documentation',
          imageSrc: 'https://img.shields.io/badge/docs-GitHub%20Pages-8A2BE2',
          href: 'https://off-by-some.github.io/fynx/',
        },
        {
          label: 'Python Versions',
          imageSrc: 'https://img.shields.io/pypi/pyversions/fynx.svg?label=Python&color=1E90FF',
          href: 'https://www.python.org/downloads/',
        },
      ],
      tags: ['Python', 'Reactive Programming', 'Incremental Computation', 'Zero Dependencies'],
    },
    {
      name: 'TRELLIS-BOX',
      tagline: "Microsoft's TRELLIS image-to-3D pipeline, containerized for consumer GPUs",
      description: [
        "This repository packages Microsoft's TRELLIS image-to-3D pipeline into containers you can actually run on consumer hardware without spending an afternoon fighting dependencies. The goal is simple: run it locally, ungated, on a single consumer GPU — with the defaults chosen so nothing forces you through a license wall or a datacenter card just to get a 3D model out.",
        "Both builds are tuned for high-quality generation on a 12 GB GPU. Microsoft's TRELLIS.2 repository specifies a 24 GB minimum, tested on A100/H100 hardware; the memory work here targets a 12 GB local runtime through FP16 on v1, plus lazy model scheduling and flow-block offload on v2. Docker, an NVIDIA GPU, and the NVIDIA Container Toolkit are the only requirements.",
      ],
      highlights: [
        {
          label: 'TRELLIS/',
          detail:
            'The original Streamlit app, tuned for lower VRAM with FP16 mixed precision (~50% memory savings) and automatic GLB export. Runs at localhost:8501.',
        },
        {
          label: 'TRELLIS.2/',
          detail:
            'The newer O-Voxel/PBR pipeline with a Gradio interface and a dedicated texturing app. Runs at localhost:7860.',
        },
      ],
      bannerSrc:
        'https://github.com/off-by-some/TRELLIS-BOX/raw/trellis-2/docs/trellis-box-banner.png',
      href: 'https://github.com/off-by-some/TRELLIS-BOX/tree/trellis-2',
      secondaryLink: {
        label: 'View on Dockerhub',
        href: 'https://hub.docker.com/r/cassidybridges/trellis-box',
        icon: 'dockerhub',
      },
      badges: [
        {
          label: 'TRELLIS',
          imageSrc:
            'https://img.shields.io/badge/TRELLIS-3D_Generation-blue?logo=github&logoColor=white',
          href: 'https://github.com/microsoft/TRELLIS',
        },
        {
          label: 'Docker Pulls',
          imageSrc:
            'https://img.shields.io/docker/pulls/cassidybridges/trellis-box?logo=docker&logoColor=white',
          href: 'https://hub.docker.com/r/cassidybridges/trellis-box',
        },
        {
          label: 'PyTorch',
          imageSrc: 'https://img.shields.io/badge/PyTorch-2.4+-red?logo=pytorch&logoColor=white',
          href: 'https://pytorch.org',
        },
        {
          label: '12GB VRAM Required',
          imageSrc: 'https://img.shields.io/badge/VRAM-12GB-green?logo=nvidia&logoColor=white',
        },
        {
          label: 'MIT License',
          imageSrc: 'https://img.shields.io/badge/License-MIT-yellow',
          href: 'https://github.com/off-by-some/TRELLIS-BOX/blob/main/LICENSE',
        },
      ],
      tags: ['Docker', 'NVIDIA CUDA', 'Diffusion Models', 'Streamlit', 'Gradio', '3D Generation'],
    },
  ];

  const { Story } = defineMeta({
    title: 'Page Sections/Projects',
    component: Projects,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Only one project renders in full at a time. Desktop drives that from a sticky vertical tablist (Arrow Up/Down/Home/End when focus is inside it); below the 1376px breakpoint the tablist is hidden entirely and a pair of image-dot rails take over instead — one above the panel that fades out as it scrolls past, one below that fades in as it approaches, both triggering 50px early via IntersectionObserver rootMargin rather than at the exact viewport edge. Switching projects remounts the detail panel (via `{#key}`) so its entrance animation replays every time, including on repeat visits to the same project. `badges` renders real shields.io-style images straight through (not recreated as internal chips) — omit it and the row just doesn\'t render. `secondaryLink` adds a second, icon-matched button next to "View on GitHub"; leave it unset and only the primary button shows.',
        },
      },
    },
  });
</script>

<Story name="Default">
  <Projects
    {projects}
    title="Projects"
    subtitle="Selected open source work — tools I built to solve problems I ran into myself."
  />
</Story>

<Story name="Single Project">
  <Projects
    projects={[projects[0]]}
    title="Featured Project"
    subtitle="A single entry collapses the tablist/dot navigation to one static target."
  />
</Story>
