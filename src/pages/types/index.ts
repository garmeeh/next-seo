// Types for Pages Router SEO components (next-seo/pages)

export interface OpenGraphMedia {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

export interface OpenGraphVideoActors {
  profile: string;
  role?: string;
}

export interface OpenGraph {
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  images?: ReadonlyArray<OpenGraphMedia>;
  videos?: ReadonlyArray<OpenGraphMedia>;
  audio?: ReadonlyArray<OpenGraphMedia>;
  defaultImageHeight?: number;
  defaultImageWidth?: number;
  locale?: string;
  siteName?: string;
  site_name?: string; // Deprecated but kept for backward compatibility
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  video?: OpenGraphVideo;
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

export interface OpenGraphVideo {
  actors?: ReadonlyArray<OpenGraphVideoActors>;
  directors?: ReadonlyArray<string>;
  writers?: ReadonlyArray<string>;
  duration?: number;
  releaseDate?: string;
  tags?: ReadonlyArray<string>;
  series?: string;
}

export interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface MobileAlternate {
  media: string;
  href: string;
}

export interface LanguageAlternate {
  hrefLang: string;
  href: string;
}

export interface LinkTag {
  rel: string;
  href: string;
  hrefLang?: string;
  media?: string;
  sizes?: string;
  type?: string;
  as?: string;
  crossOrigin?: string;
  imagesrcset?: string;
  imagesizes?: string;
  referrerpolicy?: string;
  integrity?: string;
  keyOverride?: string;
  color?: string;
}

export interface BaseMetaTag {
  content: string;
  keyOverride?: string;
}

export interface HTML5MetaTag extends BaseMetaTag {
  name: string;
  property?: undefined;
  httpEquiv?: undefined;
}

export interface RDFaMetaTag extends BaseMetaTag {
  property: string;
  name?: undefined;
  httpEquiv?: undefined;
}

export interface HTTPEquivMetaTag extends BaseMetaTag {
  httpEquiv:
    | "content-security-policy"
    | "content-type"
    | "default-style"
    | "x-ua-compatible"
    | "refresh";
  name?: undefined;
  property?: undefined;
}

export type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

export type ImagePrevSize = "none" | "standard" | "large";

export interface AdditionalRobotsProps {
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: ImagePrevSize;
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailableAfter?: string;
  noimageindex?: boolean;
  notranslate?: boolean;
}

export interface NextSeoProps {
  title?: string;
  titleTemplate?: string;
  defaultTitle?: string;
  themeColor?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: AdditionalRobotsProps;
  description?: string;
  canonical?: string;
  mobileAlternate?: MobileAlternate;
  languageAlternates?: ReadonlyArray<LanguageAlternate>;
  openGraph?: OpenGraph;
  facebook?: { appId: string };
  twitter?: Twitter;
  additionalMetaTags?: ReadonlyArray<MetaTag>;
  additionalLinkTags?: ReadonlyArray<LinkTag>;
}

export interface DefaultSeoProps extends NextSeoProps {
  dangerouslySetAllPagesToNoIndex?: boolean;
  dangerouslySetAllPagesToNoFollow?: boolean;
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
  norobots?: boolean;
}

export interface BuildTagsParams extends DefaultSeoProps, NextSeoProps {}
