import React from 'react';
import { SiteLinksSearchBoxJsonLd } from '../../..';

function SiteLinksSearchBox() {
  return (
    <>
      <h1>Site Links Search Box</h1>
      <SiteLinksSearchBoxJsonLd
        url="https://example.com"
        potentialActions={[
          {
            target: 'https://query.example.com/search?q',
            queryInput: 'search_term_string',
          },
          {
            target:
              'android-app://com.example/https/query.example.com/search/?q',
            queryInput: 'search_term_string',
          },
        ]}
      />
    </>
  );
}

export default SiteLinksSearchBox;
