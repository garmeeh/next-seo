import React from 'react';
import { RecipeJsonLd } from '../../..';

function Recipe() {
  return (
    <>
      <h1>Recipe</h1>
      <RecipeJsonLd
        name="Party Coffee Cake"
        description="This coffee cake is awesome and perfect for parties."
        datePublished="2018-03-10"
        authorName={['Jane Blogs', 'Mary Stone']}
        prepTime="PT20M"
        cookTime="PT30M"
        totalTime="PT50M"
        keywords="cake for a party, coffee"
        yields="10"
        category="Dessert"
        cuisine="American"
        calories={270}
        images={[
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ]}
        ingredients={[
          '2 cups of flour',
          '3/4 cup white sugar',
          '2 teaspoons baking powder',
          '1/2 teaspoon salt',
          '1/2 cup butter',
          '2 eggs',
          '3/4 cup milk',
        ]}
        instructions={[
          {
            name: 'Preheat',
            text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
            url: 'https://example.com/party-coffee-cake#step1',
            image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
          },
        ]}
        aggregateRating={{
          ratingValue: '5',
          ratingCount: '18',
        }}
        video={{
          name: 'How to make a Party Coffee Cake',
          description: 'This is how you make a Party Coffee Cake.',
          contentUrl: 'http://www.example.com/video123.mp4',
          embedUrl: 'http://www.example.com/videoplayer?video=123',
          uploadDate: '2018-02-05T08:00:00+08:00',
          duration: 'PT1M33S',
          thumbnailUrls: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          expires: '2019-02-05T08:00:00+08:00',
          watchCount: 2347,
        }}
      />
    </>
  );
}

export default Recipe;
