import { ProductJsonLd } from "next-seo";

export default function ProductCertificationPage() {
  return (
    <div className="container mx-auto p-8">
      <ProductJsonLd
        name="Energy Efficient Refrigerator - 500L"
        description="A++ rated energy efficient refrigerator with advanced cooling technology and smart features"
        url="https://example.com/products/energy-efficient-fridge"
        image={[
          "https://example.com/fridge-1x1.jpg",
          "https://example.com/fridge-4x3.jpg",
          "https://example.com/fridge-16x9.jpg",
        ]}
        sku="FRIDGE-EE-500L"
        mpn="REF500EE"
        gtin14="00012345678905"
        brand="EcoAppliances"
        hasCertification={[
          {
            issuedBy: {
              name: "European_Commission",
            },
            name: "EPREL",
            url: "https://eprel.ec.europa.eu/screen/product/refrigerators/123456",
            certificationIdentification: "123456",
            certificationRating: {
              ratingValue: "A++",
              bestRating: "A+++",
              worstRating: "G",
            },
          },
          {
            issuedBy: {
              name: "ENERGY STAR",
            },
            name: "ENERGY_STAR_Certified",
            url: "https://www.energystar.gov/products/123456",
          },
        ]}
        offers={{
          price: 899.0,
          priceCurrency: "EUR",
          availability: "InStock",
          priceValidUntil: "2024-12-31",
        }}
        aggregateRating={{
          ratingValue: 4.5,
          reviewCount: 234,
        }}
      />

      <div className="max-w-4xl">
        <nav className="mb-8">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>Home</li>
            <li>/</li>
            <li>Appliances</li>
            <li>/</li>
            <li>Refrigerators</li>
            <li>/</li>
            <li className="font-semibold text-gray-900">
              Energy Efficient Refrigerator - 500L
            </li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-[3/4] flex items-center justify-center relative">
              <span className="text-gray-500">Refrigerator Image</span>
              <div className="absolute top-4 left-4 bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">A++</div>
                <div className="text-xs">Energy</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
              <div className="bg-gray-200 rounded aspect-square"></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Energy Efficient Refrigerator - 500L
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">{"★★★★☆"}</div>
                <span className="text-gray-600">
                  4.5 out of 5 (234 reviews)
                </span>
              </div>
              <p className="text-gray-600">by EcoAppliances</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">€899.00</span>
                <span className="text-sm text-gray-500">EUR</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock</p>
              <p className="text-sm text-gray-500">
                Price valid until Dec 31, 2024
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-green-800">
                Energy Certifications
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white rounded p-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                      A++
                    </div>
                    <div>
                      <div className="font-medium">EU Energy Label</div>
                      <div className="text-xs text-gray-600">EPREL: 123456</div>
                    </div>
                  </div>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    View Certificate →
                  </a>
                </div>
                <div className="flex items-center justify-between bg-white rounded p-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      CERTIFIED
                    </div>
                    <div>
                      <div className="font-medium">ENERGY STAR®</div>
                      <div className="text-xs text-gray-600">
                        Most Efficient 2024
                      </div>
                    </div>
                  </div>
                  <a href="#" className="text-blue-600 text-sm hover:underline">
                    Verify →
                  </a>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
              <p className="font-semibold text-green-800">
                Save on Energy Bills
              </p>
              <p className="text-sm text-green-700">
                This A++ rated appliance uses 40% less energy than standard
                models, saving approximately €120 per year
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>SKU:</strong> FRIDGE-EE-500L
              </p>
              <p className="text-sm">
                <strong>MPN:</strong> REF500EE
              </p>
              <p className="text-sm">
                <strong>GTIN:</strong> 00012345678905
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700">
                Add to Cart
              </button>
              <button className="w-full border border-gray-300 py-3 px-6 rounded-lg font-medium hover:bg-gray-50">
                Compare Models
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Energy Performance</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Annual Consumption</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Energy:</dt>
                  <dd className="font-medium">180 kWh/year</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">CO2 Emissions:</dt>
                  <dd className="font-medium">90 kg/year</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Water:</dt>
                  <dd className="font-medium">N/A</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Noise Level:</dt>
                  <dd className="font-medium">38 dB</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Capacity</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Total:</dt>
                  <dd>500 L</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Refrigerator:</dt>
                  <dd>350 L</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Freezer:</dt>
                  <dd>150 L</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Climate Class:</dt>
                  <dd>SN-T</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• No Frost technology</li>
                <li>• Multi-zone cooling</li>
                <li>• LED interior lighting</li>
                <li>• Smart temperature control</li>
                <li>• Eco mode function</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">About Energy Labels</h3>
          <p className="text-sm text-gray-700 mb-3">
            The EU energy label provides clear and comparable information about
            the energy consumption of appliances. The scale ranges from A+++
            (most efficient) to G (least efficient).
          </p>
          <p className="text-sm text-gray-700">
            The EPREL (European Product Registry for Energy Labelling) number
            allows you to access detailed product information in the official EU
            database.
          </p>
        </div>
      </div>
    </div>
  );
}
