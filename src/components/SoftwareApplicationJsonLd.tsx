import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  SoftwareApplicationJsonLdProps,
  ApplicationType,
  VideoGameCoTyped,
} from "~/types/softwareApplication.types";
import {
  processAuthor,
  processImage,
  processPublisher,
  processAggregateRating,
  processReview,
  processOffer,
  processScreenshot,
  processFeatureList,
} from "~/utils/processors";

export default function SoftwareApplicationJsonLd({
  type = "SoftwareApplication",
  scriptId,
  scriptKey,
  name,
  description,
  url,
  image,
  applicationCategory,
  applicationSubCategory,
  applicationSuite,
  operatingSystem,
  memoryRequirements,
  processorRequirements,
  storageRequirements,
  availableOnDevice,
  downloadUrl,
  installUrl,
  countriesSupported,
  countriesNotSupported,
  permissions,
  softwareVersion,
  releaseNotes,
  screenshot,
  featureList,
  offers,
  aggregateRating,
  review,
  author,
  publisher,
  datePublished,
  dateModified,
}: SoftwareApplicationJsonLdProps) {
  // Determine the actual @type to use
  let schemaType: ApplicationType | VideoGameCoTyped;
  if (Array.isArray(type)) {
    // VideoGame co-typed with another application type
    schemaType = type;
  } else {
    schemaType = type;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": schemaType,
    // Required properties
    ...(name && { name }),
    // Conditionally include properties
    ...(description && { description }),
    ...(url && { url }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(applicationCategory && { applicationCategory }),
    ...(applicationSubCategory && { applicationSubCategory }),
    ...(applicationSuite && { applicationSuite }),
    ...(operatingSystem && { operatingSystem }),
    ...(memoryRequirements && { memoryRequirements }),
    ...(processorRequirements && { processorRequirements }),
    ...(storageRequirements && { storageRequirements }),
    ...(availableOnDevice && { availableOnDevice }),
    ...(downloadUrl && { downloadUrl }),
    ...(installUrl && { installUrl }),
    ...(countriesSupported && {
      countriesSupported: Array.isArray(countriesSupported)
        ? countriesSupported
        : countriesSupported,
    }),
    ...(countriesNotSupported && {
      countriesNotSupported: Array.isArray(countriesNotSupported)
        ? countriesNotSupported
        : countriesNotSupported,
    }),
    ...(permissions && {
      permissions: processFeatureList(permissions),
    }),
    ...(softwareVersion && { softwareVersion }),
    ...(releaseNotes && { releaseNotes }),
    ...(screenshot && {
      screenshot: Array.isArray(screenshot)
        ? screenshot.map(processScreenshot)
        : processScreenshot(screenshot),
    }),
    ...(featureList && {
      featureList: processFeatureList(featureList),
    }),
    ...(offers && {
      offers: Array.isArray(offers)
        ? offers.map(processOffer)
        : processOffer(offers),
    }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(review && {
      review: Array.isArray(review)
        ? review.map(processReview)
        : processReview(review),
    }),
    ...(author && {
      author: processAuthor(author),
    }),
    ...(publisher && {
      publisher: processPublisher(publisher),
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    // Apply defaults where appropriate
    ...(!dateModified && datePublished && { dateModified: datePublished }),
  };

  // Generate a unique key based on the type
  const typeKey = Array.isArray(schemaType)
    ? schemaType.join("-").toLowerCase()
    : schemaType.toLowerCase();

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || `software-application-jsonld-${typeKey}`}
    />
  );
}

export type { SoftwareApplicationJsonLdProps };
