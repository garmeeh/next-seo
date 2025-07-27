import { JsonLdScript } from "~/core/JsonLdScript";
import type {
  CourseJsonLdProps,
  CourseListItem,
  SummaryPageItem,
  CourseListItemSchema,
  Course,
} from "~/types/course.types";
import { processProvider } from "~/utils/processors";

function processSummaryItem(
  item: SummaryPageItem,
  index: number,
): CourseListItemSchema {
  if (typeof item === "string") {
    return {
      "@type": "ListItem",
      position: index + 1,
      url: item,
    };
  }
  return {
    "@type": "ListItem",
    position: item.position ?? index + 1,
    url: item.url,
  };
}

function processCourseItem(
  course: CourseListItem,
  index: number,
): CourseListItemSchema {
  const processedCourse: Course = {
    "@type": "Course",
    name: course.name,
    description: course.description,
    ...(course.url && { url: course.url }),
    ...(course.provider && { provider: processProvider(course.provider) }),
  };

  return {
    "@type": "ListItem",
    position: index + 1,
    item: processedCourse,
  };
}

export default function CourseJsonLd(props: CourseJsonLdProps) {
  const { scriptId, scriptKey } = props;

  // Single course pattern
  if (!("type" in props) || props.type === "single") {
    const data = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: props.name,
      description: props.description,
      ...(props.url && { url: props.url }),
      ...(props.provider && { provider: processProvider(props.provider) }),
    };

    return (
      <JsonLdScript
        data={data}
        id={scriptId}
        scriptKey={scriptKey || "course-jsonld"}
      />
    );
  }

  // List pattern
  let itemListElement: CourseListItemSchema[];

  if ("urls" in props && props.type === "list") {
    // Summary page pattern - just URLs
    itemListElement = props.urls.map((url, index) =>
      processSummaryItem(url, index),
    );
  } else if ("courses" in props && props.type === "list") {
    // All-in-one page pattern - full course data
    itemListElement = props.courses.map((course, index) =>
      processCourseItem(course, index),
    );
  } else {
    // This should never happen due to type constraints
    itemListElement = [];
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "course-list-jsonld"}
    />
  );
}

export type { CourseJsonLdProps };
