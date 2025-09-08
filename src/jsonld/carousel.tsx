import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';

import type { CourseJsonLdProps, RecipeJsonLdProps } from 'src/index';
import type {
  Review,
  AggregateRating,
  LocalBusinessJsonLdProps,
  ProductJsonLdProps,
  EventJsonLdProps,
} from 'src/types';
import { setReviews } from 'src/utils/schema/setReviews';
import { setAuthor } from 'src/utils/schema/setAuthor';
import { setNutrition } from 'src/utils/schema/setNutrition';
import { setAggregateRating } from 'src/utils/schema/setAggregateRating';
import { setVideo } from 'src/utils/schema/setVideo';
import { setInstruction } from 'src/utils/schema/setInstruction';
import { setOffers } from 'src/utils/schema/setOffers';
import { setAggregateOffer } from 'src/utils/schema/setAggregateOffer';

type Director = {
  name: string;
};

interface DefaultDataProps {
  url: string;
}

interface ExtendedCourseJsonLdProps
  extends DefaultDataProps,
    CourseJsonLdProps {}

interface ExtendedRecipeJsonLdProps
  extends DefaultDataProps,
    RecipeJsonLdProps {}

export interface MovieJsonLdProps {
  name: string;
  url: string;
  image: string;
  dateCreated?: string;
  director?: Director | Director[];
  review?: Review;
  aggregateRating?: AggregateRating;
}

export interface CustomJsonLdProps {
  position?: number;
  name: string;
  type: string;
}

export interface CarouselJsonLdProps extends JsonLdProps {
  ofType:
    | 'default'
    | 'movie'
    | 'recipe'
    | 'course'
    | 'localBusiness'
    | 'product'
    | 'event'
    | 'custom';
  data:
    | any
    | DefaultDataProps[]
    | MovieJsonLdProps[]
    | ExtendedCourseJsonLdProps[]
    | ExtendedRecipeJsonLdProps[]
    | LocalBusinessJsonLdProps[]
    | ProductJsonLdProps[]
    | EventJsonLdProps[]
    | CustomJsonLdProps[];
}

function CarouselJsonLd({
  type = 'Carousel',
  keyOverride,
  ofType,
  data,
  ...rest
}: CarouselJsonLdProps) {
  function generateList(
    data: CarouselJsonLdProps['data'],
    ofType: CarouselJsonLdProps['ofType'],
  ) {
    switch (ofType) {
      case 'default':
        return (data as DefaultDataProps[]).map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          url: item.url,
        }));

      case 'course':
        return (data as ExtendedCourseJsonLdProps[]).map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          item: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            url: item.url,
            name: item.courseName,
            description: item.description,
            provider: {
              '@type': 'Organization',
              name: item.providerName,
              sameAs: item.providerUrl,
            },
          },
        }));

      case 'movie':
        return (data as MovieJsonLdProps[]).map((item, index) => ({
          '@type': 'ListItem',
          position: `${index + 1}`,
          item: {
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: item.name,
            url: item.url,
            image: item.image,
            dateCreated: item.dateCreated,
            director: item.director
              ? Array.isArray(item.director)
                ? item.director.map(director => ({
                    '@type': 'Person',
                    name: director.name,
                  }))
                : {
                    '@type': 'Person',
                    name: item.director.name,
                  }
              : undefined,
            review: setReviews(item.review),
          },
        }));

      case 'recipe':
        return (data as ExtendedRecipeJsonLdProps[]).map(
          (
            {
              authorName,
              images,
              yields,
              category,
              calories,
              aggregateRating,
              video,
              ingredients,
              instructions,
              cuisine,
              ...rest
            },
            index,
          ) => ({
            '@type': 'ListItem',
            position: `${index + 1}`,
            item: {
              '@context': 'https://schema.org',
              '@type': 'Recipe',
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
              recipeInstructions: instructions.map(setInstruction),
            },
          }),
        );

      case 'localBusiness':
        return (data as LocalBusinessJsonLdProps[]).map((item, index) => {
          const {
            name,
            url,
            image,
            priceRange,
            servesCuisine,
            amenityFeature,
            aggregateRating,
            ...rest
          } = item;
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'LocalBusiness',
              ...rest,
              name,
              url,
              image,
              priceRange,
              servesCuisine,
              amenityFeature,
              aggregateRating: setAggregateRating(aggregateRating),
            },
          };
        });

      case 'product':
        return (data as ProductJsonLdProps[]).map((item, index) => {
          const {
            name,
            url,
            image,
            offers,
            aggregateOffer,
            aggregateRating,
            ...rest
          } = item;
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              ...rest,
              name,
              url,
              image,
              offers: offers
                ? setOffers(offers)
                : setAggregateOffer(aggregateOffer),
              aggregateRating: setAggregateRating(aggregateRating),
            },
          };
        });

      case 'event':
        return (data as EventJsonLdProps[]).map((item, index) => {
          const { name, url, image, offers, aggregateRating, ...rest } = item;
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Event',
              ...rest,
              name,
              url,
              image,
              offers,
              aggregateRating: setAggregateRating(aggregateRating),
            },
          };
        });

      case 'custom':
        return (data as CustomJsonLdProps[]).map((item, index) => {
          const { name, position, type, ...rest } = item;
          return {
            '@type': 'ListItem',
            position: position ?? index + 1,
            item: {
              '@type': type,
              ...rest,
              name,
            },
          };
        });
    }
  }

  const jsonLdData = {
    '@type': 'ItemList',
    ...rest,
    itemListElement: generateList(data, ofType),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...jsonLdData}
      scriptKey="Carousel"
    />
  );
}

export default CarouselJsonLd;
