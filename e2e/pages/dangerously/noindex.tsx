import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const DangerouslyNoIndex = () => (
  <>
    <NextSeo title="Dangerously NoIndex" />
    <h1>dangerouslySetAllPagesToNoIndex</h1>
    <Links />
  </>
);
export default DangerouslyNoIndex;
