import type {
  ImageObject,
  InteractionCounter,
  Organization,
  Author,
} from "./common.types";

// Type for ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
export type Duration = string;

// Type for thumbnail URLs - can be string, ImageObject, or array
export type Thumbnail = string | ImageObject | Omit<ImageObject, "@type">;

// Type for regions (ISO 3166-1 country codes)
export type Region = string | string[];

// BroadcastEvent for live videos
export interface BroadcastEvent {
  "@type": "BroadcastEvent";
  name?: string;
  isLiveBroadcast: boolean;
  startDate: string;
  endDate?: string;
}

// Clip for video segments/key moments
export interface Clip {
  "@type": "Clip";
  name: string;
  startOffset: number;
  endOffset?: number;
  url: string;
}

// SeekToAction for automatic key moments
export interface SeekToAction {
  "@type": "SeekToAction";
  target: string;
  "startOffset-input": string;
}

// EntryPoint wrapper for SeekToAction
export interface PotentialAction {
  "@type": "SeekToAction";
  target: string;
  "startOffset-input": string;
}

// Enhanced VideoObject with all Google-specified properties
export interface VideoObjectBase {
  name: string;
  description: string;
  thumbnailUrl: Thumbnail | Thumbnail[];
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: Duration;
  expires?: string;
  interactionStatistic?:
    | InteractionCounter
    | Omit<InteractionCounter, "@type">
    | (InteractionCounter | Omit<InteractionCounter, "@type">)[];
  regionsAllowed?: Region;
  ineligibleRegion?: Region;
  publication?:
    | BroadcastEvent
    | Omit<BroadcastEvent, "@type">
    | (BroadcastEvent | Omit<BroadcastEvent, "@type">)[];
  hasPart?: Clip | Omit<Clip, "@type"> | (Clip | Omit<Clip, "@type">)[];
  potentialAction?: PotentialAction | Omit<PotentialAction, "@type">;
  author?: Author | Author[];
  publisher?: Organization | Omit<Organization, "@type">;
}

// VideoObject schema type
export interface VideoObject extends VideoObjectBase {
  "@type": "VideoObject";
}

// Component props - developers don't need to specify @type
export type VideoJsonLdProps = Omit<VideoObject, "@type"> & {
  type?: "VideoObject";
  scriptId?: string;
  scriptKey?: string;
};
