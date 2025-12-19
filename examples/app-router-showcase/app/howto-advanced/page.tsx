import { HowToJsonLd } from "next-seo";

export default function HowToAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <HowToJsonLd
        name="How to Change a Flat Tire"
        description="Complete guide to safely changing a flat tire on the roadside with detailed sections"
        image={{
          url: "https://example.com/images/tire-change-guide.jpg",
          width: 1200,
          height: 800,
        }}
        estimatedCost={{
          currency: "USD",
          value: 20,
        }}
        prepTime="PT5M"
        performTime="PT25M"
        totalTime="PT30M"
        yield="1 changed tire"
        tool={[
          {
            name: "Spare tire",
          },
          {
            name: "Lug wrench",
            image: "https://example.com/images/lug-wrench.jpg",
          },
          {
            name: "Jack",
          },
          {
            name: "Wheel wedges",
            image: "https://example.com/images/wheel-wedges.jpg",
          },
        ]}
        supply={[
          {
            name: "Flares",
            image: "https://example.com/images/flares.jpg",
          },
        ]}
        step={[
          {
            "@type": "HowToSection",
            name: "Preparation",
            position: 1,
            itemListElement: [
              {
                "@type": "HowToStep",
                position: 1,
                itemListElement: [
                  {
                    "@type": "HowToDirection",
                    position: 1,
                    text: "Turn on your hazard lights and set the flares.",
                  },
                  {
                    "@type": "HowToTip",
                    position: 2,
                    text: "You're going to need space and want to be visible.",
                  },
                ],
              },
              {
                "@type": "HowToStep",
                position: 2,
                itemListElement: [
                  {
                    "@type": "HowToDirection",
                    position: 1,
                    text: "Position your wheel wedges in front of the front tires if a rear tire is flat, or behind the rear tires if a front tire is flat.",
                  },
                  {
                    "@type": "HowToTip",
                    position: 2,
                    text: "You don't want the car to move while you're working on it.",
                  },
                ],
              },
            ],
          },
          {
            "@type": "HowToSection",
            name: "Raise the car",
            position: 2,
            itemListElement: [
              {
                "@type": "HowToStep",
                position: 1,
                text: "Position the jack underneath the car, next to the flat tire.",
                image: "https://example.com/images/position-jack.jpg",
              },
              {
                "@type": "HowToStep",
                position: 2,
                itemListElement: [
                  {
                    "@type": "HowToDirection",
                    position: 1,
                    text: "Raise the jack until the flat tire is just barely off of the ground.",
                    beforeMedia: "https://example.com/images/car-on-ground.jpg",
                    afterMedia: "https://example.com/images/car-raised.jpg",
                  },
                  {
                    "@type": "HowToTip",
                    position: 2,
                    text: "It doesn't need to be too high.",
                  },
                ],
              },
              {
                "@type": "HowToStep",
                position: 3,
                text: "Remove the hubcap and loosen the lug nuts.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                text: "Remove the flat tire and put the spare tire on the exposed lug bolts.",
              },
              {
                "@type": "HowToStep",
                position: 5,
                itemListElement: [
                  {
                    "@type": "HowToDirection",
                    position: 1,
                    text: "Tighten the lug nuts by hand.",
                  },
                  {
                    "@type": "HowToTip",
                    position: 2,
                    text: "Don't use the wrench just yet.",
                  },
                ],
              },
            ],
          },
          {
            "@type": "HowToSection",
            name: "Finishing up",
            position: 3,
            itemListElement: [
              {
                "@type": "HowToStep",
                position: 1,
                text: "Lower the jack and tighten the lug nuts with the wrench.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                text: "Replace the hubcap.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                text: "Put the equipment and the flat tire away.",
              },
            ],
          },
        ]}
        video={{
          name: "How to Change a Tire Video Tutorial",
          description:
            "Watch our mechanic demonstrate the proper technique for changing a flat tire",
          thumbnailUrl: "https://example.com/video/tire-change-thumb.jpg",
          contentUrl: "https://example.com/video/tire-change-tutorial.mp4",
          uploadDate: "2024-01-15T08:00:00+00:00",
          duration: "PT8M30S",
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>How to Change a Flat Tire</h1>
        <p className="text-gray-600">
          A comprehensive guide with detailed sections and helpful tips
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p className="font-medium">Estimated Time: 30 minutes</p>
          <p>Preparation: 5 minutes | Performing: 25 minutes</p>
        </div>

        <h2>Section 1: Preparation</h2>
        <ol>
          <li>
            <strong>Set up safety signals:</strong> Turn on your hazard lights
            and set out flares or reflective triangles.
            <div className="text-sm text-gray-500 mt-1">
              💡 Tip: You need space and want to be visible to other drivers.
            </div>
          </li>
          <li>
            <strong>Secure the vehicle:</strong> Position wheel wedges in front
            of front tires (for rear flat) or behind rear tires (for front
            flat).
            <div className="text-sm text-gray-500 mt-1">
              💡 Tip: This prevents the car from moving while you work.
            </div>
          </li>
        </ol>

        <h2>Section 2: Raise the Car</h2>
        <ol>
          <li>
            <strong>Position the jack:</strong> Place it underneath the car,
            next to the flat tire.
          </li>
          <li>
            <strong>Raise the vehicle:</strong> Lift until the flat tire is
            barely off the ground.
            <div className="text-sm text-gray-500 mt-1">
              💡 Tip: It doesn't need to be too high - just enough to clear the
              ground.
            </div>
          </li>
          <li>
            <strong>Remove hubcap:</strong> Take off the hubcap and loosen the
            lug nuts.
          </li>
          <li>
            <strong>Swap the tire:</strong> Remove the flat and mount the spare
            on the lug bolts.
          </li>
          <li>
            <strong>Hand-tighten:</strong> Tighten the lug nuts by hand first.
            <div className="text-sm text-gray-500 mt-1">
              💡 Tip: Don't use the wrench yet - wait until the car is lowered.
            </div>
          </li>
        </ol>

        <h2>Section 3: Finishing Up</h2>
        <ol>
          <li>
            <strong>Lower and tighten:</strong> Lower the jack and use the
            wrench to fully tighten lug nuts.
          </li>
          <li>
            <strong>Replace hubcap:</strong> Put the hubcap back on if your
            spare uses one.
          </li>
          <li>
            <strong>Store equipment:</strong> Put away the jack, wrench, and
            flat tire.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg my-8">
          <h3>Video Tutorial</h3>
          <p>
            Watch our 8-minute video tutorial to see a professional mechanic
            demonstrate the proper technique.
          </p>
        </div>
      </article>
    </div>
  );
}
