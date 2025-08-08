import { JsonLdScript } from "~/core/JsonLdScript";
import type { AggregateRatingJsonLdProps } from "~/types/review.types";
import { processItemReviewed } from "~/utils/processors";

export default function AggregateRatingJsonLd({
  scriptId,
  scriptKey,
  itemReviewed,
  ratingValue,
  ratingCount,
  reviewCount,
  bestRating,
  worstRating,
}: AggregateRatingJsonLdProps) {
  if (!itemReviewed) {
    throw new Error(
      "AggregateRating requires itemReviewed when used standalone",
    );
  }
  if (!ratingCount && !reviewCount) {
    throw new Error(
      "AggregateRating requires at least one of ratingCount or reviewCount",
    );
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: processItemReviewed(itemReviewed),
    ratingValue,
    ...(ratingCount !== undefined && { ratingCount }),
    ...(reviewCount !== undefined && { reviewCount }),
    ...(bestRating !== undefined && { bestRating }),
    ...(worstRating !== undefined && { worstRating }),
  } as const;

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "aggregaterating-jsonld"}
    />
  );
}

export type { AggregateRatingJsonLdProps };
