import type { Organization } from "./common.types";

// Provider can be a string or Organization
export type Provider = string | Organization | Omit<Organization, "@type">;

// Course schema type
export interface Course {
  "@type": "Course";
  name: string;
  description: string;
  url?: string;
  provider?: Organization;
}

// Flexible input type for courses
export type CourseListItem = Omit<Course, "@type" | "provider"> & {
  provider?: Provider;
};

// ListItem for ItemList (used in both summary and all-in-one patterns)
export interface CourseListItemSchema {
  "@type": "ListItem";
  position: number;
  url?: string; // For summary page pattern
  item?: Course; // For all-in-one page pattern
}

// ItemList for course list
export interface CourseItemList {
  "@context": "https://schema.org";
  "@type": "ItemList";
  itemListElement: CourseListItemSchema[];
}

// Summary page item - just URL with optional position
export type SummaryPageItem = string | { url: string; position?: number };

// Base props
interface CourseJsonLdBaseProps {
  scriptId?: string;
  scriptKey?: string;
}

// Single course props
interface SingleCourseProps extends CourseJsonLdBaseProps {
  type?: "single";
  name: string;
  description: string;
  url?: string;
  provider?: Provider;
}

// Summary page props
interface CourseListSummaryProps extends CourseJsonLdBaseProps {
  type: "list";
  urls: SummaryPageItem[];
}

// All-in-one page props
interface CourseListAllInOneProps extends CourseJsonLdBaseProps {
  type: "list";
  courses: CourseListItem[];
}

// Component props supporting both single course and list patterns
export type CourseJsonLdProps =
  | SingleCourseProps
  | CourseListSummaryProps
  | CourseListAllInOneProps;
