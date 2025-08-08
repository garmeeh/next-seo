# Creating Custom JSON-LD Components with Next SEO

This guide shows you how to create your own structured data components using next-seo's core utilities, maintaining the same excellent developer experience as the built-in components.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Using Built-in Processors](#using-built-in-processors)
4. [Creating Custom Processors](#creating-custom-processors)
5. [Advanced Patterns](#advanced-patterns)
6. [Best Practices](#best-practices)
7. [Real-World Examples](#real-world-examples)

## Quick Start

Create a custom JSON-LD component in just a few lines:

```tsx
import { JsonLdScript, processors } from "next-seo";

export function PodcastEpisodeJsonLd({ name, author, duration, url }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name,
    ...(url && { url }),
    ...(duration && { duration }),
    ...(author && { author: processors.processAuthor(author) }),
  };

  return <JsonLdScript data={data} scriptKey="podcast-episode" />;
}

// Usage - no @type needed!
<PodcastEpisodeJsonLd
  name="Episode 1: Getting Started"
  author="Jane Doe" // Simple string works!
  duration="PT30M"
  url="https://example.com/episode-1"
/>;
```

## Core Concepts

### The JsonLdScript Component

The `JsonLdScript` component is the foundation for rendering structured data:

```tsx
import { JsonLdScript } from "next-seo";

<JsonLdScript
  data={yourStructuredData}
  id={optionalId} // Optional: HTML id attribute
  scriptKey={requiredKey} // Required: React key for the script element
/>;
```

### The @type Optional Pattern

Next SEO's key principle: **developers should never need to specify @type manually**. This is achieved through intelligent processors that automatically add the correct Schema.org types.

```tsx
// Your users write this:
author="John Doe"

// Your processor converts it to:
{ "@type": "Person", name: "John Doe" }
```

### Processors

Processors are functions that transform flexible inputs into properly typed Schema.org objects:

```tsx
import { processors } from "next-seo";

// Use built-in processors for common types
const author = processors.processAuthor("John Doe");
const image = processors.processImage({ url: "image.jpg", width: 800 });
const address = processors.processAddress("123 Main St");
```

## Using Built-in Processors

Next SEO provides 60+ processors for common Schema.org types:

### People & Organizations

```tsx
import { processors } from "next-seo";

// Flexible author input
processors.processAuthor("Jane Doe"); // → Person
processors.processAuthor({ name: "ACME Corp", logo: "..." }); // → Organization

// Other people/org processors
processors.processPublisher("Tech Publishing");
processors.processOrganizer({ name: "Event Co", url: "..." });
processors.processPerformer("Band Name");
```

### Media & Content

```tsx
// Images - string URL or ImageObject
processors.processImage("https://example.com/image.jpg");
processors.processImage({ url: "...", width: 800, height: 600 });

// Videos
processors.processVideo({
  name: "Tutorial",
  uploadDate: "2024-01-01",
  thumbnailUrl: "...",
});

// Other media processors
processors.processLogo("logo.jpg");
processors.processScreenshot({ url: "...", caption: "App screenshot" });
```

### Locations & Places

```tsx
// Simple string becomes PostalAddress
processors.processAddress("123 Main St, City, Country");

// Object with more details
processors.processAddress({
  streetAddress: "123 Main St",
  addressLocality: "San Francisco",
  addressRegion: "CA",
  postalCode: "94105",
  addressCountry: "US",
});

// Places with geo coordinates
processors.processPlace({
  name: "Office",
  geo: { latitude: 37.7749, longitude: -122.4194 },
});
```

### Commerce & Offers

```tsx
// Product offers
processors.processProductOffer({
  price: 29.99,
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
});

// Return policies
processors.processMerchantReturnPolicy({
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
});
```

## Creating Custom Processors

### Basic Custom Processor

Create processors for your specific needs:

```tsx
import { processors } from "next-seo";

// Custom processor for a podcast host
function processHost(host: string | { name: string; bio?: string }) {
  if (typeof host === "string") {
    return {
      "@type": "Person",
      name: host,
    };
  }

  // Use the generic helper for objects
  return processors.processSchemaType(host, "Person");
}

// Use in your component
export function PodcastJsonLd({ hosts, ...props }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    ...(hosts && {
      host: Array.isArray(hosts) ? hosts.map(processHost) : processHost(hosts),
    }),
  };

  return <JsonLdScript data={data} scriptKey="podcast" />;
}
```

### Advanced Custom Processor with Type Detection

Intelligently determine the type based on input properties:

```tsx
function processCreativeWork(work: string | Record<string, any>) {
  if (typeof work === "string") {
    return {
      "@type": "CreativeWork",
      name: work,
    };
  }

  // Already has @type? Return as-is
  if (work["@type"]) {
    return work;
  }

  // Detect type based on properties
  let type = "CreativeWork";
  if ("isbn" in work) type = "Book";
  else if ("director" in work) type = "Movie";
  else if ("artist" in work) type = "MusicRecording";

  return {
    "@type": type,
    ...work,
  };
}
```

## Advanced Patterns

### Nested Processing

Process nested structures recursively:

```tsx
function processEventWithVenue(event: {
  name: string;
  venue?: string | { name: string; address?: string };
  organizer?: string | { name: string };
}) {
  return {
    "@type": "Event",
    name: event.name,
    ...(event.venue && {
      location:
        typeof event.venue === "string"
          ? processors.processPlace(event.venue)
          : processors.processPlace({
              ...event.venue,
              ...(event.venue.address && {
                address: processors.processAddress(event.venue.address),
              }),
            }),
    }),
    ...(event.organizer && {
      organizer: processors.processOrganizer(event.organizer),
    }),
  };
}
```

### Conditional Properties

Include properties only when they have values:

```tsx
export function CustomProductJsonLd({
  name,
  description,
  price,
  image,
  brand,
  reviews,
  aggregateRating,
  ...props
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(description && { description }),
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
      },
    }),
    ...(image && {
      image: Array.isArray(image)
        ? image.map(processors.processImage)
        : processors.processImage(image),
    }),
    ...(brand && { brand: processors.processBrand(brand) }),
    ...(reviews && {
      review: Array.isArray(reviews)
        ? reviews.map(processors.processReview)
        : processors.processReview(reviews),
    }),
    ...(aggregateRating && {
      aggregateRating: processors.processAggregateRating(aggregateRating),
    }),
  };

  return <JsonLdScript data={data} scriptKey={props.scriptKey || "product"} />;
}
```

### Multiple Schema Types

Support different schema types with a type prop:

```tsx
type ScholarlyArticleType =
  | "ScholarlyArticle"
  | "MedicalScholarlyArticle"
  | "TechArticle";

export function ScholarlyArticleJsonLd({
  type = "ScholarlyArticle",
  headline,
  author,
  datePublished,
  journal,
  doi,
  ...props
}: {
  type?: ScholarlyArticleType;
  headline: string;
  author: string | Array<string | { name: string }>;
  datePublished: string;
  journal?: string;
  doi?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    datePublished,
    ...(author && {
      author: Array.isArray(author)
        ? author.map(processors.processAuthor)
        : processors.processAuthor(author),
    }),
    ...(journal && {
      isPartOf: {
        "@type": "PublicationIssue",
        name: journal,
      },
    }),
    ...(doi && { identifier: processors.processIdentifier(doi) }),
  };

  return (
    <JsonLdScript
      data={data}
      scriptKey={props.scriptKey || `article-${type}`}
    />
  );
}
```

## Best Practices

### 1. Always Use Processors for Flexible Types

```tsx
// ✅ Good - uses processor
author: processors.processAuthor(author)

// ❌ Bad - requires user to specify @type
author: { "@type": "Person", ...author }
```

### 2. Handle Arrays and Single Values

```tsx
// Support both single and array inputs
...(tags && {
  keywords: Array.isArray(tags) ? tags.join(', ') : tags
})
```

### 3. Apply Sensible Defaults

```tsx
// Default dateModified to datePublished if not provided
const data = {
  datePublished,
  dateModified: dateModified || datePublished,
};
```

### 4. Use TypeScript for Better DX

```tsx
interface ServiceJsonLdProps {
  name: string;
  provider?: string | Organization;
  areaServed?: string | string[];
  serviceType?: string;
  scriptId?: string;
  scriptKey?: string;
}
```

### 5. Document Your Component

```tsx
/**
 * ServiceJsonLd - Structured data for service offerings
 *
 * @example
 * <ServiceJsonLd
 *   name="Web Development"
 *   provider="Tech Agency"
 *   areaServed={["US", "CA", "UK"]}
 *   serviceType="Professional Service"
 * />
 */
export function ServiceJsonLd({ ... }) { ... }
```

## Real-World Examples

### 1. Podcast Series with Episodes

```tsx
import { JsonLdScript, processors } from "next-seo";

interface PodcastSeriesProps {
  name: string;
  description?: string;
  host?: string | Array<string | { name: string; url?: string }>;
  episodes?: Array<{
    name: string;
    url?: string;
    duration?: string;
    datePublished?: string;
  }>;
  image?: string | { url: string; width?: number; height?: number };
  scriptKey?: string;
}

export function PodcastSeriesJsonLd({
  name,
  description,
  host,
  episodes,
  image,
  scriptKey = "podcast-series",
}: PodcastSeriesProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name,
    ...(description && { description }),
    ...(host && {
      host: Array.isArray(host)
        ? host.map((h) =>
            typeof h === "string"
              ? { "@type": "Person", name: h }
              : processors.processAuthor(h),
          )
        : typeof host === "string"
          ? { "@type": "Person", name: host }
          : processors.processAuthor(host),
    }),
    ...(image && { image: processors.processImage(image) }),
    ...(episodes && {
      episode: episodes.map((ep, index) => ({
        "@type": "PodcastEpisode",
        name: ep.name,
        position: index + 1,
        ...(ep.url && { url: ep.url }),
        ...(ep.duration && { duration: ep.duration }),
        ...(ep.datePublished && { datePublished: ep.datePublished }),
      })),
    }),
  };

  return <JsonLdScript data={data} scriptKey={scriptKey} />;
}
```

### 2. Real Estate Listing

```tsx
import { JsonLdScript, processors, type ImageObject } from "next-seo";

interface RealEstateListingProps {
  name: string;
  description?: string;
  price: number;
  priceCurrency?: string;
  address: string | Record<string, any>;
  images?: Array<string | ImageObject>;
  numberOfRooms?: number;
  floorSize?: { value: number; unitCode: string };
  yearBuilt?: number;
  scriptKey?: string;
}

export function RealEstateListingJsonLd({
  name,
  description,
  price,
  priceCurrency = "USD",
  address,
  images,
  numberOfRooms,
  floorSize,
  yearBuilt,
  scriptKey = "real-estate",
}: RealEstateListingProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    ...(description && { description }),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
    },
    address: processors.processAddress(address),
    ...(images && {
      image: images.map(processors.processImage),
    }),
    ...(numberOfRooms && { numberOfRooms }),
    ...(floorSize && {
      floorSize: processors.processQuantitativeValue(floorSize),
    }),
    ...(yearBuilt && { yearBuilt }),
  };

  return <JsonLdScript data={data} scriptKey={scriptKey} />;
}
```

### 3. Service with Pricing Tiers

```tsx
import { JsonLdScript, processors } from "next-seo";

interface ServiceWithPricingProps {
  name: string;
  provider: string | { name: string; url?: string };
  description?: string;
  pricingTiers?: Array<{
    name: string;
    price: number | { min: number; max: number };
    features?: string[];
  }>;
  areaServed?: string | string[];
  scriptKey?: string;
}

export function ServiceWithPricingJsonLd({
  name,
  provider,
  description,
  pricingTiers,
  areaServed,
  scriptKey = "service",
}: ServiceWithPricingProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: processors.processOrganization(provider),
    ...(description && { description }),
    ...(pricingTiers && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} Pricing`,
        itemListElement: pricingTiers.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          ...(typeof tier.price === "number"
            ? { price: tier.price }
            : {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: tier.price.min,
                  maxPrice: tier.price.max,
                  priceCurrency: "USD",
                },
              }),
          ...(tier.features && {
            description: tier.features.join(", "),
          }),
        })),
      },
    }),
    ...(areaServed && {
      areaServed: Array.isArray(areaServed) ? areaServed : [areaServed],
    }),
  };

  return <JsonLdScript data={data} scriptKey={scriptKey} />;
}
```

### 4. Educational Course with Modules

```tsx
import { JsonLdScript, processors } from "next-seo";

