import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CourseJsonLd from "./CourseJsonLd";

describe("CourseJsonLd", () => {
  // Single course tests
  describe("Single course pattern", () => {
    it("renders basic Course with minimal props", () => {
      const { container } = render(
        <CourseJsonLd
          name="Introduction to Computer Science"
          description="An introductory CS course laying out the basics."
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script).toBeTruthy();

      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Introduction to Computer Science",
        description: "An introductory CS course laying out the basics.",
      });
    });

    it("renders Course with all properties", () => {
      const { container } = render(
        <CourseJsonLd
          name="Advanced Machine Learning"
          description="Deep dive into modern ML techniques and algorithms."
          url="https://example.com/courses/advanced-ml"
          provider="Tech University"
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Advanced Machine Learning",
        description: "Deep dive into modern ML techniques and algorithms.",
        url: "https://example.com/courses/advanced-ml",
        provider: {
          "@type": "Organization",
          name: "Tech University",
        },
      });
    });

    it("handles provider as Organization object without @type", () => {
      const { container } = render(
        <CourseJsonLd
          name="Web Development Bootcamp"
          description="Learn full-stack web development."
          provider={{
            name: "Code Academy",
            url: "https://codeacademy.com",
            sameAs: "https://twitter.com/codeacademy",
          }}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.provider).toEqual({
        "@type": "Organization",
        name: "Code Academy",
        url: "https://codeacademy.com",
        sameAs: "https://twitter.com/codeacademy",
      });
    });

    it("handles provider as Organization object with @type", () => {
      const { container } = render(
        <CourseJsonLd
          name="Data Science Fundamentals"
          description="Introduction to data science concepts."
          provider={{
            "@type": "Organization",
            name: "Data Institute",
            logo: "https://example.com/logo.png",
          }}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.provider).toEqual({
        "@type": "Organization",
        name: "Data Institute",
        logo: "https://example.com/logo.png",
      });
    });

    it("uses custom scriptId and scriptKey", () => {
      const { container } = render(
        <CourseJsonLd
          name="Test Course"
          description="Test description"
          scriptId="custom-id"
          scriptKey="custom-key"
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script?.getAttribute("id")).toBe("custom-id");
      expect(script?.getAttribute("data-testid")).toBe("custom-id");
    });
  });

  // Course list tests
  describe("Course list pattern", () => {
    it("renders course list with URLs only (summary page pattern)", () => {
      const { container } = render(
        <CourseJsonLd
          type="list"
          urls={[
            "https://example.com/courses/intro-cs",
            "https://example.com/courses/intermediate-cs",
            "https://example.com/courses/advanced-cs",
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: "https://example.com/courses/intro-cs",
          },
          {
            "@type": "ListItem",
            position: 2,
            url: "https://example.com/courses/intermediate-cs",
          },
          {
            "@type": "ListItem",
            position: 3,
            url: "https://example.com/courses/advanced-cs",
          },
        ],
      });
    });

    it("renders course list with URL objects and custom positions", () => {
      const { container } = render(
        <CourseJsonLd
          type="list"
          urls={[
            { url: "https://example.com/courses/python", position: 2 },
            { url: "https://example.com/courses/javascript", position: 1 },
            "https://example.com/courses/golang", // Will get position 3
          ]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement).toEqual([
        {
          "@type": "ListItem",
          position: 2,
          url: "https://example.com/courses/python",
        },
        {
          "@type": "ListItem",
          position: 1,
          url: "https://example.com/courses/javascript",
        },
        {
          "@type": "ListItem",
          position: 3,
          url: "https://example.com/courses/golang",
        },
      ]);
    });

    it("renders course list with full course data (all-in-one pattern)", () => {
      const { container } = render(
        <CourseJsonLd
          type="list"
          courses={[
            {
              name: "Introduction to Programming",
              description: "Learn the basics of programming.",
              url: "https://example.com/courses/intro-programming",
              provider: "Tech Institute",
            },
            {
              name: "Advanced Algorithms",
              description: "Study complex algorithmic solutions.",
              provider: {
                name: "University Online",
                sameAs: "https://university.edu",
              },
            },
            {
              name: "Web Design Basics",
              description: "Create beautiful and functional websites.",
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
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Course",
              name: "Introduction to Programming",
              description: "Learn the basics of programming.",
              url: "https://example.com/courses/intro-programming",
              provider: {
                "@type": "Organization",
                name: "Tech Institute",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Course",
              name: "Advanced Algorithms",
              description: "Study complex algorithmic solutions.",
              provider: {
                "@type": "Organization",
                name: "University Online",
                sameAs: "https://university.edu",
              },
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Course",
              name: "Web Design Basics",
              description: "Create beautiful and functional websites.",
            },
          },
        ],
      });
    });

    it("uses custom scriptId and scriptKey for list", () => {
      const { container } = render(
        <CourseJsonLd
          type="list"
          urls={["https://example.com/course1"]}
          scriptId="list-id"
          scriptKey="list-key"
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      expect(script?.getAttribute("id")).toBe("list-id");
      expect(script?.getAttribute("data-testid")).toBe("list-id");
    });
  });

  // Edge cases
  describe("Edge cases", () => {
    it("renders single course when type is explicitly set to single", () => {
      const { container } = render(
        <CourseJsonLd
          type="single"
          name="Explicit Single Course"
          description="Testing explicit single type."
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData["@type"]).toBe("Course");
      expect(jsonData.name).toBe("Explicit Single Course");
    });

    it("handles empty course list", () => {
      const { container } = render(<CourseJsonLd type="list" urls={[]} />);

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData).toEqual({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [],
      });
    });

    it("preserves URL query parameters in course lists", () => {
      const { container } = render(
        <CourseJsonLd
          type="list"
          urls={["https://example.com/course?utm_source=google&ref=home"]}
        />,
      );

      const script = container.querySelector(
        'script[type="application/ld+json"]',
      );
      const jsonData = JSON.parse(script!.textContent!);
      expect(jsonData.itemListElement[0].url).toBe(
        "https://example.com/course?utm_source=google&ref=home",
      );
    });
  });
});
