import { OrganizationJsonLd } from "next-seo";

export default function OrganizationAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <OrganizationJsonLd
        name="Global Widget Corporation"
        url="https://www.globalwidget.com"
        logo={{
          "@type": "ImageObject",
          url: "https://www.globalwidget.com/logo.png",
          width: 800,
          height: 600,
          caption: "Global Widget Corporation Logo",
        }}
        description="A multinational corporation specializing in innovative widget solutions with offices worldwide"
        sameAs={[
          "https://twitter.com/globalwidget",
          "https://facebook.com/globalwidget",
          "https://linkedin.com/company/global-widget-corp",
          "https://instagram.com/globalwidget",
        ]}
        address={[
          {
            "@type": "PostalAddress",
            streetAddress: "123 Tech Plaza, Suite 1000",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "456 Innovation Drive",
            addressLocality: "London",
            addressRegion: "England",
            postalCode: "EC2A 4BX",
            addressCountry: "GB",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "789 Business Center",
            addressLocality: "Tokyo",
            addressRegion: "Tokyo",
            postalCode: "100-0001",
            addressCountry: "JP",
          },
        ]}
        contactPoint={[
          {
            "@type": "ContactPoint",
            contactType: "Customer Service",
            telephone: "+1-800-123-4567",
            email: "support@globalwidget.com",
          },
          {
            "@type": "ContactPoint",
            contactType: "Sales",
            telephone: "+1-800-123-4568",
            email: "sales@globalwidget.com",
          },
          {
            "@type": "ContactPoint",
            contactType: "Technical Support",
            telephone: "+1-800-123-4569",
            email: "tech@globalwidget.com",
          },
        ]}
        telephone="+1-800-123-4567"
        email="info@globalwidget.com"
        alternateName="GWC"
        foundingDate="1995-03-15"
        legalName="Global Widget Corporation Inc."
        taxID="98-7654321"
        vatID="GB123456789"
        duns="123456789"
        leiCode="529900T8BM49AURSDO55"
        naics="334111"
        globalLocationNumber="0614141000001"
        iso6523Code="0088:0614141000001"
        numberOfEmployees={{
          "@type": "QuantitativeValue",
          minValue: 5000,
          maxValue: 10000,
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Global Widget Corporation</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About GWC</h2>
          <p className="text-gray-700 mb-4">
            Founded in 1995, Global Widget Corporation (GWC) has grown from a
            small startup to a multinational corporation with over 5,000
            employees worldwide. We specialize in innovative widget solutions
            that power businesses across the globe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Global Offices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Americas Headquarters</h3>
              <address className="text-gray-700 text-sm not-italic">
                123 Tech Plaza, Suite 1000
                <br />
                San Francisco, CA 94105
                <br />
                United States
              </address>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">EMEA Office</h3>
              <address className="text-gray-700 text-sm not-italic">
                456 Innovation Drive
                <br />
                London EC2A 4BX
                <br />
                United Kingdom
              </address>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">APAC Office</h3>
              <address className="text-gray-700 text-sm not-italic">
                789 Business Center
                <br />
                Tokyo 100-0001
                <br />
                Japan
              </address>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Departments</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Customer Service</h3>
              <p className="text-gray-700">
                Phone: +1-800-123-4567 | Email: support@globalwidget.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Sales</h3>
              <p className="text-gray-700">
                Phone: +1-800-123-4568 | Email: sales@globalwidget.com
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Technical Support</h3>
              <p className="text-gray-700">
                Phone: +1-800-123-4569 | Email: tech@globalwidget.com
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Corporate Information</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-semibold text-gray-600">Founded</dt>
              <dd className="text-gray-700">March 15, 1995</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-600">Legal Name</dt>
              <dd className="text-gray-700">Global Widget Corporation Inc.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-600">Employees</dt>
              <dd className="text-gray-700">5,000 - 10,000</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-600">Industry Code</dt>
              <dd className="text-gray-700">NAICS 334111</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
