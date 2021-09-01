import React from 'react';
import { NextSeo } from '../../..';
import Links from '../../components/links';

const OverriddenTitle = () => (
  <>
    <NextSeo title="Title C" description="Description C" />
    <h1>Overridden Title Seo</h1>
    <Links />
  </>
);

export default OverriddenTitle;
