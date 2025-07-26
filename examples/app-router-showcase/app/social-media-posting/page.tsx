import { DiscussionForumPostingJsonLd } from "next-seo";

export default function SocialMediaPostingPage() {
  return (
    <div className="container mx-auto p-8">
      <DiscussionForumPostingJsonLd
        type="SocialMediaPosting"
        author={{
          name: "TechInfluencer",
          url: "https://example.com/user/techinfluencer",
        }}
        datePublished="2024-01-15T14:30:00+00:00"
        text="Just discovered this amazing new AI tool that's revolutionizing content creation! Check it out 🚀"
        sharedContent={{
          url: "https://example.com/ai-tool-review",
          name: "Revolutionary AI Tool for Content Creators",
          description:
            "A comprehensive review of the latest AI tool that's changing how we create content",
        }}
        interactionStatistic={[
          {
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: 342,
          },
          {
            interactionType: "https://schema.org/ShareAction",
            userInteractionCount: 89,
          },
          {
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: 5678,
          },
        ]}
        comment={[
          {
            text: "Thanks for sharing! I've been looking for something like this.",
            author: "ContentCreator123",
            datePublished: "2024-01-15T15:00:00+00:00",
          },
          {
            text: "How does this compare to other AI tools on the market?",
            author: {
              name: "CuriousDev",
              url: "https://example.com/user/curiousdev",
            },
            datePublished: "2024-01-15T15:30:00+00:00",
          },
        ]}
      />

      <article className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              TI
            </div>
            <div className="ml-3">
              <a
                href="https://example.com/user/techinfluencer"
                className="font-semibold text-lg"
              >
                TechInfluencer
              </a>
              <p className="text-sm text-gray-500">
                January 15, 2024 at 2:30 PM
              </p>
            </div>
          </div>

          <p className="mb-4">
            Just discovered this amazing new AI tool that's revolutionizing
            content creation! Check it out 🚀
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">
              <a
                href="https://example.com/ai-tool-review"
                className="text-blue-600 hover:underline"
              >
                Revolutionary AI Tool for Content Creators
              </a>
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              A comprehensive review of the latest AI tool that's changing how
              we create content
            </p>
          </div>

          <div className="flex items-center justify-between text-gray-600 border-t pt-3">
            <span>👍 342</span>
            <span>🔄 89 shares</span>
            <span>👁️ 5,678 views</span>
          </div>

          <div className="mt-6 space-y-4 border-t pt-4">
            <h3 className="font-semibold">Comments</h3>

            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold text-sm">ContentCreator123</p>
              <p className="text-sm">
                Thanks for sharing! I've been looking for something like this.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                January 15, 2024 at 3:00 PM
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold text-sm">
                <a
                  href="https://example.com/user/curiousdev"
                  className="text-blue-600"
                >
                  CuriousDev
                </a>
              </p>
              <p className="text-sm">
                How does this compare to other AI tools on the market?
              </p>
              <p className="text-xs text-gray-500 mt-1">
                January 15, 2024 at 3:30 PM
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
