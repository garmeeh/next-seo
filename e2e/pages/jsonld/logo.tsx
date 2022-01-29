import React from 'react';
import { LogoJsonLd } from '../../..';

function Logo() {
  return (
    <>
      <h1>Logo</h1>
      <LogoJsonLd
        logo="http://www.your-site.com/images/logo.jpg"
        url="http://www.and-this-one.com"
      />
    </>
  );
}

export default Logo;
