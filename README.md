# Next SEO

[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)
![npm](https://img.shields.io/npm/dw/next-seo?style=flat-square)

Next SEO is a plugin that makes managing your SEO easier in Next.js projects.

Pull requests are very welcome. Also make sure to check out the issues for feature requests if you are
looking for inspiration on what to add.

**Feel like supporting this free plugin?**

It takes a lot of time to maintain an open source project so any small contribution is greatly appreciated.

**Web3**: [next-seo.wallet](https://unstoppabledomains.com/d/next-seo.wallet) (ERC20 & SOL)

Coffee fuels coding ☕️

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
    - [Default Title](#default-title)
    - [No Index](#no-index)
    - [dangerouslySetAllPagesToNoIndex](#dangerouslysetallpagestonoindex)
    - [No Follow](#no-follow)
    - [dangerouslySetAllPagesToNoFollow](#dangerouslysetallpagestonofollow)
    - [robotsProps](#robotsprops)
    - [Twitter](#twitter)
    - [facebook](#facebook)
    - [Canonical URL](#canonical-url)
    - [Alternate](#alternate)
    - [Additional Meta Tags](#additional-meta-tags)
    - [Additional Link Tags](#additional-link-tags)
- [Open Graph](#open-graph)
  - [Open Graph Examples](#open-graph-examples)
    - [Basic](#basic)
    - [Video](#video)
    - [Article](#article)
    - [Book](#book)
    - [Profile](#profile)
- [JSON-LD](#json-ld)
  
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

`NextSeo` works by including it on pages where you would like SEO attributes to be added. Once included on the page you pass it a configuration object with the page's SEO properties. This can be dynamically generated at a page level or in some cases your API may return an SEO object.

### Setup

First, install it:

```bash
npm install next-seo
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
            type: 'image/jpeg',
          },
          {
            url: 'https://www.example.ie/og-image-02.jpg',
            width: 900,
            height: 800,
            alt: 'Og Image Alt Second',
            type: 'image/jpeg',
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

Props `cardType`, `site`, `handle` are equivalent to `twitter:card`, `twitter:site`, `twitter:creator`. Documentation can be founded [here](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary).

Twitter will read the `og:title`, `og:image` and `og:description` tags for their card. `next-seo` omits `twitter:title`, `twitter:image` and `twitter:description` to avoid duplication.

Some tools may report this an error. See [Issue #14](https://github.com/garmeeh/next-seo/issues/14)

### Default SEO Configuration

`NextSeo` enables you to set some default SEO properties that will appear on all pages without needing to include anything on them. You can also override these on a page by page basis if needed.

To achieve this, you will need to create a custom `<App>`. In your pages directory create a new file, `_app.js`. See the Next.js docs [here](https://nextjs.org/docs/advanced-features/custom-app) for more info on a custom `<App>`.

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
| `defaultTitle`                     | string                  | If no title is set on a page, this string will be used instead of an empty `titleTemplate` [More Info](#default-title)                                                               |
| `noindex`                          | boolean (default false) | Sets whether page should be indexed or not [More Info](#no-index)                                                                                                                    |
| `nofollow`                         | boolean (default false) | Sets whether page should be followed or not [More Info](#no-follow)                                                                                                                  |
| `robotsProps`                      | Object                  | Set the more meta information for the `X-Robots-Tag` [More Info](#robotsprops)                                                                                                       |
| `description`                      | string                  | Set the page meta description                                                                                                                                                        |
| `canonical`                        | string                  | Set the page canonical url                                                                                                                                                           |
| `mobileAlternate.media`            | string                  | Set what screen size the mobile website should be served from                                                                                                                        |
| `mobileAlternate.href`             | string                  | Set the mobile page alternate url                                                                                                                                                    |
| `languageAlternates`               | array                   | Set the language of the alternate urls. Expects array of objects with the shape: `{ hrefLang: string, href: string }`                                                                |
| `additionalMetaTags`               | array                   | Allows you to add a meta tag that is not documented here. [More Info](#additional-meta-tags)                                                                                         |
| `additionalLinkTags`               | array                   | Allows you to add a link tag that is not documented here. [More Info](#additional-link-tags)                                                                                         |
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

#### Default Title

```js
title = undefined;
titleTemplate = 'Next SEO | %s';
defaultTitle = 'Next SEO';
// outputs: Next SEO
```

#### No Index

Setting this to `true` will set `noindex,follow` (to set `nofollow`, please refer to [`nofollow`](#noFollow)). This works on a page by page basis. This property works in tandem with the `nofollow` property and together they populate the `robots` meta tag.

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
*/
```

#### dangerouslySetAllPagesToNoIndex

It has the prefix of `dangerously` because it will `noindex` all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to `noindex` **EVERY** page. You can still override this at a page level if you have a use case to `index` a page. This can be done by setting `noindex: false`.

The only way to unset this, is by removing the prop from the `DefaultSeo` in your custom `<App>`.

#### No Follow

Setting this to `true` will set `index,nofollow` (to set `noindex`, please refer to [`noindex`](#noIndex)). This works on a page by page basis. This property works in tandem with the `noindex` property and together they populate the `robots` meta tag.

**Note:** Unlike for the other properties, setting `noindex` and [`nofollow`](#noFollow) by default does not work as expected. This is because Next SEO has a default of `index,follow`, since `next-seo` is an SEO plugin after all. If you want to globally allow these properties, see [dangerouslySetAllPagesToNoIndex](#dangerouslySetAllPagesToNoIndex) and [dangerouslySetAllPagesToNoFollow](#dangerouslySetAllPagesToNoFollow).

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
*/
```

#### dangerouslySetAllPagesToNoFollow

It has the prefix of `dangerously` because it will `nofollow` all pages. As this is an SEO plugin, that is kinda dangerous action. It is **not** bad to use this, just please be sure you want to `nofollow` **EVERY** page. You can still override this at a page level if you have a use case to `follow` a page. This can be done by setting `nofollow: false`.

The only way to unset this, is by removing the prop from the `DefaultSeo` in your custom `<App>`.

| `noindex` | `nofollow` | `meta` content of `robots` |
| --------- | ---------- | -------------------------- |
| --        | --         | `index,follow` (default)   |
| false     | false      | `index,follow`             |
| true      | --         | `noindex,follow`           |
| true      | false      | `noindex,follow`           |
| --        | true       | `index,nofollow`           |
| false     | true       | `index,nofollow`           |
| true      | true       | `noindex,nofollow`         |

#### robotsProps

In addition to `index, follow` the `robots` meta tag accepts more properties to archive a more accurate crawling and serve better snippets for SEO bots that crawl your page.

Example:

```jsx
import { NextSeo } from 'next-seo';

const Page = () => (
  <>
    <NextSeo
      robotsProps={{
        nosnippet: true,
        notranslate: true,
        noimageindex: true,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: 'none',
        maxVideoPreview: -1,
      }}
    />
    <p>Additional robots props in Next-SEO!!</p>
  </>
);

export default Page;

/*
<meta name="robots" content="index,follow,nosnippet,max-snippet:-1,max-image-preview:none,noarchive,noimageindex,max-video-preview:-1,notranslate">
*/
```

**Available properties**

| Property            | Type                      | Description                                                                                                                                                                                     |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noarchive`         | boolean                   | Do not show a [cached link](https://support.google.com/websearch/answer/1687222) in search results.                                                                                             |
| `nosnippet`         | boolean                   | Do not show a text snippet or video preview in the search results for this page.                                                                                                                |
| `max-snippet`       | number                    | Use a maximum of [number] characters as a textual snippet for this search result. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)               |
| `max-image-preview` | 'none','standard','large' | Set the maximum size of an image preview for this page in a search results.                                                                                                                     |
| `max-video-preview` | number                    | Use a maximum of [number] seconds as a video snippet for videos on this page in search results. [Read more](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives) |
| `notranslate`       | boolean                   | Do not offer translation of this page in search results.                                                                                                                                        |
| `noimageindex`      | boolean                   | Do not index images on this page.                                                                                                                                                               |
| `unavailable_after` | string                    | Do not show this page in search results after the specified date/time. The date/time must be specified in a widely adopted format including, but not limited to RFC 822, RFC 850, and ISO 8601. |

For more reference about the `X-Robots-Tag` visit [Google Search Central - Control Crawling and Indexing](https://developers.google.com/search/reference/robots_meta_tag?hl=en-GB#directives)

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

`content` is required. Then either `name`, `property` or `httpEquiv`. (Only one on each)

Example:

```js
additionalMetaTags={[{
  property: 'dc:creator',
  content: 'Jane Doe'
}, {
  name: 'application-name',
  content: 'NextSeo'
}, {
  httpEquiv: 'x-ua-compatible',
  content: 'IE=edge; chrome=1'
}]}
```

Invalid Examples:

These are invalid as they contain more than one of `name`, `property` and `httpEquiv` on the same entry.

```js
additionalMetaTags={[{
  property: 'dc:creator',
  name: 'dc:creator',
  content: 'Jane Doe'
}, {
  property: 'application-name',
  httpEquiv: 'application-name',
  content: 'NextSeo'
}]}
```

One thing to note on this is that it currently only supports unique tags.
This means it will only render one tag per unique `name` / `property` / `httpEquiv`. The last one defined will be rendered.

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

#### Additional Link Tags

This allows you to add any other link tags that are not covered in the `config`.

`rel` and `href` is required.

Example:

```js
additionalLinkTags={[
  {
    rel: 'icon',
    href: 'https://www.test.ie/favicon.ico',
  },
  {
    rel: 'apple-touch-icon',
    href: 'https://www.test.ie/touch-icon-ipad.jpg',
    sizes: '76x76'
  },
  {
    rel: 'manifest',
    href: '/manifest.json'
  },
  {
    rel: 'preload',
    href: 'https://www.test.ie/font/sample-font.woof2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  }
]}
```

it will result in this being rendered:

```html
<link rel="icon" href="https://www.test.ie/favicon.ico" />
<link
  rel="apple-touch-icon"
  href="https://www.test.ie/touch-icon-ipad.jpg"
  sizes="76x76"
/>
<link rel="manifest" href="/manifest.json" />
<link
  rel="preload"
  href="https://www.test.ie/font/sample-font.woof2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
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

Multiple images is available from next.js version `7.0.0-canary.0`

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

Multiple images is available from next.js version `7.0.0-canary.0`

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

Multiple images, authors, tags is available from next.js version `7.0.0-canary.0`

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

Multiple images, authors, tags is available from next.js version `7.0.0-canary.0`

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

Multiple images is available from next.js version `7.0.0-canary.0`

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

Check the [`JSON-LD` overview on a separate page](./docs/json-ld.md).

## Contributors

A massive thank you to [everyone who contributes](https://github.com/garmeeh/next-seo/graphs/contributors) to this project 👏
