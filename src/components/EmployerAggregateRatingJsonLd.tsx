import { JsonLdScript } from "~/core/JsonLdScript";
import type { EmployerAggregateRatingJsonLdProps } from "~/types/employer-aggregate-rating.types";
import type { Organization } from "~/types/common.types";
import {
  processAddress,
  processContactPoint,
  processLogo,
  processNumberOfEmployees,
} from "~/utils/processors";

function processEmployerItemReviewed(
  itemReviewed: string | Organization | Omit<Organization, "@type">,
): Organization {
  if (typeof itemReviewed === "string") {
    return {
      "@type": "Organization",
      name: itemReviewed,
    };
  }

  // Start with base organization
  const org: Organization = {
    "@type": "Organization",
    ...itemReviewed,
  };

  // Process nested properties if present
  if (
    "logo" in itemReviewed &&
    itemReviewed.logo &&
    typeof itemReviewed.logo !== "string"
  ) {
    org.logo = processLogo(itemReviewed.logo);
  }

  if ("address" in itemReviewed && itemReviewed.address) {
    if (Array.isArray(itemReviewed.address)) {
      org.address = itemReviewed.address.map((addr) =>
        typeof addr === "string" ? addr : processAddress(addr),
      );
    } else if (typeof itemReviewed.address !== "string") {
      org.address = processAddress(itemReviewed.address);
    }
  }

  if ("contactPoint" in itemReviewed && itemReviewed.contactPoint) {
    if (Array.isArray(itemReviewed.contactPoint)) {
      org.contactPoint = itemReviewed.contactPoint.map(processContactPoint);
    } else {
      org.contactPoint = processContactPoint(itemReviewed.contactPoint);
    }
  }

  if ("numberOfEmployees" in itemReviewed && itemReviewed.numberOfEmployees) {
    org.numberOfEmployees = processNumberOfEmployees(
      itemReviewed.numberOfEmployees,
    );
  }

  return org;
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
