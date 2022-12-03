import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import type {
  Location,
  AggregateOffer,
  Offers,
  Performer,
  Organizer,
  EventStatus,
  EventAttendanceMode,
} from 'src/types';
import { setLocation } from 'src/utils/schema/setLocation';
import { setPerformer } from 'src/utils/schema/setPerformer';
import { setOffers } from 'src/utils/schema/setOffers';
import { setAggregateOffer } from 'src/utils/schema/setAggregateOffer';
import { setOrganizer } from 'src/utils/schema/setOrganizer';

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
  organizer?: Organizer;
  eventStatus?: EventStatus;
  eventAttendanceMode?: EventAttendanceMode;
}

function EventJsonLd({
  type = 'Event',
  keyOverride,
  location,
  images,
  offers,
  aggregateOffer,
  performers,
  organizer,
  eventStatus,
  eventAttendanceMode,
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
    organizer: Array.isArray(organizer)
      ? organizer.map(setOrganizer)
      : setOrganizer(organizer),
    eventStatus: eventStatus ? `https://schema.org/${eventStatus}` : undefined,
    eventAttendanceMode: eventAttendanceMode
      ? `https://schema.org/${eventAttendanceMode}`
      : undefined,
  };

  return (
    <JsonLd type={type} keyOverride={keyOverride} {...data} scriptKey="Event" />
  );
}

export default EventJsonLd;
