import { JsonLdScript } from "~/core/JsonLdScript";
import type { BreadcrumbJsonLdProps } from "~/types/breadcrumb.types";
import { processBreadcrumbItem } from "~/utils/processors";

export default function BreadcrumbJsonLd(props: BreadcrumbJsonLdProps) {
  const { scriptId, scriptKey } = props;

  // Handle single trail vs multiple trails
  const hasMultipleTrails = "multipleTrails" in props;

  if (hasMultipleTrails) {
    // Multiple breadcrumb trails
    const data = props.multipleTrails.map((trail) => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((item, index) =>
        processBreadcrumbItem(item, index + 1),
      ),
    }));

    return (
      <JsonLdScript
        data={data}
        id={scriptId}
        scriptKey={scriptKey || "breadcrumb-jsonld-multiple"}
      />
    );
  } else {
    // Single breadcrumb trail
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: props.items.map((item, index) =>
        processBreadcrumbItem(item, index + 1),
      ),
    };

    return (
      <JsonLdScript
        data={data}
        id={scriptId}
        scriptKey={scriptKey || "breadcrumb-jsonld"}
      />
    );
  }
}

export type { BreadcrumbJsonLdProps };
