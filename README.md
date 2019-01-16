# Next SEO

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

Next SEO is a plug in that makes managing your SEO easier in Next.js projects and is compatible with version`6.0.0`+ of Next.js.

## Usage

`NextSeo` works by including it on pages where you would like SEO attributes to added. Once included on the page you pass it a configuration object with the page's SEO properties. This can be dynamically generated at a page level or in some cases your API may return an SEO object.

### Set Up

First install it:

```bash
npm install --save next-seo
```

or

```bash
yarn add next-seo
```

### Add SEO to Page

Then you need to import `NextSeo` and pass a `config` object to it. This will render out the tags in the `<head>` for SEO. At a bare minimum you should add a title and description.

**Example with just title and description:**

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Simple Usage Example',
        description: 'A short description goes here.',
      }}
    />
    <p>Simple Usage</p>
  </>
);
```

But `NextSeo` gives you much more options that you can add. See below for an a typical example of a page.

**Typical example for page:**

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Using More of Config',
        description: 'This example uses more of the available config options.',
        canonical: 'https://www.canonical.ie/',
        openGraph: {
          url: 'https://www.url.ie/a',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
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
              alt: 'Og Image Alt Second',
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
      }}
    />
    <p>SEO Added to Page</p>
  </>
);
```

**A note on Twitter Tags**

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card, this is why `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` so not to duplicate.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

### Default SEO Configuration

`NextSeo` enables you to set some default SEO that will appear on all pages without needing to do include anything on them. You can also set some defaults and then override these on a page by page basis if needed.

#### Default Config

Create a new file at the root of your directory (or where ever you would normally keep them) `next-seo.config.js`.

Here is a typical example of a default configuration object:

```js
export default {
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.url.ie/',
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
```

**Important**

Please note, that you can add all properties to the default but this should be done with caution. Once you set a default it must be fully overridden.

For example if you set 4 images as the default, you must then pass 4 images through on a page to override them all. Otherwise the one you pass through will render along with the remaining 3 default ones.

Another example may be that you want to add a default image to Open Graph. You might add the `alt` text along with the `width` and `height` properties. If so when adding a dynamic image on a page you must then fully override these properties, otherwise just overriding the `URL` would result in the dynamic image inheriting the default `width`, `height` and `alt`.

This can be a positive or negative depending on your use case, so please use with caution. If in doubt, just set properties that generally do not change from page to page.

#### Custom <App>

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

From now on all of your pages will have the defaults applied.

### Full Config Options