interface CourseWithModulesProps {
  name: string;
  description: string;
  provider: string | { name: string; url?: string };
  instructor?: string | Array<string | { name: string }>;
  modules?: Array<{
    name: string;
    description?: string;
    duration?: string;
  }>;
  price?: number;
  startDate?: string;
  endDate?: string;
  scriptKey?: string;
}

export function CourseWithModulesJsonLd({
  name,
  description,
  provider,
  instructor,
  modules,
  price,
  startDate,
  endDate,
  scriptKey = "course",
}: CourseWithModulesProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: processors.processProvider(provider),
    ...(instructor && {
      instructor: Array.isArray(instructor)
        ? instructor.map(processors.processAuthor)
        : processors.processAuthor(instructor),
    }),
    ...(modules && {
      hasCourseInstance: modules.map((module, index) => ({
        "@type": "CourseInstance",
        name: module.name,
        courseMode: "online",
        position: index + 1,
        ...(module.description && { description: module.description }),
        ...(module.duration && { duration: module.duration }),
      })),
    }),
    ...(price !== undefined && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        ...(startDate && { validFrom: startDate }),
        ...(endDate && { validThrough: endDate }),
      },
    }),
  };

  return <JsonLdScript data={data} scriptKey={scriptKey} />;
}
```

## Testing Your Components

### Unit Testing

```tsx
import { render } from "@testing-library/react";
import { ServiceJsonLd } from "./ServiceJsonLd";

