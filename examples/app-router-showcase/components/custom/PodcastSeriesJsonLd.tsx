"use client";

import { JsonLdScript, processors } from "next-seo";

interface PodcastEpisode {
  name: string;
  duration?: string;
  datePublished?: string;
  description?: string;
  url?: string;
}

interface PodcastSeriesJsonLdProps {
  name: string;
  description?: string;
  host?: string | { name: string; url?: string };
  episodes?: PodcastEpisode[];
  image?: string | { url: string; width?: number; height?: number };
  url?: string;
}

/**
 * Custom PodcastSeries JSON-LD component built using next-seo's core utilities
 * Demonstrates how to create custom structured data components with the library's processors
 */
export function PodcastSeriesJsonLd({
  name,
  description,
  host,
  episodes,
  image,
  url,
}: PodcastSeriesJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name,
    ...(description && { description }),
    ...(url && { url }),
    ...(host && {
      host:
        typeof host === "string"
          ? processors.processAuthor(host)
          : processors.processAuthor(host),
    }),
    ...(image && { image: processors.processImage(image) }),
    ...(episodes &&
      episodes.length > 0 && {
        episode: episodes.map((ep, index) => ({
          "@type": "PodcastEpisode",
          name: ep.name,
          position: index + 1,
          ...(ep.duration && { duration: ep.duration }),
          ...(ep.datePublished && { datePublished: ep.datePublished }),
          ...(ep.description && { description: ep.description }),
          ...(ep.url && { url: ep.url }),
        })),
      }),
  };

  return <JsonLdScript data={data} scriptKey="podcast-series" />;
}