| Property                           | Type                    | Description                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titleTemplate`                    | string                  | Allows you to set default title template that will be added to your title [More Info](#title-template)                                                                                                                                                                                  |
| `title`                            | string                  | Set the meta title of the page                                                                                                                                                                                                                                                          |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not [More Info](#no-index)                                                                                                                                                                                                                       |
| `description`                      | string                  | Set the page meta description                                                                                                                                                                                                                                                           |
| `canonical`                        | string                  | Set the page canonical url                                                                                                                                                                                                                                                              |
| `twitter.cardType`                 | string                  | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                                                                                                                                                                                                |
| `twitter.site`                     | string                  | @username for the website used in the card footer                                                                                                                                                                                                                                       |
| `twitter.handle`                   | string                  | @username for the content creator / author (outputs as `twitter:creator`)                                                                                                                                                                                                               |
| `facebook.appId`                   | number                  | Used for Facebook Insights, you must add a facebook app ID to your page to for it [More Info](#facebook)                                                                                                                                                                                |
| `openGraph.url`                    | string                  | The canonical URL of your object that will be used as its permanent ID in the graph                                                                                                                                                                                                     |
| `openGraph.type`                   | string                  | The type of your object. Depending on the type you specify, other properties may also be required [More Info](#open-graph)                                                                                                                                                              |
| `openGraph.title`                  | string                  | The open graph title, this can be different than your meta title.                                                                                                                                                                                                                       |
| `openGraph.description`            | string                  | The open graph description, this can be different than your meta description.                                                                                                                                                                                                           |
| `openGraph.images`                 | array                   | An array of images (object) to be used by social media platforms, slack etc as a preview. If multiple supplied you can choose one when sharing. [See Examples](#open-graph-examples)                                                                                                    |
| `openGraph.defaultImageHeight`     | number                  | Set's the default height for all open graph images. You should only set this if all image heights are known. It can be overrode at a page level but you must know the height to do so. Otherwise the default height will be set for a dynamic image that you do not know the height of. |
| `openGraph.defaultImageWidth`      | number                  | Set's the default width for all open graph images. You should only set this if all image widths are known. It can be overrode at a page level but you must know the width to do so. Otherwise the default width will be set for a dynamic image that you do not know the width of.      |
| `openGraph.locale`                 | string                  | The locale the open graph tags are marked up in. Of the format language_TERRITORY. Default is en_US.                                                                                                                                                                                    |
| `openGraph.site_name`              | string                  | If your object is part of a larger web site, the name which should be displayed for the overall site.                                                                                                                                                                                   |
| `openGraph.profile.firstName`      | string                  | Person's first name.                                                                                                                                                                                                                                                                    |
| `openGraph.profile.lastName`       | string                  | Person's last name.                                                                                                                                                                                                                                                                     |
| `openGraph.profile.username`       | string                  | Peron's username.                                                                                                                                                                                                                                                                       |
| `openGraph.profile.gender`         | string                  | Person's gender.                                                                                                                                                                                                                                                                        |
| `openGraph.book.authors`           | string[]                | Writers of the article. [See Examples](#open-graph-examples)                                                                                                                                                                                                                            |
| `openGraph.book.isbn`              | string                  | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                                                                                                                                                                                            |
| `openGraph.book.releaseDate`       | datetime                | The date the book was released.                                                                                                                                                                                                                                                         |
| `openGraph.book.tags`              | string[]                | Tag words associated with this book.                                                                                                                                                                                                                                                    |
| `openGraph.article.publishedTime`  | datetime                | When the article was first published. [See Examples](#open-graph-examples)                                                                                                                                                                                                              |
| `openGraph.article.modifiedTime`   | datetime                | When the article was last changed.                                                                                                                                                                                                                                                      |
| `openGraph.article.expirationTime` | datetime                | When the article is out of date after.                                                                                                                                                                                                                                                  |
| `openGraph.article.authors`        | string[]                | Writers of the article.                                                                                                                                                                                                                                                                 |
| `openGraph.article.section`        | string                  | A high-level section name. E.g. Technology                                                                                                                                                                                                                                              |
| `openGraph.article.tags`           | string[]                | Tag words associated with this article.                                                                                                                                                                                                                                                 |

#### Title Template

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

#### No Index

Setting this to `true` will set `no-index`, `no-follow`.

Add this to your default SEO if you wish to **no-index** your site. This is great when you are in a pre-release phase.

This can also be used on a page per page basis.

**Example No Index on single page:**

If you have a single page that you want no indexed you can achieve this by:

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
    <p>This page is no indexed</p>
  </>
);
```

#### Twitter

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card, this is why `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` so not to duplicate.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

#### facebook

```js
facebook: {
  appId: 1234567890,
}.
```

Add this to your SEO config to include the fb:app_id meta if you need to enable Facebook insights for your site. Information regarding this can be found in facebook's [documentation](https://developers.facebook.com/docs/sharing/webmasters/)

#### Canonical URL

Add this on page per page basis when you want to consolidate duplicate URLs.

```js
canonical: 'https://www.canonical.ie/',
```

## Open Graph

For the full specification please check out http://ogp.me/

Next SEO currently supports:

- [basic](#basic)
- [article](#article)
- [book](#book)
- [profile](#profile)

### Open Graph Examples

#### Basic

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        openGraph: {
          type: 'website',
          url: 'https://www.example.com/page',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.example.ie/og-image.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: 'https://www.example.ie/og-image-2.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt 2',
            },
          ],
        },
      }}
    />
    <p>Basic</p>
  </>
);
```

**Note**

Multiple images is only available in version `7.0.0-canary.0`+

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

#### Article

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        openGraph: {
          title: 'Open Graph Article Title',
          description: 'Description of open graph article',
          url: 'https://www.example.com/articles/article-title',
          type: 'article',
          article: {
            publishedTime: '2017-06-21T23:04:13Z',
            modifiedTime: '2018-01-21T18:04:43Z',
            expirationTime: '2022-12-21T22:04:11Z',
            section: 'Section II',
            authors: [
              'https://www.example.com/authors/@firstnameA-lastnameA',
              'https://www.example.com/authors/@firstnameB-lastnameB',
            ],
            tags: ['Tag A', 'Tag B', 'Tag C'],
          },
          images: [
            {
              url: 'https://www.test.ie/images/cover.jpg',
              width: 850,
              height: 650,
              alt: 'Photo of text',
            },
          ],
        },
      }}
    />
    <p>Article</p>
  </>
);
```

**Note**

Multiple images, authors, tags is only available in version `7.0.0-canary.0`+

