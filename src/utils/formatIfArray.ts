const formatIfArray = (value: string | string[]) =>
  Array.isArray(value)
    ? `[${value.map(val => `"${escape(val)}"`)}]`
    : `"${escape(value)}"`;

export default formatIfArray;
