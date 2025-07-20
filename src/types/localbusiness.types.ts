import type {
  ImageObject,
  PostalAddress,
  Organization,
  GeoCoordinates,
  OpeningHoursSpecification,
  Review,
  AggregateRating,
} from "./common.types";

export interface LocalBusinessBase {
  name: string;
  address:
    | string
    | PostalAddress
    | Omit<PostalAddress, "@type">
    | (string | PostalAddress | Omit<PostalAddress, "@type">)[];
  url?: string;
  telephone?: string;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  priceRange?: string;
  geo?: GeoCoordinates | Omit<GeoCoordinates, "@type">;
  openingHoursSpecification?:
    | OpeningHoursSpecification
    | Omit<OpeningHoursSpecification, "@type">
    | OpeningHoursSpecification[]
    | Omit<OpeningHoursSpecification, "@type">[];
  review?: Review | Omit<Review, "@type"> | Review[] | Omit<Review, "@type">[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  department?: LocalBusinessBase | LocalBusinessBase[];
  menu?: string;
  servesCuisine?: string | string[];
  sameAs?: string | string[];
  branchOf?: Organization;
  currenciesAccepted?: string;
  paymentAccepted?: string;
  areaServed?: string | string[];
  email?: string;
  faxNumber?: string;
  slogan?: string;
  description?: string;
  publicAccess?: boolean;
  smokingAllowed?: boolean;
  isAccessibleForFree?: boolean;
}

export interface LocalBusiness extends LocalBusinessBase {
  "@type": "LocalBusiness" | string | string[];
}

export interface Restaurant extends LocalBusinessBase {
  "@type": "Restaurant";
  servesCuisine?: string | string[];
  menu?: string;
}

export interface Store extends LocalBusinessBase {
  "@type": "Store";
}

export interface Pharmacy extends LocalBusinessBase {
  "@type": "Pharmacy";
}

export interface DaySpa extends LocalBusinessBase {
  "@type": "DaySpa";
}

export interface HealthClub extends LocalBusinessBase {
  "@type": "HealthClub";
}

export interface EntertainmentBusiness extends LocalBusinessBase {
  "@type": "EntertainmentBusiness";
}

export interface Electrician extends LocalBusinessBase {
  "@type": "Electrician";
}

export interface Plumber extends LocalBusinessBase {
  "@type": "Plumber";
}

export interface Locksmith extends LocalBusinessBase {
  "@type": "Locksmith";
}

export type LocalBusinessJsonLdProps = Omit<LocalBusinessBase, "department"> & {
  type?: string | string[];
  scriptId?: string;
  scriptKey?: string;
  department?:
    | (Omit<LocalBusinessBase, "department"> & { type?: string | string[] })
    | (Omit<LocalBusinessBase, "department"> & { type?: string | string[] })[];
};
