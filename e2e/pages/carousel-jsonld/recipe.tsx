import React from 'react';
import { CarouselJsonLd } from '../../../';
import Links from '../../components/links';

const Recipe = () => (
  <>
    <h1>Carousel Recipe JSON-LD</h1>

    <CarouselJsonLd
      type="recipe"
      data={[
        {
          name: 'Party Coffee Cake',
          url: 'http://example.com/recipe-1.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text:
                'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text:
                'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
        {
          name: 'Party Coffee Cake 2',
          url: 'http://example.com/recipe-2.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone 2',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text:
                'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text:
                'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
      ]}
    />

    <Links />
  </>
);

export default Recipe;