For versions `6.0.0` - `7.0.0-canary.0` you just need to supply a single item array:

`images:`

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

`authors:`

```js
authors: [
  'https://www.example.com/authors/@firstnameA-lastnameA',
],
```

`tags:`

```js
tags: ['Tag A'],
```

Supplying multiple of any of the above will not break anything, but only one will be added to the head.

#### Book

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        openGraph: {
          title: 'Open Graph Book Title',
          description: 'Description of open graph book',
          url: 'https://www.example.com/books/book-title',
          type: 'book',
          book: {
            releaseDate: '2018-09-17T11:08:13Z',
            isbn: '978-3-16-148410-0',
            authors: [
              'https://www.example.com/authors/@firstnameA-lastnameA',
              'https://www.example.com/authors/@firstnameB-lastnameB',
            ],
            tags: ['Tag A', 'Tag B', 'Tag C'],
          },
          images: [
            {
              url: 'https://www.test.ie/images/book.jpg',
              width: 850,
              height: 650,
              alt: 'Cover of the book',
            },
          ],
        },
      }}
    />
    <p>Book</p>
  </>
);
```

**Note**

Multiple images, authors, tags is only available in version `7.0.0-canary.0`+

For versions `6.0.0` - `7.0.0-canary.0` you just need to supply a single item array:

`images:`

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

`authors:`

```js
authors: [
  'https://www.example.com/authors/@firstnameA-lastnameA',
],
```

`tags:`

```js
tags: ['Tag A'],
```

Supplying multiple of any of the above will not break anything, but only one will be added to the head.

#### Profile

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo
      config={{
        openGraph: {
          title: 'Open Graph Profile Title',
          description: 'Description of open graph profile',
          url: 'https://www.example.com/@firstlast123',
          type: 'profile',
          profile: {
            firstName: 'First',
            lastName: 'Last',
            username: 'firstlast123',
            gender: 'female',
          },
          images: [
            {
              url: 'https://www.test.ie/images/profile.jpg',
              width: 850,
              height: 650,
              alt: 'Profile Photo',
            },
          ],
        },
      }}
    />
    <p>Profile</p>
  </>
);
```

**Note**

Multiple images is only available in version `7.0.0-canary.0`+

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

## JSON-LD

Next SEO now has the ability to set JSON-LD a form of structured data. Structured data is a standardised format for providing information about a page and classifying the page content.

