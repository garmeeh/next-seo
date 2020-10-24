import Head from 'next/head';
import React, { Component } from 'react';

import { DefaultSeoProps } from '../types';
import buildTags from './buildTags';

export default class extends Component<DefaultSeoProps, {}> {
  render() {
    const {
      title,
      titleTemplate,
      dangerouslySetAllPagesToNoIndex = false,
      dangerouslySetAllPagesToNoFollow = false,
      description,
      canonical,
      facebook,
      openGraph,
      additionalMetaTags,
      twitter,
      defaultOpenGraphImageWidth,
      defaultOpenGraphImageHeight,
      defaultOpenGraphVideoWidth,
      defaultOpenGraphVideoHeight,
      mobileAlternate,
      languageAlternates,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          titleTemplate,
          dangerouslySetAllPagesToNoIndex,
          dangerouslySetAllPagesToNoFollow,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          defaultOpenGraphImageWidth,
          defaultOpenGraphImageHeight,
          defaultOpenGraphVideoWidth,
          defaultOpenGraphVideoHeight,
          mobileAlternate,
          languageAlternates,
        })}
      </Head>
    );
  }
}
