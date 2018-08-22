import React from 'react';

const buildTags = (config) => {
  const tagsToRender = [];

  if (config.title) {
    tagsToRender.push(<title key="title">{config.title}</title>);
  }

  if (!config.noindex) {
    tagsToRender.push(<meta key="robots" name="robots" content="index,follow" />);
    tagsToRender.push(<meta key="googlebot" name="googlebot" content="index,follow" />);
  } else {
    tagsToRender.push(<meta key="robots" name="robots" content="noindex,nofollow" />);
    tagsToRender.push(<meta key="googlebot" name="googlebot" content="noindex,nofollow" />);
  }

  if (config.description) {
    tagsToRender.push(<meta key="description" name="description" content={config.description} />);
  }

  if (config.hasOwnProperty('twitter')) {
    if (config.twitter.cardType) {
      tagsToRender.push(
        <meta key="twitter:card" name="twitter:card" content={config.twitter.cardType} />,
      );
    }

    if (config.twitter.site) {
      tagsToRender.push(
        <meta key="twitter:site" name="twitter:site" content={config.twitter.site} />,
      );
    }

    if (config.twitter.handle) {
      tagsToRender.push(
        <meta key="twitter:creator" name="twitter:creator" content={config.twitter.handle} />,
      );
    }
  }

  if (config.hasOwnProperty('openGraph')) {
    if (config.openGraph.url) {
      tagsToRender.push(<meta key="og:url" property="og:url" content={config.openGraph.url} />);
    }

    if (config.openGraph.type) {
      tagsToRender.push(<meta key="og:type" property="og:type" content={config.openGraph.type} />);
    }

    if (config.openGraph.title) {
      tagsToRender.push(
        <meta key="og:title" property="og:title" content={config.openGraph.title} />,
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
          <meta key={`og:image:0${index}`} property="og:image" content={image.url} />,
        );

        if (image.alt) {
          tagsToRender.push(
            <meta key={`og:image:alt0${index}`} property="og:image:alt" content={image.alt} />,
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
        } else if (config.openGraph.defaultImageWidth) {
          tagsToRender.push(
            <meta
              key={`og:image:width0${index}`}
              property="og:image:width"
              content={config.openGraph.defaultImageWidth}
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
        } else if (config.openGraph.defaultImageHeight) {
          tagsToRender.push(
            <meta
              key={`og:image:height${index}`}
              property="og:image:height"
              content={config.openGraph.defaultImageHeight}
            />,
          );
        }
      });
    }

    if (config.openGraph.locale) {
      tagsToRender.push(
        <meta key="og:locale" property="og:locale" content={config.openGraph.locale} />,
      );
    }
  }

  if (config.canonical) {
    tagsToRender.push(<link rel="canonical" href={config.canonical} key="canonical" />);
  }

  return tagsToRender;
};

export default buildTags;
