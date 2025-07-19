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
import type {
  Place,
  Performer,
  Organizer,
  Offer,
  PerformingGroup,
} from "~/types/event.types";
import type { NutritionInformation } from "~/types/recipe.types";

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

export function processPlace(location: string | Place): Place {
  if (typeof location === "string") {
    return {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        streetAddress: location,
      },
    };
  }
  return {
    ...location,
    "@type": "Place",
  };
}

export function processPerformer(
  performer: Performer,
): Person | PerformingGroup {
  if (typeof performer === "string") {
    return {
      "@type": "PerformingGroup",
      name: performer,
    };
  }
  return performer;
}

export function processOrganizer(organizer: Organizer): Person | Organization {
  if (typeof organizer === "string") {
    return {
      "@type": "Organization",
      name: organizer,
    };
  }
  return organizer;
}

export function processOffer(offer: Offer): Offer {
  return {
    ...offer,
    "@type": "Offer",
  };
}

export function processPublisher(
  publisher:
    | string
    | Organization
    | Person
    | Omit<Organization, "@type">
    | Omit<Person, "@type">,
): Person | Organization {
  if (typeof publisher === "string") {
    return {
      "@type": "Organization",
      name: publisher,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in publisher) {
    return publisher as Person | Organization;
  }

  // No @type - default to Organization but preserve all fields
  return {
    "@type": "Organization",
    ...publisher,
  } as Organization;
}

export function processNutrition(
  nutrition: Omit<NutritionInformation, "@type">,
): NutritionInformation {
  return {
    "@type": "NutritionInformation",
    ...nutrition,
  };
}
