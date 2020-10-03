import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import minifyJsonLd from '../utils/minifyJsonLd';
import formatAuthorName from '../utils/formatAuthorName';

type AggregateRating = {
  ratingValue: string;
  ratingCount: string;
};

const buildAggregateRating = (aggregateRating: AggregateRating) => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "ratingCount": "${aggregateRating.ratingCount}"
    },
`;

type Instruction = {
  name: string;
  text: string;
  url?: string;
  image?: string;
};

const buildInstruction = (instruction: Instruction) => `{
  "@type": "HowToStep",
  "name": "${instruction.name}",
  "text": "${instruction.text}",
  "url": "${instruction.url}",
  "image": "${instruction.image}"
}`;

type Video = {
  name: string;
  description: string;
  contentUrl: string;
  uploadDate: string;
  duration: string;
  thumbnailUrls?: string[];
  embedUrl?: string;
  expires?: string;
  watchCount?: number;
};

const buildInteractionStatistic = (watchCount: number) => `
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "http://schema.org/WatchAction" },
    "userInteractionCount": ${watchCount}
  }
`;

const buildVideo = (video: Video) => `
  "video": {
      "@type": "VideoObject",
      "name": "${video.name}",
      "thumbnailUrl": [
        ${(video.thumbnailUrls || [])
          .map(thumbnailUrl => `"${thumbnailUrl}"`)
          .join(',')}
       ],
      "description": "${video.description}",
      "contentUrl": "${video.contentUrl}",
      "uploadDate": "${video.uploadDate}",
      "duration": "${video.duration}",
      ${video.embedUrl ? `"embedUrl": "${video.embedUrl}",` : ``}
      ${video.expires ? `"expires": "${video.expires}",` : ``}
      ${video.watchCount ? buildInteractionStatistic(video.watchCount) : ``}
    },
`;

export interface RecipeJsonLdProps {
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

const RecipeJsonLd: FC<RecipeJsonLdProps> = ({
  name,
  description,
  authorName,
  images = [],
  datePublished,
  prepTime,
  cookTime,
  totalTime,
  keywords,
  yields,
  category,
  cuisine,
  calories,
  ingredients,
  instructions,
  aggregateRating,
  video,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "${name}",
    "description": "${description}",
    "datePublished": "${datePublished}",
    "author": ${formatAuthorName(authorName)},
    "image": [
      ${images.map(image => `"${image}"`).join(',')}
    ],
    ${prepTime ? `"prepTime": "${prepTime}",` : ``}
    ${cookTime ? `"cookTime": "${cookTime}",` : ``}
    ${totalTime ? `"totalTime": "${totalTime}",` : ``}
    ${keywords ? `"keywords": "${keywords}",` : ``}
    ${yields ? `"recipeYield": "${yields}",` : ``}
    ${category ? `"recipeCategory": "${category}",` : ``}
    ${cuisine ? `"recipeCuisine": "${cuisine}",` : ``}
    ${
      calories
        ? `"nutrition": { "@type": "NutritionInformation", "calories": "${calories} calories" },`
        : ``
    }
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${video ? buildVideo(video) : ''}
    "recipeIngredient": [
      ${ingredients.map(ingredient => `"${ingredient}"`).join(',')}
    ],
    "recipeInstructions": [
      ${instructions.map(buildInstruction).join(',')}
    ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key="jsonld-recipe"
      />
    </Head>
  );
};

export default RecipeJsonLd;
