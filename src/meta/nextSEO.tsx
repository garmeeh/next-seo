import Head from 'next/head';
import React, { Component } from 'react';
import buildTags from './buildTags';
import { NextSeoProps } from '../types';

export default class extends Component<NextSeoProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      noindex = false,
      description,
      canonical,
      openGraph,
      facebook,
      twitter,
      additionalMetaTags,
    } = this.props;

    return (
      <Head>
        {buildTags({
          title,
          noindex,
          description,
          canonical,
          facebook,
          openGraph,
          additionalMetaTags,
          twitter,
        })}
      </Head>
    );
  }
}
