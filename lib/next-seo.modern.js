import Head from 'next/head';
import React, { Component } from 'react';

const defaults = {
  templateTitle: '',
  noindex: false,
  nofollow: false,
  defaultOpenGraphImageWidth: 0,
  defaultOpenGraphImageHeight: 0,
  defaultOpenGraphVideoWidth: 0,
  defaultOpenGraphVideoHeight: 0,
};

const buildTags = config => {
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
  } else if (config.defaultTitle) {
    updatedTitle = config.defaultTitle;
  }

  if (updatedTitle) {
    tagsToRender.push(
      React.createElement(
        'title',
        {
          key: 'title',
        },
        updatedTitle,
      ),
    );
  }

  const noindex =
    config.noindex ||
    defaults.noindex ||
    config.dangerouslySetAllPagesToNoIndex;
  const nofollow =
    config.nofollow ||
    defaults.nofollow ||
    config.dangerouslySetAllPagesToNoFollow;
  let robotsParams = '';

  if (config.robotsProps) {
    const {
      nosnippet,
      maxSnippet,
      maxImagePreview,
      maxVideoPreview,
      noarchive,
      noimageindex,
      notranslate,
      unavailableAfter,
    } = config.robotsProps;
    robotsParams = `${nosnippet ? ',nosnippet' : ''}${
      maxSnippet ? `,max-snippet:${maxSnippet}` : ''
    }${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ''}${
      noarchive ? ',noarchive' : ''
    }${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ''}${
      noimageindex ? ',noimageindex' : ''
    }${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ''}${
      notranslate ? ',notranslate' : ''
    }`;
  }

  if (noindex || nofollow) {
    if (config.dangerouslySetAllPagesToNoIndex) {
      defaults.noindex = true;
    }

    if (config.dangerouslySetAllPagesToNoFollow) {
      defaults.nofollow = true;
    }

    tagsToRender.push(
      React.createElement('meta', {
        key: 'robots',
        name: 'robots',
        content: `${noindex ? 'noindex' : 'index'},${
          nofollow ? 'nofollow' : 'follow'
        }${robotsParams}`,
      }),
    );
    tagsToRender.push(
      React.createElement('meta', {
        key: 'googlebot',
        name: 'googlebot',
        content: `${noindex ? 'noindex' : 'index'},${
          nofollow ? 'nofollow' : 'follow'
        }${robotsParams}`,
      }),
    );
  } else {
    tagsToRender.push(
      React.createElement('meta', {
        key: 'robots',
        name: 'robots',
        content: `index,follow${robotsParams}`,
      }),
    );
    tagsToRender.push(
      React.createElement('meta', {
        key: 'googlebot',
        name: 'googlebot',
        content: `index,follow${robotsParams}`,
      }),
    );
  }

  if (config.description) {
    tagsToRender.push(
      React.createElement('meta', {
        key: 'description',
        name: 'description',
        content: config.description,
      }),
    );
  }

  if (config.mobileAlternate) {
    tagsToRender.push(
      React.createElement('link', {
        rel: 'alternate',
        key: 'mobileAlternate',
        media: config.mobileAlternate.media,
        href: config.mobileAlternate.href,
      }),
    );
  }

  if (config.languageAlternates && config.languageAlternates.length > 0) {
    config.languageAlternates.forEach(languageAlternate => {
      tagsToRender.push(
        React.createElement('link', {
          rel: 'alternate',
          key: `languageAlternate-${languageAlternate.hrefLang}`,
          hrefLang: languageAlternate.hrefLang,
          href: languageAlternate.href,
        }),
      );
    });
  }

  if (config.twitter) {
    if (config.twitter.cardType) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'twitter:card',
          name: 'twitter:card',
          content: config.twitter.cardType,
        }),
      );
    }

    if (config.twitter.site) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'twitter:site',
          name: 'twitter:site',
          content: config.twitter.site,
        }),
      );
    }

    if (config.twitter.handle) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'twitter:creator',
          name: 'twitter:creator',
          content: config.twitter.handle,
        }),
      );
    }
  }

  if (config.facebook) {
    if (config.facebook.appId) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'fb:app_id',
          property: 'fb:app_id',
          content: config.facebook.appId,
        }),
      );
    }
  }

  if (config.openGraph) {
    if (config.openGraph.url || config.canonical) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:url',
          property: 'og:url',
          content: config.openGraph.url || config.canonical,
        }),
      );
    }

    if (config.openGraph.type) {
      const type = config.openGraph.type.toLowerCase();
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:type',
          property: 'og:type',
          content: type,
        }),
      );

      if (type === 'profile' && config.openGraph.profile) {
        if (config.openGraph.profile.firstName) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'profile:first_name',
              property: 'profile:first_name',
              content: config.openGraph.profile.firstName,
            }),
          );
        }

        if (config.openGraph.profile.lastName) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'profile:last_name',
              property: 'profile:last_name',
              content: config.openGraph.profile.lastName,
            }),
          );
        }

        if (config.openGraph.profile.username) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'profile:username',
              property: 'profile:username',
              content: config.openGraph.profile.username,
            }),
          );
        }

        if (config.openGraph.profile.gender) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'profile:gender',
              property: 'profile:gender',
              content: config.openGraph.profile.gender,
            }),
          );
        }
      } else if (type === 'book' && config.openGraph.book) {
        if (
          config.openGraph.book.authors &&
          config.openGraph.book.authors.length
        ) {
          config.openGraph.book.authors.forEach((author, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `book:author:0${index}`,
                property: 'book:author',
                content: author,
              }),
            );
          });
        }

        if (config.openGraph.book.isbn) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'book:isbn',
              property: 'book:isbn',
              content: config.openGraph.book.isbn,
            }),
          );
        }

        if (config.openGraph.book.releaseDate) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'book:release_date',
              property: 'book:release_date',
              content: config.openGraph.book.releaseDate,
            }),
          );
        }

        if (config.openGraph.book.tags && config.openGraph.book.tags.length) {
          config.openGraph.book.tags.forEach((tag, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `book:tag:0${index}`,
                property: 'book:tag',
                content: tag,
              }),
            );
          });
        }
      } else if (type === 'article' && config.openGraph.article) {
        if (config.openGraph.article.publishedTime) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'article:published_time',
              property: 'article:published_time',
              content: config.openGraph.article.publishedTime,
            }),
          );
        }

        if (config.openGraph.article.modifiedTime) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'article:modified_time',
              property: 'article:modified_time',
              content: config.openGraph.article.modifiedTime,
            }),
          );
        }

        if (config.openGraph.article.expirationTime) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'article:expiration_time',
              property: 'article:expiration_time',
              content: config.openGraph.article.expirationTime,
            }),
          );
        }

        if (
          config.openGraph.article.authors &&
          config.openGraph.article.authors.length
        ) {
          config.openGraph.article.authors.forEach((author, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `article:author:0${index}`,
                property: 'article:author',
                content: author,
              }),
            );
          });
        }

        if (config.openGraph.article.section) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'article:section',
              property: 'article:section',
              content: config.openGraph.article.section,
            }),
          );
        }

        if (
          config.openGraph.article.tags &&
          config.openGraph.article.tags.length
        ) {
          config.openGraph.article.tags.forEach((tag, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `article:tag:0${index}`,
                property: 'article:tag',
                content: tag,
              }),
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
                React.createElement('meta', {
                  key: `video:actor:0${index}`,
                  property: 'video:actor',
                  content: actor.profile,
                }),
              );
            }

            if (actor.role) {
              tagsToRender.push(
                React.createElement('meta', {
                  key: `video:actor:role:0${index}`,
                  property: 'video:actor:role',
                  content: actor.role,
                }),
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
              React.createElement('meta', {
                key: `video:director:0${index}`,
                property: 'video:director',
                content: director,
              }),
            );
          });
        }

        if (
          config.openGraph.video.writers &&
          config.openGraph.video.writers.length
        ) {
          config.openGraph.video.writers.forEach((writer, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `video:writer:0${index}`,
                property: 'video:writer',
                content: writer,
              }),
            );
          });
        }

        if (config.openGraph.video.duration) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'video:duration',
              property: 'video:duration',
              content: config.openGraph.video.duration.toString(),
            }),
          );
        }

        if (config.openGraph.video.releaseDate) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'video:release_date',
              property: 'video:release_date',
              content: config.openGraph.video.releaseDate,
            }),
          );
        }

        if (config.openGraph.video.tags && config.openGraph.video.tags.length) {
          config.openGraph.video.tags.forEach((tag, index) => {
            tagsToRender.push(
              React.createElement('meta', {
                key: `video:tag:0${index}`,
                property: 'video:tag',
                content: tag,
              }),
            );
          });
        }

        if (config.openGraph.video.series) {
          tagsToRender.push(
            React.createElement('meta', {
              key: 'video:series',
              property: 'video:series',
              content: config.openGraph.video.series,
            }),
          );
        }
      }
    }

    if (config.openGraph.title || config.title) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:title',
          property: 'og:title',
          content: config.openGraph.title || updatedTitle,
        }),
      );
    }

    if (config.openGraph.description || config.description) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:description',
          property: 'og:description',
          content: config.openGraph.description || config.description,
        }),
      );
    } // images

    if (config.defaultOpenGraphImageWidth) {
      defaults.defaultOpenGraphImageWidth = config.defaultOpenGraphImageWidth;
    }

    if (config.defaultOpenGraphImageHeight) {
      defaults.defaultOpenGraphImageHeight = config.defaultOpenGraphImageHeight;
    }

    if (config.openGraph.images && config.openGraph.images.length) {
      config.openGraph.images.forEach((image, index) => {
        tagsToRender.push(
          React.createElement('meta', {
            key: `og:image:0${index}`,
            property: 'og:image',
            content: image.url,
          }),
        );

        if (image.alt) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:image:alt0${index}`,
              property: 'og:image:alt',
              content: image.alt,
            }),
          );
        }

        if (image.width) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:image:width0${index}`,
              property: 'og:image:width',
              content: image.width.toString(),
            }),
          );
        } else if (defaults.defaultOpenGraphImageWidth) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:image:width0${index}`,
              property: 'og:image:width',
              content: defaults.defaultOpenGraphImageWidth.toString(),
            }),
          );
        }

        if (image.height) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:image:height${index}`,
              property: 'og:image:height',
              content: image.height.toString(),
            }),
          );
        } else if (defaults.defaultOpenGraphImageHeight) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:image:height${index}`,
              property: 'og:image:height',
              content: defaults.defaultOpenGraphImageHeight.toString(),
            }),
          );
        }
      });
    } // videos

    if (config.defaultOpenGraphVideoWidth) {
      defaults.defaultOpenGraphVideoWidth = config.defaultOpenGraphVideoWidth;
    }

    if (config.defaultOpenGraphVideoHeight) {
      defaults.defaultOpenGraphVideoHeight = config.defaultOpenGraphVideoHeight;
    }

    if (config.openGraph.videos && config.openGraph.videos.length) {
      config.openGraph.videos.forEach((video, index) => {
        tagsToRender.push(
          React.createElement('meta', {
            key: `og:video:0${index}`,
            property: 'og:video',
            content: video.url,
          }),
        );

        if (video.alt) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:video:alt0${index}`,
              property: 'og:video:alt',
              content: video.alt,
            }),
          );
        }

        if (video.width) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:video:width0${index}`,
              property: 'og:video:width',
              content: video.width.toString(),
            }),
          );
        } else if (defaults.defaultOpenGraphVideoWidth) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:video:width0${index}`,
              property: 'og:video:width',
              content: defaults.defaultOpenGraphVideoWidth.toString(),
            }),
          );
        }

        if (video.height) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:video:height${index}`,
              property: 'og:video:height',
              content: video.height.toString(),
            }),
          );
        } else if (defaults.defaultOpenGraphVideoHeight) {
          tagsToRender.push(
            React.createElement('meta', {
              key: `og:video:height${index}`,
              property: 'og:video:height',
              content: defaults.defaultOpenGraphVideoHeight.toString(),
            }),
          );
        }
      });
    }

    if (config.openGraph.locale) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:locale',
          property: 'og:locale',
          content: config.openGraph.locale,
        }),
      );
    }

    if (config.openGraph.site_name) {
      tagsToRender.push(
        React.createElement('meta', {
          key: 'og:site_name',
          property: 'og:site_name',
          content: config.openGraph.site_name,
        }),
      );
    }
  }

  if (config.canonical) {
    tagsToRender.push(
      React.createElement('link', {
        rel: 'canonical',
        href: config.canonical,
        key: 'canonical',
      }),
    );
  }

  if (config.additionalMetaTags && config.additionalMetaTags.length > 0) {
    config.additionalMetaTags.forEach(tag => {
      tagsToRender.push(
        React.createElement(
          'meta',
          Object.assign(
            {
              key: tag.name || tag.property || tag.httpEquiv,
            },
            tag,
          ),
        ),
      );
    });
  }

  return tagsToRender;
};

class defaultSEO extends Component {
  render() {
    const {
      title,
      titleTemplate,
      defaultTitle,
      dangerouslySetAllPagesToNoIndex = false,
      dangerouslySetAllPagesToNoFollow = false,
      description,
      canonical,
      facebook,
      openGraph,
      additionalMetaTags,
      twitter,
      defaultOpenGraphImageWidth,
      defaultOpenGraphImageHeight,
      defaultOpenGraphVideoWidth,
      defaultOpenGraphVideoHeight,
      mobileAlternate,
      languageAlternates,
    } = this.props;
    return React.createElement(
      Head,
      null,
      buildTags({
        title,
        titleTemplate,
        defaultTitle,
        dangerouslySetAllPagesToNoIndex,
        dangerouslySetAllPagesToNoFollow,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        defaultOpenGraphImageWidth,
        defaultOpenGraphImageHeight,
        defaultOpenGraphVideoWidth,
        defaultOpenGraphVideoHeight,
        mobileAlternate,
        languageAlternates,
      }),
    );
  }
}

class nextSEO extends Component {
  render() {
    const {
      title,
      noindex = false,
      nofollow,
      robotsProps,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
      titleTemplate,
      mobileAlternate,
      languageAlternates,
    } = this.props;
    return React.createElement(
      Head,
      null,
      buildTags({
        title,
        noindex,
        nofollow,
        robotsProps,
        description,
        canonical,
        facebook,
        openGraph,
        additionalMetaTags,
        twitter,
        titleTemplate,
        mobileAlternate,
        languageAlternates,
      }),
    );
  }
}

const markup = jsonld => ({
  __html: jsonld,
});

const formatAuthorName = authorName =>
  Array.isArray(authorName)
    ? `[${authorName.map(name => `{"@type": "Person","name": "${name}"}`)}]`
    : `{"@type": "Person","name": "${authorName}"}`;

const ArticleJsonLd = ({
  keyOverride,
  url,
  title,
  images: _images = [],
  datePublished,
  dateModified: _dateModified = null,
  authorName,
  description,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${_images.map(image => `"${image}"`)}
     ],
    "datePublished": "${datePublished}",
    "dateModified": "${_dateModified || datePublished}",
    "author": ${formatAuthorName(authorName)},
    "publisher": {
      "@type": "Organization",
      "name": "${publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${description}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-article${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const BreadCrumbJsonLd = ({
  keyOverride,
  itemListElements: _itemListElements = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${_itemListElements.map(
        itemListElement => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "item": {
          "@id": "${itemListElement.item}",
          "name": "${itemListElement.name}"
        }
      }`,
      )}
     ]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-breadcrumb${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const buildQuestions$1 = mainEntity => `
  ${mainEntity.map(
    question => `{
      "@type": "Question",
      "name": "${question.questionName}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${question.acceptedAnswerText}"
      }
  }`,
  )}`;

