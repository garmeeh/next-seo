import React from 'react';

const defaults = {
  templateTitle: null,
  noindex: false,
  openGraph: {
    defaultImageHeight: null,
    defaultImageWidth: null,
  },
};

const buildTags = config => {
  const tagsToRender = [];

  if (config.titleTemplate) {
    defaults.templateTitle = config.titleTemplate;
  }

  if (config.title) {
    let updatedTitle = config.title;
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

  if (config.hasOwnProperty('twitter')) {
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

  if (config.hasOwnProperty('facebook')) {
    if (config.facebook.appId) {
      tagsToRender.push(
        <meta
          key="fb:app_id"
          name="fb:app_id"
          content={config.facebook.appId}
        />,
      );
    }
  }

  if (config.hasOwnProperty('openGraph')) {
    if (config.openGraph.url) {
      tagsToRender.push(
        <meta key="og:url" property="og:url" content={config.openGraph.url} />,
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
      }
    }

    if (config.openGraph.title) {
      tagsToRender.push(
        <meta
          key="og:title"
          property="og:title"
          content={config.openGraph.title}
        />,
      );
    }

    if (config.openGraph.description) {
      tagsToRender.push(
        <meta
          key="og:description"
          property="og:description"
          content={config.openGraph.description}
        />,
      );
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
              content={image.width}
            />,
          );
        } else if (
          defaults.openGraph.defaultImageWidth ||
          config.openGraph.defaultImageWidth
        ) {
          if (config.openGraph.defaultImageWidth) {
            defaults.openGraph.defaultImageWidth =
              config.openGraph.defaultImageWidth;
          }
          tagsToRender.push(
            <meta
              key={`og:image:width0${index}`}
              property="og:image:width"
              content={defaults.openGraph.defaultImageWidth}
            />,
          );
        }

        if (image.height) {
          tagsToRender.push(
            <meta
              key={`og:image:height${index}`}
              property="og:image:height"
              content={image.height}
            />,
          );
        } else if (
          defaults.openGraph.defaultImageHeight ||
          config.openGraph.defaultImageHeight
        ) {
          if (config.openGraph.defaultImageHeight) {
            defaults.openGraph.defaultImageHeight =
              config.openGraph.defaultImageHeight;
          }
          tagsToRender.push(
            <meta
              key={`og:image:height${index}`}
              property="og:image:height"
              content={defaults.openGraph.defaultImageHeight}
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

  return tagsToRender;
};

export default buildTags;
