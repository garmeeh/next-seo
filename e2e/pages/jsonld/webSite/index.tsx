import React from 'react';
import { WebSiteJsonLd } from '../../../..';

function WebPage() {
  return (
    <>
      <h1>WebSite</h1>
      <WebSiteJsonLd
        name="Example"
        alternateName={['Example Org', 'Example Organization']}
        url="https://example.org"
        publisher={{
          id: 'https://example.org/#organization',
        }}
      />
    </>
  );
}

export default WebPage;
