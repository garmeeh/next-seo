import React from 'react';

import type {
  Offers,
  AggregateRating,
  GamePlayMode,
  Video,
  Review,
  ApplicationCategory,
} from 'src/types';
import { setAggregateRating } from 'src/utils/new/setAggregateRating';
import { setAuthor } from 'src/utils/new/setAuthor';
import { setImage } from 'src/utils/new/setImage';
import { setOffers } from 'src/utils/new/setOffers';
import { setProducer } from 'src/utils/new/setProducer';
import { setProvider } from 'src/utils/new/setProvider';
import { setReviews } from 'src/utils/new/setReviews';
import { setVideo } from 'src/utils/new/setVideo';

import { JsonLd, JsonLdProps } from './jsonld';

export interface VideoGameJsonLdProps extends JsonLdProps {
  keyOverride?: string;
  name: string;
  url?: string;
  image?: string;
  description?: string;
  languageName?: string | string[];
  translatorName?: string | string[];
  authorName?: string;
  aggregateRating?: AggregateRating;
  applicationCategory?: ApplicationCategory;
  platformName?: string | string[];
  operatingSystemName?: string | string[];
  datePublished?: string;
  keywords?: string;
  producerName?: string;
  producerUrl?: string;
  providerName?: string;
  providerUrl?: string;
  publisherName?: string | string[];
  offers?: Offers | Offers[];
  genreName?: string | string[];
  playMode?: GamePlayMode | GamePlayMode[];
  processorRequirements?: string;
  memoryRequirements?: string;
  storageRequirements?: string;
  trailer?: Video;
  reviews?: Review[];
}

function VideoGameJsonLd({
  type = 'VideoGame',
  keyOverride,
  aggregateRating,
  trailer,
  reviews,
  image,
  authorName,
  provider,
  producerName,
  producerUrl,
  offers,
  operatingSystemName,
  platformName,
  translatorName,
  languageName,
  genreName,
  publisherName,
  ...rest
}: VideoGameJsonLdProps) {
  const data = {
    ...rest,
    aggregateRating: setAggregateRating(aggregateRating),
    trailer: setVideo(trailer),
    review: setReviews(reviews),
    image: setImage(image),
    author: setAuthor(authorName),
    provider: setProvider(provider),
    producer: setProducer({ name: producerName, url: producerUrl } as any),
    offers: setOffers(offers),
    operatingSystem: operatingSystemName,
    gamePlatform: platformName,
    translator: translatorName,
    inLanguage: languageName,
    genre: genreName,
    publisher: publisherName,
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="VideoGame"
    />
  );
}

export default VideoGameJsonLd;
