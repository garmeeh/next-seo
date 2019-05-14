import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';

import { MetaTag, OpenGraph, Twitter } from '../types';

export interface DefaultSeoProps {
  title?: string;
  titleTemplate?: string;
  dangerouslySetAllPagesToNoIndex?: boolean;
  description?: string;
  canonical?: string;
  facebook?: { appId: string };
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  openGraph?: OpenGraph;
  twitter?: Twitter;
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
}

export default class extends Component<DefaultSeoProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      titleTemplate,
      dangerouslySetAllPagesToNoIndex = false,
      description,
      canonical,
      facebook,
      openGraph,
      additionalMetaTags,
      twitter,
      defaultOpenGraphImageWidth,
      defaultOpenGraphImageHeight,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          titleTemplate,
          dangerouslySetAllPagesToNoIndex,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
          defaultOpenGraphImageWidth,
          defaultOpenGraphImageHeight,
        })}
      </Head>
    );
  }
}
