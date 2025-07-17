/* eslint-disable */
// Some of the code below is borrowed from react-schemaorg after the author of the package
// kindly reached out to let me know this was a better way of doing things. ❤️
// https://github.com/google/react-schemaorg/blob/main/src/json-ld.tsx#L173

type JsonValueScalar = string | boolean | number;
type JsonValue =
  | JsonValueScalar
  | Array<JsonValue>
  | { [key: string]: JsonValue };
type JsonReplacer = (_: string, value: JsonValue) => JsonValue | undefined;

/**
 * A replacer for JSON.stringify to omit null values from JSON-LD.
 * The actual script tag safety escaping is done in post-processing.
 */
const safeJsonLdReplacer: JsonReplacer = (() => {
  return (_: string, value: JsonValue): JsonValue | undefined => {
    switch (typeof value) {
      case "object":
        // Omit null values.
        if (value === null) {
          return undefined;
        }
        return value; // JSON.stringify will recursively call replacer.
      case "number":
      case "boolean":
      case "bigint":
      case "string":
        return value; // Return all primitive values as-is
      default: {
        // We shouldn't expect other types.
        isNever(value);
        // JSON.stringify will remove this element.
        return undefined;
      }
    }
  };
})();

// Utility: Assert never
function isNever(_: never): void {}

/**
 * Stringify data for safe embedding in HTML script elements.
 *
 * Per W3C specifications and security best practices, we need to escape sequences
 * that could break out of the script tag:
 * - </script> sequences (case-insensitive)
 * - <!-- and --> sequences (HTML comments)
 *
 * We do NOT escape standard HTML entities like &, <, >, ", ' as they are valid
 * within script tag content and escaping them breaks URLs with query parameters.
 *
 * The escaping is done on the final JSON string to ensure the JSON remains valid
 * and parseable while being safe for HTML embedding.
 *
 * References:
 * - https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 * - https://github.com/w3c/json-ld-syntax/issues/100
 */
export const stringify = (data: unknown) => {
  const jsonString = JSON.stringify(data, safeJsonLdReplacer);

  // Post-process the JSON string to escape dangerous sequences
  // This ensures the JSON remains valid while being safe for script tags
  // Use Unicode escape sequences to break up dangerous patterns
  // This prevents the HTML parser from recognizing them while keeping valid JSON
  return jsonString
    .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
    .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
    .replace(/-->/g, "--\\u003E"); // Unicode escape for >
};
