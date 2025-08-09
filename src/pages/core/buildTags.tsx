import { ReactNode } from "react";
import type { BuildTagsParams } from "../types";
import {
  processOpenGraphMedia,
  buildRobotsContent,
  processTitle,
} from "../utils/processors";

// Store defaults for the session
const defaults = {
  templateTitle: "",
  noindex: false,
  nofollow: false,
  norobots: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0,
};

// Test-only function to reset defaults between tests
export function __resetDefaults() {
  Object.assign(defaults, {
    templateTitle: "",
    noindex: false,
    nofollow: false,
    norobots: false,
    defaultOpenGraphImageWidth: 0,
    defaultOpenGraphImageHeight: 0,
    defaultOpenGraphVideoWidth: 0,
    defaultOpenGraphVideoHeight: 0,
  });
}

/**
 * Build title tag
 */
function buildTitleTag(config: BuildTagsParams): ReactNode | null {
  // Handle title template defaults
  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }

  const title = processTitle(
    config.title,
    config.defaultTitle,
    defaults.templateTitle,
  );

  if (!title) return null;

  return <title key="title">{title}</title>;
}

/**
 * Build robots meta tag
 */
function buildRobotsTag(config: BuildTagsParams): ReactNode | null {
  // Handle dangerous defaults
  if (config.dangerouslySetAllPagesToNoIndex) {
    defaults.noindex = true;
  }
  if (config.dangerouslySetAllPagesToNoFollow) {
    defaults.nofollow = true;
  }
  if (config.norobots) {
    defaults.norobots = true;
  }

  const noindex =
    config.noindex !== undefined ? config.noindex : defaults.noindex;
  const nofollow =
    config.nofollow !== undefined ? config.nofollow : defaults.nofollow;

  // Skip robots tag if norobots is set and no additional props
  if (defaults.norobots && !config.robotsProps && !noindex && !nofollow) {
    return null;
  }

  const content = buildRobotsContent(noindex, nofollow, config.robotsProps);

  return <meta key="robots" name="robots" content={content} />;
}

/**
 * Build basic meta tags (description, theme-color)
 */
function buildBasicMetaTags(config: BuildTagsParams): ReactNode[] {
  const tags: ReactNode[] = [];

  if (config.description) {
    tags.push(
      <meta
        key="description"
        name="description"
        content={config.description}
      />,
    );
  }

  if (config.themeColor) {
    tags.push(
      <meta key="theme-color" name="theme-color" content={config.themeColor} />,
    );
  }

  return tags;
}

/**
 * Build alternate link tags (mobile, language)
 */
function buildAlternateTags(config: BuildTagsParams): ReactNode[] {
  const tags: ReactNode[] = [];

  if (config.mobileAlternate) {
    tags.push(
      <link
        key="mobileAlternate"
        rel="alternate"
        media={config.mobileAlternate.media}
        href={config.mobileAlternate.href}
      />,
    );
  }

  if (config.languageAlternates?.length) {
    config.languageAlternates.forEach((alt) => {
      tags.push(
        <link
          key={`languageAlternate-${alt.hrefLang}`}
          rel="alternate"
          hrefLang={alt.hrefLang}
          href={alt.href}
        />,
      );
    });
  }

  return tags;
}

/**
 * Build Twitter card tags
 */
function buildTwitterTags(config: BuildTagsParams): ReactNode[] {
  const tags: ReactNode[] = [];

  if (!config.twitter) return tags;

  if (config.twitter.cardType) {
    tags.push(
      <meta
        key="twitter:card"
        name="twitter:card"
        content={config.twitter.cardType}
      />,
    );
  }

  if (config.twitter.site) {
    tags.push(
      <meta
        key="twitter:site"
        name="twitter:site"
        content={config.twitter.site}
      />,
    );
  }

  if (config.twitter.handle) {
    tags.push(
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={config.twitter.handle}
      />,
    );
  }

  return tags;
}

/**
 * Build Facebook app ID tag
 */
function buildFacebookTag(config: BuildTagsParams): ReactNode | null {
  if (!config.facebook?.appId) return null;

  return (
    <meta
      key="fb:app_id"
      property="fb:app_id"
      content={config.facebook.appId}
    />
  );
}

/**
 * Build OpenGraph tags
 */
