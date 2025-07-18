import type { ImageObject, Author, AggregateRating } from "./common.types";

export interface VideoObject {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  contentUrl?: string;
  embedUrl?: string;
  uploadDate: string;
  duration?: string;
  expires?: string;
}

export interface NutritionInformation {
  "@type": "NutritionInformation";
  calories?: string;
  carbohydrateContent?: string;
  proteinContent?: string;
  fatContent?: string;
  saturatedFatContent?: string;
  unsaturatedFatContent?: string;
  transFatContent?: string;
  cholesterolContent?: string;
  sodiumContent?: string;
  fiberContent?: string;
  sugarContent?: string;
  servingSize?: string;
}

export interface HowToStep {
  "@type": "HowToStep";
  name?: string;
  text: string;
  url?: string;
  image?: string | ImageObject;
}

export interface HowToSection {
  "@type": "HowToSection";
  name: string;
  itemListElement: HowToStep[];
}

export type Instruction = string | HowToStep | HowToSection;
export type RecipeImage = string | ImageObject | (string | ImageObject)[];

export interface Recipe {
  "@type": "Recipe";
  name: string;
  image: RecipeImage;
  description?: string;
  author?: Author;
  datePublished?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string | number;
  recipeCategory?: string;
  recipeCuisine?: string;
  nutrition?: NutritionInformation;
  recipeIngredient?: string[];
  recipeInstructions?: Instruction | Instruction[];
  aggregateRating?: AggregateRating;
  video?: VideoObject;
  keywords?: string;
  url?: string;
}

export type RecipeJsonLdProps = Omit<Recipe, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
