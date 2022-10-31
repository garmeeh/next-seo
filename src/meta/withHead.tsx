import React from 'react';
import Head from 'next/head';
import { BuildTagsParams } from '../types';
import buildTags from './buildTags';

export const WithHead = (props: BuildTagsParams) => {
  return <Head>{buildTags(props)}</Head>;
};
