import { SoftwareApplicationJsonLd } from "next-seo";

export default function WebAppPage() {
  return (
    <div className="container mx-auto p-8">
      <SoftwareApplicationJsonLd
        type="WebApplication"
        name="CloudSync Pro - Team Collaboration Platform"
        description="Real-time collaboration platform for modern teams with document sharing, video conferencing, and project management"
        url="https://app.cloudsyncpro.com"
        image={{
          url: "https://example.com/cloudsync-logo.svg",
          width: 512,
          height: 512,
        }}
        applicationCategory="BusinessApplication"
        applicationSubCategory="TeamCollaboration"
        operatingSystem="Web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)"
        offers={[
          {
            price: 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://app.cloudsyncpro.com/signup/free",
          },
          {
            price: 12,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://app.cloudsyncpro.com/signup/pro",
          },
          {
            price: 25,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: "https://app.cloudsyncpro.com/signup/enterprise",
          },
        ]}
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 12500,
          reviewCount: 8900,
        }}
        review={[
          {
            author: {
              name: "TechStartup Inc.",
              "@type": "Organization",
            },
            reviewRating: { ratingValue: 5 },
            reviewBody:
              "CloudSync Pro transformed how our remote team collaborates. The real-time features are incredible!",
            datePublished: "2024-11-05",
          },
          {
            author: "David Kim",
            reviewRating: { ratingValue: 4 },
            reviewBody:
              "Excellent features and reliability. Would benefit from more integrations with design tools.",
            datePublished: "2024-10-20",
          },
        ]}
        screenshot={[
          {
            url: "https://example.com/screenshots/cloudsync-dashboard.png",
            caption: "Team dashboard with project overview",
          },
          {
            url: "https://example.com/screenshots/cloudsync-editor.png",
            caption: "Real-time collaborative document editor",
          },
          {
            url: "https://example.com/screenshots/cloudsync-video.png",
            caption: "Built-in video conferencing",
          },
          {
            url: "https://example.com/screenshots/cloudsync-kanban.png",
            caption: "Kanban board for project management",
          },
        ]}
        featureList={[
          "Real-time collaborative editing",
          "HD video conferencing (up to 100 participants)",
          "Unlimited cloud storage",
          "Advanced project management tools",
          "End-to-end encryption",
          "API access for integrations",
          "Mobile responsive design",
          "Offline mode with sync",
          "Two-factor authentication",
          "Custom branding options",
        ]}
        softwareVersion="8.5.3"
        datePublished="2018-09-01"
        dateModified="2024-11-25"
        author={{
          name: "CloudSync Technologies",
          url: "https://cloudsynctech.com",
        }}
        publisher={{
          name: "CloudSync Technologies Inc.",
          url: "https://cloudsynctech.com",
          logo: {
            url: "https://cloudsynctech.com/press/logo.png",
            width: 600,
            height: 60,
          },
          address: {
            streetAddress: "123 Tech Boulevard",
            addressLocality: "San Francisco",
            addressRegion: "CA",
            postalCode: "94105",
            addressCountry: "US",
          },
        }}
        countriesSupported={[
          "US",
          "CA",
          "GB",
          "DE",
          "FR",
          "ES",
          "IT",
          "NL",
          "SE",
          "NO",
          "DK",
          "FI",
          "AU",
          "NZ",
          "JP",
          "SG",
          "HK",
          "IN",
          "BR",
          "MX",
        ]}
      />

      <div className="max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-4">
            <span className="text-white text-3xl font-bold">CS</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">CloudSync Pro</h1>
          <p className="text-xl text-gray-600 mb-8">
            Where teams achieve more together
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Free Trial
            </a>
            <a
              href="#"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition"
            >
              View Demo
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">Free</h3>
            <p className="text-gray-600 mb-4">
              For individuals and small teams
            </p>
            <ul className="text-left space-y-2 text-sm">
              <li>✓ Up to 5 team members</li>
              <li>✓ 10GB storage</li>
              <li>✓ Basic features</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center border-2 border-purple-200">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">
              $12<span className="text-lg">/user/mo</span>
            </h3>
            <p className="text-gray-600 mb-4">For growing teams</p>
            <ul className="text-left space-y-2 text-sm">
              <li>✓ Unlimited team members</li>
              <li>✓ 1TB storage per user</li>
              <li>✓ Advanced features</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center">
            <h3 className="text-4xl font-bold text-green-600 mb-2">
              $25<span className="text-lg">/user/mo</span>
            </h3>
            <p className="text-gray-600 mb-4">For enterprises</p>
            <ul className="text-left space-y-2 text-sm">
              <li>✓ Everything in Pro</li>
              <li>✓ Unlimited storage</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Everything your team needs in one place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-gray-600">
                Work together on documents, spreadsheets, and presentations in
                real-time
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-2">Video Conferencing</h3>
              <p className="text-gray-600">
                HD video calls with screen sharing, recording, and up to 100
                participants
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p className="text-gray-600">
                Kanban boards, Gantt charts, and agile tools to keep projects on
                track
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                End-to-end encryption, SSO, 2FA, and compliance with SOC 2 and
                GDPR
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-semibold mb-2">1000+ Integrations</h3>
              <p className="text-gray-600">
                Connect with Slack, GitHub, Jira, Salesforce, and all your
                favorite tools
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Works Everywhere</h3>
              <p className="text-gray-600">
                Access from any browser, with dedicated apps for iOS and Android
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Trusted by teams worldwide
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">4.6/5</div>
                <div className="text-yellow-400">★★★★★</div>
                <div className="text-gray-600">12,500+ reviews</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">99.9%</div>
                <div className="text-gray-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Active teams</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600">2M+</div>
                <div className="text-gray-600">Daily users</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Browser Requirements</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              CloudSync Pro works best with modern browsers. For optimal
              performance, please use:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🌐</div>
                <p className="font-medium">Chrome</p>
                <p className="text-sm text-gray-600">Version 90+</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🦊</div>
                <p className="font-medium">Firefox</p>
                <p className="text-sm text-gray-600">Version 88+</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🧭</div>
                <p className="font-medium">Safari</p>
                <p className="text-sm text-gray-600">Version 14+</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔷</div>
                <p className="font-medium">Edge</p>
                <p className="text-sm text-gray-600">Version 90+</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Team Dashboard</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Document Editor</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Video Conference</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-500">Project Board</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
