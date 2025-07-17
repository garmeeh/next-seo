import { RecipeJsonLd } from "next-seo";

export default function RecipePage() {
  return (
    <div className="container mx-auto p-8">
      <RecipeJsonLd
        name="Classic Chocolate Chip Cookies"
        image="https://example.com/images/chocolate-chip-cookies.jpg"
        description="The perfect chocolate chip cookies - crispy edges with soft, chewy centers"
        author="Sarah Baker"
        datePublished="2024-01-20T09:00:00+00:00"
        url="https://example.com/recipes/chocolate-chip-cookies"
        prepTime="PT20M"
        cookTime="PT12M"
        totalTime="PT32M"
        recipeYield="36 cookies"
        recipeCategory="dessert"
        recipeCuisine="American"
        keywords="cookies, chocolate chip, dessert, baking"
        recipeIngredient={[
          "2 1/4 cups all-purpose flour",
          "1 teaspoon baking soda",
          "1 teaspoon salt",
          "1 cup (2 sticks) butter, softened",
          "3/4 cup granulated sugar",
          "3/4 cup packed brown sugar",
          "1 teaspoon vanilla extract",
          "2 large eggs",
          "2 cups chocolate chips",
        ]}
        recipeInstructions={[
          "Preheat oven to 375°F",
          "Combine flour, baking soda and salt in small bowl",
          "Beat butter, granulated sugar, brown sugar and vanilla extract in large mixer bowl until creamy",
          "Add eggs, one at a time, beating well after each addition",
          "Gradually beat in flour mixture",
          "Stir in chocolate chips",
          "Drop by rounded tablespoon onto ungreased baking sheets",
          "Bake for 9 to 11 minutes or until golden brown",
          "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely",
        ]}
      />

      <article className="prose lg:prose-xl">
        <h1>Classic Chocolate Chip Cookies</h1>
        <p className="text-gray-600">By Sarah Baker | January 20, 2024</p>

        <p>
          There's nothing quite like a warm, homemade chocolate chip cookie
          fresh from the oven. This recipe produces cookies with perfectly
          crispy edges and soft, chewy centers.
        </p>

        <h2>Ingredients</h2>
        <ul>
          <li>2 1/4 cups all-purpose flour</li>
          <li>1 teaspoon baking soda</li>
          <li>1 teaspoon salt</li>
          <li>1 cup (2 sticks) butter, softened</li>
          <li>3/4 cup granulated sugar</li>
          <li>3/4 cup packed brown sugar</li>
          <li>1 teaspoon vanilla extract</li>
          <li>2 large eggs</li>
          <li>2 cups chocolate chips</li>
        </ul>

        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 375°F</li>
          <li>Combine flour, baking soda and salt in small bowl</li>
          <li>
            Beat butter, granulated sugar, brown sugar and vanilla extract until
            creamy
          </li>
          <li>Add eggs, one at a time, beating well after each addition</li>
          <li>Gradually beat in flour mixture</li>
          <li>Stir in chocolate chips</li>
          <li>Drop by rounded tablespoon onto ungreased baking sheets</li>
          <li>Bake for 9 to 11 minutes or until golden brown</li>
          <li>Cool on baking sheets for 2 minutes; remove to wire racks</li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg my-8">
          <h3>Recipe Notes</h3>
          <p>
            For chewier cookies, slightly underbake them. For crispier cookies,
            bake for an additional 1-2 minutes until edges are deep golden
            brown.
          </p>
        </div>
      </article>
    </div>
  );
}
