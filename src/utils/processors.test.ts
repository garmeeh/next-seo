import { describe, it, expect } from "vitest";
import {
  processImage,
  processAggregateRating,
  processLogo,
  processAuthor,
  processAddress,
  processPerformer,
  processContactPoint,
  processOrganizer,
  processReview,
  processMainEntityOfPage,
  processMerchantReturnPolicy,
  processVideo,
  processInstruction,
  processDataCatalog,
  processDataDownload,
  processLicense,
} from "./processors";

describe("processImage", () => {
  it("should return string URL as-is", () => {
    const result = processImage("https://example.com/image.jpg");
    expect(result).toBe("https://example.com/image.jpg");
  });

  it("should return ImageObject with @type as-is", () => {
    const imageObject = {
      "@type": "ImageObject" as const,
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
    };
    const result = processImage(imageObject);
    expect(result).toEqual(imageObject);
  });

  it("should add @type to ImageObject without it", () => {
    const imageObjectWithoutType = {
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
    };
    const result = processImage(imageObjectWithoutType);
    expect(result).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/image.jpg",
      width: 800,
      height: 600,
    });
  });
});

describe("processLogo", () => {
  it("should process logo same as image", () => {
    const logoWithoutType = {
      url: "https://example.com/logo.png",
      width: 200,
      height: 200,
    };
    const result = processLogo(logoWithoutType);
    expect(result).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/logo.png",
      width: 200,
      height: 200,
    });
  });
});

describe("processAggregateRating", () => {
  it("should return AggregateRating with @type as-is", () => {
    const rating = {
      "@type": "AggregateRating" as const,
      ratingValue: 4.5,
      ratingCount: 10,
      bestRating: 5,
      worstRating: 1,
    };
    const result = processAggregateRating(rating);
    expect(result).toEqual(rating);
  });

  it("should add @type to AggregateRating without it", () => {
    const ratingWithoutType = {
      ratingValue: 4.5,
      ratingCount: 10,
      bestRating: 5,
      worstRating: 1,
    };
    const result = processAggregateRating(ratingWithoutType);
    expect(result).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      ratingCount: 10,
      bestRating: 5,
      worstRating: 1,
    });
  });
});

