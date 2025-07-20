import { JsonLdScript } from "~/core/JsonLdScript";
import type { LocalBusinessJsonLdProps } from "~/types/localbusiness.types";
import {
  processAddress,
  processImage,
  processGeo,
  processOpeningHours,
  processReview,
  processAggregateRating,
} from "~/utils/processors";

function processDepartment(
  department: LocalBusinessJsonLdProps,
): Record<string, unknown> {
  return {
    "@type": department.type || "LocalBusiness",
    ...(department.name && { name: department.name }),
    ...(department.address && {
      address: Array.isArray(department.address)
        ? department.address.map(processAddress)
        : processAddress(department.address),
    }),
    ...(department.url && { url: department.url }),
    ...(department.telephone && { telephone: department.telephone }),
    ...(department.image && {
      image: Array.isArray(department.image)
        ? department.image.map(processImage)
        : processImage(department.image),
    }),
    ...(department.priceRange && { priceRange: department.priceRange }),
    ...(department.geo && { geo: processGeo(department.geo) }),
    ...(department.openingHoursSpecification && {
      openingHoursSpecification: Array.isArray(
        department.openingHoursSpecification,
      )
        ? department.openingHoursSpecification.map(processOpeningHours)
        : processOpeningHours(department.openingHoursSpecification),
    }),
    ...(department.review && {
      review: Array.isArray(department.review)
        ? department.review.map(processReview)
        : processReview(department.review),
    }),
    ...(department.aggregateRating && {
      aggregateRating: processAggregateRating(department.aggregateRating),
    }),
    ...(department.menu && { menu: department.menu }),
    ...(department.servesCuisine && {
      servesCuisine: Array.isArray(department.servesCuisine)
        ? department.servesCuisine
        : [department.servesCuisine],
    }),
    ...(department.sameAs && {
      sameAs: Array.isArray(department.sameAs)
        ? department.sameAs
        : [department.sameAs],
    }),
    ...(department.branchOf && { branchOf: department.branchOf }),
    ...(department.currenciesAccepted && {
      currenciesAccepted: department.currenciesAccepted,
    }),
    ...(department.paymentAccepted && {
      paymentAccepted: department.paymentAccepted,
    }),
    ...(department.areaServed && {
      areaServed: Array.isArray(department.areaServed)
        ? department.areaServed
        : [department.areaServed],
    }),
    ...(department.email && { email: department.email }),
    ...(department.faxNumber && { faxNumber: department.faxNumber }),
    ...(department.slogan && { slogan: department.slogan }),
    ...(department.description && { description: department.description }),
    ...(department.publicAccess !== undefined && {
      publicAccess: department.publicAccess,
    }),
    ...(department.smokingAllowed !== undefined && {
      smokingAllowed: department.smokingAllowed,
    }),
    ...(department.isAccessibleForFree !== undefined && {
      isAccessibleForFree: department.isAccessibleForFree,
    }),
  };
}

export default function LocalBusinessJsonLd({
  type = "LocalBusiness",
  scriptId,
  scriptKey,
  name,
  address,
  url,
  telephone,
  image,
  priceRange,
  geo,
  openingHoursSpecification,
  review,
  aggregateRating,
  department,
  menu,
  servesCuisine,
  sameAs,
  branchOf,
  currenciesAccepted,
  paymentAccepted,
  areaServed,
  email,
  faxNumber,
  slogan,
  description,
  publicAccess,
  smokingAllowed,
  isAccessibleForFree,
}: LocalBusinessJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    address: Array.isArray(address)
      ? address.map(processAddress)
      : processAddress(address),
    ...(url && { url }),
    ...(telephone && { telephone }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processImage)
        : processImage(image),
    }),
    ...(priceRange && { priceRange }),
    ...(geo && { geo: processGeo(geo) }),
    ...(openingHoursSpecification && {
      openingHoursSpecification: Array.isArray(openingHoursSpecification)
        ? openingHoursSpecification.map(processOpeningHours)
        : processOpeningHours(openingHoursSpecification),
    }),
    ...(review && {
      review: Array.isArray(review)
        ? review.map(processReview)
        : processReview(review),
    }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(department && {
      department: Array.isArray(department)
        ? department.map(processDepartment)
        : processDepartment(department),
    }),
    ...(menu && { menu }),
    ...(servesCuisine && {
      servesCuisine: Array.isArray(servesCuisine)
        ? servesCuisine
        : [servesCuisine],
    }),
    ...(sameAs && {
      sameAs: Array.isArray(sameAs) ? sameAs : [sameAs],
    }),
    ...(branchOf && { branchOf }),
    ...(currenciesAccepted && { currenciesAccepted }),
    ...(paymentAccepted && { paymentAccepted }),
    ...(areaServed && {
      areaServed: Array.isArray(areaServed) ? areaServed : [areaServed],
    }),
    ...(email && { email }),
    ...(faxNumber && { faxNumber }),
    ...(slogan && { slogan }),
    ...(description && { description }),
    ...(publicAccess !== undefined && { publicAccess }),
    ...(smokingAllowed !== undefined && { smokingAllowed }),
    ...(isAccessibleForFree !== undefined && { isAccessibleForFree }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={
        scriptKey ||
        `localbusiness-jsonld-${Array.isArray(type) ? type.join("-") : type}`
      }
    />
  );
}

export type { LocalBusinessJsonLdProps };
