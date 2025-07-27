import { VacationRentalJsonLd } from "next-seo";

export default function VacationRentalApartmentPage() {
  return (
    <div className="container mx-auto p-8">
      <VacationRentalJsonLd
        containsPlace={{
          additionalType: "PrivateRoom",
          bed: {
            numberOfBeds: 1,
            typeOfBed: "Double",
          },
          occupancy: {
            value: 2,
          },
          amenityFeature: [
            {
              name: "ac",
              value: true,
            },
            {
              name: "wifi",
              value: true,
            },
            {
              name: "elevator",
              value: true,
            },
            {
              name: "kitchen",
              value: false,
            },
            {
              name: "selfCheckinCheckout",
              value: true,
            },
            {
              name: "parkingType",
              value: "None",
            },
          ],
          floorSize: {
            value: 450,
            unitCode: "FTK",
          },
          numberOfBathroomsTotal: 1,
          numberOfBedrooms: 1,
          numberOfRooms: 2,
          petsAllowed: false,
          smokingAllowed: false,
        }}
        identifier="city-apt-789"
        image={[
          "https://example.com/apt/bedroom.jpg",
          "https://example.com/apt/bathroom.jpg",
          "https://example.com/apt/entrance.jpg",
          "https://example.com/apt/window-view.jpg",
          "https://example.com/apt/building-exterior.jpg",
          "https://example.com/apt/neighborhood.jpg",
          "https://example.com/apt/amenities.jpg",
          "https://example.com/apt/detail.jpg",
        ]}
        latitude="40.74844"
        longitude="-73.98566"
        name="Cozy Manhattan Studio Apartment"
        additionalType="Apartment"
        address={{
          addressCountry: "US",
          addressLocality: "New York",
          addressRegion: "New York",
          postalCode: "10001",
          streetAddress: "456 Broadway, Apt 12B",
        }}
        aggregateRating={{
          ratingValue: 4.3,
          ratingCount: 45,
          reviewCount: 38,
        }}
        checkinTime="14:00:00-05:00"
        checkoutTime="10:00:00-05:00"
        description="Modern studio apartment in the heart of Manhattan. Perfect for business travelers or couples exploring NYC."
        knowsLanguage="en-US"
        review={{
          reviewRating: {
            ratingValue: 4,
          },
          author: {
            name: "David Lee",
          },
          datePublished: "2024-02-10",
          reviewBody:
            "Great location and clean apartment. Easy self check-in process.",
        }}
      />

      <h1 className="text-4xl font-bold mb-4">
        Cozy Manhattan Studio Apartment
      </h1>

      <div className="mb-8">
        <img
          src="https://example.com/apt/bedroom.jpg"
          alt="Studio apartment bedroom"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      <div className="prose lg:prose-xl">
        <h2>About this apartment</h2>
        <p>
          Modern studio apartment in the heart of Manhattan. Perfect for
          business travelers or couples exploring NYC. This cozy space offers
          all the essentials for a comfortable stay in the city.
        </p>

        <h3>Accommodation Details</h3>
        <ul>
          <li>Type: Private Room (Studio)</li>
          <li>Size: 450 sq ft (42 m²)</li>
          <li>Floor: 12th with elevator access</li>
          <li>Maximum occupancy: 2 guests</li>
          <li>1 bedroom with 1 double bed</li>
          <li>1 bathroom</li>
        </ul>

        <h3>Features</h3>
        <ul>
          <li>✓ Air conditioning</li>
          <li>✓ Free WiFi</li>
          <li>✓ Elevator access</li>
          <li>✓ Self check-in/checkout</li>
          <li>✗ No kitchen (kitchenette only)</li>
          <li>✗ No parking available</li>
          <li>✗ No pets allowed</li>
          <li>✗ No smoking</li>
        </ul>

        <h3>Location</h3>
        <p>
          456 Broadway, Apt 12B
          <br />
          New York, NY 10001
          <br />
          Coordinates: 40.74844°N, 73.98566°W
        </p>

        <h3>Check-in/Check-out</h3>
        <ul>
          <li>Check-in: 2:00 PM EST</li>
          <li>Check-out: 10:00 AM EST</li>
          <li>Self check-in available with keypad entry</li>
        </ul>

        <h3>Guest Reviews</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-bold">Rating: 4.3/5</p>
          <p className="text-sm text-gray-600">
            Based on 45 ratings from 38 reviews
          </p>
          <blockquote className="mt-4 italic">
            "Great location and clean apartment. Easy self check-in process."
            <footer className="text-sm mt-2">— David Lee, February 2024</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
