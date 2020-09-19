import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';
import minifyJsonLd from '../utils/minifyJsonLd';
import buildAddress from '../utils/buildAddress';
import { Address } from '../types';

type Location = {
  name: string;
  address: Address;
  sameAs?: string;
};

export interface EventJsonLdProps {
  name: string;
  startDate: string;
  endDate: string;
  location: Location;
  url?: string;
  description?: string;
  images?: string[];
}

const buildLocation = (location: Location) => `
  "location": {
    "@type": "Place",
    ${buildAddress(location.address)}
    ${location.sameAs ? `"sameAs": "${location.sameAs}",` : ``}
    "name": "${location.name}"
  },
`;

const EventJsonLd: FC<EventJsonLdProps> = ({
  name,
  startDate,
  endDate,
  location,
  url,
  description,
  images,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Event",
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    ${buildLocation(location)}
    ${images ? `"image":${formatIfArray(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${description}",` : ``}
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(minifyJsonLd(jslonld))}
        key="jsonld-event"
      />
    </Head>
  );
};

export default EventJsonLd;
