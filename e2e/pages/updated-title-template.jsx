import React from 'react';
import NextSeo from '../../dist';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo
      config={{
        title: 'Title C',
        titleTemplate: 'Next SEO | %s',
      }}
    />
    <h1>Updated Title Template</h1>
    <Links />
  </>
);
