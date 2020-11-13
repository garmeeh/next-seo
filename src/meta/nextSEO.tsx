import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';
import { NextSeoProps } from '../types';

export default class extends Component<NextSeoProps, {}> {
  render() {
    const {
      title,
      noindex = false,
      nofollow,
      nosnippet,
      noarchive,
      notranslate,
      noimageindex,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,
      unavailableAfter,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
      titleTemplate,
      mobileAlternate,
      languageAlternates,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          noindex,
          nofollow,
          nosnippet,
          noarchive,
          notranslate,
          noimageindex,
          maxSnippet,
          maxImagePreview,
          maxVideoPreview,
          unavailableAfter,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          titleTemplate,
          mobileAlternate,
          languageAlternates,
        })}
      </Head>
    );
  }
}
