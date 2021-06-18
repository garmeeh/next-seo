const markup = (jsonld: string) => ({ __html: jsonld.split("\n").map(e => e.trim()).join("") });

export default markup;
