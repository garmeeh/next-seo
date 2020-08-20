import App, { Container } from 'next/app';
import React from 'react';
import { DefaultSeo } from '../..';

import SEO from '../next-seo.config';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { defaultSeoProps, ...componentProps } = pageProps;

    return (
      <Container>
        <DefaultSeo {...SEO} {...defaultSeoProps} />
        <Component {...componentProps} />
      </Container>
    );
  }
}
