import Head from 'next/head';
import React from 'react';
import buildTags from './buildTags';

class DefaultSeo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    if (!props.config) {
      throw new Error('[next-seo] You must supply an SEO configuration');
    }
  }

  render() {
    const { config } = this.props;
    return <Head>{buildTags(config)}</Head>;
  }
}

export default DefaultSeo;
