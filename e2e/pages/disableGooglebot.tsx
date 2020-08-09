import React from 'react';
import { NextSeo } from '../..';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo disableGooglebot={true} />
    <h1>Disabled googlebot tag</h1>
    <Links />
  </>
);
