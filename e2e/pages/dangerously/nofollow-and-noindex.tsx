import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const DangerouslyNoFollowAndNoIndex = () => (
  <>
    <h1>
      <NextSeo title="Dangerously NoFollow And NoIndex" />
      dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex
    </h1>
    <Links />
  </>
);
export default DangerouslyNoFollowAndNoIndex;
