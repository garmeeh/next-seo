import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const DangerouslyNoFollowAndNoIndex = () => (
  <>
    <h1>
      <NextSeo title="Dangerously NoFollow And NoIndex And NoRobots" />
      dangerouslySetAllPagesToNoFollow and dangerouslySetAllPagesToNoIndex and
      dangerouslySetAllPagesToNoRobots
    </h1>
    <Links />
  </>
);
export default DangerouslyNoFollowAndNoIndex;
