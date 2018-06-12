# Next SEO

Small plug in to help manage SEO for Next.js applications. The plug in is currently in BETA so please bare this in mind if adopting for a project where SEO is critical. The plugin will be actively developed and extended.

## Usage

### Install

```bash
yarn add next-seo
# or
npm install next-seo --save
```

### Usage

Simple example:

```javascript
import NextSeo from 'next-seo';

<NextSeo
  config={{
    title: 'Next.js Seo Plugin',
    description: 'SEO made easy for Next.js projects'
  }}
/>;
```

### Example Full Configuration File

```javascript
export default {
  title: 'Next.js SEO Plugin',
  description: 'SEO made easy for Next.js projects',
  lang: 'en',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.garymeehan.ie',
    title: 'Next.js Seo',
    description: 'SEO made easy for Next.js projects',
    image:
      'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
    site_name: 'GaryMeehan.ie',
    imageWidth: 1200,
    imageHeight: 1200
  },
  twitter: {
    handle: '@garmeeh',
    cardType: 'summary_large_image'
  }
};
```

You can then use this as the default SEO settings and pass it directly to `NextSeo`. I would recommend adding this to a custom `_app.js` which could look something like this assuming the config file lives at the root of your project and is named `seo.config.js`

```javascript
import App, { Container } from 'next/app';
import React from 'react';
import NextSeo from 'next-seo';
import defaultSeo from '../seo.config.js';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
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
        <NextSeo config={defaultSeo} />
        <Component {...pageProps} />
      </Container>
    );
  }
}
```
