import type {
  Author,
  Person,
  Organization,
  ImageObject,
  PostalAddress,
  ContactPoint,
  QuantitativeValue,
  GeoCoordinates,
  OpeningHoursSpecification,
  Review,
  AggregateRating,
  MerchantReturnPolicy,
  MerchantReturnPolicySeasonalOverride,
  SimpleMonetaryAmount,
  Rating,
  VideoObject,
  InteractionCounter,
  Brand,
  BedDetails,
  LocationFeatureSpecification,
  Accommodation,
  MemberProgram,
  MemberProgramTier,
  CreditCard,
  UnitPriceSpecification,
  TierRequirement,
  TierBenefit,
  Certification,
  PeopleAudience,
  SizeSpecification,
  ThreeDModel,
  DefinedRegion,
  ShippingDeliveryTime,
  OfferShippingDetails,
} from "~/types/common.types";
import type { Director } from "~/types/movie-carousel.types";
import type { Provider } from "~/types/course.types";
import type { BreadcrumbListItem, ListItem } from "~/types/breadcrumb.types";
import type {
  Place,
  Performer,
  Organizer,
  Offer,
  PerformingGroup,
} from "~/types/event.types";
import type {
  NutritionInformation,
  HowToStep,
  HowToSection,
} from "~/types/recipe.types";
import type {
  GeoShape,
  PropertyValue,
  CreativeWork,
  DatasetPlace,
  DataDownload,
  DataCatalog,
} from "~/types/dataset.types";
import type {
  Place as JobPlace,
  PropertyValue as JobPropertyValue,
  MonetaryAmount,
  Country,
  State,
  AdministrativeArea,
  EducationalOccupationalCredential,
  OccupationalExperienceRequirements,
} from "~/types/jobposting.types";
import type {
  Comment,
  SharedContent,
  WebPage as ForumWebPage,
  CreativeWork as ForumCreativeWork,
} from "~/types/discussionforum.types";
import type {
  Claim,
  ClaimReviewRating,
  ClaimCreativeWork,
} from "~/types/claimreview.types";
import type {
  BroadcastEvent,
  Clip,
  PotentialAction,
} from "~/types/video.types";
import type { WebPageElement } from "~/types/creativework.types";
import type {
  ProductOffer,
  AggregateOffer,
  PriceSpecification,
  ProductItemList,
  ProductListItem,
  ProductReview,
  Product,
  VariesBy,
} from "~/types/product.types";

// Schema.org type constants
const SCHEMA_TYPES = {
  PERSON: "Person",
  ORGANIZATION: "Organization",
  IMAGE_OBJECT: "ImageObject",
  POSTAL_ADDRESS: "PostalAddress",
  CONTACT_POINT: "ContactPoint",
  QUANTITATIVE_VALUE: "QuantitativeValue",
  GEO_COORDINATES: "GeoCoordinates",
  GEO_SHAPE: "GeoShape",
  OPENING_HOURS: "OpeningHoursSpecification",
  REVIEW: "Review",
  RATING: "Rating",
  AGGREGATE_RATING: "AggregateRating",
  MERCHANT_RETURN_POLICY: "MerchantReturnPolicy",
  MERCHANT_RETURN_POLICY_SEASONAL_OVERRIDE:
    "MerchantReturnPolicySeasonalOverride",
  MONETARY_AMOUNT: "MonetaryAmount",
  VIDEO_OBJECT: "VideoObject",
  INTERACTION_COUNTER: "InteractionCounter",
  BRAND: "Brand",
  CREDIT_CARD: "CreditCard",
  UNIT_PRICE_SPECIFICATION: "UnitPriceSpecification",
  MEMBER_PROGRAM: "MemberProgram",
  MEMBER_PROGRAM_TIER: "MemberProgramTier",
  BED_DETAILS: "BedDetails",
  LOCATION_FEATURE: "LocationFeatureSpecification",
  ACCOMMODATION: "Accommodation",
  PLACE: "Place",
  PERFORMING_GROUP: "PerformingGroup",
  OFFER: "Offer",
  AGGREGATE_OFFER: "AggregateOffer",
  PRICE_SPECIFICATION: "PriceSpecification",
  ITEM_LIST: "ItemList",
  LIST_ITEM: "ListItem",
  PRODUCT: "Product",
  PRODUCT_GROUP: "ProductGroup",
  NUTRITION_INFORMATION: "NutritionInformation",
  HOW_TO_STEP: "HowToStep",
  HOW_TO_SECTION: "HowToSection",
  PROPERTY_VALUE: "PropertyValue",
  CREATIVE_WORK: "CreativeWork",
  DATA_DOWNLOAD: "DataDownload",
  DATA_CATALOG: "DataCatalog",
  COUNTRY: "Country",
  STATE: "State",
  EDUCATIONAL_CREDENTIAL: "EducationalOccupationalCredential",
  OCCUPATIONAL_EXPERIENCE: "OccupationalExperienceRequirements",
  COMMENT: "Comment",
  WEB_PAGE: "WebPage",
  WEB_PAGE_ELEMENT: "WebPageElement",
  CLAIM: "Claim",
  CERTIFICATION: "Certification",
  PEOPLE_AUDIENCE: "PeopleAudience",
  SIZE_SPECIFICATION: "SizeSpecification",
  THREE_D_MODEL: "3DModel",
  DEFINED_REGION: "DefinedRegion",
  SHIPPING_DELIVERY_TIME: "ShippingDeliveryTime",
  OFFER_SHIPPING_DETAILS: "OfferShippingDetails",
} as const;