const FAQPageJsonLd = ({ mainEntity: _mainEntity = [] }) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    "mainEntity": [${buildQuestions$1(_mainEntity)}]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: 'jsonld-faq-page',
    }),
  );
};

const buildBaseSalary = baseSalary => `
  "baseSalary": {
    "@type": "MonetaryAmount",
    ${baseSalary.currency ? `"currency": "${baseSalary.currency}",` : ''}
    "value": {
      ${
        baseSalary.value
          ? Array.isArray(baseSalary.value)
            ? `"minValue": "${baseSalary.value[0]}", "maxValue": "${baseSalary.value[1]}",`
            : `"value": "${baseSalary.value}",`
          : ''
      }
      ${baseSalary.unitText ? `"unitText": "${baseSalary.unitText}",` : ''}
      "@type": "QuantitativeValue"
    }
  },
`;

const JobPostingJsonLd = ({
  keyOverride,
  baseSalary,
  datePosted,
  description,
  employmentType,
  hiringOrganization,
  jobLocation,
  applicantLocationRequirements,
  jobLocationType,
  title,
  validThrough,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "JobPosting",
    ${baseSalary ? buildBaseSalary(baseSalary) : ''}
    "datePosted": "${datePosted}",
    "description": "${description}",
    ${employmentType ? `"employmentType": "${employmentType}",` : ''}
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${hiringOrganization.name}",
      "sameAs" : "${hiringOrganization.sameAs}"
      ${hiringOrganization.logo ? `,"logo": "${hiringOrganization.logo}"` : ''}
    },
    ${
      jobLocation
        ? `"jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${jobLocation.addressLocality}",
        "addressRegion": "${jobLocation.addressRegion}",
        "postalCode" : "${jobLocation.postalCode}",
        "streetAddress" : "${jobLocation.streetAddress}",
        "addressCountry" : "${jobLocation.addressCountry}"
          }
      },`
        : ''
    }
    ${
      applicantLocationRequirements
        ? ` "applicantLocationRequirements": {
        "@type": "Country",
        "name": "${applicantLocationRequirements}"
    },`
        : ''
    }
    ${jobLocationType ? `"jobLocationType": "${jobLocationType}",` : ''}
    ${validThrough ? `"validThrough": "${validThrough}",` : ''}
    "title": "${title}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-jobposting${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const BlogJsonLd = ({
  keyOverride,
  url,
  title,
  images: _images = [],
  datePublished,
  dateModified: _dateModified = null,
  authorName,
  description,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${_images.map(image => `"${image}"`)}
     ],
    "datePublished": "${datePublished}",
    "dateModified": "${_dateModified || datePublished}",
    "author": ${formatAuthorName(authorName)},
    "description": "${description}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-blog${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const CourseJsonLd = ({
  keyOverride,
  courseName,
  description,
  providerName,
  providerUrl,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "${courseName}",
    "description": "${description}",
    "provider": {
      "@type": "Organization",
      "name": "${providerName}"${
    providerUrl
      ? `,
      "sameAs": "${providerUrl}"`
      : ''
  }
    }
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-course${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const DatasetJsonLd = ({ description, name, license }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Dataset",
    "description": "${description}",
    "name": "${name}"${
    license
      ? `,
        "license": "${license}"`
      : ''
  }
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: 'jsonld-dataset',
    }),
  );
};

