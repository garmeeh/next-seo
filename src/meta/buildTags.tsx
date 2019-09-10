import React from 'react';
import { BuildTagsParams } from '../types';

const defaults = {
  templateTitle: '',
  noindex: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0,
};

const buildTags = (config: BuildTagsParams) => {
  const tagsToRender = [];

  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }

  let updatedTitle = '';
  if (config.title) {
    updatedTitle = config.title;
    if (defaults.templateTitle) {
      updatedTitle = defaults.templateTitle.replace(/%s/g, () => updatedTitle);
    }
    tagsToRender.push(<title key="title">{updatedTitle}</title>);
  }

  if (config.noindex === false) {
    tagsToRender.push(
      <meta key="robots" name="robots" content="index,follow" />,
    );
    tagsToRender.push(
      <meta key="googlebot" name="googlebot" content="index,follow" />,
    );
  } else if (
    config.noindex ||
    defaults.noindex ||
    config.dangerouslySetAllPagesToNoIndex
  ) {
    if (config.dangerouslySetAllPagesToNoIndex) {
      defaults.noindex = true;
    }
    tagsToRender.push(
      <meta key="robots" name="robots" content="noindex,nofollow" />,
    );
    tagsToRender.push(
      <meta key="googlebot" name="googlebot" content="noindex,nofollow" />,
    );
  } else {
    tagsToRender.push(
      <meta key="robots" name="robots" content="index,follow" />,
    );
    tagsToRender.push(
      <meta key="googlebot" name="googlebot" content="index,follow" />,
    );
  }

  if (config.description) {
    tagsToRender.push(
      <meta
        key="description"
        name="description"
        content={config.description}
      />,
    );
  }

  if (config.mobileAlternate) {
    tagsToRender.push(
      <link
        rel="alternate"
        key="mobileAlternate"
        media={config.mobileAlternate.media}
        href={config.mobileAlternate.href}
      />,
    );
  }

  if (config.languageAlternate) {
    tagsToRender.push(
      <link
        rel="alternate"
        key="languageAlternate"
        hrefLang={config.languageAlternate.hrefLang}
        href={config.languageAlternate.href}
      />,
    );
  }

  if (config.twitter) {
    if (config.twitter.cardType) {
      tagsToRender.push(
        <meta
          key="twitter:card"
          name="twitter:card"
          content={config.twitter.cardType}
        />,
      );
    }

    if (config.twitter.site) {
      tagsToRender.push(
        <meta
          key="twitter:site"
          name="twitter:site"
          content={config.twitter.site}
        />,
      );
    }

    if (config.twitter.handle) {
      tagsToRender.push(
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={config.twitter.handle}
        />,
      );
    }
  }

  if (config.facebook) {
    if (config.facebook.appId) {
      tagsToRender.push(
        <meta
          key="fb:app_id"
          property="fb:app_id"
          content={config.facebook.appId}
        />,
      );
    }
  }

  if (config.openGraph) {
    if (config.openGraph.url || config.canonical) {
      tagsToRender.push(
        <meta
          key="og:url"
          property="og:url"
          content={config.openGraph.url || config.canonical}
        />,
      );
    }

    if (config.openGraph.type) {
      const type = config.openGraph.type.toLowerCase();

      tagsToRender.push(
        <meta key="og:type" property="og:type" content={type} />,
      );

      if (type === 'profile' && config.openGraph.profile) {
        if (config.openGraph.profile.firstName) {
          tagsToRender.push(
            <meta
              key="profile:first_name"
              property="profile:first_name"
              content={config.openGraph.profile.firstName}
            />,
          );
        }

        if (config.openGraph.profile.lastName) {
          tagsToRender.push(
            <meta
              key="profile:last_name"
              property="profile:last_name"
              content={config.openGraph.profile.lastName}
            />,
          );
        }

        if (config.openGraph.profile.username) {
          tagsToRender.push(
            <meta
              key="profile:username"
              property="profile:username"
              content={config.openGraph.profile.username}
            />,
          );
        }

        if (config.openGraph.profile.gender) {
          tagsToRender.push(
            <meta
              key="profile:gender"
              property="profile:gender"
              content={config.openGraph.profile.gender}
            />,
          );
        }
      } else if (type === 'book' && config.openGraph.book) {
        if (
          config.openGraph.book.authors &&
          config.openGraph.book.authors.length
        ) {
          config.openGraph.book.authors.forEach((author, index) => {
            tagsToRender.push(
              <meta
                key={`book:author:0${index}`}
                property="book:author"
                content={author}
              />,
            );
          });
        }

        if (config.openGraph.book.isbn) {
          tagsToRender.push(
            <meta
              key="book:isbn"
              property="book:isbn"
              content={config.openGraph.book.isbn}
            />,
          );
        }

        if (config.openGraph.book.releaseDate) {
          tagsToRender.push(
            <meta
              key="book:release_date"
              property="book:release_date"
              content={config.openGraph.book.releaseDate}
            />,
          );
        }

        if (config.openGraph.book.tags && config.openGraph.book.tags.length) {
          config.openGraph.book.tags.forEach((tag, index) => {
            tagsToRender.push(
              <meta
                key={`book:tag:0${index}`}
                property="book:tag"
                content={tag}
              />,
            );
          });
        }
      } else if (type === 'article' && config.openGraph.article) {
        if (config.openGraph.article.publishedTime) {
          tagsToRender.push(
            <meta
              key="article:published_time"
              property="article:published_time"
              content={config.openGraph.article.publishedTime}
            />,
          );
        }

        if (config.openGraph.article.modifiedTime) {
          tagsToRender.push(
            <meta
              key="article:modified_time"
              property="article:modified_time"
              content={config.openGraph.article.modifiedTime}
            />,
          );
        }

        if (config.openGraph.article.expirationTime) {
          tagsToRender.push(
            <meta
              key="article:expiration_time"
              property="article:expiration_time"
              content={config.openGraph.article.expirationTime}
            />,
          );
        }

        if (
          config.openGraph.article.authors &&
          config.openGraph.article.authors.length
        ) {
          config.openGraph.article.authors.forEach((author, index) => {
            tagsToRender.push(
              <meta
                key={`article:author:0${index}`}
                property="article:author"
                content={author}
              />,
            );
          });
        }

        if (config.openGraph.article.section) {
          tagsToRender.push(
            <meta
              key="article:section"
              property="article:section"
              content={config.openGraph.article.section}
            />,
          );
        }

        if (
          config.openGraph.article.tags &&
          config.openGraph.article.tags.length
        ) {
          config.openGraph.article.tags.forEach((tag, index) => {
            tagsToRender.push(
              <meta
                key={`article:tag:0${index}`}
                property="article:tag"
                content={tag}
              />,
            );
          });
        }
      } else if (
        (type === 'video.movie' ||
          type === 'video.episode' ||
          type === 'video.tv_show' ||
          type === 'video.other') &&
        config.openGraph.video
      ) {
        if (
          config.openGraph.video.actors &&
          config.openGraph.video.actors.length
        ) {
          config.openGraph.video.actors.forEach((actor, index) => {
            if (actor.profile) {
              tagsToRender.push(
                <meta
                  key={`video:actor:0${index}`}
                  property="video:actor"
                  content={actor.profile}
                />,
              );
            }

            if (actor.role) {
              tagsToRender.push(
                <meta
                  key={`video:actor:role:0${index}`}
                  property="video:actor:role"
                  content={actor.role}
                />,
              );
            }
          });
        }

        if (
          config.openGraph.video.directors &&
          config.openGraph.video.directors.length
        ) {
          config.openGraph.video.directors.forEach((director, index) => {
            tagsToRender.push(
              <meta
                key={`video:director:0${index}`}
                property="video:director"
                content={director}
              />,
            );
          });
        }

        if (
          config.openGraph.video.writers &&
          config.openGraph.video.writers.length
        ) {
          config.openGraph.video.writers.forEach((writer, index) => {
            tagsToRender.push(
              <meta
                key={`video:writer:0${index}`}
                property="video:writer"
                content={writer}
              />,
            );
          });
        }

        if (config.openGraph.video.duration) {
          tagsToRender.push(
            <meta
              key="video:duration"
              property="video:duration"
              content={config.openGraph.video.duration.toString()}
            />,
          );
        }

        if (config.openGraph.video.releaseDate) {
          tagsToRender.push(
            <meta
              key="video:release_date"
              property="video:release_date"
              content={config.openGraph.video.releaseDate}
            />,
          );
        }

        if (config.openGraph.video.tags && config.openGraph.video.tags.length) {
          config.openGraph.video.tags.forEach((tag, index) => {
            tagsToRender.push(
              <meta
                key={`video:tag:0${index}`}
                property="video:tag"
                content={tag}
              />,
            );
          });
        }

        if (config.openGraph.video.series) {
          tagsToRender.push(
            <meta
              key="video:series"
              property="video:series"
              content={config.openGraph.video.series}
            />,
          );
        }
      }
    }

    if (config.openGraph.title || config.title) {
      tagsToRender.push(
        <meta
          key="og:title"
          property="og:title"
          content={config.openGraph.title || updatedTitle}
        />,
      );
    }

    if (config.openGraph.description || config.description) {
      tagsToRender.push(
        <meta
          key="og:description"
          property="og:description"
          content={config.openGraph.description || config.description}
        />,
      );
    }

    // images
    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }

    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }

    if (config.openGraph.images && config.openGraph.images.length) {
      config.openGraph.images.forEach((image, index) => {
        tagsToRender.push(
          <meta
            key={`og:image:0${index}`}
            property="og:image"
            content={image.url}
          />,
        );

        if (image.alt) {
          tagsToRender.push(
            <meta
              key={`og:image:alt0${index}`}
              property="og:image:alt"
              content={image.alt}
            />,
          );
        }

        if (image.width) {
          tagsToRender.push(
            <meta
              key={`og:image:width0${index}`}
              property="og:image:width"
              content={image.width.toString()}
            />,
          );
        } else if (defaults.defaultOpenGraphImageWidth) {
          tagsToRender.push(
            <meta
              key={`og:image:width0${index}`}
              property="og:image:width"
              content={defaults.defaultOpenGraphImageWidth.toString()}
            />,
          );
        }

        if (image.height) {
          tagsToRender.push(
            <meta
              key={`og:image:height${index}`}
              property="og:image:height"
              content={image.height.toString()}
            />,
          );
        } else if (defaults.defaultOpenGraphImageHeight) {
          tagsToRender.push(
            <meta
              key={`og:image:height${index}`}
              property="og:image:height"
              content={defaults.defaultOpenGraphImageHeight.toString()}
            />,
          );
        }
      });
    }

    // videos
    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }

    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }

    if (config.openGraph.videos && config.openGraph.videos.length) {
      config.openGraph.videos.forEach((video, index) => {
        tagsToRender.push(
          <meta
            key={`og:video:0${index}`}
            property="og:video"
            content={video.url}
          />,
        );

        if (video.alt) {
          tagsToRender.push(
            <meta
              key={`og:video:alt0${index}`}
              property="og:video:alt"
              content={video.alt}
            />,
          );
        }

        if (video.width) {
          tagsToRender.push(
            <meta
              key={`og:video:width0${index}`}
              property="og:video:width"
              content={video.width.toString()}
            />,
          );
        } else if (defaults.defaultOpenGraphVideoWidth) {
          tagsToRender.push(
            <meta
              key={`og:video:width0${index}`}
              property="og:video:width"
              content={defaults.defaultOpenGraphVideoWidth.toString()}
            />,
          );
        }

        if (video.height) {
          tagsToRender.push(
            <meta
              key={`og:video:height${index}`}
              property="og:video:height"
              content={video.height.toString()}
            />,
          );
        } else if (defaults.defaultOpenGraphVideoHeight) {
          tagsToRender.push(
            <meta
              key={`og:video:height${index}`}
              property="og:video:height"
              content={defaults.defaultOpenGraphVideoHeight.toString()}
            />,
          );
        }
      });
    }

    if (config.openGraph.locale) {
      tagsToRender.push(
        <meta
          key="og:locale"
          property="og:locale"
          content={config.openGraph.locale}
        />,
      );
    }

    if (config.openGraph.site_name) {
      tagsToRender.push(
        <meta
          key="og:site_name"
          property="og:site_name"
          content={config.openGraph.site_name}
        />,
      );
    }
  }

  if (config.canonical) {
    tagsToRender.push(
      <link rel="canonical" href={config.canonical} key="canonical" />,
    );
  }

  if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
    config.additionalMetaTags.forEach(tag => {
      tagsToRender.push(
        <meta key={tag.name ? tag.name : tag.property} {...tag} />,
      );
    });
  }

  return tagsToRender;
};

export default buildTags;
