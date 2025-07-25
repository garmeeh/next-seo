import { test, expect } from "@playwright/test";

test.describe("DatasetJsonLd", () => {
  test("renders basic Dataset structured data", async ({ page }) => {
    await page.goto("/dataset");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonLdScript).toBeTruthy();

    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic structure
    expect(jsonData["@context"]).toBe("https://schema.org");
    expect(jsonData["@type"]).toBe("Dataset");
    expect(jsonData.name).toBe("NCDC Storm Events Database");
    expect(jsonData.description).toContain(
      "Storm Data is provided by the National Weather Service",
    );
    expect(jsonData.url).toBe("https://example.com/dataset/storm-events");
    expect(jsonData.isAccessibleForFree).toBe(true);
    expect(jsonData.keywords).toEqual([
      "storm",
      "weather",
      "climate",
      "natural disasters",
    ]);

    // Verify creator
    expect(jsonData.creator).toEqual({
      "@type": "Person",
      name: "NOAA",
    });

    // Verify distribution
    expect(jsonData.distribution).toEqual({
      "@type": "DataDownload",
      contentUrl: "https://www.ncdc.noaa.gov/stormevents/ftp.jsp",
      encodingFormat: "CSV",
    });
  });

  test("renders advanced Dataset with all features", async ({ page }) => {
    await page.goto("/dataset-advanced");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify comprehensive properties
    expect(jsonData.name).toBe("Global Climate Data 2020-2024");
    expect(jsonData.sameAs).toEqual([
      "https://doi.org/10.1000/182",
      "https://data.gov/dataset/climate-2020-2024",
    ]);

    // Verify identifiers
    expect(jsonData.identifier).toHaveLength(2);
    expect(jsonData.identifier[0]).toBe("https://doi.org/10.1000/182");
    expect(jsonData.identifier[1]).toEqual({
      "@type": "PropertyValue",
      value: "ark:/12345/fk1234",
      propertyID: "ARK",
    });

    // Verify license
    expect(jsonData.license).toEqual({
      "@type": "CreativeWork",
      name: "Creative Commons Zero v1.0 Universal",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    });

    // Verify creators array
    expect(jsonData.creator).toHaveLength(3);
    expect(jsonData.creator[0]["@type"]).toBe("Organization");
    expect(jsonData.creator[0].name).toBe(
      "National Centers for Environmental Information",
    );
    expect(jsonData.creator[0].contactPoint).toEqual({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+1-828-271-4800",
      email: "ncei.orders@noaa.gov",
    });
    expect(jsonData.creator[1]).toEqual({
      "@type": "Person",
      name: "Dr. Jane Smith",
    });

    // Verify funder
    expect(jsonData.funder).toEqual({
      "@type": "Organization",
      name: "National Science Foundation",
      sameAs: "https://ror.org/021nxhr62",
    });

    // Verify included in data catalog
    expect(jsonData.includedInDataCatalog).toEqual({
      "@type": "DataCatalog",
      name: "data.gov",
      url: "https://data.gov",
    });

    // Verify distributions
    expect(jsonData.distribution).toHaveLength(3);
    expect(jsonData.distribution[0]).toEqual({
      "@type": "DataDownload",
      contentUrl: "https://example.com/data/climate-2020-2024.csv",
      encodingFormat: "CSV",
      contentSize: "2.5GB",
      description: "Complete dataset in CSV format with all measurements",
    });

    // Verify temporal and spatial coverage
    expect(jsonData.temporalCoverage).toBe("2020-01-01/2024-12-31");
    expect(jsonData.spatialCoverage).toEqual({
      "@type": "Place",
      name: "Global Coverage",
      geo: {
        "@type": "GeoShape",
        box: "-90 -180 90 180",
      },
    });

    // Verify measurement technique
    expect(jsonData.measurementTechnique).toEqual([
      "Satellite observation",
      "Ground station measurements",
      "Weather balloon data",
      "Ocean buoy sensors",
    ]);

    // Verify variable measured
    expect(jsonData.variableMeasured).toHaveLength(5);
    expect(jsonData.variableMeasured[0]).toBe("temperature");
    expect(jsonData.variableMeasured[2]).toEqual({
      "@type": "PropertyValue",
      name: "Atmospheric Pressure",
      value: "hectopascals",
      propertyID: "PRES",
    });

    // Verify other properties
    expect(jsonData.version).toBe("2.1");
    expect(jsonData.alternateName).toEqual([
      "Global Climate Dataset 2020-2024",
      "GCD-2024",
      "World Climate Data Collection",
    ]);
    expect(jsonData.citation).toHaveLength(2);
  });

  test("renders Dataset with catalog inclusion", async ({ page }) => {
    await page.goto("/dataset-catalog");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify basic info
    expect(jsonData.name).toBe("Ocean Temperature Time Series 2023");
    expect(jsonData.identifier).toBe("https://doi.org/10.5000/ocean-temp-2023");

    // Verify creator as organization
    expect(jsonData.creator).toEqual({
      "@type": "Organization",
      name: "Pacific Ocean Research Institute",
      url: "https://example.com/pori",
      logo: "https://example.com/pori-logo.png",
    });

    // Verify data catalog inclusion
    expect(jsonData.includedInDataCatalog).toEqual({
      "@type": "DataCatalog",
      name: "Pacific Ocean Climate Data Catalog",
      url: "https://example.com/pacific-climate-catalog",
      description: "Comprehensive collection of Pacific Ocean climate datasets",
    });

    // Verify spatial coverage with GeoShape
    expect(jsonData.spatialCoverage).toEqual({
      "@type": "Place",
      name: "Pacific Ocean",
      geo: {
        "@type": "GeoShape",
        box: "-60 120 60 -80",
      },
    });

    // Verify variable measured array
    expect(jsonData.variableMeasured).toHaveLength(2);
    expect(jsonData.variableMeasured[0]).toEqual({
      "@type": "PropertyValue",
      name: "Sea Surface Temperature",
      value: "degrees Celsius",
      propertyID: "SST",
    });
  });

  test("renders Dataset with nested structure (hasPart)", async ({ page }) => {
    await page.goto("/dataset-nested");

    const jsonLdScript = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const jsonData = JSON.parse(jsonLdScript!);

    // Verify parent dataset
    expect(jsonData.name).toBe("World Climate Database 2020-2024");
    expect(jsonData["@type"]).toBe("Dataset");

    // Verify hasPart contains sub-datasets
    expect(jsonData.hasPart).toHaveLength(3);

    // Check first sub-dataset
    const firstSubDataset = jsonData.hasPart[0];
    expect(firstSubDataset["@type"]).toBe("Dataset");
    expect(firstSubDataset.name).toBe("North America Climate Data 2020-2024");
    expect(firstSubDataset.creator).toEqual({
      "@type": "Organization",
      name: "North American Weather Service",
    });
    expect(firstSubDataset.distribution).toEqual({
      "@type": "DataDownload",
      contentUrl: "https://example.com/data/na-climate.csv",
      encodingFormat: "CSV",
    });
    expect(firstSubDataset.spatialCoverage).toEqual({
      "@type": "Place",
      name: "North America",
    });

    // Check second sub-dataset
    const secondSubDataset = jsonData.hasPart[1];
    expect(secondSubDataset.name).toBe("Europe Climate Data 2020-2024");
    expect(secondSubDataset.creator.name).toBe("European Climate Agency");

    // Check third sub-dataset
    const thirdSubDataset = jsonData.hasPart[2];
    expect(thirdSubDataset.name).toBe("Asia Pacific Climate Data 2020-2024");
    expect(thirdSubDataset.spatialCoverage.name).toBe("Asia Pacific");

    // Verify parent dataset properties
    expect(jsonData.distribution).toEqual({
      "@type": "DataDownload",
      contentUrl: "https://example.com/data/world-climate-complete.zip",
      encodingFormat: "ZIP",
      contentSize: "12.5GB",
      description: "Complete aggregated dataset with all regional data",
    });

    expect(jsonData.spatialCoverage).toBe("Global");
    expect(jsonData.variableMeasured).toEqual([
      "temperature",
      "precipitation",
      "wind speed",
      "humidity",
    ]);
  });
});
