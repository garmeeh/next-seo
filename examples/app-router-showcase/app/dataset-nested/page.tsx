import { DatasetJsonLd } from "next-seo";

export default function DatasetNestedPage() {
  return (
    <div className="container mx-auto p-8">
      <DatasetJsonLd
        name="World Climate Database 2020-2024"
        description="Comprehensive global climate database containing regional climate datasets from all continents. This parent dataset aggregates climate measurements from North America, Europe, Asia, and other regions."
        url="https://example.com/datasets/world-climate-database"
        identifier="https://doi.org/10.1000/world-climate-2024"
        keywords={[
          "climate",
          "global",
          "weather",
          "temperature",
          "aggregate dataset",
        ]}
        license="https://creativecommons.org/publicdomain/zero/1.0/"
        isAccessibleForFree={true}
        creator={{
          name: "Global Climate Research Consortium",
          url: "https://example.com/gcrc",
        }}
        hasPart={[
          {
            "@type": "Dataset",
            name: "North America Climate Data 2020-2024",
            description:
              "Climate measurements from weather stations across North America including temperature, precipitation, and wind data.",
            url: "https://example.com/datasets/na-climate-2024",
            license: "https://creativecommons.org/publicdomain/zero/1.0/",
            creator: {
              "@type": "Organization",
              name: "North American Weather Service",
            },
            distribution: {
              "@type": "DataDownload",
              contentUrl: "https://example.com/data/na-climate.csv",
              encodingFormat: "CSV",
            },
            spatialCoverage: {
              "@type": "Place",
              name: "North America",
            },
          },
          {
            "@type": "Dataset",
            name: "Europe Climate Data 2020-2024",
            description:
              "Comprehensive climate data from European monitoring stations with hourly measurements.",
            url: "https://example.com/datasets/eu-climate-2024",
            license: "https://creativecommons.org/publicdomain/zero/1.0/",
            creator: {
              "@type": "Organization",
              name: "European Climate Agency",
            },
            distribution: {
              "@type": "DataDownload",
              contentUrl: "https://example.com/data/eu-climate.csv",
              encodingFormat: "CSV",
            },
            spatialCoverage: {
              "@type": "Place",
              name: "Europe",
            },
          },
          {
            "@type": "Dataset",
            name: "Asia Pacific Climate Data 2020-2024",
            description:
              "Climate observations from the Asia Pacific region including monsoon patterns and tropical systems.",
            url: "https://example.com/datasets/apac-climate-2024",
            license: "https://creativecommons.org/publicdomain/zero/1.0/",
            creator: {
              "@type": "Organization",
              name: "Asia Pacific Climate Center",
            },
            distribution: {
              "@type": "DataDownload",
              contentUrl: "https://example.com/data/apac-climate.csv",
              encodingFormat: "CSV",
            },
            spatialCoverage: {
              "@type": "Place",
              name: "Asia Pacific",
            },
          },
        ]}
        distribution={{
          contentUrl: "https://example.com/data/world-climate-complete.zip",
          encodingFormat: "ZIP",
          contentSize: "12.5GB",
          description: "Complete aggregated dataset with all regional data",
        }}
        temporalCoverage="2020-01-01/2024-12-31"
        spatialCoverage="Global"
        variableMeasured={[
          "temperature",
          "precipitation",
          "wind speed",
          "humidity",
        ]}
      />

      <main className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-6">
          World Climate Database 2020-2024
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm">
            <strong>Aggregate Dataset:</strong> This parent dataset contains 3
            regional sub-datasets
          </p>
        </div>

        <section className="prose max-w-none mb-8">
          <h2>Overview</h2>
          <p>
            Comprehensive global climate database containing regional climate
            datasets from all continents. This parent dataset aggregates climate
            measurements from North America, Europe, Asia, and other regions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Dataset Structure</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Parent dataset (aggregated)</li>
                <li>3 regional sub-datasets</li>
                <li>Unified data schema</li>
                <li>Consistent temporal coverage</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Global coverage</li>
                <li>5-year time span</li>
                <li>Hourly measurements</li>
                <li>Quality controlled</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Component Datasets</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                🌎 North America Climate Data 2020-2024
              </h3>
              <p className="text-gray-700 mb-3">
                Climate measurements from weather stations across North America
                including temperature, precipitation, and wind data.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">
                  Provider: North American Weather Service
                </span>
                <span className="text-gray-600">Format: CSV</span>
              </div>
              <a
                href="https://example.com/datasets/na-climate-2024"
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View dataset →
              </a>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                🌍 Europe Climate Data 2020-2024
              </h3>
              <p className="text-gray-700 mb-3">
                Comprehensive climate data from European monitoring stations
                with hourly measurements.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">
                  Provider: European Climate Agency
                </span>
                <span className="text-gray-600">Format: CSV</span>
              </div>
              <a
                href="https://example.com/datasets/eu-climate-2024"
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View dataset →
              </a>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                🌏 Asia Pacific Climate Data 2020-2024
              </h3>
              <p className="text-gray-700 mb-3">
                Climate observations from the Asia Pacific region including
                monsoon patterns and tropical systems.
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">
                  Provider: Asia Pacific Climate Center
                </span>
                <span className="text-gray-600">Format: CSV</span>
              </div>
              <a
                href="https://example.com/datasets/apac-climate-2024"
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View dataset →
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Download Complete Dataset</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <p className="mb-4">
              Download the complete aggregated dataset containing all regional
              data in a single archive.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://example.com/data/world-climate-complete.zip"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download Complete Dataset (ZIP, 12.5GB)
              </a>
              <span className="text-sm text-gray-600">
                Contains all 3 regional datasets
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Hierarchy</h2>
          <div className="bg-gray-100 p-6 rounded">
            <pre className="text-sm">
              {`World Climate Database 2020-2024 (Parent)
├── North America Climate Data 2020-2024
├── Europe Climate Data 2020-2024
└── Asia Pacific Climate Data 2020-2024`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
