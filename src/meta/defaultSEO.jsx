import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import buildTags from './buildTags';

class DefaultSeo extends React.Component {
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

DefaultSeo.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DefaultSeo;