const formatIfArray$1 = value =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`)}]` : `"${value}"`;

var buildAddress = address => `
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${address.streetAddress}",
    "addressLocality": "${address.addressLocality}",
    ${
      address.addressRegion
        ? `"addressRegion": "${address.addressRegion}",`
        : ''
    }
    "postalCode": "${address.postalCode}",
    "addressCountry": "${address.addressCountry}"
  },
`;

const buildGeo = geo => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildRating = rating => `
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "${rating.ratingValue}",
    "ratingCount": "${rating.ratingCount}"
  },
`;

const buildOpeningHours = openingHours => `
  {
    "@type": "OpeningHoursSpecification",
    ${
      openingHours.dayOfWeek
        ? `"dayOfWeek": ${formatIfArray$1(openingHours.dayOfWeek)},`
        : ''
    }
    "opens": "${openingHours.opens}",
    ${openingHours.validFrom ? `"validFrom": "${openingHours.validFrom}",` : ''}
    ${
      openingHours.validThrough
        ? `"validThrough": "${openingHours.validThrough}",`
        : ''
    }
    "closes": "${openingHours.closes}"
  }
`;

const LocalBusinessJsonLd = ({
  keyOverride,
  type,
  id,
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  rating,
  priceRange,
  servesCuisine,
  sameAs,
  openingHours,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${type}",
    ${id ? `"@id": "${id}",` : ''}
    ${description ? `"description": "${description}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${telephone ? `"telephone": "${telephone}",` : ''}
    ${buildAddress(address)}
    ${geo ? `${buildGeo(geo)}` : ''}
    ${rating ? `${buildRating(rating)}` : ''}
    ${priceRange ? `"priceRange": "${priceRange}",` : ''}
    ${servesCuisine ? `"servesCuisine":${formatIfArray$1(servesCuisine)},` : ''}
    ${images ? `"image":${formatIfArray$1(images)},` : ''}
    ${sameAs ? `"sameAs": [${sameAs.map(url => `"${url}"`)}],` : ''}
    ${
      openingHours
        ? `"openingHoursSpecification": ${
            Array.isArray(openingHours)
              ? `[${openingHours.map(hours => `${buildOpeningHours(hours)}`)}]`
              : buildOpeningHours(openingHours)
          },`
        : ''
    }
    "name": "${name}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-local-business${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const LogoJsonLd = ({ keyOverride, url, logo }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${logo}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-logo${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

// TODO: Docs for offers itemCondition & availability
// TODO: Seller type, make dynamic
const buildOffers = offers => `
  {
    "@type": "Offer",
    "priceCurrency": "${offers.priceCurrency}",
    ${
      offers.priceValidUntil
        ? `"priceValidUntil": "${offers.priceValidUntil}",`
        : ''
    }
    ${offers.itemCondition ? `"itemCondition": "${offers.itemCondition}",` : ''}
    ${offers.availability ? `"availability": "${offers.availability}",` : ''}
    ${offers.url ? `"url": "${offers.url}",` : ''}
    ${
      offers.seller
        ? `
      "seller": {
      "@type": "Organization",
      "name": "${offers.seller.name}"
    },
    `
        : ''
    }
    "price": "${offers.price}"
  }
`;

const buildAggregateOffer = offer => `
  {
    "@type": "AggregateOffer",
    "priceCurrency": "${offer.priceCurrency}",
    ${offer.highPrice ? `"highPrice": "${offer.highPrice}",` : ''}
    ${offer.offerCount ? `"offerCount": "${offer.offerCount}",` : ''}
    "lowPrice": "${offer.lowPrice}"
  }
`;

const buildBrand = brand => `
  "brand": {
      "@type": "Thing",
      "name": "${brand}"
    },
`;

const buildReviewRating = rating =>
  rating
    ? `"reviewRating": {
          "@type": "Rating",
          ${rating.bestRating ? `"bestRating": "${rating.bestRating}",` : ''}
          ${rating.worstRating ? `"worstRating": "${rating.worstRating}",` : ''}
          "ratingValue": "${rating.ratingValue}"
        }`
    : '';
const buildAuthor = author => `
  "author": {
      "@type": "${author.type}",
      "name": "${author.name}"
  },
`;
const buildPublisher = publisher => `
  "publisher": {
      "@type": "${publisher.type}",
      "name": "${publisher.name}"
  },
`;
const buildReviews = reviews => `
"review": [
  ${reviews.map(
    review => `{
      "@type": "Review",
      ${review.author ? buildAuthor(review.author) : ''}
      ${review.publisher ? buildPublisher(review.publisher) : ''}
      ${
        review.datePublished
          ? `"datePublished": "${review.datePublished}",`
          : ''
      }
      ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
      ${review.name ? `"name": "${review.name}",` : ''}
      ${buildReviewRating(review.reviewRating)}
  }`,
  )}],`;
const buildAggregateRating$1 = aggregateRating => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "reviewCount": "${aggregateRating.reviewCount}"
    },
`;

const ProductJsonLd = ({
  keyOverride,
  productName,
  images: _images = [],
  description,
  sku,
  gtin8,
  gtin13,
  gtin14,
  mpn,
  brand,
  reviews: _reviews = [],
  aggregateRating,
  offers,
  aggregateOffer,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Product",
    "image":${formatIfArray$1(_images)},
    ${description ? `"description": "${description}",` : ''}
    ${mpn ? `"mpn": "${mpn}",` : ''}
    ${sku ? `"sku": "${sku}",` : ''}
    ${gtin8 ? `"gtin8": "${gtin8}",` : ''}
    ${gtin13 ? `"gtin13": "${gtin13}",` : ''}
    ${gtin14 ? `"gtin14": "${gtin14}",` : ''}
    ${brand ? buildBrand(brand) : ''}
    ${_reviews.length ? buildReviews(_reviews) : ''}
    ${aggregateRating ? buildAggregateRating$1(aggregateRating) : ''}
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    "name": "${productName}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-product${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const SocialProfileJsonLd = ({
  keyOverride,
  type,
  name,
  url,
  sameAs: _sameAs = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "${type}",
    "name": "${name}",
    "url": "${url}",
    "sameAs": [
      ${_sameAs.map(socialUrl => `"${socialUrl}"`)}
     ]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-social${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const formatIfArray = value =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`)}]` : `"${value}"`;

const buildContactPoint = contactPoint =>
  contactPoint.map(
    contact => `{
    "@type": "ContactPoint",
    "telephone": "${contact.telephone}",
    "contactType": "${contact.contactType}"${
      contact.areaServed
        ? `,
    "areaServed": ${formatIfArray(contact.areaServed)}`
        : ''
    }${
      contact.availableLanguage
        ? `,
    "availableLanguage": ${formatIfArray(contact.availableLanguage)}`
        : ''
    }${
      contact.contactOption
        ? `,
    "contactOption": "${contact.contactOption}"`
        : ''
    }
    }`,
  );

const CorporateContactJsonLd = ({ keyOverride, url, logo, contactPoint }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    ${logo ? `"logo": "${logo}",` : ''}
    "contactPoint": [${buildContactPoint(contactPoint)}]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-corporate-contact${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const NewsArticleJsonLd = ({
  keyOverride,
  url,
  title,
  images: _images = [],
  section,
  keywords,
  datePublished,
  dateCreated: _dateCreated = null,
  dateModified: _dateModified = null,
  authorName,
  description,
  body,
  publisherName,
  publisherLogo,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      ${_images.map(image => `"${image}"`)}
     ],
    "articleSection":"${section}",
    "keywords": "${keywords}",
    "datePublished": "${datePublished}",
    "dateCreated": "${_dateCreated || datePublished}",
    "dateModified": "${_dateModified || datePublished}",
    "author": ${formatAuthorName(authorName)},
    "publisher": {
      "@type": "Organization",
      "name": "${publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${publisherLogo}"
      }
    },
    "description": "${description}",
    "articleBody": "${body}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-newsarticle${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const buildLocation = location => `
  "location": {
    "@type": "Place",
    ${buildAddress(location.address)}
    ${location.sameAs ? `"sameAs": "${location.sameAs}",` : ``}
    "name": "${location.name}"
  },
`;

const buildPerformer = performer => `
  {
    "@type": "PerformingGroup",
    "name": "${performer.name}"
  }
`;

const EventJsonLd = ({
  keyOverride,
  name,
  startDate,
  endDate,
  location,
  url,
  description,
  images,
  offers,
  aggregateOffer,
  performers,
  eventType,
  eventStatus,
  eventAttendanceMode,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": ${eventType ? eventType : 'Event'},
    ${eventStatus ? `"eventStatus":"${eventStatus}",` : ``}
    ${
      eventAttendanceMode
        ? `"eventAttendanceMode":"${eventAttendanceMode}",`
        : ``
    }
    "startDate": "${startDate}",
    "endDate": "${endDate}",
    ${buildLocation(location)}
    ${images ? `"image":${formatIfArray$1(images)},` : ``}
    ${url ? `"url": "${url}",` : ``}
    ${description ? `"description": "${description}",` : ``}
    
    ${
      offers
        ? `"offers": ${
            Array.isArray(offers)
              ? `[${offers.map(offer => `${buildOffers(offer)}`)}]`
              : buildOffers(offers)
          },`
        : ''
    }
    ${
      aggregateOffer && !offers
        ? `"offers": ${buildAggregateOffer(aggregateOffer)},`
        : ''
    }
    ${
      performers
        ? `"performer": ${
            Array.isArray(performers)
              ? `[${performers.map(
                  performer => `${buildPerformer(performer)}`,
                )}]`
              : buildPerformer(performers)
          },`
        : ''
    }
    "name": "${name}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-video${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

var buildVideo = (video, context = false) => `{
      ${context ? `"@context": "https://schema.org",` : ``}
      "@type": "VideoObject",
      "name": "${video.name}",
      "description": "${video.description}",
      "thumbnailUrl": [
          ${video.thumbnailUrls
            .map(thumbnailUrl => `"${thumbnailUrl}"`)
            .join(',')}
        ],
        ${video.contentUrl ? `"contentUrl": "${video.contentUrl}",` : ``}
        ${video.duration ? `"duration": "${video.duration}",` : ``}
        ${video.embedUrl ? `"embedUrl": "${video.embedUrl}",` : ``}
        ${video.expires ? `"expires": "${video.expires}",` : ``}        
        ${
          video.hasPart
            ? `"hasPart": ${
                Array.isArray(video.hasPart)
                  ? `[${video.hasPart
                      .map(clip => `${buildClip(clip)}`)
                      .join(',')}]`
                  : buildClip(video.hasPart)
              },`
            : ''
        }
        ${
          video.watchCount
            ? `${buildInteractionStatistic(video.watchCount)}`
            : ``
        }        
        ${
          video.publication
            ? `"publication": ${
                Array.isArray(video.publication)
                  ? `[${video.publication
                      .map(
                        broadcastEvent =>
                          `${buildBroadcastEvent(broadcastEvent)}`,
                      )
                      .join(',')}]`
                  : buildBroadcastEvent(video.publication)
              },`
            : ''
        }
        ${
          video.regionsAllowed
            ? `"regionsAllowed": ${formatIfArray$1(video.regionsAllowed)},`
            : ''
        }
        "uploadDate": "${video.uploadDate}"
  }`;

const buildClip = clip => `
  "geo": {
    "@type": "Clip",
    "name": "${clip.name}",
    "startOffset": ${clip.startOffset},
    "url": "${clip.url}"
  }
`;

const buildInteractionStatistic = watchCount => `
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "https://schema.org/WatchAction" },
    "userInteractionCount": ${watchCount}
  },
`;

const buildBroadcastEvent = publication => `
  "publication": {
    "@type": "BroadcastEvent",
    "name": "${publication.name}",
    "isLiveBroadcast": ${publication.isLiveBroadcast},
    "startDate": "${publication.startDate}",
    "endDate": "${publication.endDate}"
  }
`;

const VideoJsonLd = ({
  keyOverride,
  name,
  description,
  thumbnailUrls,
  uploadDate,
  contentUrl,
  duration,
  embedUrl,
  expires,
  hasPart,
  watchCount,
  publication,
  regionsAllowed,
}) => {
  const jslonld = buildVideo(
    {
      name,
      description,
      thumbnailUrls,
      uploadDate,
      contentUrl,
      duration,
      embedUrl,
      expires,
      hasPart,
      watchCount,
      publication,
      regionsAllowed,
    },
    true,
  );
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-video${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const buildQuestions = mainEntity => `{
        "@type": "Question",
        "name": "${mainEntity.name}",
        ${mainEntity.text ? `"text": "${mainEntity.text}",` : ''}
        "answerCount": ${mainEntity.answerCount},
        ${
          mainEntity.upvotedCount
            ? `"upvoteCount": ${mainEntity.upvotedCount},`
            : ''
        }
        ${
          mainEntity.dateCreated
            ? `"dateCreated": "${mainEntity.dateCreated}",`
            : ''
        }
        ${
          mainEntity.author
            ? `"author": {
          "@type": "Person",
          "name": "${mainEntity.author.name}"
        },`
            : ''
        }
        ${
          mainEntity.acceptedAnswer
            ? `"acceptedAnswer": {
          "@type": "Answer",
          "text": "${mainEntity.acceptedAnswer.text}",
          ${
            mainEntity.acceptedAnswer.dateCreated
              ? `"dateCreated": "${mainEntity.acceptedAnswer.dateCreated}",`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.upvotedCount
              ? `"upvoteCount": ${mainEntity.acceptedAnswer.upvotedCount},`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.url
              ? `"url": "${mainEntity.acceptedAnswer.url}",`
              : ''
          }
          ${
            mainEntity.acceptedAnswer.author
              ? `"author": {
            "@type": "Person",
            "name": "${mainEntity.acceptedAnswer.author.name}"
          }`
              : ''
          }
        },`
            : ''
        }
        ${
          mainEntity.suggestedAnswer
            ? `"suggestedAnswer": [${mainEntity.suggestedAnswer.map(
                suggested => `{
            "@type": "Answer",
            "text": "${suggested.text}",
            ${
              suggested.dateCreated
                ? `"dateCreated": "${suggested.dateCreated}",`
                : ''
            }
            ${
              suggested.upvotedCount
                ? `"upvoteCount": ${suggested.upvotedCount},`
                : `"upvoteCount": ${0},`
            }
            ${suggested.url ? `"url": "${suggested.url}",` : ''}
              ${
                suggested.author
                  ? `"author": {
                        "@type": "Person",
                        "name": "${suggested.author.name}"
                    }`
                  : ''
              }
        }`,
              )}
    ]`
            : ''
        }
}`;

const QAPageJsonLd = ({ mainEntity, keyOverride }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": ${buildQuestions(mainEntity)}
    }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-qa${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const buildAggregateRating = aggregateRating => `
  "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${aggregateRating.ratingValue}",
      "ratingCount": "${aggregateRating.ratingCount}"
    },
`;
const buildInstruction = instruction => `{
  "@type": "HowToStep",
  "name": "${instruction.name}",
  "text": "${instruction.text}",
  "url": "${instruction.url}",
  "image": "${instruction.image}"
}`;

const RecipeJsonLd = ({
  name,
  description,
  authorName,
  images: _images = [],
  datePublished,
  prepTime,
  cookTime,
  totalTime,
  keywords,
  yields,
  category,
  cuisine,
  calories,
  ingredients,
  instructions,
  aggregateRating,
  video,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "${name}",
    "description": "${description}",
    "datePublished": "${datePublished}",
    "author": ${formatAuthorName(authorName)},
    "image": [
      ${_images.map(image => `"${image}"`).join(',')}
    ],
    ${prepTime ? `"prepTime": "${prepTime}",` : ``}
    ${cookTime ? `"cookTime": "${cookTime}",` : ``}
    ${totalTime ? `"totalTime": "${totalTime}",` : ``}
    ${keywords ? `"keywords": "${keywords}",` : ``}
    ${yields ? `"recipeYield": "${yields}",` : ``}
    ${category ? `"recipeCategory": "${category}",` : ``}
    ${cuisine ? `"recipeCuisine": "${cuisine}",` : ``}
    ${
      calories
        ? `"nutrition": { "@type": "NutritionInformation", "calories": "${calories} calories" },`
        : ``
    }
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${video ? `"video": ${buildVideo(video)},` : ''}
    "recipeIngredient": [
      ${ingredients.map(ingredient => `"${ingredient}"`).join(',')}
    ],
    "recipeInstructions": [
      ${instructions.map(buildInstruction).join(',')}
    ]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: 'jsonld-recipe',
    }),
  );
};

const CarouselJsonLd = ({ type, data }) => {
  let itemListElement = [];

  switch (type) {
    case 'default':
      itemListElement = data.map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "url": "${item.url}"
      }`,
      );
      break;

    case 'course':
      itemListElement = data.map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org",
          "@type": "Course",
          "url": "${item.url}",
          "name": "${item.courseName}",
          "description": "${item.description}",
          "provider": {
            "@type": "Organization",
            "name": "${item.providerName}"${
          item.providerUrl
            ? `,
                "sameAs": "${item.providerUrl}"`
            : ''
        }
          }
      }
    }`,
      );
      break;

    case 'movie':
      itemListElement = data.map(
        (item, index) => `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": "${item.name}",
          "url": "${item.url}",
          "image": "${item.image}",
          ${item.dateCreated ? `"dateCreated": "${item.dateCreated}",` : ``}
          ${
            item.director
              ? `"director": ${
                  Array.isArray(item.director)
                    ? `[${item.director
                        .map(
                          director => `{
                          "@type": "Person",
                          "name": "${director.name}"
                        }`,
                        )
                        .join(',')}]`
                    : `{
                      "@type": "Person",
                      "name": "${item.director.name}"
                    }`
                }`
              : ''
          }
          ${
            item.review
              ? `,
              "review": {
                "@type": "Review",
                ${item.review.author ? buildAuthor(item.review.author) : ''}
                ${
                  item.review.publisher
                    ? buildPublisher(item.review.publisher)
                    : ''
                }
                ${
                  item.review.datePublished
                    ? `"datePublished": "${item.review.datePublished}",`
                    : ''
                }
                ${
                  item.review.reviewBody
                    ? `"reviewBody": "${item.review.reviewBody}",`
                    : ''
                }
                ${item.review.name ? `"name": "${item.review.name}",` : ''}
                ${buildReviewRating(item.review.reviewRating)}
            }`
              : ''
          }
        }
      }`,
      );
      break;

    case 'recipe':
      itemListElement = data.map((item, index) => {
        var _item$images;

        return `{
        "@type": "ListItem",
        "position": "${index + 1}",
        "item": {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "name": "${item.name}",
          "url" : "${item.url}",
          "description": "${item.description}",
          "datePublished": "${item.datePublished}",
          "author": {
            "@type": "Person",
            "name": "${item.authorName}"
          },
          "image": [
            ${
              (_item$images = item.images) == null
                ? void 0
                : _item$images.map(image => `"${image}"`).join(',')
            }
          ],
          ${item.prepTime ? `"prepTime": "${item.prepTime}",` : ``}
          ${item.cookTime ? `"cookTime": "${item.cookTime}",` : ``}
          ${item.totalTime ? `"totalTime": "${item.totalTime}",` : ``}
          ${item.keywords ? `"keywords": "${item.keywords}",` : ``}
          ${item.yields ? `"recipeYield": "${item.yields}",` : ``}
          ${item.category ? `"recipeCategory": "${item.category}",` : ``}
          ${item.cuisine ? `"recipeCuisine": "${item.cuisine}",` : ``}
          ${
            item.calories
              ? `"nutrition": { "@type": "NutritionInformation", "calories": "${item.calories} calories" },`
              : ``
          }
          ${
            item.aggregateRating
              ? buildAggregateRating(item.aggregateRating)
              : ''
          }
          ${item.video ? `"video": ${buildVideo(item.video)},` : ''}
          "recipeIngredient": [
            ${item.ingredients.map(ingredient => `"${ingredient}"`).join(',')}
          ],
          "recipeInstructions": [
            ${item.instructions.map(buildInstruction).join(',')}
          ]
      }
      }`;
      });
      break;
  }

  const jsonld = `{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [${itemListElement.join(',')}]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jsonld),
      key: 'jsonld-course',
    }),
  );
};

