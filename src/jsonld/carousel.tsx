import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import buildVideo from '../utils/buildVideo';
import {
  buildAuthor,
  buildPublisher,
  buildReviewRating,
} from '../utils/buildReviews';
import { buildAggregateRating } from '../utils/buildAggregateRating';

import { RecipeJsonLdProps, buildInstruction } from './recipe';

import { CourseJsonLdProps } from './course';

import { AggregateRating, Review } from '../types';

type Director = {
  name: string;
};

interface DefaultDataProps {
  url: string;
}

interface ExtendedCourseJsonLdProps
  extends CourseJsonLdProps,
    DefaultDataProps {}

interface ExtendedRecipeJsonLdProps
  extends RecipeJsonLdProps,
    DefaultDataProps {}

export interface MovieJsonLdProps {
  name: string;
  url: string;
  image: string;
  dateCreated?: string;
  director?: Director | Director[];
  review?: Review;
  aggregateRating?: AggregateRating;
}

export interface CarouselJsonLdProps {
  type: 'default' | 'movie' | 'recipe' | 'course';
  data:
    | DefaultDataProps[]
    | MovieJsonLdProps[]
    | ExtendedCourseJsonLdProps[]
    | ExtendedRecipeJsonLdProps[];
}

const CarouselJsonLd: FC<CarouselJsonLdProps> = ({ type, data }) => {
  let itemListElement: any[] = [];
  switch (type) {
    case 'default':
      itemListElement = (data as DefaultDataProps[]).map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "url": "${item.url}"
      }`,
      );
      break;
    case 'course':
      itemListElement = (data as ExtendedCourseJsonLdProps[]).map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org",
          "@type": "Course",
          "url": "${item.url}",
          "name": "${item.courseName}",
          "description": "${item.description}",
          "provider": {
            "@type": "Organization",
            "name": "${item.providerName}"${
          item.providerUrl
            ? `,
                "sameAs": "${item.providerUrl}"`
            : ''
        }
          }
      }
    }`,
      );
      break;
    case 'movie':
      itemListElement = (data as MovieJsonLdProps[]).map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": "${item.name}",
          "url": "${item.url}",
          "image": "${item.image}",
          ${item.dateCreated ? `"dateCreated": "${item.dateCreated}",` : ``}
          ${
            item.director
              ? `"director": ${
                  Array.isArray(item.director)
                    ? `[${item.director
                        .map(
                          director => `{
                          "@type": "Person",
                          "name": "${director.name}"
                        }`,
                        )
                        .join(',')}]`
                    : `{
                      "@type": "Person",
                      "name": "${item.director.name}"
                    }`
                }`
              : ''
          }
          ${
            item.review
              ? `,
              "review": {
                "@type": "Review",
                ${item.review.author ? buildAuthor(item.review.author) : ''}
                ${
                  item.review.publisher
                    ? buildPublisher(item.review.publisher)
                    : ''
                }
                ${
                  item.review.datePublished
                    ? `"datePublished": "${item.review.datePublished}",`
                    : ''
                }
                ${
                  item.review.reviewBody
                    ? `"reviewBody": "${item.review.reviewBody}",`
                    : ''
                }
                ${item.review.name ? `"name": "${item.review.name}",` : ''}
                ${buildReviewRating(item.review.reviewRating)}
            }`
              : ''
          }
        }
      }`,
      );
      break;
    case 'recipe':
      itemListElement = (data as ExtendedRecipeJsonLdProps[]).map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "name": "${item.name}",
          "url" : "${item.url}",
          "description": "${item.description}",
          "datePublished": "${item.datePublished}",
          "author": {
            "@type": "Person",
            "name": "${item.authorName}"
          },
          "image": [
            ${item.images?.map(image => `"${image}"`).join(',')}
          ],
          ${item.prepTime ? `"prepTime": "${item.prepTime}",` : ``}
          ${item.cookTime ? `"cookTime": "${item.cookTime}",` : ``}
          ${item.totalTime ? `"totalTime": "${item.totalTime}",` : ``}
          ${item.keywords ? `"keywords": "${item.keywords}",` : ``}
          ${item.yields ? `"recipeYield": "${item.yields}",` : ``}
          ${item.category ? `"recipeCategory": "${item.category}",` : ``}
          ${item.cuisine ? `"recipeCuisine": "${item.cuisine}",` : ``}
          ${
            item.calories
              ? `"nutrition": { "@type": "NutritionInformation", "calories": "${item.calories} calories" },`
              : ``
          }
          ${
            item.aggregateRating
              ? buildAggregateRating(item.aggregateRating)
              : ''
          }
          ${item.video ? `"video": ${buildVideo(item.video)},` : ''}
          "recipeIngredient": [
            ${item.ingredients.map(ingredient => `"${ingredient}"`).join(',')}
          ],
          "recipeInstructions": [
            ${item.instructions.map(buildInstruction).join(',')}
          ]
      }
      }`,
      );
      break;
  }

  const jsonld = `{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [${itemListElement.join(',')}]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jsonld)}
        key="jsonld-course"
      />
    </Head>
  );
};

export default CarouselJsonLd;
