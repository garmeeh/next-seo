import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const NoFollowAndNoIndex = () => (
  <>
    <h1>
      <NextSeo title="NoFollowAndNoIndex" />
      dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex
    </h1>
    <Links />
  </>
);
export default NoFollowAndNoIndex;
