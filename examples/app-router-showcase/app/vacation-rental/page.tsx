import { VacationRentalJsonLd } from "next-seo";

export default function VacationRentalPage() {
  return (
    <div className="container mx-auto p-8">
      <VacationRentalJsonLd
        containsPlace={{
          occupancy: {
            value: 5,
          },
        }}
        identifier="beach-house-123"
        image="https://example.com/vacation-rental-main.jpg"
        latitude={42.12345}
        longitude={-71.98765}
        name="Beautiful Beach House"
      />

      <h1 className="text-4xl font-bold mb-4">Beautiful Beach House</h1>

      <div className="prose lg:prose-xl">
        <h2>About this rental</h2>
        <p>
          Welcome to our beautiful beach house! This stunning property can
          accommodate up to 5 guests and offers breathtaking ocean views.
          Perfect for families or groups looking for a relaxing getaway.
        </p>

        <h3>Location</h3>
        <p>
          Located at coordinates 42.12345, -71.98765, our beach house is just
          steps away from the pristine sandy beach. Enjoy morning walks along
          the shore and spectacular sunsets from your private deck.
        </p>

        <h3>Occupancy</h3>
        <p>Maximum occupancy: 5 guests</p>

        <h3>Property ID</h3>
        <p>Listing ID: beach-house-123</p>
      </div>
    </div>
  );
}
