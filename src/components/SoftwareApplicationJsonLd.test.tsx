import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SoftwareApplicationJsonLd from "./SoftwareApplicationJsonLd";

describe("SoftwareApplicationJsonLd", () => {
  it("renders basic free app with minimal props", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="My Awesome App"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 100,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "My Awesome App",
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.5,
        ratingCount: 100,
      },
    });
  });

  it("renders paid app with pricing", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="Premium App"
        offers={{
          price: 9.99,
          priceCurrency: "USD",
        }}
        review={{
          author: "John Doe",
          reviewRating: {
            ratingValue: 5,
          },
          reviewBody: "Excellent app!",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers).toEqual({
      "@type": "Offer",
      price: 9.99,
      priceCurrency: "USD",
    });
    expect(jsonData.review).toEqual({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "John Doe",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
      },
      reviewBody: "Excellent app!",
    });
  });

  it("renders MobileApplication type when specified", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type="MobileApplication"
        name="Mobile App"
        operatingSystem="Android 5.0+"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.2,
          reviewCount: 50,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("MobileApplication");
    expect(jsonData.operatingSystem).toBe("Android 5.0+");
  });

  it("renders WebApplication type", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name="Web Tool"
        url="https://example.com/app"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          bestRating: 5,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("WebApplication");
    expect(jsonData.url).toBe("https://example.com/app");
  });

  it("handles VideoGame co-typed with MobileApplication", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type={["VideoGame", "MobileApplication"]}
        name="Mobile Game"
        applicationCategory="GameApplication"
        offers={{
          price: 2.99,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 1000,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toEqual(["VideoGame", "MobileApplication"]);
    expect(jsonData.applicationCategory).toBe("GameApplication");
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type="BusinessApplication"
        name="Enterprise Software"
        description="Comprehensive business management solution"
        url="https://example.com"
        image="https://example.com/logo.png"
        applicationCategory="BusinessApplication"
        applicationSubCategory="ProjectManagement"
        applicationSuite="Microsoft Office"
        operatingSystem="Windows 10, macOS 10.15+"
        memoryRequirements="8GB RAM"
        processorRequirements="Intel Core i5 or equivalent"
        storageRequirements="2GB"
        availableOnDevice="Desktop"
        downloadUrl="https://example.com/download"
        installUrl="https://example.com/install"
        countriesSupported={["US", "CA", "GB"]}
        countriesNotSupported="CN"
        permissions={["storage", "camera", "microphone"]}
        softwareVersion="2.5.1"
        releaseNotes="Bug fixes and performance improvements"
        screenshot={[
          "https://example.com/screenshot1.jpg",
          {
            url: "https://example.com/screenshot2.jpg",
            caption: "Dashboard view",
          },
        ]}
        featureList={[
          "Real-time collaboration",
          "Advanced analytics",
          "Cloud sync",
        ]}
        offers={{
          price: 49.99,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }}
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 500,
          reviewCount: 450,
        }}
        author="TechCorp Inc."
        publisher={{
          name: "TechCorp Publishing",
          url: "https://techcorp.com",
        }}
        datePublished="2024-01-15"
        dateModified="2024-03-20"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BusinessApplication",
      name: "Enterprise Software",
      description: "Comprehensive business management solution",
      url: "https://example.com",
      image: "https://example.com/logo.png",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "ProjectManagement",
      applicationSuite: "Microsoft Office",
      operatingSystem: "Windows 10, macOS 10.15+",
      memoryRequirements: "8GB RAM",
      processorRequirements: "Intel Core i5 or equivalent",
      storageRequirements: "2GB",
      availableOnDevice: "Desktop",
      downloadUrl: "https://example.com/download",
      installUrl: "https://example.com/install",
      countriesSupported: ["US", "CA", "GB"],
      countriesNotSupported: "CN",
      permissions: ["storage", "camera", "microphone"],
      softwareVersion: "2.5.1",
      releaseNotes: "Bug fixes and performance improvements",
      screenshot: [
        "https://example.com/screenshot1.jpg",
        {
          "@type": "ImageObject",
          url: "https://example.com/screenshot2.jpg",
          caption: "Dashboard view",
        },
      ],
      featureList: [
        "Real-time collaboration",
        "Advanced analytics",
        "Cloud sync",
      ],
      offers: {
        "@type": "Offer",
        price: 49.99,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.7,
        ratingCount: 500,
        reviewCount: 450,
      },
      author: {
        "@type": "Organization",
        name: "TechCorp Inc.",
      },
      publisher: {
        "@type": "Organization",
        name: "TechCorp Publishing",
        url: "https://techcorp.com",
      },
      datePublished: "2024-01-15",
      dateModified: "2024-03-20",
    });
  });

  it("handles string permissions", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with String Permissions"
        permissions="location, storage"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.permissions).toBe("location, storage");
  });

  it("handles string featureList", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with String Features"
        featureList="Feature 1, Feature 2, Feature 3"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.featureList).toBe("Feature 1, Feature 2, Feature 3");
  });

  it("handles multiple offers", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="Multi-tier App"
        offers={[
          {
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            price: 9.99,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ]}
        aggregateRating={{ ratingValue: 4.3 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.offers).toHaveLength(2);
    expect(jsonData.offers[0]["@type"]).toBe("Offer");
    expect(jsonData.offers[1]["@type"]).toBe("Offer");
    expect(jsonData.offers[0].price).toBe(0);
    expect(jsonData.offers[1].price).toBe(9.99);
  });

  it("handles multiple reviews", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="Well-reviewed App"
        offers={{ price: 0, priceCurrency: "USD" }}
        review={[
          {
            author: "Alice",
            reviewRating: { ratingValue: 5 },
            reviewBody: "Excellent!",
          },
          {
            author: "Bob",
            reviewRating: { ratingValue: 4 },
            reviewBody: "Very good",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.review).toHaveLength(2);
    expect(jsonData.review[0].author.name).toBe("Alice");
    expect(jsonData.review[1].author.name).toBe("Bob");
  });

  it("defaults dateModified to datePublished when not provided", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with publish date"
        datePublished="2024-01-01"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.datePublished).toBe("2024-01-01");
    expect(jsonData.dateModified).toBe("2024-01-01");
  });

  it("uses custom scriptId and scriptKey when provided", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="Custom ID App"
        scriptId="my-app-jsonld"
        scriptKey="custom-key"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.getAttribute("id")).toBe("my-app-jsonld");
  });

  it("handles string countriesSupported", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="Regional App"
        countriesSupported="US"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.countriesSupported).toBe("US");
  });

  it("handles EducationalApplication type", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type="EducationalApplication"
        name="Learning App"
        applicationCategory="Education"
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4.8, ratingCount: 2000 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("EducationalApplication");
    expect(jsonData.applicationCategory).toBe("Education");
  });

  it("handles image as ImageObject", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with Image Object"
        image={{
          url: "https://example.com/logo.png",
          width: 512,
          height: 512,
        }}
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/logo.png",
      width: 512,
      height: 512,
    });
  });

  it("handles array of images", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with Multiple Images"
        image={[
          "https://example.com/logo1.png",
          {
            url: "https://example.com/logo2.png",
            caption: "Alternative logo",
          },
        ]}
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.image).toEqual([
      "https://example.com/logo1.png",
      {
        "@type": "ImageObject",
        url: "https://example.com/logo2.png",
        caption: "Alternative logo",
      },
    ]);
  });

  it("handles organization publisher with logo", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        name="App with Publisher"
        publisher={{
          name: "Tech Publisher",
          logo: {
            url: "https://example.com/publisher-logo.png",
            width: 600,
            height: 60,
          },
        }}
        offers={{ price: 0, priceCurrency: "USD" }}
        aggregateRating={{ ratingValue: 4 }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.publisher).toMatchObject({
      "@type": "Organization",
      name: "Tech Publisher",
      logo: {
        "@type": "ImageObject",
        url: "https://example.com/publisher-logo.png",
        width: 600,
        height: 60,
      },
    });
  });

  it("handles contentRating for VideoGame co-typed with MobileApplication", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type={["VideoGame", "MobileApplication"]}
        name="Mobile Adventure Game"
        applicationCategory="GameApplication"
        operatingSystem="iOS 13.0+, Android 9.0+"
        contentRating="Everyone 10+"
        offers={{
          price: 4.99,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 10000,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toEqual(["VideoGame", "MobileApplication"]);
    expect(jsonData.contentRating).toBe("Everyone 10+");
    expect(jsonData.operatingSystem).toBe("iOS 13.0+, Android 9.0+");
  });

  it("handles contentRating for MobileApplication", () => {
    const { container } = render(
      <SoftwareApplicationJsonLd
        type="MobileApplication"
        name="Educational Mobile App"
        applicationCategory="EducationalApplication"
        contentRating="Teen"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 5000,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("MobileApplication");
    expect(jsonData.contentRating).toBe("Teen");
  });
});
