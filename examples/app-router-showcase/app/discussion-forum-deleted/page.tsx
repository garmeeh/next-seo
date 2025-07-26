import { DiscussionForumPostingJsonLd } from "next-seo";

export default function DiscussionForumDeletedPage() {
  return (
    <div className="container mx-auto p-8">
      <DiscussionForumPostingJsonLd
        headline="[Deleted Post]"
        text="This post has been removed by the author or moderators."
        author="DeletedUser"
        datePublished="2024-01-10T10:00:00+00:00"
        dateModified="2024-01-10T15:00:00+00:00"
        url="https://example.com/forum/deleted-thread-12345"
        creativeWorkStatus="Deleted"
        comment={[
          {
            text: "Why was this deleted?",
            author: "CuriousUser",
            datePublished: "2024-01-10T16:00:00+00:00",
          },
          {
            text: "[This comment has been deleted]",
            author: "AnotherDeletedUser",
            datePublished: "2024-01-10T16:30:00+00:00",
            creativeWorkStatus: "Deleted",
          },
          {
            text: "The original post violated community guidelines.",
            author: {
              "@type": "Organization",
              name: "Forum Moderators",
              url: "https://example.com/moderators",
            },
            datePublished: "2024-01-10T17:00:00+00:00",
          },
        ]}
        isPartOf={{
          name: "General Discussion",
          url: "https://example.com/forum/general",
        }}
      />

      <article className="prose lg:prose-xl">
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
          <h1 className="text-gray-600">[Deleted Post]</h1>
          <div className="text-sm text-gray-500 mb-4">
            Posted by DeletedUser on January 10, 2024
            <br />
            <span className="text-red-600">
              Deleted on January 10, 2024 at 3:00 PM
            </span>
          </div>
          <p className="text-gray-600 italic">
            This post has been removed by the author or moderators.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <h2>Comments</h2>
          <p className="text-sm text-gray-600">
            Comments are preserved for context even though the original post has
            been deleted.
          </p>

          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-semibold">CuriousUser</p>
            <p>Why was this deleted?</p>
            <p className="text-xs text-gray-500">January 10, 2024 at 4:00 PM</p>
          </div>

          <div className="border-l-4 border-gray-200 pl-4 bg-gray-50 p-3 rounded">
            <p className="font-semibold text-gray-600">AnotherDeletedUser</p>
            <p className="text-gray-500 italic">
              [This comment has been deleted]
            </p>
            <p className="text-xs text-gray-500">January 10, 2024 at 4:30 PM</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-3 rounded">
            <p className="font-semibold">
              <a
                href="https://example.com/moderators"
                className="text-blue-600"
              >
                Forum Moderators
              </a>
              <span className="ml-2 text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                Official
              </span>
            </p>
            <p>The original post violated community guidelines.</p>
            <p className="text-xs text-gray-500">January 10, 2024 at 5:00 PM</p>
          </div>
        </div>
      </article>
    </div>
  );
}
