# Next SEO

[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)

Next SEO is a plugin that makes managing your SEO easier in Next.js projects.

Version 2.x is compatible with `next@v8.1.1-canary.54+` and above
Version 1.x is compatible with `next@6.0.0` and above

**Both versions are still maintained. If upgrading from v1 to v2, please note that the `NextSeo` component has been changed from a default to a named export, so you need to update the import statements in your pages accordingly to avoid errors. Also, values are now passed down as properties to the SEO components instead of only using a `config` object so refactor your code accordingly (this would fail silently and your metadata will not be there, so double check and inspect your pages' HTML).**

Version One docs can be found [here](https://github.com/garmeeh/next-seo/tree/support/1.x)

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
  - [Setup](#setup)
  - [Add SEO to Page](#add-seo-to-page)
  - [Default SEO Configuration](#default-seo-configuration)
  - [NextSeo Options](#nextseo-options)
    - [Title Template](#title-template)
    - [No Index](#no-index)
    - [dangerouslySetAllPagesToNoIndex](#dangerouslysetallpagestonoindex)
    - [No Follow](#no-follow)
    - [dangerouslySetAllPagesToNoFollow](#dangerouslysetallpagestonofollow)
    - [Twitter](#twitter)
    - [facebook](#facebook)
    - [Canonical URL](#canonical-url)
    - [Alternate](#alternate)
    - [Additional Meta Tags](#additional-meta-tags)
- [Open Graph](#open-graph)
  - [Open Graph Examples](#open-graph-examples)
    - [Basic](#basic)
    - [Video](#video)
    - [Article](#article)
    - [Book](#book)
    - [Profile](#profile)
- [JSON-LD](#json-ld)
  - [Article](#article-1)
  - [Breadcrumb](#breadcrumb)
  - [Blog](#blog)
  - [Course](#course)
  - [Corporate Contact](#corporate-contact)
  - [FAQ Page](#faq-page)
  - [Local Business](#local-business)
  - [Logo](#logo)
  - [Product](#product)
  - [Social Profile](#social-profile)
  - [News Article](#news-article)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

`NextSeo` works by including it on pages where you would like SEO attributes to be added. Once included on the page you pass it a configuration object with the page's SEO properties. This can be dynamically generated at a page level or in some cases your API may return an SEO object.

### Setup

First, install it:

```bash
npm install --save next-seo
```

or

```bash
yarn add next-seo
```

### Add SEO to Page

Then you need to import `NextSeo` and add the desired properties. This will render out the tags in the `<head>` for SEO. At a bare minimum, you should add a title and description.

**Example with just title and description:**

```jsx
import React from 'react';
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      title="Simple Usage Example"
      description="A short description goes here."
    />
    <p>Simple Usage</p>
  </>
);
```

But `NextSeo` gives you many more options that you can add. See below for a typical example of a page.

**Typical page example:**

```jsx
import React from 'react';
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      title="Using More of Config"
      description="This example uses more of the available config options."
      canonical="https://www.canonical.ie/"
      openGraph={{
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
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    <p>SEO Added to Page</p>
  </>
);
```

**A note on Twitter Tags**

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card. `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` to avoid duplication.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

### Default SEO Configuration

`NextSeo` enables you to set some default SEO properties that will appear on all pages without needing to do include anything on them. You can also override these on a page by page basis if needed.

To achieve this, you will need to create a custom `<App>`. In your pages directory create a new file, `_app.js`. See the Next.js docs [here](https://github.com/zeit/next.js/#custom-app) for more info on a custom `<App>`.

Within this file you will need to import `DefaultSeo` from `next-seo` and pass it props.

Here is a typical example:

```jsx
import App, { Container } from 'next/app';
import React from 'react';
import { DefaultSeo } from 'next-seo';

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
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.url.ie/',
            site_name: 'SiteName',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}
```

Alternatively, you can also create a config file to store default values such as `next-seo.config.js`

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

import at the top of `_app.js`

```jsx
import SEO from '../next-seo.config';
```

and the `DefaultSeo` component can be used like this instead

```jsx
<DefaultSeo {...SEO} />
```

From now on all of your pages will have the defaults above applied.

**Note that `Container` is deprecated in Next.js v9.0.4 so you should replace that component here with `React.Fragment` on this version and later - see [here](https://github.com/zeit/next.js/blob/master/errors/app-container-deprecated.md)**

### NextSeo Options

| Property                           | Type                    | Description                                                                                                                                                                          |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `titleTemplate`                    | string                  | Allows you to set default title template that will be added to your title [More Info](#title-template)                                                                               |
| `title`                            | string                  | Set the meta title of the page                                                                                                                                                       |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not [More Info](#no-index)                                                                                                                    |
| `nofollow`                         | boolean (default false) | Sets whether page should be followed or not [More Info](#no-follow)                                                                                                                  |
| `description`                      | string                  | Set the page meta description                                                                                                                                                        |
| `canonical`                        | string                  | Set the page canonical url                                                                                                                                                           |
| `mobileAlternate.media`            | string                  | Set what screen size the mobile website should be served from                                                                                                                        |
| `mobileAlternate.href`             | string                  | Set the mobile page alternate url                                                                                                                                                    |
| `languageAlternate`                | array                   | Set the language of the alternate urls. Excepts object: `{ hrefLang: string, href: string }`                                                                                         |
| `additionalMetaTags`               | array                   | Allows you to add a meta tag that is not documented here. [More Info](#additional-meta-tags)                                                                                         |
| `twitter.cardType`                 | string                  | The card type, which will be one of `summary`, `summary_large_image`, `app`, or `player`                                                                                             |
| `twitter.site`                     | string                  | @username for the website used in the card footer                                                                                                                                    |
| `twitter.handle`                   | string                  | @username for the content creator / author (outputs as `twitter:creator`)                                                                                                            |
| `facebook.appId`                   | string                  | Used for Facebook Insights, you must add a facebook app ID to your page to for it [More Info](#facebook)                                                                             |
| `openGraph.url`                    | string                  | The canonical URL of your object that will be used as its permanent ID in the graph                                                                                                  |
| `openGraph.type`                   | string                  | The type of your object. Depending on the type you specify, other properties may also be required [More Info](#open-graph)                                                           |
| `openGraph.title`                  | string                  | The open graph title, this can be different than your meta title.                                                                                                                    |
| `openGraph.description`            | string                  | The open graph description, this can be different than your meta description.                                                                                                        |
| `openGraph.images`                 | array                   | An array of images (object) to be used by social media platforms, slack etc as a preview. If multiple supplied you can choose one when sharing. [See Examples](#open-graph-examples) |
| `openGraph.videos`                 | array                   | An array of videos (object)                                                                                                                                                          |
| `openGraph.locale`                 | string                  | The locale the open graph tags are marked up in. Of the format language_TERRITORY. Default is en_US.                                                                                 |
| `openGraph.site_name`              | string                  | If your object is part of a larger web site, the name which should be displayed for the overall site.                                                                                |
| `openGraph.profile.firstName`      | string                  | Person's first name.                                                                                                                                                                 |
| `openGraph.profile.lastName`       | string                  | Person's last name.                                                                                                                                                                  |
| `openGraph.profile.username`       | string                  | Peron's username.                                                                                                                                                                    |
| `openGraph.profile.gender`         | string                  | Person's gender.                                                                                                                                                                     |
| `openGraph.book.authors`           | string[]                | Writers of the article. [See Examples](#open-graph-examples)                                                                                                                         |
| `openGraph.book.isbn`              | string                  | The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)                                                                                                         |
| `openGraph.book.releaseDate`       | datetime                | The date the book was released.                                                                                                                                                      |
| `openGraph.book.tags`              | string[]                | Tag words associated with this book.                                                                                                                                                 |
| `openGraph.article.publishedTime`  | datetime                | When the article was first published. [See Examples](#open-graph-examples)                                                                                                           |
| `openGraph.article.modifiedTime`   | datetime                | When the article was last changed.                                                                                                                                                   |
| `openGraph.article.expirationTime` | datetime                | When the article is out of date after.                                                                                                                                               |
| `openGraph.article.authors`        | string[]                | Writers of the article.                                                                                                                                                              |
| `openGraph.article.section`        | string                  | A high-level section name. E.g. Technology                                                                                                                                           |
| `openGraph.article.tags`           | string[]                | Tag words associated with this article.                                                                                                                                              |

#### Title Template

Replaces `%s` with your title string

```js
title = 'This is my title';
titleTemplate = 'Next SEO | %s';
// outputs: Next SEO | This is my title
```

```js
title = 'This is my title';
titleTemplate = '%s | Next SEO';
// outputs: This is my title | Next SEO
```

#### No Index

Setting this to `true` will set `noindex,follow` (to set `nofollow`, please refer to [`nofollow`](#noFollow)). This works on a page by page basis. This property works in tandem with the `nofollow` property and together they populate the `robots` and `googlebot` meta tags.

**Note:** The `noindex` and the [`nofollow`](#noFollow) properties are a little different than all the others in the sense that setting them as a default does not work as expected. This is due to the fact Next SEO already has a default of `index,follow` because `next-seo` is a SEO plugin after all. So if you want to globally these properties, please see [dangerouslySetAllPagesToNoIndex](#dangerouslySetAllPagesToNoIndex) and [dangerouslySetAllPagesToNoFollow](#dangerouslySetAllPagesToNoFollow).

**Example No Index on a single page:**

If you have a single page that you want no indexed you can achieve this by:

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo noindex={true} />
    <p>This page is no indexed</p>
  </>
);

/* 
<meta name="robots" content="noindex,follow">
<meta name="googlebot" content="noindex,follow">
*/
```

#### dangerouslySetAllPagesToNoIndex

It has the prefix of `dangerously` because it will `noindex` all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to `noindex` **EVERY** page. You can still override this at a page level if you have a use case to `index` a page. This can be done by setting `noindex: false`.

The only way to unset this, is by removing the prop from the `DefaultSeo` in your custom `<App>`.

#### No Follow

Setting this to `true` will set `index,nofollow` (to set `noindex`, please refer to [`noindex`](#noIndex)). This works on a page by page basis. This property works in tandem with the `noindex` property and together they populate the `robots` and `googlebot` meta tags.

**Note:** The `noindex` and the [`nofollow`](#noFollow) properties are a little different than all the others in the sense that setting them as a default does not work as expected. This is due to the fact Next SEO already has a default of `index,follow` because `next-seo` is a SEO plugin after all. So if you want to globally these properties, please see [dangerouslySetAllPagesToNoIndex](#dangerouslySetAllPagesToNoIndex) and [dangerouslySetAllPagesToNoFollow](#dangerouslySetAllPagesToNoFollow).

**Example No Follow on a single page:**

If you have a single page that you want no indexed you can achieve this by:

```jsx
import React from 'react';
import NextSeo from 'next-seo';

export default () => (
  <>
    <NextSeo nofollow={true} />
    <p>This page is not followed</p>
  </>
);

/* 
<meta name="robots" content="index,nofollow">
<meta name="googlebot" content="index,nofollow">
*/
```

#### dangerouslySetAllPagesToNoFollow

It has the prefix of `dangerously` because it will `nofollow` all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to `nofollow` **EVERY** page. You can still override this at a page level if you have a use case to `follow` a page. This can be done by setting `nofollow: false`.

The only way to unset this, is by removing the prop from the `DefaultSeo` in your custom `<App>`.

| `noindex` | `nofollow` | `meta` content of `robots`, `googlebot` |
| --------- | ---------- | --------------------------------------- |
| --        | --         | `index,follow` (default)                |
| false     | false      | `index,follow`                          |
| true      | --         | `noindex,follow`                        |
| true      | false      | `noindex,follow`                        |
| --        | true       | `index,nofollow`                        |
| false     | true       | `index,nofollow`                        |
| true      | true       | `noindex,nofollow`                      |

#### Twitter

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card, this is why `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` so not to duplicate.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

#### facebook

```jsx
facebook={{
  appId: 1234567890,
}}
```

Add this to your SEO config to include the fb:app_id meta if you need to enable Facebook insights for your site. Information regarding this can be found in facebook's [documentation](https://developers.facebook.com/docs/sharing/webmasters/)

#### Canonical URL

Add this on a page per page basis when you want to consolidate duplicate URLs.

```js
canonical = 'https://www.canonical.ie/';
```

#### Alternate

This link relation is used to indicate a relation between a desktop and a mobile website to search engines.

Example:

```jsx
mobileAlternate={{
  media: 'only screen and (max-width: 640px)',
  href: 'https://m.canonical.ie',
}}
```

```jsx
languageAlternate={{
  hrefLang: 'de-AT',
  href: 'https://www.canonical.ie/de',
}}
```

#### Additional Meta Tags

This allows you to add any other meta tags that are not covered in the `config`.

`content` is required. Then either `name` or `property`. (Only one on each)

Example:

```js
additionalMetaTags={[{
  property: 'dc:creator',
  content: 'Jane Doe'
}, {
  name: 'application-name',
  content: 'NextSeo'
}]}
```

Invalid Examples:

These are invalid as they contain `property` and `name` on the same entry.

```js
additionalMetaTags={[{
  property: 'dc:creator',
  name: 'dc:creator',
  content: 'Jane Doe'
}, {
  property: 'application-name',
  name: 'application-name',
  content: 'NextSeo'
}]}
```

One thing to note on this is that it currently only supports unique tags.
This means it will only render one tag per unique `name` / `property`. The last one defined will be rendered.

Example:

If you pass:

```js
additionalMetaTags={[{
  property: 'dc:creator',
  content: 'John Doe'
}, {
  property: 'dc:creator',
  content: 'Jane Doe'
}]}
```

it will result in this being rendered:

```html
<meta property="dc:creator" content="Jane Doe" />,
```

## Open Graph

For the full specification please check out http://ogp.me/

Next SEO currently supports:

- [basic](#basic)
- [video](#video)
- [article](#article)
- [book](#book)
- [profile](#profile)

### Open Graph Examples

#### Basic

```jsx
import React from 'react';
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      openGraph={{
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

#### Video

Full info on [http://ogp.me/](http://ogp.me/#type_video)

```jsx
import React from 'react';
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      title="Video Page Title"
      description="Description of video page"
      openGraph={{
        title: 'Open Graph Video Title',
        description: 'Description of open graph video',
        url: 'https://www.example.com/videos/video-title',
        type: 'video.movie',
        video: {
          // Multiple Open Graph actors is only available in version `7.0.2-canary.35`+ of next
          actors: [
            {
              profile: 'https://www.example.com/actors/@firstnameA-lastnameA',
              role: 'Protagonist',
            },
            {
              profile: 'https://www.example.com/actors/@firstnameB-lastnameB',
              role: 'Antagonist',
            },
          ],
          // Multiple Open Graph directors is only available in version `7.0.2-canary.35`+ of next
          directors: [
            'https://www.example.com/directors/@firstnameA-lastnameA',
            'https://www.example.com/directors/@firstnameB-lastnameB',
          ],
          // Multiple Open Graph writers is only available in version `7.0.2-canary.35`+ of next
          writers: [
            'https://www.example.com/writers/@firstnameA-lastnameA',
            'https://www.example.com/writers/@firstnameB-lastnameB',
          ],
          duration: 680000,
          releaseDate: '2022-12-21T22:04:11Z',
          // Multiple Open Graph tags is only available in version `7.0.2-canary.35`+ of next
          tags: ['Tag A', 'Tag B', 'Tag C'],
        },
        site_name: 'SiteName',
      }}
    />
    <h1>Video Page SEO</h1>
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
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      openGraph={{
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
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      openGraph={{
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
import { NextSeo } from 'next-seo';

export default () => (
  <>
    <NextSeo
      openGraph={{
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

- [Article](#article-1)
- [Breadcrumb](#breadcrumb)
- [Blog](#blog)
- [Course](#course)
- [Corporate Contact](#corporate-contact)
- [FAQ Page](#faq-page)
- [Local Business](#local-business)
- [Product](#product)
- [Social Profile](#social-profile)
- [News Article](#news-article)

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

### Corporate Contact

```jsx
import React from 'react';
import { CorporateContactJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Corporate Contact JSON-LD</h1>
    <CorporateContactJsonLd
      url="http://www.your-company-site.com"
      logo="http://www.example.com/logo.png"
      contactPoint={[
        {
          telephone: '+1-401-555-1212',
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: ['English', 'Spanish', 'French'],
        },
        {
          telephone: '+1-877-746-0909',
          contactType: 'customer service',
          contactOption: 'TollFree',
          availableLanguage: 'English',
        },
        {
          telephone: '+1-877-453-1304',
          contactType: 'technical support',
          contactOption: 'TollFree',
          areaServed: ['US', 'CA'],
          availableLanguage: ['English', 'French'],
        },
      ]}
    />
  </>
);
```

**Required properties**

| Property                   | Info                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `url`                      | Url to the home page of the company's official site.                                            |
| `contactPoint`             |                                                                                                 |
| `contactPoint.telephone`   | An internationalized version of the phone number, starting with the "+" symbol and country code |
| `contactPoint.contactType` | Description of the purpose of the phone number i.e. `Technical Support`.                        |

**Recommended ContactPoint properties**

| Property                         | Info                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `contactPoint.areaServed`        | `String` or `Array` of geographical regions served by the business. Example `"US"` or `["US", "CA", "MX"]` |
| `contactPoint.availableLanguage` | Details about the language spoken. Example `"English"` or `["English", "French"]`                          |
| `gecontactPointo.contactOption`  | Details about the phone number. Example `"TollFree"`                                                       |

### FAQ Page

```jsx
import React from 'react';
import { FAQPageJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>FAQ Page JSON-LD</h1>
    <FAQPageJsonLd
      mainEntity={[
        {
          questionName: 'How long is the delivery time?',
          acceptedAnswerText: '3-5 business days.',
        },
        {
          questionName: 'Where can I find information about product recalls?',
          acceptedAnswerText: 'Read more on under information.',
        },
      ]}
    />
  </>
);
```

**Required properties**

| Property                        | Info                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `mainEntity`                    |                                                                               |
| `mainEntity.questionName`       | The full text of the question. For example, "How long is the delivery time?". |
| `mainENtity.acceptedAnswerText` | The full answer to the question.                                              |

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
        url: 'https://www.example.com/executive-anvil',
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

### News Article

```jsx
import React from 'react';
import { NewsArticleJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>News Article JSON-LD</h1>
    <NewsArticleJsonLd
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      section="politic"
      keywords="prayuth,taksin"
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
      body="This is all text for this news article"
    />
  </>
);
```

[Google Docs for Social Profile](https://developers.google.com/search/docs/data-types/social-profile)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.garymeehan.ie/"><img src="https://avatars1.githubusercontent.com/u/13333582?v=4" width="100px;" alt=""/><br /><sub><b>Gary Meehan</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=garmeeh" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=garmeeh" title="Documentation">📖</a> <a href="#example-garmeeh" title="Examples">💡</a> <a href="https://github.com/garmeeh/next-seo/commits?author=garmeeh" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.jeromefitzgerald.com/"><img src="https://avatars3.githubusercontent.com/u/3099369?v=4" width="100px;" alt=""/><br /><sub><b>Jerome Fitzgerald</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=JeromeFitz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/erickeno"><img src="https://avatars0.githubusercontent.com/u/3820632?v=4" width="100px;" alt=""/><br /><sub><b>erick B</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=erickeno" title="Code">💻</a></td>
    <td align="center"><a href="https://www.erikcondie.com"><img src="https://avatars2.githubusercontent.com/u/15269328?v=4" width="100px;" alt=""/><br /><sub><b>Erik Condie</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=econdie" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=econdie" title="Tests">⚠️</a> <a href="#example-econdie" title="Examples">💡</a> <a href="#ideas-econdie" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://timothyreynolds.co.uk"><img src="https://avatars1.githubusercontent.com/u/168870?v=4" width="100px;" alt=""/><br /><sub><b>Tim Reynolds</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=timReynolds" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=timReynolds" title="Tests">⚠️</a> <a href="#example-timReynolds" title="Examples">💡</a> <a href="https://github.com/garmeeh/next-seo/commits?author=timReynolds" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Ktchan825"><img src="https://avatars3.githubusercontent.com/u/20606631?v=4" width="100px;" alt=""/><br /><sub><b>Ktchan825</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=Ktchan825" title="Tests">⚠️</a> <a href="https://github.com/garmeeh/next-seo/commits?author=Ktchan825" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ctxquentin"><img src="https://avatars1.githubusercontent.com/u/36331776?v=4" width="100px;" alt=""/><br /><sub><b>ctxquentin</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=ctxquentin" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=ctxquentin" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=ctxquentin" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/bolonio"><img src="https://avatars0.githubusercontent.com/u/1288407?v=4" width="100px;" alt=""/><br /><sub><b>Adrián Bolonio</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=bolonio" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=bolonio" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=bolonio" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://erikhofer.de"><img src="https://avatars2.githubusercontent.com/u/17194301?v=4" width="100px;" alt=""/><br /><sub><b>Erik Hofer</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=erikhofer" title="Documentation">📖</a></td>
    <td align="center"><a href="https://ermakov.io"><img src="https://avatars0.githubusercontent.com/u/301917?v=4" width="100px;" alt=""/><br /><sub><b>Dmitry Ermakov</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=zetoke" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/duckranger"><img src="https://avatars0.githubusercontent.com/u/2087890?v=4" width="100px;" alt=""/><br /><sub><b>Nimo Naamani</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=duckranger" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/calvinvoo2"><img src="https://avatars2.githubusercontent.com/u/12223423?v=4" width="100px;" alt=""/><br /><sub><b>Calvin Ng Tjioe</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=calvinvoo2" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/petertulala"><img src="https://avatars1.githubusercontent.com/u/613623?v=4" width="100px;" alt=""/><br /><sub><b>Peter Tulala</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=petertulala" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=petertulala" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/nik-john"><img src="https://avatars2.githubusercontent.com/u/1117182?v=4" width="100px;" alt=""/><br /><sub><b>nikjohn</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=nik-john" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=nik-john" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=nik-john" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/0x54321"><img src="https://avatars0.githubusercontent.com/u/34850754?v=4" width="100px;" alt=""/><br /><sub><b>0x54321</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=0x54321" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=0x54321" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=0x54321" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/nateetorn"><img src="https://avatars0.githubusercontent.com/u/365585?v=4" width="100px;" alt=""/><br /><sub><b>Nateetorn L.</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=nateetorn" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=nateetorn" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=nateetorn" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Myoxocephalus"><img src="https://avatars0.githubusercontent.com/u/2316544?v=4" width="100px;" alt=""/><br /><sub><b>Myoxocephalus</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=Myoxocephalus" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=Myoxocephalus" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=Myoxocephalus" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
