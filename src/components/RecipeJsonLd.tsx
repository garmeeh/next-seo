import { JsonLdScript } from "~/core/JsonLdScript";
import type { RecipeJsonLdProps } from "~/types/recipe.types";
import {
  processAuthor,
  processImage,
  processNutrition,
  processAggregateRating,
  processInstruction,
  processVideo,
} from "~/utils/processors";

export default function RecipeJsonLd({
  scriptId,
  scriptKey,
  name,
  image,
  description,
  author,
  datePublished,
  prepTime,
  cookTime,
  totalTime,
  recipeYield,
  recipeCategory,
  recipeCuisine,
  nutrition,
  recipeIngredient,
  recipeInstructions,
  aggregateRating,
  video,
  keywords,
  url,
}: RecipeJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    image: Array.isArray(image) ? image.map(processImage) : processImage(image),
    ...(description && { description }),
    ...(author && { author: processAuthor(author) }),
    ...(datePublished && { datePublished }),
    ...(prepTime && { prepTime }),
    ...(cookTime && { cookTime }),
    ...(totalTime && { totalTime }),
    ...(recipeYield !== undefined && { recipeYield }),
    ...(recipeCategory && { recipeCategory }),
    ...(recipeCuisine && { recipeCuisine }),
    ...(nutrition && { nutrition: processNutrition(nutrition) }),
    ...(recipeIngredient && { recipeIngredient }),
    ...(recipeInstructions && {
      recipeInstructions: Array.isArray(recipeInstructions)
        ? recipeInstructions.map(processInstruction)
        : processInstruction(recipeInstructions),
    }),
    ...(aggregateRating && {
      aggregateRating: processAggregateRating(aggregateRating),
    }),
    ...(video && { video: processVideo(video) }),
    ...(keywords && { keywords }),
    ...(url && { url }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "recipe-jsonld"}
    />
  );
}

export type { RecipeJsonLdProps };
