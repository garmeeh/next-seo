# Next SEO

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

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

The simple usage would be to just include Next SEO on any page you want to set SEO attributes. One thing to note here is that you loose the default SEO behaviour, so your SEO attributes will only show on pages you include `<NextSeo config={YOUR_CONFIG}>`.
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
              url: 'https://www.example.ie/og-imag.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
          ],
        },
      }}
    />
    <p>Basic</p>
  </>
);
```

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
            // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next,
            // previous versions will just render the first entry
            authors: [
              'https://www.example.com/authors/@firstnameA-lastnameA',
              'https://www.example.com/authors/@firstnameB-lastnameB',
            ],
            // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next,
            // previous versions will just render the first entry
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
            // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next,
            // previous versions will just render the first entry
            authors: [
              'https://www.example.com/authors/@firstnameA-lastnameA',
              'https://www.example.com/authors/@firstnameB-lastnameB',
            ],
            // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next,
            // previous versions will just render the first entry
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
    <p>Book</p>
  </>
);
```

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
import { BreadcrumbJsonLb } from 'next-seo';

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
