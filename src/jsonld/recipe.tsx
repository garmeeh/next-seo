import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { Instruction, AggregateRating, Video } from 'src/types';

import { setAggregateRating } from 'src/utils/schema/setAggregateRating';
import { setAuthor } from 'src/utils/schema/setAuthor';
import { setVideo } from 'src/utils/schema/setVideo';
import { setInstruction } from 'src/utils/schema/setInstruction';
import { setNutrition } from 'src/utils/schema/setNutrition';

export interface RecipeJsonLdProps extends JsonLdProps {
  name: string;
  description: string;
  authorName: string | string[];
  ingredients: string[];
  instructions: Instruction[];
  images?: string[];
  datePublished?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  keywords?: string;
  yields?: string;
  category?: string;
  cuisine?: string;
  calories?: number;
  aggregateRating?: AggregateRating;
  video?: Video;
}

function RecipeJsonLd({
  type = 'Recipe',
  keyOverride,
  authorName,
  images,
  yields,
  category,
  cuisine,
  calories,
  aggregateRating,
  video,
  ingredients,
  instructions,
  ...rest
}: RecipeJsonLdProps) {
  const data = {
    ...rest,
    author: setAuthor(authorName),
    image: images,
    recipeYield: yields,
    recipeCategory: category,
    recipeCuisine: cuisine,
    nutrition: setNutrition(calories),
    aggregateRating: setAggregateRating(aggregateRating),
    video: setVideo(video),
    recipeIngredient: ingredients,
    recipeInstructions: instructions
      ? instructions.map(setInstruction)
      : undefined,
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="recipe"
    />
  );
}

export default RecipeJsonLd;
