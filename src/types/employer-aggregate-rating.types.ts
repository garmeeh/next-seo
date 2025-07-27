import type { Organization } from "./common.types";

// EmployerAggregateRating specific to hiring organizations
export interface EmployerAggregateRating {
  "@type": "EmployerAggregateRating";
  itemReviewed: Organization;
  ratingValue: number | string;
  ratingCount?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}

// Component props type
export type EmployerAggregateRatingJsonLdProps = Omit<
  EmployerAggregateRating,
  "@type" | "itemReviewed"
> & {
  itemReviewed: string | Organization | Omit<Organization, "@type">;
  scriptId?: string;
  scriptKey?: string;
};
