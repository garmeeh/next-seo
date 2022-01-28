import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type { Location, AggregateOffer, Offers, Performer } from 'src/types';
import { setLocation } from 'src/utils/schema/setLocation';
import { setPerformer } from 'src/utils/schema/setPerformer';
import { setOffers } from 'src/utils/schema/setOffers';
import { setAggregateOffer } from 'src/utils/schema/setAggregateOffer';

export interface EventJsonLdProps extends JsonLdProps {
  name: string;
  startDate: string;
  endDate: string;
  location: Location;
  url?: string;
  description?: string;
  images?: string[];
  offers?: Offers | Offers[];
  aggregateOffer?: AggregateOffer;
  performers?: Performer | Performer[];
}

function EventJsonLd({
  type = 'Event',
  keyOverride,
  location,
  images,
  offers,
  aggregateOffer,
  performers,
  ...rest
}: EventJsonLdProps) {
  const data = {
    ...rest,
    location: setLocation(location),
    image: images,
    offers: offers ? setOffers(offers) : setAggregateOffer(aggregateOffer),
    performer: Array.isArray(performers)
      ? performers.map(setPerformer)
      : setPerformer(performers),
  };
  return (
    <JsonLd type={type} keyOverride={keyOverride} {...data} scriptKey="Event" />
  );
}

export default EventJsonLd;
