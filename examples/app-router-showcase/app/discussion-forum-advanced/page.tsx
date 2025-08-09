import { DiscussionForumPostingJsonLd } from "next-seo";

export default function DiscussionForumAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <DiscussionForumPostingJsonLd
        headline="Very Popular Thread About Concerts"
        text="I went to an amazing concert last night! The atmosphere was electric and the band played all their hits."
        image={[
          "https://example.com/concert-photo1.jpg",
          {
            url: "https://example.com/concert-photo2.jpg",
            width: 1200,
            height: 800,
            caption: "The main stage",
          },
        ]}
        video={{
          name: "Concert Highlights",
          contentUrl: "https://example.com/concert-video.mp4",
          uploadDate: "2024-01-02T10:00:00+00:00",
          thumbnailUrl: "https://example.com/concert-thumbnail.jpg",
          description: "Best moments from the concert",
        }}
        url="https://example.com/forum/concerts/very-popular-thread"
        author={{
          name: "Katie Pope",
          url: "https://example.com/user/katie-pope",
        }}
        datePublished="2024-01-01T08:34:34+00:00"
        dateModified="2024-01-01T09:00:00+00:00"
        interactionStatistic={[
          {
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: 127,
          },
          {
            interactionType: "https://schema.org/ViewAction",
            userInteractionCount: 3420,
          },
          {
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: 23,
          },
        ]}
        isPartOf={{
          name: "Concert Discussions",
          url: "https://example.com/forum/concerts",
        }}
        sharedContent={{
          url: "https://example.com/concert-tickets",
          name: "Concert Venue Information",
          description: "Details about the venue and upcoming shows",
        }}
        comment={[
          {
            text: "This should not be this popular",
            author: {
              name: "Forum Critic",
              url: "https://example.com/user/forum-critic",
            },
            datePublished: "2024-01-01T09:00:00+00:00",
            interactionStatistic: {
              interactionType: "https://schema.org/DislikeAction",
              userInteractionCount: 5,
            },
            comment: [
              {
                text: "Yes it should, it's a great post!",
                author: "Happy Fan",
                datePublished: "2024-01-01T09:30:00+00:00",
                interactionStatistic: {
                  interactionType: "https://schema.org/LikeAction",
                  userInteractionCount: 15,
                },
              },
            ],
          },
          {
            text: "I was at the same concert! Here's my video:",
            author: {
              name: "Concert Goer",
              url: "https://example.com/user/concert-goer",
            },
            datePublished: "2024-01-01T10:00:00+00:00",
            video: {
              name: "My Concert Video",
              contentUrl: "https://example.com/user-concert-video.mp4",
              uploadDate: "2024-01-01T11:00:00+00:00",
              thumbnailUrl: "https://example.com/user-video-thumb.jpg",
              description: "My perspective from the crowd",
            },
          },
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>Very Popular Thread About Concerts</h1>
        <div className="text-sm text-gray-600 mb-4">
          Posted by <a href="https://example.com/user/katie-pope">Katie Pope</a>{" "}
          on January 1, 2024
          <br />
          127 likes · 3,420 views · 23 comments
        </div>

        <p>
          I went to an amazing concert last night! The atmosphere was electric
          and the band played all their hits.
        </p>

        <div className="my-4 bg-gray-100 p-4 rounded">
          <h3>Shared Link:</h3>
          <a href="https://example.com/concert-tickets">
            Concert Venue Information
          </a>
          <p className="text-sm">Details about the venue and upcoming shows</p>
        </div>

        <div className="mt-8 space-y-4">
          <h2>Comments</h2>

          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-semibold">
              <a href="https://example.com/user/forum-critic">Forum Critic</a>
              <span className="text-sm text-gray-500 ml-2">5 dislikes</span>
            </p>
            <p>This should not be this popular</p>

            <div className="ml-8 mt-2 border-l-4 border-gray-100 pl-4">
              <p className="font-semibold">
                Happy Fan
                <span className="text-sm text-gray-500 ml-2">15 likes</span>
              </p>
              <p>Yes it should, it's a great post!</p>
            </div>
          </div>

          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-semibold">
              <a href="https://example.com/user/concert-goer">Concert Goer</a>
            </p>
            <p>I was at the same concert! Here's my video:</p>
            <div className="mt-2">
              <video controls className="w-full max-w-md">
                <source
                  src="https://example.com/user-concert-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
