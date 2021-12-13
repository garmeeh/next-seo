import React from 'react';
import { DefaultSeo, DefaultSeoProps } from '../../../';
import Links from '../../components/links';

const DangerouslyNoFollowAndNoIndexThroughUnsupportedProps = () => {
  const props = {
    noindex: true,
    nofollow: true,
  } as DefaultSeoProps;

  return (
    <>
      <DefaultSeo
        title="DangerouslyNoFollowAndNoIndexThroughUnsupportedProps"
        {...props}
      />
      <h1>DangerouslyNoFollowAndNoIndexThroughUnsupportedProps</h1>
      <Links />
    </>
  );
};

export default DangerouslyNoFollowAndNoIndexThroughUnsupportedProps;
