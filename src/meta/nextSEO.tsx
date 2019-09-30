import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';
import { NextSeoProps } from '../types';

export default class extends Component<NextSeoProps, {}> {
  render() {
    const {
      title,
      noindex = false,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
      titleTemplate,
      mobileAlternate,
      languageAlternate,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          noindex,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          titleTemplate,
          mobileAlternate,
          languageAlternate,
        })}
      </Head>
    );
  }
}
