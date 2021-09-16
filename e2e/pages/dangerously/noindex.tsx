import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const NoIndex = () => (
  <>
    <NextSeo title="NoIndex" />
    <h1>dangerouslySetAllPagesToNoIndex</h1>
    <Links />
  </>
);
export default NoIndex;