Google has excellent content on JSON-LD -> [HERE](https://developers.google.com/search/docs/data-types/article)

Below you will find a very basic page implementing each of the available JSON-LD types:

- [Article](#article)
- [Breadcrumb](#breadcrumb)
- [Blog](#blog)
- [Course](#course)
- [Local Business](#local-business)
- [Product](#product)
- [Social Profile](#social-profile)

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

### Breadcrumb

```jsx
import React from 'react';
import { BreadcrumbJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Breadcrumb JSON-LD</h1>
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: 'Books',
          item: 'https://example.com/books',
        },
        {
          position: 2,
          name: 'Authors',
          item: 'https://example.com/books/authors',
        },
        {
          position: 3,
          name: 'Ann Leckie',
          item: 'https://example.com/books/authors/annleckie',
        },
        {
          position: 4,
          name: 'Ancillary Justice',
          item: 'https://example.com/books/authors/ancillaryjustice',
        },
      ]}
    />
  </>
);
```

**Required properties**

| Property                    | Info                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `itemListElements`          |                                                                                                          |
| `itemListElements.position` | The position of the breadcrumb in the breadcrumb trail. Position 1 signifies the beginning of the trail. |
| `itemListElements.name`     | The title of the breadcrumb displayed for the user.                                                      |
| `itemListElements.item`     | The URL to the webpage that represents the breadcrumb.                                                   |

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

### Local Business

Local business is supported with a sub-set of properties.

```jsx
<LocalBusinessJsonLd
  type="Store"
  id="http://davesdeptstore.example.com"
  name="Dave's Department Store"
  description="Dave's latest department store in San Jose, now open"
  url="http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427"
  telephone="+14088717984"
  address={{
    streetAddress: '1600 Saratoga Ave',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
    addressCountry: 'US',
  }}
  geo={{
    latitude: '37.293058',
    longitude: '-121.988331',
  }}
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
/>
```

**Required properties**

| Property                  | Info                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `@id`                     | Globally unique ID of the specific business location in the form of a URL. |
| `type`                    | LocalBusiness or any sub-type                                              |
| `address`                 | Address of the specific business location                                  |
| `address.addressCountry`  | The 2-letter ISO 3166-1 alpha-2 country code                               |
| `address.addressLocality` | City                                                                       |
| `address.addressRegion`   | State or province, if applicable.                                          |
| `address.postalCode`      | Postal or zip code.                                                        |
| `address.streetAddress`   | Street number, street name, and unit number.                               |
| `name`                    | Business name.                                                             |

**Supported properties**

| Property        | Info                                                                                |
| --------------- | ----------------------------------------------------------------------------------- |
| `description`   | Description of the business location                                                |
| `geo`           | Geographic coordinates of the business.                                             |
| `geo.latitude`  | The latitude of the business location                                               |
| `geo.longitude` | The longitude of the business location                                              |
| `images`        | An image or images of the business. Required for valid markup depending on the type |
| `telephone`     | A business phone number meant to be the primary contact method for customers.       |
| `url`           | The fully-qualified URL of the specific business location.                          |

**NOTE:**

Images are required for most of the types that you can use for `LocalBusiness`, if in doubt you should add an image. You can check your generated JSON over at Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### Logo

```jsx
import React from 'react';
import { LogoJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Logo JSON-LD</h1>
    <LogoJsonLd
      logo="http://www.your-site.com/images/logo.jpg"
      url="http://www.your-site.com"
    />
  </>
);
```

| Property | Info                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`    | The URL of the website associated with the logo. [Logo guidelines](https://developers.google.com/search/docs/data-types/logo#definitions) |
| `logo`   | URL of a logo that is representative of the organization.                                                                                 |

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

### Social Profile

```jsx
import React from 'react';
import { SocialProfileJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Social Profile JSON-LD</h1>
    <SocialProfileJsonLd
      type="Person"
      name="your name"
      url="http://www.your-site.com"
      sameAs={[
        'http://www.facebook.com/your-profile',
        'http://instagram.com/yourProfile',
        'http://www.linkedin.com/in/yourprofile',
        'http://plus.google.com/your_profile',
      ]}
    />
  </>
);
```

**Required properties**

| Property | Info                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `type`   | Person or Organization                                                                    |
| `name`   | The name of the person or organization                                                    |
| `url`    | The URL for the person's or organization's official website.                              |
| `sameAs` | An array of URLs for the person's or organization's official social media profile page(s) |

**Google Supported Social Profiles**

- Facebook
- Twitter
- Google+
- Instagram
- YouTube
- LinkedIn
- Myspace
- Pinterest
- SoundCloud
- Tumblr

[Google Docs for Social Profile](https://developers.google.com/search/docs/data-types/social-profile)

## CHANGELOG

You can view the CHANGELOG [here](CHANGELOG.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/13333582?v=4" width="100px;"/><br /><sub><b>Gary Meehan</b></sub>](https://www.garymeehan.ie/)<br />[💻](https://github.com/garmeeh/next-seo/commits?author=garmeeh "Code") [📖](https://github.com/garmeeh/next-seo/commits?author=garmeeh "Documentation") [💡](#example-garmeeh "Examples") [⚠️](https://github.com/garmeeh/next-seo/commits?author=garmeeh "Tests") | [<img src="https://avatars3.githubusercontent.com/u/3099369?v=4" width="100px;"/><br /><sub><b>Jerome Fitzgerald</b></sub>](https://www.jeromefitzgerald.com/)<br />[💻](https://github.com/garmeeh/next-seo/commits?author=JeromeFitz "Code") | [<img src="https://avatars0.githubusercontent.com/u/3820632?v=4" width="100px;"/><br /><sub><b>erick B</b></sub>](https://github.com/erickeno)<br />[💻](https://github.com/garmeeh/next-seo/commits?author=erickeno "Code") | [<img src="https://avatars2.githubusercontent.com/u/15269328?v=4" width="100px;"/><br /><sub><b>Erik Condie</b></sub>](https://www.erikcondie.com)<br />[💻](https://github.com/garmeeh/next-seo/commits?author=econdie "Code") [⚠️](https://github.com/garmeeh/next-seo/commits?author=econdie "Tests") [💡](#example-econdie "Examples") [🤔](#ideas-econdie "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/168870?v=4" width="100px;"/><br /><sub><b>Tim Reynolds</b></sub>](http://timothyreynolds.co.uk)<br />[💻](https://github.com/garmeeh/next-seo/commits?author=timReynolds "Code") [⚠️](https://github.com/garmeeh/next-seo/commits?author=timReynolds "Tests") [💡](#example-timReynolds "Examples") [📖](https://github.com/garmeeh/next-seo/commits?author=timReynolds "Documentation") |
| :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
