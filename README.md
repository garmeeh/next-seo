# Next SEO

Next SEO is a plugin that makes managing your SEO easier in Next.js projects.

## Installation

```bash
npm install next-seo
# or
yarn add next-seo
# or
pnpm add next-seo
```

## Components

### ArticleJsonLd

The `ArticleJsonLd` component helps you add structured data for articles, blog posts, and news articles to improve their appearance in search results.

#### Basic Usage

```tsx
import { ArticleJsonLd } from "next-seo";

export default function ArticlePage() {
  return (
    <>
      <ArticleJsonLd
        headline="My Amazing Article"
        datePublished="2024-01-01T08:00:00+08:00"
        author="John Doe"
        image="https://example.com/article-image.jpg"
        description="This article explains amazing things about Next.js SEO"
      />
      <article>
        <h1>My Amazing Article</h1>
        {/* Article content */}
      </article>
    </>
  );
}
```

#### Advanced Example with Multiple Authors

```tsx
<ArticleJsonLd
  type="NewsArticle"
  headline="Breaking: Next SEO v7 Released"
  url="https://example.com/news/next-seo-v7"
  datePublished="2024-01-01T08:00:00+08:00"
  dateModified="2024-01-02T10:00:00+08:00"
  author={[
    {
      "@type": "Person",
      name: "Jane Smith",
      url: "https://example.com/authors/jane",
    },
    "John Doe", // Can mix objects and strings
  ]}
  image={[
    "https://example.com/images/16x9.jpg",
    "https://example.com/images/4x3.jpg",
    "https://example.com/images/1x1.jpg",
  ]}
  publisher={{
    "@type": "Organization",
    name: "Example News",
    logo: "https://example.com/logo.png",
  }}
  isAccessibleForFree={true}
/>
```

#### Blog Posting Example

```tsx
<ArticleJsonLd
  type="BlogPosting"
  headline="10 Tips for Better SEO"
  url="https://example.com/blog/seo-tips"
  datePublished="2024-01-01T08:00:00+08:00"
  author={{
    "@type": "Organization",
    name: "SEO Experts Inc.",
    url: "https://example.com",
  }}
  image={{
    "@type": "ImageObject",
    url: "https://example.com/blog-hero.jpg",
    width: 1200,
    height: 630,
    caption: "SEO Tips Illustration",
  }}
  description="Learn the top 10 tips to improve your website's SEO"
  mainEntityOfPage={{
    "@type": "WebPage",
    "@id": "https://example.com/blog/seo-tips",
  }}
/>
```

#### Props

| Property              | Type                                                    | Description                                              |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| `type`                | `"Article" \| "NewsArticle" \| "BlogPosting" \| "Blog"` | The type of article. Defaults to "Article"               |
| `headline`            | `string`                                                | **Required.** The headline of the article                |
| `url`                 | `string`                                                | The canonical URL of the article                         |
| `author`              | `string \| Person \| Organization \| Author[]`          | The author(s) of the article                             |
| `datePublished`       | `string`                                                | ISO 8601 date when the article was published             |
| `dateModified`        | `string`                                                | ISO 8601 date when the article was last modified         |
| `image`               | `string \| ImageObject \| (string \| ImageObject)[]`    | Article images. Google recommends multiple aspect ratios |
| `publisher`           | `Organization`                                          | The publisher of the article                             |
| `description`         | `string`                                                | A short description of the article                       |
| `isAccessibleForFree` | `boolean`                                               | Whether the article is accessible for free               |
| `mainEntityOfPage`    | `string \| WebPage`                                     | Indicates the article is the primary content of the page |
| `scriptId`            | `string`                                                | Custom ID for the script tag                             |
| `scriptKey`           | `string`                                                | Custom key prop for React                                |

#### Best Practices

1. **Always include images**: Google strongly recommends including high-resolution images with multiple aspect ratios (16x9, 4x3, 1x1)
2. **Use ISO 8601 dates**: Include timezone information for accuracy
3. **Multiple authors**: List all authors when applicable
4. **Publisher logo**: Include a logo for NewsArticle type
5. **Update dateModified**: Keep this current when updating content

