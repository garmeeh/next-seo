import escape from './escape';

const formatAuthorName = (authorName: string | string[]) =>
  Array.isArray(authorName)
    ? `[${authorName.map(
        name => `{"@type": "Person","name": "${escape(name)}"}`,
      )}]`
    : `{"@type": "Person","name": "${escape(authorName)}"}`;

export default formatAuthorName;
