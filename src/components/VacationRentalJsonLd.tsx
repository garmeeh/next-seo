import { JsonLdScript } from "~/core/JsonLdScript";
import type { VacationRentalJsonLdProps } from "~/types/vacationrental.types";
import {
  processImage,
  processAddress,
  processAggregateRating,
  processBrand,
  processAccommodation,
  processReview,
} from "~/utils/processors";

export default function VacationRentalJsonLd({
  scriptId,
  scriptKey,
  containsPlace,
  identifier,
  image,
  latitude,
  longitude,
  name,
  additionalType,
  address,
  aggregateRating,
  brand,
  checkinTime,
  checkoutTime,
  description,
  knowsLanguage,
  review,
  geo,
}: VacationRentalJsonLdProps) {
  // Process images - minimum 8 required
  const processedImages = Array.isArray(image)
    ? image.map(processImage)
    : [processImage(image)];

  // Use geo coordinates if provided, otherwise use latitude/longitude
  const finalLatitude = geo?.latitude ?? latitude;
  const finalLongitude = geo?.longitude ?? longitude;

  const data = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    containsPlace: processAccommodation(containsPlace),
    identifier,
    image: processedImages,
    latitude: finalLatitude,
    longitude: finalLongitude,
    name,
    ...(additionalType && { additionalType }),
    ...(address && { address: processAddress(address) }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(brand && { brand: processBrand(brand) }),
    ...(checkinTime && { checkinTime }),
    ...(checkoutTime && { checkoutTime }),
    ...(description && { description }),
    ...(knowsLanguage && {
      knowsLanguage: Array.isArray(knowsLanguage)
        ? knowsLanguage
        : [knowsLanguage],
    }),
    ...(review && {
      review: Array.isArray(review)
        ? review.map(processReview)
        : processReview(review),
    }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "vacationrental-jsonld"}
    />
  );
}

export type { VacationRentalJsonLdProps };
