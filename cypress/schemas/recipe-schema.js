import { versionSchemas } from '@cypress/schema-tools';
import {
  author100,
  aggregateRating100,
  videoObject100,
  exampleVideo,
} from './common';

const exampleHowToStep = {
  '@type': 'HowToStep',
  name: 'Preheat',
  text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
  url: 'https://example.com/party-coffee-cake#step1',
  image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
};

const howToStep100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'How To Step',
    description: 'A step (normally in a list of instructions)',
    properties: {
      '@type': {
        type: 'string',
        description: 'Schema.org type',
      },
      name: {
        type: 'string',
        description: 'The name of the step.',
      },
      text: {
        type: 'string',
        description: 'The description of the step.',
      },
      url: {
        type: 'string',
        description: 'A url for the step.',
      },
      image: {
        type: 'string',
        description: 'An image for the step.',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: exampleHowToStep,
};

const exampleNutrition = {
  '@type': 'NutritionInformation',
  calories: '270 calories',
};

const nutrition100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'How To Step',
    description: 'A step (normally in a list of instructions)',
    properties: {
      '@type': {
        type: 'string',
        description: 'Schema.org type',
      },
      calories: {
        type: 'string',
        description: 'Calories description.',
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: exampleNutrition,
};

const recipe100 = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    type: 'object',
    title: 'Recipe',
    description:
      'An example schema describing JSON-LD for type: Social Profile',
    properties: {
      '@context': {
        type: 'string',
        description: 'Schema.org context',
      },
      '@type': {
        type: 'string',
        description: 'Schema.org type',
      },
      name: {
        type: 'string',
        description: 'The name of the recipe.',
      },
      description: {
        type: 'string',
        description: 'The description of the recipe.',
      },
      image: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of images for the recipe.',
      },
      author: {
        ...author100.schema,
        see: author100,
      },
      datePublished: {
        type: 'string',
        description: 'Publish date of the recipe',
      },
      prepTime: {
        type: 'string',
        description: 'Prep time of the recipe',
      },
      cookTime: {
        type: 'string',
        description: 'Cook time of the recipe',
      },
      totalTime: {
        type: 'string',
        description: 'Total Time the recipe',
      },
      keywords: {
        type: 'string',
        description: 'keywords for the recipe',
      },
      recipeYield: {
        type: 'string',
        description: 'Servings of the recipe',
      },
      recipeCategory: {
        type: 'string',
        description: 'Category of the recipe',
      },
      recipeCuisine: {
        type: 'string',
        description: 'Cuisine the recipe',
      },
      recipeIngredient: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Array of ingredients for the recipe.',
      },
      nutrition: {
        ...nutrition100.schema,
        see: nutrition100,
      },
      recipeInstructions: {
        type: 'array',
        items: {
          ...howToStep100.schema,
          see: howToStep100,
        },
        description: 'Array of instructions for the recipe.',
      },
      aggregateRating: {
        ...aggregateRating100.schema,
        see: aggregateRating100,
      },
      video: {
        ...videoObject100.schema,
        required: true,
        see: videoObject100,
      },
    },
    required: true,
    additionalProperties: false,
  },
  example: {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: 'Party Coffee Cake',
    image: [
      'https://example.com/photos/1x1/photo.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    author: {
      '@type': 'Person',
      name: 'Mary Stone',
    },
    datePublished: '2018-03-10',
    description: 'This coffee cake is awesome and perfect for parties.',
    prepTime: 'PT20M',
    cookTime: 'PT30M',
    totalTime: 'PT50M',
    keywords: 'cake for a party, coffee',
    recipeYield: '10',
    recipeCategory: 'Dessert',
    recipeCuisine: 'American',
    nutrition: exampleNutrition,
    recipeIngredient: [
      '2 cups of flour',
      '3/4 cup white sugar',
      '2 teaspoons baking powder',
      '1/2 teaspoon salt',
      '1/2 cup butter',
      '2 eggs',
      '3/4 cup milk',
    ],
    recipeInstructions: [exampleHowToStep],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '18',
    },
    video: exampleVideo,
  },
};

const recipe = versionSchemas(recipe100);
export default recipe;
