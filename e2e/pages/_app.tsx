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
          router.pathname === '/dangerously/nofollow-and-noindex' ||
          router.pathname === '/dangerously/nofollow-and-noindex-and-norobots'
        }
        dangerouslySetAllPagesToNoIndex={
          router.pathname === '/dangerously/noindex' ||
          router.pathname === '/dangerously/nofollow-and-noindex' ||
          router.pathname === '/dangerously/nofollow-and-noindex-and-norobots'
        }
        dangerouslySetAllPagesToNoRobots={
          router.pathname === '/dangerously/norobots' ||
          router.pathname === '/dangerously/nofollow-and-noindex-and-norobots'
        }
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
