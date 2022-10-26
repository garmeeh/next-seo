import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';
import { NextSeoProps } from '../types';

export default class NextSeo extends Component<NextSeoProps, {}> {
  render() {
    const {
      title,
      themeColor,
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
      defaultTitle,
      mobileAlternate,
      languageAlternates,
      additionalLinkTags,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          themeColor,
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
          defaultTitle,
          mobileAlternate,
          languageAlternates,
          additionalLinkTags,
        })}
      </Head>
    );
  }
}
