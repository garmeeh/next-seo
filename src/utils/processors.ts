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
} from "~/types/common.types";
import type { BreadcrumbListItem, ListItem } from "~/types/breadcrumb.types";

export function processAuthor(author: Author): Person | Organization {
  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: author,
    };
  }
  return author;
}

export function processImage(
  image: string | ImageObject,
): string | ImageObject {
  if (typeof image === "string") {
    return image;
  }
  return image;
}

export function processAddress(address: string | PostalAddress): PostalAddress {
  if (typeof address === "string") {
    return {
      "@type": "PostalAddress",
      streetAddress: address,
    };
  }
  return address;
}

export function processContactPoint(contactPoint: ContactPoint): ContactPoint {
  return {
    ...contactPoint,
    "@type": "ContactPoint",
  };
}

export function processLogo(logo: string | ImageObject): string | ImageObject {
  // Logo processing is same as image processing
  return processImage(logo);
}

export function processNumberOfEmployees(
  numberOfEmployees: number | QuantitativeValue,
): QuantitativeValue {
  if (typeof numberOfEmployees === "number") {
    return {
      "@type": "QuantitativeValue",
      value: numberOfEmployees,
    };
  }
  return numberOfEmployees;
}

export function processGeo(geo: GeoCoordinates): GeoCoordinates {
  return {
    ...geo,
    "@type": "GeoCoordinates",
  };
}

export function processOpeningHours(
  hours: OpeningHoursSpecification,
): OpeningHoursSpecification {
  return {
    ...hours,
    "@type": "OpeningHoursSpecification",
  };
}

export function processReview(review: Review): Review {
  return {
    ...review,
    "@type": "Review",
    ...(review.author && {
      author: processAuthor(review.author),
    }),
    ...(review.reviewRating && {
      reviewRating: {
        ...review.reviewRating,
        "@type": "Rating",
      },
    }),
  };
}

export function processBreadcrumbItem(
  item: BreadcrumbListItem,
  position: number,
): ListItem {
  return {
    "@type": "ListItem",
    position,
    ...(item.name && { name: item.name }),
    ...(item.item && { item: item.item }),
  };
}
