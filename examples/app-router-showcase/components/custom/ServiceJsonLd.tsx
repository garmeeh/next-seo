"use client";

import { JsonLdScript, processors, type Organization } from "next-seo";

interface ServiceJsonLdProps {
  name: string;
  serviceType?: string;
  provider?: string | Omit<Organization, "@type">;
  areaServed?: string | string[];
  description?: string;
  url?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    priceRange?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount?: number;
    bestRating?: number;
    worstRating?: number;
  };
}

/**
 * Custom Service JSON-LD component built using next-seo's core utilities
 * Demonstrates flexible input processing and the @type optional pattern
 */
export function ServiceJsonLd({
  name,
  serviceType,
  provider,
  areaServed,
  description,
  url,
  offers,
  aggregateRating,
}: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    ...(serviceType && { serviceType }),
    ...(description && { description }),
    ...(url && { url }),
    ...(provider && {
      provider:
        typeof provider === "string"
          ? processors.processOrganization(provider)
          : processors.processOrganization(provider),
    }),
    ...(areaServed && {
      areaServed: Array.isArray(areaServed) ? areaServed : [areaServed],
    }),
    ...(offers && {
      offers: {
        "@type": "Offer",
        ...(offers.price && { price: offers.price }),
        ...(offers.priceCurrency && { priceCurrency: offers.priceCurrency }),
        ...(offers.priceRange && { priceRange: offers.priceRange }),
      },
    }),
    ...(aggregateRating && {
      aggregateRating: processors.processAggregateRating(aggregateRating),
    }),
  };

  return <JsonLdScript data={data} scriptKey="service" />;
}
