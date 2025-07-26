import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DiscussionForumPostingJsonLd from "./DiscussionForumPostingJsonLd";

describe("DiscussionForumPostingJsonLd", () => {
  it("renders basic DiscussionForumPosting with minimal props", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="John Doe"
        datePublished="2024-01-01T08:00:00+00:00"
        text="This is a forum post"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      text: "This is a forum post",
      author: {
        "@type": "Person",
        name: "John Doe",
      },
      datePublished: "2024-01-01T08:00:00+00:00",
    });
  });

  it("renders SocialMediaPosting type when specified", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        type="SocialMediaPosting"
        author="Jane Smith"
        datePublished="2024-01-01T08:00:00+00:00"
        text="This is a social media post"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("SocialMediaPosting");
  });

  it("handles string author", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Katie Pope"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Look at this cool content!"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Katie Pope",
    });
  });

  it("handles Person author object", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author={{
          "@type": "Person",
          name: "Katie Pope",
          url: "https://example.com/user/katie-pope",
        }}
        datePublished="2024-01-01T08:00:00+00:00"
        text="Look at this cool content!"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Katie Pope",
      url: "https://example.com/user/katie-pope",
    });
  });

  it("handles Organization author", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author={{
          "@type": "Organization",
          name: "Example Forum",
          url: "https://example.com",
        }}
        datePublished="2024-01-01T08:00:00+00:00"
        text="Official announcement"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "Example Forum",
      url: "https://example.com",
    });
  });

  it("handles multiple authors", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author={[
          "John Doe",
          {
            "@type": "Person",
            name: "Jane Smith",
            url: "https://example.com/jane",
          },
        ]}
        datePublished="2024-01-01T08:00:00+00:00"
        text="Co-authored post"
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
        url: "https://example.com/jane",
      },
    ]);
  });

  it("handles nested comments", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        headline="Very Popular Thread"
        author="Katie Pope"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Look at how cool this concert was!"
        comment={[
          {
            text: "Who's the person you're with?",
            author: "Saul Douglas",
            datePublished: "2024-01-01T09:46:02+02:00",
          },
          {
            text: "That's my mom, isn't she cool?",
            author: {
              name: "Katie Pope",
              url: "https://example.com/user/katie-pope",
            },
            datePublished: "2024-01-01T09:50:25+02:00",
            interactionStatistic: {
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: 7,
            },
            comment: [
              {
                text: "Yes, she is very cool!",
                author: "Another User",
                datePublished: "2024-01-01T10:00:00+02:00",
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

    expect(jsonData.comment).toHaveLength(2);
    expect(jsonData.comment[0]).toEqual({
      "@type": "Comment",
      text: "Who's the person you're with?",
      author: {
        "@type": "Person",
        name: "Saul Douglas",
      },
      datePublished: "2024-01-01T09:46:02+02:00",
    });

    expect(jsonData.comment[1].comment).toHaveLength(1);
    expect(jsonData.comment[1].comment[0]).toEqual({
      "@type": "Comment",
      text: "Yes, she is very cool!",
      author: {
        "@type": "Person",
        name: "Another User",
      },
      datePublished: "2024-01-01T10:00:00+02:00",
    });
  });

  it("handles interaction statistics", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="John Doe"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Popular post"
        interactionStatistic={[
          {
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: 27,
          },
          {
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: 5,
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
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 27,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: 5,
      },
    ]);
  });

  it("handles single interaction statistic", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="John Doe"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Popular post"
        interactionStatistic={{
          interactionType: "https://schema.org/ViewAction",
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
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: 1000,
    });
  });

  it("handles video content", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Video Creator"
        datePublished="2024-01-01T08:00:00+00:00"
        video={{
          name: "Video of concert",
          contentUrl: "https://example.com/media/super-cool-concert.mp4",
          uploadDate: "2024-03-01T06:34:34+02:00",
          thumbnailUrl: "https://example.com/media/super-cool-concert-snap.jpg",
          description: "Amazing concert footage",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "Video of concert",
      contentUrl: "https://example.com/media/super-cool-concert.mp4",
      uploadDate: "2024-03-01T06:34:34+02:00",
      thumbnailUrl: "https://example.com/media/super-cool-concert-snap.jpg",
      description: "Amazing concert footage",
    });
  });

  it("handles image content", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Photographer"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Check out these photos"
        image={[
          "https://example.com/photo1.jpg",
          {
            url: "https://example.com/photo2.jpg",
            width: 1200,
            height: 800,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual([
      "https://example.com/photo1.jpg",
      {
        "@type": "ImageObject",
        url: "https://example.com/photo2.jpg",
        width: 1200,
        height: 800,
      },
    ]);
  });

  it("handles shared content as URL string", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Link Sharer"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Check out this article"
        sharedContent="https://example.com/external-article"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.sharedContent).toEqual({
      "@type": "WebPage",
      url: "https://example.com/external-article",
    });
  });

  it("handles shared content as WebPage object", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Link Sharer"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Check out this article"
        sharedContent={{
          url: "https://example.com/external-article",
          name: "Amazing Article",
          description: "An article about amazing things",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.sharedContent).toEqual({
      "@type": "WebPage",
      url: "https://example.com/external-article",
      name: "Amazing Article",
      description: "An article about amazing things",
    });
  });

  it("handles deleted posts", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Deleted User"
        datePublished="2024-01-01T08:00:00+00:00"
        text="[This post has been deleted]"
        creativeWorkStatus="Deleted"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.creativeWorkStatus).toBe("Deleted");
  });

  it("handles isPartOf property", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="Forum User"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Post in gaming subforum"
        isPartOf={{
          name: "Gaming Subforum",
          url: "https://example.com/forums/gaming",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.isPartOf).toEqual({
      "@type": "CreativeWork",
      name: "Gaming Subforum",
      url: "https://example.com/forums/gaming",
    });
  });

  it("handles all properties combined", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        headline="I went to the concert!"
        text="Look at how cool this concert was!"
        image="https://example.com/concert.jpg"
        video={{
          name: "Video of concert",
          contentUrl: "https://example.com/media/super-cool-concert.mp4",
          uploadDate: "2024-03-01T06:34:34+02:00",
          thumbnailUrl: "https://example.com/media/super-cool-concert-snap.jpg",
          description: "Concert footage",
        }}
        url="https://example.com/post/very-popular-thread"
        author={{
          name: "Katie Pope",
          url: "https://example.com/user/katie-pope",
        }}
        datePublished="2024-03-01T08:34:34+02:00"
        dateModified="2024-03-01T09:00:00+02:00"
        interactionStatistic={{
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: 27,
        }}
        comment={[
          {
            text: "Who's the person you're with?",
            author: {
              name: "Saul Douglas",
              url: "https://example.com/user/saul-douglas",
            },
            datePublished: "2024-03-01T09:46:02+02:00",
          },
        ]}
        isPartOf="https://example.com/forums/concerts"
        sharedContent={{
          url: "https://example.com/concert-info",
          name: "Concert Information",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      headline: "I went to the concert!",
      text: "Look at how cool this concert was!",
      url: "https://example.com/post/very-popular-thread",
      datePublished: "2024-03-01T08:34:34+02:00",
      dateModified: "2024-03-01T09:00:00+02:00",
    });
    expect(jsonData.author).toBeDefined();
    expect(jsonData.video).toBeDefined();
    expect(jsonData.comment).toHaveLength(1);
    expect(jsonData.interactionStatistic).toBeDefined();
    expect(jsonData.sharedContent).toBeDefined();
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="John Doe"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Forum post"
        scriptId="custom-forum-id"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script!.getAttribute("id")).toBe("custom-forum-id");
    expect(script!.getAttribute("data-testid")).toBe("custom-forum-id");
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <DiscussionForumPostingJsonLd
        author="John Doe"
        datePublished="2024-01-01T08:00:00+00:00"
        text="Forum post"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    // React doesn't expose the key prop as an attribute, so we can't test it directly
    expect(script).toBeTruthy();
  });
});
