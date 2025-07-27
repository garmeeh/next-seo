import type {
  ImageObject,
  PostalAddress,
  Review,
  AggregateRating,
  Brand,
  Accommodation,
} from "./common.types";

export interface VacationRentalBase {
  // Required properties
  containsPlace: Accommodation | Omit<Accommodation, "@type">;
  identifier: string;
  image:
    | string
    | string[]
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  latitude: number | string;
  longitude: number | string;
  name: string;

  // Recommended properties
  additionalType?: string;
  address?: PostalAddress | Omit<PostalAddress, "@type">;
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  brand?: Brand | Omit<Brand, "@type">;
  checkinTime?: string;
  checkoutTime?: string;
  description?: string;
  knowsLanguage?: string | string[];
  review?: Review | Omit<Review, "@type"> | (Review | Omit<Review, "@type">)[];

  // Alternative location specification
  geo?: {
    latitude: number | string;
    longitude: number | string;
  };
}

export interface VacationRental extends VacationRentalBase {
  "@type": "VacationRental";
}

export type VacationRentalJsonLdProps = Omit<VacationRentalBase, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
