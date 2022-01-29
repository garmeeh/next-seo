import React from 'react';
import { ProfilePageJsonLd } from '../../..';

function ProfilePage() {
  return (
    <>
      <h1>Profile Page</h1>
      <ProfilePageJsonLd
        lastReviewed="2014-10-01T19:30"
        breadcrumb={[
          {
            position: 1,
            name: 'Books',
            item: 'https://example.com/books',
          },
          {
            position: 2,
            name: 'Authors',
            item: 'https://example.com/books/authors',
          },
        ]}
      />
    </>
  );
}

export default ProfilePage;
