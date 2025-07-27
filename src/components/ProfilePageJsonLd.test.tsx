import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfilePageJsonLd from "./ProfilePageJsonLd";

describe("ProfilePageJsonLd", () => {
  it("renders basic ProfilePage with string mainEntity", () => {
    const { container } = render(
      <ProfilePageJsonLd mainEntity="Angelo Huff" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: "Angelo Huff",
      },
    });
  });

  it("renders ProfilePage with Person mainEntity", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          alternateName: "ahuff23",
          identifier: "123475623",
          description: "Defender of Truth",
          image: "https://example.com/avatars/ahuff23.jpg",
          sameAs: [
            "https://www.example.com/real-angelo",
            "https://example.com/profile/therealangelohuff",
          ],
        }}
        dateCreated="2024-12-23T12:34:00-05:00"
        dateModified="2024-12-26T14:53:00-05:00"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: "Angelo Huff",
        alternateName: "ahuff23",
        identifier: "123475623",
        description: "Defender of Truth",
        image: "https://example.com/avatars/ahuff23.jpg",
        sameAs: [
          "https://www.example.com/real-angelo",
          "https://example.com/profile/therealangelohuff",
        ],
      },
      dateCreated: "2024-12-23T12:34:00-05:00",
      dateModified: "2024-12-26T14:53:00-05:00",
    });
  });

  it("renders ProfilePage with Organization mainEntity", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          "@type": "Organization",
          name: "TechCorp Inc",
          url: "https://techcorp.com",
          logo: "https://techcorp.com/logo.png",
          sameAs: [
            "https://twitter.com/techcorp",
            "https://linkedin.com/company/techcorp",
          ],
          alternateName: "Tech Corporation",
          identifier: "org-123456",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Organization",
        name: "TechCorp Inc",
        url: "https://techcorp.com",
        logo: "https://techcorp.com/logo.png",
        sameAs: [
          "https://twitter.com/techcorp",
          "https://linkedin.com/company/techcorp",
        ],
        alternateName: "Tech Corporation",
        identifier: "org-123456",
      },
    });
  });

  it("detects Organization from properties without @type", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Example Corp",
          logo: "https://example.com/logo.png",
          address: "123 Main St",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.mainEntity["@type"]).toBe("Organization");
    expect(jsonData.mainEntity.name).toBe("Example Corp");
    expect(jsonData.mainEntity.logo).toBe("https://example.com/logo.png");
  });

  it("handles interactionStatistic array", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          interactionStatistic: [
            {
              interactionType: "https://schema.org/FollowAction",
              userInteractionCount: 1,
            },
            {
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: 5,
            },
          ],
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.mainEntity.interactionStatistic).toEqual([
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: 1,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 5,
      },
    ]);
  });

  it("handles single interactionStatistic", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          interactionStatistic: {
            interactionType: "https://schema.org/FollowAction",
            userInteractionCount: 100,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.mainEntity.interactionStatistic).toEqual({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/FollowAction",
      userInteractionCount: 100,
    });
  });

  it("handles agentInteractionStatistic", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          agentInteractionStatistic: {
            interactionType: "https://schema.org/WriteAction",
            userInteractionCount: 2346,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.mainEntity.agentInteractionStatistic).toEqual({
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 2346,
    });
  });

  it("handles sameAs as single string", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          sameAs: "https://example.com/profile",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.mainEntity.sameAs).toBe("https://example.com/profile");
  });

  it("renders with custom scriptId and scriptKey", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity="John Doe"
        scriptId="profile-script"
        scriptKey="custom-profile-key"
      />,
    );

    const script = container.querySelector("#profile-script");
    expect(script).toBeTruthy();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("renders with all properties", () => {
    const { container } = render(
      <ProfilePageJsonLd
        mainEntity={{
          "@type": "Person",
          name: "Angelo Huff",
          alternateName: "ahuff23",
          identifier: "123475623",
          description: "Defender of Truth",
          image: "https://example.com/avatars/ahuff23.jpg",
          url: "https://example.com/angelo",
          sameAs: [
            "https://www.example.com/real-angelo",
            "https://example.com/profile/therealangelohuff",
          ],
          interactionStatistic: [
            {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/FollowAction",
              userInteractionCount: 1,
            },
            {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: 5,
            },
          ],
          agentInteractionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/WriteAction",
            userInteractionCount: 2346,
          },
        }}
        dateCreated="2024-12-23T12:34:00-05:00"
        dateModified="2024-12-26T14:53:00-05:00"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: "Angelo Huff",
        alternateName: "ahuff23",
        identifier: "123475623",
        description: "Defender of Truth",
        image: "https://example.com/avatars/ahuff23.jpg",
        url: "https://example.com/angelo",
        sameAs: [
          "https://www.example.com/real-angelo",
          "https://example.com/profile/therealangelohuff",
        ],
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/FollowAction",
            userInteractionCount: 1,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: 5,
          },
        ],
        agentInteractionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/WriteAction",
          userInteractionCount: 2346,
        },
      },
      dateCreated: "2024-12-23T12:34:00-05:00",
      dateModified: "2024-12-26T14:53:00-05:00",
    });
  });
});
