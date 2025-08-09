/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from "vitest";
import { BuildTagsParams, ImagePrevSize } from "../types";

import buildTags, { __resetDefaults } from "./buildTags";

const SEO: BuildTagsParams = {
  title: "This is a test title.",
  themeColor: "#73fa97",
  description: "This is a test description.",
  canonical: "https://www.canonical.ie",
  defaultOpenGraphImageHeight: 1200,
  defaultOpenGraphImageWidth: 1200,
  mobileAlternate: {
    media: "only screen and (max-width: 640px)",
    href: "https://m.canonical.ie",
  },
  languageAlternates: [
    {
      hrefLang: "de-AT",
      href: "https://www.canonical.ie/de",
    },
    {
      hrefLang: "sk-SK",
      href: "https://www.canonical.ie/sk",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "https://www.test.ie/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "https://www.test.ie/touch-icon-ipad.jpg",
      sizes: "76x76",
    },
    {
      rel: "apple-touch-icon",
      href: "https://www.test.ie/touch-icon-iphone-retina.jpg",
      sizes: "120x120",
    },
    {
      rel: "mask-icon",
      href: "https://www.test.ie/safari-pinned-tab.svg",
      color: "#193860",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "preload",
      href: "https://www.test.ie/font/sample-font.woof2",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.url.ie",
    title: "Open graph title",
    description: "This is testing og:description.",
    images: [
      {
        url: "https://www.test.ie/image-01.jpg",
        width: 800,
        height: 600,
        alt: "Alt text right here",
        type: "image/jpeg",
        secureUrl: "https://www.test.ie/secure-image-01.jpg",
      },
      { url: "https://www.test.ie/image-02.jpg" },
      { url: "https://www.test.ie/image-03.jpg" },
      { url: "https://www.test.ie/image-04.jpg" },
    ],
    audio: [
      {
        url: "http://examples.opengraphprotocol.us/media/audio/1khz.mp3",
        secureUrl: "https://d72cgtgi6hvvl.cloudfront.net/media/audio/1khz.mp3",
        type: "audio/mpeg",
      },
      {
        url: "http://examples.opengraphprotocol.us/media/audio/250hz.mp3",
        secureUrl: "https://d72cgtgi6hvvl.cloudfront.net/media/audio/250hz.mp3",
        type: "audio/mpeg",
      },
    ],
    site_name: "SiteName",
    siteName: "SiteName",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  facebook: {
    appId: "1234567890",
  },
};

// Helper function to find tags by type and prop
function findTag(
  tags: any[],
  type: string,
  propName?: string,
  propValue?: string,
) {
  return tags.find((tag: any) => {
    if (tag.type !== type) return false;
    if (!propName) return true;
    return tag.props?.[propName] === propValue;
  });
}

function findTags(
  tags: any[],
  type: string,
  propName?: string,
  propValue?: string,
) {
  return tags.filter((tag: any) => {
    if (tag.type !== type) return false;
    if (!propName) return true;
    return tag.props?.[propName] === propValue;
  });
}

describe("buildTags backwards compatibility", () => {
  beforeEach(() => {
    __resetDefaults();
  });

  it("renders correctly", () => {
    const tags = buildTags(SEO);
    expect(tags).toMatchSnapshot();
  });

  it("returns full array for default seo object", () => {
    const tags = buildTags(SEO);

    // Title
    const titleTag = findTag(tags, "title");
    expect(titleTag).toBeDefined();
    expect(titleTag?.props.children).toBe(SEO.title);

    // Robots
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("index,follow");

    // Description
    const descriptionTag = findTag(tags, "meta", "name", "description");
    expect(descriptionTag).toBeDefined();
    expect(descriptionTag?.props.content).toBe(SEO.description);

    // Theme color
    const themeColorTag = findTag(tags, "meta", "name", "theme-color");
    expect(themeColorTag).toBeDefined();
    expect(themeColorTag?.props.content).toBe(SEO.themeColor);

    // Facebook
    const fbAppIdTag = findTag(tags, "meta", "property", "fb:app_id");
    expect(fbAppIdTag).toBeDefined();
    expect(fbAppIdTag?.props.content).toBe(SEO.facebook!.appId);

    // Twitter
    const twitterCardTag = findTag(tags, "meta", "name", "twitter:card");
    expect(twitterCardTag).toBeDefined();
    expect(twitterCardTag?.props.content).toBe(SEO.twitter!.cardType);

    const twitterSiteTag = findTag(tags, "meta", "name", "twitter:site");
    expect(twitterSiteTag).toBeDefined();
    expect(twitterSiteTag?.props.content).toBe(SEO.twitter!.site);

    const twitterHandleTag = findTag(tags, "meta", "name", "twitter:creator");
    expect(twitterHandleTag).toBeDefined();
    expect(twitterHandleTag?.props.content).toBe(SEO.twitter!.handle);

    // OpenGraph
    const ogUrlTag = findTag(tags, "meta", "property", "og:url");
    expect(ogUrlTag).toBeDefined();
    expect(ogUrlTag?.props.content).toBe(SEO.openGraph!.url);

    const ogTypeTag = findTag(tags, "meta", "property", "og:type");
    expect(ogTypeTag).toBeDefined();
    expect(ogTypeTag?.props.content).toBe(SEO.openGraph!.type);

    const ogTitleTag = findTag(tags, "meta", "property", "og:title");
    expect(ogTitleTag).toBeDefined();
    expect(ogTitleTag?.props.content).toBe(SEO.openGraph!.title);

    const ogDescriptionTag = findTag(
      tags,
      "meta",
      "property",
      "og:description",
    );
    expect(ogDescriptionTag).toBeDefined();
    expect(ogDescriptionTag?.props.content).toBe(SEO.openGraph!.description);

    const ogLocaleTag = findTag(tags, "meta", "property", "og:locale");
    expect(ogLocaleTag).toBeDefined();
    expect(ogLocaleTag?.props.content).toBe(SEO.openGraph!.locale);

    const ogSiteNameTag = findTag(tags, "meta", "property", "og:site_name");
    expect(ogSiteNameTag).toBeDefined();
    expect(ogSiteNameTag?.props.content).toBe(
      SEO.openGraph!.siteName || SEO.openGraph!.site_name,
    );

    // OpenGraph Images
    const ogImageTags = findTags(tags, "meta", "property", "og:image");
    expect(ogImageTags.length).toBe(4);
    expect(ogImageTags[0]?.props.content).toBe(SEO.openGraph!.images![0].url);

    const ogImageWidthTag = findTag(tags, "meta", "property", "og:image:width");
    expect(ogImageWidthTag).toBeDefined();
    expect(ogImageWidthTag?.props.content).toBe(
      String(SEO.openGraph!.images![0].width),
    );

    const ogImageHeightTag = findTag(
      tags,
      "meta",
      "property",
      "og:image:height",
    );
    expect(ogImageHeightTag).toBeDefined();
    expect(ogImageHeightTag?.props.content).toBe(
      String(SEO.openGraph!.images![0].height),
    );

    const ogImageAltTag = findTag(tags, "meta", "property", "og:image:alt");
    expect(ogImageAltTag).toBeDefined();
    expect(ogImageAltTag?.props.content).toBe(SEO.openGraph!.images![0].alt);

    const ogImageTypeTag = findTag(tags, "meta", "property", "og:image:type");
    expect(ogImageTypeTag).toBeDefined();
    expect(ogImageTypeTag?.props.content).toBe(SEO.openGraph!.images![0].type);

    const ogImageSecureUrlTag = findTag(
      tags,
      "meta",
      "property",
      "og:image:secure_url",
    );
    expect(ogImageSecureUrlTag).toBeDefined();
    expect(ogImageSecureUrlTag?.props.content).toBe(
      SEO.openGraph!.images![0].secureUrl,
    );

    // OpenGraph Audio
    const ogAudioTags = findTags(tags, "meta", "property", "og:audio");
    expect(ogAudioTags.length).toBe(2);
    expect(ogAudioTags[0]?.props.content).toBe(SEO.openGraph!.audio![0].url);

    // Canonical
    const canonicalTag = findTag(tags, "link", "rel", "canonical");
    expect(canonicalTag).toBeDefined();
    expect(canonicalTag?.props.href).toBe(SEO.canonical);

    // Mobile Alternate
    const mobileAlternateTag = findTag(tags, "link", "rel", "alternate");
    expect(mobileAlternateTag).toBeDefined();
    expect(mobileAlternateTag?.props.href).toBe(SEO.mobileAlternate!.href);
    expect(mobileAlternateTag?.props.media).toBe(SEO.mobileAlternate!.media);

    // Language Alternates
    const languageAlternateTags = findTags(tags, "link").filter(
      (tag: any) => tag.props?.rel === "alternate" && tag.props?.hrefLang,
    );
    expect(languageAlternateTags.length).toBe(SEO.languageAlternates!.length);

    SEO.languageAlternates!.forEach((alt, idx) => {
      const tag = languageAlternateTags[idx];
      expect(tag?.props.hrefLang).toBe(alt.hrefLang);
      expect(tag?.props.href).toBe(alt.href);
    });

    // Additional Link Tags
    const iconTag = findTag(tags, "link", "rel", "icon");
    expect(iconTag).toBeDefined();
    expect(iconTag?.props.href).toBe(SEO.additionalLinkTags![0].href);
  });

  it("correctly sets noindex", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      noindex: true,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("noindex,follow");
  });

  it("correctly sets nofollow", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      nofollow: true,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("index,nofollow");
  });

  it("correctly sets noindex, nofollow", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      noindex: true,
      nofollow: true,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("noindex,nofollow");
  });

  it("displays title with titleTemplate integrated", () => {
    const template = "Next SEO";
    const overrideProps: BuildTagsParams = {
      ...SEO,
      titleTemplate: `${template} | %s`,
    };
    const tags = buildTags(overrideProps);
    const titleTag = findTag(tags, "title");
    expect(titleTag).toBeDefined();
    expect(titleTag?.props.children).toBe(`${template} | ${SEO.title}`);
  });

  it("displays defaultTitle when no title is provided", () => {
    const defaultTitle = "Next SEO";
    const props = {
      titleTemplate: `${defaultTitle} | %s`,
      defaultTitle,
    };
    const tags = buildTags(props);
    const titleTag = findTag(tags, "title");
    expect(titleTag).toBeDefined();
    expect(titleTag?.props.children).toBe(defaultTitle);

    const ogTitleTag = findTag(tags, "meta", "property", "og:title");
    expect(ogTitleTag).toBeDefined();
    expect(ogTitleTag?.props.content).toBe(defaultTitle);
  });

  const ArticleSEO = {
    title: "Article Page Title",
    description: "Description of article page",
    openGraph: {
      title: "Open Graph Article Title",
      description: "Description of open graph article",
      url: "https://www.example.com/articles/article-title",
      type: "article" as const,
      article: {
        publishedTime: "2017-06-21T23:04:13Z",
        modifiedTime: "2018-01-21T18:04:43Z",
        expirationTime: "2022-12-21T22:04:11Z",
        authors: [
          "https://www.example.com/authors/@firstnameA-lastnameA",
          "https://www.example.com/authors/@firstnameB-lastnameB",
        ],
        section: "Section II",
        tags: ["Tag A", "Tag B"],
      },
      images: [
        {
          url: "https://www.test.ie/og-image-article-title-01.jpg",
          width: 850,
          height: 650,
          alt: "Og Image Alt Article Title A",
        },
        {
          url: "https://www.test.ie/og-image-article-title-02.jpg",
          width: 950,
          height: 850,
          alt: "Og Image Alt Article Title B",
        },
      ],
      siteName: "SiteName",
      site_name: "SiteName",
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image" as const,
    },
  };

  it("Article SEO renders correctly", () => {
    const tags = buildTags(ArticleSEO);
    expect(tags).toMatchSnapshot();
  });

  it("Check article og type meta", () => {
    const tags = buildTags(ArticleSEO);

    const ogTypeTag = findTag(tags, "meta", "property", "og:type");
    expect(ogTypeTag).toBeDefined();
    expect(ogTypeTag?.props.content).toBe(ArticleSEO.openGraph.type);

    const ogArticlePublishedTimeTag = findTag(
      tags,
      "meta",
      "property",
      "article:published_time",
    );
    expect(ogArticlePublishedTimeTag).toBeDefined();
    expect(ogArticlePublishedTimeTag?.props.content).toBe(
      ArticleSEO.openGraph.article.publishedTime,
    );

    const ogArticleModifiedTimeTag = findTag(
      tags,
      "meta",
      "property",
      "article:modified_time",
    );
    expect(ogArticleModifiedTimeTag).toBeDefined();
    expect(ogArticleModifiedTimeTag?.props.content).toBe(
      ArticleSEO.openGraph.article.modifiedTime,
    );

    const ogArticleExpirationTimeTag = findTag(
      tags,
      "meta",
      "property",
      "article:expiration_time",
    );
    expect(ogArticleExpirationTimeTag).toBeDefined();
    expect(ogArticleExpirationTimeTag?.props.content).toBe(
      ArticleSEO.openGraph.article.expirationTime,
    );

    const ogArticleAuthorTags = findTags(
      tags,
      "meta",
      "property",
      "article:author",
    );
    expect(ogArticleAuthorTags.length).toBe(2);
    expect(ogArticleAuthorTags[0]?.props.content).toBe(
      ArticleSEO.openGraph.article.authors[0],
    );
    expect(ogArticleAuthorTags[1]?.props.content).toBe(
      ArticleSEO.openGraph.article.authors[1],
    );

    const ogArticleSectionTag = findTag(
      tags,
      "meta",
      "property",
      "article:section",
    );
    expect(ogArticleSectionTag).toBeDefined();
    expect(ogArticleSectionTag?.props.content).toBe(
      ArticleSEO.openGraph.article.section,
    );

    const ogArticleTagTags = findTags(tags, "meta", "property", "article:tag");
    expect(ogArticleTagTags.length).toBe(2);
    expect(ogArticleTagTags[0]?.props.content).toBe(
      ArticleSEO.openGraph.article.tags[0],
    );
    expect(ogArticleTagTags[1]?.props.content).toBe(
      ArticleSEO.openGraph.article.tags[1],
    );
  });

  const BookSEO = {
    title: "Book Page Title",
    description: "Description of book page",
    openGraph: {
      title: "Open Graph Book Title",
      description: "Description of open graph book",
      url: "https://www.example.com/books/book-title",
      type: "book" as const,
      book: {
        releaseDate: "2018-09-17T11:08:13Z",
        isbn: "978-3-16-148410-0",
        authors: [
          "https://www.example.com/authors/@firstnameA-lastnameA",
          "https://www.example.com/authors/@firstnameB-lastnameB",
        ],
        tags: ["Tag A", "Tag B"],
      },
      images: [
        {
          url: "https://www.test.ie/og-image-book-title-01.jpg",
          width: 850,
          height: 650,
          alt: "Og Image Alt Book Title A",
        },
        {
          url: "https://www.test.ie/og-image-book-title-02.jpg",
          width: 950,
          height: 850,
          alt: "Og Image Alt Book Title B",
        },
      ],
      siteName: "SiteName",
      site_name: "SiteName",
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image" as const,
    },
  };

  it("Book SEO renders correctly", () => {
    const tags = buildTags(BookSEO);
    expect(tags).toMatchSnapshot();
  });

  it("Check book og type meta", () => {
    const tags = buildTags(BookSEO);

    const ogTypeTag = findTag(tags, "meta", "property", "og:type");
    expect(ogTypeTag).toBeDefined();
    expect(ogTypeTag?.props.content).toBe(BookSEO.openGraph.type);

    const ogBookReleaseDateTag = findTag(
      tags,
      "meta",
      "property",
      "book:release_date",
    );
    expect(ogBookReleaseDateTag).toBeDefined();
    expect(ogBookReleaseDateTag?.props.content).toBe(
      BookSEO.openGraph.book.releaseDate,
    );

    const ogBookAuthorTags = findTags(tags, "meta", "property", "book:author");
    expect(ogBookAuthorTags.length).toBe(2);
    expect(ogBookAuthorTags[0]?.props.content).toBe(
      BookSEO.openGraph.book.authors[0],
    );
    expect(ogBookAuthorTags[1]?.props.content).toBe(
      BookSEO.openGraph.book.authors[1],
    );

    const ogBookIsbnTag = findTag(tags, "meta", "property", "book:isbn");
    expect(ogBookIsbnTag).toBeDefined();
    expect(ogBookIsbnTag?.props.content).toBe(BookSEO.openGraph.book.isbn);

    const ogBookTagTags = findTags(tags, "meta", "property", "book:tag");
    expect(ogBookTagTags.length).toBe(2);
    expect(ogBookTagTags[0]?.props.content).toBe(
      BookSEO.openGraph.book.tags[0],
    );
    expect(ogBookTagTags[1]?.props.content).toBe(
      BookSEO.openGraph.book.tags[1],
    );
  });

  const ProfileSEO = {
    title: "Profile Page Title",
    description: "Description of profile page",
    openGraph: {
      title: "Open Graph Profile Title",
      description: "Description of open graph profile",
      url: "https://www.example.com/@firstlast123",
      type: "profile" as const,
      profile: {
        firstName: "First",
        lastName: "Last",
        username: "firstlast123",
        gender: "male",
      },
      images: [
        {
          url: "https://www.test.ie/og-image-firstlast123-01.jpg",
          width: 850,
          height: 650,
          alt: "Og Image Alt firstlast123 A",
        },
        {
          url: "https://www.test.ie/og-image-firstlast123-02.jpg",
          width: 950,
          height: 850,
          alt: "Og Image Alt firstlast123 B",
        },
      ],
      siteName: "SiteName",
      site_name: "SiteName",
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image" as const,
    },
  };

  it("Profile SEO renders correctly", () => {
    const tags = buildTags(ProfileSEO);
    expect(tags).toMatchSnapshot();
  });

  it("Check profile og type meta", () => {
    const tags = buildTags(ProfileSEO);

    const ogTypeTag = findTag(tags, "meta", "property", "og:type");
    expect(ogTypeTag).toBeDefined();
    expect(ogTypeTag?.props.content).toBe(ProfileSEO.openGraph.type);

    const ogProfileFirstNameTag = findTag(
      tags,
      "meta",
      "property",
      "profile:first_name",
    );
    expect(ogProfileFirstNameTag).toBeDefined();
    expect(ogProfileFirstNameTag?.props.content).toBe(
      ProfileSEO.openGraph.profile.firstName,
    );

    const ogProfileLastNameTag = findTag(
      tags,
      "meta",
      "property",
      "profile:last_name",
    );
    expect(ogProfileLastNameTag).toBeDefined();
    expect(ogProfileLastNameTag?.props.content).toBe(
      ProfileSEO.openGraph.profile.lastName,
    );

    const ogProfileUsernameTag = findTag(
      tags,
      "meta",
      "property",
      "profile:username",
    );
    expect(ogProfileUsernameTag).toBeDefined();
    expect(ogProfileUsernameTag?.props.content).toBe(
      ProfileSEO.openGraph.profile.username,
    );

    const ogProfileGenderTag = findTag(
      tags,
      "meta",
      "property",
      "profile:gender",
    );
    expect(ogProfileGenderTag).toBeDefined();
    expect(ogProfileGenderTag?.props.content).toBe(
      ProfileSEO.openGraph.profile.gender,
    );
  });

  const VideoSEO = {
    title: "Video Page Title",
    description: "Description of video page",
    openGraph: {
      title: "Open Graph Video Title",
      description: "Description of open graph video",
      url: "https://www.example.com/videos/video-title",
      type: "video.movie" as const,
      video: {
        actors: [
          {
            profile: "https://www.example.com/actors/@firstnameA-lastnameA",
            role: "Protagonist",
          },
          {
            profile: "https://www.example.com/actors/@firstnameB-lastnameB",
            role: "Antagonist",
          },
        ],
        directors: [
          "https://www.example.com/directors/@firstnameA-lastnameA",
          "https://www.example.com/directors/@firstnameB-lastnameB",
        ],
        writers: [
          "https://www.example.com/writers/@firstnameA-lastnameA",
          "https://www.example.com/writers/@firstnameB-lastnameB",
        ],
        duration: 680000,
        releaseDate: "2022-12-21T22:04:11Z",
        tags: ["Tag A", "Tag B"],
      },
      images: [
        {
          url: "https://www.test.ie/og-image-video-title-01.jpg",
          width: 850,
          height: 650,
          alt: "Og Image Alt Video Title A",
        },
        {
          url: "https://www.test.ie/og-image-video-title-02.jpg",
          width: 950,
          height: 850,
          alt: "Og Image Alt Video Title B",
        },
      ],
      siteName: "SiteName",
      site_name: "SiteName",
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image" as const,
    },
  };

  it("Video SEO renders correctly", () => {
    const tags = buildTags(VideoSEO);
    expect(tags).toMatchSnapshot();
  });

  it("Check video og type meta", () => {
    const tags = buildTags(VideoSEO);

    const ogTypeTag = findTag(tags, "meta", "property", "og:type");
    expect(ogTypeTag).toBeDefined();
    expect(ogTypeTag?.props.content).toBe(VideoSEO.openGraph.type);

    const ogVideoReleaseDateTag = findTag(
      tags,
      "meta",
      "property",
      "video:release_date",
    );
    expect(ogVideoReleaseDateTag).toBeDefined();
    expect(ogVideoReleaseDateTag?.props.content).toBe(
      VideoSEO.openGraph.video.releaseDate,
    );

    const ogVideoDurationTag = findTag(
      tags,
      "meta",
      "property",
      "video:duration",
    );
    expect(ogVideoDurationTag).toBeDefined();
    expect(ogVideoDurationTag?.props.content).toBe(
      String(VideoSEO.openGraph.video.duration),
    );

    const ogVideoActorTags = findTags(tags, "meta", "property", "video:actor");
    expect(ogVideoActorTags.length).toBe(2);
    expect(ogVideoActorTags[0]?.props.content).toBe(
      VideoSEO.openGraph.video.actors[0].profile,
    );
    expect(ogVideoActorTags[1]?.props.content).toBe(
      VideoSEO.openGraph.video.actors[1].profile,
    );

    const ogVideoActorRoleTags = findTags(
      tags,
      "meta",
      "property",
      "video:actor:role",
    );
    expect(ogVideoActorRoleTags.length).toBe(2);
    expect(ogVideoActorRoleTags[0]?.props.content).toBe(
      VideoSEO.openGraph.video.actors[0].role,
    );
    expect(ogVideoActorRoleTags[1]?.props.content).toBe(
      VideoSEO.openGraph.video.actors[1].role,
    );

    const ogVideoDirectorTags = findTags(
      tags,
      "meta",
      "property",
      "video:director",
    );
    expect(ogVideoDirectorTags.length).toBe(2);
    expect(ogVideoDirectorTags[0]?.props.content).toBe(
      VideoSEO.openGraph.video.directors[0],
    );
    expect(ogVideoDirectorTags[1]?.props.content).toBe(
      VideoSEO.openGraph.video.directors[1],
    );

    const ogVideoWriterTags = findTags(
      tags,
      "meta",
      "property",
      "video:writer",
    );
    expect(ogVideoWriterTags.length).toBe(2);
    expect(ogVideoWriterTags[0]?.props.content).toBe(
      VideoSEO.openGraph.video.writers[0],
    );
    expect(ogVideoWriterTags[1]?.props.content).toBe(
      VideoSEO.openGraph.video.writers[1],
    );

    const ogVideoTagTags = findTags(tags, "meta", "property", "video:tag");
    expect(ogVideoTagTags.length).toBe(2);
    expect(ogVideoTagTags[0]?.props.content).toBe(
      VideoSEO.openGraph.video.tags[0],
    );
    expect(ogVideoTagTags[1]?.props.content).toBe(
      VideoSEO.openGraph.video.tags[1],
    );
  });

  it("additional meta tags are set", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      additionalMetaTags: [
        { property: "random", content: "something" },
        { name: "foo", content: "bar" },
        { httpEquiv: "x-ua-compatible", content: "IE=edge; chrome=1" },
      ],
    };
    const tags = buildTags(overrideProps);

    const randomTag = findTag(tags, "meta", "property", "random");
    expect(randomTag).toBeDefined();
    expect(randomTag?.props.content).toBe("something");

    const fooTag = findTag(tags, "meta", "name", "foo");
    expect(fooTag).toBeDefined();
    expect(fooTag?.props.content).toBe("bar");

    const httpEquivTag = findTag(tags, "meta", "httpEquiv", "x-ua-compatible");
    expect(httpEquivTag).toBeDefined();
    expect(httpEquivTag?.props.content).toBe("IE=edge; chrome=1");
  });

  it("uses key override to render multiple additional meta tags with the same key", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      additionalMetaTags: [
        { property: "foo", content: "Foo 1", keyOverride: "foo1" },
        { property: "foo", content: "Foo 2", keyOverride: "foo2" },
        { name: "bar", content: "Bar 1", keyOverride: "bar1" },
        { name: "bar", content: "Bar 2", keyOverride: "bar2" },
      ],
    };
    const tags = buildTags(overrideProps);

    const fooTags = findTags(tags, "meta", "property", "foo");
    expect(fooTags.length).toBe(2);
    expect(fooTags[0]?.props.content).toBe("Foo 1");
    expect(fooTags[1]?.props.content).toBe("Foo 2");

    const barTags = findTags(tags, "meta", "name", "bar");
    expect(barTags.length).toBe(2);
    expect(barTags[0]?.props.content).toBe("Bar 1");
    expect(barTags[1]?.props.content).toBe("Bar 2");
  });

  it("correctly sets noindex default", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      dangerouslySetAllPagesToNoIndex: true,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("noindex,follow");
  });

  it("correctly sets nofollow default", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      dangerouslySetAllPagesToNoFollow: true,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("index,nofollow");
  });

  it("correctly read noindex & nofollow false", () => {
    const overrideProps: BuildTagsParams = {
      ...SEO,
      noindex: false,
      nofollow: false,
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();
    expect(robotsTag?.props.content).toBe("index,follow");
  });

  it("correctly read all robots props", () => {
    const overrideProps = {
      ...SEO,
      noindex: true,
      nofollow: true,
      robotsProps: {
        nosnippet: true,
        notranslate: true,
        noimageindex: true,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: "none" as ImagePrevSize,
        maxVideoPreview: -1,
      },
    };
    const tags = buildTags(overrideProps);
    const robotsTag = findTag(tags, "meta", "name", "robots");
    expect(robotsTag).toBeDefined();

    const content = robotsTag?.props.content;
    expect(content).toContain("noindex");
    expect(content).toContain("nofollow");
    expect(content).toContain("nosnippet");
    expect(content).toContain("max-snippet:-1");
    expect(content).toContain("max-image-preview:none");
    expect(content).toContain("noarchive");
    expect(content).toContain("noimageindex");
    expect(content).toContain("max-video-preview:-1");
    expect(content).toContain("notranslate");
  });
});
