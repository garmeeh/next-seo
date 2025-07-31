import type { Organization, Author, Rating } from "./common.types";

// Extended Rating type for ClaimReview with required alternateName
export interface ClaimReviewRating extends Rating {
  alternateName: string;
  name?: string;
}

// CreativeWork type for appearance/firstAppearance
export interface ClaimCreativeWork {
  "@type": string;
  "@id"?: string;
  url?: string;
  headline?: string;
  datePublished?: string;
  author?: Author;
  image?: string;
  publisher?: Organization | Omit<Organization, "@type">;
}

// Claim type
export interface Claim {
  "@type": "Claim";
  appearance?:
    | string
    | ClaimCreativeWork
    | Omit<ClaimCreativeWork, "@type">
    | (string | ClaimCreativeWork | Omit<ClaimCreativeWork, "@type">)[];
  author?: Author;
  datePublished?: string;
  firstAppearance?:
    | string
    | ClaimCreativeWork
    | Omit<ClaimCreativeWork, "@type">;
}

// ClaimReview type
export interface ClaimReview {
  "@type": "ClaimReview";
  claimReviewed: string;
  reviewRating: ClaimReviewRating | Omit<ClaimReviewRating, "@type">;
  url: string;
  author?: Author;
  itemReviewed?: Claim | Omit<Claim, "@type">;
}

// Component props type
export type ClaimReviewJsonLdProps = Omit<ClaimReview, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
