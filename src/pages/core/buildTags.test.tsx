/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from "vitest";
import { ReactElement } from "react";
import buildTags, { __resetDefaults } from "./buildTags";
import type { BuildTagsParams } from "../types";

describe("buildTags", () => {
  beforeEach(() => {
    __resetDefaults();
  });
  it("builds title tag", () => {
    const config: BuildTagsParams = {
      title: "Test Title",
    };

    const tags = buildTags(config);
    const titleTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.type === "title";
    }) as ReactElement<any> | undefined;

    expect(titleTag).toBeDefined();
    expect(titleTag?.props.children).toBe("Test Title");
  });

  it("builds description meta tag", () => {
    const config: BuildTagsParams = {
      description: "Test description",
    };

    const tags = buildTags(config);
    const descTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "description";
    }) as ReactElement<any> | undefined;

    expect(descTag).toBeDefined();
    expect(descTag?.props.content).toBe("Test description");
  });

  it("builds robots meta tag with noindex", () => {
    const config: BuildTagsParams = {
      noindex: true,
    };

    const tags = buildTags(config);
    const robotsTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "robots";
    }) as ReactElement<any> | undefined;

    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("noindex,follow");
  });

  it("builds robots meta tag with nofollow", () => {
    const config: BuildTagsParams = {
      nofollow: true,
    };

    const tags = buildTags(config);
    const robotsTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "robots";
    }) as ReactElement<any> | undefined;

    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("index,nofollow");
  });

  it("builds canonical link tag", () => {
    const config: BuildTagsParams = {
      canonical: "https://example.com/page",
    };

    const tags = buildTags(config);
    const canonicalTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.rel === "canonical";
    }) as ReactElement<any> | undefined;

    expect(canonicalTag).toBeDefined();
    expect(canonicalTag?.props.href).toBe("https://example.com/page");
  });

  it("builds OpenGraph tags", () => {
    const config: BuildTagsParams = {
      openGraph: {
        type: "website",
        title: "OG Title",
        description: "OG Description",
        url: "https://example.com",
        siteName: "Test Site",
      },
    };

    const tags = buildTags(config);

    const ogTitle = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:title";
    }) as ReactElement<any> | undefined;
    expect(ogTitle?.props.content).toBe("OG Title");

    const ogDesc = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:description";
    }) as ReactElement<any> | undefined;
    expect(ogDesc?.props.content).toBe("OG Description");

    const ogType = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:type";
    }) as ReactElement<any> | undefined;
    expect(ogType?.props.content).toBe("website");

    const ogUrl = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:url";
    }) as ReactElement<any> | undefined;
    expect(ogUrl?.props.content).toBe("https://example.com");

    const ogSiteName = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:site_name";
    }) as ReactElement<any> | undefined;
    expect(ogSiteName?.props.content).toBe("Test Site");
  });

  it("builds OpenGraph image tags", () => {
    const config: BuildTagsParams = {
      openGraph: {
        images: [
          {
            url: "https://example.com/image.jpg",
            width: 800,
            height: 600,
            alt: "Test Image",
          },
        ],
      },
    };

    const tags = buildTags(config);

    const ogImage = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:image";
    }) as ReactElement<any> | undefined;
    expect(ogImage?.props.content).toBe("https://example.com/image.jpg");

    const ogImageWidth = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:image:width";
    }) as ReactElement<any> | undefined;
    expect(ogImageWidth?.props.content).toBe("800");

    const ogImageHeight = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:image:height";
    }) as ReactElement<any> | undefined;
    expect(ogImageHeight?.props.content).toBe("600");

    const ogImageAlt = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "og:image:alt";
    }) as ReactElement<any> | undefined;
    expect(ogImageAlt?.props.content).toBe("Test Image");
  });

  it("builds Twitter tags", () => {
    const config: BuildTagsParams = {
      twitter: {
        cardType: "summary_large_image",
        site: "@site",
        handle: "@handle",
      },
    };

    const tags = buildTags(config);

    const twitterCard = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "twitter:card";
    }) as ReactElement<any> | undefined;
    expect(twitterCard?.props.content).toBe("summary_large_image");

    const twitterSite = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "twitter:site";
    }) as ReactElement<any> | undefined;
    expect(twitterSite?.props.content).toBe("@site");

    const twitterCreator = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "twitter:creator";
    }) as ReactElement<any> | undefined;
    expect(twitterCreator?.props.content).toBe("@handle");
  });

  it("applies title template", () => {
    const config: BuildTagsParams = {
      title: "Page Title",
      titleTemplate: "MySite | %s",
    };

    const tags = buildTags(config);
    const titleTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.type === "title";
    }) as ReactElement<any> | undefined;

    expect(titleTag?.props.children).toBe("MySite | Page Title");
  });

  it("uses defaultTitle when title is not provided", () => {
    const config: BuildTagsParams = {
      defaultTitle: "Default Title",
    };

    const tags = buildTags(config);
    const titleTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.type === "title";
    }) as ReactElement<any> | undefined;

    expect(titleTag?.props.children).toBe("Default Title");
  });

  it("builds additional meta tags", () => {
    const config: BuildTagsParams = {
      additionalMetaTags: [
        {
          property: "dc:creator",
          content: "Jane Doe",
        },
        {
          name: "application-name",
          content: "NextSeo",
        },
      ],
    };

    const tags = buildTags(config);

    const dcCreator = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "dc:creator";
    }) as ReactElement<any> | undefined;
    expect(dcCreator?.props.content).toBe("Jane Doe");

    const appName = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "application-name";
    }) as ReactElement<any> | undefined;
    expect(appName?.props.content).toBe("NextSeo");
  });

  it("builds additional link tags", () => {
    const config: BuildTagsParams = {
      additionalLinkTags: [
        {
          rel: "icon",
          href: "https://example.com/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "https://example.com/apple-touch-icon.png",
          sizes: "76x76",
        },
      ],
    };

    const tags = buildTags(config);

    const icon = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.rel === "icon";
    }) as ReactElement<any> | undefined;
    expect(icon?.props.href).toBe("https://example.com/favicon.ico");

    const appleTouchIcon = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.rel === "apple-touch-icon";
    }) as ReactElement<any> | undefined;
    expect(appleTouchIcon?.props.href).toBe(
      "https://example.com/apple-touch-icon.png",
    );
    expect(appleTouchIcon?.props.sizes).toBe("76x76");
  });

  it("builds robots props correctly", () => {
    const config: BuildTagsParams = {
      robotsProps: {
        nosnippet: true,
        maxSnippet: 150,
        maxImagePreview: "large",
        noarchive: true,
      },
    };

    const tags = buildTags(config);
    const robotsTag = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.name === "robots";
    }) as ReactElement<any> | undefined;

    expect(robotsTag?.props.content).toContain("nosnippet");
    expect(robotsTag?.props.content).toContain("max-snippet:150");
    expect(robotsTag?.props.content).toContain("max-image-preview:large");
    expect(robotsTag?.props.content).toContain("noarchive");
  });

  it("handles OpenGraph article type", () => {
    const config: BuildTagsParams = {
      openGraph: {
        type: "article",
        article: {
          publishedTime: "2024-01-01T00:00:00Z",
          modifiedTime: "2024-01-02T00:00:00Z",
          authors: ["Author 1", "Author 2"],
          section: "Technology",
          tags: ["tag1", "tag2"],
        },
      },
    };

    const tags = buildTags(config);

    const publishedTime = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "article:published_time";
    }) as ReactElement<any> | undefined;
    expect(publishedTime?.props.content).toBe("2024-01-01T00:00:00Z");

    const section = tags.find((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "article:section";
    }) as ReactElement<any> | undefined;
    expect(section?.props.content).toBe("Technology");

    const authors = tags.filter((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.property === "article:author";
    }) as ReactElement<any>[];
    expect(authors).toHaveLength(2);
    expect(authors[0]?.props.content).toBe("Author 1");
    expect(authors[1]?.props.content).toBe("Author 2");
  });

  it("handles language alternates", () => {
    const config: BuildTagsParams = {
      languageAlternates: [
        {
          hrefLang: "de",
          href: "https://example.com/de",
        },
        {
          hrefLang: "fr",
          href: "https://example.com/fr",
        },
      ],
    };

    const tags = buildTags(config);

    const alternates = tags.filter((tag) => {
      const elem = tag as ReactElement<any>;
      return elem?.props?.rel === "alternate" && elem?.props?.hrefLang;
    }) as ReactElement<any>[];

    expect(alternates).toHaveLength(2);
    expect(alternates[0]?.props.hrefLang).toBe("de");
    expect(alternates[0]?.props.href).toBe("https://example.com/de");
    expect(alternates[1]?.props.hrefLang).toBe("fr");
    expect(alternates[1]?.props.href).toBe("https://example.com/fr");
  });
});
