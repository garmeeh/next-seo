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

/**
 * Type guard to ensure exhaustive type checking.
 * @internal
 */
function isNever(_: never): void {}

/**
 * Stringify data for safe embedding in HTML script elements.
 *
 * Every `<` is escaped to its Unicode form, which is the approach Next.js
 * documents for JSON-LD. `&`, `>`, `"` and `'` are left alone -- they cannot
 * terminate a script element, and escaping them as HTML entities would corrupt
 * the payload.
 *
 * Escaping `<` wholesale, rather than matching the specific dangerous sequences,
 * matters for two reasons:
 *
 * 1. **It preserves the payload exactly.** Matching `</script>` case-insensitively
 *    and substituting a lowercase literal rewrote the author's own text: a
 *    description containing `</SCRIPT>` parsed back as `</script>`. Escaping only
 *    the `<` leaves every following character untouched, so any casing round-trips.
 * 2. **It removes the need to enumerate.** `</script>` and `<!--` are both reachable
 *    only through a `<`; escaping that one character closes the whole class rather
 *    than the two members of it we thought to list.
 *
 * The output remains valid JSON: `\u003C` is a standard string escape, so a URL
 * carrying `<` in a query parameter parses back byte-identical.
 *
 * `-->` carries no `<` and is escaped separately. It is inert on its own once
 * `<!--` can no longer appear, and is kept as defence in depth.
 *
 * References:
 * - https://nextjs.org/docs/app/guides/json-ld
 * - https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 * - https://github.com/w3c/json-ld-syntax/issues/100
 */
export const stringify = (data: unknown) => {
  const jsonString = JSON.stringify(data, safeJsonLdReplacer);

  return jsonString.replace(/</g, "\\u003C").replace(/-->/g, "--\\u003E");
};