function buildOpenGraphTags(config: BuildTagsParams): ReactNode[] {
  const tags: ReactNode[] = [];
  const og = config.openGraph;

  // Generate basic og tags if we have title or description, even without explicit openGraph config
  const hasBasicContent =
    config.title || config.defaultTitle || config.description;

  if (!og && !hasBasicContent) return tags;

  // Title (use og title or fall back to page title/defaultTitle)
  const ogTitle =
    og?.title ||
    processTitle(config.title, config.defaultTitle, defaults.templateTitle);
  if (ogTitle) {
    tags.push(<meta key="og:title" property="og:title" content={ogTitle} />);
  }

  // Description (use og description or fall back to page description)
  const ogDescription = og?.description || config.description;
  if (ogDescription) {
    tags.push(
      <meta
        key="og:description"
        property="og:description"
        content={ogDescription}
      />,
    );
  }

  if (!og) return tags;

  // URL
  if (og.url || config.canonical) {
    tags.push(
      <meta
        key="og:url"
        property="og:url"
        content={og.url || config.canonical || ""}
      />,
    );
  }

  // Type and type-specific properties
  if (og.type) {
    const type = og.type.toLowerCase();
    tags.push(<meta key="og:type" property="og:type" content={type} />);

    // Type-specific properties
    tags.push(...buildOpenGraphTypeSpecificTags(type, og));
  }

  // Images
  if (og.images?.length) {
    // Handle default dimensions
    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }
    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }

    const imageTags = processOpenGraphMedia("image", og.images, {
      width: defaults.defaultOpenGraphImageWidth,
      height: defaults.defaultOpenGraphImageHeight,
    });

    imageTags.forEach((tag, i) => {
      tags.push(
        <meta
          key={`og:image:${i}`}
          property={tag.property}
          content={tag.content}
        />,
      );
    });
  }

  // Videos
  if (og.videos?.length) {
    // Handle default dimensions
    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }
    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }

    const videoTags = processOpenGraphMedia("video", og.videos, {
      width: defaults.defaultOpenGraphVideoWidth,
      height: defaults.defaultOpenGraphVideoHeight,
    });

    videoTags.forEach((tag, i) => {
      tags.push(
        <meta
          key={`og:video:${i}`}
          property={tag.property}
          content={tag.content}
        />,
      );
    });
  }

  // Audio
  if (og.audio?.length) {
    const audioTags = processOpenGraphMedia("audio", og.audio);
    audioTags.forEach((tag, i) => {
      tags.push(
        <meta
          key={`og:audio:${i}`}
          property={tag.property}
          content={tag.content}
        />,
      );
    });
  }

  // Locale
  if (og.locale) {
    tags.push(
      <meta key="og:locale" property="og:locale" content={og.locale} />,
    );
  }

  // Site name (handle deprecated site_name)
  const siteName = og.siteName || og.site_name;
  if (siteName) {
    tags.push(
      <meta key="og:site_name" property="og:site_name" content={siteName} />,
    );
  }

  return tags;
}

/**
 * Build OpenGraph type-specific tags
 */
function buildOpenGraphTypeSpecificTags(
  type: string,
  og: BuildTagsParams["openGraph"],
): ReactNode[] {
  const tags: ReactNode[] = [];

  if (!og) return tags;

  switch (type) {
    case "profile":
      if (og.profile) {
        if (og.profile.firstName) {
          tags.push(
            <meta
              key="profile:first_name"
              property="profile:first_name"
              content={og.profile.firstName}
            />,
          );
        }
        if (og.profile.lastName) {
          tags.push(
            <meta
              key="profile:last_name"
              property="profile:last_name"
              content={og.profile.lastName}
            />,
          );
        }
        if (og.profile.username) {
          tags.push(
            <meta
              key="profile:username"
              property="profile:username"
              content={og.profile.username}
            />,
          );
        }
        if (og.profile.gender) {
          tags.push(
            <meta
              key="profile:gender"
              property="profile:gender"
              content={og.profile.gender}
            />,
          );
        }
      }
      break;

    case "book":
      if (og.book) {
        if (og.book.authors?.length) {
          og.book.authors.forEach((author, i) => {
            tags.push(
              <meta
                key={`book:author:${i}`}
                property="book:author"
                content={author}
              />,
            );
          });
        }
        if (og.book.isbn) {
          tags.push(
            <meta
              key="book:isbn"
              property="book:isbn"
              content={og.book.isbn}
            />,
          );
        }
        if (og.book.releaseDate) {
          tags.push(
            <meta
              key="book:release_date"
              property="book:release_date"
              content={og.book.releaseDate}
            />,
          );
        }
        if (og.book.tags?.length) {
          og.book.tags.forEach((tag, i) => {
            tags.push(
              <meta key={`book:tag:${i}`} property="book:tag" content={tag} />,
            );
          });
        }
      }
      break;

    case "article":
      if (og.article) {
        if (og.article.publishedTime) {
          tags.push(
            <meta
              key="article:published_time"
              property="article:published_time"
              content={og.article.publishedTime}
            />,
          );
        }
        if (og.article.modifiedTime) {
          tags.push(
            <meta
              key="article:modified_time"
              property="article:modified_time"
              content={og.article.modifiedTime}
            />,
          );
        }
        if (og.article.expirationTime) {
          tags.push(
            <meta
              key="article:expiration_time"
              property="article:expiration_time"
              content={og.article.expirationTime}
            />,
          );
        }
        if (og.article.authors?.length) {
          og.article.authors.forEach((author, i) => {
            tags.push(
              <meta
                key={`article:author:${i}`}
                property="article:author"
                content={author}
              />,
            );
          });
        }
        if (og.article.section) {
          tags.push(
            <meta
              key="article:section"
              property="article:section"
              content={og.article.section}
            />,
          );
        }
        if (og.article.tags?.length) {
          og.article.tags.forEach((tag, i) => {
            tags.push(
              <meta
                key={`article:tag:${i}`}
                property="article:tag"
                content={tag}
              />,
            );
          });
        }
      }
      break;

    case "video.movie":
    case "video.episode":
    case "video.tv_show":
    case "video.other":
      if (og.video) {
        if (og.video.actors?.length) {
          og.video.actors.forEach((actor, i) => {
            if (actor.profile) {
              tags.push(
                <meta
                  key={`video:actor:${i}`}
                  property="video:actor"
                  content={actor.profile}
                />,
              );
            }
            if (actor.role) {
              tags.push(
                <meta
                  key={`video:actor:role:${i}`}
                  property="video:actor:role"
                  content={actor.role}
                />,
              );
            }
          });
        }
        if (og.video.directors?.length) {
          og.video.directors.forEach((director, i) => {
            tags.push(
              <meta
                key={`video:director:${i}`}
                property="video:director"
                content={director}
              />,
            );
          });
        }
        if (og.video.writers?.length) {
          og.video.writers.forEach((writer, i) => {
            tags.push(
              <meta
                key={`video:writer:${i}`}
                property="video:writer"
                content={writer}
              />,
            );
          });
        }
        if (og.video.duration) {
          tags.push(
            <meta
              key="video:duration"
              property="video:duration"
              content={og.video.duration.toString()}
            />,
          );
        }
        if (og.video.releaseDate) {
          tags.push(
            <meta
              key="video:release_date"
              property="video:release_date"
              content={og.video.releaseDate}
            />,
          );
        }
        if (og.video.tags?.length) {
          og.video.tags.forEach((tag, i) => {
            tags.push(
              <meta
                key={`video:tag:${i}`}
                property="video:tag"
                content={tag}
              />,
            );
          });
        }
        if (og.video.series) {
          tags.push(
            <meta
              key="video:series"
              property="video:series"
              content={og.video.series}
            />,
          );
        }
      }
      break;
  }

  return tags;
}

