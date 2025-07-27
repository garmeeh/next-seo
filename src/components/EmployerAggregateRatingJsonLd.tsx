import { JsonLdScript } from "~/core/JsonLdScript";
import type { EmployerAggregateRatingJsonLdProps } from "~/types/employer-aggregate-rating.types";
import type { Organization } from "~/types/common.types";

function processEmployerItemReviewed(
  itemReviewed: string | Organization | Omit<Organization, "@type">,
): Organization {
  if (typeof itemReviewed === "string") {
    return {
      "@type": "Organization",
      name: itemReviewed,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in itemReviewed) {
    return itemReviewed as Organization;
  }

  // No @type - add it
  return {
    "@type": "Organization",
    ...itemReviewed,
  } as Organization;
}

export default function EmployerAggregateRatingJsonLd({
  scriptId,
  scriptKey,
  itemReviewed,
  ratingValue,
  ratingCount,
  reviewCount,
  bestRating,
  worstRating,
}: EmployerAggregateRatingJsonLdProps) {
  // Validate that at least one of ratingCount or reviewCount is provided
  if (!ratingCount && !reviewCount) {
    throw new Error(
      "EmployerAggregateRating requires at least one of ratingCount or reviewCount",
    );
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "EmployerAggregateRating",
    itemReviewed: processEmployerItemReviewed(itemReviewed),
    ratingValue,
    ...(ratingCount && { ratingCount }),
    ...(reviewCount && { reviewCount }),
    ...(bestRating !== undefined && { bestRating }),
    ...(worstRating !== undefined && { worstRating }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "employer-aggregate-rating-jsonld"}
    />
  );
}

export type { EmployerAggregateRatingJsonLdProps };
