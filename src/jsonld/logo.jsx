import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const LogoJsonLd = ({ url, logo }) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${logo}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-logo"
      />
    </Head>
  );
};

LogoJsonLd.propTypes = {
  url: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default LogoJsonLd;
