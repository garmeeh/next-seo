# Next SEO

[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)
![npm](https://img.shields.io/npm/dw/next-seo?style=flat-square)

Next SEO is a plugin that makes managing your SEO easier in Next.js projects.

Pull requests are very welcome. Also make sure to check out the issues for feature requests if you are
looking for inspiration on what to add.

**Feel like supporting this free plugin?**

<a href="https://www.buymeacoffee.com/garmeeh" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

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
  - [Handling multiple instances...](#handling-multiple-instances)
  - [Article](#article-1)
  - [Breadcrumb](#breadcrumb)
  - [Blog](#blog)
  - [Recipe](#recipe)
  - [Course](#course)
  - [Dataset](#dataset)
  - [Corporate Contact](#corporate-contact)
  - [FAQ Page](#faq-page)
  - [Job Posting](#job-posting)
  - [Local Business](#local-business)
  - [Logo](#logo)
  - [Product](#product)
  - [Social Profile](#social-profile)
  - [News Article](#news-article)
  - [Video](#video-1)
  - [Event](#event)
  - [Carousel](#carousel)
    - [Default (Summary List)](#default-summary-list)
    - [Course](#course-1)
    - [Movie](#movie)
    - [Recipe](#recipe-1)
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
import { NextSeo } from 'next-seo';

const Page = () => (
  <>
    <NextSeo
      title="Simple Usage Example"
      description="A short description goes here."
    />
    <p>Simple Usage</p>
  </>
);

export default Page;
```

But `NextSeo` gives you many more options that you can add. See below for a typical example of a page.

**Typical page example:**

```jsx
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { DefaultSeo } from 'next-seo';

// import your default seo configuration
import SEO from '../next-seo.config';

export default class MyApp extends App {
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

To work properly, `DefaultSeo` should be placed above (before) `Component` due to behavior of Next.js internals.

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
| `languageAlternates`               | array                   | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }`                                                                |
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
| `openGraph.profile.username`       | string                  | Person's username.                                                                                                                                                                   |
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
import { NextSeo } from 'next-seo';

const Page = () => (
  <>
    <NextSeo noindex={true} />
    <p>This page is no indexed</p>
  </>
);

export default Page;

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
import { NextSeo } from 'next-seo';

const Page = () => (
  <>
    <NextSeo nofollow={true} />
    <p>This page is not followed</p>
  </>
);

export default Page;

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
  appId: '1234567890',
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
languageAlternates={[{
  hrefLang: 'de-AT',
  href: 'https://www.canonical.ie/de',
}]}
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

For the full specification please check out <http://ogp.me/>

Next SEO currently supports:

- [basic](#basic)
- [video](#video)
- [article](#article)
- [book](#book)
- [profile](#profile)

### Open Graph Examples

#### Basic

```jsx
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { NextSeo } from 'next-seo';

const Page = () => (
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

export default Page;
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
- [Recipe](#recipe)
- [Course](#course)
- [Dataset](#dataset)
- [Corporate Contact](#corporate-contact)
- [FAQ Page](#faq-page)
- [Job Posting](#job-posting)
- [Local Business](#local-business)
- [Product](#product)
- [Social Profile](#social-profile)
- [News Article](#news-article)

Pull request very welcome to add any from the list [found on here](https://developers.google.com/search/docs/data-types/article)

#### Handling multiple instances...

If your page requires multiple instances of a given JSON-LD component, you can specify unique `keyOverride` properties, and `next-seo` will handle the rest.

This comes in handy for blog rolls, search results, and overview pages.

Please fully research when you should and shouldn't add multiple instances of JSON-LD.

```jsx
<ExampleJsonLd keyOverride="my-new-key" />
```

### Article

```jsx
import { ArticleJsonLd } from 'next-seo';

const Page = () => (
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
      authorName={['Jane Blogs', 'Mary Stone']}
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
    />
  </>
);

export default Page;
```

### Breadcrumb

```jsx
import { BreadcrumbJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { BlogJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
```

### Recipe

```jsx
import { RecipeJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Recipe JSON-LD</h1>
    <RecipeJsonLd
      name="Party Coffee Cake"
      description="This coffee cake is awesome and perfect for parties."
      datePublished="2018-03-10"
      authorName={['Jane Blogs', 'Mary Stone']}
      prepTime="PT20M"
      cookTime="PT30M"
      totalTime="PT50M"
      keywords="cake for a party, coffee"
      yields="10"
      category="Dessert"
      cuisine="American"
      calories={270}
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      ingredients={[
        '2 cups of flour',
        '3/4 cup white sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '1/2 cup butter',
        '2 eggs',
        '3/4 cup milk',
      ]}
      instructions={[
        {
          name: 'Preheat',
          text:
            'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
          url: 'https://example.com/party-coffee-cake#step1',
          image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
        },
      ]}
      aggregateRating={{
        ratingValue: '5',
        ratingCount: '18',
      }}
      video={{
        name: 'How to make a Party Coffee Cake',
        description: 'This is how you make a Party Coffee Cake.',
        contentUrl: 'http://www.example.com/video123.mp4',
        embedUrl: 'http://www.example.com/videoplayer?video=123',
        uploadDate: '2018-02-05T08:00:00+08:00',
        duration: 'PT1M33S',
        thumbnailUrls: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        expires: '2019-02-05T08:00:00+08:00',
        hasPart: {
          '@type': 'Clip',
          name: 'Preheat oven',
          startOffset: 30,
          url: 'http://www.example.com/example?t=30',
        },
        watchCount: 2347,
        publication: {
          '@type': 'BroadcastEvent',
          isLiveBroadcast: true,
          startDate: '2020-10-24T14:00:00+00:00',
          endDate: '2020-10-24T14:37:14+00:00',
        },
        regionsAllowed: ['IT', 'NL'],
      }}
    />
  </>
);

export default Page;
```

**Required properties**

| Property            | Info                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `name`              | The name of the recipe                                              |
| `description`       | A description of the recipe                                         |
| `authorName`        | The name of the recipe author. Can be a string or array of strings. |
| `ingredients`       | A list of ingredient strings                                        |
| `instructions`      | -                                                                   |
| `instructions.name` | The name of the instruction step.                                   |
| `instructions.text` | The directions of the instruction step.                             |

### Course

```jsx
import { CourseJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
```

**Required properties**

| Property       | Info                                                         |
| -------------- | ------------------------------------------------------------ |
| `courseName`   | The title of the course.                                     |
| `description`  | A description of the course. Display limit of 60 characters. |
| `providerName` | The course provider name.                                    |

**Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

### Dataset

```jsx
import { DatasetJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Dataset JSON-LD</h1>
    <DatasetJsonLd
      description="The description needs to be at least 50 characters long"
      name="name of the dataset"
      license="https//www.example.com"
    />
  </>
);

export default Page;
```

**Required properties**

| Property      | Info                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| `description` | A short summary describing a dataset. Needs to be between 50 and 5000 characters. |
| `name`        | A license under which the dataset is distributed.                                 |

**Recommended properties**

| Property  | Info                            |
| --------- | ------------------------------- |
| `license` | The url to the course provider. |

### Corporate Contact

```jsx
import { CorporateContactJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { FAQPageJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
```

**Required properties**

| Property                        | Info                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `mainEntity`                    |                                                                               |
| `mainEntity.questionName`       | The full text of the question. For example, "How long is the delivery time?". |
| `mainEntity.acceptedAnswerText` | The full answer to the question.                                              |

### Job Posting

```jsx
import { JobPostingJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Job Posting JSON-LD</h1>
    <JobPostingJsonLd
      datePosted="2020-01-06T03:37:40Z"
      description="Company is looking for a software developer...."
      hiringOrganization={{
        name: 'company name',
        sameAs: 'www.company-website-url.dev',
      }}
      jobLocation={{
        streetAddress: '17 street address',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        postalCode: '75001',
        addressCountry: 'France',
      }}
      title="Job Title"
      baseSalary={{
        currency: 'EUR',
        value: 40,
        unitText: 'HOUR',
      }}
      employmentType="FULL_TIME"
      jobLocationType="TELECOMMUTE"
      validThrough="2020-01-06"
      applicantLocationRequirements="FR"
    />
  </>
);

export default Page;
```

**Required properties**

| Property                      | Info                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `datePosted`                  | The original date that employer posted the job in ISO 8601 format                                      |
| `description`                 | The full description of the job in HTML format                                                         |
| `hiringOrganization`          |                                                                                                        |
| `hiringOrganization.name`     | Name of the company offering the job position                                                          |
| `hiringOrganization.sameAs`   | URL of a reference Web page                                                                            |
| `jobLocation`                 |                                                                                                        |
| `jobLocation.streetAddress`   | The street address. For example, 1600 Amphitheatre Pkwy                                                |
| `jobLocation.addressLocality` | The locality. For example, Mountain View.                                                              |
| `jobLocation.addressRegion`   | The region. For example, CA.                                                                           |
| `jobLocation.postalCode`      | The postal code. For example, 94043                                                                    |
| `jobLocation.addressCountry`  | The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.    |
| `title`                       | The title of the job (not the title of the posting)                                                    |
| `validThrough`                | The date when the job posting will expire in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) |

**Supported properties**

| Property                        | Info                                                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicantLocationRequirements` | The geographic location(s) in which employees may be located for to be eligible for the remote job                                                  |
| `baseSalary`                    |                                                                                                                                                     |
| `baseSalary.currency`           | The currency in which the monetary amount is expressed                                                                                              |
| `baseSalary.value`              | The value of the quantitative value                                                                                                                 |
| `baseSalary.unitText`           | A string indicating the unit of measurement [Base salary guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)    |
| `employmentType`                | Type of employment [Employement type guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)                        |  |
| `jobLocationType`               | A description of the job location [Job Location type guideline](https://developers.google.com/search/docs/data-types/job-posting#job-location-type) |
| `hiringOrganization.logo`       | Logos on third-party job sites [Hiring Organization guideline](https://developers.google.com/search/docs/data-types/job-posting#hiring)             |

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
  openingHours={[
    {
      opens: '08:00',
      closes: '23:59',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
    {
      opens: '14:00',
      closes: '20:00',
      dayOfWeek: 'Sunday',
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
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

| Property                    | Info                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`               | Description of the business location                                                                                                                 |
| `geo`                       | Geographic coordinates of the business.                                                                                                              |
| `geo.latitude`              | The latitude of the business location                                                                                                                |
| `geo.longitude`             | The longitude of the business location                                                                                                               |
| `rating`                    | The average rating of business based on multiple ratings or reviews.                                                                                 |
| `rating.ratingValue`        | The rating for the content.                                                                                                                          |
| `rating.ratingCount`        | The count of total number of ratings.                                                                                                                |
| `priceRange`                | The relative price range of the business.                                                                                                            |
| `servesCuisine`             | The type of cuisine the restaurant serves.                                                                                                           |
| `images`                    | An image or images of the business. Required for valid markup depending on the type                                                                  |
| `telephone`                 | A business phone number meant to be the primary contact method for customers.                                                                        |
| `url`                       | The fully-qualified URL of the specific business location.                                                                                           |
| `sameAs`                    | An array of URLs that represent this business                                                                                                        |
| `openingHours`              | Opening hour specification of business. You can provide this as a single object, or an array of objects with the properties below.                   |
| `openingHours.opens`        | The opening hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.closes`       | The closing hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.dayOfWeek`    | The day of the week for which these opening hours are valid. Can be a string or array of strings. Refer to [DayOfWeek](https://schema.org/DayOfWeek) |
| `openingHours.validFrom`    | The date when the item becomes valid.                                                                                                                |
| `openingHours.validThrough` | The date after when the item is not valid.                                                                                                           |

**NOTE:**

Images are recommended for most of the types that you can use for `LocalBusiness`, if in doubt you should add an image. You can check your generated JSON over at Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

### Logo

```jsx
import { LogoJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Logo JSON-LD</h1>
    <LogoJsonLd
      logo="http://www.your-site.com/images/logo.jpg"
      url="http://www.your-site.com"
    />
  </>
);

export default Page;
```

| Property | Info                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`    | The URL of the website associated with the logo. [Logo guidelines](https://developers.google.com/search/docs/data-types/logo#definitions) |
| `logo`   | URL of a logo that is representative of the organization.                                                                                 |

### Product

```jsx
import { ProductJsonLd } from 'next-seo';

const Page = () => (
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
          author: {
            type: 'Person',
            name: 'Jim',
          },
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody:
            'This is my favorite product yet! Thanks Nate for the example products and reviews.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
          },
          publisher: {
            type: 'Organization',
            name: 'TwoVit',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '4.4',
        reviewCount: '89',
      }}
      offers={[
        {
          price: '119.99',
          priceCurrency: 'USD',
          priceValidUntil: '2020-11-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.com/executive-anvil',
          seller: {
            name: 'Executive Objects',
          },
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.ca/executive-anvil',
          seller: {
            name: 'Executive Objects',
          },
        },
      ]}
      mpn="925872"
    />
  </>
);

export default Page;
```

Also available: `sku`, `gtin8`, `gtin13`, `gtin14`.

Valid values for `offers.itemCondition`:

- <https://schema.org/DamagedCondition>
- <https://schema.org/NewCondition>
- <https://schema.org/RefurbishedCondition>
- <https://schema.org/UsedCondition>

Valid values fro `offers.availability`:

- <https://schema.org/Discontinued>
- <https://schema.org/InStock>
- <https://schema.org/InStoreOnly>
- <https://schema.org/LimitedAvailability>
- <https://schema.org/OnlineOnly>
- <https://schema.org/OutOfStock>
- <https://schema.org/PreOrder>
- <https://schema.org/PreSale>
- <https://schema.org/SoldOut>

The property `aggregateOffer` is also available:
(It is ignored if `offers` is set)

**Required properties**

| Property        | Info                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `lowPrice`      | The lowest price of all offers available. Use a floating point number.            |
| `priceCurrency` | The currency used to describe the product price, in three-letter ISO 4217 format. |

**Recommended properties**

| Property     | Info                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `highPrice`  | The highest price of all offers available. Use a floating point number. |
| `offerCount` | The number of offers for the product.                                   |

More info on the product data type can be found [here](https://developers.google.com/search/docs/data-types/product).

### Social Profile

```jsx
import { SocialProfileJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
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
import { NewsArticleJsonLd } from 'next-seo';

const Page = () => (
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

export default Page;
```

[Google Docs for Social Profile](https://developers.google.com/search/docs/data-types/social-profile)

### Video

```jsx
import { VideoJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Video JSON-LD</h1>
    <VideoJsonLd
      name="How to make a Party Coffee Cake"
      description="This is how you make a Party Coffee Cake."
      contentUrl="http://www.example.com/video123.mp4"
      embedUrl="http://www.example.com/videoplayer?video=123"
      uploadDate="2018-02-05T08:00:00+08:00"
      duration="PT1M33S"
      thumbnailUrls={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      expires="2019-02-05T08:00:00+08:00"
      hasPart={{
        name: 'Preheat oven',
        startOffset: 30,
        url: 'http://www.example.com/example?t=30',
      }}
      watchCount={2347}
      publication={{
        isLiveBroadcast: true,
        startDate: '2020-10-24T14:00:00+00:00',
        endDate: '2020-10-24T14:37:14+00:00',
      }}
      regionsAllowed={['IT', 'NL']}
    />
  </>
);

export default Page;
```

**Required properties**

| Property       | Info                                                        |
| -------------- | ----------------------------------------------------------- |
| `name`         | The title of the video.                                     |
| `description`  | The description of the video. HTML tags are ignored.        |
| `thumbnailUrl` | A URL pointing to the video thumbnail image file.           |
| `uploadDate`   | The date the video was first published, in ISO 8601 format. |

**Recommended properties**

| Property               | Info                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `contentUrl`           | A URL pointing to the actual video media file, in one of the supported encoding formats. |
| `duration`             | The duration of the video in ISO 8601 format                                             |
| `embedUrl`             | A URL pointing to a player for the specific video.                                       |
| `expires`              | If applicable, the date after which the video will no longer be available.               |
| `interactionStatistic` | The number of times the video has been watched.                                          |
| `publication`          | If your video is happening live and you want to be eligible for the LIVE badge.          |
| `regionsAllowed`       | The regions where the video is allowed.                                                  |

### Event

```jsx
import { EventJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Event JSON-LD</h1>
    <EventJsonLd
      name="My Event"
      startDate="2020-01-23T00:00:00.000Z"
      endDate="2020-01-24T00:00:00.000Z"
      location={{
        name: 'My Place',
        sameAs: 'https://example.com/my-place',
        address: {
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
      }}
      url="https://example.com/my-event"
      images={['https://example.com/photos/photo.jpg']}
      description="My event @ my place"
    />
  </>
);

export default Page;
```

**Required properties**

| Property    | Info                                               |
| ----------- | -------------------------------------------------- |
| `name`      | The name of the event                              |
| `startDate` | The start date time of the event in iso8601 format |
| `endDate`   | The end date time of the event in iso8601 format   |
| `location`  | Place type with a nested Address type              |

**Supported properties**

| Property          | Info                                  |
| ----------------- | ------------------------------------- |
| `description`     | Description of the event              |
| `location.sameAs` | Description of the event location     |
| `images`          | An image or images of the event.      |
| `url`             | The fully-qualified URL of the event. |

### Carousel

**Required properties of Carousel Component**

| Property | Info                                                               |
| -------- | ------------------------------------------------------------------ |
| `type`   | The type of carousel                                               |
| `data`   | The data in the form of an array for the item list in the carousel |

#### Default (Summary List)

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Default JSON-LD</h1>
    <CarouselJsonLd
      type="default"
      data={[
        { url: 'http://example.com/peanut-butter-cookies.html' },
        {
          url: 'http://example.com/triple-chocolate-chunk.html',
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property | Info                             |
| -------- | -------------------------------- |
| `url`    | URL of the item's detailed page. |

#### Course

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Course JSON-LD</h1>
    <CarouselJsonLd
      type="course"
      data={[
        {
          courseName: 'Course 1',
          description: 'Course 1 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-1.html',
        },
        {
          courseName: 'Course 2',
          description: 'Course 2 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-2.html',
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property       | Info                                                         |
| -------------- | ------------------------------------------------------------ |
| `courseName`   | The title of the course.                                     |
| `description`  | A description of the course. Display limit of 60 characters. |
| `providerName` | The course provider name.                                    |
| `url`          | URL of the item's detailed page .                            |

**Data Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

#### Movie

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Movie JSON-LD</h1>
    <CarouselJsonLd
      type="movie"
      data={[
        {
          name: 'Movie 1',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: {
            name: 'John Doe',
          },
          review: {
            author: { type: 'Person', name: 'Ronan Farrow' },
            reviewBody:
              'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
        {
          name: 'Movie 2',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: {
            name: 'Mary Doe',
          },
          review: {
            author: { type: 'Person', name: 'Ronan Farrow' },
            reviewBody:
              'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property | Info                                |
| -------- | ----------------------------------- |
| `name`   | Name of the movie.                  |
| `image`  | An image that represents the movie. |
| `url`    | URL of the item's detailed page.    |

**Data Recommended properties**

| Property          | Info                                   |
| ----------------- | -------------------------------------- |
| `director`        | The director of the movie.             |
| `dateCreated`     | The date the movie was released.       |
| `aggregateRating` | Aggregate Rating object for the movie. |
| `review`          | Review for the movie.                  |

#### Recipe

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Recipe JSON-LD</h1>
    <CarouselJsonLd
      type="recipe"
      data={[
        {
          name: 'Party Coffee Cake',
          url: 'http://example.com/recipe-1.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text:
                'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text:
                'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
        {
          name: 'Party Coffee Cake 2',
          url: 'http://example.com/recipe-2.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone 2',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text:
                'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text:
                'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property            | Info                                    |
| ------------------- | --------------------------------------- |
| `name`              | The name of the dish.                   |
| `description`       | A description of the recipe             |
| `authorName`        | The name of the recipe author           |
| `ingredients`       | A list of ingredient strings            |
| `instructions`      | -                                       |
| `instructions.name` | The name of the instruction step.       |
| `instructions.text` | The directions of the instruction step. |
| `url`               | URL of the item's detailed page.        |

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
    <td align="center"><a href="https://github.com/kenleytomlin"><img src="https://avatars3.githubusercontent.com/u/3004590?v=4" width="100px;" alt=""/><br /><sub><b>Kenley Tomlin</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=kenleytomlin" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=kenleytomlin" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=kenleytomlin" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twovit.com"><img src="https://avatars0.githubusercontent.com/u/20168220?v=4" width="100px;" alt=""/><br /><sub><b>Ryu Nishida</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=NishidaRyu416" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=NishidaRyu416" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=NishidaRyu416" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://ykzts.com/"><img src="https://avatars0.githubusercontent.com/u/12539?v=4" width="100px;" alt=""/><br /><sub><b>Yamagishi Kazutoshi</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=ykzts" title="Code">💻</a> <a href="#infra-ykzts" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://mgmcdermott.com"><img src="https://avatars3.githubusercontent.com/u/8161781?v=4" width="100px;" alt=""/><br /><sub><b>Michael McDermott</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=michaelgmcd" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=michaelgmcd" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://lukejones.co"><img src="https://avatars0.githubusercontent.com/u/6657011?v=4" width="100px;" alt=""/><br /><sub><b>Luke Jones</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=luke-j" title="Code">💻</a> <a href="#infra-luke-j" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/pueyo5"><img src="https://avatars1.githubusercontent.com/u/8959368?v=4" width="100px;" alt=""/><br /><sub><b>Albert Pueyo</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=pueyo5" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=pueyo5" title="Code">💻</a></td>
    <td align="center"><a href="http://Qrymy.com"><img src="https://avatars1.githubusercontent.com/u/26219456?v=4" width="100px;" alt=""/><br /><sub><b>Qrymy</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=Qrymy" title="Code">💻</a></td>
    <td align="center"><a href="https://www.yuuniworks.com/"><img src="https://avatars0.githubusercontent.com/u/10986861?v=4" width="100px;" alt=""/><br /><sub><b>Shota Tamura</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=junkboy0315" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kahoowkh"><img src="https://avatars3.githubusercontent.com/u/26565078?v=4" width="100px;" alt=""/><br /><sub><b>kahoowkh</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=kahoowkh" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=kahoowkh" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=kahoowkh" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/gtodd876"><img src="https://avatars1.githubusercontent.com/u/28220658?v=4" width="100px;" alt=""/><br /><sub><b>Todd Matthews</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=gtodd876" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=gtodd876" title="Code">💻</a></td>
    <td align="center"><a href="http://mohamedshadab.me"><img src="https://avatars1.githubusercontent.com/u/22408263?v=4" width="100px;" alt=""/><br /><sub><b>Mohamed Shadab</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=statebait" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=statebait" title="Documentation">📖</a> <a href="https://github.com/garmeeh/next-seo/commits?author=statebait" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://drewgoodwin.com"><img src="https://avatars1.githubusercontent.com/u/63794?v=4" width="100px;" alt=""/><br /><sub><b>Drew Goodwin</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=tacomanator" title="Documentation">📖</a></td>
    <td align="center"><a href="https://schlosser.io"><img src="https://avatars0.githubusercontent.com/u/2433509?v=4" width="100px;" alt=""/><br /><sub><b>Dan Schlosser</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=schlosser" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/matamatanot"><img src="https://avatars2.githubusercontent.com/u/39780486?v=4" width="100px;" alt=""/><br /><sub><b>matamatanot</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=matamatanot" title="Documentation">📖</a></td>
    <td align="center"><a href="http://kloc.io/"><img src="https://avatars2.githubusercontent.com/u/9046616?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Reinoso</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=danielr18" title="Code">💻</a></td>
    <td align="center"><a href="https://marcovalsecchi.it"><img src="https://avatars0.githubusercontent.com/u/1492995?v=4" width="100px;" alt=""/><br /><sub><b>Marco Valsecchi</b></sub></a><br /><a href="https://github.com/garmeeh/next-seo/commits?author=valse" title="Code">💻</a> <a href="https://github.com/garmeeh/next-seo/commits?author=valse" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
