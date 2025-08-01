import { VideoJsonLd } from "next-seo";

export default function VideoPage() {
  return (
    <div className="container mx-auto p-8">
      <VideoJsonLd
        name="How to Make a Perfect Chocolate Cake"
        description="Learn how to make the perfect chocolate cake with this easy step-by-step recipe tutorial"
        thumbnailUrl="https://example.com/chocolate-cake-thumbnail.jpg"
        uploadDate="2024-01-15T08:00:00+00:00"
        contentUrl="https://example.com/videos/chocolate-cake-recipe.mp4"
        embedUrl="https://example.com/embed/chocolate-cake-recipe"
        duration="PT10M30S"
      />

      <main className="prose lg:prose-xl mx-auto">
        <h1>How to Make a Perfect Chocolate Cake</h1>

        <div className="aspect-w-16 aspect-h-9 mb-8">
          <iframe
            src="https://example.com/embed/chocolate-cake-recipe"
            title="How to Make a Perfect Chocolate Cake"
            className="w-full rounded-lg shadow-lg"
            allowFullScreen
          />
        </div>

        <p className="lead">
          Learn how to make the perfect chocolate cake with this easy
          step-by-step recipe tutorial. This recipe has been perfected over
          years and guarantees a moist, rich chocolate cake every time.
        </p>

        <section>
          <h2>Video Details</h2>
          <ul>
            <li>
              <strong>Duration:</strong> 10 minutes 30 seconds
            </li>
            <li>
              <strong>Uploaded:</strong> January 15, 2024
            </li>
            <li>
              <strong>Format:</strong> MP4 (1080p)
            </li>
          </ul>
        </section>

        <section>
          <h2>About This Recipe</h2>
          <p>
            This chocolate cake recipe has been passed down through generations
            and refined to perfection. In this video, we'll walk you through
            every step, from measuring ingredients to the final decoration.
          </p>
        </section>
      </main>
    </div>
  );
}
