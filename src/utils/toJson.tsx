const toJson = (type: string, jsonld: Object) => ({
  __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...jsonld,
  }),
});

export default toJson;
