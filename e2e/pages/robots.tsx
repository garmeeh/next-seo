import React from 'react';
import { NextSeo } from '../..';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo
      title="Robots meta title"
      nosnippet
      notranslate
      noimageindex
      noarchive
      maxSnippet={-1}
      maxImagePreview="none"
      maxVideoPreview={-1}
    />
    <h1>Robots meta properties</h1>
    <Links />
  </>
);
