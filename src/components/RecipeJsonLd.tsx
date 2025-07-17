import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  RecipeJsonLdProps,
  Instruction,
  HowToStep,
  HowToSection,
} from "~/types/recipe.types";
import { processAuthor, processImage } from "~/utils/processors";

function processInstruction(
  instruction: Instruction,
): string | HowToStep | HowToSection {
  if (typeof instruction === "string") {
    return instruction;
  }
  return instruction;
}

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
    ...(nutrition && { nutrition }),
    ...(recipeIngredient && { recipeIngredient }),
    ...(recipeInstructions && {
      recipeInstructions: Array.isArray(recipeInstructions)
        ? recipeInstructions.map(processInstruction)
        : processInstruction(recipeInstructions),
    }),
    ...(aggregateRating && { aggregateRating }),
    ...(video && { video }),
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
