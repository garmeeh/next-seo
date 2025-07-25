import type {
  ImageObject,
  Person,
  Review,
  AggregateRating,
} from "./common.types";

// Director can be a string or Person
export type Director = string | Person | Omit<Person, "@type">;

// Movie schema type
export interface Movie {
  "@type": "Movie";
  name: string;
  image: string | ImageObject | (string | ImageObject)[];
  url?: string;
  dateCreated?: string;
  director?: Director;
  review?: Review | Omit<Review, "@type">;
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
}

// Flexible input type for movies in the carousel
export type MovieListItem = Omit<Movie, "@type" | "image"> & {
  image:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
};

// ListItem for ItemList (used in both summary and all-in-one patterns)
export interface MovieCarouselListItem {
  "@type": "ListItem";
  position: number;
  url?: string; // For summary page pattern
  item?: Movie; // For all-in-one page pattern
}

// ItemList for movie carousel
export interface MovieCarouselItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  itemListElement: MovieCarouselListItem[];
}

// Summary page item - just URL with optional position
export type SummaryPageItem = string | { url: string; position?: number };

// Component props supporting both patterns
export type MovieCarouselJsonLdProps = {
  scriptId?: string;
  scriptKey?: string;
} & (
  | {
      // Summary page pattern - just URLs
      urls: SummaryPageItem[];
    }
  | {
      // All-in-one page pattern - full movie data
      movies: MovieListItem[];
    }
);
