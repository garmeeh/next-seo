import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const NoFollow = () => (
  <>
    <NextSeo title="NoFollow" />
    <h1>dangerouslySetAllPagesToNoFollow</h1>
    <Links />
  </>
);
export default NoFollow;
