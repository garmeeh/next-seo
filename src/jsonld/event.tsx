import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import buildAddress from '../utils/buildAddress';
import { Address, AggregateOffer, Offers } from '../types';
import { buildOffers } from '../utils/buildOffers';
import { buildAggregateOffer } from '../utils/buildAggregateOffer';

type Location = {
  name: string;
  address: Address;
  sameAs?: string;
};

type Performer = {
  name: string;
};

export interface EventJsonLdProps {
  keyOverride: string;
  name: string;
  startDate: string;
  endDate: string;
  eventType: string;
  eventStatus: string;
  eventAttendanceMode: string;
  location: Location;
  url?: string;
  description?: string;
  images?: string[];
  offers?: Offers | Offers[];
  aggregateOffer?: AggregateOffer;
  performers?: Performer | Performer[];
}

const buildLocation = (location: Location) => `
  "location": {
    "@type": "Place",
    ${buildAddress(location.address)}
    ${location.sameAs ? `"sameAs": "${location.sameAs}",` : ``}
    "name": "${location.name}"
  },
`;

const buildPerformer = (performer: Performer) => `
  {
    "@type": "PerformingGroup",
    "name": "${performer.name}"
  }
`;

const EventJsonLd: FC<EventJsonLdProps> = ({
  keyOverride,
  name,
  startDate,
  endDate,
  location,
  url,
  description,
  images,
  offers,
  aggregateOffer,
  performers,
  eventType,
  eventStatus,
  eventAttendanceMode,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": ${eventType ? eventType : 'Event'},
    ${eventStatus ? `"eventStatus":"${eventStatus}",` : ``}
    ${
      eventAttendanceMode
        ? `"eventAttendanceMode":"${eventAttendanceMode}",`
        : ``
    }
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    ${buildLocation(location)}
    ${images ? `"image":${formatIfArray(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${description}",` : ``}
    
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    ${
      performers
        ? `"performer": ${
            Array.isArray(performers)
              ? `[${performers.map(
                  performer => `${buildPerformer(performer)}`,
                )}]`
              : buildPerformer(performers)
          },`
        : ''
    }
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-video${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default EventJsonLd;