describe("processAuthor", () => {
  it("should convert string to Person", () => {
    const result = processAuthor("John Doe");
    expect(result).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
  });

  it("should return Person with @type as-is", () => {
    const person = {
      "@type": "Person" as const,
      name: "Jane Smith",
      givenName: "Jane",
      familyName: "Smith",
    };
    const result = processAuthor(person);
    expect(result).toEqual(person);
  });

  it("should return Organization with @type as-is", () => {
    const org = {
      "@type": "Organization" as const,
      name: "Acme Corp",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
    };
    const result = processAuthor(org);
    expect(result).toEqual(org);
  });

  it("should add @type Person to object without Organization properties", () => {
    const personWithoutType = {
      name: "John Doe",
      givenName: "John",
      familyName: "Doe",
    };
    const result = processAuthor(personWithoutType);
    expect(result).toEqual({
      "@type": "Person",
      name: "John Doe",
      givenName: "John",
      familyName: "Doe",
    });
  });

  it("should add @type Organization to object with logo", () => {
    const orgWithoutType = {
      name: "WebDev Solutions",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
    };
    const result = processAuthor(orgWithoutType);
    expect(result).toEqual({
      "@type": "Organization",
      name: "WebDev Solutions",
      url: "https://example.com",
      logo: "https://example.com/logo.png",
    });
  });

  it("should add @type Organization to object with address", () => {
    const orgWithoutType = {
      name: "Company Inc",
      address: "123 Main St",
    };
    const result = processAuthor(orgWithoutType);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Company Inc",
      address: "123 Main St",
    });
  });

  it("should add @type Organization to object with sameAs", () => {
    const orgWithoutType = {
      name: "Social Media Co",
      sameAs: ["https://twitter.com/company", "https://facebook.com/company"],
    };
    const result = processAuthor(orgWithoutType);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Social Media Co",
      sameAs: ["https://twitter.com/company", "https://facebook.com/company"],
    });
  });

  it("should default to Person for ambiguous object with just name", () => {
    const ambiguousWithoutType = {
      name: "Could be either",
    };
    const result = processAuthor(ambiguousWithoutType);
    expect(result).toEqual({
      "@type": "Person",
      name: "Could be either",
    });
  });

  it("should add @type Person when object has url but also person properties", () => {
    const personWithUrl = {
      name: "John Blogger",
      url: "https://johnblog.com",
      givenName: "John",
    };
    const result = processAuthor(personWithUrl);
    expect(result).toEqual({
      "@type": "Person",
      name: "John Blogger",
      url: "https://johnblog.com",
      givenName: "John",
    });
  });

  it("should process contactPoint in Organization", () => {
    const orgWithContactPoint = {
      name: "Tech Corp",
      logo: "https://example.com/logo.png",
      contactPoint: {
        contactType: "customer service",
        telephone: "+1-555-1234",
        email: "support@techcorp.com",
      },
    };
    const result = processAuthor(orgWithContactPoint);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Tech Corp",
      logo: "https://example.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+1-555-1234",
        email: "support@techcorp.com",
      },
    });
  });

  it("should process array of contactPoints in Organization", () => {
    const orgWithMultipleContactPoints = {
      name: "Global Corp",
      logo: "https://example.com/logo.png",
      contactPoint: [
        {
          contactType: "customer service",
          telephone: "+1-555-1234",
        },
        {
          contactType: "technical support",
          telephone: "+1-555-5678",
          email: "tech@globalcorp.com",
        },
      ],
    };
    const result = processAuthor(orgWithMultipleContactPoints);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Global Corp",
      logo: "https://example.com/logo.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+1-555-1234",
        },
        {
          "@type": "ContactPoint",
          contactType: "technical support",
          telephone: "+1-555-5678",
          email: "tech@globalcorp.com",
        },
      ],
    });
  });

  it("should process address in Organization", () => {
    const orgWithAddress = {
      name: "Local Business",
      logo: "https://example.com/logo.png",
      address: {
        streetAddress: "123 Business Ave",
        addressLocality: "Businesstown",
        addressRegion: "CA",
        postalCode: "90210",
      },
    };
    const result = processAuthor(orgWithAddress);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Local Business",
      logo: "https://example.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Business Ave",
        addressLocality: "Businesstown",
        addressRegion: "CA",
        postalCode: "90210",
      },
    });
  });

  it("should process logo as ImageObject in Organization", () => {
    const orgWithImageLogo = {
      name: "Visual Corp",
      logo: {
        url: "https://example.com/logo.png",
        width: 300,
        height: 100,
      },
    };
    const result = processAuthor(orgWithImageLogo);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Visual Corp",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/logo.png",
        width: 300,
        height: 100,
      },
    });
  });
});

describe("processAddress", () => {
  it("should convert string to PostalAddress", () => {
    const result = processAddress("123 Main St");
    expect(result).toEqual({
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
    });
  });

  it("should return PostalAddress with @type as-is", () => {
    const address = {
      "@type": "PostalAddress" as const,
      streetAddress: "123 Main St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
    };
    const result = processAddress(address);
    expect(result).toEqual(address);
  });

  it("should add @type to PostalAddress without it", () => {
    const addressWithoutType = {
      streetAddress: "456 Oak Ave",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90001",
    };
    const result = processAddress(addressWithoutType);
    expect(result).toEqual({
      "@type": "PostalAddress",
      streetAddress: "456 Oak Ave",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90001",
    });
  });
});

