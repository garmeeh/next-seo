import { FC } from 'react';
import { Address, AggregateOffer, Offers } from '../types';
declare type Location = {
  name: string;
  address: Address;
  sameAs?: string;
};
declare type Performer = {
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
declare const EventJsonLd: FC<EventJsonLdProps>;
export default EventJsonLd;
