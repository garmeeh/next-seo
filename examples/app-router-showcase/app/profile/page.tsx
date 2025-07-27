import { ProfilePageJsonLd } from "next-seo";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-8">
      <ProfilePageJsonLd
        mainEntity="Angelo Huff"
        dateCreated="2024-12-23T12:34:00-05:00"
        dateModified="2024-12-26T14:53:00-05:00"
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full mr-6"></div>
            <div>
              <h1 className="text-3xl font-bold">Angelo Huff</h1>
              <p className="text-gray-600">Member since December 23, 2024</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">
              Welcome to my profile! I'm passionate about technology and sharing
              knowledge.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold text-gray-700">Followers</h3>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold text-gray-700">Posts</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent activity to show.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
