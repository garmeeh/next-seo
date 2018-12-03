# Next SEO

Next SEO is a plug in that makes managing your SEO easier in Next.js projects.

This plugin is compatible with version`6.0.0`+ of next.

**NOTE:**

The feature of having multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next.

For versions `6.0.0` - `7.0.0-canary.0` you just need to supply a single item array:

```js
images: [
  {
    url: 'https://www.example.ie/og-image-01.jpg',
    width: 800,
    height: 600,
    alt: 'Og Image Alt',
  },
],
```

Supplying multiple images will not break anything, but only one will be added to the head.

## Recommended Usage

The core module of Next SEO is a component that allows you to easily set the SEO attributes of a page.

The intended usage of this component is that you initialize it in a custom `_app.js` and instantly give every page
of your application some default SEO. Once in place you can override some or all of the properties on per page basis.
Ideally you would have unique SEO on each page. But sometimes for example, you might not have the right Open Graph image for sharing
on social media. With Next SEO you get your default one so you are always covered.

Below is an example of setting up Next SEO using the recommended usage.

### Set Up

Install it:

```bash
npm install --save next-seo
```

### Default SEO Configuration

Create a new file at the root of your directory (or where ever you would normally keep them) `next-seo.config.js`.

Here is an example of a full configuration object:

```js
export default {
  title: 'Title',
  description: 'Description',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    defaultImageWidth: 1200,
    defaultImageHeight: 1200,
    // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next (see note top of README.md)
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt',
      },
      { url: 'https://www.example.ie/og-image-03.jpg' },
      { url: 'https://www.example.ie/og-image-04.jpg' },
    ],
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
```

**Twitter Tags**

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card, this is why `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` so not to duplicate.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

#### More Options

Other options available:

**no-index**

```js
noindex: true;
```

Add this to your default SEO if you wish to **no-index** your site. This is great when you are in a pre-release phase. This can also be used on a page per page basis.

**titleTemplate**

Replaces `%s` with your title string

```js
title: 'This is my title',
titleTemplate: `Next SEO | %s`
// outputs: Next SEO | This is my title
```

```js
title: 'This is my title',
titleTemplate: `%s | Next SEO`
// outputs: This is my title | Next SEO
```

**Canonical URL**

Add this on page per page basis when you want to consolidate duplicate URLs.

```js
canonical: 'https://www.canonical.ie/',
```

### Custom <App>

Next up in your pages directory create a new file, `_app.js`. See the Next.js docs [here](https://github.com/zeit/next.js/#custom-app) for more info on a custom <App>.

```jsx
import App, { Container } from 'next/app';
import React from 'react';
import NextSeo from 'next-seo';

// import your default seo configuration
import SEO from '../next-seo.config';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {/* Here we call NextSeo and pass our default configuration to it  */}
        <NextSeo config={SEO} />
        <Component {...pageProps} />
      </Container>
    );
  }
}
```

### Page Overrides

**Full Override:**

From this point it is just a matter of calling Next SEO from any page and passing in a config object overriding the desired properties.
Below is an example of overriding all properties.

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Title B',
        description: 'Description B',
        canonical: 'https://www.canonical.ie/b',
        openGraph: {
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title B',
          description: 'Open Graph Description B',
          // Multiple Open Graph images is only available in version `7.0.0-canary.0`+ of next (see note top of README.md)
          images: [
            {
              url: 'https://www.example.ie/og-image-b-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt B',
            },
            {
              url: 'https://www.example.ie/og-image-b-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt B Second',
            },
            { url: 'https://www.example.ie/og-image-b-03.jpg' },
            { url: 'https://www.example.ie/og-image-b-04.jpg' },
          ],
          site_name: 'SiteName B',
        },
        twitter: {
          handle: '@handleb',
          site: '@siteb',
          cardType: 'summary_large_image',
        },
      }}
    />
    <p>All of our SEO properties are now updated.</p>
  </>
);
```

**Partial Override:**

In this example we only override `title`, `description` and `canonical`. All of the remaining properties that we set
in `next-seo.config.js` will remain the same.

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Title C',
        description: 'Description C',
        canonical: 'https://www.canonical.ie/c',
      }}
    />
    <p>Only update title, description and canonical.</p>
  </>
);
```

