import type { AppProps } from 'next/app';

import SEO from '../next-seo.config';
import { DefaultSeo } from '../..';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      {router.pathname}
      <DefaultSeo
        {...SEO}
        dangerouslyDisableGooglebot={
          router.pathname === '/dangerously/disable-googlebot'
        }
        dangerouslySetAllPagesToNoFollow={
          router.pathname === '/dangerously/nofollow' ||
          router.pathname === '/dangerously/nofollow-and-noindex'
        }
        dangerouslySetAllPagesToNoIndex={
          router.pathname === '/dangerously/noindex' ||
          router.pathname === '/dangerously/nofollow-and-noindex'
        }
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
