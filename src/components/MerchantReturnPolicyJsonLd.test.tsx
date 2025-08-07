import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MerchantReturnPolicyJsonLd from "./MerchantReturnPolicyJsonLd";

describe("MerchantReturnPolicyJsonLd", () => {
  it("renders basic return policy with minimal props (Option A)", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["US"],
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
    });
  });

  it("renders return policy with merchantReturnLink only (Option B)", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd merchantReturnLink="https://example.com/returns" />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "MerchantReturnPolicy",
      merchantReturnLink: "https://example.com/returns",
    });
  });

  it("handles multiple applicable countries", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry={["US", "CA", "MX"]}
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={60}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.applicableCountry).toEqual(["US", "CA", "MX"]);
  });

  it("handles return shipping fees as MonetaryAmount", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        returnFees="https://schema.org/ReturnShippingFees"
        returnShippingFeesAmount={{
          value: 9.99,
          currency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.returnShippingFeesAmount).toEqual({
      "@type": "MonetaryAmount",
      value: 9.99,
      currency: "USD",
    });
  });

  it("handles restocking fee as percentage number", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        restockingFee={15}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.restockingFee).toBe(15);
  });

  it("handles restocking fee as MonetaryAmount", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        restockingFee={{
          value: 25,
          currency: "USD",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.restockingFee).toEqual({
      "@type": "MonetaryAmount",
      value: 25,
      currency: "USD",
    });
  });

  it("handles customer remorse specific properties", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        customerRemorseReturnFees="https://schema.org/ReturnShippingFees"
        customerRemorseReturnShippingFeesAmount={{
          value: 5.99,
          currency: "EUR",
        }}
        customerRemorseReturnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.customerRemorseReturnFees).toBe(
      "https://schema.org/ReturnShippingFees",
    );
    expect(jsonData.customerRemorseReturnShippingFeesAmount).toEqual({
      "@type": "MonetaryAmount",
      value: 5.99,
      currency: "EUR",
    });
    expect(jsonData.customerRemorseReturnLabelSource).toBe(
      "https://schema.org/ReturnLabelDownloadAndPrint",
    );
  });

  it("handles item defect specific properties", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={30}
        itemDefectReturnFees="https://schema.org/FreeReturn"
        itemDefectReturnLabelSource="https://schema.org/ReturnLabelInBox"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.itemDefectReturnFees).toBe("https://schema.org/FreeReturn");
    expect(jsonData.itemDefectReturnLabelSource).toBe(
      "https://schema.org/ReturnLabelInBox",
    );
  });

  it("handles single seasonal override", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={60}
        returnPolicySeasonalOverride={{
          startDate: "2024-11-29",
          endDate: "2024-12-06",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 10,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.returnPolicySeasonalOverride).toEqual({
      "@type": "MerchantReturnPolicySeasonalOverride",
      startDate: "2024-11-29",
      endDate: "2024-12-06",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 10,
    });
  });

  it("handles multiple seasonal overrides", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnUnlimitedWindow"
        returnPolicySeasonalOverride={[
          {
            startDate: "2024-11-29",
            endDate: "2024-12-06",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 10,
          },
          {
            startDate: "2024-12-26",
            endDate: "2025-01-06",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 10,
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.returnPolicySeasonalOverride).toHaveLength(2);
    expect(jsonData.returnPolicySeasonalOverride[0]["@type"]).toBe(
      "MerchantReturnPolicySeasonalOverride",
    );
    expect(jsonData.returnPolicySeasonalOverride[1]["@type"]).toBe(
      "MerchantReturnPolicySeasonalOverride",
    );
  });

  it("handles all properties comprehensively", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        scriptId="return-policy"
        scriptKey="return-policy-key"
        applicableCountry={["DE", "AT", "CH"]}
        returnPolicyCountry="IE"
        returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
        merchantReturnDays={60}
        itemCondition={[
          "https://schema.org/NewCondition",
          "https://schema.org/DamagedCondition",
        ]}
        returnMethod={[
          "https://schema.org/ReturnByMail",
          "https://schema.org/ReturnInStore",
        ]}
        returnFees="https://schema.org/ReturnShippingFees"
        returnShippingFeesAmount={{
          value: 2.99,
          currency: "EUR",
        }}
        refundType={[
          "https://schema.org/FullRefund",
          "https://schema.org/ExchangeRefund",
        ]}
        restockingFee={{
          value: 10,
          currency: "EUR",
        }}
        returnLabelSource="https://schema.org/ReturnLabelInBox"
        customerRemorseReturnFees="https://schema.org/ReturnShippingFees"
        customerRemorseReturnShippingFeesAmount={{
          value: 5.99,
          currency: "EUR",
        }}
        customerRemorseReturnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
        itemDefectReturnFees="https://schema.org/FreeReturn"
        itemDefectReturnLabelSource="https://schema.org/ReturnLabelInBox"
        returnPolicySeasonalOverride={{
          startDate: "2025-12-01",
          endDate: "2025-01-05",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    expect(script!.id).toBe("return-policy");

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("MerchantReturnPolicy");
    expect(jsonData.applicableCountry).toEqual(["DE", "AT", "CH"]);
    expect(jsonData.returnPolicyCountry).toEqual(["IE"]);
    expect(jsonData.merchantReturnDays).toBe(60);
    expect(jsonData.itemCondition).toEqual([
      "https://schema.org/NewCondition",
      "https://schema.org/DamagedCondition",
    ]);
    expect(jsonData.returnMethod).toEqual([
      "https://schema.org/ReturnByMail",
      "https://schema.org/ReturnInStore",
    ]);
    expect(jsonData.refundType).toEqual([
      "https://schema.org/FullRefund",
      "https://schema.org/ExchangeRefund",
    ]);
  });

  it("handles no return policy scenario", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnNotPermitted"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "MerchantReturnPolicy",
      applicableCountry: ["US"],
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    });
  });

  it("handles unlimited return window", () => {
    const { container } = render(
      <MerchantReturnPolicyJsonLd
        applicableCountry="US"
        returnPolicyCategory="https://schema.org/MerchantReturnUnlimitedWindow"
        returnMethod="https://schema.org/ReturnByMail"
        refundType="https://schema.org/FullRefund"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.returnPolicyCategory).toBe(
      "https://schema.org/MerchantReturnUnlimitedWindow",
    );
    expect(jsonData.merchantReturnDays).toBeUndefined();
  });
});