### RecipeJsonLd

The `RecipeJsonLd` component helps you add structured data for recipes to improve their appearance in search results with rich snippets that can include ratings, cooking times, and images.

#### Basic Usage

```tsx
import { RecipeJsonLd } from "next-seo";

export default function RecipePage() {
  return (
    <>
      <RecipeJsonLd
        name="Simple Chocolate Chip Cookies"
        image="https://example.com/cookies.jpg"
        description="Classic chocolate chip cookies that are crispy on the outside and chewy on the inside"
        author="Baker Jane"
        datePublished="2024-01-01T08:00:00+00:00"
        prepTime="PT20M"
        cookTime="PT12M"
        totalTime="PT32M"
        recipeYield="24 cookies"
        recipeCategory="dessert"
        recipeCuisine="American"
        recipeIngredient={[
          "2 1/4 cups all-purpose flour",
          "1 cup butter, softened",
          "3/4 cup granulated sugar",
          "3/4 cup packed brown sugar",
          "2 large eggs",
          "2 teaspoons vanilla extract",
          "1 teaspoon baking soda",
          "1 teaspoon salt",
          "2 cups chocolate chips",
        ]}
        recipeInstructions={[
          "Preheat oven to 375°F (190°C)",
          "Mix flour, baking soda, and salt in a bowl",
          "In another bowl, cream butter and sugars until fluffy",
          "Beat in eggs and vanilla",
          "Gradually blend in flour mixture",
          "Stir in chocolate chips",
          "Drop by rounded tablespoons onto ungreased cookie sheets",
          "Bake for 9 to 11 minutes or until golden brown",
        ]}
      />
      <article>
        <h1>Simple Chocolate Chip Cookies</h1>
        {/* Recipe content */}
      </article>
    </>
  );
}
```

#### Advanced Example with Structured Instructions and Nutrition

```tsx
<RecipeJsonLd
  name="Gourmet Lasagna"
  image={[
    "https://example.com/lasagna-16x9.jpg",
    "https://example.com/lasagna-4x3.jpg",
    "https://example.com/lasagna-1x1.jpg",
  ]}
  description="A rich and hearty lasagna with layers of meat sauce, cheese, and pasta"
  author={{
    "@type": "Organization",
    name: "The Italian Kitchen",
    url: "https://example.com",
  }}
  datePublished="2024-01-15T10:00:00+00:00"
  url="https://example.com/recipes/gourmet-lasagna"
  prepTime="PT45M"
  cookTime="PT1H"
  totalTime="PT1H45M"
  recipeYield={8}
  recipeCategory="main course"
  recipeCuisine="Italian"
  keywords="lasagna, italian, pasta, cheese"
  recipeIngredient={[
    "1 pound ground beef",
    "1 onion, chopped",
    "2 cloves garlic, minced",
    "1 can (28 oz) crushed tomatoes",
    "2 cans (6 oz each) tomato paste",
    "16 oz ricotta cheese",
    "1 egg",
    "12 lasagna noodles",
    "16 oz mozzarella cheese, shredded",
  ]}
  recipeInstructions={[
    {
      "@type": "HowToStep",
      name: "Prepare the meat sauce",
      text: "Brown ground beef with onion and garlic. Add tomatoes and tomato paste. Simmer for 30 minutes.",
    },
    {
      "@type": "HowToStep",
      name: "Prepare cheese mixture",
      text: "Mix ricotta cheese with egg and half of the mozzarella",
    },
    {
      "@type": "HowToStep",
      name: "Assemble lasagna",
      text: "Layer meat sauce, noodles, and cheese mixture in a 9x13 pan. Repeat layers.",
    },
    {
      "@type": "HowToStep",
      name: "Bake",
      text: "Cover with foil and bake at 375°F for 45 minutes. Remove foil, add remaining mozzarella, and bake 15 more minutes.",
    },
  ]}
  nutrition={{
    "@type": "NutritionInformation",
    calories: "450 calories",
    proteinContent: "28g",
    carbohydrateContent: "35g",
    fatContent: "22g",
    saturatedFatContent: "10g",
    sodiumContent: "680mg",
    fiberContent: "3g",
    servingSize: "1 piece (1/8 of recipe)",
  }}
  aggregateRating={{
    "@type": "AggregateRating",
    ratingValue: 4.7,
    ratingCount: 234,
    reviewCount: 189,
  }}
  video={{
    "@type": "VideoObject",
    name: "How to Make Gourmet Lasagna",
    description: "Watch our chef prepare this delicious lasagna step by step",
    thumbnailUrl: "https://example.com/lasagna-video-thumb.jpg",
    contentUrl: "https://example.com/videos/lasagna-tutorial.mp4",
    embedUrl: "https://example.com/embed/lasagna-tutorial",
    uploadDate: "2024-01-10T08:00:00+00:00",
    duration: "PT8M30S",
  }}
/>
```

