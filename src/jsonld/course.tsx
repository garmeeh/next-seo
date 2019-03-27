import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface CourseJsonLdProps {
  courseName: string;
  description: string;
  providerName: string;
  providerUrl?: string;
}

const CourseJsonLd: FC<CourseJsonLdProps> = ({
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

export default CourseJsonLd;
