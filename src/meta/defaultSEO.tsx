import Head from 'next/head';
import React from 'react';
import buildTags from './buildTags';

interface OpenGraphImages {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImages>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
}

interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;

  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Config {
  title?: string;
  titleTemplate?: string;
  noindex?: boolean;
  dangerouslySetAllPagesToNoIndex?: boolean;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
  facebook?: { appId: string };
  twitter?: Twitter;
}

interface DefaultSeoProps {
  config: Config;
}

class DefaultSeo extends React.Component<DefaultSeoProps, {}> {
  constructor(props: DefaultSeoProps) {
    super(props);
    if (!props.config) {
      throw new Error('[next-seo] You must supply an SEO configuration');
    }
  }

  render() {
    const { config } = this.props;
    return <Head>{buildTags(config)}</Head>;
  }
}

export default DefaultSeo;
