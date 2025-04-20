import React from 'react';
import { Actor, AggregateRating, Offers, Video } from 'src/types';
import { JsonLd, JsonLdProps } from './jsonld';

import { setAuthor } from 'src/utils/schema/setAuthor';
import { setOffers } from 'src/utils/schema/setOffers';
import { setAggregateRating } from 'src/utils/schema/setAggregateRating';
import { setActors } from 'src/utils/schema/setActors';
import { setDirector } from 'src/utils/schema/setDirector';
import { setVideo } from 'src/utils/schema/setVideo';

export interface MovieJsonLdProps extends JsonLdProps {
  keyOverride?: string;
  name: string;
  contentRating: number;
  duration: string;
  dateCreated: string;
  description: string;
  image: string;
  authorName?: string;
  directorName?: string;
  actors?: Actor | Actor[];
  genreName?: string | string[];
  trailer?: Video;
  offers?: Offers | Offers[];
  countryOfOrigin?: string;
  aggregateRating?: AggregateRating;
}

function MovieJsonLd({
  type = 'Movie',
  keyOverride,
  authorName,
  directorName,
  actors,
  genreName,
  trailer,
  offers,
  countryOfOrigin,
  aggregateRating,
  ...rest
}: MovieJsonLdProps) {
  const data = {
    ...rest,
    author: setAuthor(authorName),
    director: setDirector(directorName),
    actors: setActors(actors),
    genre: genreName,
    trailer: setVideo(trailer),
    offers: setOffers(offers),
    countryOfOrigin: countryOfOrigin,
    aggregateRating: setAggregateRating(aggregateRating),
  };

  return (
    <JsonLd type={type} keyOverride={keyOverride} {...data} scriptKey="Movie" />
  );
}

export default MovieJsonLd;
