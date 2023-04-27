import React from 'react';
import { NextSeo } from '../../..';
import Links from '../../components/links';

const NoRobotsNoIndex = () => (
  <>
    <NextSeo title="NoRobots NoIndex" noindex />
    <h1>norobots and noindex</h1>
    <Links />
  </>
);
export default NoRobotsNoIndex;
