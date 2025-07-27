import { VacationRentalJsonLd } from "next-seo";

export default function VacationRentalAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <VacationRentalJsonLd
        containsPlace={{
          additionalType: "EntirePlace",
          bed: [
            {
              numberOfBeds: 1,
              typeOfBed: "Queen",
            },
            {
              numberOfBeds: 2,
              typeOfBed: "Single",
            },
          ],
          occupancy: {
            value: 5,
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
              name: "beachAccess",
              value: true,
            },
            {
              name: "pool",
              value: true,
            },
            {
              name: "balcony",
              value: true,
            },
            {
              name: "kitchen",
              value: true,
            },
            {
              name: "washerDryer",
              value: true,
            },
            {
              name: "poolType",
              value: "Outdoor",
            },
            {
              name: "parkingType",
              value: "Free",
            },
            {
              name: "internetType",
              value: "Free",
            },
            {
              name: "licenseNum",
              value: "California: VR-12345-2024",
            },
          ],
          floorSize: {
            value: 150,
            unitCode: "MTK",
          },
          numberOfBathroomsTotal: 2.5,
          numberOfBedrooms: 3,
          numberOfRooms: 7,
          petsAllowed: true,
          smokingAllowed: false,
        }}
        identifier="lux-villa-malibu-456"
        image={[
          "https://example.com/images/villa-exterior.jpg",
          "https://example.com/images/villa-living-room.jpg",
          "https://example.com/images/villa-master-bedroom.jpg",
          "https://example.com/images/villa-guest-bedroom.jpg",
          "https://example.com/images/villa-kitchen.jpg",
          "https://example.com/images/villa-bathroom.jpg",
          "https://example.com/images/villa-pool.jpg",
          "https://example.com/images/villa-ocean-view.jpg",
        ]}
        latitude={34.03654}
        longitude={-118.68512}
        name="Luxury Ocean View Villa"
        additionalType="Villa"
        address={{
          addressCountry: "US",
          addressLocality: "Malibu",
          addressRegion: "California",
          postalCode: "90265",
          streetAddress: "123 Ocean Drive, Unit 6E",
        }}
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 125,
          reviewCount: 98,
          bestRating: 5,
        }}
        brand={{
          name: "Luxury Beach Rentals Inc",
        }}
        checkinTime="15:00:00-08:00"
        checkoutTime="11:00:00-08:00"
        description="Stunning beachfront villa with panoramic ocean views, modern amenities, and direct beach access. This luxury property features 3 bedrooms, 2.5 bathrooms, a private pool, and spacious outdoor entertainment areas."
        knowsLanguage={["en-US", "es-ES", "fr-FR"]}
        review={[
          {
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Sarah Johnson",
            datePublished: "2024-01-15",
            reviewBody:
              "Absolutely stunning property! The ocean views were breathtaking and the villa was even better than the photos. Perfect for our family vacation.",
          },
          {
            reviewRating: {
              ratingValue: 4,
              bestRating: 5,
            },
            author: {
              name: "Michael Chen",
            },
            datePublished: "2024-01-20",
            reviewBody:
              "Great location and beautiful villa. Only minor issue was the hot tub wasn't working for the first day, but the host fixed it quickly.",
          },
          {
            reviewRating: {
              ratingValue: 5,
              bestRating: 5,
            },
            author: "Emma Thompson",
            datePublished: "2024-02-01",
            reviewBody:
              "We had an amazing stay! The villa is luxurious and well-maintained. The private beach access was a huge plus. Will definitely book again!",
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-4">Luxury Ocean View Villa</h1>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <img
          src="https://example.com/images/villa-exterior.jpg"
          alt="Villa exterior"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img
          src="https://example.com/images/villa-ocean-view.jpg"
          alt="Ocean view"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <div className="prose lg:prose-xl max-w-none">
        <h2>About this luxury villa</h2>
        <p>
          {`Stunning beachfront villa with panoramic ocean views, modern amenities,
          and direct beach access. This luxury property features 3 bedrooms, 2.5
          bathrooms, a private pool, and spacious outdoor entertainment areas.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h3>Property Details</h3>
            <ul>
              <li>Type: Entire Villa</li>
              <li>Bedrooms: 3</li>
              <li>Bathrooms: 2.5</li>
              <li>Total Rooms: 7</li>
              <li>Floor Size: 150 m² (1,615 sq ft)</li>
              <li>Maximum Occupancy: 5 guests</li>
              <li>License: California: VR-12345-2024</li>
            </ul>
          </div>

          <div>
            <h3>Sleeping Arrangements</h3>
            <ul>
              <li>Master Bedroom: 1 Queen bed</li>
              <li>Guest Bedroom: 2 Single beds</li>
            </ul>

            <h3>House Rules</h3>
            <ul>
              <li>Check-in: 3:00 PM PST</li>
              <li>Check-out: 11:00 AM PST</li>
              <li>Pets allowed: Yes</li>
              <li>Smoking allowed: No</li>
            </ul>
          </div>
        </div>

        <h3>Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h4>Comfort</h4>
            <ul>
              <li>✓ Air conditioning</li>
              <li>✓ Free WiFi</li>
              <li>✓ Balcony</li>
            </ul>
          </div>
          <div>
            <h4>Kitchen</h4>
            <ul>
              <li>✓ Full kitchen</li>
              <li>✓ Washer/Dryer</li>
            </ul>
          </div>
          <div>
            <h4>Entertainment</h4>
            <ul>
              <li>✓ Beach access</li>
              <li>✓ Outdoor pool</li>
              <li>✓ Free parking</li>
            </ul>
          </div>
        </div>

        <h3>Location</h3>
        <p>
          123 Ocean Drive, Unit 6E
          <br />
          Malibu, California 90265
          <br />
          United States
        </p>
        <p>Coordinates: 34.03654°N, 118.68512°W</p>

        <h3>Host Information</h3>
        <p>
          Managed by: Luxury Beach Rentals Inc
          <br />
          Languages spoken: English, Spanish, French
        </p>

        <h3>Guest Reviews</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-bold">Overall Rating: 4.8/5</p>
          <p className="text-sm text-gray-600">
            Based on 125 ratings from 98 reviews
          </p>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Sarah Johnson - ⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600">January 15, 2024</p>
            <p className="mt-2">
              Absolutely stunning property! The ocean views were breathtaking
              and the villa was even better than the photos. Perfect for our
              family vacation.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Michael Chen - ⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600">January 20, 2024</p>
            <p className="mt-2">
              Great location and beautiful villa. Only minor issue was the hot
              tub wasn't working for the first day, but the host fixed it
              quickly.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Emma Thompson - ⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600">February 1, 2024</p>
            <p className="mt-2">
              We had an amazing stay! The villa is luxurious and
              well-maintained. The private beach access was a huge plus. Will
              definitely book again!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
