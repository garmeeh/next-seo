import type { Author } from "~/types/common.types";

export type ItemReviewedType =
  | "Book"
  | "Course"
  | "CreativeWorkSeason"
  | "CreativeWorkSeries"
  | "Episode"
  | "Event"
  | "Game"
  | "HowTo"
  | "LocalBusiness"
  | "MediaObject"
  | "Movie"
  | "MusicPlaylist"
  | "MusicRecording"
  | "Organization"
  | "Product"
  | "Recipe"
  | "SoftwareApplication";

export type ItemReviewedInput =
  | string
  | ({ name: string; "@type"?: ItemReviewedType } & Record<string, unknown>);

export interface ReviewJsonLdProps {
  // JSON-LD plumbing
  scriptId?: string;
  scriptKey?: string;

  // Required per Google Review
  author: Author;
  reviewRating:
    | {
        "@type"?: "Rating";
        ratingValue: number | string;
        bestRating?: number | string;
        worstRating?: number | string;
      }
    | {
        "@type": "AggregateRating";
        ratingValue: number | string;
        bestRating?: number | string;
        worstRating?: number | string;
      };
  itemReviewed: ItemReviewedInput;

  // Recommended/optional
  datePublished?: string;
  reviewBody?: string;
  publisher?: Author;
  url?: string;
  mainEntityOfPage?: string | { "@type"?: "WebPage"; "@id": string };
}

export interface AggregateRatingJsonLdProps {
  scriptId?: string;
  scriptKey?: string;

  itemReviewed: ItemReviewedInput;
  ratingValue: number | string;
  ratingCount?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}
