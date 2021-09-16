import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';

import { DefaultSeoProps } from '../types';
export default class DefaultSeo extends Component<DefaultSeoProps, {}> {
  render() {
    const {
      title,
      titleTemplate,
      defaultTitle,
      dangerouslyDisableGooglebot = false,
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
      additionalLinkTags,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          titleTemplate,
          defaultTitle,
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
          additionalLinkTags,
          dangerouslyDisableGooglebot,
        })}
      </Head>
    );
  }
}
