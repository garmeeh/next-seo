import React from 'react';
import { CarouselJsonLd } from '../../../';
import Links from '../../components/links';

const Movie = () => (
  <>
    <h1>Carousel Movie JSON-LD</h1>

    <CarouselJsonLd
      ofType="movie"
      data={[
        {
          name: 'Movie 1',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: {
            name: 'John Doe',
          },
          review: {
            author: 'Ronan Farrow',
            reviewBody:
              'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
        {
          name: 'Movie 2',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: {
            name: 'Mary Doe',
          },
          review: {
            author: 'Ronan Farrow',
            reviewBody:
              'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
      ]}
    />

    <Links />
  </>
);

export default Movie;
