import React from 'react';
import { NextSeo } from '../../lib';
import Links from '../components/links';

export default () => (
  <>
    <NextSeo
      title="Do not render default robots tags title"
      doNotRenderDefaultRobotsTags={true}
    />
    <h1>Do not render default robots tags</h1>
    <Links />
  </>
);
