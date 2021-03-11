/**
 * Reverted this functionality until the following issues can be
 * investigated and resolved:
 * https://github.com/garmeeh/next-seo/issues/515
 * https://github.com/garmeeh/next-seo/issues/514
 */
declare const minifyJsonLd: (jsonld: string) => string;
export default minifyJsonLd;
