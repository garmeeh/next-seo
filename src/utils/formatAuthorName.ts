const formatAuthorName = (authorName: string | string[]) =>
  Array.isArray(authorName)
    ? `[${authorName.map(name => `{"@type": "Person","name": "${name}"}`)}]`
    : `{"@type": "Person","name": "${authorName}"}`;

export default formatAuthorName;
