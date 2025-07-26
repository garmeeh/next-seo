import { DiscussionForumPostingJsonLd } from "next-seo";

export default function DiscussionForumPage() {
  return (
    <div className="container mx-auto p-8">
      <DiscussionForumPostingJsonLd
        headline="I went to the concert!"
        text="Look at how cool this concert was!"
        author="Katie Pope"
        datePublished="2024-01-01T08:00:00+00:00"
        url="https://example.com/forum/very-popular-thread"
        comment={[
          {
            text: "Who's the person you're with?",
            author: "Saul Douglas",
            datePublished: "2024-01-01T09:46:02+00:00",
          },
          {
            text: "That's my mom, isn't she cool?",
            author: "Katie Pope",
            datePublished: "2024-01-01T09:50:25+00:00",
          },
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>I went to the concert!</h1>
        <div className="text-sm text-gray-600 mb-4">
          Posted by Katie Pope on January 1, 2024
        </div>
        <p>Look at how cool this concert was!</p>

        <div className="mt-8 space-y-4">
          <h2>Comments</h2>
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-semibold">Saul Douglas</p>
            <p>Who's the person you're with?</p>
          </div>
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-semibold">Katie Pope</p>
            <p>That's my mom, isn't she cool?</p>
          </div>
        </div>
      </article>
    </div>
  );
}
