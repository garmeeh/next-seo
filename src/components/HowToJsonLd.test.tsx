import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HowToJsonLd from "./HowToJsonLd";

describe("HowToJsonLd", () => {
  it("renders basic HowTo with minimal props", () => {
    const { container } = render(<HowToJsonLd name="How to Change a Tire" />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Change a Tire",
    });
  });

  it("handles string steps", () => {
    const { container } = render(
      <HowToJsonLd
        name="Simple Guide"
        step={["Step 1: Do this", "Step 2: Do that"]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step).toEqual(["Step 1: Do this", "Step 2: Do that"]);
  });

  it("handles HowToStep objects", () => {
    const { container } = render(
      <HowToJsonLd
        name="Detailed Guide"
        step={[
          {
            "@type": "HowToStep",
            name: "First Step",
            text: "Do the first thing",
            url: "https://example.com/step-1",
          },
          {
            "@type": "HowToStep",
            name: "Second Step",
            text: "Do the second thing",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step).toEqual([
      {
        "@type": "HowToStep",
        name: "First Step",
        text: "Do the first thing",
        url: "https://example.com/step-1",
      },
      {
        "@type": "HowToStep",
        name: "Second Step",
        text: "Do the second thing",
      },
    ]);
  });

  it("handles HowToStep without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="Guide"
        step={[
          {
            name: "First Step",
            text: "Do something",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step[0]["@type"]).toBe("HowToStep");
    expect(jsonData.step[0].name).toBe("First Step");
    expect(jsonData.step[0].text).toBe("Do something");
  });

  it("handles HowToSection objects", () => {
    const { container } = render(
      <HowToJsonLd
        name="Sectioned Guide"
        step={[
          {
            "@type": "HowToSection",
            name: "Preparation",
            position: 1,
            itemListElement: [
              {
                "@type": "HowToStep",
                text: "Gather materials",
              },
              {
                "@type": "HowToStep",
                text: "Prepare workspace",
              },
            ],
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step[0]["@type"]).toBe("HowToSection");
    expect(jsonData.step[0].name).toBe("Preparation");
    expect(jsonData.step[0].itemListElement).toHaveLength(2);
  });

  it("handles HowToSection without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="Sectioned Guide"
        step={[
          {
            name: "Setup",
            itemListElement: [
              {
                text: "First step",
              },
            ],
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step[0]["@type"]).toBe("HowToSection");
    expect(jsonData.step[0].name).toBe("Setup");
  });

  it("handles string supplies", () => {
    const { container } = render(
      <HowToJsonLd name="DIY Project" supply={["Wood", "Nails", "Paint"]} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.supply).toEqual([
      { "@type": "HowToSupply", name: "Wood" },
      { "@type": "HowToSupply", name: "Nails" },
      { "@type": "HowToSupply", name: "Paint" },
    ]);
  });

  it("handles HowToSupply objects", () => {
    const { container } = render(
      <HowToJsonLd
        name="DIY Project"
        supply={[
          {
            "@type": "HowToSupply",
            name: "Wood planks",
            image: "https://example.com/wood.jpg",
          },
          {
            name: "Nails",
            requiredQuantity: 20,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.supply[0]).toEqual({
      "@type": "HowToSupply",
      name: "Wood planks",
      image: "https://example.com/wood.jpg",
    });
    expect(jsonData.supply[1]["@type"]).toBe("HowToSupply");
    expect(jsonData.supply[1].name).toBe("Nails");
    expect(jsonData.supply[1].requiredQuantity).toBe(20);
  });

  it("handles string tools", () => {
    const { container } = render(
      <HowToJsonLd
        name="DIY Project"
        tool={["Hammer", "Screwdriver", "Drill"]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.tool).toEqual([
      { "@type": "HowToTool", name: "Hammer" },
      { "@type": "HowToTool", name: "Screwdriver" },
      { "@type": "HowToTool", name: "Drill" },
    ]);
  });

  it("handles HowToTool objects", () => {
    const { container } = render(
      <HowToJsonLd
        name="DIY Project"
        tool={[
          {
            "@type": "HowToTool",
            name: "Lug wrench",
            image: "https://example.com/lug-wrench.jpg",
          },
          {
            name: "Jack",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.tool[0]).toEqual({
      "@type": "HowToTool",
      name: "Lug wrench",
      image: "https://example.com/lug-wrench.jpg",
    });
    expect(jsonData.tool[1]["@type"]).toBe("HowToTool");
    expect(jsonData.tool[1].name).toBe("Jack");
  });

  it("handles string estimatedCost", () => {
    const { container } = render(
      <HowToJsonLd name="DIY Project" estimatedCost="About $20" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.estimatedCost).toBe("About $20");
  });

  it("handles MonetaryAmount estimatedCost", () => {
    const { container } = render(
      <HowToJsonLd
        name="DIY Project"
        estimatedCost={{
          "@type": "MonetaryAmount",
          currency: "USD",
          value: 20,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.estimatedCost).toEqual({
      "@type": "MonetaryAmount",
      currency: "USD",
      value: 20,
    });
  });

  it("handles MonetaryAmount estimatedCost without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="DIY Project"
        estimatedCost={{
          currency: "USD",
          value: 50,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.estimatedCost["@type"]).toBe("MonetaryAmount");
    expect(jsonData.estimatedCost.currency).toBe("USD");
    expect(jsonData.estimatedCost.value).toBe(50);
  });

  it("handles duration properties", () => {
    const { container } = render(
      <HowToJsonLd
        name="Timed Guide"
        prepTime="PT5M"
        performTime="PT25M"
        totalTime="PT30M"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.prepTime).toBe("PT5M");
    expect(jsonData.performTime).toBe("PT25M");
    expect(jsonData.totalTime).toBe("PT30M");
  });

  it("handles string yield", () => {
    const { container } = render(
      <HowToJsonLd name="Craft Project" yield="1 finished birdhouse" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.yield).toBe("1 finished birdhouse");
  });

  it("handles QuantitativeValue yield", () => {
    const { container } = render(
      <HowToJsonLd
        name="Craft Project"
        yield={{
          "@type": "QuantitativeValue",
          value: 10,
          unitText: "pieces",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.yield).toEqual({
      "@type": "QuantitativeValue",
      value: 10,
      unitText: "pieces",
    });
  });

  it("handles QuantitativeValue yield without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="Craft Project"
        yield={{
          value: 5,
          unitText: "items",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.yield["@type"]).toBe("QuantitativeValue");
    expect(jsonData.yield.value).toBe(5);
    expect(jsonData.yield.unitText).toBe("items");
  });

  it("handles description", () => {
    const { container } = render(
      <HowToJsonLd
        name="How to Change a Tire"
        description="Step-by-step instructions for changing a flat tire safely"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.description).toBe(
      "Step-by-step instructions for changing a flat tire safely",
    );
  });

  it("handles string image", () => {
    const { container } = render(
      <HowToJsonLd name="How to Guide" image="https://example.com/howto.jpg" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toBe("https://example.com/howto.jpg");
  });

  it("handles ImageObject", () => {
    const { container } = render(
      <HowToJsonLd
        name="How to Guide"
        image={{
          "@type": "ImageObject",
          url: "https://example.com/howto.jpg",
          width: 1200,
          height: 800,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/howto.jpg",
      width: 1200,
      height: 800,
    });
  });

  it("handles ImageObject without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="How to Guide"
        image={{
          url: "https://example.com/howto.jpg",
          width: 800,
          height: 600,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image["@type"]).toBe("ImageObject");
    expect(jsonData.image.url).toBe("https://example.com/howto.jpg");
  });

  it("handles video", () => {
    const { container } = render(
      <HowToJsonLd
        name="How to Guide"
        video={{
          "@type": "VideoObject",
          name: "How to Video",
          description: "A video tutorial",
          thumbnailUrl: "https://example.com/thumb.jpg",
          uploadDate: "2024-01-01T08:00:00+00:00",
          contentUrl: "https://example.com/video.mp4",
          duration: "PT5M",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "How to Video",
      description: "A video tutorial",
      thumbnailUrl: "https://example.com/thumb.jpg",
      uploadDate: "2024-01-01T08:00:00+00:00",
      contentUrl: "https://example.com/video.mp4",
      duration: "PT5M",
    });
  });

  it("handles video without @type", () => {
    const { container } = render(
      <HowToJsonLd
        name="How to Guide"
        video={{
          name: "Tutorial Video",
          description: "Step by step",
          thumbnailUrl: "https://example.com/thumb.jpg",
          uploadDate: "2024-01-01T08:00:00+00:00",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.video["@type"]).toBe("VideoObject");
  });

  it("handles single step", () => {
    const { container } = render(
      <HowToJsonLd
        name="Simple Guide"
        step={{
          "@type": "HowToStep",
          text: "Just do this one thing",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step).toEqual({
      "@type": "HowToStep",
      text: "Just do this one thing",
    });
  });

  it("handles single supply", () => {
    const { container } = render(
      <HowToJsonLd name="Simple Guide" supply="Just one item" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.supply).toEqual({
      "@type": "HowToSupply",
      name: "Just one item",
    });
  });

  it("handles single tool", () => {
    const { container } = render(
      <HowToJsonLd name="Simple Guide" tool="Just one tool" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.tool).toEqual({
      "@type": "HowToTool",
      name: "Just one tool",
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <HowToJsonLd
        name="Complete HowTo Guide"
        description="A comprehensive guide with all properties"
        image="https://example.com/howto.jpg"
        estimatedCost="$50"
        prepTime="PT10M"
        performTime="PT30M"
        totalTime="PT40M"
        yield="1 completed project"
        tool={["Hammer", "Screwdriver"]}
        supply={["Nails", "Screws"]}
        step={[
          {
            "@type": "HowToStep",
            name: "Step 1",
            text: "First, do this",
          },
          {
            "@type": "HowToStep",
            name: "Step 2",
            text: "Then, do that",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("HowTo");
    expect(jsonData.name).toBe("Complete HowTo Guide");
    expect(jsonData.description).toBe(
      "A comprehensive guide with all properties",
    );
    expect(jsonData.image).toBe("https://example.com/howto.jpg");
    expect(jsonData.estimatedCost).toBe("$50");
    expect(jsonData.prepTime).toBe("PT10M");
    expect(jsonData.performTime).toBe("PT30M");
    expect(jsonData.totalTime).toBe("PT40M");
    expect(jsonData.yield).toBe("1 completed project");
    expect(jsonData.tool).toHaveLength(2);
    expect(jsonData.supply).toHaveLength(2);
    expect(jsonData.step).toHaveLength(2);
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <HowToJsonLd name="Test HowTo" scriptId="custom-howto-id" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script!.getAttribute("id")).toBe("custom-howto-id");
    expect(script!.getAttribute("data-testid")).toBe("custom-howto-id");
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <HowToJsonLd name="Test HowTo" scriptKey="custom-key" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
  });

  it("uses default scriptKey when not provided", () => {
    const { container } = render(<HowToJsonLd name="Test HowTo" />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
  });

  it("handles steps with directions and tips", () => {
    const { container } = render(
      <HowToJsonLd
        name="Guide with Tips"
        step={[
          {
            "@type": "HowToStep",
            position: 1,
            itemListElement: [
              {
                "@type": "HowToDirection",
                position: 1,
                text: "Do this first",
              },
              {
                "@type": "HowToTip",
                position: 2,
                text: "Here's a helpful tip",
              },
            ],
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.step[0].itemListElement).toHaveLength(2);
    expect(jsonData.step[0].itemListElement[0]["@type"]).toBe("HowToDirection");
    expect(jsonData.step[0].itemListElement[1]["@type"]).toBe("HowToTip");
  });

  it("handles directions with media", () => {
    const { container } = render(
      <HowToJsonLd
        name="Visual Guide"
        step={[
          {
            "@type": "HowToStep",
            itemListElement: [
              {
                "@type": "HowToDirection",
                text: "Position the jack",
                beforeMedia: "https://example.com/before.jpg",
                afterMedia: "https://example.com/after.jpg",
                duringMedia: "https://example.com/during.jpg",
              },
            ],
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    const direction = jsonData.step[0].itemListElement[0];
    expect(direction.beforeMedia).toBe("https://example.com/before.jpg");
    expect(direction.afterMedia).toBe("https://example.com/after.jpg");
    expect(direction.duringMedia).toBe("https://example.com/during.jpg");
  });

  it("handles HowToSupply with requiredQuantity as QuantitativeValue", () => {
    const { container } = render(
      <HowToJsonLd
        name="Project"
        supply={[
          {
            name: "Screws",
            requiredQuantity: {
              value: 10,
              unitText: "pieces",
            },
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.supply[0].requiredQuantity["@type"]).toBe(
      "QuantitativeValue",
    );
    expect(jsonData.supply[0].requiredQuantity.value).toBe(10);
    expect(jsonData.supply[0].requiredQuantity.unitText).toBe("pieces");
  });
});
