import React from 'react';
import { NextSeo } from '../../../';
import Links from '../../components/links';

const DangerouslyDisableGoogleBotNoFollowAndNoIndex = () => (
  <>
    <NextSeo
      title="Dangerously DisableGoogleBot NoFollow And NoIndex"
      nofollow={true}
      noindex={true}
    />
    <h1>Disable googlebot tag and set nofollow and noindex with NextSeo</h1>
    <Links />
  </>
);
export default DangerouslyDisableGoogleBotNoFollowAndNoIndex;
