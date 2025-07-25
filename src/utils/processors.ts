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
  Rating,
} from "~/types/common.types";
import type { Director } from "~/types/movie-carousel.types";
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
  VideoObject,
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

export function processAuthor(author: Author): Person | Organization {
  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: author,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in author) {
    return author as Person | Organization;
  }

  // No @type - need to determine if it's Person or Organization
  // Check for Organization-specific properties
  if (
    "logo" in author ||
    "address" in author ||
    "contactPoint" in author ||
    "sameAs" in author
  ) {
    const org: Organization = {
      "@type": "Organization",
      ...author,
    };

    // Process nested contactPoint if present
    if ("contactPoint" in author && author.contactPoint) {
      if (Array.isArray(author.contactPoint)) {
        org.contactPoint = author.contactPoint.map(processContactPoint);
      } else {
        org.contactPoint = processContactPoint(
          author.contactPoint as ContactPoint | Omit<ContactPoint, "@type">,
        );
      }
    }

    // Process nested address if present
    if ("address" in author && author.address) {
      if (Array.isArray(author.address)) {
        org.address = author.address.map((addr) =>
          typeof addr === "string" ? addr : processAddress(addr),
        );
      } else if (typeof author.address !== "string") {
        org.address = processAddress(author.address);
      }
    }

    // Process logo if present and not a string
    if ("logo" in author && author.logo && typeof author.logo !== "string") {
      org.logo = processImage(author.logo);
    }

    return org as Organization;
  }

  // Default to Person for objects without clear Organization properties
  return {
    "@type": "Person",
    ...author,
  } as Person;
}

export function processImage(
  image: string | ImageObject | Omit<ImageObject, "@type">,
): string | ImageObject {
  if (typeof image === "string") {
    return image;
  }

  // If it already has @type, return as-is
  if ("@type" in image) {
    return image as ImageObject;
  }

  // No @type - add it
  return {
    "@type": "ImageObject",
    ...image,
  } as ImageObject;
}

