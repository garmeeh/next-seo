import React, { FC } from 'react';
import Head from 'next/head';

import markup from '../utils/markup';

export interface CollectionPageJsonLdProps {
  keyOverride?: string;
  name: string;
  hasPart: CreativeWork[];
}
export interface CreativeWork {
  author: string;
  about: string;
  name: string;
  datePublished: string;
  audience?: string;
  keywords?: string;
  thumbnailUrl?: string;
  image?: string;
}

const CollectionPageJsonLd: FC<CollectionPageJsonLdProps> = ({
  keyOverride,
  name,
  hasPart = [],
}) => {
  const jslonld = `{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "${name}",
    "hasPart": [
      ${hasPart.map(
        creativeWork => `{
        "@type": "CreativeWork",
        "author": "${creativeWork.author}",
        "about": "${creativeWork.about}",
        "name": "${creativeWork.name}",
        ${
          creativeWork.audience ? `"audience": "${creativeWork.audience}",` : ''
        }
        ${
          creativeWork.keywords ? `"keywords": "${creativeWork.keywords}",` : ''
        }
        ${
          creativeWork.thumbnailUrl
            ? `"thumbnailUrl": "${creativeWork.thumbnailUrl}",`
            : ''
        }
        ${creativeWork.image ? `"image": "${creativeWork.image}",` : ''}
        "datePublished": "${creativeWork.datePublished}"
      }`,
      )}
     ]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key={`jsonld-collection-page${keyOverride ? `-${keyOverride}` : ''}`}
      />
    </Head>
  );
};

export default CollectionPageJsonLd;
