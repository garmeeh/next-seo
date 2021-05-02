/**
 * @see https://gist.github.com/getify/3667624
 */
const escape = (input: string) => {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/\\([\s\S])|(")/g, '\\$1$2');
};

export default escape;
