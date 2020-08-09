import App, { Container } from 'next/app';
import React from 'react';
import { DefaultSeo } from '../..';

import SEO from '../next-seo.config';

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Container>
        <DefaultSeo
          {...SEO}
          disableGooglebot={router.pathname === '/disableGooglebot'}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}