const SiteLinksSearchBoxJsonLd = ({
  keyOverride,
  url,
  potentialActions: _potentialActions = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "${url}",
    "potentialAction": [
      ${_potentialActions.map(
        ({ target, queryInput }) => `{
        "@type": "SearchAction",
        "target": "${target}={${queryInput}}",
        "query-input": "required name=${queryInput}"
      }`,
      )}
     ]
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-siteLinksSearchBox${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

const buildReview = review => `
    "review": {
        "@type": "Review",
        ${review.author ? buildAuthor(review.author) : ''}
        ${review.publisher ? buildPublisher(review.publisher) : ''}
        ${
          review.datePublished
            ? `"datePublished": "${review.datePublished}",`
            : ''
        }
        ${review.reviewBody ? `"reviewBody": "${review.reviewBody}",` : ''}
        ${review.name ? `"name": "${review.name}",` : ''}
        ${buildReviewRating(review.reviewRating)}
      },
  `;

const SoftwareAppJsonLd = ({
  keyOverride,
  name,
  applicationCategory,
  operatingSystem,
  priceCurrency,
  price,
  aggregateRating,
  review,
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "${priceCurrency}",
      "price": "${price}"
    },
    ${
      applicationCategory
        ? `"applicationCategory": "${applicationCategory}",`
        : ''
    }
    ${operatingSystem ? `"operatingSystem": "${operatingSystem}",` : ''}
    ${aggregateRating ? buildAggregateRating(aggregateRating) : ''}
    ${review ? buildReview(review) : ''}
    "name": "${name}"
  }`;
  return React.createElement(
    Head,
    null,
    React.createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: markup(jslonld),
      key: `jsonld-softwareApp${keyOverride ? `-${keyOverride}` : ''}`,
    }),
  );
};

export {
  ArticleJsonLd,
  BlogJsonLd,
  BreadCrumbJsonLd as BreadcrumbJsonLd,
  CarouselJsonLd,
  CorporateContactJsonLd,
  CourseJsonLd,
  DatasetJsonLd,
  defaultSEO as DefaultSeo,
  EventJsonLd,
  FAQPageJsonLd,
  JobPostingJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  NewsArticleJsonLd,
  nextSEO as NextSeo,
  ProductJsonLd,
  QAPageJsonLd as QAPageJsonld,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
  SoftwareAppJsonLd,
  VideoJsonLd,
};
