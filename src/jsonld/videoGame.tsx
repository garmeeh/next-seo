import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import { buildAggregateRating } from '../utils/buildAggregateRating';
import { buildOffers } from '../utils/buildOffers';
import { buildReviews } from '../utils/buildReviews';
import buildVideo from '../utils/buildVideo';
import formatIfArray from '../utils/formatIfArray';

import {
  Offers,
  AggregateRating,
  GamePlayMode,
  Video,
  Review,
  ApplicationCategory,
} from '../types';

export interface VideoGameJsonLdProps {
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

const VideoGameJsonLd: FC<VideoGameJsonLdProps> = ({
  keyOverride,
  name,
  url,
  image,
  description,
  languageName,
  translatorName,
  authorName,
  aggregateRating,
  applicationCategory,
  platformName,
  operatingSystemName,
  datePublished,
  keywords,
  producerName,
  producerUrl,
  providerName,
  providerUrl,
  publisherName,
  offers,
  genreName,
  playMode,
  processorRequirements,
  memoryRequirements,
  storageRequirements,
  trailer,
  reviews = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "VideoGame",
    "name": "${name}",
    ${description ? `"description": "${description}",` : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${datePublished ? `"datePublished": "${datePublished}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${trailer ? `"trailer": ${buildVideo(trailer)},` : ''}
    ${reviews.length ? buildReviews(reviews) : ''}
    ${keywords ? `"keywords": "${keywords}",` : ''}
    ${
      processorRequirements
        ? `"processorRequirements": "${processorRequirements}",`
        : ''
    }
    ${
      memoryRequirements ? `"memoryRequirements": "${memoryRequirements}",` : ''
    }
    ${
      storageRequirements
        ? `"storageRequirements": "${storageRequirements}",`
        : ''
    }
    ${playMode ? `"playMode": "${playMode}",` : ''}
    ${
      applicationCategory
        ? `"applicationCategory": "${applicationCategory}",`
        : ''
    }
    ${
      operatingSystemName
        ? `"operatingSystem": ${
            Array.isArray(operatingSystemName)
              ? formatIfArray(operatingSystemName)
              : `"${operatingSystemName}"`
          },`
        : ''
    }
    ${
      platformName
        ? `"gamePlatform": ${
            Array.isArray(platformName)
              ? formatIfArray(platformName)
              : `"${platformName}"`
          },`
        : ''
    }
    ${
      translatorName
        ? `"translator": ${
            Array.isArray(translatorName)
              ? formatIfArray(translatorName)
              : `"${translatorName}"`
          },`
        : ''
    }
    ${
      languageName
        ? `"inLanguage": ${
            Array.isArray(languageName)
              ? formatIfArray(languageName)
              : `"${languageName}"`
          },`
        : ''
    }
    ${
      genreName
        ? `"genre": ${
            Array.isArray(genreName)
              ? formatIfArray(genreName)
              : `"${genreName}"`
          },`
        : ''
    }
    ${
      publisherName
        ? `"publisher": ${
            Array.isArray(publisherName)
              ? formatIfArray(publisherName)
              : `"${publisherName}"`
          },`
        : ''
    }
    ${
      image
        ? `
        "image": {
          "@type": "ImageObject",
          "url": "${image}"
        },
        `
        : ''
    }
    ${
      authorName
        ? `
        "author": {
          "@type": "Organization",
          "name": "${authorName}"
        },
        `
        : ''
    }
    ${
      providerName
        ? `
        "provider": {
          "@type": "Organization",
          ${providerUrl ? `"sameAs": "${providerUrl}",` : ''}
          "name": "${providerName}"
        },
        `
        : ''
    }
    ${
      producerName
        ? `
        "producer": {
          "@type": "Organization",
          ${producerUrl ? `"sameAs": "${producerUrl}",` : ''}
          "name": "${producerName}"
        },
        `
        : ''
    }
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          }`
        : ''
    }
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-video-game${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default VideoGameJsonLd;
