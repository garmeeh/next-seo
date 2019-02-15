import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const buildContactPoints = contactPoints =>
  contactPoints.map(
    contacts => `{
    "@type": "ContactPoint",
    "telephone": "${contacts.telephone}",
    "contactType": "${contacts.contactType}"
    }`,
  );

const CorporateContactJsonLd = ({ url, logo, contactPoints = [] }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    "logo": "${logo}",
    "contactPoint": [${buildContactPoints(contactPoints)}]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-corporate-contact"
      />
    </Head>
  );
};

CorporateContactJsonLd.defaultProps = {
  logo: null,
};

CorporateContactJsonLd.propTypes = {
  logo: PropTypes.string,
  url: PropTypes.string.isRequired,
  contactPoints: PropTypes.arrayOf(
    PropTypes.shape({
      telephone: PropTypes.string,
      contactType: PropTypes.string,
    }),
  ).isRequired,
};

export default CorporateContactJsonLd;
