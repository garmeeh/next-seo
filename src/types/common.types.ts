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
  alternateName?: string;
  identifier?: string;
  interactionStatistic?:
    | InteractionCounter
    | InteractionCounter[]
    | Omit<InteractionCounter, "@type">
    | Omit<InteractionCounter, "@type">[];
  agentInteractionStatistic?:
    | InteractionCounter
    | Omit<InteractionCounter, "@type">;
  sameAs?: string | string[];
}

export interface Organization extends Thing {
  "@type": "Organization";
  logo?: string | ImageObject | Omit<ImageObject, "@type">;
  sameAs?: string | string[];
  address?:
    | string
    | PostalAddress
    | Omit<PostalAddress, "@type">
    | (string | PostalAddress | Omit<PostalAddress, "@type">)[];
  contactPoint?:
    | ContactPoint
    | Omit<ContactPoint, "@type">
    | ContactPoint[]
    | Omit<ContactPoint, "@type">[];
  telephone?: string;
  email?: string;
  alternateName?: string;
  foundingDate?: string;
  legalName?: string;
  taxID?: string;
  vatID?: string;
  duns?: string;
  leiCode?: string;
  naics?: string;
  globalLocationNumber?: string;
  iso6523Code?: string;
  numberOfEmployees?:
    | number
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">;
  identifier?: string;
  interactionStatistic?:
    | InteractionCounter
    | InteractionCounter[]
    | Omit<InteractionCounter, "@type">
    | Omit<InteractionCounter, "@type">[];
  agentInteractionStatistic?:
    | InteractionCounter
    | Omit<InteractionCounter, "@type">;
}

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface Place {
  "@type": "Place";
  name?: string;
  address?: PostalAddress | Omit<PostalAddress, "@type">;
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
  unitText?: string;
  unitCode?: string;
}

export interface SimpleMonetaryAmount {
  "@type": "MonetaryAmount";
  value: number | string;
  currency: string;
}

export interface MerchantReturnPolicySeasonalOverride {
  "@type": "MerchantReturnPolicySeasonalOverride";
  startDate?: string;
  endDate?: string;
  returnPolicyCategory?: string;
  merchantReturnDays?: number | string;
}

export interface MerchantReturnPolicy {
  "@type": "MerchantReturnPolicy";
  // Option A: Detailed properties
  applicableCountry?: string | string[];
  returnPolicyCountry?: string | string[];
  returnPolicyCategory?: string;
  merchantReturnDays?: number;
  returnMethod?: string | string[];
  returnFees?: string;
  returnShippingFeesAmount?:
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">;
  refundType?: string | string[];
  restockingFee?:
    | number
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">;
  returnLabelSource?: string;
  itemCondition?: string | string[];
  // Customer remorse specific properties
  customerRemorseReturnFees?: string;
  customerRemorseReturnShippingFeesAmount?:
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">;
  customerRemorseReturnLabelSource?: string;
  // Item defect specific properties
  itemDefectReturnFees?: string;
  itemDefectReturnShippingFeesAmount?:
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">;
  itemDefectReturnLabelSource?: string;
  // Seasonal override
  returnPolicySeasonalOverride?:
    | MerchantReturnPolicySeasonalOverride
    | Omit<MerchantReturnPolicySeasonalOverride, "@type">
    | MerchantReturnPolicySeasonalOverride[]
    | Omit<MerchantReturnPolicySeasonalOverride, "@type">[];
  // Option B: Link to policy
  merchantReturnLink?: string;
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

export type Author =
  | string
  | Person
  | Organization
  | Omit<Person, "@type">
  | Omit<Organization, "@type">;

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
  reviewRating?: Rating | Omit<Rating, "@type">;
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

export interface VideoObject {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  contentUrl?: string;
  embedUrl?: string;
  uploadDate: string;
  duration?: string;
  expires?: string;
}

export interface InteractionCounter {
  "@type": "InteractionCounter";
  interactionType: string;
  userInteractionCount: number;
}

export interface Brand {
  "@type": "Brand";
  name?: string;
}

export interface BedDetails {
  "@type": "BedDetails";
  numberOfBeds?: number;
  typeOfBed?: string;
}

export interface LocationFeatureSpecification {
  "@type": "LocationFeatureSpecification";
  name: string;
  value: boolean | string;
}

export interface Accommodation {
  "@type": "Accommodation";
  additionalType?: string;
  bed?:
    | BedDetails
    | Omit<BedDetails, "@type">
    | (BedDetails | Omit<BedDetails, "@type">)[];
  occupancy?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
  amenityFeature?:
    | LocationFeatureSpecification
    | Omit<LocationFeatureSpecification, "@type">
    | (
        | LocationFeatureSpecification
        | Omit<LocationFeatureSpecification, "@type">
      )[];
  floorSize?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
  numberOfBathroomsTotal?: number;
  numberOfBedrooms?: number;
  numberOfRooms?: number;
  petsAllowed?: boolean;
  smokingAllowed?: boolean;
}
