import { OrganizationJsonLd } from "next-seo";

export default function OrganizationPage() {
  return (
    <div className="container mx-auto p-8">
      <OrganizationJsonLd
        name="Example Corporation"
        url="https://www.example.com"
        logo="https://www.example.com/logo.png"
        description="The example corporation is well-known for producing high-quality widgets"
        sameAs={[
          "https://twitter.com/example",
          "https://facebook.com/example",
          "https://linkedin.com/company/example",
        ]}
        telephone="+1-999-999-9999"
        email="contact@example.com"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Example Corporation</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Example Corporation is dedicated to producing the highest quality
            widgets in the industry. Since our founding, we have been committed
            to innovation, sustainability, and customer satisfaction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            <strong>Phone:</strong> +1-999-999-9999
            <br />
            <strong>Email:</strong> contact@example.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://twitter.com/example"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/example"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/example"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
