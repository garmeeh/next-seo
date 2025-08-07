import { CarouselJsonLd } from "next-seo";

export default function CarouselRecipePage() {
  return (
    <div className="container mx-auto p-8">
      <CarouselJsonLd
        contentType="Recipe"
        items={[
          {
            name: "Perfect Chocolate Chip Cookies",
            image: [
              "https://example.com/cookies-1x1.jpg",
              "https://example.com/cookies-4x3.jpg",
              "https://example.com/cookies-16x9.jpg",
            ],
            description:
              "Crispy on the outside, chewy on the inside chocolate chip cookies",
            author: "Chef Sarah",
            datePublished: "2024-01-15",
            prepTime: "PT20M",
            cookTime: "PT12M",
            totalTime: "PT32M",
            recipeYield: "24 cookies",
            recipeCategory: "Dessert",
            recipeCuisine: "American",
            recipeIngredient: [
              "2 1/4 cups all-purpose flour",
              "1 cup butter, softened",
              "3/4 cup granulated sugar",
              "3/4 cup packed brown sugar",
              "2 large eggs",
              "1 teaspoon vanilla extract",
              "1 teaspoon baking soda",
              "1 teaspoon salt",
              "2 cups chocolate chips",
            ],
            recipeInstructions: [
              "Preheat oven to 375°F (190°C)",
              "Mix flour, baking soda, and salt in a bowl",
              "Beat butter and sugars until creamy",
              "Add eggs and vanilla to butter mixture",
              "Gradually blend in flour mixture",
              "Stir in chocolate chips",
              "Drop by rounded tablespoon onto ungreased cookie sheets",
              "Bake 9-11 minutes or until golden brown",
            ],
            nutrition: {
              calories: "210 calories",
              proteinContent: "2g",
              carbohydrateContent: "28g",
              fatContent: "10g",
              saturatedFatContent: "6g",
              sugarContent: "18g",
              servingSize: "1 cookie",
            },
            aggregateRating: {
              ratingValue: 4.8,
              ratingCount: 3421,
            },
            keywords: "chocolate chip cookies, dessert, baking",
            url: "https://example.com/recipes/chocolate-chip-cookies",
          },
          {
            name: "Classic Banana Bread",
            image: "https://example.com/banana-bread.jpg",
            description:
              "Moist and flavorful banana bread with a perfect texture",
            author: "Grandma Rose",
            prepTime: "PT15M",
            cookTime: "PT60M",
            totalTime: "PT75M",
            recipeYield: 1,
            recipeCategory: "Bread",
            recipeCuisine: "American",
            recipeIngredient: [
              "3 ripe bananas, mashed",
              "1 3/4 cups all-purpose flour",
              "3/4 cup sugar",
              "1 egg, beaten",
              "1/3 cup melted butter",
              "1 teaspoon baking soda",
              "1 teaspoon salt",
              "1 teaspoon vanilla extract",
            ],
            recipeInstructions: {
              name: "Baking Process",
              itemListElement: [
                { text: "Preheat oven to 350°F (175°C)" },
                { text: "Mix dry ingredients" },
                { text: "Combine wet ingredients" },
                { text: "Fold together gently" },
                { text: "Pour into greased loaf pan" },
                { text: "Bake for 60 minutes" },
              ],
            },
            aggregateRating: {
              ratingValue: 4.9,
              ratingCount: 892,
            },
            video: {
              name: "How to Make Banana Bread",
              description: "Step-by-step banana bread tutorial",
              thumbnailUrl: "https://example.com/banana-bread-thumb.jpg",
              contentUrl: "https://example.com/videos/banana-bread.mp4",
              uploadDate: "2024-01-10",
              duration: "PT8M",
            },
          },
          {
            name: "Homemade Pizza Margherita",
            image: {
              url: "https://example.com/pizza-margherita.jpg",
              width: 1200,
              height: 800,
            },
            description:
              "Authentic Italian pizza with fresh mozzarella, tomatoes, and basil",
            author: "Chef Giovanni",
            prepTime: "PT30M",
            cookTime: "PT15M",
            totalTime: "PT45M",
            recipeYield: 2,
            recipeCategory: "Main Course",
            recipeCuisine: "Italian",
            recipeIngredient: [
              "Pizza dough for 2 pizzas",
              "1 cup tomato sauce",
              "16 oz fresh mozzarella",
              "Fresh basil leaves",
              "Extra virgin olive oil",
              "Salt and pepper to taste",
            ],
            recipeInstructions: [
              { text: "Roll out pizza dough", name: "Prepare dough" },
              { text: "Spread tomato sauce evenly" },
              { text: "Add torn mozzarella pieces" },
              { text: "Drizzle with olive oil" },
              { text: "Bake at 500°F for 12-15 minutes" },
              { text: "Top with fresh basil before serving" },
            ],
            nutrition: {
              calories: "320 calories",
              proteinContent: "14g",
              carbohydrateContent: "42g",
              fatContent: "12g",
            },
            aggregateRating: {
              ratingValue: 4.7,
              ratingCount: 567,
            },
            url: "https://example.com/recipes/pizza-margherita",
          },
        ]}
      />

      <h1 className="text-4xl font-bold mb-8">Recipe Carousel Example</h1>

      <div className="prose lg:prose-xl">
        <p>
          Explore our collection of delicious recipes that are perfect for any
          occasion.
        </p>

        <h2>Featured Recipes</h2>

        <div className="grid gap-6 mt-6">
          <div className="border p-6 rounded-lg shadow">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-2xl font-semibold">
              Perfect Chocolate Chip Cookies
            </h3>
            <p className="text-gray-600 mt-2">
              Crispy on the outside, chewy on the inside chocolate chip cookies
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>⏱ 32 min</span>
              <span>🍽 24 cookies</span>
              <span className="text-yellow-500">★ 4.8 (3,421)</span>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Ingredients:</h4>
              <ul className="text-sm text-gray-600 mt-2">
                <li>• 2 1/4 cups flour</li>
                <li>• 1 cup butter</li>
                <li>• 2 cups chocolate chips</li>
                <li>• And more...</li>
              </ul>
            </div>
            <a
              href="https://example.com/recipes/chocolate-chip-cookies"
              className="text-blue-600 mt-4 inline-block"
            >
              View Full Recipe →
            </a>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-2xl font-semibold">Classic Banana Bread</h3>
            <p className="text-gray-600 mt-2">
              Moist and flavorful banana bread with a perfect texture
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>⏱ 75 min</span>
              <span>🍽 1 loaf</span>
              <span className="text-yellow-500">★ 4.9 (892)</span>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Key Ingredients:</h4>
              <ul className="text-sm text-gray-600 mt-2">
                <li>• 3 ripe bananas</li>
                <li>• 1 3/4 cups flour</li>
                <li>• 1/3 cup melted butter</li>
                <li>• And more...</li>
              </ul>
            </div>
            <div className="mt-3">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                📹 Video Available
              </span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
              Watch Video Tutorial
            </button>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-2xl font-semibold">
              Homemade Pizza Margherita
            </h3>
            <p className="text-gray-600 mt-2">
              Authentic Italian pizza with fresh mozzarella, tomatoes, and basil
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>⏱ 45 min</span>
              <span>🍽 2 pizzas</span>
              <span className="text-yellow-500">★ 4.7 (567)</span>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Main Ingredients:</h4>
              <ul className="text-sm text-gray-600 mt-2">
                <li>• Pizza dough</li>
                <li>• Fresh mozzarella</li>
                <li>• Tomato sauce</li>
                <li>• Fresh basil</li>
              </ul>
            </div>
            <a
              href="https://example.com/recipes/pizza-margherita"
              className="text-blue-600 mt-4 inline-block"
            >
              View Full Recipe →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
