import React from 'react';
import { NextSeo } from '../../lib';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo doNotRenderDefaultRobotsTags={true} />
    <h1>Don't render default robots tags</h1>
    <Links />
  </>
);
