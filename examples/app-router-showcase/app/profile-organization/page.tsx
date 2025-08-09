import { ProfilePageJsonLd } from "next-seo";

export default function OrganizationProfilePage() {
  return (
    <div className="container mx-auto p-8">
      <ProfilePageJsonLd
        mainEntity={{
          "@type": "Organization",
          name: "TechForum Community",
          url: "https://techforum.example.com",
          logo: "https://techforum.example.com/logo.png",
          alternateName: "TechForum",
          identifier: "org-789012",
          description: "A vibrant community for technology enthusiasts",
          sameAs: [
            "https://twitter.com/techforum",
            "https://linkedin.com/company/techforum",
            "https://github.com/techforum",
          ],
          interactionStatistic: [
            {
              interactionType: "https://schema.org/FollowAction",
              userInteractionCount: 15000,
            },
            {
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: 45000,
            },
          ],
          agentInteractionStatistic: {
            interactionType: "https://schema.org/WriteAction",
            userInteractionCount: 8500,
          },
        }}
        dateCreated="2020-01-15T09:00:00-05:00"
        dateModified="2024-12-26T16:30:00-05:00"
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">TechForum Community</h1>
              <p className="text-xl text-gray-600">@TechForum</p>
              <p className="text-gray-700 mt-1">
                A vibrant community for technology enthusiasts
              </p>
              <a
                href="https://techforum.example.com"
                className="text-blue-600 hover:underline text-sm mt-1 inline-block"
              >
                techforum.example.com
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-700">
              TechForum Community is a leading online platform where technology
              enthusiasts, professionals, and learners come together to share
              knowledge, discuss latest trends, and collaborate on innovative
              projects. Founded in 2020, we've grown to become one of the most
              active tech communities online.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Followers</h3>
              <p className="text-3xl font-bold text-blue-600">15K</p>
            </div>
            <div className="bg-green-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Total Likes</h3>
              <p className="text-3xl font-bold text-green-600">45K</p>
            </div>
            <div className="bg-purple-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Posts</h3>
              <p className="text-3xl font-bold text-purple-600">8.5K</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://twitter.com/techforum"
                className="flex items-center p-3 border rounded hover:bg-gray-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-blue-400 mr-2">🐦</span>
                Twitter
              </a>
              <a
                href="https://linkedin.com/company/techforum"
                className="flex items-center p-3 border rounded hover:bg-gray-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-blue-700 mr-2">💼</span>
                LinkedIn
              </a>
              <a
                href="https://github.com/techforum"
                className="flex items-center p-3 border rounded hover:bg-gray-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mr-2">🐙</span>
                GitHub
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold">
                  New AI & Machine Learning Section
                </h3>
                <p className="text-gray-600 text-sm">Posted 3 days ago</p>
                <p className="text-gray-700 mt-1">
                  We've launched a dedicated section for AI and ML
                  discussions...
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold">
                  Community Hackathon 2025 Announced
                </h3>
                <p className="text-gray-600 text-sm">Posted 1 week ago</p>
                <p className="text-gray-700 mt-1">
                  Join us for our annual hackathon event this March...
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold">15,000 Members Milestone!</h3>
                <p className="text-gray-600 text-sm">Posted 2 weeks ago</p>
                <p className="text-gray-700 mt-1">
                  We're thrilled to announce that our community has reached...
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Organization ID: org-789012</p>
            <p>Founded: January 15, 2020</p>
            <p>Last updated: December 26, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
