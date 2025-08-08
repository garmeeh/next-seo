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
  value?: number | string;
  minValue?: number;
  maxValue?: number;
  unitText?: string;
  unitCode?: string;
  valueReference?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
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

export type PriceTypeEnumeration =
  | "https://schema.org/StrikethroughPrice"
  | "https://schema.org/ListPrice"
  | "StrikethroughPrice"
  | "ListPrice";

export interface CreditCard {
  "@type": "CreditCard";
  name: string;
}

export interface UnitPriceSpecification {
  "@type": "UnitPriceSpecification";
  price?: number | string;
  priceCurrency?: string;
  billingDuration?: number;
  billingIncrement?: number;
  unitCode?: string;
  priceType?: PriceTypeEnumeration;
  validForMemberTier?:
    | MemberProgramTier
    | Omit<MemberProgramTier, "@type">
    | (MemberProgramTier | Omit<MemberProgramTier, "@type">)[];
  membershipPointsEarned?: number;
  referenceQuantity?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
}

export type TierRequirement =
  | CreditCard
  | SimpleMonetaryAmount
  | UnitPriceSpecification
  | string
  | Omit<CreditCard, "@type">
  | Omit<SimpleMonetaryAmount, "@type">
  | Omit<UnitPriceSpecification, "@type">;

export type TierBenefit =
  | "TierBenefitLoyaltyPoints"
  | "TierBenefitLoyaltyPrice"
  | "https://schema.org/TierBenefitLoyaltyPoints"
  | "https://schema.org/TierBenefitLoyaltyPrice";

export interface MemberProgramTier {
  "@type": "MemberProgramTier";
  "@id"?: string;
  name: string;
  url?: string;
  hasTierBenefit: TierBenefit | TierBenefit[];
  hasTierRequirement?: TierRequirement;
  membershipPointsEarned?:
    | number
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">;
}

export interface MemberProgram {
  "@type": "MemberProgram";
  name: string;
  description: string;
  url?: string;
  hasTiers:
    | MemberProgramTier
    | Omit<MemberProgramTier, "@type">
    | (MemberProgramTier | Omit<MemberProgramTier, "@type">)[];
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
  ratingValue: number | string;
  bestRating?: number | string;
  worstRating?: number | string;
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

export interface Certification {
  "@type": "Certification";
  issuedBy:
    | Organization
    | Omit<Organization, "@type">
    | { "@type"?: "Organization"; name: string };
  name: string;
  url?: string;
  certificationIdentification?: string;
  certificationRating?: Rating | Omit<Rating, "@type">;
}

export interface PeopleAudience {
  "@type": "PeopleAudience";
  suggestedGender?:
    | "male"
    | "female"
    | "unisex"
    | "https://schema.org/Male"
    | "https://schema.org/Female";
  suggestedMinAge?: number;
  suggestedMaxAge?: number;
  suggestedAge?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
}

export interface SizeSpecification {
  "@type": "SizeSpecification";
  name?: string;
  sizeGroup?:
    | "WearableSizeGroupRegular"
    | "WearableSizeGroupPetite"
    | "WearableSizeGroupPlus"
    | "WearableSizeGroupTall"
    | "WearableSizeGroupBig"
    | "WearableSizeGroupMaternity"
    | "https://schema.org/WearableSizeGroupRegular"
    | "https://schema.org/WearableSizeGroupPetite"
    | "https://schema.org/WearableSizeGroupPlus"
    | "https://schema.org/WearableSizeGroupTall"
    | "https://schema.org/WearableSizeGroupBig"
    | "https://schema.org/WearableSizeGroupMaternity"
    | "regular"
    | "petite"
    | "plus"
    | "tall"
    | "big"
    | "maternity";
  sizeSystem?:
    | "WearableSizeSystemAU"
    | "WearableSizeSystemBR"
    | "WearableSizeSystemCN"
    | "WearableSizeSystemDE"
    | "WearableSizeSystemEurope"
    | "WearableSizeSystemFR"
    | "WearableSizeSystemIT"
    | "WearableSizeSystemJP"
    | "WearableSizeSystemMX"
    | "WearableSizeSystemUK"
    | "WearableSizeSystemUS"
    | "https://schema.org/WearableSizeSystemAU"
    | "https://schema.org/WearableSizeSystemBR"
    | "https://schema.org/WearableSizeSystemCN"
    | "https://schema.org/WearableSizeSystemDE"
    | "https://schema.org/WearableSizeSystemEurope"
    | "https://schema.org/WearableSizeSystemFR"
    | "https://schema.org/WearableSizeSystemIT"
    | "https://schema.org/WearableSizeSystemJP"
    | "https://schema.org/WearableSizeSystemMX"
    | "https://schema.org/WearableSizeSystemUK"
    | "https://schema.org/WearableSizeSystemUS"
    | "AU"
    | "BR"
    | "CN"
    | "DE"
    | "EU"
    | "FR"
    | "IT"
    | "JP"
    | "MX"
    | "UK"
    | "US";
}

export interface ThreeDModel {
  "@type": "3DModel";
  encoding?: {
    "@type"?: "MediaObject";
    contentUrl: string;
  };
}

export interface DefinedRegion {
  "@type": "DefinedRegion";
  addressCountry: string;
  addressRegion?: string | string[];
  postalCode?: string | string[];
}

export interface ShippingDeliveryTime {
  "@type": "ShippingDeliveryTime";
  handlingTime?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
  transitTime?: QuantitativeValue | Omit<QuantitativeValue, "@type">;
}

export interface OfferShippingDetails {
  "@type": "OfferShippingDetails";
  shippingRate?: SimpleMonetaryAmount | Omit<SimpleMonetaryAmount, "@type">;
  shippingDestination?:
    | DefinedRegion
    | Omit<DefinedRegion, "@type">
    | (DefinedRegion | Omit<DefinedRegion, "@type">)[];
  deliveryTime?: ShippingDeliveryTime | Omit<ShippingDeliveryTime, "@type">;
  doesNotShip?: boolean;
}
