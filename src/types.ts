export interface OpenGraphImages {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraphVideos {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphImages>;
  videos?: ReadonlyArray<OpenGraphVideos>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  site_name?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
}

export interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface OpenGraphBook {
  authors?: ReadonlyArray<string>;
  isbn?: string;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
}

export interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;

  authors?: ReadonlyArray<string>;
  section?: string;
  tags?: ReadonlyArray<string>;
}

export interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface BaseMetaTag {
  content: string;
}

export interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
}

export interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
}

export type MetaTag = HTML5MetaTag | RDFaMetaTag;

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
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
}

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

export interface BuildTagsParams extends DefaultSeoProps, NextSeoProps {}
