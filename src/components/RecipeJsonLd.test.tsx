import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecipeJsonLd from "./RecipeJsonLd";

describe("RecipeJsonLd", () => {
  it("renders basic Recipe with minimal props", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Simple Chocolate Chip Cookies"
        image="https://example.com/cookies.jpg"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();

    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: "Simple Chocolate Chip Cookies",
      image: "https://example.com/cookies.jpg",
    });
  });

  it("preserves URL query parameters", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Chocolate Cookies"
        image="https://example.com/cookies.jpg"
        url="https://example.com/recipe?category=dessert&rating=5"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.url).toBe(
      "https://example.com/recipe?category=dessert&rating=5",
    );
  });

  it("handles string author", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Grandma's Apple Pie"
        image="https://example.com/apple-pie.jpg"
        author="Mary Johnson"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Mary Johnson",
    });
  });

  it("handles Person author object", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Chef's Special Pasta"
        image="https://example.com/pasta.jpg"
        author={{
          "@type": "Person",
          name: "Chef Giovanni",
          url: "https://example.com/chef-giovanni",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Person",
      name: "Chef Giovanni",
      url: "https://example.com/chef-giovanni",
    });
  });

  it("handles Organization author", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Restaurant's Famous Burger"
        image="https://example.com/burger.jpg"
        author={{
          "@type": "Organization",
          name: "The Gourmet Kitchen",
          url: "https://example.com",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.author).toEqual({
      "@type": "Organization",
      name: "The Gourmet Kitchen",
      url: "https://example.com",
    });
  });

  it("handles string image", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toBe("https://example.com/recipe.jpg");
  });

  it("handles ImageObject", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image={{
          "@type": "ImageObject",
          url: "https://example.com/recipe.jpg",
          width: 1200,
          height: 800,
          caption: "Delicious recipe photo",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual({
      "@type": "ImageObject",
      url: "https://example.com/recipe.jpg",
      width: 1200,
      height: 800,
      caption: "Delicious recipe photo",
    });
  });

  it("handles multiple images", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image={[
          "https://example.com/recipe1.jpg",
          {
            "@type": "ImageObject",
            url: "https://example.com/recipe2.jpg",
            width: 800,
            height: 600,
          },
          "https://example.com/recipe3.jpg",
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.image).toEqual([
      "https://example.com/recipe1.jpg",
      {
        "@type": "ImageObject",
        url: "https://example.com/recipe2.jpg",
        width: 800,
        height: 600,
      },
      "https://example.com/recipe3.jpg",
    ]);
  });

  it("handles string instructions", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Simple Recipe"
        image="https://example.com/recipe.jpg"
        recipeInstructions="Mix all ingredients and bake for 30 minutes at 350°F."
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeInstructions).toBe(
      "Mix all ingredients and bake for 30 minutes at 350°F.",
    );
  });

  it("handles HowToStep instructions", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Detailed Recipe"
        image="https://example.com/recipe.jpg"
        recipeInstructions={[
          {
            "@type": "HowToStep",
            text: "Preheat oven to 350°F",
            name: "Preheat",
          },
          {
            "@type": "HowToStep",
            text: "Mix dry ingredients",
            url: "https://example.com/mixing-guide",
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeInstructions).toEqual([
      {
        "@type": "HowToStep",
        text: "Preheat oven to 350°F",
        name: "Preheat",
      },
      {
        "@type": "HowToStep",
        text: "Mix dry ingredients",
        url: "https://example.com/mixing-guide",
      },
    ]);
  });

  it("handles HowToSection instructions", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Complex Recipe"
        image="https://example.com/recipe.jpg"
        recipeInstructions={{
          "@type": "HowToSection",
          name: "Preparation",
          itemListElement: [
            {
              "@type": "HowToStep",
              text: "Gather all ingredients",
            },
            {
              "@type": "HowToStep",
              text: "Prepare your workspace",
            },
          ],
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeInstructions).toEqual({
      "@type": "HowToSection",
      name: "Preparation",
      itemListElement: [
        {
          "@type": "HowToStep",
          text: "Gather all ingredients",
        },
        {
          "@type": "HowToStep",
          text: "Prepare your workspace",
        },
      ],
    });
  });

  it("handles duration properties", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Timed Recipe"
        image="https://example.com/recipe.jpg"
        prepTime="PT30M"
        cookTime="PT1H"
        totalTime="PT1H30M"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.prepTime).toBe("PT30M");
    expect(jsonData.cookTime).toBe("PT1H");
    expect(jsonData.totalTime).toBe("PT1H30M");
  });

  it("handles nutrition information", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Healthy Recipe"
        image="https://example.com/recipe.jpg"
        recipeYield="4 servings"
        nutrition={{
          "@type": "NutritionInformation",
          calories: "250 calories",
          proteinContent: "10g",
          carbohydrateContent: "30g",
          fatContent: "12g",
          saturatedFatContent: "3g",
          sodiumContent: "200mg",
          fiberContent: "4g",
          sugarContent: "8g",
          servingSize: "1 serving",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeYield).toBe("4 servings");
    expect(jsonData.nutrition).toEqual({
      "@type": "NutritionInformation",
      calories: "250 calories",
      proteinContent: "10g",
      carbohydrateContent: "30g",
      fatContent: "12g",
      saturatedFatContent: "3g",
      sodiumContent: "200mg",
      fiberContent: "4g",
      sugarContent: "8g",
      servingSize: "1 serving",
    });
  });

  it("handles aggregate rating", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Popular Recipe"
        image="https://example.com/recipe.jpg"
        aggregateRating={{
          "@type": "AggregateRating",
          ratingValue: 4.5,
          ratingCount: 120,
          reviewCount: 98,
          bestRating: 5,
          worstRating: 1,
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      ratingCount: 120,
      reviewCount: 98,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it("handles video object", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Video Recipe"
        image="https://example.com/recipe.jpg"
        video={{
          "@type": "VideoObject",
          name: "How to Make Chocolate Chip Cookies",
          description: "Step by step guide to making cookies",
          thumbnailUrl: "https://example.com/video-thumb.jpg",
          contentUrl: "https://example.com/cookie-video.mp4",
          embedUrl: "https://example.com/embed/cookie-video",
          uploadDate: "2024-01-01T08:00:00+00:00",
          duration: "PT5M30S",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.video).toEqual({
      "@type": "VideoObject",
      name: "How to Make Chocolate Chip Cookies",
      description: "Step by step guide to making cookies",
      thumbnailUrl: "https://example.com/video-thumb.jpg",
      contentUrl: "https://example.com/cookie-video.mp4",
      embedUrl: "https://example.com/embed/cookie-video",
      uploadDate: "2024-01-01T08:00:00+00:00",
      duration: "PT5M30S",
    });
  });

  it("handles all optional properties", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Complete Recipe"
        image="https://example.com/recipe.jpg"
        description="A delicious and complete recipe"
        author="Chef Mary"
        datePublished="2024-01-01T08:00:00+00:00"
        url="https://example.com/recipes/complete-recipe"
        prepTime="PT20M"
        cookTime="PT30M"
        totalTime="PT50M"
        recipeYield={6}
        recipeCategory="dessert"
        recipeCuisine="French"
        keywords="chocolate, dessert, french cuisine"
        recipeIngredient={[
          "2 cups flour",
          "1 cup sugar",
          "1/2 cup butter",
          "2 eggs",
          "1 tsp vanilla extract",
        ]}
        recipeInstructions={[
          "Mix dry ingredients",
          "Add wet ingredients",
          "Bake for 30 minutes",
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData).toEqual({
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: "Complete Recipe",
      image: "https://example.com/recipe.jpg",
      description: "A delicious and complete recipe",
      author: {
        "@type": "Person",
        name: "Chef Mary",
      },
      datePublished: "2024-01-01T08:00:00+00:00",
      url: "https://example.com/recipes/complete-recipe",
      prepTime: "PT20M",
      cookTime: "PT30M",
      totalTime: "PT50M",
      recipeYield: 6,
      recipeCategory: "dessert",
      recipeCuisine: "French",
      keywords: "chocolate, dessert, french cuisine",
      recipeIngredient: [
        "2 cups flour",
        "1 cup sugar",
        "1/2 cup butter",
        "2 eggs",
        "1 tsp vanilla extract",
      ],
      recipeInstructions: [
        "Mix dry ingredients",
        "Add wet ingredients",
        "Bake for 30 minutes",
      ],
    });
  });

  it("handles recipeYield as string", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
        recipeYield="4 servings"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeYield).toBe("4 servings");
  });

  it("handles recipeYield as number", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
        recipeYield={8}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeYield).toBe(8);
  });

  it("uses custom scriptId when provided", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
        scriptId="custom-recipe-id"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script!.getAttribute("id")).toBe("custom-recipe-id");
    expect(script!.getAttribute("data-testid")).toBe("custom-recipe-id");
  });

  it("uses custom scriptKey when provided", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
        scriptKey="custom-key"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
  });

  it("uses default scriptKey when not provided", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
  });

  it("handles mixed instruction types", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Mixed Instructions Recipe"
        image="https://example.com/recipe.jpg"
        recipeInstructions={[
          "Preheat oven to 350°F",
          {
            "@type": "HowToStep",
            text: "Mix all dry ingredients in a bowl",
            name: "Mix ingredients",
          },
          {
            "@type": "HowToSection",
            name: "Baking",
            itemListElement: [
              {
                "@type": "HowToStep",
                text: "Pour batter into pan",
              },
              {
                "@type": "HowToStep",
                text: "Bake for 25 minutes",
              },
            ],
          },
        ]}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.recipeInstructions).toEqual([
      "Preheat oven to 350°F",
      {
        "@type": "HowToStep",
        text: "Mix all dry ingredients in a bowl",
        name: "Mix ingredients",
      },
      {
        "@type": "HowToSection",
        name: "Baking",
        itemListElement: [
          {
            "@type": "HowToStep",
            text: "Pour batter into pan",
          },
          {
            "@type": "HowToStep",
            text: "Bake for 25 minutes",
          },
        ],
      },
    ]);
  });

  it("handles nutrition without @type", () => {
    const { container } = render(
      <RecipeJsonLd
        name="Test Recipe"
        image="https://example.com/recipe.jpg"
        recipeIngredient={["1 cup flour", "2 eggs"]}
        nutrition={{
          calories: "250 calories",
          servingSize: "1 serving",
        }}
      />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const jsonData = JSON.parse(script!.textContent!);
    expect(jsonData.nutrition).toEqual({
      "@type": "NutritionInformation",
      calories: "250 calories",
      servingSize: "1 serving",
    });
  });
});