**No Index Override:**

In this example we only override no index a single page:

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        noindex: true,
      }}
    />
    <p>Only update title, description and canonical.</p>
  </>
);
```

## Simple Usage

The simple usage would be to just include Next SEO on any page you want to set SEO attributes. One thing to note here is that you loose the default SEO
behaviour, so your SEO attributes will only show on pages you include `<NextSeo config={YOUR_CONFIG}>`.
If you are using this method you will need to redefine all properties if required.

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Simple Usage Example',
        description: 'A short description goes here.',
        canonical: 'https://www.canonical.ie/b',
        openGraph: {
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title B',
          description: 'Open Graph Description B',
          images: [
            {
              url: 'https://www.example.ie/og-image-b-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt B',
            },
            {
              url: 'https://www.example.ie/og-image-b-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt B Second',
            },
            { url: 'https://www.example.ie/og-image-b-03.jpg' },
            { url: 'https://www.example.ie/og-image-b-04.jpg' },
          ],
          site_name: 'SiteName B',
        },
        twitter: {
          handle: '@handleb',
          site: '@siteb',
          cardType: 'summary_large_image',
        },
      }}
    />
    <p>Simple Usage</p>
  </>
);
```

## JSON-LD

Next SEO now has the ability to set JSON-LD a form of structured data. Structured data is a standardised format for providing information about a page and classifying the page content.

Google has excellent content on JSON-LD -> [HERE](https://developers.google.com/search/docs/data-types/article)

Below you will find a very basic page implementing each of the available JSON-LD types:

- [Article](#article)
- [Blog](#blog)
- [Course](#course)

More to follow very, very soon!

### Article

```jsx
import React from 'react';
import { ArticleJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Article JSON-LD</h1>
    <ArticleJsonLd
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
    />
  </>
);
```

### Blog

```jsx
import React from 'react';
import { BlogJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Blog JSON-LD</h1>
    <BlogJsonLd
      url="https://example.com/blog"
      title="Blog headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      description="This is a mighty good description of this blog."
    />
  </>
);
```

### Course

```jsx
import React from 'react';
import { CourseJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Course JSON-LD</h1>
    <CourseJsonLd
      courseName="Course Name"
      providerName="Course Provider"
      providerUrl="https//www.example.com/provider"
      description="Course description goes right here"
    />
  </>
);
```

### Product

```jsx
import React from 'react';
import { ProductJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Product JSON-LD</h1>
    <ProductJsonLd
      productName="Executive Anvil"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
      brand="ACME"
      reviews={[
        {
          author: 'Jim',
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody:
            'This is my favorite product yet! Thanks Nate for the example products and reviews.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '4.4',
        reviewCount: '89',
      }}
      offers={{
        price: '119.99',
        priceCurrency: 'USD',
        priceValidUntil: '2020-11-05',
        itemCondition: 'http://schema.org/UsedCondition',
        availability: 'http://schema.org/InStock',
        seller: {
          name: 'Executive Objects',
        },
      }}
      mpn="925872"
    />
  </>
);
```

Also available: `sku`, `gtin8`, `gtin13`, `gtin14`.

Valid values for `offers.itemCondition`:

- https://schema.org/DamagedCondition
- https://schema.org/NewCondition
- https://schema.org/RefurbishedCondition
- https://schema.org/UsedCondition

Valid values fro `offers.availability`:

- https://schema.org/Discontinued
- https://schema.org/InStock
- https://schema.org/InStoreOnly
- https://schema.org/LimitedAvailability
- https://schema.org/OnlineOnly
- https://schema.org/OutOfStock
- https://schema.org/PreOrder
- https://schema.org/PreSale
- https://schema.org/SoldOut

More info on the product data type can be found [here](https://developers.google.com/search/docs/data-types/product).

## CHANGELOG

You can view the CHANGELOG [here](CHANGELOG.md)
