const minifyJsonLd = (jsonld: string) => JSON.stringify(JSON.parse(jsonld));

export default minifyJsonLd;
