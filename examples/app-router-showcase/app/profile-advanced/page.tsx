import { ProfilePageJsonLd } from "next-seo";

export default function AdvancedProfilePage() {
  return (
    <div className="container mx-auto p-8">
      <ProfilePageJsonLd
        mainEntity={{
          name: "Angelo Huff",
          alternateName: "ahuff23",
          identifier: "123475623",
          description: "Defender of Truth",
          image: "https://example.com/avatars/ahuff23.jpg",
          sameAs: [
            "https://www.example.com/real-angelo",
            "https://example.com/profile/therealangelohuff",
          ],
          interactionStatistic: [
            {
              interactionType: "https://schema.org/FollowAction",
              userInteractionCount: 1,
            },
            {
              interactionType: "https://schema.org/LikeAction",
              userInteractionCount: 5,
            },
          ],
          agentInteractionStatistic: {
            interactionType: "https://schema.org/WriteAction",
            userInteractionCount: 2346,
          },
        }}
        dateCreated="2024-12-23T12:34:00-05:00"
        dateModified="2024-12-26T14:53:00-05:00"
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <img
              src="https://example.com/avatars/ahuff23.jpg"
              alt="Angelo Huff"
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold">Angelo Huff</h1>
              <p className="text-xl text-gray-600">@ahuff23</p>
              <p className="text-gray-700 mt-1">Defender of Truth</p>
              <p className="text-sm text-gray-500 mt-2">ID: 123475623</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-700">
              I'm a passionate advocate for truth and transparency in the
              digital age. With years of experience in fact-checking and digital
              forensics, I help communities identify and combat misinformation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Followers</h3>
              <p className="text-3xl font-bold text-blue-600">1</p>
            </div>
            <div className="bg-green-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Likes Given</h3>
              <p className="text-3xl font-bold text-green-600">5</p>
            </div>
            <div className="bg-purple-50 p-4 rounded text-center">
              <h3 className="font-semibold text-gray-700">Posts Written</h3>
              <p className="text-3xl font-bold text-purple-600">2,346</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">External Profiles</h2>
            <div className="space-y-2">
              <a
                href="https://www.example.com/real-angelo"
                className="block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Personal Website
              </a>
              <a
                href="https://example.com/profile/therealangelohuff"
                className="block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Professional Profile
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold">How to Verify Sources Online</h3>
                <p className="text-gray-600 text-sm">Posted 2 days ago</p>
                <p className="text-gray-700 mt-1">
                  A comprehensive guide to fact-checking and source
                  verification...
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold">
                  The Importance of Digital Literacy
                </h3>
                <p className="text-gray-600 text-sm">Posted 1 week ago</p>
                <p className="text-gray-700 mt-1">
                  In today's interconnected world, understanding how to
                  navigate...
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Profile created: December 23, 2024</p>
            <p>Last updated: December 26, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
