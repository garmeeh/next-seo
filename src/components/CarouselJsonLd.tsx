import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  CarouselJsonLdProps,
  CarouselListItem,
  SummaryPageItem,
  CourseItem,
  MovieItem,
  RecipeItem,
  RestaurantItem,
} from "~/types/carousel.types";
import type { Course } from "~/types/course.types";
import type { Movie } from "~/types/movie-carousel.types";
import type { Recipe } from "~/types/recipe.types";
import type { Restaurant } from "~/types/localbusiness.types";
import {
  processProvider,
  processImage,
  processDirector,
  processReview,
  processAggregateRating,
  processVideo,
  processNutrition,
  processInstruction,
  processAddress,
  processGeo,
  processOpeningHours,
} from "~/utils/processors";

function processSummaryItem(
  item: SummaryPageItem,
  index: number,
): CarouselListItem {
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

function processCourseItem(
  course: CourseItem,
  index: number,
): CarouselListItem {
  const processedCourse: Course = {
    "@type": "Course",
    name: course.name,
    description: course.description,
    ...(course.url && { url: course.url }),
    ...(course.provider && { provider: processProvider(course.provider) }),
  };

  return {
    "@type": "ListItem",
    position: index + 1,
    item: processedCourse,
  };
}

function processMovieItem(movie: MovieItem, index: number): CarouselListItem {
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

function processRecipeItem(
  recipe: RecipeItem,
  index: number,
): CarouselListItem {
  const processedRecipe: Recipe = {
    "@type": "Recipe",
    name: recipe.name,
    image: Array.isArray(recipe.image)
      ? recipe.image.map(processImage)
      : processImage(recipe.image),
    ...(recipe.description && { description: recipe.description }),
    ...(recipe.author && {
      author:
        typeof recipe.author === "string"
          ? { "@type": "Person", name: recipe.author }
          : recipe.author,
    }),
    ...(recipe.datePublished && { datePublished: recipe.datePublished }),
    ...(recipe.prepTime && { prepTime: recipe.prepTime }),
    ...(recipe.cookTime && { cookTime: recipe.cookTime }),
    ...(recipe.totalTime && { totalTime: recipe.totalTime }),
    ...(recipe.recipeYield && { recipeYield: recipe.recipeYield }),
    ...(recipe.recipeCategory && { recipeCategory: recipe.recipeCategory }),
    ...(recipe.recipeCuisine && { recipeCuisine: recipe.recipeCuisine }),
    ...(recipe.nutrition && { nutrition: processNutrition(recipe.nutrition) }),
    ...(recipe.recipeIngredient && {
      recipeIngredient: recipe.recipeIngredient,
    }),
    ...(recipe.recipeInstructions && {
      recipeInstructions: Array.isArray(recipe.recipeInstructions)
        ? recipe.recipeInstructions.map(processInstruction)
        : processInstruction(recipe.recipeInstructions),
    }),
    ...(recipe.aggregateRating && {
      aggregateRating: processAggregateRating(recipe.aggregateRating),
    }),
    ...(recipe.video && { video: processVideo(recipe.video) }),
    ...(recipe.keywords && { keywords: recipe.keywords }),
    ...(recipe.url && { url: recipe.url }),
  };

  return {
    "@type": "ListItem",
    position: index + 1,
    item: processedRecipe,
  };
}

function processRestaurantItem(
  restaurant: RestaurantItem,
  index: number,
): CarouselListItem {
  const address = restaurant.address
    ? Array.isArray(restaurant.address)
      ? restaurant.address.map((addr) =>
          typeof addr === "string" ? addr : processAddress(addr),
        )
      : typeof restaurant.address === "string"
        ? restaurant.address
        : processAddress(restaurant.address)
    : "";

  const processedRestaurant: Restaurant = {
    "@type": "Restaurant",
    name: restaurant.name,
    address,
    ...(restaurant.url && { url: restaurant.url }),
    ...(restaurant.telephone && { telephone: restaurant.telephone }),
    ...(restaurant.image && {
      image: Array.isArray(restaurant.image)
        ? restaurant.image.map(processImage)
        : processImage(restaurant.image),
    }),
    ...(restaurant.priceRange && { priceRange: restaurant.priceRange }),
    ...(restaurant.geo && { geo: processGeo(restaurant.geo) }),
    ...(restaurant.openingHoursSpecification && {
      openingHoursSpecification: Array.isArray(
        restaurant.openingHoursSpecification,
      )
        ? restaurant.openingHoursSpecification.map(processOpeningHours)
        : processOpeningHours(restaurant.openingHoursSpecification),
    }),
    ...(restaurant.review && {
      review: Array.isArray(restaurant.review)
        ? restaurant.review.map(processReview)
        : processReview(restaurant.review),
    }),
    ...(restaurant.aggregateRating && {
      aggregateRating: processAggregateRating(restaurant.aggregateRating),
    }),
    ...(restaurant.menu && { menu: restaurant.menu }),
    ...(restaurant.servesCuisine && {
      servesCuisine: restaurant.servesCuisine,
    }),
    ...(restaurant.sameAs && { sameAs: restaurant.sameAs }),
  };

  return {
    "@type": "ListItem",
    position: index + 1,
    item: processedRestaurant,
  };
}

export default function CarouselJsonLd(props: CarouselJsonLdProps) {
  const { scriptId, scriptKey } = props;

  let itemListElement: CarouselListItem[];

  if ("urls" in props) {
    // Summary page pattern - just URLs
    itemListElement = props.urls.map((url, index) =>
      processSummaryItem(url, index),
    );
  } else {
    // All-in-one page pattern - full item data
    switch (props.contentType) {
      case "Course":
        itemListElement = props.items.map((item, index) =>
          processCourseItem(item as CourseItem, index),
        );
        break;
      case "Movie":
        itemListElement = props.items.map((item, index) =>
          processMovieItem(item as MovieItem, index),
        );
        break;
      case "Recipe":
        itemListElement = props.items.map((item, index) =>
          processRecipeItem(item as RecipeItem, index),
        );
        break;
      case "Restaurant":
        itemListElement = props.items.map((item, index) =>
          processRestaurantItem(item as RestaurantItem, index),
        );
        break;
      default:
        itemListElement = [];
    }
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
      scriptKey={scriptKey || "carousel-jsonld"}
    />
  );
}

export type { CarouselJsonLdProps };
