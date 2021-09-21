import type { AppProps } from 'next/app';

import SEO from '../next-seo.config';
import { DefaultSeo } from '../..';

// List of Tests without DefaultSeo added tags
const pagesWithoutDefaultSeo = ['disable-googlebot'];

function MyApp({ Component, pageProps, router }: AppProps) {
  const pageWithDefaultSeo =
    pagesWithoutDefaultSeo.indexOf(router.pathname.slice(1)) === -1;

  return (
    <>
      {pageWithDefaultSeo && (
        <DefaultSeo
          {...SEO}
          dangerouslyDisableGooglebot={
            router.pathname === '/dangerously/disable-googlebot' ||
            router.pathname ===
              '/dangerously/disable-googlebot-nofollow-and-noindex'
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
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
