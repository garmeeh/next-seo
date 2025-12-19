import { HowToJsonLd } from "next-seo";

export default function HowToPage() {
  return (
    <div className="container mx-auto p-8">
      <HowToJsonLd
        name="How to Change a Flat Tire"
        description="Step-by-step guide to safely change a flat tire on the roadside"
        image="https://example.com/images/tire-change.jpg"
        estimatedCost="$20"
        prepTime="PT5M"
        performTime="PT25M"
        totalTime="PT30M"
        yield="1 changed tire"
        tool={["Spare tire", "Lug wrench", "Jack", "Wheel wedges"]}
        supply={["Flares"]}
        step={[
          "Turn on your hazard lights and apply parking brake",
          "Apply wheel wedges behind the tires",
          "Remove the hubcap and loosen the lug nuts",
          "Place the jack under the vehicle frame",
          "Raise the vehicle until the flat tire is off the ground",
          "Remove the lug nuts and the flat tire",
          "Mount the spare tire and hand-tighten the lug nuts",
          "Lower the vehicle and fully tighten the lug nuts",
          "Check the tire pressure and drive to a service station",
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>How to Change a Flat Tire</h1>
        <p className="text-gray-600">
          A step-by-step guide to safely changing a flat tire
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p className="font-medium">Safety First</p>
          <p>
            Always pull over to a safe location away from traffic before
            attempting to change a tire.
          </p>
        </div>

        <h2>What You'll Need</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>Tools</h3>
            <ul>
              <li>Spare tire</li>
              <li>Lug wrench</li>
              <li>Jack</li>
              <li>Wheel wedges</li>
            </ul>
          </div>
          <div>
            <h3>Supplies</h3>
            <ul>
              <li>Flares or reflective triangles</li>
            </ul>
          </div>
        </div>

        <h2>Time Required</h2>
        <p>
          <strong>Preparation:</strong> 5 minutes
          <br />
          <strong>Performing the task:</strong> 25 minutes
          <br />
          <strong>Total time:</strong> 30 minutes
        </p>

        <h2>Estimated Cost</h2>
        <p>$20 (for flares and other emergency supplies)</p>

        <h2>Step-by-Step Instructions</h2>
        <ol>
          <li>
            <strong>Secure the vehicle:</strong> Turn on your hazard lights and
            apply the parking brake.
          </li>
          <li>
            <strong>Prevent rolling:</strong> Apply wheel wedges behind the
            tires to prevent the vehicle from moving.
          </li>
          <li>
            <strong>Prepare the wheel:</strong> Remove the hubcap and loosen the
            lug nuts (turn counterclockwise) while the tire is still on the
            ground.
          </li>
          <li>
            <strong>Position the jack:</strong> Place the jack under the vehicle
            frame near the flat tire.
          </li>
          <li>
            <strong>Raise the vehicle:</strong> Use the jack to raise the
            vehicle until the flat tire is about 6 inches off the ground.
          </li>
          <li>
            <strong>Remove the flat:</strong> Remove the lug nuts completely and
            pull off the flat tire.
          </li>
          <li>
            <strong>Mount the spare:</strong> Place the spare tire on the lug
            bolts and hand-tighten the lug nuts.
          </li>
          <li>
            <strong>Lower and tighten:</strong> Lower the vehicle and fully
            tighten the lug nuts in a star pattern.
          </li>
          <li>
            <strong>Final check:</strong> Check the tire pressure and drive to a
            service station to have the spare properly inspected.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg my-8">
          <h3>Pro Tips</h3>
          <ul>
            <li>Keep your spare tire inflated and check it periodically</li>
            <li>Store a flashlight in your trunk for nighttime emergencies</li>
            <li>
              Most spare tires are not designed for high speeds - drive under 50
              mph
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}