describe("processPerformer", () => {
  it("should convert string to PerformingGroup", () => {
    const result = processPerformer("The Beatles");
    expect(result).toEqual({
      "@type": "PerformingGroup",
      name: "The Beatles",
    });
  });

  it("should return Person with @type as-is", () => {
    const person = {
      "@type": "Person" as const,
      name: "John Lennon",
      givenName: "John",
      familyName: "Lennon",
    };
    const result = processPerformer(person);
    expect(result).toEqual(person);
  });

  it("should return PerformingGroup with @type as-is", () => {
    const group = {
      "@type": "PerformingGroup" as const,
      name: "The Rolling Stones",
    };
    const result = processPerformer(group);
    expect(result).toEqual(group);
  });

  it("should add @type Person when object has person properties", () => {
    const personWithoutType = {
      name: "Paul McCartney",
      givenName: "Paul",
      familyName: "McCartney",
    };
    const result = processPerformer(personWithoutType);
    expect(result).toEqual({
      "@type": "Person",
      name: "Paul McCartney",
      givenName: "Paul",
      familyName: "McCartney",
    });
  });

  it("should add @type PerformingGroup for object without person properties", () => {
    const groupWithoutType = {
      name: "Queen",
      description: "British rock band",
    };
    const result = processPerformer(groupWithoutType);
    expect(result).toEqual({
      "@type": "PerformingGroup",
      name: "Queen",
      description: "British rock band",
    });
  });
});

describe("processContactPoint", () => {
  it("should return ContactPoint with @type as-is", () => {
    const contactPoint = {
      "@type": "ContactPoint" as const,
      contactType: "customer service",
      telephone: "+1-800-123-4567",
      email: "support@example.com",
    };
    const result = processContactPoint(contactPoint);
    expect(result).toEqual(contactPoint);
  });

  it("should add @type to ContactPoint without it", () => {
    const contactPointWithoutType = {
      contactType: "sales",
      telephone: "+1-800-555-1234",
    };
    const result = processContactPoint(contactPointWithoutType);
    expect(result).toEqual({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+1-800-555-1234",
    });
  });
});

describe("processOrganizer", () => {
  it("should convert string to Organization", () => {
    const result = processOrganizer("Event Company Inc");
    expect(result).toEqual({
      "@type": "Organization",
      name: "Event Company Inc",
    });
  });

  it("should add @type Person when object has person properties", () => {
    const personWithoutType = {
      name: "Jane Organizer",
      givenName: "Jane",
    };
    const result = processOrganizer(personWithoutType);
    expect(result).toEqual({
      "@type": "Person",
      name: "Jane Organizer",
      givenName: "Jane",
    });
  });

  it("should add @type Organization when object has no person properties", () => {
    const orgWithoutType = {
      name: "Event Planners LLC",
      url: "https://eventplanners.com",
    };
    const result = processOrganizer(orgWithoutType);
    expect(result).toEqual({
      "@type": "Organization",
      name: "Event Planners LLC",
      url: "https://eventplanners.com",
    });
  });
});

describe("processReview", () => {
  it("should add @type to Review without it", () => {
    const reviewWithoutType = {
      author: "John Reviewer",
      reviewBody: "Great service!",
      reviewRating: {
        ratingValue: 5,
        bestRating: 5,
      },
    };
    const result = processReview(reviewWithoutType);
    expect(result).toEqual({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "John Reviewer",
      },
      reviewBody: "Great service!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
    });
  });

  it("should preserve @type when Review already has it", () => {
    const reviewWithType = {
      "@type": "Review" as const,
      author: "Jane Reviewer",
      reviewBody: "Excellent!",
    };
    const result = processReview(reviewWithType);
    expect(result).toEqual({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Jane Reviewer",
      },
      reviewBody: "Excellent!",
    });
  });
});

