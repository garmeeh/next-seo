import React from 'react';
import { CollectionPageJsonLd } from '../../..';

function CollectionPage() {
  return (
    <>
      <h1>Collection Page</h1>
      <CollectionPageJsonLd
        name="Resistance 3: Fall of Man"
        hasPart={[
          {
            about:
              'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
            author: 'John Doe',
            name: 'Schema.org Ontology',
            datePublished: '2021-03-09',
            audience: 'Internet',
            keywords: 'schema',
            thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
            image: 'hqdefault.jpg',
          },
          {
            about: 'Shostakovich Symphony No. 7 (Leningrad)',
            author: 'John Smith',
            name: 'Creative work name',
            datePublished: '2014-10-01T19:30',
          },
        ]}
      />
    </>
  );
}

export default CollectionPage;