export function processAddress(
  address: string | PostalAddress | Omit<PostalAddress, "@type">,
): PostalAddress {
  if (typeof address === "string") {
    return {
      "@type": "PostalAddress",
      streetAddress: address,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in address) {
    return address as PostalAddress;
  }

  // No @type - add it
  return {
    "@type": "PostalAddress",
    ...address,
  } as PostalAddress;
}

export function processContactPoint(
  contactPoint: ContactPoint | Omit<ContactPoint, "@type">,
): ContactPoint {
  // If it already has @type, return as-is
  if ("@type" in contactPoint) {
    return contactPoint as ContactPoint;
  }

  // No @type - add it
  return {
    "@type": "ContactPoint",
    ...contactPoint,
  } as ContactPoint;
}

export function processLogo(
  logo: string | ImageObject | Omit<ImageObject, "@type">,
): string | ImageObject {
  // Logo processing is same as image processing
  return processImage(logo);
}

export function processNumberOfEmployees(
  numberOfEmployees:
    | number
    | QuantitativeValue
    | Omit<QuantitativeValue, "@type">,
): QuantitativeValue {
  if (typeof numberOfEmployees === "number") {
    return {
      "@type": "QuantitativeValue",
      value: numberOfEmployees,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in numberOfEmployees) {
    return numberOfEmployees as QuantitativeValue;
  }

  // No @type - add it
  return {
    "@type": "QuantitativeValue",
    ...numberOfEmployees,
  } as QuantitativeValue;
}

export function processGeo(
  geo: GeoCoordinates | Omit<GeoCoordinates, "@type">,
): GeoCoordinates {
  return {
    ...geo,
    "@type": "GeoCoordinates",
  };
}

export function processOpeningHours(
  hours: OpeningHoursSpecification | Omit<OpeningHoursSpecification, "@type">,
): OpeningHoursSpecification {
  return {
    ...hours,
    "@type": "OpeningHoursSpecification",
  };
}

export function processReview(review: Review | Omit<Review, "@type">): Review {
  // Process the review rating if it exists
  let processedRating: Rating | undefined;
  if (review.reviewRating) {
    if ("@type" in review.reviewRating) {
      processedRating = review.reviewRating as Rating;
    } else {
      processedRating = {
        "@type": "Rating",
        ...review.reviewRating,
      } as Rating;
    }
  }

  // If review already has @type, preserve it but still process nested fields
  if ("@type" in review) {
    return {
      ...review,
      ...(review.author && {
        author: processAuthor(review.author),
      }),
      ...(processedRating && {
        reviewRating: processedRating,
      }),
    } as Review;
  }

  // No @type - add it
  return {
    "@type": "Review",
    ...review,
    ...(review.author && {
      author: processAuthor(review.author),
    }),
    ...(processedRating && {
      reviewRating: processedRating,
    }),
  } as Review;
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

export function processPlace(
  location: string | Place | Omit<Place, "@type">,
): Place {
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

  // If it already has @type, return as-is
  if ("@type" in performer) {
    return performer as Person | PerformingGroup;
  }

  // No @type - need to determine if it's Person or PerformingGroup
  // Check for Person-specific properties
  if (
    "familyName" in performer ||
    "givenName" in performer ||
    "additionalName" in performer
  ) {
    return {
      "@type": "Person",
      ...performer,
    } as Person;
  }

  // Default to PerformingGroup
  return {
    "@type": "PerformingGroup",
    ...performer,
  } as PerformingGroup;
}

export function processOrganizer(organizer: Organizer): Person | Organization {
  if (typeof organizer === "string") {
    return {
      "@type": "Organization",
      name: organizer,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in organizer) {
    return organizer as Person | Organization;
  }

  // No @type - need to determine if it's Person or Organization
  // Similar logic to processAuthor
  if (
    "familyName" in organizer ||
    "givenName" in organizer ||
    "additionalName" in organizer
  ) {
    return {
      "@type": "Person",
      ...organizer,
    } as Person;
  }

  // Default to Organization
  return {
    "@type": "Organization",
    ...organizer,
  } as Organization;
}

export function processOffer(offer: Offer | Omit<Offer, "@type">): Offer {
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

export function processAggregateRating(
  rating: AggregateRating | Omit<AggregateRating, "@type">,
): AggregateRating {
  // If it already has @type, return as-is
  if ("@type" in rating) {
    return rating as AggregateRating;
  }

  // No @type - add it
  return {
    "@type": "AggregateRating",
    ...rating,
  } as AggregateRating;
}

type WebPage = {
  "@type": "WebPage";
  "@id": string;
};

export function processMainEntityOfPage(
  mainEntityOfPage: string | WebPage | Omit<WebPage, "@type">,
): string | WebPage {
  if (typeof mainEntityOfPage === "string") {
    return mainEntityOfPage;
  }

  // If it already has @type, return as-is
  if ("@type" in mainEntityOfPage) {
    return mainEntityOfPage as WebPage;
  }

  // No @type - add it
  return {
    "@type": "WebPage",
    ...mainEntityOfPage,
  } as WebPage;
}

export function processMerchantReturnPolicy(
  policy: MerchantReturnPolicy | Omit<MerchantReturnPolicy, "@type">,
): MerchantReturnPolicy {
  // If it already has @type, return as-is
  if ("@type" in policy) {
    return policy as MerchantReturnPolicy;
  }

  // No @type - add it
  return {
    "@type": "MerchantReturnPolicy",
    ...policy,
  } as MerchantReturnPolicy;
}

export function processVideo(
  video: VideoObject | Omit<VideoObject, "@type">,
): VideoObject {
  // If it already has @type, return as-is
  if ("@type" in video) {
    return video as VideoObject;
  }

  // No @type - add it
  return {
    "@type": "VideoObject",
    ...video,
  } as VideoObject;
}

export function processInstruction(
  instruction:
    | string
    | HowToStep
    | HowToSection
    | Omit<HowToStep, "@type">
    | Omit<HowToSection, "@type">,
): string | HowToStep | HowToSection {
  if (typeof instruction === "string") {
    return instruction;
  }

  // If it already has @type, return as-is but process nested items if it's a section
  if ("@type" in instruction) {
    if (
      instruction["@type"] === "HowToSection" &&
      "itemListElement" in instruction
    ) {
      return {
        ...instruction,
        itemListElement: instruction.itemListElement.map(
          (item: HowToStep | Omit<HowToStep, "@type">) =>
            processInstruction(item),
        ),
      } as HowToSection;
    }
    return instruction as HowToStep | HowToSection;
  }

  // No @type - need to determine if it's HowToStep or HowToSection
  if ("itemListElement" in instruction) {
    // It's a HowToSection
    return {
      "@type": "HowToSection",
      ...instruction,
      itemListElement: instruction.itemListElement.map(
        (item: HowToStep | Omit<HowToStep, "@type">) =>
          processInstruction(item),
      ),
    } as HowToSection;
  }

  // Default to HowToStep
  return {
    "@type": "HowToStep",
    ...instruction,
  } as HowToStep;
}

export function processDirector(director: Director): Person {
  if (typeof director === "string") {
    return {
      "@type": "Person",
      name: director,
    };
  }

  // If it already has @type, return as-is
  if ("@type" in director) {
    return director as Person;
  }

  // No @type - add it
  return {
    "@type": "Person",
    ...director,
  } as Person;
}

// Dataset-specific processors

export function processCreator(
  creator: Author | Author[],
): Person | Organization | (Person | Organization)[] {
  if (Array.isArray(creator)) {
    return creator.map((c) => processAuthor(c));
  }
  return processAuthor(creator);
}

export function processIdentifier(
  identifier: string | PropertyValue | Omit<PropertyValue, "@type">,
): string | PropertyValue {
  if (typeof identifier === "string") {
    return identifier;
  }

  // If it already has @type, return as-is
  if ("@type" in identifier) {
    return identifier as PropertyValue;
  }

  // No @type - add it
  return {
    "@type": "PropertyValue",
    ...identifier,
  } as PropertyValue;
}

export function processSpatialCoverage(
  spatial: string | DatasetPlace | Omit<DatasetPlace, "@type">,
): string | DatasetPlace {
  if (typeof spatial === "string") {
    return spatial;
  }

  // If it already has @type, return as-is
  if ("@type" in spatial) {
    return spatial as DatasetPlace;
  }

  // Process geo if present
  const processed: DatasetPlace = {
    "@type": "Place",
    ...spatial,
  };

  if (
    spatial.geo &&
    typeof spatial.geo === "object" &&
    !("@type" in spatial.geo)
  ) {
    // Determine if it's GeoCoordinates or GeoShape
    if ("latitude" in spatial.geo && "longitude" in spatial.geo) {
      processed.geo = {
        "@type": "GeoCoordinates",
        ...spatial.geo,
      } as GeoCoordinates;
    } else if (
      "box" in spatial.geo ||
      "circle" in spatial.geo ||
      "line" in spatial.geo ||
      "polygon" in spatial.geo
    ) {
      processed.geo = {
        "@type": "GeoShape",
        ...spatial.geo,
      } as GeoShape;
    }
  }

  return processed;
}

export function processDataDownload(
  download: DataDownload | Omit<DataDownload, "@type">,
): DataDownload {
  if ("@type" in download) {
    return download as DataDownload;
  }

  return {
    "@type": "DataDownload",
    ...download,
  } as DataDownload;
}

export function processLicense(
  license: string | CreativeWork | Omit<CreativeWork, "@type">,
): string | CreativeWork {
  if (typeof license === "string") {
    return license;
  }

  // If it already has @type, return as-is
  if ("@type" in license) {
    return license as CreativeWork;
  }

  // No @type - add it
  return {
    "@type": "CreativeWork",
    ...license,
  } as CreativeWork;
}

export function processDataCatalog(
  catalog: DataCatalog | Omit<DataCatalog, "@type">,
): DataCatalog {
  if ("@type" in catalog) {
    return catalog as DataCatalog;
  }

  return {
    "@type": "DataCatalog",
    ...catalog,
  } as DataCatalog;
}
