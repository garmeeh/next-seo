import { describe, it, expect } from "vitest";
import { stringify } from "./stringify";

describe("stringify", () => {
  describe("URL handling", () => {
    it("preserves URLs with query parameters", () => {
      const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        url: "https://example.com/article?param1=value&param2=another",
        image:
          "https://example.com/image.jpg?width=1200&height=630&format=webp",
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      // URLs should not have & escaped to &amp;
      expect(result).toContain("param1=value&param2=another");
      expect(result).toContain("width=1200&height=630&format=webp");
      expect(result).not.toContain("&amp;");

      // Verify data integrity
      expect(parsed.url).toBe(
        "https://example.com/article?param1=value&param2=another",
      );
      expect(parsed.image).toBe(
        "https://example.com/image.jpg?width=1200&height=630&format=webp",
      );
    });

    it("preserves Vercel og-image URLs", () => {
      const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        image:
          "https://og-image.vercel.app/**Hello**%20World.png?theme=light&md=1&fontSize=100px&images=https://example.com/logo.png",
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      // Vercel og-image URL should remain intact
      expect(result).toContain("theme=light&md=1&fontSize=100px");
      expect(result).not.toContain("&amp;");
      expect(parsed.image).toBe(data.image);
    });

    it("preserves complex URLs with multiple parameters", () => {
      const data = {
        video: {
          "@type": "VideoObject",
          contentUrl:
            "https://example.com/video.mp4?quality=hd&autoplay=false&loop=true&muted=1",
          embedUrl:
            "https://youtube.com/embed/abc123?rel=0&showinfo=0&modestbranding=1",
        },
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      expect(result).not.toContain("&amp;");
      expect(parsed.video.contentUrl).toBe(data.video.contentUrl);
      expect(parsed.video.embedUrl).toBe(data.video.embedUrl);
    });
  });

  describe("script tag escaping", () => {
    it("escapes </script> tags in strings", () => {
      const data = {
        description: "This contains a </script> tag",
      };

      const result = stringify(data);

      // Should escape the closing script tag using Unicode
      expect(result).toContain("\\u003C/script>");
      expect(result).not.toContain("</script>");

      // Should still parse correctly
      const parsed = JSON.parse(result);
      // When parsed, the escaped sequence should be interpreted correctly
      expect(parsed.description).toBe("This contains a </script> tag");
    });

    it("escapes </SCRIPT> tags case-insensitively", () => {
      const data = {
        description: "This contains a </SCRIPT> tag in uppercase",
      };

      const result = stringify(data);

      // Case-insensitive regex converts all to lowercase
      expect(result).toContain("\\u003C/script>");
      expect(result).not.toContain("</SCRIPT>");
      expect(result).not.toContain("</script>");
    });

    it("escapes HTML comments", () => {
      const data = {
        description: "This has <!-- a comment --> inside",
      };

      const result = stringify(data);

      expect(result).toContain("\\u003C!--");
      expect(result).toContain("--\\u003E");
      expect(result).not.toContain("<!--");
      expect(result).not.toContain("-->");

      const parsed = JSON.parse(result);
      expect(parsed.description).toBe("This has <!-- a comment --> inside");
    });

    it("escapes multiple dangerous sequences", () => {
      const data = {
        content:
          "<!-- Start --> Content with </script> and <!-- another comment --> and </SCRIPT>",
      };

      const result = stringify(data);

      expect(result).toContain("\\u003C!--");
      expect(result).toContain("--\\u003E");
      expect(result).toContain("\\u003C/script>");
      // All </script> tags are escaped the same way (case-insensitive)
      // Both </script> and </SCRIPT> should be escaped to <\\/script
      const scriptCount = (result.match(/\\u003C\/script>/gi) || []).length;
      expect(scriptCount).toBe(2);
    });

    it("escapes dangerous sequences in URLs", () => {
      const data = {
        // This is an edge case - URLs shouldn't normally contain these sequences
        url: "https://example.com/page?content=</script>&comment=<!--test-->",
      };

      const result = stringify(data);

      // Even in URLs, dangerous sequences should be escaped
      expect(result).toContain("\\u003C/script>");
      expect(result).toContain("\\u003C!--");
      expect(result).toContain("--\\u003E");

      // But regular & should not be escaped
      expect(result).toContain("content=\\u003C/script>&comment=");
      expect(result).not.toContain("&amp;");
    });
  });

  describe("general behavior", () => {
    it("preserves special characters that are not dangerous", () => {
      const data = {
        title: "Article with <em>emphasis</em> & \"quotes\" and 'apostrophes'",
        price: "$99.99 < $100",
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      // These characters should NOT be escaped
      expect(result).toContain("<em>");
      expect(result).toContain("</em>");
      expect(result).toContain(" & ");
      expect(result).not.toContain("&amp;");
      expect(result).not.toContain("&lt;");
      expect(result).not.toContain("&gt;");
      expect(result).not.toContain("&quot;");
      expect(result).not.toContain("&apos;");

      expect(parsed.title).toBe(data.title);
      expect(parsed.price).toBe(data.price);
    });

    it("handles nested objects and arrays", () => {
      const data = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: "Test Recipe",
        image: [
          "https://example.com/image1.jpg?size=small&format=jpg",
          "https://example.com/image2.jpg?size=large&format=webp",
        ],
        author: {
          "@type": "Person",
          name: "Chef with </script> in name",
          url: "https://example.com/chef?id=123&role=author",
        },
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      // URLs in arrays should not be escaped
      expect(result).not.toContain("&amp;");

      // But dangerous sequences should be
      expect(result).toContain("\\u003C/script>");

      expect(parsed.image[0]).toBe(data.image[0]);
      expect(parsed.image[1]).toBe(data.image[1]);
      expect(parsed.author.url).toBe(data.author.url);
      expect(parsed.author.name).toBe("Chef with </script> in name");
    });

    it("omits null values", () => {
      const data = {
        name: "Test",
        value: null,
        nested: {
          prop: null,
          other: "value",
        },
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      expect(parsed.value).toBeUndefined();
      expect(parsed.nested.prop).toBeUndefined();
      expect(parsed.nested.other).toBe("value");
    });

    it("handles boolean and number values", () => {
      const data = {
        isActive: true,
        count: 42,
        rating: 4.5,
        isFree: false,
      };

      const result = stringify(data);
      const parsed = JSON.parse(result);

      expect(parsed.isActive).toBe(true);
      expect(parsed.count).toBe(42);
      expect(parsed.rating).toBe(4.5);
      expect(parsed.isFree).toBe(false);
    });
  });
});
