import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  MovieCarouselJsonLdProps,
  MovieListItem,
  SummaryPageItem,
  MovieCarouselListItem,
  Movie,
} from "~/types/movie-carousel.types";
import {
  processImage,
  processDirector,
  processReview,
  processAggregateRating,
} from "~/utils/processors";

function processSummaryItem(
  item: SummaryPageItem,
  index: number,
): MovieCarouselListItem {
  if (typeof item === "string") {
    return {
      "@type": "ListItem",
      position: index + 1,
      url: item,
    };
  }
  return {
    "@type": "ListItem",
    position: item.position ?? index + 1,
    url: item.url,
  };
}

function processMovieItem(
  movie: MovieListItem,
  index: number,
): MovieCarouselListItem {
  const processedMovie: Movie = {
    "@type": "Movie",
    name: movie.name,
    image: Array.isArray(movie.image)
      ? movie.image.map(processImage)
      : processImage(movie.image),
    ...(movie.url && { url: movie.url }),
    ...(movie.dateCreated && { dateCreated: movie.dateCreated }),
    ...(movie.director && { director: processDirector(movie.director) }),
    ...(movie.review && { review: processReview(movie.review) }),
    ...(movie.aggregateRating && {
      aggregateRating: processAggregateRating(movie.aggregateRating),
    }),
  };

  return {
    "@type": "ListItem",
    position: index + 1,
    item: processedMovie,
  };
}

export default function MovieCarouselJsonLd(props: MovieCarouselJsonLdProps) {
  const { scriptId, scriptKey } = props;

  // Determine if this is summary page or all-in-one page pattern
  const isSummaryPage = "urls" in props;

  let itemListElement: MovieCarouselListItem[];

  if (isSummaryPage) {
    // Summary page pattern - just URLs
    itemListElement = props.urls.map((url, index) =>
      processSummaryItem(url, index),
    );
  } else {
    // All-in-one page pattern - full movie data
    itemListElement = props.movies.map((movie, index) =>
      processMovieItem(movie, index),
    );
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "movie-carousel-jsonld"}
    />
  );
}

export type { MovieCarouselJsonLdProps };