#### Props

| Property             | Type                                                                             | Description                                                                                   |
| -------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `name`               | `string`                                                                         | **Required.** The name of the dish                                                            |
| `image`              | `string \| ImageObject \| (string \| ImageObject)[]`                             | **Required.** Images of the completed dish. Google recommends multiple high-resolution images |
| `description`        | `string`                                                                         | A short summary describing the dish                                                           |
| `author`             | `string \| Person \| Organization`                                               | The creator of the recipe                                                                     |
| `datePublished`      | `string`                                                                         | ISO 8601 date when the recipe was published                                                   |
| `url`                | `string`                                                                         | The canonical URL of the recipe page                                                          |
| `prepTime`           | `string`                                                                         | ISO 8601 duration for preparation time (e.g., "PT30M" for 30 minutes)                         |
| `cookTime`           | `string`                                                                         | ISO 8601 duration for cooking time                                                            |
| `totalTime`          | `string`                                                                         | ISO 8601 duration for total time (prep + cook)                                                |
| `recipeYield`        | `string \| number`                                                               | The quantity produced (e.g., "4 servings", "1 loaf", or just 6)                               |
| `recipeCategory`     | `string`                                                                         | The type of meal or course (e.g., "dessert", "main course")                                   |
| `recipeCuisine`      | `string`                                                                         | The cuisine of the recipe (e.g., "French", "Mexican")                                         |
| `recipeIngredient`   | `string[]`                                                                       | List of ingredients with quantities                                                           |
| `recipeInstructions` | `string \| HowToStep \| HowToSection \| (string \| HowToStep \| HowToSection)[]` | Step-by-step instructions                                                                     |
| `nutrition`          | `NutritionInformation`                                                           | Nutritional information per serving                                                           |
| `aggregateRating`    | `AggregateRating`                                                                | The aggregate rating from users                                                               |
| `video`              | `VideoObject`                                                                    | A video showing how to make the recipe                                                        |
| `keywords`           | `string`                                                                         | Keywords about the recipe, separated by commas                                                |
| `scriptId`           | `string`                                                                         | Custom ID for the script tag                                                                  |
| `scriptKey`          | `string`                                                                         | Custom key prop for React                                                                     |

#### Duration Format (ISO 8601)

Use these formats for time durations:

- `PT15M` - 15 minutes
- `PT1H` - 1 hour
- `PT1H30M` - 1 hour 30 minutes
- `PT2H15M` - 2 hours 15 minutes

#### Best Practices

1. **High-quality images**: Include multiple high-resolution images (16x9, 4x3, 1x1 aspect ratios)
2. **Detailed instructions**: Use HowToStep objects for better structured data
3. **Complete nutrition info**: Include nutrition data when possible for better search visibility
4. **Accurate times**: Always provide prepTime and cookTime together
5. **Ratings**: Include aggregateRating when you have user reviews
6. **Video content**: Adding a video significantly improves search appearance
