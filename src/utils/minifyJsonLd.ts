const minifyJsonLd = (jsonld: string) =>
  JSON.stringify(JSON.parse(jsonld.replace(/[\u0000-\u0019]/g, '')));

export default minifyJsonLd;
