import React from 'react';
import { WebPageJsonLd } from '../../..';

function WebPage() {
  return (
    <>
      <h1>Social Profile</h1>
      <WebPageJsonLd
        id="https://www.purpule-fox.io/#info"
        description="This is a description."
        lastReviewed="2021-05-26T05:59:02.085Z"
        reviewedBy={{
          name: 'Garmeeh',
        }}
      />
    </>
  );
}

export default WebPage;
