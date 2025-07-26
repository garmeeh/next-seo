import type {
  Author,
  ImageObject,
  VideoObject,
  InteractionCounter,
} from "./common.types";

// WebPage type for sharedContent
export interface WebPage {
  "@type": "WebPage";
  url: string;
  name?: string;
  description?: string;
}

// CreativeWork can be used for isPartOf
export interface CreativeWork {
  "@type": "CreativeWork";
  name?: string;
  url?: string;
}

// SharedContent can be various types
export type SharedContent =
  | string
  | WebPage
  | ImageObject
  | VideoObject
  | Omit<WebPage, "@type">
  | Omit<ImageObject, "@type">
  | Omit<VideoObject, "@type">;

// Comment interface with nested comment support
export interface Comment {
  "@type": "Comment";
  author: Author;
  datePublished: string;
  text?: string;
  image?: string | ImageObject | Omit<ImageObject, "@type">;
  video?: VideoObject | Omit<VideoObject, "@type">;
  comment?: (Comment | Omit<Comment, "@type">)[];
  creativeWorkStatus?: string;
  dateModified?: string;
  interactionStatistic?:
    | InteractionCounter
    | Omit<InteractionCounter, "@type">
    | (InteractionCounter | Omit<InteractionCounter, "@type">)[];
  sharedContent?: SharedContent;
  url?: string;
}

// Base interface for both DiscussionForumPosting and SocialMediaPosting
export interface DiscussionForumPostingBase {
  headline?: string;
  text?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  video?: VideoObject | Omit<VideoObject, "@type">;
  author: Author | Author[];
  datePublished: string;
  dateModified?: string;
  url?: string;
  comment?: (Comment | Omit<Comment, "@type">)[];
  creativeWorkStatus?: string;
  interactionStatistic?:
    | InteractionCounter
    | Omit<InteractionCounter, "@type">
    | (InteractionCounter | Omit<InteractionCounter, "@type">)[];
  isPartOf?: string | CreativeWork | Omit<CreativeWork, "@type">;
  sharedContent?: SharedContent;
}

// Specific schema types
export interface DiscussionForumPosting extends DiscussionForumPostingBase {
  "@type": "DiscussionForumPosting";
}

export interface SocialMediaPosting extends DiscussionForumPostingBase {
  "@type": "SocialMediaPosting";
}

// Component props type
export type DiscussionForumPostingJsonLdProps = (
  | Omit<DiscussionForumPosting, "@type">
  | Omit<SocialMediaPosting, "@type">
) & {
  type?: "DiscussionForumPosting" | "SocialMediaPosting";
  scriptId?: string;
  scriptKey?: string;
};
