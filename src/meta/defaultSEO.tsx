import Head from 'next/head';
import React, { FC } from 'react';
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

const DefaultSeo: FC<DefaultSeoProps> = ({
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
}) => (
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

export default DefaultSeo;
