# Next.js App Directory Support

> ⚠ Warning: Currently, the Head export does not re-render on client-side transitions, only on initial render. Read more [here](https://beta.nextjs.org/docs/api-reference/file-conventions/head#:~:text=Warning%3A%20Currently%2C%20the%20Head%20export%20does%20not%20re%2Drender%20on%20client%2Dside%20transitions%2C%20only%20on%20initial%20render.
)

With the introduction of the app directory there have been a lot of changes to how the `<head>` is now handled internally by Next.js.
As a result of this, how we use `NextSeo` in our apps will also change.

Please remember that the app directory is in beta and active development by the Next.js team. This means that the recommended way to use
`NextSeo` below may be subject to change as the core logic of Next.js changes.

### Research

If you are interested I carried out some testing and gave feedback to the Next.js team that you can read. They give insight into how I landed on the new suggested use for `NextSeo`

- [Feedback on head.js](https://github.com/vercel/next.js/discussions/41745#discussioncomment-4011958)
- [Feedback on JSON-LD/inline script tags](https://github.com/vercel/next.js/discussions/41745#discussioncomment-4012381)

### Key Changes

- Next.js no longer de-duplicates tags in the head. This means that we can no longer use `<DefaultSeo />` in the same way. Going forward we will solely be use `<NextSeo />`
- `head.js` does not currently support `<script>` tags that do no have `src=""`. So for JSON-LD components they now have to be added via the page. This will result in them being added to the `<body>` of the page. This is 100% ok for SEO and not to worry about. This was confirmed by Google. I have also validated this using schema tool.
- Next.js no longer auto adds the tags below to your app that you will likely need. I suggest adding them to your root layout in a `<head>` tag.

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
</head>
```

### Recommended Usage

#### 1. Set your absolute defaults

As I mentioned there is no de-duplication so anything we add as a default will appear on every page and can not be changed. I recommend identifying what your absolute defaults are and
setting them in your root layout. `/app/layout.js`

An example might be root layout might look something like this:

```jsx
// app/layout.js
import { NextSeo } from 'next-seo';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Used to be added by default, now we need to add manually */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        {/* 
          Anything we add in layout will appear on EVERY PAGE. At present it can not be overridden lower down the tree.
          This can be useful for things like favicons, or other meta tags that are the same on every page.
        */}
        <NextSeo
          useAppDir={true}
          facebook={{ appId: '1234567890' }}
          themeColor="#73fa97"
          titleTemplate="%s | Next SEO"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 2. Do you want default meta?

Maybe you like having some fallback og:images, titles, descriptions etc. If so we can still achieve this with the caveat of you will still need to import `<NextSeo />` on every `page/head.js` that you want meta tags.

If you would like default meta then I suggest creating a `next-seo.config.js` file.

Example:

```js
// next-seo.config.js
export const NEXT_SEO_DEFAULT = {
  title: 'Title A',
  description: 'Description A',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
        secureUrl: 'https://www.test.ie/secure-og-image-a-01.jpg',
      },
    ],
    siteName: 'SiteName A',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
};
```

or Typescript:

```ts
// next-seo.config.ts
import type { NextSeoProps } from 'next-seo';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'Title A',
  description: 'Description A',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/a',
    title: 'Open Graph Title A',
    description: 'Open Graph Description A',
    images: [
      {
        url: 'https://www.test.ie/og-image-a-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
        secureUrl: 'https://www.test.ie/secure-og-image-a-01.jpg',
      },
    ],
    siteName: 'SiteName A',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
};
```

Now in any page you want to add meta data you can do the following.

Remember we now need to use the `head.js` file that sits alongside the `page.js` file.

```js
// app/head.js
import { NextSeo } from 'next-seo';

import { NEXT_SEO_DEFAULT } from './next-seo.config'; // your path will vary

export default async function Head() {
  return <NextSeo {...NEXT_SEO_DEFAULT} useAppDir={true} />;
}
```

**IMPORTANT**: Notice the new prop `useAppDir`. This is important as it makes `NextSeo` use the app directory compatible version.

If you would like to see output after following step 1. & 2. expand below.

<details>
<summary>Output of the above steps</summary>

```html
<head>
  <!-- These come from your layout -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#73fa97" />
  <meta property="fb:app_id" content="1234567890" />

  <!-- These come from your head.js in step 2 -->
  <title>Title A | Next SEO</title>
  <meta name="description" content="Description A" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sitea" />
  <meta name="twitter:creator" content="@handlea" />
  <meta property="og:title" content="Open Graph Title A" />
  <meta property="og:description" content="Open Graph Description A" />
  <meta property="og:url" content="https://www.url.ie/a" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.test.ie/og-image-a-01.jpg" />
  <meta property="og:image:alt" content="Og Image Alt A" />
  <meta
    property="og:image:secure_url"
    content="https://www.test.ie/secure-og-image-a-01.jpg"
  />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="600" />
  <meta property="og:locale" content="en_IE" />
  <meta property="og:site_name" content="SiteName A" />
</head>
```

</details>

#### 3. Re-use your default meta

Now that you have your default meta defined in a config, you can reuse it on other pages. For example if you have a new page you can override
where needed. Here is an example of `head.js` in another page.

```jsx
// app/example/head.js
import { NextSeo } from 'next-seo';

import { NEXT_SEO_DEFAULT } from '../../next-seo.config'; // your path may vary

export default async function Head() {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'Example Page',
    description: 'This is an example page',
    titleTemplate: '%s',
  };
  return <NextSeo {...updateMeta} useAppDir={true} />;
}
```

Here you are setting a new title, description and removing the title template for this page.

<details>
<summary>Output of this:</summary>

```html
<head>
  <!-- These come from your layout -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#73fa97" />
  <meta property="fb:app_id" content="1234567890" />

  <!-- These come from your head.js above -->
  <title>Example Page</title>
  <meta name="description" content="This is an example page" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sitea" />
  <meta name="twitter:creator" content="@handlea" />
  <meta property="og:title" content="Open Graph Title A" />
  <meta property="og:description" content="Open Graph Description A" />
  <meta property="og:url" content="https://www.url.ie/a" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://www.test.ie/og-image-a-01.jpg" />
  <meta property="og:image:alt" content="Og Image Alt A" />
  <meta
    property="og:image:secure_url"
    content="https://www.test.ie/secure-og-image-a-01.jpg"
  />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="600" />
  <meta property="og:locale" content="en_IE" />
  <meta property="og:site_name" content="SiteName A" />
</head>
```

</details>

#### 4. You don't always need to use the config

The config file is just a convenience if you want to have the same meta on every page. In the case you just want a few meta tags
on the page you can just add `<NextSeo />` without the config.

For example:

```jsx
import { NextSeo } from 'next-seo';

export default async function Head() {
  return (
    <NextSeo
      title="No Index Example Page"
      description="This is an example without config."
      noindex={true}
      useAppDir={true}
    />
  );
}
```

<details>
<summary>Output of this:</summary>

```html
<head>
  <!-- These come from your layout -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#73fa97" />
  <meta property="fb:app_id" content="1234567890" />

  <!-- These come from your <NextSeo /> above -->
  <title>No Index Example Page | Next SEO</title>
  <meta name="robots" content="noindex,follow" />
  <meta name="description" content="This is an example without config." />
  <meta property="og:title" content="No Index Example Page | Next SEO" />
  <meta
    property="og:description"
    content="This is an example without config."
  />
</head>
```

</details>

#### 5. Using JSON-LD components

As mentioned in the key changes, inline `<script>` can not be added via `head.js` at the moment. We can however add them via `page.js`. So to add
a JSON-LD component from `next-seo` you just need to import it as normal add it via your page rather than the head.

**IMPORTANT**: Notice the new prop `useAppDir`. This is important as it makes `next-seo` JSON-LD components use the app directory compatible version.

Here is an example of adding `<ArticleJsonLd />` to a page.

```jsx
// app/jsonld/article/page.js
import { ArticleJsonLd } from 'next-seo';

const Article = () => (
  <>
    <h1>Article</h1>
    <p>Inspect page for output.</p>
    <ArticleJsonLd
      useAppDir={true}
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName={[
        {
          name: 'Jane Blogs',
          url: 'https://example.com',
        },
        {
          name: 'Mary Stone',
          url: 'https://example.com',
        },
      ]}
      publisherName="Kali Skye"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
      isAccessibleForFree={true}
    />
  </>
);

export default Article;
```

and if you want to modify the meta tags:

```jsx
// app/jsonld/article/head.js
export default async function Head() {
  return (
    <>
      <title>Article JSON-LD</title>
    </>
  );
}
```

<details>
<summary>Output of head for this</summary>

```html
<head>
  <!-- These come from your layout -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <meta name="robots" content="index,follow" />
  <meta name="theme-color" content="#73fa97" />
  <meta property="fb:app_id" content="1234567890" />

  <!-- These come from your head.js above -->
  <title>Article JSON-LD</title>
</head>
```

</details>

and then the page output in `<body>`

<details>
<summary>Output of body for this</summary>

```html
<div>
  <h1>Article</h1>
  <p>Inspect page for output.</p>
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "datePublished": "2015-02-05T08:00:00+08:00",
      "description": "This is a mighty good description of this article.",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://example.com/article"
      },
      "headline": "Article headline",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
      ],
      "dateModified": "2015-02-05T09:00:00+08:00",
      "author": [
        {
          "@type": "Person",
          "name": "Jane Blogs",
          "url": "https://example.com"
        },
        {
          "@type": "Person",
          "name": "Mary Stone",
          "url": "https://example.com"
        }
      ],
      "publisher": {
        "@type": "Organization",
        "name": "Kali Skye",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.example.com/photos/logo.jpg"
        }
      },
      "isAccessibleForFree": true
    }
  </script>
</div>
```

</details>

### Feedback

Hopefully this gets you up and running with the new app directory.

If you have any feedback be sure to let me know over [here](https://github.com/garmeeh/next-seo/discussions/1073)

The examples above can be found the example app in this repo [here](https://github.com/garmeeh/next-seo/tree/master/e2eWithApp)
