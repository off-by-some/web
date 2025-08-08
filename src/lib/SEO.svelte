<script lang="ts">
	import { base } from '$app/paths';

	export let title: string;
	export let description: string;
	export let imageUrl: string | undefined = undefined;
	export let url: string | undefined = undefined;
	export let type = 'website';
	export let siteName = 'Cassidy Bridges';
	export let author = 'Cassidy Bridges';
	export let themeColor = '#0a0a0a';
	export let linkedinProfile: string | undefined = 'https://linkedin.com/in/cassidy-bridges-tech';
	export let githubProfile: string | undefined = 'https://github.com/off-by-some';
	export let enableJsonLd = true;

	// Calculate full URLs
	$: siteUrl = (import.meta as any).env?.VITE_SITE_URL ?? '';
	$: fullUrl = url ? (siteUrl ? `${siteUrl}${url}` : url) : (siteUrl ? `${siteUrl}${base}` : base);
	$: fullImageUrl = imageUrl ? (siteUrl ? `${siteUrl}${imageUrl}` : imageUrl) : `${siteUrl}${base}/og/og-about.png`;

	// JSON-LD Person schema
	$: personJsonLd = enableJsonLd ? {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Cassidy Bridges",
		url: siteUrl || undefined,
		jobTitle: "Software Engineering Leader",
		image: fullImageUrl,
		description: description,
		sameAs: [
			linkedinProfile,
			githubProfile
		].filter(Boolean)
	} : null;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Social unfurl (Open Graph & LinkedIn/GitHub) -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:locale" content="en_US" />
	
	<!-- LinkedIn specific meta tags -->
	{#if linkedinProfile}
		<meta property="og:see_also" content={linkedinProfile} />
	{/if}
	{#if githubProfile}
		<meta property="og:see_also" content={githubProfile} />
	{/if}
	
	<!-- Additional social meta tags -->
	<meta name="author" content={author} />
	<meta name="robots" content="index, follow" />
	
	<link rel="canonical" href={fullUrl} />
	<meta name="theme-color" content={themeColor} />

	<!-- JSON-LD Person schema for richer previews/knowledge panels -->
	{#if personJsonLd}
		<script type="application/ld+json">
			{JSON.stringify(personJsonLd)}
		</script>
	{/if}
</svelte:head>
