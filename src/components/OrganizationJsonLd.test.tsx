import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrganizationJsonLd from "./OrganizationJsonLd";
import type { TierBenefit } from "~/types/common.types";

describe("OrganizationJsonLd", () => {
  it("renders basic Organization with minimal props", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corporation"
        url="https://www.example.com"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Example Corporation",
      url: "https://www.example.com",
    });
  });

  it("preserves URL query parameters", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        url="https://www.example.com?utm_source=google&campaign=2024"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.url).toBe(
      "https://www.example.com?utm_source=google&campaign=2024",
    );
  });

  it("renders OnlineStore type when specified", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        url="https://www.example.com"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("OnlineStore");
  });

  it("handles string address", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        address="123 Main St, New York, NY 10001"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "123 Main St, New York, NY 10001",
    });
  });

  it("handles PostalAddress object", () => {
    const address = {
      "@type": "PostalAddress" as const,
      streetAddress: "999 W Example St Suite 99",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10019",
      addressCountry: "US",
    };

    const { container } = render(
      <OrganizationJsonLd name="Example Corp" address={address} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.address).toEqual(address);
  });

  it("handles multiple addresses", () => {
    const addresses = [
      "123 Main St, New York, NY 10001",
      {
        "@type": "PostalAddress" as const,
        streetAddress: "999 Rue du exemple",
        addressLocality: "Paris",
        postalCode: "75001",
        addressCountry: "FR",
      },
    ];

    const { container } = render(
      <OrganizationJsonLd name="Example Corp" address={addresses} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.address).toHaveLength(2);
    expect(jsonData.address[0]).toEqual({
      "@type": "PostalAddress",
      streetAddress: "123 Main St, New York, NY 10001",
    });
    expect(jsonData.address[1]["@type"]).toBe("PostalAddress");
  });

  it("handles single sameAs URL", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        sameAs="https://twitter.com/example"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.sameAs).toEqual(["https://twitter.com/example"]);
  });

  it("handles multiple sameAs URLs", () => {
    const sameAs = [
      "https://twitter.com/example",
      "https://facebook.com/example",
    ];

    const { container } = render(
      <OrganizationJsonLd name="Example Corp" sameAs={sameAs} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.sameAs).toEqual(sameAs);
  });

  it("handles string logo", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        logo="https://www.example.com/logo.png"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.logo).toBe("https://www.example.com/logo.png");
  });

  it("handles ImageObject logo", () => {
    const logo = {
      "@type": "ImageObject" as const,
      url: "https://www.example.com/logo.png",
      width: 600,
      height: 400,
    };

    const { container } = render(
      <OrganizationJsonLd name="Example Corp" logo={logo} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.logo).toEqual(logo);
  });

  it("handles contactPoint", () => {
    const contactPoint = {
      "@type": "ContactPoint" as const,
      contactType: "Customer Service",
      telephone: "+1-999-999-9999",
      email: "support@example.com",
    };

    const { container } = render(
      <OrganizationJsonLd name="Example Corp" contactPoint={contactPoint} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.contactPoint).toEqual(contactPoint);
  });

  it("handles number of employees as number", () => {
    const { container } = render(
      <OrganizationJsonLd name="Example Corp" numberOfEmployees={100} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.numberOfEmployees).toEqual({
      "@type": "QuantitativeValue",
      value: 100,
    });
  });

  it("handles number of employees as range", () => {
    const numberOfEmployees = {
      "@type": "QuantitativeValue" as const,
      minValue: 100,
      maxValue: 999,
    };

    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        numberOfEmployees={numberOfEmployees}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.numberOfEmployees).toEqual(numberOfEmployees);
  });

  it("handles number of employees as range without @type", () => {
    const numberOfEmployees = {
      minValue: 100,
      maxValue: 999,
    };

    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        numberOfEmployees={numberOfEmployees}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.numberOfEmployees).toEqual({
      "@type": "QuantitativeValue",
      minValue: 100,
      maxValue: 999,
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corporation"
        url="https://www.example.com"
        logo="https://www.example.com/logo.png"
        description="The example corporation is well-known for producing high-quality widgets"
        sameAs={[
          "https://example.net/profile/example1234",
          "https://example.org/example1234",
        ]}
        address={{
          "@type": "PostalAddress",
          streetAddress: "Rue Improbable 99",
          addressLocality: "Paris",
          addressCountry: "FR",
          addressRegion: "Ile-de-France",
          postalCode: "75001",
        }}
        contactPoint={{
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+47-99-999-9999",
          email: "contact@example.com",
        }}
        telephone="+47-99-999-9999"
        email="contact@example.com"
        alternateName="Example Corp"
        foundingDate="2010-01-01"
        legalName="Example Corporation Inc."
        taxID="123456789"
        vatID="FR12345678901"
        duns="123456789"
        leiCode="529900T8BM49AURSDO55"
        naics="54151"
        globalLocationNumber="1234567890123"
        iso6523Code="0199:724500PMK2A2M1SQQ228"
        numberOfEmployees={2056}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Organization");
    expect(jsonData.name).toBe("Example Corporation");
    expect(jsonData.url).toBe("https://www.example.com");
    expect(jsonData.logo).toBe("https://www.example.com/logo.png");
    expect(jsonData.description).toBe(
      "The example corporation is well-known for producing high-quality widgets",
    );
    expect(jsonData.sameAs).toHaveLength(2);
    expect(jsonData.address["@type"]).toBe("PostalAddress");
    expect(jsonData.contactPoint["@type"]).toBe("ContactPoint");
    expect(jsonData.telephone).toBe("+47-99-999-9999");
    expect(jsonData.email).toBe("contact@example.com");
    expect(jsonData.alternateName).toBe("Example Corp");
    expect(jsonData.foundingDate).toBe("2010-01-01");
    expect(jsonData.legalName).toBe("Example Corporation Inc.");
    expect(jsonData.taxID).toBe("123456789");
    expect(jsonData.vatID).toBe("FR12345678901");
    expect(jsonData.duns).toBe("123456789");
    expect(jsonData.leiCode).toBe("529900T8BM49AURSDO55");
    expect(jsonData.naics).toBe("54151");
    expect(jsonData.globalLocationNumber).toBe("1234567890123");
    expect(jsonData.iso6523Code).toBe("0199:724500PMK2A2M1SQQ228");
    expect(jsonData.numberOfEmployees.value).toBe(2056);
  });

  it("handles OnlineStore with merchant return policy", () => {
    const merchantReturnPolicy = {
      "@type": "MerchantReturnPolicy" as const,
      applicableCountry: ["FR", "CH"],
      returnPolicyCountry: "FR",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 60,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
      refundType: "https://schema.org/FullRefund",
    };

    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMerchantReturnPolicy={merchantReturnPolicy}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("OnlineStore");
    expect(jsonData.hasMerchantReturnPolicy).toEqual(merchantReturnPolicy);
  });

  it("handles OnlineStore with member program", () => {
    const memberProgram = {
      "@type": "MemberProgram" as const,
      name: "Membership Plus",
      description:
        "For frequent shoppers this is our top-rated loyalty program",
      url: "https://www.example.com/membership-plus",
      hasTiers: [
        {
          "@type": "MemberProgramTier" as const,
          "@id": "#plus-tier-silver",
          name: "silver",
          url: "https://www.example.com/membership-plus-silver",
          hasTierBenefit: [
            "https://schema.org/TierBenefitLoyaltyPoints" as TierBenefit,
          ],
          membershipPointsEarned: 5,
        },
      ],
    };

    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={memberProgram}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@type"]).toBe("OnlineStore");
    expect(jsonData.hasMemberProgram).toEqual(memberProgram);
  });

  it("handles MemberProgram without @type", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={{
          name: "Rewards Club",
          description: "Earn points on every purchase",
          hasTiers: {
            name: "bronze",
            hasTierBenefit: "TierBenefitLoyaltyPoints",
            membershipPointsEarned: 2,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasMemberProgram["@type"]).toBe("MemberProgram");
    expect(jsonData.hasMemberProgram.name).toBe("Rewards Club");
    expect(jsonData.hasMemberProgram.hasTiers["@type"]).toBe(
      "MemberProgramTier",
    );
    expect(jsonData.hasMemberProgram.hasTiers.hasTierBenefit).toBe(
      "https://schema.org/TierBenefitLoyaltyPoints",
    );
    expect(jsonData.hasMemberProgram.hasTiers.membershipPointsEarned).toEqual({
      "@type": "QuantitativeValue",
      value: 2,
    });
  });

  it("handles MemberProgram with multiple tiers and requirements", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={{
          name: "Premium Rewards",
          description: "Multi-tier loyalty program",
          url: "https://example.com/rewards",
          hasTiers: [
            {
              name: "silver",
              hasTierBenefit: ["TierBenefitLoyaltyPoints"],
              membershipPointsEarned: 5,
            },
            {
              name: "gold",
              hasTierBenefit: [
                "TierBenefitLoyaltyPoints",
                "TierBenefitLoyaltyPrice",
              ],
              hasTierRequirement: {
                name: "Example Gold Card",
              },
              membershipPointsEarned: 10,
            },
            {
              name: "platinum",
              hasTierBenefit: [
                "TierBenefitLoyaltyPoints",
                "TierBenefitLoyaltyPrice",
              ],
              hasTierRequirement: {
                value: 1000,
                currency: "USD",
              },
              membershipPointsEarned: {
                value: 15,
                unitText: "points per dollar",
              },
            },
          ],
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    const program = jsonData.hasMemberProgram;
    expect(program["@type"]).toBe("MemberProgram");
    expect(program.hasTiers).toHaveLength(3);

    // Check silver tier (no requirement)
    expect(program.hasTiers[0]["@type"]).toBe("MemberProgramTier");
    expect(program.hasTiers[0].name).toBe("silver");
    expect(program.hasTiers[0].hasTierRequirement).toBeUndefined();

    // Check gold tier (CreditCard requirement)
    expect(program.hasTiers[1].hasTierRequirement).toEqual({
      "@type": "CreditCard",
      name: "Example Gold Card",
    });

    // Check platinum tier (MonetaryAmount requirement)
    expect(program.hasTiers[2].hasTierRequirement).toEqual({
      "@type": "MonetaryAmount",
      value: 1000,
      currency: "USD",
    });
    expect(program.hasTiers[2].membershipPointsEarned).toEqual({
      "@type": "QuantitativeValue",
      value: 15,
      unitText: "points per dollar",
    });
  });

  it("handles tier requirement as UnitPriceSpecification", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={{
          name: "Subscription Rewards",
          description: "Rewards for subscribers",
          hasTiers: {
            name: "premium",
            hasTierBenefit: "TierBenefitLoyaltyPrice",
            hasTierRequirement: {
              price: 9.99,
              priceCurrency: "EUR",
              billingDuration: 12,
              billingIncrement: 1,
              unitCode: "MON",
            },
            membershipPointsEarned: 100,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    const tier = jsonData.hasMemberProgram.hasTiers;
    expect(tier.hasTierRequirement).toEqual({
      "@type": "UnitPriceSpecification",
      price: 9.99,
      priceCurrency: "EUR",
      billingDuration: 12,
      billingIncrement: 1,
      unitCode: "MON",
    });
  });

  it("handles tier requirement as text description", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={{
          name: "Community Program",
          description: "Community-based rewards",
          hasTiers: {
            name: "volunteer",
            hasTierBenefit: "TierBenefitLoyaltyPrice",
            hasTierRequirement:
              "Purchase a share in our coop and volunteer a minimum of 1 day a month",
            membershipPointsEarned: 50,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    const tier = jsonData.hasMemberProgram.hasTiers;
    expect(tier.hasTierRequirement).toBe(
      "Purchase a share in our coop and volunteer a minimum of 1 day a month",
    );
  });

  it("handles array of member programs", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Example Online Store"
        hasMemberProgram={[
          {
            name: "Basic Rewards",
            description: "Simple points program",
            hasTiers: {
              name: "member",
              hasTierBenefit: "TierBenefitLoyaltyPoints",
              membershipPointsEarned: 1,
            },
          },
          {
            name: "Premium Club",
            description: "Exclusive benefits",
            hasTiers: {
              name: "vip",
              hasTierBenefit: [
                "TierBenefitLoyaltyPoints",
                "TierBenefitLoyaltyPrice",
              ],
              membershipPointsEarned: 5,
            },
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasMemberProgram).toHaveLength(2);
    expect(jsonData.hasMemberProgram[0]["@type"]).toBe("MemberProgram");
    expect(jsonData.hasMemberProgram[0].name).toBe("Basic Rewards");
    expect(jsonData.hasMemberProgram[1]["@type"]).toBe("MemberProgram");
    expect(jsonData.hasMemberProgram[1].name).toBe("Premium Club");
  });

  it("does not include merchant properties for Organization type", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="Organization"
        name="Example Corp"
        hasMerchantReturnPolicy={{
          "@type": "MerchantReturnPolicy",
          returnPolicyCountry: "US",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.hasMerchantReturnPolicy).toBeUndefined();
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Example Corp"
        scriptId="custom-id"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector('script[id="custom-id"]');
    expect(script).toBeTruthy();
  });

  it("handles array of contact points", () => {
    const { container } = render(
      <OrganizationJsonLd
        name="Multi-Contact Corp"
        contactPoint={[
          {
            telephone: "+1-800-SALES",
            contactType: "sales",
          },
          {
            telephone: "+1-800-SUPPORT",
            contactType: "customer support",
          },
          {
            telephone: "+44-20-1234-5678",
            contactType: "sales",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.contactPoint).toHaveLength(3);
    expect(jsonData.contactPoint[0]).toEqual({
      "@type": "ContactPoint",
      telephone: "+1-800-SALES",
      contactType: "sales",
    });
    expect(jsonData.contactPoint[1]).toEqual({
      "@type": "ContactPoint",
      telephone: "+1-800-SUPPORT",
      contactType: "customer support",
    });
    expect(jsonData.contactPoint[2]).toEqual({
      "@type": "ContactPoint",
      telephone: "+44-20-1234-5678",
      contactType: "sales",
    });
  });

  it("handles OnlineStore with array of merchant return policies", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Multi-Policy Store"
        hasMerchantReturnPolicy={[
          {
            applicableCountry: "US",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail",
          },
          {
            applicableCountry: "CA",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 60,
            returnMethod: "https://schema.org/ReturnInStore",
            returnFees: "https://schema.org/FreeReturn",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("OnlineStore");
    expect(jsonData.hasMerchantReturnPolicy).toHaveLength(2);
    expect(jsonData.hasMerchantReturnPolicy[0]).toEqual({
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["US"],
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: ["https://schema.org/ReturnByMail"],
    });
    expect(jsonData.hasMerchantReturnPolicy[1]).toEqual({
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["CA"],
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 60,
      returnMethod: ["https://schema.org/ReturnInStore"],
      returnFees: "https://schema.org/FreeReturn",
    });
  });

  it("handles OnlineStore with enhanced merchant return policy features", () => {
    const { container } = render(
      <OrganizationJsonLd
        type="OnlineStore"
        name="Advanced Online Store"
        hasMerchantReturnPolicy={{
          applicableCountry: ["DE", "AT", "CH"],
          returnPolicyCountry: "IE",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 60,
          returnFees: "https://schema.org/ReturnShippingFees",
          returnShippingFeesAmount: {
            value: 2.99,
            currency: "EUR",
          },
          customerRemorseReturnFees: "https://schema.org/ReturnShippingFees",
          customerRemorseReturnShippingFeesAmount: {
            value: 5.99,
            currency: "EUR",
          },
          itemDefectReturnFees: "https://schema.org/FreeReturn",
          restockingFee: {
            value: 10,
            currency: "EUR",
          },
          returnPolicySeasonalOverride: {
            startDate: "2025-12-01",
            endDate: "2025-01-05",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
          },
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData["@type"]).toBe("OnlineStore");
    const policy = jsonData.hasMerchantReturnPolicy;
    expect(policy["@type"]).toBe("MerchantReturnPolicy");
    expect(policy.returnShippingFeesAmount).toEqual({
      "@type": "MonetaryAmount",
      value: 2.99,
      currency: "EUR",
    });
    expect(policy.customerRemorseReturnShippingFeesAmount).toEqual({
      "@type": "MonetaryAmount",
      value: 5.99,
      currency: "EUR",
    });
    expect(policy.restockingFee).toEqual({
      "@type": "MonetaryAmount",
      value: 10,
      currency: "EUR",
    });
    expect(policy.returnPolicySeasonalOverride).toEqual({
      "@type": "MerchantReturnPolicySeasonalOverride",
      startDate: "2025-12-01",
      endDate: "2025-01-05",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
    });
  });
});
