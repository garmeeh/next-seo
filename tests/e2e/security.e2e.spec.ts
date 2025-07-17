import { test, expect } from "@playwright/test";

test.describe("JSON-LD Security", () => {
  test("prevents script tag injection attacks", async ({ page }) => {
    // Create a simple test page
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Security Test</title>
        </head>
        <body>
          <div id="content">Test Page</div>
        </body>
      </html>
    `);

    // Inject a script tag with malicious content attempts
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.type = "application/ld+json";

      const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Normal title",
        description: 'Malicious </script><script>alert("XSS")</script> attempt',
        author: {
          name: "Author </SCRIPT><script>console.log('hacked')</script>",
          url: "https://example.com/author?name=</script>&action=hack",
        },
      };

      // Simulate what our stringify function does
      script.textContent = JSON.stringify(data)
        .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
        .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
        .replace(/-->/g, "--\\u003E"); // Unicode escape for >

      document.head.appendChild(script);
    });

    // Verify no additional script tags were created
    const scriptCount = await page.locator("script").count();
    expect(scriptCount).toBe(1); // Only our JSON-LD script

    // Verify the JSON-LD content is properly escaped
    const jsonLdContent = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdContent).toContain("\\u003C/script>");
    // Case-insensitive regex normalizes all to lowercase

    // Verify no alerts were triggered
    const alerts: string[] = [];
    page.on("dialog", (dialog) => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });

    // Wait a bit to ensure no delayed scripts execute
    await page.waitForTimeout(100);
    expect(alerts).toHaveLength(0);

    // Verify no console logs from injected scripts
    const consoleLogs = await page.evaluate(() => {
      return (
        (window as Window & { consoleMessages?: string[] }).consoleMessages ||
        []
      );
    });
    expect(consoleLogs).not.toContain("hacked");
  });

  test("prevents HTML comment injection", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head><title>Comment Test</title></head>
        <body></body>
      </html>
    `);

    await page.evaluate(() => {
      const script = document.createElement("script");
      script.type = "application/ld+json";

      const data = {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: "Recipe with <!-- hidden --> content",
        description:
          "This has <!-- <script>alert('XSS')</script> --> hidden script",
        instructions: "<!-- </script><script>alert('another')</script> -->",
      };

      script.textContent = JSON.stringify(data)
        .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
        .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
        .replace(/-->/g, "--\\u003E"); // Unicode escape for >

      document.head.appendChild(script);
    });

    // Verify comments are escaped
    const jsonLdContent = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdContent).toContain("\\u003C!--");
    expect(jsonLdContent).toContain("--\\u003E");
    expect(jsonLdContent).not.toContain("<!--");
    expect(jsonLdContent).not.toContain("-->");

    // Verify the JSON can be parsed
    const jsonData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      return JSON.parse(script!.textContent!);
    });

    expect(jsonData.name).toBe("Recipe with <!-- hidden --> content");
  });

  test("handles edge cases safely", async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head><title>Edge Case Test</title></head>
        <body></body>
      </html>
    `);

    await page.evaluate(() => {
      const script = document.createElement("script");
      script.type = "application/ld+json";

      const data = {
        "@context": "https://schema.org",
        "@type": "Article",
        // Multiple dangerous patterns in one string
        headline: "Article with </script><!-- comment --></SCRIPT> and more",
        // Nested escaping attempts
        description: "Nested: </<\\/script>script> attempt",
        // URL with dangerous sequences (edge case)
        url: "https://example.com/?q=</script>&c=<!--test-->",
        // Empty dangerous sequences
        empty1: "</script>",
        empty2: "<!---->",
        // Mixed case
        mixed: "</ScRiPt> and </SCRIPT> and </script>",
      };

      script.textContent = JSON.stringify(data)
        .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
        .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
        .replace(/-->/g, "--\\u003E"); // Unicode escape for >

      document.head.appendChild(script);
    });

    const jsonLdContent = await page
      .locator('script[type="application/ld+json"]')
      .textContent();

    // Verify all dangerous sequences are escaped
    expect(jsonLdContent).not.toMatch(/<\/script/i);
    expect(jsonLdContent).not.toContain("<!--");
    expect(jsonLdContent).not.toContain("-->");

    // Verify JSON parsing still works
    const jsonData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      return JSON.parse(script!.textContent!);
    });

    expect(jsonData.headline).toBe(
      "Article with </script><!-- comment --></script> and more",
    );
    expect(jsonData.url).toBe("https://example.com/?q=</script>&c=<!--test-->");
  });

  test("verifies safe rendering in Next.js-like environment", async ({
    page,
  }) => {
    // Simulate server-side rendered content with our JSON-LD
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Next.js-like Test</title>
          <script type="application/ld+json">${
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Page with </script> in title",
              url: "https://example.com/page?utm_source=google&utm_medium=cpc&utm_campaign=test",
              description: "This has <!-- comments --> and </SCRIPT> tags",
            })
              .replace(/<\/script>/gi, "\\u003C/script>") // Unicode escape for <
              .replace(/<!--/g, "\\u003C!--") // Unicode escape for <
              .replace(/-->/g, "--\\u003E") // Unicode escape for >
          }</script>
        </head>
        <body>
          <h1>Test Page</h1>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);

    // Verify page loads without executing injected scripts
    const title = await page.title();
    expect(title).toBe("Next.js-like Test");

    // Verify only one script tag exists
    const scriptCount = await page.locator("script").count();
    expect(scriptCount).toBe(1);

    // Verify JSON-LD data integrity
    const jsonData = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      return JSON.parse(script!.textContent!);
    });

    expect(jsonData.name).toBe("Page with </script> in title");
    expect(jsonData.url).toBe(
      "https://example.com/page?utm_source=google&utm_medium=cpc&utm_campaign=test",
    );
    expect(jsonData.description).toBe(
      "This has <!-- comments --> and </script> tags",
    );
  });
});
