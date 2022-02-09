import { assertSchema } from '@cypress/schema-tools';
import schemas from '../schemas';

describe('Recipe JSON-LD', () => {
  it('matches schema', () => {
    cy.visit('http://localhost:3000/jsonld/recipe');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      assertSchema(schemas)('Recipe', '1.0.0')(jsonLD);
    });
  });

  it('renders with all props', () => {
    cy.visit('http://localhost:3000/jsonld/recipe');
    cy.get('head script[type="application/ld+json"]').then(tags => {
      const jsonLD = JSON.parse(tags[0].innerHTML);
      expect(jsonLD).to.deep.equal({
        '@context': 'https://schema.org',
        '@type': 'Recipe',
        name: 'Party Coffee Cake',
        image: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        author: [
          {
            '@type': 'Person',
            name: 'Jane Blogs',
          },
          {
            '@type': 'Person',
            name: 'Mary Stone',
          },
        ],
        datePublished: '2018-03-10',
        description: 'This coffee cake is awesome and perfect for parties.',
        prepTime: 'PT20M',
        cookTime: 'PT30M',
        totalTime: 'PT50M',
        keywords: 'cake for a party, coffee',
        recipeYield: '10',
        recipeCategory: 'Dessert',
        recipeCuisine: 'American',
        nutrition: {
          '@type': 'NutritionInformation',
          calories: '270 calories',
        },
        recipeIngredient: [
          '2 cups of flour',
          '3/4 cup white sugar',
          '2 teaspoons baking powder',
          '1/2 teaspoon salt',
          '1/2 cup butter',
          '2 eggs',
          '3/4 cup milk',
        ],
        recipeInstructions: [
          {
            '@type': 'HowToStep',
            name: 'Preheat',
            text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
            url: 'https://example.com/party-coffee-cake#step1',
            image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '18',
        },
        video: {
          '@type': 'VideoObject',
          name: 'How to make a Party Coffee Cake',
          description: 'This is how you make a Party Coffee Cake.',
          thumbnailUrl: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          contentUrl: 'http://www.example.com/video123.mp4',
          embedUrl: 'http://www.example.com/videoplayer?video=123',
          uploadDate: '2018-02-05T08:00:00+08:00',
          duration: 'PT1M33S',
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WatchAction',
            userInteractionCount: 2347,
          },
          expires: '2019-02-05T08:00:00+08:00',
        },
      });
    });
  });
});
