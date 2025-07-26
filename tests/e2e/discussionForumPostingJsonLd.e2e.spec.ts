import { test, expect } from "@playwright/test";

test.describe("DiscussionForumPostingJsonLd", () => {
  test("renders basic DiscussionForumPosting structured data", async ({
    page,
  }) => {
    await page.goto("/discussion-forum");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("DiscussionForumPosting");
    expect(jsonData.headline).toBe("I went to the concert!");
    expect(jsonData.text).toBe("Look at how cool this concert was!");
    expect(jsonData.url).toBe("https://example.com/forum/very-popular-thread");
    expect(jsonData.datePublished).toBe("2024-01-01T08:00:00+00:00");

    // Verify author
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Katie Pope",
    });

    // Verify comments
    expect(jsonData.comment).toHaveLength(2);
    expect(jsonData.comment[0]).toEqual({
      "@type": "Comment",
      text: "Who's the person you're with?",
      author: {
        "@type": "Person",
        name: "Saul Douglas",
      },
      datePublished: "2024-01-01T09:46:02+00:00",
    });
    expect(jsonData.comment[1]).toEqual({
      "@type": "Comment",
      text: "That's my mom, isn't she cool?",
      author: {
        "@type": "Person",
        name: "Katie Pope",
      },
      datePublished: "2024-01-01T09:50:25+00:00",
    });
  });

  test("renders advanced DiscussionForumPosting with all features", async ({
    page,
  }) => {
    await page.goto("/discussion-forum-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("DiscussionForumPosting");
    expect(jsonData.headline).toBe("Very Popular Thread About Concerts");

    // Verify dates
    expect(jsonData.datePublished).toBe("2024-01-01T08:34:34+00:00");
    expect(jsonData.dateModified).toBe("2024-01-01T09:00:00+00:00");

    // Verify author with URL
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Katie Pope",
      url: "https://example.com/user/katie-pope",
    });

    // Verify images
    expect(jsonData.image).toHaveLength(2);
    expect(jsonData.image[0]).toBe("https://example.com/concert-photo1.jpg");
    expect(jsonData.image[1]).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/concert-photo2.jpg",
      width: 1200,
      height: 800,
      caption: "The main stage",
    });

    // Verify video
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "Concert Highlights",
      contentUrl: "https://example.com/concert-video.mp4",
      uploadDate: "2024-01-02T10:00:00+00:00",
      thumbnailUrl: "https://example.com/concert-thumbnail.jpg",
      description: "Best moments from the concert",
    });

    // Verify interaction statistics
    expect(jsonData.interactionStatistic).toHaveLength(3);
    expect(jsonData.interactionStatistic[0]).toEqual({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/LikeAction",
      userInteractionCount: 127,
    });

    // Verify isPartOf
    expect(jsonData.isPartOf).toEqual({
      "@type": "CreativeWork",
      name: "Concert Discussions",
      url: "https://example.com/forum/concerts",
    });

    // Verify sharedContent
    expect(jsonData.sharedContent).toEqual({
      "@type": "WebPage",
      url: "https://example.com/concert-tickets",
      name: "Concert Venue Information",
      description: "Details about the venue and upcoming shows",
    });

    // Verify nested comments
    expect(jsonData.comment).toHaveLength(2);
    expect(jsonData.comment[0].comment).toHaveLength(1);
    expect(jsonData.comment[0].comment[0]).toMatchObject({
      "@type": "Comment",
      text: "Yes it should, it's a great post!",
      author: {
        "@type": "Person",
        name: "Happy Fan",
      },
    });

    // Verify comment with video
    expect(jsonData.comment[1].video).toMatchObject({
      "@type": "VideoObject",
      name: "My Concert Video",
    });
  });

  test("renders SocialMediaPosting type", async ({ page }) => {
    await page.goto("/social-media-posting");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify it's SocialMediaPosting type
    expect(jsonData["@type"]).toBe("SocialMediaPosting");

    // Verify author
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "TechInfluencer",
      url: "https://example.com/user/techinfluencer",
    });

    // Verify shared content is processed correctly
    expect(jsonData.sharedContent).toEqual({
      "@type": "WebPage",
      url: "https://example.com/ai-tool-review",
      name: "Revolutionary AI Tool for Content Creators",
      description:
        "A comprehensive review of the latest AI tool that's changing how we create content",
    });

    // Verify multiple interaction statistics
    expect(jsonData.interactionStatistic).toHaveLength(3);
    const likeAction = jsonData.interactionStatistic.find(
      (stat: { interactionType: string }) =>
        stat.interactionType === "https://schema.org/LikeAction",
    );
    expect(likeAction.userInteractionCount).toBe(342);
  });

  test("renders deleted DiscussionForumPosting", async ({ page }) => {
    await page.goto("/discussion-forum-deleted");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify deleted status
    expect(jsonData.creativeWorkStatus).toBe("Deleted");
    expect(jsonData.headline).toBe("[Deleted Post]");
    expect(jsonData.text).toBe(
      "This post has been removed by the author or moderators.",
    );

    // Verify mix of normal and deleted comments
    expect(jsonData.comment).toHaveLength(3);

    // Check deleted comment
    expect(jsonData.comment[1].creativeWorkStatus).toBe("Deleted");
    expect(jsonData.comment[1].text).toBe("[This comment has been deleted]");

    // Check moderator comment (Organization author)
    expect(jsonData.comment[2].author).toEqual({
      "@type": "Organization",
      name: "Forum Moderators",
      url: "https://example.com/moderators",
    });
  });
});
