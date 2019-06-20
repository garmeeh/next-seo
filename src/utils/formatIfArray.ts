const formatIfArray = (value: string | string[]) =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`)}]` : `"${value}"`;

export default formatIfArray;