/**
 * Build canonical link tag
 */
function buildCanonicalTag(config: BuildTagsParams): ReactNode | null {
  if (!config.canonical) return null;

  return <link key="canonical" rel="canonical" href={config.canonical} />;
}

/**
 * Build additional meta tags
 */
function buildAdditionalMetaTags(config: BuildTagsParams): ReactNode[] {
  if (!config.additionalMetaTags?.length) return [];

  return config.additionalMetaTags.map(({ keyOverride, ...tag }) => {
    const key = keyOverride || tag.name || tag.property || tag.httpEquiv || "";
    return <meta key={`meta:${key}`} {...tag} />;
  });
}

/**
 * Build additional link tags
 */
function buildAdditionalLinkTags(config: BuildTagsParams): ReactNode[] {
  if (!config.additionalLinkTags?.length) return [];

  return config.additionalLinkTags.map((tag) => {
    const { crossOrigin: tagCrossOrigin, keyOverride, ...rest } = tag;

    // Validate crossOrigin value
    const crossOrigin: "anonymous" | "use-credentials" | "" | undefined =
      tagCrossOrigin === "anonymous" ||
      tagCrossOrigin === "use-credentials" ||
      tagCrossOrigin === ""
        ? tagCrossOrigin
        : undefined;

    const key = keyOverride || `${rest.href}${rest.rel}`;

    return <link key={`link:${key}`} {...rest} crossOrigin={crossOrigin} />;
  });
}

/**
 * Main function to build all SEO tags
 */
export default function buildTags(config: BuildTagsParams): ReactNode[] {
  const tags: ReactNode[] = [];

  // Title
  const titleTag = buildTitleTag(config);
  if (titleTag) tags.push(titleTag);

  // Robots
  const robotsTag = buildRobotsTag(config);
  if (robotsTag) tags.push(robotsTag);

  // Basic meta tags
  tags.push(...buildBasicMetaTags(config));

  // Alternate links
  tags.push(...buildAlternateTags(config));

  // Twitter
  tags.push(...buildTwitterTags(config));

  // Facebook
  const fbTag = buildFacebookTag(config);
  if (fbTag) tags.push(fbTag);

  // OpenGraph
  tags.push(...buildOpenGraphTags(config));

  // Canonical
  const canonicalTag = buildCanonicalTag(config);
  if (canonicalTag) tags.push(canonicalTag);

  // Additional meta tags
  tags.push(...buildAdditionalMetaTags(config));

  // Additional link tags
  tags.push(...buildAdditionalLinkTags(config));

  return tags;
}
