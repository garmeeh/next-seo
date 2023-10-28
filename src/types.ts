export type OpeningHoursSpecification = {
  opens: string;
  closes: string;
  dayOfWeek: string | string[];
  validFrom?: string;
  validThrough?: string;
};

export type Offer = {
  priceSpecification: PriceSpecification;
  itemOffered: Service;
};

export type PriceSpecification = {
  type: string;
  priceCurrency: string;
  price: string;
};

export type Service = {
  name: string;
  description: string;
};

export type Geo = {
  latitude: string;
  longitude: string;
};

export type GeoCircle = {
  geoMidpoint: Geo;
  geoRadius: string;
};

export type Action = {
  actionName: string;
  actionType: string;
  target: string;
};

export type Step = {
  type: string;
  name: string;
  url?: string;
  itemListElement?: StepDetails[];
  image?: string;
};

export type StepDetails = {
  type: 'HowToTip' | 'HowToDirection';
  text: string;
};

export interface Person {
  name: string;
}
export interface Answer {
  text: string;
  dateCreated?: string;
  upvoteCount?: number;
  url?: string;
  author?: Person;
}

export interface Question {
  name: string;
  answerCount: number;
  acceptedAnswer?: Answer;
  suggestedAnswer?: Answer[];
  text?: string;
  author?: Person;
  upvoteCount?: number;
  dateCreated?: string;
}

export interface Instruction {
  name?: string;
  text: string;
  url?: string;
  image?: string;
}
export interface Performer {
  type?: 'Person' | 'PerformingGroup';
  name: string;
}
export interface Place {
  name: string;
  address: Address;
  sameAs?: string;
}

export interface VirtualLocation {
  name?: string;
  sameAs?: string;
  url: string;
}

export type Location = string | Place | VirtualLocation;

export type EventStatus =
  | 'EventCancelled'
  | 'EventMovedOnline'
  | 'EventPostponed'
  | 'EventRescheduled'
  | 'EventScheduled';

export type EventAttendanceMode =
  | 'MixedEventAttendanceMode'
  | 'OfflineEventAttendanceMode'
  | 'OnlineEventAttendanceMode';

export interface Organizer {
  type: 'Person' | 'Organization';
  name: string;
  url: string;
}

export interface ContactPoint {
  contactType: string;
  telephone: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
  contactOption?: string | string[];
}
export interface CreativeWork {
  author: string;
  about: string;
  name: string;
  datePublished: string;
  audience?: string;
  keywords?: string;
  thumbnailUrl?: string;
  image?: string;
}

export interface Producer {
  name: string;
  url?: string;
}

export interface Question {
  questionName: string;
  acceptedAnswerText: string;
}
export interface Provider {
  type?: 'Organization' | 'Person';
  name: string;
  url?: string;
}
export interface ItemListElements {
  item: string;
  name: string;
  position: number;
}
export interface OpenGraphMedia {
  url: string;
  width?: number | null;
  height?: number | null;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

export type Address =
  | string
  | {
      streetAddress: string;
      addressLocality: string;
      addressRegion?: string;
      postalCode: string;
      addressCountry: string;
    };

export interface Video {
  name: string;
  description: string;
  thumbnailUrls: string[];
  uploadDate: string;
  contentUrl?: string;
  duration?: string;
  embedUrl?: string;
  expires?: string;
  hasPart?: Clip | Clip[];
  watchCount?: number;
  publication?: BroadcastEvent | BroadcastEvent[];
  regionsAllowed?: string | string[];
}

export interface Clip {
  name: string;
  startOffset: number;
  url: string;
}

export interface BroadcastEvent {
  name?: string;
  isLiveBroadcast: boolean;
  startDate: string;
  endDate: string;
}

export type Offers = {
  price: string;
  priceCurrency: string;
  priceValidUntil?: string;
  itemCondition?: string;
  availability?: string;
  url?: string;
  seller: {
    name: string;
  };
  validFrom?: string;
};

export type AggregateOffer = {
  priceCurrency: string;
  lowPrice: string;
  highPrice?: string;
  offerCount?: string;
  offers?: Offers | Offers[];
};

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
  /**
   * @deprecated use siteName instead. site_name will be removed in the next major version
   */
  site_name?: string;
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

export interface OpenGraphAudio {
  audio?: string;
  url?: string;
  secureUrl?: string;
  type?: string;
}

export interface Twitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

interface MobileAlternate {
  media: string;
  href: string;
}

interface LanguageAlternate {
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
    | 'content-security-policy'
    | 'content-type'
    | 'default-style'
    | 'x-ua-compatible'
    | 'refresh';
  name?: undefined;
  property?: undefined;
}

export type MetaTag = HTML5MetaTag | RDFaMetaTag | HTTPEquivMetaTag;

export type ImagePrevSize = 'none' | 'standard' | 'large';

export type AggregateRating = {
  ratingValue: string;
  reviewCount?: string;
  ratingCount?: string;
  bestRating?: string;
  worstRating?: string;
};

export type GamePlayMode = 'CoOp' | 'MultiPlayer' | 'SinglePlayer';

export type Review = {
  author: string;
  datePublished?: string;
  reviewBody?: string;
  name?: string;
  publisher?: Publisher;
  reviewRating: ReviewRating;
};

export type ReviewRating = {
  bestRating?: string;
  ratingValue: string;
  worstRating?: string;
};

export type Author = {
  type: string;
  name: string;
};

export type ArticleAuthor = {
  name: string;
  url?: string;
  type?: 'Person' | 'Organization';
};

export type Publisher = {
  type: string;
  name: string;
};

export type ReviewedBy = {
  type?: string;
  name: string;
};

export type AmenityFeature = {
  name: string;
  value: string | number | boolean;
};

export type LocationFeatureSpecification = 'LocationFeatureSpecification';

export type DecoratedAmenityFeature = {
  '@type': LocationFeatureSpecification;
  name: string;
  value: string | number | boolean;
};

export type ApplicationCategory =
  | 'Game'
  | 'SocialNetworking'
  | 'Travel'
  | 'Shopping'
  | 'Sports'
  | 'Lifestyle'
  | 'Business'
  | 'Design'
  | 'Developer'
  | 'Driver'
  | 'Educational'
  | 'Health'
  | 'Finance'
  | 'Security'
  | 'Browser'
  | 'Communication'
  | 'DesktopEnhancement'
  | 'Entertainment'
  | 'Multimedia'
  | 'Home'
  | 'Utilities'
  | 'Reference';

export type OrganizationCategory =
  | 'Airline'
  | 'Consortium'
  | 'Corporation'
  | 'EducationalOrganization'
  | 'FundingScheme'
  | 'GovernmentOrganization'
  | 'LibrarySystem'
  | 'LocalBusiness'
  | 'MedicalOrganization'
  | 'NGO'
  | 'NewsMediaOrganization'
  | 'PerformingGroup'
  | 'Project'
  | 'ResearchOrganization'
  | 'SportsOrganization'
  | 'WorkersUnion'
  | 'Organization';

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
  children?: never;
}

export interface DefaultSeoProps {
  dangerouslySetAllPagesToNoIndex?: boolean;
  dangerouslySetAllPagesToNoFollow?: boolean;
  defaultOpenGraphImageWidth?: number;
  defaultOpenGraphImageHeight?: number;
  defaultOpenGraphVideoWidth?: number;
  defaultOpenGraphVideoHeight?: number;
  title?: string;
  titleTemplate?: string;
  themeColor?: string;
  defaultTitle?: string;
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
  children?: never;
}
export interface BuildTagsParams extends DefaultSeoProps, NextSeoProps {}
