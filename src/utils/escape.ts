/**
 * Escape double quotes if they are not already escaped
 * @example escape('Dwayne "The Rock" Johnson') === 'Dwayne \"The Rock\" Johnson'
 *
 * @source https://gist.github.com/getify/3667624
 */
const escape = (input: string | undefined | null) => {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/\\([\s\S])|(")/g, '\\$1$2');
};

export default escape;
