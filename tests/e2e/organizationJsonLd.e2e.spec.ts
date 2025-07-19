import { test, expect } from "@playwright/test";

test.describe("OrganizationJsonLd", () => {
  test("renders basic Organization structured data", async ({ page }) => {
    await page.goto("/organization");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic properties
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Organization");
    expect(jsonData.name).toBe("Example Corporation");
    expect(jsonData.url).toBe("https://www.example.com");
    expect(jsonData.logo).toBe("https://www.example.com/logo.png");
    expect(jsonData.description).toBe(
      "The example corporation is well-known for producing high-quality widgets",
    );
    expect(jsonData.telephone).toBe("+1-999-999-9999");
    expect(jsonData.email).toBe("contact@example.com");

    // Verify sameAs is an array
    expect(Array.isArray(jsonData.sameAs)).toBe(true);
    expect(jsonData.sameAs).toHaveLength(3);
    expect(jsonData.sameAs).toContain("https://twitter.com/example");
  });

  test("renders OnlineStore with merchant return policy", async ({ page }) => {
    await page.goto("/online-store");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify OnlineStore type
    expect(jsonData["@type"]).toBe("OnlineStore");
    expect(jsonData.name).toBe("Example Online Store");

    // Verify logo as ImageObject
    expect(jsonData.logo["@type"]).toBe("ImageObject");
    expect(jsonData.logo.url).toBe("https://www.example.com/assets/logo.png");
    expect(jsonData.logo.width).toBe(600);
    expect(jsonData.logo.height).toBe(400);

    // Verify address
    expect(jsonData.address["@type"]).toBe("PostalAddress");
    expect(jsonData.address.streetAddress).toBe("999 W Example St Suite 99");
    expect(jsonData.address.addressLocality).toBe("New York");
    expect(jsonData.address.addressRegion).toBe("NY");
    expect(jsonData.address.postalCode).toBe("10019");
    expect(jsonData.address.addressCountry).toBe("US");

    // Verify contact point
    expect(jsonData.contactPoint["@type"]).toBe("ContactPoint");
    expect(jsonData.contactPoint.contactType).toBe("Customer Service");
    expect(jsonData.contactPoint.telephone).toBe("+1-999-999-9900");
    expect(jsonData.contactPoint.email).toBe("support@example.com");

    // Verify number of employees
    expect(jsonData.numberOfEmployees["@type"]).toBe("QuantitativeValue");
    expect(jsonData.numberOfEmployees.minValue).toBe(100);
    expect(jsonData.numberOfEmployees.maxValue).toBe(999);

    // Verify merchant return policy
    expect(jsonData.hasMerchantReturnPolicy).toBeDefined();
    expect(jsonData.hasMerchantReturnPolicy["@type"]).toBe(
      "MerchantReturnPolicy",
    );
    expect(jsonData.hasMerchantReturnPolicy.merchantReturnDays).toBe(60);
    expect(jsonData.hasMerchantReturnPolicy.returnFees).toBe(
      "https://schema.org/FreeReturn",
    );
  });

  test("renders Organization with multiple addresses and contact points", async ({
    page,
  }) => {
    await page.goto("/organization-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic info
    expect(jsonData["@type"]).toBe("Organization");
    expect(jsonData.name).toBe("Global Widget Corporation");
    expect(jsonData.alternateName).toBe("GWC");
    expect(jsonData.legalName).toBe("Global Widget Corporation Inc.");
    expect(jsonData.foundingDate).toBe("1995-03-15");

    // Verify multiple addresses
    expect(Array.isArray(jsonData.address)).toBe(true);
    expect(jsonData.address).toHaveLength(3);
    expect(jsonData.address[0]["@type"]).toBe("PostalAddress");
    expect(jsonData.address[0].addressLocality).toBe("San Francisco");
    expect(jsonData.address[1].addressLocality).toBe("London");
    expect(jsonData.address[2].addressLocality).toBe("Tokyo");

    // Verify multiple contact points
    expect(Array.isArray(jsonData.contactPoint)).toBe(true);
    expect(jsonData.contactPoint).toHaveLength(3);
    expect(jsonData.contactPoint[0].contactType).toBe("Customer Service");
    expect(jsonData.contactPoint[1].contactType).toBe("Sales");
    expect(jsonData.contactPoint[2].contactType).toBe("Technical Support");

    // Verify identifiers
    expect(jsonData.taxID).toBe("98-7654321");
    expect(jsonData.vatID).toBe("GB123456789");
    expect(jsonData.duns).toBe("123456789");
    expect(jsonData.leiCode).toBe("529900T8BM49AURSDO55");
    expect(jsonData.naics).toBe("334111");
    expect(jsonData.globalLocationNumber).toBe("0614141000001");
    expect(jsonData.iso6523Code).toBe("0088:0614141000001");
  });
});