// Type guard utilities
function hasType<T extends { "@type": string }>(obj: unknown): obj is T {
  return obj !== null && typeof obj === "object" && "@type" in obj;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Generic processor for simple schema types
export function processSchemaType<T extends { "@type": string }>(
  value: unknown,
  schemaType: string,
  stringHandler?: (str: string) => Omit<T, "@type">,
  numberHandler?: (num: number) => Omit<T, "@type">,
): T {
  if (isString(value) && stringHandler) {
    return { "@type": schemaType, ...stringHandler(value) } as T;
  }

  if (typeof value === "number" && numberHandler) {
    return { "@type": schemaType, ...numberHandler(value) } as T;
  }

  if (hasType<T>(value)) {
    return value;
  }

  // Ensure value is an object before spreading
  if (typeof value === "object" && value !== null) {
    return { "@type": schemaType, ...value } as T;
  }

  // Fallback for non-object values
  return { "@type": schemaType } as T;
}

// Helper to process nested organization fields
function processOrganizationFields(org: Organization): void {
  if (org.logo && !isString(org.logo)) {
    org.logo = processLogo(org.logo);
  }

  if (org.address && !isString(org.address)) {
    if (Array.isArray(org.address)) {
      org.address = org.address.map((addr) =>
        isString(addr) ? addr : processAddress(addr),
      );
    } else {
      org.address = processAddress(org.address);
    }
  }

  if (org.contactPoint) {
    if (Array.isArray(org.contactPoint)) {
      org.contactPoint = org.contactPoint.map(processContactPoint);
    } else {
      org.contactPoint = processContactPoint(org.contactPoint);
    }
  }
}

/**
 * Processes author input into a Person or Organization schema type
 * @param author - String name, Person object, or Organization object
 * @returns Processed Person or Organization with @type
 * @example
 * processAuthor("John Doe") // { "@type": "Person", name: "John Doe" }
 * processAuthor({ name: "ACME Corp", logo: "logo.jpg" }) // { "@type": "Organization", ... }
 */
export function processAuthor(author: Author): Person | Organization {
  if (isString(author)) {
    // Check if the string appears to be an organization name
    const orgIndicators = [
      "magazine",
      "publication",
      "company",
      "corporation",
      "corp",
      "inc",
      "llc",
      "ltd",
      "limited",
      "group",
      "foundation",
      "institute",
      "association",
      "society",
      "union",
      "times",
      "news",
      "press",
      "media",
      "network",
      "agency",
      "studio",
    ];

    const lowerName = author.toLowerCase();
    const isLikelyOrg = orgIndicators.some((indicator) =>
      lowerName.includes(indicator),
    );

    if (isLikelyOrg) {
      return {
        "@type": SCHEMA_TYPES.ORGANIZATION,
        name: author,
      };
    }

    return {
      "@type": SCHEMA_TYPES.PERSON,
      name: author,
    };
  }

  if (hasType<Person | Organization>(author)) {
    return author;
  }

  // Determine if it's Person or Organization based on properties
  const hasOrgProperties =
    "logo" in author || "address" in author || "contactPoint" in author;

  if (hasOrgProperties) {
    const org: Organization = {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      ...author,
    };
    processOrganizationFields(org);
    return org;
  }

  // Default to Person
  return {
    "@type": SCHEMA_TYPES.PERSON,
    ...author,
  } as Person;
}

/**
 * Processes image input into ImageObject schema type
 * @param image - URL string or ImageObject
 * @returns URL string or ImageObject with @type
 * @example
 * processImage("https://example.com/image.jpg") // "https://example.com/image.jpg"
 * processImage({ url: "image.jpg", width: 800 }) // { "@type": "ImageObject", ... }
 */
export function processImage(
  image: string | ImageObject | Omit<ImageObject, "@type">,
): string | ImageObject {
  if (isString(image)) {
    return image;
  }

  return processSchemaType<ImageObject>(image, SCHEMA_TYPES.IMAGE_OBJECT);
}

/**
 * Processes address input into PostalAddress schema type
 * @param address - String address or PostalAddress object
 * @returns PostalAddress with @type
 * @example
 * processAddress("123 Main St") // { "@type": "PostalAddress", streetAddress: "123 Main St" }
 */
export function processAddress(
  address: string | PostalAddress | Omit<PostalAddress, "@type">,
): PostalAddress {
  return processSchemaType<PostalAddress>(
    address,
    SCHEMA_TYPES.POSTAL_ADDRESS,
    (str) => ({ streetAddress: str }),
    undefined,
  );
}

/**
 * Processes contact point into ContactPoint schema type
 * @param contactPoint - ContactPoint object with or without @type
 * @returns ContactPoint with @type
 */
export function processContactPoint(
  contactPoint: ContactPoint | Omit<ContactPoint, "@type">,
): ContactPoint {
  return processSchemaType<ContactPoint>(
    contactPoint,
    SCHEMA_TYPES.CONTACT_POINT,
  );
}

/**
 * Processes logo the same way as images
 * @param logo - URL string or ImageObject
 * @returns URL string or ImageObject with @type
 */
export function processLogo(
  logo: string | ImageObject | Omit<ImageObject, "@type">,
): string | ImageObject {
  return processImage(logo);
}

/**
 * Processes number of employees into QuantitativeValue schema type
 * @param numberOfEmployees - Number or QuantitativeValue object
 * @returns QuantitativeValue with @type
 */
export function processNumberOfEmployees(
  numberOfEmployees:
    | number
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">,
): QuantitativeValue {
  return processSchemaType<QuantitativeValue>(
    numberOfEmployees,
    SCHEMA_TYPES.QUANTITATIVE_VALUE,
    undefined,
    (num) => ({ value: num }),
  );
}

/**
 * Processes geographic coordinates into GeoCoordinates schema type
 * @param geo - GeoCoordinates object with or without @type
 * @returns GeoCoordinates with @type
 */
export function processGeo(
  geo: GeoCoordinates | Omit<GeoCoordinates, "@type">,
): GeoCoordinates {
  return processSchemaType<GeoCoordinates>(geo, SCHEMA_TYPES.GEO_COORDINATES);
}

/**
 * Processes opening hours into OpeningHoursSpecification schema type
 * @param hours - OpeningHoursSpecification object with or without @type
 * @returns OpeningHoursSpecification with @type
 */
export function processOpeningHours(
  hours: OpeningHoursSpecification | Omit<OpeningHoursSpecification, "@type">,
): OpeningHoursSpecification {
  return processSchemaType<OpeningHoursSpecification>(
    hours,
    SCHEMA_TYPES.OPENING_HOURS,
  );
}

/**
 * Processes review into Review schema type with nested rating processing
 * @param review - Review object with or without @type
 * @returns Review with @type and processed nested fields
 */
export function processReview(review: Review | Omit<Review, "@type">): Review {
  const processed: Review = processSchemaType<Review>(
    review,
    SCHEMA_TYPES.REVIEW,
  );

  // Process nested rating
  if (review.reviewRating) {
    processed.reviewRating = processSchemaType<Rating>(
      review.reviewRating,
      SCHEMA_TYPES.RATING,
    );
  }

  // Process nested author
  if (review.author) {
    processed.author = processAuthor(review.author);
  }

  return processed;
}

/**
 * Processes breadcrumb item into ListItem schema type
 * @param item - BreadcrumbListItem object
 * @param position - Position in the breadcrumb trail
 * @returns ListItem with @type and position
 */
export function processBreadcrumbItem(
  item: BreadcrumbListItem,
  position: number,
): ListItem {
  return {
    "@type": SCHEMA_TYPES.LIST_ITEM,
    position,
    ...(item.name && { name: item.name }),
    ...(item.item && { item: item.item }),
  };
}

/**
 * Processes location/place into Place schema type
 * @param location - String location or Place object
 * @returns Place with @type
 */
export function processPlace(
  location: string | Place | Omit<Place, "@type">,
): Place {
  return processSchemaType<Place>(
    location,
    SCHEMA_TYPES.PLACE,
    (str) => ({
      name: str,
      address: {
        "@type": SCHEMA_TYPES.POSTAL_ADDRESS,
        streetAddress: str,
      },
    }),
    undefined,
  );
}

/**
 * Processes performer into Person or PerformingGroup schema type
 * @param performer - String name or Performer object
 * @returns Person or PerformingGroup with @type
 */
export function processPerformer(
  performer: Performer,
): Person | PerformingGroup {
  if (isString(performer)) {
    return {
      "@type": SCHEMA_TYPES.PERFORMING_GROUP,
      name: performer,
    };
  }

  if (hasType<Person | PerformingGroup>(performer)) {
    return performer;
  }

  // Check for Person-specific properties
  const hasPersonProperties =
    "familyName" in performer ||
    "givenName" in performer ||
    "additionalName" in performer;

  return hasPersonProperties
    ? ({ "@type": SCHEMA_TYPES.PERSON, ...performer } as Person)
    : ({
        "@type": SCHEMA_TYPES.PERFORMING_GROUP,
        ...performer,
      } as PerformingGroup);
}

/**
 * Processes organizer into Person or Organization schema type
 * @param organizer - String name or Organizer object
 * @returns Person or Organization with @type
 */
export function processOrganizer(organizer: Organizer): Person | Organization {
  if (isString(organizer)) {
    return {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: organizer,
    };
  }

  if (hasType<Person | Organization>(organizer)) {
    return organizer;
  }

  // Check for Person-specific properties
  const hasPersonProperties =
    "familyName" in organizer ||
    "givenName" in organizer ||
    "additionalName" in organizer;

  return hasPersonProperties
    ? ({ "@type": SCHEMA_TYPES.PERSON, ...organizer } as Person)
    : ({ "@type": SCHEMA_TYPES.ORGANIZATION, ...organizer } as Organization);
}

/**
 * Processes generic organization input into Organization schema type
 * @param org - String name or Organization object
 * @returns Organization with @type and processed nested fields
 */
export function processOrganization(
  org: string | Organization | Omit<Organization, "@type">,
): Organization {
  if (isString(org)) {
    return {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: org,
    };
  }

  const processed = processSchemaType<Organization>(
    org,
    SCHEMA_TYPES.ORGANIZATION,
  );

  // Process nested fields if present
  processOrganizationFields(processed);

  return processed;
}

/**
 * Processes offer into Offer schema type
 * @param offer - Offer object with or without @type
 * @returns Offer with @type
 */
export function processOffer(offer: Offer | Omit<Offer, "@type">): Offer {
  return processSchemaType<Offer>(offer, SCHEMA_TYPES.OFFER);
}

/**
 * Processes publisher into Person or Organization schema type
 * @param publisher - String name, Person, or Organization object
 * @returns Person or Organization with @type and processed nested fields
 */
export function processPublisher(
  publisher:
    | string
    | Organization
    | Person
    | Omit<Organization, "@type">
    | Omit<Person, "@type">,
): Person | Organization {
  if (isString(publisher)) {
    return {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: publisher,
    };
  }

  if (
    hasType<Organization>(publisher) &&
    publisher["@type"] === SCHEMA_TYPES.ORGANIZATION
  ) {
    const org = { ...publisher };
    processOrganizationFields(org);
    return org;
  }

  if (hasType<Person | Organization>(publisher)) {
    return publisher;
  }

  // Default to Organization for publishers
  const org: Organization = {
    "@type": SCHEMA_TYPES.ORGANIZATION,
    ...publisher,
  };
  processOrganizationFields(org);
  return org;
}

/**
 * Processes nutrition information into NutritionInformation schema type
 * @param nutrition - NutritionInformation object without @type
 * @returns NutritionInformation with @type
 */
export function processNutrition(
  nutrition: Omit<NutritionInformation, "@type">,
): NutritionInformation {
  return {
    "@type": SCHEMA_TYPES.NUTRITION_INFORMATION,
    ...nutrition,
  };
}

/**
 * Processes aggregate rating into AggregateRating schema type
 * @param rating - AggregateRating object with or without @type
 * @returns AggregateRating with @type
 */
export function processAggregateRating(
  rating: AggregateRating | Omit<AggregateRating, "@type">,
): AggregateRating {
  return processSchemaType<AggregateRating>(
    rating,
    SCHEMA_TYPES.AGGREGATE_RATING,
  );
}

type WebPage = {
  "@type": "WebPage";
  "@id": string;
};

/**
 * Processes main entity of page into string URL or WebPage schema type
 * @param mainEntityOfPage - String URL or WebPage object
 * @returns String URL or WebPage with @type
 */
export function processMainEntityOfPage(
  mainEntityOfPage: string | WebPage | Omit<WebPage, "@type">,
): string | WebPage {
  if (isString(mainEntityOfPage)) {
    return mainEntityOfPage;
  }

  return processSchemaType<WebPage>(mainEntityOfPage, SCHEMA_TYPES.WEB_PAGE);
}

/**
 * Processes simple monetary amount into MonetaryAmount schema type for return policies
 * @param amount - SimpleMonetaryAmount object with or without @type, or a number
 * @returns SimpleMonetaryAmount with @type or undefined
 */
export function processSimpleMonetaryAmount(
  amount:
    | number
    | SimpleMonetaryAmount
    | Omit<SimpleMonetaryAmount, "@type">
    | undefined,
): SimpleMonetaryAmount | undefined {
  if (!amount) return undefined;

  // Handle number input
  if (typeof amount === "number") {
    return {
      "@type": SCHEMA_TYPES.MONETARY_AMOUNT,
      value: amount,
      currency: "USD", // Default currency, should be overridden in component
    };
  }

  return processSchemaType<SimpleMonetaryAmount>(
    amount,
    SCHEMA_TYPES.MONETARY_AMOUNT,
  );
}

/**
 * Processes seasonal override into MerchantReturnPolicySeasonalOverride schema type
 * @param override - MerchantReturnPolicySeasonalOverride object with or without @type
 * @returns MerchantReturnPolicySeasonalOverride with @type
 */
export function processReturnPolicySeasonalOverride(
  override:
    | MerchantReturnPolicySeasonalOverride
    | Omit<MerchantReturnPolicySeasonalOverride, "@type">,
): MerchantReturnPolicySeasonalOverride {
  return processSchemaType<MerchantReturnPolicySeasonalOverride>(
    override,
    SCHEMA_TYPES.MERCHANT_RETURN_POLICY_SEASONAL_OVERRIDE,
  );
}

/**
 * Processes merchant return policy into MerchantReturnPolicy schema type
 * Enhanced to handle nested properties like MonetaryAmount and seasonal overrides
 * @param policy - MerchantReturnPolicy object with or without @type
 * @returns MerchantReturnPolicy with @type and processed nested properties
 */
export function processMerchantReturnPolicy(
  policy: MerchantReturnPolicy | Omit<MerchantReturnPolicy, "@type">,
): MerchantReturnPolicy {
  if (!policy) return policy as MerchantReturnPolicy;

  const processed = processSchemaType<MerchantReturnPolicy>(
    policy,
    SCHEMA_TYPES.MERCHANT_RETURN_POLICY,
  );

  // Normalize string values to arrays for consistency
  if (
    processed.applicableCountry &&
    !Array.isArray(processed.applicableCountry)
  ) {
    processed.applicableCountry = [processed.applicableCountry];
  }

  if (
    processed.returnPolicyCountry &&
    !Array.isArray(processed.returnPolicyCountry)
  ) {
    processed.returnPolicyCountry = [processed.returnPolicyCountry];
  }

  if (processed.returnMethod && !Array.isArray(processed.returnMethod)) {
    processed.returnMethod = [processed.returnMethod];
  }

  if (processed.refundType && !Array.isArray(processed.refundType)) {
    processed.refundType = [processed.refundType];
  }

  if (processed.itemCondition && !Array.isArray(processed.itemCondition)) {
    processed.itemCondition = [processed.itemCondition];
  }

  // Process nested MonetaryAmount fields
  if (processed.returnShippingFeesAmount) {
    processed.returnShippingFeesAmount = processSimpleMonetaryAmount(
      processed.returnShippingFeesAmount,
    );
  }

  if (processed.customerRemorseReturnShippingFeesAmount) {
    processed.customerRemorseReturnShippingFeesAmount =
      processSimpleMonetaryAmount(
        processed.customerRemorseReturnShippingFeesAmount,
      );
  }

  if (processed.itemDefectReturnShippingFeesAmount) {
    processed.itemDefectReturnShippingFeesAmount = processSimpleMonetaryAmount(
      processed.itemDefectReturnShippingFeesAmount,
    );
  }

  // Process restocking fee (can be number or SimpleMonetaryAmount)
  if (processed.restockingFee && typeof processed.restockingFee === "object") {
    processed.restockingFee = processSimpleMonetaryAmount(
      processed.restockingFee,
    );
  }

  // Process seasonal overrides
  if (processed.returnPolicySeasonalOverride) {
    if (Array.isArray(processed.returnPolicySeasonalOverride)) {
      processed.returnPolicySeasonalOverride =
        processed.returnPolicySeasonalOverride.map(
          processReturnPolicySeasonalOverride,
        );
    } else {
      processed.returnPolicySeasonalOverride =
        processReturnPolicySeasonalOverride(
          processed.returnPolicySeasonalOverride,
        );
    }
  }

  return processed;
}

/**
 * Processes tier requirement into appropriate schema type
 * @param requirement - Tier requirement that can be CreditCard, MonetaryAmount, UnitPriceSpecification, or string
 * @returns Processed tier requirement with @type
 */
export function processTierRequirement(
  requirement: TierRequirement,
): TierRequirement {
  if (!requirement) return requirement;

  // If it's a string, return as-is (text description)
  if (isString(requirement)) {
    return requirement;
  }

  // If it already has @type, return as-is
  if (hasType(requirement)) {
    return requirement;
  }

  // Determine type based on properties
  if ("priceCurrency" in requirement && "price" in requirement) {
    // UnitPriceSpecification has both price and priceCurrency
    if (
      "billingDuration" in requirement ||
      "billingIncrement" in requirement ||
      "unitCode" in requirement
    ) {
      return {
        "@type": SCHEMA_TYPES.UNIT_PRICE_SPECIFICATION,
        ...requirement,
      } as UnitPriceSpecification;
    }
  }

  if ("value" in requirement && "currency" in requirement) {
    // MonetaryAmount
    return {
      "@type": SCHEMA_TYPES.MONETARY_AMOUNT,
      ...requirement,
    } as SimpleMonetaryAmount;
  }

  if ("name" in requirement) {
    // CreditCard
    return {
      "@type": SCHEMA_TYPES.CREDIT_CARD,
      ...requirement,
    } as CreditCard;
  }

  // Default to returning as-is if we can't determine the type
  return requirement;
}

/**
 * Processes tier benefit, normalizing short names to full URLs
 * @param benefit - Tier benefit string or array
 * @returns Normalized tier benefit
 */
export function processTierBenefit(
  benefit: TierBenefit | TierBenefit[],
): TierBenefit | TierBenefit[] {
  const normalizeBenefit = (b: TierBenefit): TierBenefit => {
    // If it's already a full URL, return as-is
    if (b.startsWith("https://schema.org/")) {
      return b;
    }
    // Convert short name to full URL
    if (b === "TierBenefitLoyaltyPoints") {
      return "https://schema.org/TierBenefitLoyaltyPoints";
    }
    if (b === "TierBenefitLoyaltyPrice") {
      return "https://schema.org/TierBenefitLoyaltyPrice";
    }
    // Return as-is if unrecognized
    return b;
  };

  if (Array.isArray(benefit)) {
    return benefit.map(normalizeBenefit);
  }
  return normalizeBenefit(benefit);
}

/**
 * Processes membership points earned into QuantitativeValue
 * @param points - Number or QuantitativeValue
 * @returns QuantitativeValue with @type
 */
export function processMembershipPointsEarned(
  points: number | QuantitativeValue | Omit<QuantitativeValue, "@type">,
): QuantitativeValue {
  if (typeof points === "number") {
    return {
      "@type": SCHEMA_TYPES.QUANTITATIVE_VALUE,
      value: points,
    };
  }
  return processSchemaType<QuantitativeValue>(
    points,
    SCHEMA_TYPES.QUANTITATIVE_VALUE,
  );
}

/**
 * Processes member program tier into MemberProgramTier schema type
 * @param tier - MemberProgramTier with or without @type
 * @returns MemberProgramTier with @type
 */
export function processMemberProgramTier(
  tier: MemberProgramTier | Omit<MemberProgramTier, "@type">,
): MemberProgramTier {
  const processed = processSchemaType<MemberProgramTier>(
    tier,
    SCHEMA_TYPES.MEMBER_PROGRAM_TIER,
  );

  // Process hasTierBenefit
  if (processed.hasTierBenefit) {
    processed.hasTierBenefit = processTierBenefit(processed.hasTierBenefit);
  }

  // Process hasTierRequirement
  if (processed.hasTierRequirement) {
    processed.hasTierRequirement = processTierRequirement(
      processed.hasTierRequirement,
    );
  }

  // Process membershipPointsEarned
  if (processed.membershipPointsEarned !== undefined) {
    processed.membershipPointsEarned = processMembershipPointsEarned(
      processed.membershipPointsEarned,
    );
  }

  return processed;
}

/**
 * Processes member program into MemberProgram schema type
 * @param program - MemberProgram with or without @type
 * @returns MemberProgram with @type
 */
export function processMemberProgram(
  program: MemberProgram | Omit<MemberProgram, "@type">,
): MemberProgram {
  const processed = processSchemaType<MemberProgram>(
    program,
    SCHEMA_TYPES.MEMBER_PROGRAM,
  );

  // Process hasTiers
  if (processed.hasTiers) {
    if (Array.isArray(processed.hasTiers)) {
      processed.hasTiers = processed.hasTiers.map(processMemberProgramTier);
    } else {
      processed.hasTiers = processMemberProgramTier(processed.hasTiers);
    }
  }

  return processed;
}

/**
 * Processes video into VideoObject schema type
 * @param video - VideoObject with or without @type
 * @returns VideoObject with @type
 */
export function processVideo(
  video: VideoObject | Omit<VideoObject, "@type">,
): VideoObject {
  return processSchemaType<VideoObject>(video, SCHEMA_TYPES.VIDEO_OBJECT);
}

/**
 * Processes broadcast event into BroadcastEvent schema type
 * @param broadcast - BroadcastEvent with or without @type
 * @returns BroadcastEvent with @type
 */
export function processBroadcastEvent(
  broadcast: BroadcastEvent | Omit<BroadcastEvent, "@type">,
): BroadcastEvent {
  if (!broadcast) return broadcast as BroadcastEvent;

  if (typeof broadcast === "object" && !("@type" in broadcast)) {
    return {
      "@type": "BroadcastEvent",
      ...broadcast,
    };
  }

  return broadcast as BroadcastEvent;
}

/**
 * Processes clip into Clip schema type
 * @param clip - Clip with or without @type
 * @returns Clip with @type
 */
export function processClip(clip: Clip | Omit<Clip, "@type">): Clip {
  if (!clip) return clip as Clip;

  if (typeof clip === "object" && !("@type" in clip)) {
    return {
      "@type": "Clip",
      ...clip,
    };
  }

  return clip as Clip;
}

/**
 * Processes seek action into SeekToAction schema type
 * @param action - SeekToAction with or without @type
 * @returns SeekToAction with @type
 */
export function processSeekToAction(
  action: PotentialAction | Omit<PotentialAction, "@type">,
): PotentialAction {
  if (!action) return action as PotentialAction;

  if (typeof action === "object" && !("@type" in action)) {
    return {
      "@type": "SeekToAction",
      ...action,
    };
  }

  return action as PotentialAction;
}

/**
 * Processes instruction into string, HowToStep, or HowToSection schema type
 * @param instruction - String instruction or HowTo object
 * @returns String, HowToStep, or HowToSection with @type
 */
export function processInstruction(
  instruction:
    | string
    | HowToStep
    | HowToSection
    | Omit<HowToStep, "@type">
    | Omit<HowToSection, "@type">,
): string | HowToStep | HowToSection {
  if (isString(instruction)) {
    return instruction;
  }

  if (hasType<HowToStep | HowToSection>(instruction)) {
    // Process nested items if it's a section
    if (
      instruction["@type"] === SCHEMA_TYPES.HOW_TO_SECTION &&
      "itemListElement" in instruction
    ) {
      return {
        ...instruction,
        itemListElement: instruction.itemListElement.map((item) =>
          processInstruction(item),
        ),
      } as HowToSection;
    }
    return instruction;
  }

  // Determine type based on properties
  if ("itemListElement" in instruction) {
    return {
      "@type": SCHEMA_TYPES.HOW_TO_SECTION,
      ...instruction,
      itemListElement: instruction.itemListElement.map((item) =>
        processInstruction(item),
      ),
    } as HowToSection;
  }

  return {
    "@type": SCHEMA_TYPES.HOW_TO_STEP,
    ...instruction,
  } as HowToStep;
}

/**
 * Processes director into Person schema type
 * @param director - String name or Director object
 * @returns Person with @type
 */
export function processDirector(director: Director): Person {
  return processSchemaType<Person>(
    director,
    SCHEMA_TYPES.PERSON,
    (str) => ({ name: str }),
    undefined,
  );
}

// Dataset-specific processors

/**
 * Processes creator(s) into Person or Organization schema type(s)
 * @param creator - Author or array of Authors
 * @returns Person/Organization or array of them with @type
 */
export function processCreator(
  creator: Author | Author[],
): Person | Organization | (Person | Organization)[] {
  return Array.isArray(creator)
    ? creator.map(processAuthor)
    : processAuthor(creator);
}

/**
 * Processes identifier into string or PropertyValue schema type
 * @param identifier - String identifier or PropertyValue object
 * @returns String or PropertyValue with @type
 */
export function processIdentifier(
  identifier: string | PropertyValue | Omit<PropertyValue, "@type">,
): string | PropertyValue {
  if (isString(identifier)) {
    return identifier;
  }

  return processSchemaType<PropertyValue>(
    identifier,
    SCHEMA_TYPES.PROPERTY_VALUE,
  );
}

/**
 * Processes spatial coverage into string or Place schema type
 * @param spatial - String location or DatasetPlace object
 * @returns String or DatasetPlace with @type and processed geo
 */
export function processSpatialCoverage(
  spatial: string | DatasetPlace | Omit<DatasetPlace, "@type">,
): string | DatasetPlace {
  if (isString(spatial)) {
    return spatial;
  }

  const processed: DatasetPlace = processSchemaType<DatasetPlace>(
    spatial,
    SCHEMA_TYPES.PLACE,
  );

  // Process nested geo if present
  if (spatial.geo && typeof spatial.geo === "object" && !hasType(spatial.geo)) {
    if ("latitude" in spatial.geo && "longitude" in spatial.geo) {
      processed.geo = processSchemaType<GeoCoordinates>(
        spatial.geo,
        SCHEMA_TYPES.GEO_COORDINATES,
      );
    } else if (
      "box" in spatial.geo ||
      "circle" in spatial.geo ||
      "line" in spatial.geo ||
      "polygon" in spatial.geo
    ) {
      processed.geo = processSchemaType<GeoShape>(
        spatial.geo,
        SCHEMA_TYPES.GEO_SHAPE,
      );
    }
  }

  return processed;
}

/**
 * Processes data download into DataDownload schema type
 * @param download - DataDownload object with or without @type
 * @returns DataDownload with @type
 */
export function processDataDownload(
  download: DataDownload | Omit<DataDownload, "@type">,
): DataDownload {
  return processSchemaType<DataDownload>(download, SCHEMA_TYPES.DATA_DOWNLOAD);
}

/**
 * Processes license into string URL or CreativeWork schema type
 * @param license - String URL or CreativeWork object
 * @returns String URL or CreativeWork with @type
 */
export function processLicense(
  license: string | CreativeWork | Omit<CreativeWork, "@type">,
): string | CreativeWork {
  if (isString(license)) {
    return license;
  }

  return processSchemaType<CreativeWork>(license, SCHEMA_TYPES.CREATIVE_WORK);
}

/**
 * Processes data catalog into DataCatalog schema type
 * @param catalog - DataCatalog object with or without @type
 * @returns DataCatalog with @type
 */
export function processDataCatalog(
  catalog: DataCatalog | Omit<DataCatalog, "@type">,
): DataCatalog {
  return processSchemaType<DataCatalog>(catalog, SCHEMA_TYPES.DATA_CATALOG);
}

// JobPosting-specific processors

/**
 * Processes hiring organization into Organization schema type
 * @param org - String name or Organization object
 * @returns Organization with @type and processed logo
 */
export function processHiringOrganization(
  org: string | Organization | Omit<Organization, "@type">,
): Organization {
  if (isString(org)) {
    return {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: org,
    };
  }

  const processed = processSchemaType<Organization>(
    org,
    SCHEMA_TYPES.ORGANIZATION,
  );

  // Process nested logo if present
  if (processed.logo && !isString(processed.logo)) {
    processed.logo = processImage(processed.logo);
  }

  return processed;
}

/**
 * Processes job location into Place schema type
 * @param location - String location or JobPlace object
 * @returns JobPlace with @type and processed address
 */
export function processJobLocation(
  location: string | JobPlace | Omit<JobPlace, "@type">,
): JobPlace {
  if (isString(location)) {
    return {
      "@type": SCHEMA_TYPES.PLACE,
      address: {
        "@type": SCHEMA_TYPES.POSTAL_ADDRESS,
        streetAddress: location,
      },
    };
  }

  const processed = processSchemaType<JobPlace>(location, SCHEMA_TYPES.PLACE);

  // Process nested address
  if (processed.address && !isString(processed.address)) {
    processed.address = processAddress(processed.address);
  }

  return processed;
}

/**
 * Processes monetary amount into MonetaryAmount schema type
 * @param amount - MonetaryAmount object with or without @type
 * @returns MonetaryAmount with @type and processed value
 */
export function processMonetaryAmount(
  amount: MonetaryAmount | Omit<MonetaryAmount, "@type">,
): MonetaryAmount {
  const processed = processSchemaType<MonetaryAmount>(amount, "MonetaryAmount");

  // Process nested value as QuantitativeValue
  processed.value = processSchemaType<QuantitativeValue>(
    amount.value,
    SCHEMA_TYPES.QUANTITATIVE_VALUE,
  );

  return processed;
}

/**
 * Processes rating into Rating schema type
 * @param rating - Rating object with or without @type
 * @returns Rating with @type
 */
export function processRating(rating: Rating | Omit<Rating, "@type">): Rating {
  return processSchemaType<Rating>(rating, SCHEMA_TYPES.RATING);
}

/**
 * Processes job property value into PropertyValue schema type
 * @param identifier - String identifier or JobPropertyValue object
 * @returns JobPropertyValue with @type
 */
export function processJobPropertyValue(
  identifier: string | JobPropertyValue | Omit<JobPropertyValue, "@type">,
): JobPropertyValue {
  return processSchemaType<JobPropertyValue>(
    identifier,
    SCHEMA_TYPES.PROPERTY_VALUE,
    (str) => ({ value: str }),
    undefined,
  );
}

/**
 * Processes applicant location requirements into Country or State schema type
 * @param location - Location requirement object
 * @returns AdministrativeArea (Country or State) with @type
 */
export function processApplicantLocationRequirements(
  location: Omit<Country, "@type"> | Omit<State, "@type"> | Country | State,
): AdministrativeArea {
  if (hasType<Country | State>(location)) {
    return location;
  }

  // Improved detection logic
  const name = location.name;
  const statePatterns = [
    /\b[A-Z]{2}\b/, // Two-letter state codes
    /\bstate\b/i, // Contains "state"
    /,/, // Contains comma (often "City, State")
    /\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/, // US state codes
  ];

  const isState = statePatterns.some((pattern) => pattern.test(name));

  return {
    "@type": isState ? SCHEMA_TYPES.STATE : SCHEMA_TYPES.COUNTRY,
    ...location,
  } as AdministrativeArea;
}

/**
 * Processes education requirements into string or EducationalOccupationalCredential
 * @param education - String description or credential object
 * @returns String or EducationalOccupationalCredential with @type
 */
export function processEducationRequirements(
  education:
    | string
    | EducationalOccupationalCredential
    | Omit<EducationalOccupationalCredential, "@type">,
): string | EducationalOccupationalCredential {
  if (isString(education)) {
    return education;
  }

  return processSchemaType<EducationalOccupationalCredential>(
    education,
    SCHEMA_TYPES.EDUCATIONAL_CREDENTIAL,
  );
}

/**
 * Processes experience requirements into string or OccupationalExperienceRequirements
 * @param experience - String description or experience object
 * @returns String or OccupationalExperienceRequirements with @type
 */
export function processExperienceRequirements(
  experience:
    | string
    | OccupationalExperienceRequirements
    | Omit<OccupationalExperienceRequirements, "@type">,
): string | OccupationalExperienceRequirements {
  if (isString(experience)) {
    return experience;
  }

  return processSchemaType<OccupationalExperienceRequirements>(
    experience,
    SCHEMA_TYPES.OCCUPATIONAL_EXPERIENCE,
  );
}

// DiscussionForumPosting-specific processors

/**
 * Processes interaction statistic into InteractionCounter schema type
 * @param statistic - InteractionCounter object with or without @type
 * @returns InteractionCounter with @type
 */
export function processInteractionStatistic(
  statistic: InteractionCounter | Omit<InteractionCounter, "@type">,
): InteractionCounter {
  return processSchemaType<InteractionCounter>(
    statistic,
    SCHEMA_TYPES.INTERACTION_COUNTER,
  );
}

/**
 * Processes shared content into WebPage, ImageObject, or VideoObject schema type
 * @param content - SharedContent (string URL or object)
 * @returns ForumWebPage, ImageObject, or VideoObject with @type
 */
export function processSharedContent(
  content: SharedContent,
): ForumWebPage | ImageObject | VideoObject {
  if (isString(content)) {
    return {
      "@type": SCHEMA_TYPES.WEB_PAGE,
      url: content,
    };
  }

  if (hasType<ForumWebPage | ImageObject | VideoObject>(content)) {
    return content;
  }

  // Improved type detection
  const hasVideoProperties =
    "uploadDate" in content && "thumbnailUrl" in content;
  const hasImageProperties =
    "url" in content && ("width" in content || "height" in content);

  if (hasVideoProperties) {
    return processSchemaType<VideoObject>(content, SCHEMA_TYPES.VIDEO_OBJECT);
  }

  if (hasImageProperties) {
    return processSchemaType<ImageObject>(content, SCHEMA_TYPES.IMAGE_OBJECT);
  }

  // Default to WebPage
  return processSchemaType<ForumWebPage>(content, SCHEMA_TYPES.WEB_PAGE);
}

/**
 * Processes comment into Comment schema type with nested fields
 * @param comment - Comment object with or without @type
 * @returns Comment with @type and processed nested fields
 */
export function processComment(
  comment: Comment | Omit<Comment, "@type">,
): Comment {
  const processed: Comment = processSchemaType<Comment>(
    comment,
    SCHEMA_TYPES.COMMENT,
  );

  // Process nested fields
  if (comment.author) {
    processed.author = processAuthor(comment.author);
  }

  if (comment.image && !isString(comment.image)) {
    processed.image = processImage(comment.image);
  }

  if (comment.video) {
    processed.video = processVideo(comment.video);
  }

  if (comment.interactionStatistic) {
    processed.interactionStatistic = Array.isArray(comment.interactionStatistic)
      ? comment.interactionStatistic.map(processInteractionStatistic)
      : processInteractionStatistic(comment.interactionStatistic);
  }

  if (comment.sharedContent) {
    processed.sharedContent = processSharedContent(comment.sharedContent);
  }

  // Process nested comments recursively
  if (comment.comment) {
    processed.comment = comment.comment.map(processComment);
  }

  return processed;
}

/**
 * Processes isPartOf into string URL or CreativeWork schema type
 * @param isPartOf - String URL or ForumCreativeWork object
 * @returns String URL or ForumCreativeWork with @type
 */
export function processIsPartOf(
  isPartOf: string | ForumCreativeWork | Omit<ForumCreativeWork, "@type">,
): string | ForumCreativeWork {
  if (isString(isPartOf)) {
    return isPartOf;
  }

  return processSchemaType<ForumCreativeWork>(
    isPartOf,
    SCHEMA_TYPES.CREATIVE_WORK,
  );
}

// VacationRental-specific processors

/**
 * Processes brand into Brand or Organization schema type
 * @param brand - Brand or Organization object with or without @type
 * @returns Brand or Organization with @type
 */
export function processBrand(
  brand:
    | Brand
    | Organization
    | Omit<Brand, "@type">
    | Omit<Organization, "@type">,
): Brand | Organization {
  // If it already has a type, return as-is
  if ("@type" in brand) {
    return brand as Brand | Organization;
  }

  // Check if it has Organization-specific properties
  if ("logo" in brand || "address" in brand || "contactPoint" in brand) {
    const org: Organization = {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      ...brand,
    };
    processOrganizationFields(org);
    return org;
  }

  // Default to Brand
  return processSchemaType<Brand>(brand, SCHEMA_TYPES.BRAND);
}

/**
 * Processes bed details into BedDetails schema type
 * @param bed - BedDetails object with or without @type
 * @returns BedDetails with @type
 */
export function processBedDetails(
  bed: BedDetails | Omit<BedDetails, "@type">,
): BedDetails {
  return processSchemaType<BedDetails>(bed, SCHEMA_TYPES.BED_DETAILS);
}

/**
 * Processes location feature into LocationFeatureSpecification schema type
 * @param feature - LocationFeatureSpecification object with or without @type
 * @returns LocationFeatureSpecification with @type
 */
export function processLocationFeatureSpecification(
  feature:
    | LocationFeatureSpecification
    | Omit<LocationFeatureSpecification, "@type">,
): LocationFeatureSpecification {
  return processSchemaType<LocationFeatureSpecification>(
    feature,
    SCHEMA_TYPES.LOCATION_FEATURE,
  );
}

/**
 * Processes accommodation into Accommodation schema type with nested fields
 * @param accommodation - Accommodation object with or without @type
 * @returns Accommodation with @type and processed nested fields
 */
export function processAccommodation(
  accommodation: Accommodation | Omit<Accommodation, "@type">,
): Accommodation {
  const processed: Accommodation = processSchemaType<Accommodation>(
    accommodation,
    SCHEMA_TYPES.ACCOMMODATION,
  );

  // Process nested bed details
  if (accommodation.bed) {
    processed.bed = Array.isArray(accommodation.bed)
      ? accommodation.bed.map(processBedDetails)
      : processBedDetails(accommodation.bed);
  }

  // Process occupancy
  if (accommodation.occupancy) {
    processed.occupancy = processNumberOfEmployees(
      accommodation.occupancy,
    ) as QuantitativeValue;
  }

  // Process amenity features
  if (accommodation.amenityFeature) {
    processed.amenityFeature = Array.isArray(accommodation.amenityFeature)
      ? accommodation.amenityFeature.map(processLocationFeatureSpecification)
      : processLocationFeatureSpecification(accommodation.amenityFeature);
  }

  // Process floor size
  if (accommodation.floorSize) {
    processed.floorSize = processNumberOfEmployees(
      accommodation.floorSize,
    ) as QuantitativeValue;
  }

  return processed;
}

// Course-specific processors

/**
 * Processes provider into Organization schema type
 * @param provider - String name or Provider object
 * @returns Organization with @type
 */
export function processProvider(provider: Provider): Organization {
  return processSchemaType<Organization>(
    provider,
    SCHEMA_TYPES.ORGANIZATION,
    (str) => ({ name: str }),
    undefined,
  );
}

/**
 * Processes funder(s) into Person or Organization schema type(s)
 * @param funder - Author or array of Authors representing funders
 * @returns Person/Organization or array of them with @type
 */
export function processFunder(
  funder: Author | Author[],
): Person | Organization | (Person | Organization)[] {
  if (Array.isArray(funder)) {
    return funder.map(processFunderSingle);
  }
  return processFunderSingle(funder);
}

/**
 * Helper to process a single funder
 * @param funder - Author representing a funder
 * @returns Person or Organization with @type (defaults to Organization)
 */
function processFunderSingle(funder: Author): Person | Organization {
  if (isString(funder)) {
    return {
      "@type": SCHEMA_TYPES.ORGANIZATION,
      name: funder,
    };
  }

  if (hasType<Person | Organization>(funder)) {
    return funder;
  }

  // For funders without @type, default to Organization
  // (funding bodies are typically organizations)
  return {
    "@type": SCHEMA_TYPES.ORGANIZATION,
    ...funder,
  } as Organization;
}

// SoftwareApplication-specific processors

/**
 * Processes screenshot the same way as images
 * @param screenshot - URL string or ImageObject
 * @returns URL string or ImageObject with @type
 */
export function processScreenshot(
  screenshot: string | ImageObject | Omit<ImageObject, "@type">,
): string | ImageObject {
  return processImage(screenshot);
}

/**
 * Processes feature list - no transformation needed
 * @param features - String or array of strings
 * @returns String or array of strings as-is
 */
export function processFeatureList(
  features: string | string[],
): string | string[] {
  return features;
}

// ClaimReview-specific processors

/**
 * Processes claim review rating into ClaimReviewRating schema type
 * @param rating - Rating object with or without @type
 * @returns ClaimReviewRating with @type
 */
export function processClaimReviewRating(
  rating: ClaimReviewRating | Omit<ClaimReviewRating, "@type">,
): ClaimReviewRating {
  return processSchemaType<ClaimReviewRating>(rating, SCHEMA_TYPES.RATING);
}

/**
 * Processes claim into Claim schema type with nested fields
 * @param claim - Claim object with or without @type
 * @returns Claim with @type and processed nested fields
 */
export function processClaim(claim: Claim | Omit<Claim, "@type">): Claim {
  const processed: Claim = processSchemaType<Claim>(claim, SCHEMA_TYPES.CLAIM);

  // Process nested author
  if (claim.author) {
    processed.author = processAuthor(claim.author);
  }

  // Process appearance(s)
  if (claim.appearance) {
    if (Array.isArray(claim.appearance)) {
      processed.appearance = claim.appearance.map(processAppearance);
    } else {
      processed.appearance = processAppearance(claim.appearance);
    }
  }

  // Process firstAppearance
  if (claim.firstAppearance) {
    processed.firstAppearance = processAppearance(claim.firstAppearance);
  }

  return processed;
}

/**
 * Processes appearance into string URL or ClaimCreativeWork schema type
 * @param appearance - String URL or CreativeWork object
 * @returns String URL or ClaimCreativeWork with @type
 */
export function processAppearance(
  appearance: string | ClaimCreativeWork | Omit<ClaimCreativeWork, "@type">,
): string | ClaimCreativeWork {
  if (isString(appearance)) {
    return appearance;
  }

  const processed = processSchemaType<ClaimCreativeWork>(
    appearance,
    SCHEMA_TYPES.CREATIVE_WORK,
  );

  // Process nested fields
  if (appearance.author) {
    processed.author = processAuthor(appearance.author);
  }

  if (appearance.publisher && !isString(appearance.publisher)) {
    processed.publisher = processPublisher(appearance.publisher);
  }

  return processed;
}

/**
 * Processes WebPageElement for marking paywalled sections
 * @param element - WebPageElement object with or without @type
 * @returns WebPageElement with @type
 * @example
 * processWebPageElement({ isAccessibleForFree: false, cssSelector: ".paywall" })
 * // { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: ".paywall" }
 */
export function processWebPageElement(
  element: WebPageElement | Omit<WebPageElement, "@type">,
): WebPageElement {
  return processSchemaType<WebPageElement>(
    element,
    SCHEMA_TYPES.WEB_PAGE_ELEMENT,
  );
}

// Product-specific processors

/**
 * Processes product offer into ProductOffer schema type
 * @param offer - ProductOffer object with or without @type
 * @returns ProductOffer with @type and processed nested fields
 */
export function processProductOffer(
  offer: ProductOffer | Omit<ProductOffer, "@type">,
): ProductOffer {
  const processed: ProductOffer = processSchemaType<ProductOffer>(
    offer,
    SCHEMA_TYPES.OFFER,
  );

  // Process nested seller if present
  if (offer.seller) {
    processed.seller = processAuthor(offer.seller);
  }

  // Process nested priceSpecification if present
  if (offer.priceSpecification) {
    if (Array.isArray(offer.priceSpecification)) {
      processed.priceSpecification = offer.priceSpecification.map(
        processPriceSpecification,
      );
    } else {
      processed.priceSpecification = processPriceSpecification(
        offer.priceSpecification,
      );
    }
  }

  // Process nested hasMerchantReturnPolicy if present
  if (offer.hasMerchantReturnPolicy) {
    if (Array.isArray(offer.hasMerchantReturnPolicy)) {
      processed.hasMerchantReturnPolicy = offer.hasMerchantReturnPolicy.map(
        processMerchantReturnPolicy,
      );
    } else {
      processed.hasMerchantReturnPolicy = processMerchantReturnPolicy(
        offer.hasMerchantReturnPolicy,
      );
    }
  }

  // Process nested shippingDetails if present
  if (offer.shippingDetails) {
    if (Array.isArray(offer.shippingDetails)) {
      processed.shippingDetails = offer.shippingDetails.map(
        processOfferShippingDetails,
      );
    } else {
      processed.shippingDetails = processOfferShippingDetails(
        offer.shippingDetails,
      );
    }
  }

  return processed;
}

/**
 * Processes aggregate offer into AggregateOffer schema type
 * @param offer - AggregateOffer object with or without @type
 * @returns AggregateOffer with @type and processed nested offers
 */
export function processAggregateOffer(
  offer: AggregateOffer | Omit<AggregateOffer, "@type">,
): AggregateOffer {
  const processed: AggregateOffer = processSchemaType<AggregateOffer>(
    offer,
    SCHEMA_TYPES.AGGREGATE_OFFER,
  );

  // Process nested offers if present
  if (offer.offers) {
    processed.offers = offer.offers.map(processProductOffer);
  }

  return processed;
}

/**
 * Processes price specification into PriceSpecification or UnitPriceSpecification schema type
 * @param spec - PriceSpecification or UnitPriceSpecification object with or without @type
 * @returns PriceSpecification or UnitPriceSpecification with @type
 */
export function processPriceSpecification(
  spec:
    | PriceSpecification
    | UnitPriceSpecification
    | Omit<PriceSpecification, "@type">
    | Omit<UnitPriceSpecification, "@type">,
): PriceSpecification | UnitPriceSpecification {
  // Check if it's a UnitPriceSpecification
  if (
    "priceType" in spec ||
    "validForMemberTier" in spec ||
    "membershipPointsEarned" in spec ||
    "referenceQuantity" in spec
  ) {
    return processUnitPriceSpecification(
      spec as UnitPriceSpecification | Omit<UnitPriceSpecification, "@type">,
    );
  }
  return processSchemaType<PriceSpecification>(
    spec as PriceSpecification | Omit<PriceSpecification, "@type">,
    SCHEMA_TYPES.PRICE_SPECIFICATION,
  );
}

/**
 * Processes unit price specification into UnitPriceSpecification schema type
 * @param spec - UnitPriceSpecification object with or without @type
 * @returns UnitPriceSpecification with @type
 */
export function processUnitPriceSpecification(
  spec: UnitPriceSpecification | Omit<UnitPriceSpecification, "@type">,
): UnitPriceSpecification {
  const processed = processSchemaType<UnitPriceSpecification>(
    spec,
    SCHEMA_TYPES.UNIT_PRICE_SPECIFICATION,
  );

  // Process nested validForMemberTier if present
  if (spec.validForMemberTier) {
    if (Array.isArray(spec.validForMemberTier)) {
      processed.validForMemberTier = spec.validForMemberTier.map(
        processMemberProgramTier,
      );
    } else {
      processed.validForMemberTier = processMemberProgramTier(
        spec.validForMemberTier,
      );
    }
  }

  // Process nested referenceQuantity if present
  if (spec.referenceQuantity) {
    processed.referenceQuantity = processQuantitativeValue(
      spec.referenceQuantity,
    );
  }

  return processed;
}

/**
 * Processes QuantitativeValue into schema type
 * @param value - QuantitativeValue object with or without @type
 * @returns QuantitativeValue with @type
 */
export function processQuantitativeValue(
  value: QuantitativeValue | Omit<QuantitativeValue, "@type">,
): QuantitativeValue {
  const processed = processSchemaType<QuantitativeValue>(
    value,
    SCHEMA_TYPES.QUANTITATIVE_VALUE,
  );

  // Process nested valueReference if present
  if (value.valueReference) {
    processed.valueReference = processQuantitativeValue(value.valueReference);
  }

  return processed;
}

/**
 * Processes product item list into ProductItemList schema type
 * @param list - ProductItemList object with or without @type
 * @returns ProductItemList with @type and processed items
 */
export function processProductItemList(
  list: ProductItemList | Omit<ProductItemList, "@type">,
): ProductItemList {
  const processed: ProductItemList = processSchemaType<ProductItemList>(
    list,
    SCHEMA_TYPES.ITEM_LIST,
  );

  // Process nested list items
  if (list.itemListElement) {
    processed.itemListElement = list.itemListElement.map((item, index) => {
      const processedItem = processSchemaType<ProductListItem>(
        item,
        SCHEMA_TYPES.LIST_ITEM,
      );
      // Ensure position is set if not provided
      if (!processedItem.position) {
        processedItem.position = index + 1;
      }
      return processedItem;
    });
  }

  return processed;
}

/**
 * Processes product review into ProductReview schema type with pros/cons
 * @param review - ProductReview object with or without @type
 * @returns ProductReview with @type and processed nested fields
 */
export function processProductReview(
  review: ProductReview | Omit<ProductReview, "@type">,
): ProductReview {
  const processed: ProductReview = processSchemaType<ProductReview>(
    review,
    SCHEMA_TYPES.REVIEW,
  );

  // Process nested rating
  if (review.reviewRating) {
    processed.reviewRating = processSchemaType<Rating>(
      review.reviewRating,
      SCHEMA_TYPES.RATING,
    );
  }

  // Process nested author
  if (review.author) {
    processed.author = processAuthor(review.author);
  }

  // Process positive notes (pros)
  if (review.positiveNotes) {
    processed.positiveNotes = processProductItemList(review.positiveNotes);
  }

  // Process negative notes (cons)
  if (review.negativeNotes) {
    processed.negativeNotes = processProductItemList(review.negativeNotes);
  }

  return processed;
}

/**
 * Processes variesBy property to ensure full schema.org URLs
 * @param variesBy - Simple string or full URL, single or array
 * @returns Processed variesBy with full schema.org URLs
 */
export function processVariesBy(
  variesBy: VariesBy | VariesBy[],
): string | string[] {
  const processOne = (value: VariesBy): string => {
    // If it's already a full URL, return as-is
    if (value.startsWith("https://schema.org/")) {
      return value;
    }
    // Otherwise, prepend the schema.org URL
    return `https://schema.org/${value}`;
  };

  if (Array.isArray(variesBy)) {
    return variesBy.map(processOne);
  }
  return processOne(variesBy);
}

/**
 * Processes a product variant for use in ProductGroup
 * @param variant - Product object, simplified variant with just URL, or processed Product
 * @returns Product with @type or simplified variant object
 */
export function processProductVariant(
  variant:
    | Product
    | Omit<Product, "@type">
    | { url: string }
    | { "@type": "Product"; url: string },
): Product | { "@type": "Product"; url: string } | { url: string } {
  // If it's just a URL reference, return as-is
  if ("url" in variant && Object.keys(variant).length <= 2) {
    // It's a simple URL reference (with or without @type)
    return variant as { url: string } | { "@type": "Product"; url: string };
  }

  // It's a full Product variant
  const product = variant as Product | Omit<Product, "@type">;

  if ("@type" in product) {
    return product as Product;
  }

  const processed: Product = {
    "@type": SCHEMA_TYPES.PRODUCT,
    ...product,
  };

  // Process nested fields
  if (product.image) {
    processed.image = Array.isArray(product.image)
      ? product.image.map(processImage)
      : processImage(product.image);
  }

  if (product.brand) {
    if (typeof product.brand === "string") {
      processed.brand = {
        "@type": SCHEMA_TYPES.BRAND,
        name: product.brand,
      };
    } else {
      processed.brand = processBrand(product.brand);
    }
  }

  if (product.offers) {
    if (Array.isArray(product.offers)) {
      processed.offers = product.offers.map((offer) => {
        if ("lowPrice" in offer && "priceCurrency" in offer) {
          return processAggregateOffer(
            offer as Parameters<typeof processAggregateOffer>[0],
          );
        }
        return processProductOffer(
          offer as Parameters<typeof processProductOffer>[0],
        );
      });
    } else if (
      "lowPrice" in product.offers &&
      "priceCurrency" in product.offers
    ) {
      processed.offers = processAggregateOffer(
        product.offers as Parameters<typeof processAggregateOffer>[0],
      );
    } else {
      processed.offers = processProductOffer(
        product.offers as Parameters<typeof processProductOffer>[0],
      );
    }
  }

  if (product.review) {
    processed.review = Array.isArray(product.review)
      ? product.review.map(processProductReview)
      : processProductReview(product.review);
  }

  if (product.aggregateRating) {
    processed.aggregateRating = processAggregateRating(product.aggregateRating);
  }

  if (product.manufacturer) {
    processed.manufacturer = processAuthor(product.manufacturer);
  }

  // Process weight/dimensions - add @type if missing
  if (
    product.weight &&
    typeof product.weight === "object" &&
    !("@type" in product.weight)
  ) {
    processed.weight = { "@type": "QuantitativeValue", ...product.weight };
  }

  if (
    product.width &&
    typeof product.width === "object" &&
    !("@type" in product.width)
  ) {
    processed.width = { "@type": "QuantitativeValue", ...product.width };
  }

  if (
    product.height &&
    typeof product.height === "object" &&
    !("@type" in product.height)
  ) {
    processed.height = { "@type": "QuantitativeValue", ...product.height };
  }

  if (
    product.depth &&
    typeof product.depth === "object" &&
    !("@type" in product.depth)
  ) {
    processed.depth = { "@type": "QuantitativeValue", ...product.depth };
  }

  return processed;
}

/**
 * Processes certification into Certification schema type
 * @param cert - Certification object with or without @type
 * @returns Certification with @type
 */
export function processCertification(
  cert: Certification | Omit<Certification, "@type">,
): Certification {
  const processed = processSchemaType<Certification>(
    cert,
    SCHEMA_TYPES.CERTIFICATION,
  );

  // Process nested issuedBy as Organization
  if (cert.issuedBy) {
    if (typeof cert.issuedBy === "object" && !("@type" in cert.issuedBy)) {
      processed.issuedBy = {
        "@type": SCHEMA_TYPES.ORGANIZATION,
        ...cert.issuedBy,
      };
    } else {
      processed.issuedBy = cert.issuedBy;
    }
  }

  // Process nested certificationRating if present
  if (cert.certificationRating) {
    processed.certificationRating = processRating(cert.certificationRating);
  }

  return processed;
}

/**
 * Processes people audience into PeopleAudience schema type
 * @param audience - PeopleAudience object with or without @type
 * @returns PeopleAudience with @type
 */
export function processPeopleAudience(
  audience: PeopleAudience | Omit<PeopleAudience, "@type">,
): PeopleAudience {
  const processed = processSchemaType<PeopleAudience>(
    audience,
    SCHEMA_TYPES.PEOPLE_AUDIENCE,
  );

  // Process nested suggestedAge if present
  if (audience.suggestedAge) {
    processed.suggestedAge = processQuantitativeValue(audience.suggestedAge);
  }

  return processed;
}

/**
 * Processes size specification into SizeSpecification schema type
 * @param size - String or SizeSpecification object with or without @type
 * @returns SizeSpecification with @type or string
 */
export function processSizeSpecification(
  size: string | SizeSpecification | Omit<SizeSpecification, "@type">,
): string | SizeSpecification {
  if (typeof size === "string") {
    return size;
  }
  return processSchemaType<SizeSpecification>(
    size,
    SCHEMA_TYPES.SIZE_SPECIFICATION,
  );
}

/**
 * Processes 3D model into ThreeDModel schema type
 * @param model - ThreeDModel object with or without @type
 * @returns ThreeDModel with @type
 */
export function processThreeDModel(
  model: ThreeDModel | Omit<ThreeDModel, "@type">,
): ThreeDModel {
  const processed = processSchemaType<ThreeDModel>(
    model,
    SCHEMA_TYPES.THREE_D_MODEL,
  );

  // Process nested encoding if present
  if (model.encoding && !("@type" in model.encoding)) {
    processed.encoding = {
      "@type": "MediaObject",
      ...model.encoding,
    };
  }

  return processed;
}

/**
 * Processes defined region into DefinedRegion schema type
 * @param region - DefinedRegion object with or without @type
 * @returns DefinedRegion with @type
 */
export function processDefinedRegion(
  region: DefinedRegion | Omit<DefinedRegion, "@type">,
): DefinedRegion {
  return processSchemaType<DefinedRegion>(region, SCHEMA_TYPES.DEFINED_REGION);
}

/**
 * Processes shipping delivery time into ShippingDeliveryTime schema type
 * @param time - ShippingDeliveryTime object with or without @type
 * @returns ShippingDeliveryTime with @type
 */
export function processShippingDeliveryTime(
  time: ShippingDeliveryTime | Omit<ShippingDeliveryTime, "@type">,
): ShippingDeliveryTime {
  const processed = processSchemaType<ShippingDeliveryTime>(
    time,
    SCHEMA_TYPES.SHIPPING_DELIVERY_TIME,
  );

  // Process nested handlingTime if present
  if (time.handlingTime) {
    processed.handlingTime = processQuantitativeValue(time.handlingTime);
  }

  // Process nested transitTime if present
  if (time.transitTime) {
    processed.transitTime = processQuantitativeValue(time.transitTime);
  }

  return processed;
}

/**
 * Processes offer shipping details into OfferShippingDetails schema type
 * @param details - OfferShippingDetails object with or without @type
 * @returns OfferShippingDetails with @type
 */
export function processOfferShippingDetails(
  details: OfferShippingDetails | Omit<OfferShippingDetails, "@type">,
): OfferShippingDetails {
  const processed = processSchemaType<OfferShippingDetails>(
    details,
    SCHEMA_TYPES.OFFER_SHIPPING_DETAILS,
  );

  // Process nested shippingRate if present
  if (details.shippingRate) {
    processed.shippingRate = processSimpleMonetaryAmount(details.shippingRate);
  }

  // Process nested shippingDestination if present
  if (details.shippingDestination) {
    if (Array.isArray(details.shippingDestination)) {
      processed.shippingDestination =
        details.shippingDestination.map(processDefinedRegion);
    } else {
      processed.shippingDestination = processDefinedRegion(
        details.shippingDestination,
      );
    }
  }

  // Process nested deliveryTime if present
  if (details.deliveryTime) {
    processed.deliveryTime = processShippingDeliveryTime(details.deliveryTime);
  }

  return processed;
}

// Review/AggregateRating-specific processors

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

type ItemReviewedInput =
  | string
  | ({ name: string; "@type"?: ItemReviewedType } & Record<string, unknown>);

/**
 * Processes itemReviewed into a specific schema type if possible, otherwise Thing
 * @param itemReviewed - String name or object with optional @type
 * @param defaultType - Optional default @type to apply when missing
 */
export function processItemReviewed(
  itemReviewed: ItemReviewedInput,
  defaultType?: ItemReviewedType | "Thing",
): Record<string, unknown> {
  if (isString(itemReviewed)) {
    return { "@type": defaultType || "Thing", name: itemReviewed };
  }

  if (
    typeof itemReviewed === "object" &&
    itemReviewed !== null &&
    "@type" in itemReviewed
  ) {
    return itemReviewed as Record<string, unknown>;
  }

  // Try light heuristics if no @type present
  const candidate: Record<string, unknown> = {
    ...(itemReviewed as Record<string, unknown>),
  };
  const inferType = (): ItemReviewedType | "Thing" => {
    if (defaultType) return defaultType;
    if ("brand" in candidate || "sku" in candidate) return "Product";
    if ("recipeIngredient" in candidate || "recipeInstructions" in candidate)
      return "Recipe";
    if ("servesCuisine" in candidate || "address" in candidate)
      return "LocalBusiness";
    if ("applicationCategory" in candidate || "operatingSystem" in candidate)
      return "SoftwareApplication";
    if ("director" in candidate || "actor" in candidate) return "Movie";
    if ("provider" in candidate) return "Course";
    return "Thing";
  };

  return { "@type": inferType(), ...candidate };
}
