import type {
  ImageObject,
  Person,
  Organization,
  PostalAddress,
  Thing,
} from "./common.types";

// Place type for event location
export interface Place {
  "@type": "Place";
  name?: string;
  address: PostalAddress | Omit<PostalAddress, "@type">;
}

// Offer type for ticket information
export interface Offer {
  "@type": "Offer";
  url?: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
  validFrom?: string;
}

// PerformingGroup type for performers
export interface PerformingGroup extends Thing {
  "@type": "PerformingGroup";
}

// Performer can be Person or PerformingGroup
export type Performer =
  | string
  | Person
  | PerformingGroup
  | Omit<Person, "@type">
  | Omit<PerformingGroup, "@type">;

// Organizer can be Person or Organization
export type Organizer =
  | string
  | Person
  | Organization
  | Omit<Person, "@type">
  | Omit<Organization, "@type">;

// Event status types
export type EventStatusType =
  | "https://schema.org/EventScheduled"
  | "https://schema.org/EventCancelled"
  | "https://schema.org/EventPostponed"
  | "https://schema.org/EventRescheduled";

// Base event interface
export interface EventBase {
  name: string;
  startDate: string;
  location: string | Place | Omit<Place, "@type">;
  endDate?: string;
  description?: string;
  eventStatus?: EventStatusType;
  image?:
    | string
    | ImageObject
    | Omit<ImageObject, "@type">
    | (string | ImageObject | Omit<ImageObject, "@type">)[];
  offers?: Offer | Omit<Offer, "@type"> | Offer[] | Omit<Offer, "@type">[];
  performer?: Performer | Performer[];
  organizer?: Organizer;
  previousStartDate?: string | string[];
  url?: string;
}

// Standard Event type
export interface Event extends EventBase {
  "@type": "Event";
}

// Component props
export type EventJsonLdProps = Omit<Event, "@type"> & {
  scriptId?: string;
  scriptKey?: string;
};
