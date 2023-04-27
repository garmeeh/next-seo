import type { AppProps } from 'next/app';

import SEO from '../default-seo.config';
import { DefaultSeo } from '../..';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DefaultSeo
        {...SEO}
        dangerouslySetAllPagesToNoFollow={
          router.pathname === '/dangerously/nofollow' ||
          router.pathname === '/dangerously/nofollow-and-noindex'
        }
        dangerouslySetAllPagesToNoIndex={
          router.pathname === '/dangerously/noindex' ||
          router.pathname === '/dangerously/nofollow-and-noindex'
        }
        norobots={router.pathname.startsWith('/norobots')}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
