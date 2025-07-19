import { RecipeJsonLd } from "next-seo";

export default function TestNestedPage() {
  return (
    <div className="container mx-auto p-8">
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/images/chocolate-chip-cookies.jpg"
        recipeIngredient={["1 cup flour", "2 eggs", "1/2 cup milk"]}
        recipeInstructions={[
          {
            "@type": "HowToStep",
            name: "Step 1",
            text: "Do something",
            image: {
              "@type": "ImageObject",
              url: "https://example.com/step1.jpg",
              width: 300,
              height: 200,
            },
          },
        ]}
        nutrition={{
          "@type": "NutritionInformation",
          calories: "250 calories",
          servingSize: "1 serving",
        }}
      />

      <div className="prose lg:prose-xl">
        <h1>Test Nested JSON Structures</h1>
        <p>This page tests deeply nested JSON-LD structures for validation.</p>

        <h2>Recipe: Test Recipe</h2>
        <div className="border p-4 rounded bg-gray-50">
          <h3>Nutrition Information</h3>
          <ul>
            <li>Calories: 250 calories</li>
            <li>Serving Size: 1 serving</li>
          </ul>

          <h3>Instructions</h3>
          <div className="mt-4">
            <h4>Step 1: Do something</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
