import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BreadcrumbJsonLd from "./BreadcrumbJsonLd";

describe("BreadcrumbJsonLd", () => {
  it("renders basic breadcrumb trail with minimal props", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { name: "Books", item: "https://example.com/books" },
          { name: "Science Fiction", item: "https://example.com/books/sci-fi" },
          { name: "Award Winners" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Books",
          item: "https://example.com/books",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Science Fiction",
          item: "https://example.com/books/sci-fi",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Award Winners",
        },
      ],
    });
  });

  it("renders multiple breadcrumb trails", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        multipleTrails={[
          [
            { name: "Books", item: "https://example.com/books" },
            {
              name: "Science Fiction",
              item: "https://example.com/books/sci-fi",
            },
            { name: "Award Winners" },
          ],
          [
            { name: "Literature", item: "https://example.com/literature" },
            { name: "Award Winners" },
          ],
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual([
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Books",
            item: "https://example.com/books",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Science Fiction",
            item: "https://example.com/books/sci-fi",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Award Winners",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Literature",
            item: "https://example.com/literature",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Award Winners",
          },
        ],
      },
    ]);
  });

  it("handles Thing objects with @id", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { name: "Books", item: { "@id": "https://example.com/books" } },
          { name: "Authors", item: { "@id": "https://example.com/authors" } },
          { name: "Ann Leckie" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.itemListElement[0].item).toEqual({
      "@id": "https://example.com/books",
    });
    expect(jsonData.itemListElement[1].item).toEqual({
      "@id": "https://example.com/authors",
    });
  });

  it("renders with custom scriptId and scriptKey", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://example.com" },
          { name: "Products" },
        ]}
        scriptId="custom-breadcrumb"
        scriptKey="my-breadcrumb-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    expect(script!.getAttribute("id")).toBe("custom-breadcrumb");
    expect(script!.getAttribute("data-testid")).toBe("custom-breadcrumb");
  });

  it("handles single item breadcrumb", () => {
    const { container } = render(
      <BreadcrumbJsonLd items={[{ name: "Home" }]} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.itemListElement).toHaveLength(1);
    expect(jsonData.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
    });
  });

  it("handles empty breadcrumb trail", () => {
    const { container } = render(<BreadcrumbJsonLd items={[]} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.itemListElement).toEqual([]);
  });

  it("preserves URL query parameters", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          {
            name: "Search",
            item: "https://example.com/search?q=books&sort=date",
          },
          { name: "Results" },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.itemListElement[0].item).toBe(
      "https://example.com/search?q=books&sort=date",
    );
  });

  it("handles multiple trails with custom scriptKey", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        multipleTrails={[[{ name: "Path 1" }], [{ name: "Path 2" }]]}
        scriptId="custom-multiple-id"
        scriptKey="custom-multiple-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script!.getAttribute("id")).toBe("custom-multiple-id");
    expect(script!.getAttribute("data-testid")).toBe("custom-multiple-id");
  });
});
