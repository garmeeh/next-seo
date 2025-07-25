import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DatasetJsonLd from "./DatasetJsonLd";

describe("DatasetJsonLd", () => {
  it("renders basic Dataset with minimal props", () => {
    const { container } = render(
      <DatasetJsonLd
        name="NCDC Storm Events Database"
        description="Storm Data is provided by the National Weather Service (NWS)"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "NCDC Storm Events Database",
      description:
        "Storm Data is provided by the National Weather Service (NWS)",
    });
  });

  it("handles string creator", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        creator="John Doe"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.creator).toEqual({
      "@type": "Person",
      name: "John Doe",
    });
  });

  it("handles multiple creators", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        creator={[
          "Jane Smith",
          {
            name: "Research Institute",
            logo: "https://example.com/logo.png",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.creator).toEqual([
      {
        "@type": "Person",
        name: "Jane Smith",
      },
      {
        "@type": "Organization",
        name: "Research Institute",
        logo: "https://example.com/logo.png",
      },
    ]);
  });

  it("handles spatial coverage as string", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        spatialCoverage="Tahoe City, CA"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.spatialCoverage).toBe("Tahoe City, CA");
  });

  it("handles spatial coverage with GeoCoordinates", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        spatialCoverage={{
          name: "Test Location",
          geo: {
            latitude: 39.328,
            longitude: 120.1633,
          },
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.spatialCoverage).toEqual({
      "@type": "Place",
      name: "Test Location",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 39.328,
        longitude: 120.1633,
      },
    });
  });

  it("handles spatial coverage with GeoShape", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        spatialCoverage={{
          geo: {
            box: "39.3280 120.1633 40.445 123.7878",
          },
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.spatialCoverage).toEqual({
      "@type": "Place",
      geo: {
        "@type": "GeoShape",
        box: "39.3280 120.1633 40.445 123.7878",
      },
    });
  });

  it("handles single distribution", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        distribution={{
          contentUrl: "https://example.com/data.csv",
          encodingFormat: "CSV",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.distribution).toEqual({
      "@type": "DataDownload",
      contentUrl: "https://example.com/data.csv",
      encodingFormat: "CSV",
    });
  });

  it("handles multiple distributions", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        distribution={[
          {
            contentUrl: "https://example.com/data.csv",
            encodingFormat: "CSV",
          },
          {
            contentUrl: "https://example.com/data.json",
            encodingFormat: "JSON",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.distribution).toEqual([
      {
        "@type": "DataDownload",
        contentUrl: "https://example.com/data.csv",
        encodingFormat: "CSV",
      },
      {
        "@type": "DataDownload",
        contentUrl: "https://example.com/data.json",
        encodingFormat: "JSON",
      },
    ]);
  });

  it("handles string identifier", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        identifier="https://doi.org/10.1000/182"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.identifier).toBe("https://doi.org/10.1000/182");
  });

  it("handles PropertyValue identifier", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        identifier={{
          value: "10.1000/182",
          propertyID: "DOI",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.identifier).toEqual({
      "@type": "PropertyValue",
      value: "10.1000/182",
      propertyID: "DOI",
    });
  });

  it("handles array of identifiers", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        identifier={[
          "https://doi.org/10.1000/182",
          {
            value: "ark:/12345/fk1234",
            propertyID: "ARK",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.identifier).toEqual([
      "https://doi.org/10.1000/182",
      {
        "@type": "PropertyValue",
        value: "ark:/12345/fk1234",
        propertyID: "ARK",
      },
    ]);
  });

  it("handles string license", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        license="https://creativecommons.org/publicdomain/zero/1.0/"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.license).toBe(
      "https://creativecommons.org/publicdomain/zero/1.0/",
    );
  });

  it("handles CreativeWork license", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        license={{
          name: "Custom License",
          url: "https://example.com/license",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.license).toEqual({
      "@type": "CreativeWork",
      name: "Custom License",
      url: "https://example.com/license",
    });
  });

  it("handles variableMeasured as string", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        variableMeasured="temperature"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.variableMeasured).toBe("temperature");
  });

  it("handles variableMeasured as PropertyValue", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        variableMeasured={{
          name: "Temperature",
          value: "celsius",
        }}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.variableMeasured).toEqual({
      "@type": "PropertyValue",
      name: "Temperature",
      value: "celsius",
    });
  });

  it("handles variableMeasured as array", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        variableMeasured={[
          "temperature",
          {
            name: "Pressure",
            value: "pascals",
          },
        ]}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.variableMeasured).toEqual([
      "temperature",
      {
        "@type": "PropertyValue",
        name: "Pressure",
        value: "pascals",
      },
    ]);
  });

  it("handles isAccessibleForFree as false", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        isAccessibleForFree={false}
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData.isAccessibleForFree).toBe(false);
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Complete Dataset"
        description="A comprehensive dataset with all properties"
        url="https://example.com/dataset"
        sameAs={["https://other.com/dataset", "https://another.com/dataset"]}
        identifier="https://doi.org/10.1000/182"
        keywords={["climate", "weather", "storm"]}
        license="https://creativecommons.org/publicdomain/zero/1.0/"
        isAccessibleForFree={true}
        creator={{
          name: "NOAA",
          url: "https://www.noaa.gov/",
          logo: "https://www.noaa.gov/logo.png",
        }}
        funder="National Science Foundation"
        includedInDataCatalog={{
          name: "data.gov",
          url: "https://data.gov",
        }}
        distribution={{
          contentUrl: "https://example.com/data.csv",
          encodingFormat: "CSV",
        }}
        temporalCoverage="1950-01-01/2013-12-18"
        spatialCoverage="United States"
        alternateName={["Storm Database", "Weather Events"]}
        citation="Doe J (2014) Analysis of storm data"
        measurementTechnique="Satellite observation"
        variableMeasured="wind speed"
        version="2.0"
      />,
    );

    const jsonData = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );

    expect(jsonData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Complete Dataset",
      description: "A comprehensive dataset with all properties",
      url: "https://example.com/dataset",
      sameAs: ["https://other.com/dataset", "https://another.com/dataset"],
      identifier: "https://doi.org/10.1000/182",
      keywords: ["climate", "weather", "storm"],
      license: "https://creativecommons.org/publicdomain/zero/1.0/",
      isAccessibleForFree: true,
      temporalCoverage: "1950-01-01/2013-12-18",
      spatialCoverage: "United States",
      alternateName: ["Storm Database", "Weather Events"],
      citation: "Doe J (2014) Analysis of storm data",
      measurementTechnique: "Satellite observation",
      variableMeasured: "wind speed",
      version: "2.0",
    });

    expect(jsonData.creator).toEqual({
      "@type": "Organization",
      name: "NOAA",
      url: "https://www.noaa.gov/",
      logo: "https://www.noaa.gov/logo.png",
    });

    expect(jsonData.funder).toEqual({
      "@type": "Person",
      name: "National Science Foundation",
    });
  });

  it("handles custom scriptId and scriptKey", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Test Dataset"
        description="Test description"
        scriptId="custom-id"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script?.getAttribute("id")).toBe("custom-id");
    expect(script?.getAttribute("data-testid")).toBe("custom-id");
  });

  it("handles hasPart property", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Parent Dataset"
        description="A dataset with parts"
        hasPart={[
          {
            "@type": "Dataset",
            name: "Part 1",
            description: "First part of the dataset",
          },
          {
            "@type": "Dataset",
            name: "Part 2",
            description: "Second part of the dataset",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.hasPart).toHaveLength(2);
    expect(jsonData.hasPart[0]).toEqual({
      "@type": "Dataset",
      name: "Part 1",
      description: "First part of the dataset",
    });
    expect(jsonData.hasPart[1]).toEqual({
      "@type": "Dataset",
      name: "Part 2",
      description: "Second part of the dataset",
    });
  });

  it("handles isPartOf property", () => {
    const { container } = render(
      <DatasetJsonLd
        name="Sub Dataset"
        description="A dataset that is part of another"
        isPartOf={{
          "@type": "Dataset",
          name: "Parent Dataset",
          url: "https://example.com/parent-dataset",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);

    expect(jsonData.isPartOf).toEqual({
      "@type": "Dataset",
      name: "Parent Dataset",
      url: "https://example.com/parent-dataset",
    });
  });
});
