import React from 'react';
import { SocialProfileJsonLd } from '../../..';

function SocialPage() {
  return (
    <>
      <h1>Social Profile</h1>
      <SocialProfileJsonLd
        type="Person"
        url="http://www.your-site.com"
        name="your name"
        sameAs={[
          'http://www.facebook.com/your-profile',
          'http://instagram.com/yourProfile',
          'http://www.linkedin.com/in/yourprofile',
          'http://plus.google.com/your_profile',
        ]}
      />
    </>
  );
}

export default SocialPage;
