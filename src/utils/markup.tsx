const markup = (jsonld: string) => ({ __html: JSON.stringify(JSON.parse(jsonld)) });

export default markup;
