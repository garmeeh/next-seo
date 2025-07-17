import { RecipeJsonLd } from "next-seo";

export default function RecipeAdvancedPage() {
  return (
    <div className="container mx-auto p-8">
      <RecipeJsonLd
        name="Authentic Italian Tiramisu"
        image={[
          "https://example.com/images/tiramisu-16x9.jpg",
          "https://example.com/images/tiramisu-4x3.jpg",
          "https://example.com/images/tiramisu-1x1.jpg",
        ]}
        description="An authentic Italian tiramisu recipe with layers of coffee-soaked ladyfingers, mascarpone cream, and cocoa powder"
        author={{
          "@type": "Organization",
          name: "La Cucina Italiana",
          url: "https://example.com",
          logo: {
            "@type": "ImageObject",
            url: "https://example.com/logo.png",
            width: 200,
            height: 200,
          },
        }}
        datePublished="2024-01-25T14:00:00+00:00"
        url="https://example.com/recipes/authentic-italian-tiramisu"
        prepTime="PT30M"
        cookTime="PT0M"
        totalTime="PT4H30M"
        recipeYield="8 servings"
        recipeCategory="dessert"
        recipeCuisine="Italian"
        keywords="tiramisu, italian dessert, mascarpone, coffee, ladyfingers"
        recipeIngredient={[
          "6 egg yolks",
          "3/4 cup sugar",
          "1 1/3 cups mascarpone cheese (room temperature)",
          "1 3/4 cups heavy cream",
          "2 cups strong espresso (cooled)",
          "1/2 cup coffee liqueur",
          "2 packages (7 oz each) ladyfinger cookies",
          "Unsweetened cocoa powder for dusting",
          "Dark chocolate shavings for garnish",
        ]}
        recipeInstructions={[
          {
            "@type": "HowToSection",
            name: "Prepare the Mascarpone Cream",
            itemListElement: [
              {
                "@type": "HowToStep",
                text: "Whisk egg yolks and sugar in a double boiler over simmering water until thick and pale (about 5 minutes)",
                image: "https://example.com/images/tiramisu-step1.jpg",
              },
              {
                "@type": "HowToStep",
                text: "Remove from heat and whisk in mascarpone until smooth",
              },
              {
                "@type": "HowToStep",
                text: "In a separate bowl, whip cream to stiff peaks",
              },
              {
                "@type": "HowToStep",
                text: "Gently fold the whipped cream into mascarpone mixture",
              },
            ],
          },
          {
            "@type": "HowToSection",
            name: "Assemble the Tiramisu",
            itemListElement: [
              {
                "@type": "HowToStep",
                text: "Combine espresso and coffee liqueur in a shallow dish",
                name: "Prepare coffee mixture",
              },
              {
                "@type": "HowToStep",
                text: "Quickly dip each ladyfinger into coffee mixture and arrange in a 9x13 inch dish",
                name: "First layer",
              },
              {
                "@type": "HowToStep",
                text: "Spread half of mascarpone mixture over ladyfingers",
                name: "Add cream",
              },
              {
                "@type": "HowToStep",
                text: "Repeat layers with remaining ladyfingers and mascarpone mixture",
                name: "Second layer",
              },
              {
                "@type": "HowToStep",
                text: "Cover and refrigerate for at least 4 hours, preferably overnight",
                name: "Chill",
              },
              {
                "@type": "HowToStep",
                text: "Before serving, dust with cocoa powder and garnish with chocolate shavings",
                name: "Finish",
              },
            ],
          },
        ]}
        nutrition={{
          "@type": "NutritionInformation",
          calories: "385 calories",
          proteinContent: "7g",
          carbohydrateContent: "28g",
          fatContent: "28g",
          saturatedFatContent: "16g",
          cholesterolContent: "215mg",
          sodiumContent: "95mg",
          sugarContent: "20g",
          servingSize: "1 piece (1/8 of dish)",
        }}
        aggregateRating={{
          "@type": "AggregateRating",
          ratingValue: 4.9,
          ratingCount: 487,
          reviewCount: 423,
          bestRating: 5,
          worstRating: 1,
        }}
        video={{
          "@type": "VideoObject",
          name: "How to Make Authentic Tiramisu",
          description:
            "Watch our Italian chef demonstrate the traditional method of making tiramisu",
          thumbnailUrl: [
            "https://example.com/video/tiramisu-thumb-1.jpg",
            "https://example.com/video/tiramisu-thumb-2.jpg",
          ],
          contentUrl: "https://example.com/videos/tiramisu-tutorial.mp4",
          embedUrl: "https://example.com/embed/tiramisu-tutorial",
          uploadDate: "2024-01-20T10:00:00+00:00",
          duration: "PT12M45S",
        }}
      />

      <article className="prose lg:prose-xl">
        <h1>Authentic Italian Tiramisu</h1>
        <p className="text-gray-600">
          By La Cucina Italiana | January 25, 2024
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p className="font-semibold">⭐ 4.9 out of 5 stars (487 ratings)</p>
        </div>

        <p>
          Tiramisu, which means "pick me up" in Italian, is one of Italy's most
          beloved desserts. This authentic recipe creates the perfect balance of
          coffee-soaked ladyfingers, creamy mascarpone, and rich cocoa.
        </p>

        <div className="grid grid-cols-3 gap-4 my-8 text-center">
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-bold">Prep Time</p>
            <p>30 minutes</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-bold">Chill Time</p>
            <p>4 hours</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-bold">Servings</p>
            <p>8</p>
          </div>
        </div>

        <h2>Ingredients</h2>
        <ul>
          <li>6 egg yolks</li>
          <li>3/4 cup sugar</li>
          <li>1 1/3 cups mascarpone cheese (room temperature)</li>
          <li>1 3/4 cups heavy cream</li>
          <li>2 cups strong espresso (cooled)</li>
          <li>1/2 cup coffee liqueur</li>
          <li>2 packages (7 oz each) ladyfinger cookies</li>
          <li>Unsweetened cocoa powder for dusting</li>
          <li>Dark chocolate shavings for garnish</li>
        </ul>

        <h2>Instructions</h2>

        <h3>Prepare the Mascarpone Cream</h3>
        <ol>
          <li>
            Whisk egg yolks and sugar in a double boiler over simmering water
            until thick and pale
          </li>
          <li>Remove from heat and whisk in mascarpone until smooth</li>
          <li>In a separate bowl, whip cream to stiff peaks</li>
          <li>Gently fold the whipped cream into mascarpone mixture</li>
        </ol>

        <h3>Assemble the Tiramisu</h3>
        <ol>
          <li>Combine espresso and coffee liqueur in a shallow dish</li>
          <li>
            Quickly dip each ladyfinger into coffee mixture and arrange in dish
          </li>
          <li>Spread half of mascarpone mixture over ladyfingers</li>
          <li>Repeat layers with remaining ingredients</li>
          <li>Cover and refrigerate for at least 4 hours</li>
          <li>Before serving, dust with cocoa powder and garnish</li>
        </ol>

        <div className="bg-blue-50 p-6 rounded-lg my-8">
          <h3>Nutrition Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Per serving (1/8 of dish)
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Calories: 385</div>
            <div>Protein: 7g</div>
            <div>Carbohydrates: 28g</div>
            <div>Fat: 28g</div>
            <div>Saturated Fat: 16g</div>
            <div>Cholesterol: 215mg</div>
            <div>Sodium: 95mg</div>
            <div>Sugar: 20g</div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg my-8">
          <h3>Chef's Tips</h3>
          <ul>
            <li>Use room temperature mascarpone for the smoothest cream</li>
            <li>Don't over-soak the ladyfingers - a quick dip is enough</li>
            <li>For best flavor, make this dessert a day ahead</li>
            <li>Use high-quality espresso for authentic taste</li>
          </ul>
        </div>

        <div className="text-center my-8">
          <p className="text-gray-600 mb-4">Watch our video tutorial:</p>
          <div className="bg-gray-200 p-8 rounded-lg">
            <p>🎥 Video: How to Make Authentic Tiramisu</p>
            <p className="text-sm text-gray-600">Duration: 12:45</p>
          </div>
        </div>
      </article>
    </div>
  );
}
