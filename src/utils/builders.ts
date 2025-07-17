type JsonLdType = Record<string, unknown>;

interface BuildOptions {
  context?: string;
  type?: string;
}

/**
 * Builds a JSON-LD object by conditionally including properties.
 * Filters out undefined values automatically.
 */
export function buildJsonLdObject<T extends JsonLdType>(
  data: T,
  options: BuildOptions = {},
): JsonLdType {
  const { context = "https://schema.org", type } = options;

  const result: JsonLdType = {
    "@context": context,
  };

  if (type) {
    result["@type"] = type;
  }

  // Add all non-undefined properties from data
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Helper to conditionally add a property to an object
 */
export function addIfDefined<T extends JsonLdType>(
  obj: T,
  key: string,
  value: unknown,
): T {
  if (value !== undefined) {
    return { ...obj, [key]: value };
  }
  return obj;
}
