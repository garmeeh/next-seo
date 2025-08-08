import { ProductJsonLd } from "next-seo";

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Product with Nested Reviews</h1>
      <ProductJsonLd
        name="The Catcher in the Rye"
        brand="Penguin Books"
        description="The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind."
        sku="9780241984758"
        mpn="925872"
        image="https://example.com/catcher-in-the-rye-book-cover.jpg"
        review={[
          {
            reviewRating: {
              ratingValue: 5,
            },
            author: "John Doe",
            reviewBody:
              "A timeless classic that captures the essence of teenage angst perfectly.",
            datePublished: "2024-01-01",
          },
          {
            reviewRating: {
              ratingValue: 4,
            },
            author: {
              name: "Jane Smith",
              url: "https://example.com/reviewers/jane",
            },
            reviewBody: "Compelling narrative, though some parts feel dated.",
            datePublished: "2024-01-15",
          },
          {
            reviewRating: {
              ratingValue: 3,
            },
            author: "Literary Review Magazine",
            reviewBody:
              "While historically significant, modern readers may find it less relatable.",
            datePublished: "2024-02-01",
          },
        ]}
        aggregateRating={{
          ratingValue: 4.2,
          bestRating: 5,
          ratingCount: 150,
          reviewCount: 120,
        }}
        offers={{
          price: 12.99,
          priceCurrency: "USD",
          priceValidUntil: "2024-12-31",
          itemCondition: "NewCondition",
          availability: "InStock",
          seller: {
            name: "Book Emporium",
          },
        }}
      />
      <div className="prose max-w-none">
        <h2>Product Details</h2>
        <p>
          This example demonstrates how reviews can be nested within a Product
          using ProductJsonLd. The product includes multiple reviews from
          different authors and an aggregate rating summarizing all reviews.
        </p>
        <h3>Features Demonstrated:</h3>
        <ul>
          <li>Multiple nested reviews within a product</li>
          <li>
            Different author formats (string, object with URL, organization)
          </li>
          <li>Aggregate rating alongside individual reviews</li>
          <li>Complete product information with offers</li>
        </ul>
      </div>
    </div>
  );
}
