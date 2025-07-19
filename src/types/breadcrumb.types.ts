// Type definitions for BreadcrumbList structured data

// Flexible input type for breadcrumb items
export interface BreadcrumbListItem {
  name: string;
  item?: string | { "@id": string };
}

// Schema.org ListItem type
export interface ListItem {
  "@type": "ListItem";
  position: number;
  name?: string;
  item?: string | { "@id": string };
}

// Schema.org BreadcrumbList type
export interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

// Component props supporting both single and multiple trails
export type BreadcrumbJsonLdProps =
  | {
      items: BreadcrumbListItem[];
      scriptId?: string;
      scriptKey?: string;
    }
  | {
      multipleTrails: BreadcrumbListItem[][];
      scriptId?: string;
      scriptKey?: string;
    };
