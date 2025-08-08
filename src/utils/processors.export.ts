/**
 * Public API for custom component creation
 * These processors help maintain the @type optional pattern
 * and provide flexible input handling for structured data
 */

// Core utility for generic schema type processing
export { processSchemaType } from "./processors";

// People & Organizations
export {
  processAuthor,
  processPublisher,
  processOrganization,
  processOrganizer,
  processPerformer,
  processDirector,
  processCreator,
  processFunder,
  processProvider,
  processHiringOrganization,
} from "./processors";

// Media & Content
export {
  processImage,
  processVideo,
  processLogo,
  processScreenshot,
  processClip,
  processBroadcastEvent,
  processSeekToAction,
  processThreeDModel,
} from "./processors";

// Locations & Places
export {
  processAddress,
  processPlace,
  processGeo,
  processJobLocation,
  processSpatialCoverage,
  processApplicantLocationRequirements,
  processDefinedRegion,
} from "./processors";

// Commerce & Offers
export {
  processOffer,
  processProductOffer,
  processAggregateOffer,
  processMerchantReturnPolicy,
  processReturnPolicySeasonalOverride,
  processPriceSpecification,
  processUnitPriceSpecification,
  processSimpleMonetaryAmount,
  processMonetaryAmount,
  processOfferShippingDetails,
  processShippingDeliveryTime,
} from "./processors";

// Reviews & Ratings
export {
  processReview,
  processProductReview,
  processAggregateRating,
  processRating,
  processClaimReviewRating,
  processItemReviewed,
} from "./processors";

// Structured Content
export {
  processInstruction,
  processNutrition,
  processBreadcrumbItem,
  processComment,
  processWebPageElement,
  processCertification,
} from "./processors";

// Membership & Loyalty
export {
  processMemberProgram,
  processMemberProgramTier,
  processTierRequirement,
  processTierBenefit,
  processMembershipPointsEarned,
} from "./processors";

// Specifications & Values
export {
  processQuantitativeValue,
  processNumberOfEmployees,
  processContactPoint,
  processOpeningHours,
  processJobPropertyValue,
  processIdentifier,
  processPeopleAudience,
  processSizeSpecification,
} from "./processors";

// Products
export {
  processProductVariant,
  processVariesBy,
  processBrand,
  processProductItemList,
} from "./processors";

// Education & Requirements
export {
  processEducationRequirements,
  processExperienceRequirements,
} from "./processors";

// Data & Creative Works
export {
  processLicense,
  processDataDownload,
  processDataCatalog,
  processIsPartOf,
  processMainEntityOfPage,
  processAppearance,
  processSharedContent,
  processClaim,
} from "./processors";

// Accommodation & Rental
export {
  processAccommodation,
  processBedDetails,
  processLocationFeatureSpecification,
} from "./processors";

// Interaction & Statistics
export { processInteractionStatistic, processFeatureList } from "./processors";

// Re-export types that users might need
export type { ItemReviewedType } from "./processors";