describe("processMainEntityOfPage", () => {
  it("should return string URL as-is", () => {
    const result = processMainEntityOfPage("https://example.com/article");
    expect(result).toBe("https://example.com/article");
  });

  it("should return WebPage with @type as-is", () => {
    const webPage = {
      "@type": "WebPage" as const,
      "@id": "https://example.com/page",
    };
    const result = processMainEntityOfPage(webPage);
    expect(result).toEqual(webPage);
  });

  it("should add @type to WebPage without it", () => {
    const webPageWithoutType = {
      "@id": "https://example.com/page",
    };
    const result = processMainEntityOfPage(webPageWithoutType);
    expect(result).toEqual({
      "@type": "WebPage",
      "@id": "https://example.com/page",
    });
  });
});

describe("processMerchantReturnPolicy", () => {
  it("should return policy with @type as-is", () => {
    const policy = {
      "@type": "MerchantReturnPolicy" as const,
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
    };
    const result = processMerchantReturnPolicy(policy);
    expect(result).toEqual(policy);
  });

  it("should add @type to policy without it", () => {
    const policyWithoutType = {
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnFees: "https://schema.org/FreeReturn",
    };
    const result = processMerchantReturnPolicy(policyWithoutType);
    expect(result).toEqual({
      "@type": "MerchantReturnPolicy",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnFees: "https://schema.org/FreeReturn",
    });
  });
});

describe("processVideo", () => {
  it("should return video with @type as-is", () => {
    const video = {
      "@type": "VideoObject" as const,
      name: "How to Cook",
      description: "Cooking tutorial",
      thumbnailUrl: "https://example.com/thumb.jpg",
      uploadDate: "2024-01-01T00:00:00Z",
    };
    const result = processVideo(video);
    expect(result).toEqual(video);
  });

  it("should add @type to video without it", () => {
    const videoWithoutType = {
      name: "Recipe Video",
      description: "Step by step guide",
      thumbnailUrl: "https://example.com/video-thumb.jpg",
      uploadDate: "2024-01-15T00:00:00Z",
    };
    const result = processVideo(videoWithoutType);
    expect(result).toEqual({
      "@type": "VideoObject",
      name: "Recipe Video",
      description: "Step by step guide",
      thumbnailUrl: "https://example.com/video-thumb.jpg",
      uploadDate: "2024-01-15T00:00:00Z",
    });
  });
});

describe("processInstruction", () => {
  it("should return string instruction as-is", () => {
    const result = processInstruction("Mix all ingredients");
    expect(result).toBe("Mix all ingredients");
  });

  it("should add @type to HowToStep without it", () => {
    const stepWithoutType = {
      text: "Preheat oven to 350°F",
      name: "Preheat",
    };
    const result = processInstruction(stepWithoutType);
    expect(result).toEqual({
      "@type": "HowToStep",
      text: "Preheat oven to 350°F",
      name: "Preheat",
    });
  });

  it("should add @type to HowToSection without it", () => {
    const sectionWithoutType = {
      name: "Preparation",
      itemListElement: [
        {
          text: "Gather ingredients",
        },
        {
          text: "Prep workspace",
        },
      ],
    };
    const result = processInstruction(sectionWithoutType);
    expect(result).toEqual({
      "@type": "HowToSection",
      name: "Preparation",
      itemListElement: [
        {
          "@type": "HowToStep",
          text: "Gather ingredients",
        },
        {
          "@type": "HowToStep",
          text: "Prep workspace",
        },
      ],
    });
  });

  it("should preserve @type and process nested items in HowToSection", () => {
    const sectionWithType = {
      "@type": "HowToSection" as const,
      name: "Cooking",
      itemListElement: [
        {
          text: "Heat oil",
        },
        {
          "@type": "HowToStep" as const,
          text: "Add ingredients",
          name: "Add",
        },
      ],
    };
    const result = processInstruction(sectionWithType);
    expect(result).toEqual({
      "@type": "HowToSection",
      name: "Cooking",
      itemListElement: [
        {
          "@type": "HowToStep",
          text: "Heat oil",
        },
        {
          "@type": "HowToStep",
          text: "Add ingredients",
          name: "Add",
        },
      ],
    });
  });
});

