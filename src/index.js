import React, { Component } from 'react';
import Head from 'next/head';

class DefaultSeo extends Component {
  constructor(props) {
    super(props);
    if (!props.config) {
      throw new Error('[next-seo] You must supply an SEO configuration');
    }
  }

  buildTags(config) {
    const tagsToRender = [];

    if (config.title) {
      tagsToRender.push(<title key="title">{config.title}</title>);
    }

    if (!config.noindex) {
      tagsToRender.push(
        <meta key="robots" name="robots" content="index,follow" />
      );
      tagsToRender.push(
        <meta key="googlebot" name="googlebot" content="index,follow" />
      );
    } else {
      tagsToRender.push(
        <meta key="robots" name="robots" content="noindex,nofollow" />
      );
      tagsToRender.push(
        <meta key="googlebot" name="googlebot" content="noindex,nofollow" />
      );
    }

    if (config.description) {
      tagsToRender.push(
        <meta
          key="description"
          name="description"
          content={config.description}
        />
      );
    }

    if (config.hasOwnProperty('twitter')) {
      if (config.twitter.cardType) {
        tagsToRender.push(
          <meta
            key="twitter:card"
            name="twitter:card"
            content={config.twitter.cardType}
          />
        );
      }

      if (config.twitter.handle) {
        tagsToRender.push(
          <meta
            key="twitter:site"
            name="twitter:site"
            content={config.twitter.handle}
          />
        );
      }
    }

    if (config.hasOwnProperty('openGraph')) {
      if (config.openGraph.url) {
        tagsToRender.push(
          <meta key="og:url" property="og:url" content={config.openGraph.url} />
        );
      }

      if (config.openGraph.type) {
        tagsToRender.push(
          <meta
            key="og:type"
            property="og:type"
            content={config.openGraph.type}
          />
        );
      }

      if (config.openGraph.title) {
        tagsToRender.push(
          <meta
            key="og:title"
            property="og:title"
            content={config.openGraph.title}
          />
        );
      }

      if (config.openGraph.description) {
        tagsToRender.push(
          <meta
            key="og:description"
            property="og:description"
            content={config.openGraph.description}
          />
        );
      }

      if (config.openGraph.image) {
        tagsToRender.push(
          <meta
            key="og:image"
            property="og:image"
            content={config.openGraph.image}
          />
        );
      }

      if (config.openGraph.imageWidth) {
        tagsToRender.push(
          <meta
            key="og:image:width"
            property="og:image:width"
            content={config.openGraph.imageWidth}
          />
        );
      }

      if (config.openGraph.imageHeight) {
        tagsToRender.push(
          <meta
            key="og:image:height"
            property="og:image:height"
            content={config.openGraph.imageHeight}
          />
        );
      }

      if (config.openGraph.locale) {
        tagsToRender.push(
          <meta
            key="og:locale"
            property="og:locale"
            content={config.openGraph.locale}
          />
        );
      }
    }

    if (config.canonical) {
      tagsToRender.push(
        <link rel="canonical" href={config.url} key="canonical" />
      );
    }

    return tagsToRender;
  }

  render() {
    return <Head>{this.buildTags(this.props.config)}</Head>;
  }
}
export default DefaultSeo;
