import { DatasetJsonLd } from "next-seo";

export default function DatasetCatalogPage() {
  return (
    <div className="container mx-auto p-8">
      <DatasetJsonLd
        name="Ocean Temperature Time Series 2023"
        description="Daily ocean temperature measurements from Pacific Ocean monitoring stations. Part of the larger Pacific Ocean Climate Monitoring Program dataset collection."
        url="https://example.com/datasets/ocean-temp-2023"
        identifier="https://doi.org/10.5000/ocean-temp-2023"
        keywords={["ocean", "temperature", "Pacific", "climate", "time series"]}
        license="https://creativecommons.org/licenses/by/4.0/"
        isAccessibleForFree={true}
        creator={{
          name: "Pacific Ocean Research Institute",
          url: "https://example.com/pori",
          logo: "https://example.com/pori-logo.png",
        }}
        includedInDataCatalog={{
          name: "Pacific Ocean Climate Data Catalog",
          url: "https://example.com/pacific-climate-catalog",
          description:
            "Comprehensive collection of Pacific Ocean climate datasets",
        }}
        distribution={{
          contentUrl: "https://example.com/data/ocean-temp-2023.csv",
          encodingFormat: "CSV",
          contentSize: "156MB",
        }}
        temporalCoverage="2023-01-01/2023-12-31"
        spatialCoverage={{
          name: "Pacific Ocean",
          geo: {
            box: "-60 120 60 -80",
          },
        }}
        variableMeasured={[
          {
            name: "Sea Surface Temperature",
            value: "degrees Celsius",
            propertyID: "SST",
          },
          {
            name: "Temperature at 10m depth",
            value: "degrees Celsius",
            propertyID: "T10",
          },
        ]}
      />

      <main className="max-w-4xl">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-sm text-blue-800">
            Part of the <strong>Pacific Ocean Climate Data Catalog</strong>
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Ocean Temperature Time Series 2023
        </h1>

        <section className="prose max-w-none mb-8">
          <h2>Dataset Overview</h2>
          <p>
            Daily ocean temperature measurements from Pacific Ocean monitoring
            stations. Part of the larger Pacific Ocean Climate Monitoring
            Program dataset collection.
          </p>

          <div className="bg-gray-100 p-4 rounded my-4">
            <h3 className="text-lg font-semibold mb-2">Quick Facts</h3>
            <ul className="list-none space-y-1">
              <li>
                📅 <strong>Period:</strong> January 1 - December 31, 2023
              </li>
              <li>
                📍 <strong>Coverage:</strong> Pacific Ocean
              </li>
              <li>
                📊 <strong>Size:</strong> 156MB
              </li>
              <li>
                📄 <strong>Format:</strong> CSV
              </li>
              <li>
                🔓 <strong>License:</strong> CC BY 4.0
              </li>
            </ul>
          </div>

          <h2>Variables Included</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Variable</th>
                <th className="border p-2 text-left">Unit</th>
                <th className="border p-2 text-left">Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Sea Surface Temperature</td>
                <td className="border p-2">degrees Celsius</td>
                <td className="border p-2 font-mono">SST</td>
              </tr>
              <tr>
                <td className="border p-2">Temperature at 10m depth</td>
                <td className="border p-2">degrees Celsius</td>
                <td className="border p-2 font-mono">T10</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Catalog</h2>
          <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h3 className="text-xl font-semibold mb-2">
              Pacific Ocean Climate Data Catalog
            </h3>
            <p className="text-gray-700 mb-4">
              This dataset is part of a comprehensive collection of Pacific
              Ocean climate datasets maintained by the Pacific Ocean Research
              Institute.
            </p>
            <a
              href="https://example.com/pacific-climate-catalog"
              className="text-blue-600 hover:underline"
            >
              Browse all datasets in this catalog →
            </a>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Download</h2>
          <div className="flex gap-4">
            <a
              href="https://example.com/data/ocean-temp-2023.csv"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download Dataset (CSV, 156MB)
            </a>
            <a
              href="https://doi.org/10.5000/ocean-temp-2023"
              className="inline-block px-6 py-3 border border-gray-300 rounded hover:bg-gray-50"
            >
              View DOI Record
            </a>
          </div>
        </section>

        <footer className="text-sm text-gray-600 border-t pt-4">
          <p>
            Dataset provided by the Pacific Ocean Research Institute. Licensed
            under Creative Commons Attribution 4.0 International.
          </p>
        </footer>
      </main>
    </div>
  );
}
