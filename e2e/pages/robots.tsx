import React from 'react';
import { NextSeo } from '../..';
import Links from '../components/links';

const Robots = () => (
  <>
    <NextSeo
      title="Robots meta title"
      robotsProps={{
        nosnippet: true,
        notranslate: true,
        noimageindex: true,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: 'none',
        maxVideoPreview: -1,
      }}
    />
    <h1>Robots meta properties</h1>
    <Links />
  </>
);

export default Robots;
