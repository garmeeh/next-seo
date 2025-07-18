// Base Schema.org types (e.g., Thing, Person)
// This file will contain common TypeScript definitions based on Schema.org.

export interface Thing {
  name?: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Person extends Thing {
  "@type": "Person";
  familyName?: string;
  givenName?: string;
  additionalName?: string;
}

export interface Organization extends Thing {
  "@type": "Organization";
  logo?: string | ImageObject;
}

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface ContactPoint {
  "@type": "ContactPoint";
  contactType?: string;
  telephone?: string;
  email?: string;
}

export interface QuantitativeValue {
  "@type": "QuantitativeValue";
  value?: number;
  minValue?: number;
  maxValue?: number;
}

export interface MerchantReturnPolicy {
  "@type": "MerchantReturnPolicy";
  applicableCountry?: string | string[];
  returnPolicyCountry?: string;
  returnPolicyCategory?: string;
  merchantReturnDays?: number;
  returnMethod?: string;
  returnFees?: string;
  refundType?: string;
}

export interface MemberProgramTier {
  "@type": "MemberProgramTier";
  "@id"?: string;
  name?: string;
  url?: string;
  hasTierBenefit?: string[];
  hasTierRequirement?: {
    "@type": string;
    name: string;
  };
  membershipPointsEarned?: number;
}

export interface MemberProgram {
  "@type": "MemberProgram";
  name?: string;
  description?: string;
  url?: string;
  hasTiers?: MemberProgramTier[];
}

export type Author = string | Person | Organization;

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface Rating {
  "@type": "Rating";
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
}

export interface Review {
  "@type": "Review";
  reviewRating?: Rating;
  author?: Author;
  reviewBody?: string;
  datePublished?: string;
}

export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: number;
  ratingCount?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
  validFrom?: string;
  validThrough?: string;
}
