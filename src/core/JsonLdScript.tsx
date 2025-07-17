import { stringify } from "~/utils/stringify";

interface JsonLdScriptProps<T = Record<string, unknown>> {
  data: T;
  id?: string;
  scriptKey: string; // For React key
}

export function JsonLdScript<T = Record<string, unknown>>({
  data,
  id,
  scriptKey,
}: JsonLdScriptProps<T>): React.JSX.Element | null {
  if (data === null || data === undefined) {
    // Explicitly check for null/undefined
    return null;
  }

  const jsonString = stringify(data);

  return (
    <script
      type="application/ld+json"
      id={id || scriptKey}
      data-testid={id}
      dangerouslySetInnerHTML={{ __html: jsonString }}
      key={scriptKey}
    />
  );
}
