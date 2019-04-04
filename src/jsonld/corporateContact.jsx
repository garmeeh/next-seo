import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';
import formatIfArray from '../utils/formatIfArray';

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
const CorporateContactJsonLd = ({ url, logo, contactPoint = [] }) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "${url}",
    ${logo ? `"logo": "${logo}",` : ''}
    "contactPoint": [${buildContactPoint(contactPoint)}]
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
  contactPoint: PropTypes.arrayOf(
    PropTypes.shape({
      telephone: PropTypes.string.isRequired,
      contactType: PropTypes.string.isRequired,
      areaServed: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      availableLanguage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
      contactOption: PropTypes.string,
    }),
  ).isRequired,
};

export default CorporateContactJsonLd;
