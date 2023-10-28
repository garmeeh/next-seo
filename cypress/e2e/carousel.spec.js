describe('Carousel JSON-LD', () => {
  it('Carousel Default Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/default');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              url: 'http://example.com/peanut-butter-cookies.html',
            },
            {
              '@type': 'ListItem',
              position: '2',
              url: 'http://example.com/triple-chocolate-chunk.html',
            },
          ],
        };
        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Course Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/course');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Course',
                url: 'http://example.com/course-1.html',
                name: 'Course 1',
                description: 'Course 1 Description',
                provider: {
                  '@type': 'Organization',
                  name: 'Course Provider',
                },
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Course',
                url: 'http://example.com/course-2.html',
                name: 'Course 2',
                description: 'Course 2 Description',
                provider: {
                  '@type': 'Organization',
                  name: 'Course Provider',
                },
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Movie Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/movie');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: 'Movie 1',
                url: 'http://example.com/movie-1.html',
                image:
                  'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
                director: { '@type': 'Person', name: 'John Doe' },
                review: {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Ronan Farrow' },
                  reviewBody:
                    'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
                  reviewRating: { '@type': 'Rating', ratingValue: '5' },
                },
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Movie',
                name: 'Movie 2',
                url: 'http://example.com/movie-1.html',
                image:
                  'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
                director: { '@type': 'Person', name: 'Mary Doe' },
                review: {
                  '@type': 'Review',
                  author: { '@type': 'Person', name: 'Ronan Farrow' },
                  reviewBody:
                    'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
                  reviewRating: { '@type': 'Rating', ratingValue: '5' },
                },
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Recipe Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/recipe');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: '1',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Recipe',
                name: 'Party Coffee Cake',
                url: 'http://example.com/recipe-1.html',
                description:
                  'This coffee cake is awesome and perfect for parties.',
                datePublished: '2018-03-10',
                author: { '@type': 'Person', name: 'Mary Stone' },
                image: [
                  'https://example.com/photos/1x1/photo.jpg',
                  'https://example.com/photos/4x3/photo.jpg',
                  'https://example.com/photos/16x9/photo.jpg',
                ],
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
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  ratingCount: '18',
                },
                video: {
                  '@type': 'VideoObject',
                  name: 'How to make a Party Coffee Cake',
                  thumbnailUrl: [
                    'https://example.com/photos/1x1/photo.jpg',
                    'https://example.com/photos/4x3/photo.jpg',
                    'https://example.com/photos/16x9/photo.jpg',
                  ],
                  description: 'This is how you make a Party Coffee Cake.',
                  contentUrl: 'http://www.example.com/video123.mp4',
                  uploadDate: '2018-02-05T08:00:00+08:00',
                  duration: 'PT1M33S',
                  embedUrl: 'http://www.example.com/videoplayer?video=123',
                  expires: '2019-02-05T08:00:00+08:00',
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
                    image:
                      'https://example.com/photos/party-coffee-cake/step1.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Mix dry ingredients',
                    text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
                    url: 'https://example.com/party-coffee-cake#step2',
                    image:
                      'https://example.com/photos/party-coffee-cake/step2.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Spread into pan',
                    text: 'Spread into the prepared pan.',
                    url: 'https://example.com/party-coffee-cake#step4',
                    image:
                      'https://example.com/photos/party-coffee-cake/step4.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Bake',
                    text: 'Bake for 30 to 35 minutes, or until firm.',
                    url: 'https://example.com/party-coffee-cake#step5',
                    image:
                      'https://example.com/photos/party-coffee-cake/step5.jpg',
                  },
                ],
              },
            },
            {
              '@type': 'ListItem',
              position: '2',
              item: {
                '@context': 'https://schema.org',
                '@type': 'Recipe',
                name: 'Party Coffee Cake 2',
                url: 'http://example.com/recipe-2.html',
                description:
                  'This coffee cake is awesome and perfect for parties.',
                datePublished: '2018-03-10',
                author: { '@type': 'Person', name: 'Mary Stone 2' },
                image: [
                  'https://example.com/photos/1x1/photo.jpg',
                  'https://example.com/photos/4x3/photo.jpg',
                  'https://example.com/photos/16x9/photo.jpg',
                ],
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
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  ratingCount: '18',
                },
                video: {
                  '@type': 'VideoObject',
                  name: 'How to make a Party Coffee Cake',
                  thumbnailUrl: [
                    'https://example.com/photos/1x1/photo.jpg',
                    'https://example.com/photos/4x3/photo.jpg',
                    'https://example.com/photos/16x9/photo.jpg',
                  ],
                  description: 'This is how you make a Party Coffee Cake.',
                  contentUrl: 'http://www.example.com/video123.mp4',
                  uploadDate: '2018-02-05T08:00:00+08:00',
                  duration: 'PT1M33S',
                  embedUrl: 'http://www.example.com/videoplayer?video=123',
                  expires: '2019-02-05T08:00:00+08:00',
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
                    image:
                      'https://example.com/photos/party-coffee-cake/step1.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Mix dry ingredients',
                    text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
                    url: 'https://example.com/party-coffee-cake#step2',
                    image:
                      'https://example.com/photos/party-coffee-cake/step2.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Spread into pan',
                    text: 'Spread into the prepared pan.',
                    url: 'https://example.com/party-coffee-cake#step4',
                    image:
                      'https://example.com/photos/party-coffee-cake/step4.jpg',
                  },
                  {
                    '@type': 'HowToStep',
                    name: 'Bake',
                    text: 'Bake for 30 to 35 minutes, or until firm.',
                    url: 'https://example.com/party-coffee-cake#step5',
                    image:
                      'https://example.com/photos/party-coffee-cake/step5.jpg',
                  },
                ],
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });

  it('Carousel Custom Matches', () => {
    cy.visit('http://localhost:3000/carousel-jsonld/custom');
    cy.get('head script[type="application/ld+json"]')
      .should('have.length', 1)
      .then(tags => {
        const jsonLD = JSON.parse(tags[0].innerHTML);
        const expectedObject = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          url: 'http://example.com/custom-carousel.html',
          name: 'Carousel Custom',
          description: 'Custom Carousel Description',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'CustomList',
                name: 'Custom 1',
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@type': 'CustomList',
                name: 'Custom 2',
              },
            },
          ],
        };

        expect(jsonLD).to.deep.equal(expectedObject);
      });
  });
});
