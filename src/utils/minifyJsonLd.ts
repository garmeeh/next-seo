/**
 * Reverted this functionality until the following issues can be
 * investigated and resolved:
 * https://github.com/garmeeh/next-seo/issues/515
 * https://github.com/garmeeh/next-seo/issues/514
 */
const minifyJsonLd = (jsonld: string) =>
  JSON.stringify(JSON.parse(jsonld.replace(/[\u0000-\u0019]/g, '')));

export default minifyJsonLd;
