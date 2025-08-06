import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ImageJsonLd from "./ImageJsonLd";

describe("ImageJsonLd", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic Image with minimal props", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photos/black-labrador.jpg"
        creator="Brixton Brownstone"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: "https://example.com/photos/black-labrador.jpg",
      creator: {
        "@type": "Person",
        name: "Brixton Brownstone",
      },
    });
  });

  it("handles Organization creator with logo", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photos/product.jpg"
        creator={{
          name: "ACME Corp",
          logo: "https://example.com/logo.jpg",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.creator).toEqual({
      "@type": "Organization",
      name: "ACME Corp",
      logo: "https://example.com/logo.jpg",
    });
  });

  it("handles multiple creators", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photos/collaboration.jpg"
        creator={["John Doe", { name: "Jane Smith", url: "https://jane.com" }]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.creator).toEqual([
      {
        "@type": "Person",
        name: "John Doe",
      },
      {
        "@type": "Person",
        name: "Jane Smith",
        url: "https://jane.com",
      },
    ]);
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photos/licensed-photo.jpg"
        creator="Professional Photographer"
        creditText="PhotoLab Studios"
        copyrightNotice="© 2024 PhotoLab"
        license="https://creativecommons.org/licenses/by-nc/4.0/"
        acquireLicensePage="https://example.com/licensing"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: "https://example.com/photos/licensed-photo.jpg",
      creator: {
        "@type": "Person",
        name: "Professional Photographer",
      },
      creditText: "PhotoLab Studios",
      copyrightNotice: "© 2024 PhotoLab",
      license: "https://creativecommons.org/licenses/by-nc/4.0/",
      acquireLicensePage: "https://example.com/licensing",
    });
  });

  it("renders multiple images", () => {
    const { container } = render(
      <ImageJsonLd
        images={[
          {
            contentUrl: "https://example.com/photos/photo1.jpg",
            creator: "Photographer 1",
            license: "https://example.com/license1",
          },
          {
            contentUrl: "https://example.com/photos/photo2.jpg",
            creditText: "Studio 2",
            copyrightNotice: "© 2024 Studio 2",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ImageObject",
          contentUrl: "https://example.com/photos/photo1.jpg",
          creator: {
            "@type": "Person",
            name: "Photographer 1",
          },
          license: "https://example.com/license1",
        },
        {
          "@type": "ImageObject",
          contentUrl: "https://example.com/photos/photo2.jpg",
          creditText: "Studio 2",
          copyrightNotice: "© 2024 Studio 2",
        },
      ],
    });
  });

  it("warns when contentUrl is missing", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<ImageJsonLd contentUrl="" creator="Test Creator" />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "ImageJsonLd: contentUrl and at least one of creator, creditText, copyrightNotice, or license is required",
    );
  });

  it("warns when no required metadata fields are provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<ImageJsonLd contentUrl="https://example.com/photo.jpg" />);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "ImageJsonLd: contentUrl and at least one of creator, creditText, copyrightNotice, or license is required",
    );
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photo.jpg"
        creator="Test Creator"
        scriptId="custom-image-id"
      />,
    );

    const script = container.querySelector("#custom-image-id");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photo.jpg"
        creator="Test Creator"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    // When no scriptId is provided, scriptKey is used as the id
    expect(script?.getAttribute("id")).toBe("custom-key");
  });

  it("handles Person creator with @type already specified", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photo.jpg"
        creator={{
          "@type": "Person",
          name: "John Doe",
          familyName: "Doe",
          givenName: "John",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.creator).toEqual({
      "@type": "Person",
      name: "John Doe",
      familyName: "Doe",
      givenName: "John",
    });
  });

  it("handles Organization creator with @type already specified", () => {
    const { container } = render(
      <ImageJsonLd
        contentUrl="https://example.com/photo.jpg"
        creator={{
          "@type": "Organization",
          name: "ACME Corp",
          sameAs: ["https://twitter.com/acme", "https://facebook.com/acme"],
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.creator).toEqual({
      "@type": "Organization",
      name: "ACME Corp",
      sameAs: ["https://twitter.com/acme", "https://facebook.com/acme"],
    });
  });
});
