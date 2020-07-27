import DOMPurify from 'dompurify';

const markup = (jsonld: string) => ({
  __html: DOMPurify.sanitize(jsonld || ''),
});

export default markup;
