import { DatasetJsonLd } from "next-seo";

export default function DatasetPage() {
  return (
    <div className="container mx-auto p-8">
      <DatasetJsonLd
        name="NCDC Storm Events Database"
        description="Storm Data is provided by the National Weather Service (NWS) and contain statistics on personal injuries and damage estimates."
        url="https://example.com/dataset/storm-events"
        creator="NOAA"
        distribution={{
          contentUrl: "https://www.ncdc.noaa.gov/stormevents/ftp.jsp",
          encodingFormat: "CSV",
        }}
        keywords={["storm", "weather", "climate", "natural disasters"]}
        isAccessibleForFree={true}
      />

      <main className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">NCDC Storm Events Database</h1>

        <div className="bg-gray-100 p-4 rounded mb-6">
          <p className="text-sm text-gray-600 mb-2">Dataset Information</p>
          <p className="font-semibold">Format: CSV</p>
          <p className="font-semibold">Access: Free</p>
          <p className="font-semibold">Provider: NOAA</p>
        </div>

        <section className="prose max-w-none">
          <h2>Description</h2>
          <p>
            Storm Data is provided by the National Weather Service (NWS) and
            contain statistics on personal injuries and damage estimates.
          </p>

          <h2>Keywords</h2>
          <div className="flex gap-2 mt-2">
            {["storm", "weather", "climate", "natural disasters"].map(
              (keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ),
            )}
          </div>

          <h2>Download</h2>
          <a
            href="https://www.ncdc.noaa.gov/stormevents/ftp.jsp"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download CSV Dataset
          </a>
        </section>
      </main>
    </div>
  );
}
