const formatIfArray = value =>
  Array.isArray(value) ? `[${value.map(val => `"${val}"`)}]` : `"${value}"`;

export default formatIfArray;
