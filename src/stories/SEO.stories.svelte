<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SEO from '$lib/SEO.svelte';

  const { Story } = defineMeta({
    title: 'Components/SEO',
    component: SEO,
    tags: ['autodocs'],
    argTypes: {
      title: { control: { type: 'text' }, description: 'Page title' },
      description: { control: { type: 'text' }, description: 'Page description' },
      imageUrl: { control: { type: 'text' }, description: 'OG image URL' },
      url: { control: { type: 'text' }, description: 'Page URL' },
      type: { control: { type: 'text' }, description: 'Open Graph type' },
      siteName: { control: { type: 'text' }, description: 'Site name' },
      author: { control: { type: 'text' }, description: 'Author name' },
      themeColor: { control: { type: 'color' }, description: 'Theme color' },
      linkedinProfile: { control: { type: 'text' }, description: 'LinkedIn profile URL' },
      githubProfile: { control: { type: 'text' }, description: 'GitHub profile URL' },
      enableJsonLd: { control: { type: 'boolean' }, description: 'Enable JSON-LD schema' }
    },
  });
</script>

<Story name="Default" args={{
  title: 'Cassidy Bridges - Engineering Resume',
  description: 'Software Engineering Leader with 12+ years of experience building scalable systems and high-performance teams.',
  imageUrl: '/og/og-about.png',
  type: 'website',
  siteName: 'Cassidy Bridges',
  author: 'Cassidy Bridges',
  themeColor: '#0a0a0a',
  linkedinProfile: 'https://linkedin.com/in/cassidy-bridges-tech',
  githubProfile: 'https://github.com/off-by-some',
  enableJsonLd: true
}}>
  <SEO 
    title="Cassidy Bridges - Engineering Resume"
    description="Software Engineering Leader with 12+ years of experience building scalable systems and high-performance teams."
    imageUrl="/og/og-about.png"
    type="website"
    siteName="Cassidy Bridges"
    author="Cassidy Bridges"
    themeColor="#0a0a0a"
    linkedinProfile="https://linkedin.com/in/cassidy-bridges-tech"
    githubProfile="https://github.com/off-by-some"
    enableJsonLd={true}
  />
</Story>

<Story name="Minimal" args={{
  title: 'Simple Page',
  description: 'A simple page description.',
  type: 'website'
}}>
  <SEO 
    title="Simple Page"
    description="A simple page description."
    type="website"
  />
</Story>

<Story name="Custom Social Profiles" args={{
  title: 'Custom Social Profiles',
  description: 'Page with custom social media profiles.',
  linkedinProfile: 'https://linkedin.com/in/custom-profile',
  githubProfile: 'https://github.com/custom-user'
}}>
  <SEO 
    title="Custom Social Profiles"
    description="Page with custom social media profiles."
    linkedinProfile="https://linkedin.com/in/custom-profile"
    githubProfile="https://github.com/custom-user"
  />
</Story>