describe("ServiceJsonLd", () => {
  it("renders service with basic props", () => {
    const { container } = render(
      <ServiceJsonLd name="Consulting Service" provider="Tech Solutions Inc" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script.textContent);

    expect(data["@type"]).toBe("Service");
    expect(data.name).toBe("Consulting Service");
    expect(data.provider["@type"]).toBe("Organization");
  });
});
```

### Validation

Use Google's Rich Results Test to validate your structured data:

1. Deploy your page with the custom component
2. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Enter your URL and check for errors

## Migration Guide

If you're migrating from inline JSON-LD to next-seo custom components:

### Before (Inline JSON-LD)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "My Service",
      provider: {
        "@type": "Organization",
        name: "My Company",
      },
    }),
  }}
/>
```

### After (Custom Component)

```tsx
import { JsonLdScript, processors } from "next-seo";

export function ServiceJsonLd({ name, provider }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: processors.processOrganization(provider),
  };

  return <JsonLdScript data={data} scriptKey="service" />;
}

// Usage - cleaner and type-safe!
<ServiceJsonLd
  name="My Service"
  provider="My Company" // No @type needed!
/>;
```

## Processor API Reference

For a complete list of available processors, see the [processors export file](./src/utils/processors.export.ts). Key processors include:

- `processSchemaType(value, type)` - Generic processor for any schema type
- `processAuthor(author)` - Person or Organization
- `processImage(image)` - String URL or ImageObject
- `processAddress(address)` - String or PostalAddress
- `processPlace(place)` - String or Place with address
- `processOffer(offer)` - Offer with price and availability
- `processReview(review)` - Review with rating and author
- `processAggregateRating(rating)` - Aggregate rating with count
- And 50+ more specialized processors...

## Getting Help

- Check existing components in [src/components](./src/components) for patterns
- Review [ADDING_NEW_COMPONENTS.md](./ADDING_NEW_COMPONENTS.md) for internal component development
- Open an issue for processor requests or questions
- Contribute new processors via PR

## Summary

Creating custom JSON-LD components with next-seo is simple:

1. Import `JsonLdScript` and `processors`
2. Define your component props (TypeScript recommended)
3. Use processors for flexible input handling
4. Apply the @type optional pattern
5. Return JsonLdScript with your data

This approach gives you:

- ✅ Type safety with TypeScript
- ✅ Flexible input handling
- ✅ No @type boilerplate for users
- ✅ Consistent with next-seo patterns
- ✅ Easy to test and maintain