describe("processDataCatalog", () => {
  it("should add @type to DataCatalog without it", () => {
    const catalogWithoutType = {
      name: "Ocean Climate Data Catalog",
      description: "Collection of ocean climate datasets",
      url: "https://example.com/catalog",
    };
    const result = processDataCatalog(catalogWithoutType);
    expect(result).toEqual({
      "@type": "DataCatalog",
      name: "Ocean Climate Data Catalog",
      description: "Collection of ocean climate datasets",
      url: "https://example.com/catalog",
    });
  });

  it("should preserve @type when DataCatalog already has it", () => {
    const catalogWithType = {
      "@type": "DataCatalog" as const,
      name: "Climate Data Repository",
      description: "Global climate datasets",
      url: "https://climate.example.com",
    };
    const result = processDataCatalog(catalogWithType);
    expect(result).toEqual(catalogWithType);
  });

  it("should handle DataCatalog with nested Dataset", () => {
    const catalogWithDataset = {
      name: "Environmental Data Catalog",
      hasPart: {
        "@type": "Dataset" as const,
        name: "Air Quality Dataset",
        description: "Air quality measurements",
      },
    };
    const result = processDataCatalog(catalogWithDataset);
    expect(result).toEqual({
      "@type": "DataCatalog",
      name: "Environmental Data Catalog",
      hasPart: {
        "@type": "Dataset",
        name: "Air Quality Dataset",
        description: "Air quality measurements",
      },
    });
  });

  it("should handle DataCatalog with array of Datasets", () => {
    const catalogWithMultipleDatasets = {
      name: "Multi-Dataset Catalog",
      hasPart: [
        {
          "@type": "Dataset" as const,
          name: "Dataset 1",
          description: "First dataset",
        },
        {
          "@type": "Dataset" as const,
          name: "Dataset 2",
          description: "Second dataset",
        },
      ],
    };
    const result = processDataCatalog(catalogWithMultipleDatasets);
    expect(result).toEqual({
      "@type": "DataCatalog",
      name: "Multi-Dataset Catalog",
      hasPart: [
        {
          "@type": "Dataset",
          name: "Dataset 1",
          description: "First dataset",
        },
        {
          "@type": "Dataset",
          name: "Dataset 2",
          description: "Second dataset",
        },
      ],
    });
  });
});

describe("processDataDownload", () => {
  it("should return DataDownload with @type as-is", () => {
    const downloadWithType = {
      "@type": "DataDownload" as const,
      encodingFormat: "application/csv",
      contentUrl: "https://example.com/data.csv",
    };
    const result = processDataDownload(downloadWithType);
    expect(result).toBe(downloadWithType);
  });

  it("should add @type to DataDownload without it", () => {
    const downloadWithoutType = {
      encodingFormat: "application/json",
      contentUrl: "https://example.com/data.json",
      contentSize: "5MB",
    };
    const result = processDataDownload(downloadWithoutType);
    expect(result).toEqual({
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: "https://example.com/data.json",
      contentSize: "5MB",
    });
  });
});

describe("processLicense", () => {
  it("should return string license as-is", () => {
    const result = processLicense(
      "https://creativecommons.org/licenses/by/4.0/",
    );
    expect(result).toBe("https://creativecommons.org/licenses/by/4.0/");
  });

  it("should return CreativeWork with @type as-is", () => {
    const licenseWithType = {
      "@type": "CreativeWork" as const,
      name: "Creative Commons Attribution 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
    };
    const result = processLicense(licenseWithType);
    expect(result).toBe(licenseWithType);
  });

  it("should add @type to CreativeWork without it", () => {
    const licenseWithoutType = {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
      text: "Permission is hereby granted...",
    };
    const result = processLicense(licenseWithoutType);
    expect(result).toEqual({
      "@type": "CreativeWork",
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
      text: "Permission is hereby granted...",
    });
  });
});
