# Next SEO - Pages Router Support

This directory contains SEO components for Next.js Pages Router applications.

> **Note:** These components are specifically for Pages Router. For App Router applications, use the main next-seo package exports instead.

## Installation

```bash
npm install next-seo
# or
yarn add next-seo
# or
pnpm add next-seo
```

## Usage

Import from `next-seo/pages` instead of `next-seo`:

```tsx
import { NextSeo, DefaultSeo } from "next-seo/pages";
```

> **Important:** In Pages Router, you need to wrap the SEO components with Next.js's `<Head>` component to ensure the meta tags are properly rendered in the document head.

### NextSeo Component

Add SEO meta tags to individual pages:

```tsx
// pages/about.tsx
import Head from "next/head";
import { NextSeo } from "next-seo/pages";

export default function AboutPage() {
  return (
    <>
      <Head>
        <NextSeo
          title="About Us"
          description="Learn more about our company"
          canonical="https://example.com/about"
          openGraph={{
            url: "https://example.com/about",
            title: "About Us",
            description: "Learn more about our company",
            images: [
              {
                url: "https://example.com/og-image.jpg",
                width: 800,
                height: 600,
                alt: "About Us",
              },
            ],
          }}
        />
      </Head>
      <h1>About Us</h1>
      {/* Page content */}
    </>
  );
}
```

### DefaultSeo Component

Set global SEO defaults in your `_app.tsx`:

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo/pages";

const DEFAULT_SEO = {
  titleTemplate: "MySite | %s",
  defaultTitle: "MySite",
  description: "Welcome to MySite",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com/",
    siteName: "MySite",
  },
  twitter: {
    handle: "@mysite",
    site: "@mysite",
    cardType: "summary_large_image",
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <DefaultSeo {...DEFAULT_SEO} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

## Available Props

### Common Props

- `title` - Page title
- `titleTemplate` - Title template for all pages (use `%s` for title placeholder)
- `defaultTitle` - Default title when no title is set
- `description` - Page description
- `canonical` - Canonical URL
- `themeColor` - Theme color meta tag
- `noindex` - Set to `true` to noindex the page
- `nofollow` - Set to `true` to nofollow the page
- `robotsProps` - Additional robots meta properties

### OpenGraph Props

```tsx
openGraph={{
  type: 'website',
  url: 'https://example.com',
  title: 'Open Graph Title',
  description: 'Open Graph Description',
  images: [{
    url: 'https://example.com/og.jpg',
    width: 800,
    height: 600,
    alt: 'Og Image Alt',
  }],
  siteName: 'SiteName',
  locale: 'en_US',
}}
```

### Twitter Props

```tsx
twitter={{
  handle: '@handle',
  site: '@site',
  cardType: 'summary_large_image',
}}
```

### Additional Meta Tags

```tsx
additionalMetaTags={[
  {
    property: 'dc:creator',
    content: 'Jane Doe'
  },
  {
    name: 'application-name',
    content: 'NextSeo'
  }
]}
```

### Additional Link Tags

```tsx
additionalLinkTags={[
  {
    rel: 'icon',
    href: 'https://example.com/favicon.ico',
  },
  {
    rel: 'apple-touch-icon',
    href: 'https://example.com/apple-touch-icon.png',
    sizes: '76x76'
  }
]}
```

## Migration from Legacy Import

If you're using the old import path, update your imports:

```tsx
// Old (deprecated)
import { NextSeo, DefaultSeo } from "next-seo";

// New (Pages Router)
import { NextSeo, DefaultSeo } from "next-seo/pages";
```

## TypeScript Support

All types are exported from `next-seo/pages`:

```tsx
import type { NextSeoProps, DefaultSeoProps } from "next-seo/pages";
```

## More Information

For complete documentation and advanced usage, please refer to the main [next-seo documentation](https://github.com/garmeeh/next-seo).
