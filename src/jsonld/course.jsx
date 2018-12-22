import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import markup from '../utils/markup';

const CourseJsonLd = ({
  courseName,
  description,
  providerName,
  providerUrl,
}) => {
  const jslonld = `{
    "@context": "http://schema.org",
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

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-course"
      />
    </Head>
  );
};

CourseJsonLd.defaultProps = {
  providerUrl: null,
};

CourseJsonLd.propTypes = {
  courseName: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired,
  providerUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default CourseJsonLd;
