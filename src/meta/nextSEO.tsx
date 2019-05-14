import Head from 'next/head';
import React, { FC } from 'react';
import buildTags from './buildTags';
import { MetaTag, OpenGraph, Twitter } from '../types';

export interface NextSeoProps {
  title?: string;
  noindex?: boolean;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
  facebook?: { appId: string };
  twitter?: Twitter;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
}

export const NextSeo: FC<NextSeoProps> = ({
  title,
  noindex = false,
  description,
  canonical,
  openGraph,
  facebook,
  twitter,
  additionalMetaTags,
}) => (
  <Head>
    {buildTags({
      title,
      noindex,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
    })}
  </Head>
);

export default NextSeo;
