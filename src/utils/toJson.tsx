const toJson = (type: string, jsonld: any) => {
  const { id = undefined } = jsonld;
  const updated = {
    ...(id ? { '@id': jsonld.id } : {}),
    ...jsonld,
  };
  delete updated.id;

  return {
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...updated,
    }),
  };
};

export default toJson;
