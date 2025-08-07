import type { Course } from "./course.types";
import type { Movie } from "./movie-carousel.types";
import type { Recipe } from "./recipe.types";
import type { Restaurant } from "./localbusiness.types";
import type {
  ImageObject,
  AggregateRating,
  VideoObject,
  Review,
  Person,
  Organization,
  GeoCoordinates,
  OpeningHoursSpecification,
} from "./common.types";

// Content types supported in carousels
export type CarouselContentType = "Course" | "Movie" | "Recipe" | "Restaurant";

// ListItem for ItemList (used in both summary and all-in-one patterns)
export interface CarouselListItem {
  "@type": "ListItem";
  position: number;
  url?: string; // For summary page pattern
  item?: Course | Movie | Recipe | Restaurant; // For all-in-one page pattern
}

// ItemList for carousel
export interface CarouselItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  itemListElement: CarouselListItem[];
}

// Summary page item - just URL with optional position
export type SummaryPageItem = string | { url: string; position?: number };

// Flexible input types for each content type
export type CourseItem = Omit<Course, "@type" | "provider"> & {
  provider?: string | Organization | Omit<Organization, "@type">;
};

export type MovieItem = Omit<Movie, "@type" | "image"> & {
  image:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  director?: string | Person | Omit<Person, "@type">;
  review?: Review | Omit<Review, "@type">;
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
};

export type RecipeItem = Omit<
  Recipe,
  "@type" | "image" | "aggregateRating" | "video"
> & {
  image:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
  video?: VideoObject | Omit<VideoObject, "@type">;
};

export type RestaurantItem = Omit<
  Restaurant,
  | "@type"
  | "image"
  | "geo"
  | "openingHoursSpecification"
  | "review"
  | "aggregateRating"
> & {
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  geo?: GeoCoordinates | Omit<GeoCoordinates, "@type">;
  openingHoursSpecification?:
    | OpeningHoursSpecification
    | Omit<OpeningHoursSpecification, "@type">
    | OpeningHoursSpecification[]
    | Omit<OpeningHoursSpecification, "@type">[];
  review?: Review | Omit<Review, "@type"> | Review[] | Omit<Review, "@type">[];
  aggregateRating?: AggregateRating | Omit<AggregateRating, "@type">;
};

// Base props
interface CarouselJsonLdBaseProps {
  scriptId?: string;
  scriptKey?: string;
}

// Summary page pattern props
interface SummaryPageProps extends CarouselJsonLdBaseProps {
  urls: SummaryPageItem[];
}

// All-in-one page pattern props for each content type
interface CourseCarouselProps extends CarouselJsonLdBaseProps {
  contentType: "Course";
  items: CourseItem[];
}

interface MovieCarouselProps extends CarouselJsonLdBaseProps {
  contentType: "Movie";
  items: MovieItem[];
}

interface RecipeCarouselProps extends CarouselJsonLdBaseProps {
  contentType: "Recipe";
  items: RecipeItem[];
}

interface RestaurantCarouselProps extends CarouselJsonLdBaseProps {
  contentType: "Restaurant";
  items: RestaurantItem[];
}

// Component props supporting both patterns
export type CarouselJsonLdProps =
  | SummaryPageProps
  | CourseCarouselProps
  | MovieCarouselProps
  | RecipeCarouselProps
  | RestaurantCarouselProps;
