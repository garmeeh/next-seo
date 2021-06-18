import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';
import { NextSeoProps } from '../types';

export default class NextSeo extends Component<NextSeoProps, {}> {
  render() {
    const {
      title,
      noindex = false,
      nofollow,
      robotsProps,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
      titleTemplate,
      mobileAlternate,
      languageAlternates,
      additionalLinkTags,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          noindex,
          nofollow,
          robotsProps,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          titleTemplate,
          mobileAlternate,
          languageAlternates,
          additionalLinkTags,
        })}
      </Head>
    );
  }
}
