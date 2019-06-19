import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const buildImages = images =>
  images.length ? `"image": [${images.map(image => `"${image}"`)}],` : '';

const buildGeo = geo => `
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "${geo.latitude}",
    "longitude": "${geo.longitude}"
  },
`;

const buildAddress = address => `
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

const LocalBusinessJsonLd = ({
  type,
  id,
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "@id": "${id}",
    ${description ? `"description": "${description}",` : ''}
    ${url ? `"url": "${url}",` : ''}
    ${telephone ? `"telephone": "${telephone}",` : ''}
    ${buildAddress(address)}
    ${geo ? `${buildGeo(geo)}` : ''}
    ${buildImages(images)}
    "name": "${name}"
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-local-business"
      />
    </Head>
  );
};

LocalBusinessJsonLd.defaultProps = {
  type: 'LocalBusiness',
  description: null,
  url: null,
  telephone: null,
  images: [],
  geo: null,
};

LocalBusinessJsonLd.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  telephone: PropTypes.string,
  address: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
    addressLocality: PropTypes.string.isRequired,
    addressRegion: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    addressCountry: PropTypes.string.isRequired,
  }).isRequired,
  geo: PropTypes.shape({
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
  }),
  images: PropTypes.arrayOf(PropTypes.string),
};

export default LocalBusinessJsonLd;
