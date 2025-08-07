import type { ImageObject, Organization, Person, Author } from "./common.types";

// WebPageElement for marking paywalled sections
export interface WebPageElement {
  "@type": "WebPageElement";
  isAccessibleForFree: boolean;
  cssSelector: string;
}

// Publisher type (same as Article)
export type Publisher =
  | string
  | Organization
  | Person
  | Omit<Organization, "@type">
  | Omit<Person, "@type">;

// Base interface with common properties for all CreativeWork types
export interface CreativeWorkBase {
  headline?: string;
  name?: string; // Alternative to headline for some types
  url?: string;
  author?: Author | Author[];
  datePublished?: string;
  dateModified?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  publisher?: Publisher;
  description?: string;
  isAccessibleForFree?: boolean;
  hasPart?:
    | WebPageElement
    | Omit<WebPageElement, "@type">
    | (WebPageElement | Omit<WebPageElement, "@type">)[];
  mainEntityOfPage?:
    | string
    | {
        "@type": "WebPage";
        "@id": string;
      }
    | {
        "@id": string;
      };
}

// Specific schema type interfaces for all supported CreativeWork types
export interface CreativeWork extends CreativeWorkBase {
  "@type": "CreativeWork";
}

export interface Article extends CreativeWorkBase {
  "@type": "Article";
  headline: string; // Required for Article
}

export interface NewsArticle extends CreativeWorkBase {
  "@type": "NewsArticle";
  headline: string; // Required for NewsArticle
}

export interface Blog extends CreativeWorkBase {
  "@type": "Blog";
}

export interface BlogPosting extends CreativeWorkBase {
  "@type": "BlogPosting";
  headline: string; // Required for BlogPosting
}

export interface Comment extends CreativeWorkBase {
  "@type": "Comment";
  text?: string; // Comment-specific property
}

export interface Course extends CreativeWorkBase {
  "@type": "Course";
  name: string; // Required for Course
  provider?: Publisher;
}

export interface HowTo extends CreativeWorkBase {
  "@type": "HowTo";
  name: string; // Required for HowTo
}

export interface Message extends CreativeWorkBase {
  "@type": "Message";
}

export interface Review extends CreativeWorkBase {
  "@type": "Review";
  itemReviewed?: string | { name: string; "@type"?: string };
  reviewRating?: {
    "@type"?: "Rating";
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
}

export interface WebPage extends CreativeWorkBase {
  "@type": "WebPage";
}

// Component props type - include all possible properties from all types
export type CreativeWorkJsonLdProps = {
  // Common properties from CreativeWorkBase
  headline?: string;
  name?: string;
  url?: string;
  author?: Author | Author[];
  datePublished?: string;
  dateModified?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  publisher?: Publisher;
  description?: string;
  isAccessibleForFree?: boolean;
  hasPart?:
    | WebPageElement
    | Omit<WebPageElement, "@type">
    | (WebPageElement | Omit<WebPageElement, "@type">)[];
  mainEntityOfPage?:
    | string
    | {
        "@type": "WebPage";
        "@id": string;
      }
    | {
        "@id": string;
      };

  // Type-specific properties
  text?: string; // For Comment
  provider?: Publisher; // For Course
  itemReviewed?: string | { name: string; "@type"?: string }; // For Review
  reviewRating?: {
    "@type"?: "Rating";
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  }; // For Review

  // Component control properties
  type?:
    | "CreativeWork"
    | "Article"
    | "NewsArticle"
    | "Blog"
    | "BlogPosting"
    | "Comment"
    | "Course"
    | "HowTo"
    | "Message"
    | "Review"
    | "WebPage";
  scriptId?: string;
  scriptKey?: string;
};
