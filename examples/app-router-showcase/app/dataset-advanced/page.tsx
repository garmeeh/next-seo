import { DatasetJsonLd } from "next-seo";

export default function DatasetAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <DatasetJsonLd
        name="Global Climate Data 2020-2024"
        description="Comprehensive climate measurements including temperature, precipitation, and atmospheric data collected from weather stations worldwide. This dataset provides hourly observations from over 10,000 weather stations globally, enabling detailed climate analysis and research."
        url="https://example.com/datasets/global-climate-2020-2024"
        sameAs={[
          "https://doi.org/10.1000/182",
          "https://data.gov/dataset/climate-2020-2024",
        ]}
        identifier={[
          "https://doi.org/10.1000/182",
          {
            value: "ark:/12345/fk1234",
            propertyID: "ARK",
          },
        ]}
        keywords={[
          "climate",
          "temperature",
          "precipitation",
          "weather",
          "atmospheric data",
          "global warming",
          "climate change",
        ]}
        license={{
          name: "Creative Commons Zero v1.0 Universal",
          url: "https://creativecommons.org/publicdomain/zero/1.0/",
        }}
        isAccessibleForFree={true}
        creator={[
          {
            name: "National Centers for Environmental Information",
            url: "https://www.ncei.noaa.gov/",
            contactPoint: {
              contactType: "customer service",
              telephone: "+1-828-271-4800",
              email: "ncei.orders@noaa.gov",
            },
          },
          "Dr. Jane Smith",
          "Dr. John Doe",
        ]}
        funder={{
          name: "National Science Foundation",
          sameAs: "https://ror.org/021nxhr62",
        }}
        includedInDataCatalog={{
          name: "data.gov",
          url: "https://data.gov",
        }}
        distribution={[
          {
            contentUrl: "https://example.com/data/climate-2020-2024.csv",
            encodingFormat: "CSV",
            contentSize: "2.5GB",
            description: "Complete dataset in CSV format with all measurements",
          },
          {
            contentUrl: "https://example.com/data/climate-2020-2024.json",
            encodingFormat: "JSON",
            contentSize: "3.1GB",
            description:
              "Complete dataset in JSON format for programmatic access",
          },
          {
            contentUrl: "https://example.com/data/climate-2020-2024.nc",
            encodingFormat: "NetCDF",
            contentSize: "1.8GB",
            description: "NetCDF format optimized for scientific analysis",
          },
        ]}
        temporalCoverage="2020-01-01/2024-12-31"
        spatialCoverage={{
          name: "Global Coverage",
          geo: {
            box: "-90 -180 90 180",
          },
        }}
        measurementTechnique={[
          "Satellite observation",
          "Ground station measurements",
          "Weather balloon data",
          "Ocean buoy sensors",
        ]}
        variableMeasured={[
          "temperature",
          "precipitation",
          {
            name: "Atmospheric Pressure",
            value: "hectopascals",
            propertyID: "PRES",
          },
          {
            name: "Wind Speed",
            value: "meters per second",
            propertyID: "WSPD",
          },
          {
            name: "Relative Humidity",
            value: "percentage",
            propertyID: "RHUM",
          },
        ]}
        version="2.1"
        alternateName={[
          "Global Climate Dataset 2020-2024",
          "GCD-2024",
          "World Climate Data Collection",
        ]}
        citation={[
          "Smith, J. et al. (2024) Global Climate Patterns 2020-2024. Nature Climate Change. https://doi.org/10.1038/s41558-024-01234",
          {
            name: "Global Climate Data Technical Report",
            url: "https://example.com/reports/climate-2024-technical",
            identifier: "TR-2024-001",
          },
        ]}
      />

      <main className="max-w-6xl">
        <h1 className="text-4xl font-bold mb-6">
          Global Climate Data 2020-2024
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Coverage</h3>
            <p className="text-sm">Global</p>
            <p className="text-sm">2020-2024</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Access</h3>
            <p className="text-sm">Free & Open</p>
            <p className="text-sm">CC0 License</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Version</h3>
            <p className="text-sm">2.1</p>
            <p className="text-sm">3 Formats</p>
          </div>
        </div>

        <section className="prose max-w-none mb-8">
          <h2>About This Dataset</h2>
          <p>
            Comprehensive climate measurements including temperature,
            precipitation, and atmospheric data collected from weather stations
            worldwide. This dataset provides hourly observations from over
            10,000 weather stations globally, enabling detailed climate analysis
            and research.
          </p>

          <h2>Variables Measured</h2>
          <ul>
            <li>Temperature (Celsius)</li>
            <li>Precipitation (mm)</li>
            <li>Atmospheric Pressure (hectopascals)</li>
            <li>Wind Speed (meters per second)</li>
            <li>Relative Humidity (percentage)</li>
          </ul>

          <h2>Data Collection Methods</h2>
          <ul>
            <li>Satellite observation</li>
            <li>Ground station measurements</li>
            <li>Weather balloon data</li>
            <li>Ocean buoy sensors</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Download Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">CSV Format</h3>
              <p className="text-sm text-gray-600 mb-3">
                2.5GB - Complete dataset
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Download CSV
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">JSON Format</h3>
              <p className="text-sm text-gray-600 mb-3">
                3.1GB - Programmatic access
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Download JSON
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">NetCDF Format</h3>
              <p className="text-sm text-gray-600 mb-3">
                1.8GB - Scientific analysis
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Download NetCDF
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Citation</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-mono text-sm">
              Smith, J. et al. (2024) Global Climate Patterns 2020-2024. Nature
              Climate Change. https://doi.org/10.1038/s41558-024-01234
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p>
            National Centers for Environmental Information
            <br />
            Email: ncei.orders@noaa.gov
            <br />
            Phone: +1-828-271-4800
          </p>
        </section>
      </main>
    </div>
  );
}
