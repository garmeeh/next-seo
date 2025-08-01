import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VideoJsonLd from "./VideoJsonLd";

describe("VideoJsonLd", () => {
  it("renders basic VideoObject with minimal props", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Test Video",
      description: "This is a test video",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
      uploadDate: "2024-01-01T00:00:00.000Z",
    });
  });

  it("handles multiple thumbnail URLs", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl={[
          "https://example.com/thumbnail-1x1.jpg",
          "https://example.com/thumbnail-4x3.jpg",
          "https://example.com/thumbnail-16x9.jpg",
        ]}
        uploadDate="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.thumbnailUrl).toEqual([
      "https://example.com/thumbnail-1x1.jpg",
      "https://example.com/thumbnail-4x3.jpg",
      "https://example.com/thumbnail-16x9.jpg",
    ]);
  });

  it("handles ImageObject thumbnails", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl={{
          url: "https://example.com/thumbnail.jpg",
          width: 1920,
          height: 1080,
        }}
        uploadDate="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.thumbnailUrl).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/thumbnail.jpg",
      width: 1920,
      height: 1080,
    });
  });

  it("handles content and embed URLs", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        contentUrl="https://example.com/video.mp4"
        embedUrl="https://example.com/embed/video"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.contentUrl).toBe("https://example.com/video.mp4");
    expect(jsonData.embedUrl).toBe("https://example.com/embed/video");
  });

  it("handles duration and expiration", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        duration="PT30M"
        expires="2025-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.duration).toBe("PT30M");
    expect(jsonData.expires).toBe("2025-01-01T00:00:00.000Z");
  });

  it("handles interaction statistics", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        interactionStatistic={{
          interactionType: "WatchAction",
          userInteractionCount: 1000,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.interactionStatistic).toEqual({
      "@type": "InteractionCounter",
      interactionType: "WatchAction",
      userInteractionCount: 1000,
    });
  });

  it("handles multiple interaction statistics", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        interactionStatistic={[
          {
            interactionType: "WatchAction",
            userInteractionCount: 1000,
          },
          {
            interactionType: "LikeAction",
            userInteractionCount: 50,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.interactionStatistic).toEqual([
      {
        "@type": "InteractionCounter",
        interactionType: "WatchAction",
        userInteractionCount: 1000,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "LikeAction",
        userInteractionCount: 50,
      },
    ]);
  });

  it("handles regions allowed and ineligible", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        regionsAllowed={["US", "CA"]}
        ineligibleRegion="CN"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.regionsAllowed).toEqual(["US", "CA"]);
    expect(jsonData.ineligibleRegion).toEqual(["CN"]);
  });

  it("handles single region as string", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        regionsAllowed="US"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.regionsAllowed).toEqual(["US"]);
  });

  it("handles BroadcastEvent for live videos", () => {
    const { container } = render(
      <VideoJsonLd
        name="Live Video"
        description="This is a live video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        publication={{
          isLiveBroadcast: true,
          startDate: "2024-10-27T14:00:00+00:00",
          endDate: "2024-10-27T16:00:00+00:00",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.publication).toEqual({
      "@type": "BroadcastEvent",
      isLiveBroadcast: true,
      startDate: "2024-10-27T14:00:00+00:00",
      endDate: "2024-10-27T16:00:00+00:00",
    });
  });

  it("handles multiple BroadcastEvents", () => {
    const { container } = render(
      <VideoJsonLd
        name="Live Video"
        description="This is a live video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        publication={[
          {
            isLiveBroadcast: true,
            startDate: "2024-10-27T14:00:00+00:00",
            endDate: "2024-10-27T16:00:00+00:00",
          },
          {
            isLiveBroadcast: true,
            startDate: "2024-10-27T18:00:00+00:00",
            endDate: "2024-10-27T20:00:00+00:00",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.publication).toHaveLength(2);
    expect(jsonData.publication[0]["@type"]).toBe("BroadcastEvent");
    expect(jsonData.publication[1]["@type"]).toBe("BroadcastEvent");
  });

  it("handles Clip for key moments", () => {
    const { container } = render(
      <VideoJsonLd
        name="Video with Chapters"
        description="This video has key moments"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        hasPart={{
          name: "Introduction",
          startOffset: 0,
          endOffset: 30,
          url: "https://example.com/video?t=0",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toEqual({
      "@type": "Clip",
      name: "Introduction",
      startOffset: 0,
      endOffset: 30,
      url: "https://example.com/video?t=0",
    });
  });

  it("handles multiple Clips", () => {
    const { container } = render(
      <VideoJsonLd
        name="Video with Chapters"
        description="This video has key moments"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        hasPart={[
          {
            name: "Introduction",
            startOffset: 0,
            endOffset: 30,
            url: "https://example.com/video?t=0",
          },
          {
            name: "Main Content",
            startOffset: 30,
            endOffset: 300,
            url: "https://example.com/video?t=30",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.hasPart[0]["@type"]).toBe("Clip");
    expect(jsonData.hasPart[1]["@type"]).toBe("Clip");
  });

  it("handles SeekToAction for automatic key moments", () => {
    const { container } = render(
      <VideoJsonLd
        name="Video with SeekToAction"
        description="This video supports automatic key moments"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        potentialAction={{
          target: "https://example.com/video?t={seek_to_second_number}",
          "startOffset-input": "required name=seek_to_second_number",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.potentialAction).toEqual({
      "@type": "SeekToAction",
      target: "https://example.com/video?t={seek_to_second_number}",
      "startOffset-input": "required name=seek_to_second_number",
    });
  });

  it("handles author as string", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        author="John Doe"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
  });

  it("handles author as object", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        author={{
          name: "John Doe",
          url: "https://example.com/john",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "John Doe",
      url: "https://example.com/john",
    });
  });

  it("handles multiple authors", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        author={["John Doe", "Jane Smith"]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.author).toEqual([
      {
        "@type": "Person",
        name: "John Doe",
      },
      {
        "@type": "Person",
        name: "Jane Smith",
      },
    ]);
  });

  it("handles publisher", () => {
    const { container } = render(
      <VideoJsonLd
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
        publisher={{
          name: "Video Company",
          logo: "https://example.com/logo.png",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.publisher).toEqual({
      "@type": "Organization",
      name: "Video Company",
      logo: "https://example.com/logo.png",
    });
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <VideoJsonLd
        scriptId="custom-video-id"
        scriptKey="custom-video-key"
        name="Test Video"
        description="This is a test video"
        thumbnailUrl="https://example.com/thumbnail.jpg"
        uploadDate="2024-01-01T00:00:00.000Z"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.id).toBe("custom-video-id");
  });

  it("handles all properties combined", () => {
    const { container } = render(
      <VideoJsonLd
        type="VideoObject"
        name="Complete Video Example"
        description="This video has all properties"
        thumbnailUrl={[
          "https://example.com/thumb-1x1.jpg",
          "https://example.com/thumb-16x9.jpg",
        ]}
        uploadDate="2024-01-01T08:00:00+00:00"
        contentUrl="https://example.com/video.mp4"
        embedUrl="https://example.com/embed/video"
        duration="PT1H30M"
        expires="2025-01-01T00:00:00+00:00"
        interactionStatistic={{
          interactionType: "WatchAction",
          userInteractionCount: 5000,
        }}
        regionsAllowed={["US", "CA", "GB"]}
        ineligibleRegion={["CN", "RU"]}
        publication={{
          isLiveBroadcast: true,
          startDate: "2024-12-25T20:00:00+00:00",
          endDate: "2024-12-25T22:00:00+00:00",
        }}
        hasPart={[
          {
            name: "Opening",
            startOffset: 0,
            endOffset: 120,
            url: "https://example.com/video?t=0",
          },
          {
            name: "Main Event",
            startOffset: 120,
            endOffset: 3600,
            url: "https://example.com/video?t=120",
          },
        ]}
        potentialAction={{
          target: "https://example.com/video?t={seek_to_second_number}",
          "startOffset-input": "required name=seek_to_second_number",
        }}
        author="Video Creator"
        publisher={{
          name: "Video Platform Inc.",
          logo: "https://example.com/logo.png",
          url: "https://example.com",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("VideoObject");
    expect(jsonData.name).toBe("Complete Video Example");
    expect(jsonData.thumbnailUrl).toHaveLength(2);
    expect(jsonData.publication["@type"]).toBe("BroadcastEvent");
    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.potentialAction["@type"]).toBe("SeekToAction");
    expect(jsonData.author["@type"]).toBe("Person");
    expect(jsonData.publisher["@type"]).toBe("Organization");
  });
});
