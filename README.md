**Outrank**

Get traffic and outrank competitors with Backlinks & SEO-optimized content while you sleep! I've been keeping a close eye on this new tool and it seems to be gaining a lot of traction and delivering great results. [Try it now!](https://outrank.so/?via=next-seo)

[![image](https://github.com/user-attachments/assets/14c0f4c0-aad0-4d2d-8a14-6edad232a4dc)](https://outrank.so/?via=next-seo)

**Have you seen the new Next.js newsletter?**

[<img alt="NextjsWeekly banner" src="./next-js-weekly.png">](https://dub.sh/nextjsweekly)

# Next SEO

![npm](https://img.shields.io/npm/dw/next-seo?style=flat-square)
![npm version](https://img.shields.io/npm/v/next-seo?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)
![License](https://img.shields.io/npm/l/next-seo?style=flat-square)

Next SEO is a plugin that makes managing your SEO easier in Next.js projects. It provides components for structured data (JSON-LD) that helps search engines understand your content better.

## 📋 Table of Contents

_Looking for v6 documentation? [View Here](https://github.com/garmeeh/next-seo/tree/master)_

_Still using <NextSeo /> component in Pages? View docs here [/src/pages/README.md]_

## 🚀 Quick Start

### Installation

```bash
npm install next-seo
# or
yarn add next-seo
# or
pnpm add next-seo
# or
bun add next-seo
```

### Basic Usage

```tsx
import { ArticleJsonLd } from "next-seo";

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        headline="Getting Started with Next SEO"
        datePublished="2024-01-01T08:00:00+00:00"
        author="John Doe"
        image="https://example.com/article-image.jpg"
        description="Learn how to improve your Next.js SEO"
      />
      <article>
        <h1>Getting Started with Next SEO</h1>
        {/* Your content */}
      </article>
    </>
  );
}
```

> **Note**: For standard meta tags (`<meta>`, `<title>`), use Next.js's built-in [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) function.

> **Pages Router Support**: If you're using Next.js Pages Router, import components from `next-seo/pages`. See the [Pages Router documentation](./src/pages/README.md) for details.

## Support This Project

**Feel like supporting this free plugin?**

It takes a lot of time to maintain an open source project so any small contribution is greatly appreciated.

Coffee fuels coding ☕️

<a href="https://www.buymeacoffee.com/garmeeh" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

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

[↑ Back to Components](#-components-by-category)

### ClaimReviewJsonLd

The `ClaimReviewJsonLd` component helps you add structured data for fact-checking articles that review claims made by others. This enables a summarized version of your fact check to display in Google Search results.

#### Basic Usage

```tsx
import { ClaimReviewJsonLd } from "next-seo";

export default function FactCheckPage() {
  return (
    <>
      <ClaimReviewJsonLd
        claimReviewed="The world is flat"
        reviewRating={{
          ratingValue: 1,
          bestRating: 5,
          worstRating: 1,
          alternateName: "False",
        }}
        url="https://example.com/fact-check/flat-earth"
        author="Fact Check Team"
      />
      <article>
        <h1>Fact Check: The World is Flat</h1>
        {/* Your fact check content */}
      </article>
    </>
  );
}
```

#### Props

| Property        | Type                               | Description                                                                           |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| `claimReviewed` | `string`                           | **Required.** A short summary of the claim being evaluated (keep under 75 characters) |
| `reviewRating`  | `object`                           | **Required.** The assessment of the claim with rating value and textual rating        |
| `url`           | `string`                           | **Required.** Link to the page hosting the full fact check article                    |
| `author`        | `string \| Organization \| Person` | The publisher of the fact check article                                               |
| `itemReviewed`  | `Claim`                            | Detailed information about the claim being reviewed                                   |
| `scriptId`      | `string`                           | Custom ID for the script tag                                                          |
| `scriptKey`     | `string`                           | Custom key for script identification                                                  |

#### Review Rating Properties

| Property        | Type     | Description                                                                                 |
| --------------- | -------- | ------------------------------------------------------------------------------------------- |
| `alternateName` | `string` | **Required.** The truthfulness rating as human-readable text (e.g., "False", "Mostly true") |
| `ratingValue`   | `number` | **Required.** Numeric rating (closer to bestRating = more true)                             |
| `bestRating`    | `number` | Best value in the rating scale (must be greater than worstRating)                           |
| `worstRating`   | `number` | Worst value in the rating scale (minimum value of 1)                                        |
| `name`          | `string` | Alternative to alternateName (use alternateName instead)                                    |

#### Advanced Example with Claim Details

```tsx
<ClaimReviewJsonLd
  claimReviewed="Climate change is not real"
  reviewRating={{
    ratingValue: 1,
    bestRating: 5,
    worstRating: 1,
    alternateName: "Pants on Fire",
  }}
  url="https://example.com/fact-check/climate-denial"
  author={{
    name: "Climate Facts Organization",
    url: "https://example.com",
    logo: "https://example.com/logo.jpg",
  }}
  itemReviewed={{
    author: {
      name: "Climate Denial Institute",
      sameAs: "https://climatedenial.example.com",
    },
    datePublished: "2024-06-20",
    appearance: {
      url: "https://example.com/original-claim",
      headline: "The Great Climate Hoax",
      datePublished: "2024-06-22",
      author: "John Doe",
      publisher: {
        name: "Denial News",
        logo: "https://example.com/denial-logo.jpg",
      },
    },
  }}
/>
```

#### Best Practices

1. **Clear ratings**: Use descriptive alternateName values that clearly indicate the verdict
2. **Claim summary**: Keep claimReviewed concise (under 75 characters) to prevent wrapping
3. **Full context**: Include itemReviewed when possible to provide claim origin details
4. **Consistent scale**: Use a consistent rating scale across all your fact checks
5. **Author credibility**: Clearly identify your fact-checking organization

[↑ Back to Components](#-components-by-category)

### CreativeWorkJsonLd

The `CreativeWorkJsonLd` component helps you add structured data for various types of creative content, with special support for marking paywalled or subscription-based content. This enables Google to differentiate paywalled content from cloaking practices.

#### Basic Usage

```tsx
import { CreativeWorkJsonLd } from "next-seo";

export default function ArticlePage() {
  return (
    <>
      <CreativeWorkJsonLd
        type="Article"
        headline="Premium Article"
        datePublished="2024-01-01T08:00:00+08:00"
        author="John Doe"
        description="This premium article requires a subscription"
        isAccessibleForFree={false}
        hasPart={{
          isAccessibleForFree: false,
          cssSelector: ".paywall",
        }}
      />
      <article>
        <h1>Premium Article</h1>
        <div className="non-paywall">Free preview content here...</div>
        <div className="paywall">
          Premium content that requires subscription...
        </div>
      </article>
    </>
  );
}
```

#### Props

| Property              | Type                                                                                          | Description                                                  |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `type`                | `"CreativeWork" \| "Article" \| "NewsArticle" \| "Blog" \| "BlogPosting" \| "Comment" \| ...` | The type of creative work. Defaults to "CreativeWork"        |
| `headline`            | `string`                                                                                      | The headline of the content (used for Article types)         |
| `name`                | `string`                                                                                      | The name of the content (alternative to headline)            |
| `url`                 | `string`                                                                                      | URL of the content                                           |
| `author`              | `string \| Person \| Organization \| Array`                                                   | Author(s) of the content                                     |
| `datePublished`       | `string`                                                                                      | ISO 8601 publication date                                    |
| `dateModified`        | `string`                                                                                      | ISO 8601 modification date                                   |
| `image`               | `string \| ImageObject \| Array`                                                              | Image(s) associated with the content                         |
| `publisher`           | `string \| Organization \| Person`                                                            | Publisher of the content                                     |
| `description`         | `string`                                                                                      | Description of the content                                   |
| `isAccessibleForFree` | `boolean`                                                                                     | Whether the content is free or requires payment/subscription |
| `hasPart`             | `WebPageElement \| WebPageElement[]`                                                          | Marks specific sections as paywalled                         |
| `mainEntityOfPage`    | `string \| WebPage`                                                                           | The main page for this content                               |
| `scriptId`            | `string`                                                                                      | Custom ID for the script tag                                 |
| `scriptKey`           | `string`                                                                                      | Custom key for script identification                         |

#### WebPageElement Properties (for hasPart)

| Property              | Type      | Description                                         |
| --------------------- | --------- | --------------------------------------------------- |
| `isAccessibleForFree` | `boolean` | **Required.** Whether this section is free (false)  |
| `cssSelector`         | `string`  | **Required.** CSS class selector (e.g., ".paywall") |

#### Marking Paywalled Content

```tsx
<CreativeWorkJsonLd
  type="NewsArticle"
  headline="Breaking News: Premium Coverage"
  datePublished="2024-01-01T08:00:00+00:00"
  isAccessibleForFree={false}
  hasPart={{
    isAccessibleForFree: false,
    cssSelector: ".premium-content",
  }}
/>
```

#### Multiple Paywalled Sections

```tsx
<CreativeWorkJsonLd
  type="Article"
  headline="In-Depth Analysis"
  datePublished="2024-01-01T08:00:00+00:00"
  isAccessibleForFree={false}
  hasPart={[
    {
      isAccessibleForFree: false,
      cssSelector: ".section1",
    },
    {
      isAccessibleForFree: false,
      cssSelector: ".section2",
    },
  ]}
/>
```

#### Different CreativeWork Types

```tsx
// Blog with subscription content
<CreativeWorkJsonLd
  type="Blog"
  name="Premium Tech Blog"
  description="Technology insights for subscribers"
  isAccessibleForFree={false}
/>

// Comment
<CreativeWorkJsonLd
  type="Comment"
  text="Great article!"
  author="Jane Smith"
  datePublished="2024-01-01T10:00:00+00:00"
/>

// Course with provider
<CreativeWorkJsonLd
  type="Course"
  name="Advanced Programming"
  provider="Tech University"
  description="Learn advanced programming concepts"
  isAccessibleForFree={false}
/>

// Review with rating
<CreativeWorkJsonLd
  type="Review"
  name="Product Review"
  itemReviewed="Amazing Gadget"
  reviewRating={{
    ratingValue: 4.5,
    bestRating: 5,
  }}
  author="Tech Reviewer"
/>
```

#### Best Practices

1. **Use specific types**: Choose the most specific CreativeWork type (Article, NewsArticle, etc.) when applicable
2. **Mark paywalled sections**: Use `hasPart` with `cssSelector` to identify paywalled content sections
3. **Class selectors only**: Only use class selectors (e.g., ".paywall") for `cssSelector`, not IDs or other selectors
4. **Consistent selectors**: Ensure your HTML classes match the `cssSelector` values exactly
5. **Complete metadata**: Include as much metadata as possible (author, dates, images) for better search results

[↑ Back to Components](#-components-by-category)

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

[↑ Back to Components](#-components-by-category)

### HowToJsonLd

The `HowToJsonLd` component helps you add structured data for how-to guides and tutorials. This can help your content appear as rich results with step-by-step instructions in search results.

#### Basic Usage

```tsx
import { HowToJsonLd } from "next-seo";

export default function HowToPage() {
  return (
    <>
      <HowToJsonLd
        name="How to Change a Flat Tire"
        description="Step-by-step instructions for safely changing a flat tire"
        image="https://example.com/tire-change.jpg"
        totalTime="PT30M"
        estimatedCost="$20"
        supply={["Spare tire", "Wheel wedges"]}
        tool={["Lug wrench", "Jack"]}
        step={[
          "Turn on hazard lights and apply wheel wedges",
          "Remove the hubcap and loosen lug nuts",
          "Position jack and raise the vehicle",
          "Remove flat tire and mount spare",
          "Lower vehicle and tighten lug nuts",
        ]}
      />
      <article>
        <h1>How to Change a Flat Tire</h1>
        {/* Guide content */}
      </article>
    </>
  );
}
```

#### Advanced Example with Sections and Detailed Steps

```tsx
<HowToJsonLd
  name="How to Change a Flat Tire"
  description="Complete guide to safely changing a flat tire on the roadside"
  image={{
    url: "https://example.com/tire-change-guide.jpg",
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
      image: "https://example.com/lug-wrench.jpg",
    },
    {
      name: "Jack",
    },
    {
      name: "Wheel wedges",
      image: "https://example.com/wheel-wedges.jpg",
    },
  ]}
  supply={[
    {
      name: "Flares",
      image: "https://example.com/flares.jpg",
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
              text: "Position wheel wedges in front of front tires if rear tire is flat, or behind rear tires if front tire is flat.",
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
      name: "Raise the Car",
      position: 2,
      itemListElement: [
        {
          "@type": "HowToStep",
          position: 1,
          text: "Position the jack underneath the car, next to the flat tire.",
          image: "https://example.com/position-jack.jpg",
        },
        {
          "@type": "HowToStep",
          position: 2,
          text: "Raise the jack until the flat tire is just barely off of the ground.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          text: "Remove the hubcap and loosen the lug nuts.",
        },
      ],
    },
    {
      "@type": "HowToSection",
      name: "Finishing Up",
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
    description: "Watch our mechanic demonstrate the proper technique",
    thumbnailUrl: "https://example.com/video-thumb.jpg",
    contentUrl: "https://example.com/tire-change-video.mp4",
    uploadDate: "2024-01-15T08:00:00+00:00",
    duration: "PT8M",
  }}
/>
```

#### Props

| Property        | Type                                                 | Description                                                               |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| `name`          | `string`                                             | **Required.** The title of the how-to guide                               |
| `description`   | `string`                                             | A brief description of the guide                                          |
| `image`         | `string \| ImageObject`                              | An image of the completed task or project                                 |
| `estimatedCost` | `string \| MonetaryAmount`                           | The estimated cost of supplies (e.g., "$20" or MonetaryAmount object)     |
| `prepTime`      | `string`                                             | ISO 8601 duration for preparation time                                    |
| `performTime`   | `string`                                             | ISO 8601 duration for the time to perform the instructions                |
| `totalTime`     | `string`                                             | ISO 8601 duration for total time (prep + perform)                         |
| `yield`         | `string \| QuantitativeValue`                        | The result of performing the instructions (e.g., "1 birdhouse")           |
| `supply`        | `string \| HowToSupply \| (string \| HowToSupply)[]` | Supplies consumed when performing the task                                |
| `tool`          | `string \| HowToTool \| (string \| HowToTool)[]`     | Tools used but not consumed                                               |
| `step`          | `string \| HowToStep \| HowToSection \| (Step)[]`    | The steps to complete the task. Can be simple strings, steps, or sections |
| `video`         | `VideoObject`                                        | A video showing how to complete the task                                  |
| `scriptId`      | `string`                                             | Custom ID for the script tag                                              |
| `scriptKey`     | `string`                                             | Custom key prop for React                                                 |

#### Step Types

**HowToStep** - A single step in the guide:

```tsx
{
  "@type": "HowToStep",
  name: "Step Name",           // Optional step title
  text: "Step instructions",   // The instruction text
  url: "https://...",         // Optional URL for more details
  image: "https://...",       // Optional step image
}
```

**HowToSection** - A group of related steps:

```tsx
{
  "@type": "HowToSection",
  name: "Section Name",
  position: 1,
  itemListElement: [
    { "@type": "HowToStep", text: "First step" },
    { "@type": "HowToStep", text: "Second step" },
  ]
}
```

**HowToDirection** and **HowToTip** - For detailed step content:

```tsx
{
  "@type": "HowToStep",
  itemListElement: [
    {
      "@type": "HowToDirection",
      text: "Do this specific action",
      beforeMedia: "https://example.com/before.jpg",
      afterMedia: "https://example.com/after.jpg",
    },
    {
      "@type": "HowToTip",
      text: "Here's a helpful tip",
    }
  ]
}
```

#### Duration Format (ISO 8601)

Use these formats for time durations:

- `PT15M` - 15 minutes
- `PT1H` - 1 hour
- `PT1H30M` - 1 hour 30 minutes
- `PT2H15M` - 2 hours 15 minutes

#### Best Practices

1. **Clear steps**: Write concise, actionable step instructions
2. **Include images**: Add images for complex steps to improve clarity
3. **Separate sections**: Use HowToSection to group related steps logically
4. **Accurate timing**: Provide realistic time estimates for each phase
5. **List all materials**: Include all supplies and tools needed upfront
6. **Add video**: Video content significantly improves search appearance

[↑ Back to Components](#-components-by-category)

### OrganizationJsonLd

The `OrganizationJsonLd` component helps you add structured data about your organization to improve how it appears in search results and knowledge panels.

#### Basic Usage

```tsx
import { OrganizationJsonLd } from "next-seo";

export default function AboutPage() {
  return (
    <>
      <OrganizationJsonLd
        name="Example Corporation"
        url="https://www.example.com"
        logo="https://www.example.com/logo.png"
        description="The example corporation is well-known for producing high-quality widgets"
        sameAs={[
          "https://twitter.com/example",
          "https://facebook.com/example",
          "https://linkedin.com/company/example",
        ]}
      />
      <div>
        <h1>About Example Corporation</h1>
        {/* About page content */}
      </div>
    </>
  );
}
```

#### Advanced Example with Address and Contact

```tsx
<OrganizationJsonLd
  type="Organization"
  name="Example Corporation"
  url="https://www.example.com"
  logo={{
    "@type": "ImageObject",
    url: "https://www.example.com/logo.png",
    width: 600,
    height: 400,
  }}
  description="Leading provider of innovative widget solutions"
  sameAs={[
    "https://example.net/profile/example1234",
    "https://example.org/example1234",
  ]}
  address={{
    "@type": "PostalAddress",
    streetAddress: "999 W Example St Suite 99",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10019",
    addressCountry: "US",
  }}
  contactPoint={{
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+1-999-999-9999",
    email: "support@example.com",
  }}
  telephone="+1-999-999-9999"
  email="contact@example.com"
  foundingDate="2010-01-01"
  vatID="FR12345678901"
  iso6523Code="0199:724500PMK2A2M1SQQ228"
  numberOfEmployees={{
    minValue: 100,
    maxValue: 999,
  }}
/>
```

#### OnlineStore Example with Return Policy

```tsx
<OrganizationJsonLd
  type="OnlineStore"
  name="Example Online Store"
  url="https://www.example.com"
  logo="https://www.example.com/assets/logo.png"
  contactPoint={{
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@example.com",
    telephone: "+47-99-999-9900",
  }}
  vatID="FR12345678901"
  iso6523Code="0199:724500PMK2A2M1SQQ228"
  hasMerchantReturnPolicy={{
    "@type": "MerchantReturnPolicy",
    applicableCountry: ["FR", "CH"],
    returnPolicyCountry: "FR",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 60,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    refundType: "https://schema.org/FullRefund",
  }}
/>
```

#### Props

| Property                  | Type                                                     | Description                                             |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| `type`                    | `"Organization" \| "OnlineStore"`                        | The type of organization. Defaults to "Organization"    |
| `name`                    | `string`                                                 | The name of your organization                           |
| `url`                     | `string`                                                 | The URL of your organization's website                  |
| `logo`                    | `string \| ImageObject`                                  | Your organization's logo (112x112px minimum)            |
| `description`             | `string`                                                 | A detailed description of your organization             |
| `sameAs`                  | `string \| string[]`                                     | URLs of your organization's profiles on other sites     |
| `address`                 | `string \| PostalAddress \| (string \| PostalAddress)[]` | Physical or mailing address(es)                         |
| `contactPoint`            | `ContactPoint \| ContactPoint[]`                         | Contact information for your organization               |
| `telephone`               | `string`                                                 | Primary phone number (include country code)             |
| `email`                   | `string`                                                 | Primary email address                                   |
| `alternateName`           | `string`                                                 | Alternative name your organization goes by              |
| `foundingDate`            | `string`                                                 | ISO 8601 date when the organization was founded         |
| `legalName`               | `string`                                                 | Registered legal name if different from name            |
| `taxID`                   | `string`                                                 | Tax ID associated with your organization                |
| `vatID`                   | `string`                                                 | VAT code (important trust signal)                       |
| `duns`                    | `string`                                                 | Dun & Bradstreet DUNS number                            |
| `leiCode`                 | `string`                                                 | Legal Entity Identifier (ISO 17442)                     |
| `naics`                   | `string`                                                 | North American Industry Classification System code      |
| `globalLocationNumber`    | `string`                                                 | GS1 Global Location Number                              |
| `iso6523Code`             | `string`                                                 | ISO 6523 identifier (e.g., "0199:724500PMK2A2M1SQQ228") |
| `numberOfEmployees`       | `number \| QuantitativeValue`                            | Number of employees or range                            |
| `review`                  | `Review \| Review[]`                                     | A review or array of reviews of the organization        |
| `aggregateRating`         | `AggregateRating`                                        | The overall rating based on a collection of reviews     |
| `hasMerchantReturnPolicy` | `MerchantReturnPolicy \| MerchantReturnPolicy[]`         | Return policy details (OnlineStore only)                |
| `hasMemberProgram`        | `MemberProgram \| MemberProgram[]`                       | Loyalty/membership program details (OnlineStore only)   |
| `scriptId`                | `string`                                                 | Custom ID for the script tag                            |
| `scriptKey`               | `string`                                                 | Custom key prop for React                               |

#### Organization with Reviews and Ratings

```tsx
<OrganizationJsonLd
  name="Acme Software Inc."
  url="https://www.acmesoftware.com"
  logo="https://www.acmesoftware.com/logo.png"
  review={[
    {
      author: "Sarah Johnson",
      reviewBody: "Excellent company to work with!",
      reviewRating: {
        ratingValue: 5,
        bestRating: 5,
      },
      datePublished: "2025-06-15",
    },
    {
      author: "Michael Chen",
      reviewBody: "Great software solutions with excellent customer service.",
      reviewRating: {
        ratingValue: 4,
        bestRating: 5,
      },
      datePublished: "2025-08-22",
    },
  ]}
  aggregateRating={{
    ratingValue: 4.6,
    ratingCount: 312,
    reviewCount: 245,
    bestRating: 5,
    worstRating: 1,
  }}
/>
```

#### OnlineStore with Loyalty Program Example

```tsx
<OrganizationJsonLd
  type="OnlineStore"
  name="Example Store"
  url="https://www.example.com"
  hasMemberProgram={{
    name: "Rewards Plus",
    description:
      "Earn points and unlock exclusive benefits with our loyalty program",
    url: "https://www.example.com/rewards",
    hasTiers: [
      {
        name: "Bronze",
        hasTierBenefit: "TierBenefitLoyaltyPoints",
        membershipPointsEarned: 1,
      },
      {
        name: "Silver",
        hasTierBenefit: ["TierBenefitLoyaltyPoints"],
        hasTierRequirement: {
          value: 500,
          currency: "USD",
        },
        membershipPointsEarned: 2,
      },
      {
        name: "Gold",
        hasTierBenefit: ["TierBenefitLoyaltyPoints", "TierBenefitLoyaltyPrice"],
        hasTierRequirement: {
          name: "Example Gold Credit Card",
        },
        membershipPointsEarned: 5,
        url: "https://www.example.com/rewards/gold",
      },
    ],
  }}
/>
```

#### Multiple Loyalty Programs Example

```tsx
<OrganizationJsonLd
  type="OnlineStore"
  name="Premium Store"
  hasMemberProgram={[
    {
      name: "Basic Rewards",
      description: "Standard loyalty program for all customers",
      hasTiers: {
        name: "Member",
        hasTierBenefit: "TierBenefitLoyaltyPoints",
        membershipPointsEarned: 1,
      },
    },
    {
      name: "VIP Elite",
      description: "Exclusive program for premium members",
      hasTiers: [
        {
          name: "Silver VIP",
          hasTierBenefit: [
            "TierBenefitLoyaltyPoints",
            "TierBenefitLoyaltyPrice",
          ],
          hasTierRequirement: {
            value: 2500,
            currency: "USD",
          },
          membershipPointsEarned: {
            value: 10,
            unitText: "points per dollar",
          },
        },
        {
          name: "Gold VIP",
          hasTierBenefit: [
            "TierBenefitLoyaltyPoints",
            "TierBenefitLoyaltyPrice",
          ],
          hasTierRequirement: {
            price: 9.99,
            priceCurrency: "USD",
            billingDuration: 12,
            billingIncrement: 1,
            unitCode: "MON",
          },
          membershipPointsEarned: 20,
        },
      ],
    },
  ]}
/>
```

#### MemberProgram Properties

| Property      | Type                                       | Description                                   |
| ------------- | ------------------------------------------ | --------------------------------------------- |
| `name`        | `string`                                   | **Required**. Name of the loyalty program     |
| `description` | `string`                                   | **Required**. Description of program benefits |
| `url`         | `string`                                   | URL where customers can sign up               |
| `hasTiers`    | `MemberProgramTier \| MemberProgramTier[]` | **Required**. Tier(s) of the loyalty program  |

#### MemberProgramTier Properties

| Property                 | Type                          | Description                          |
| ------------------------ | ----------------------------- | ------------------------------------ |
| `name`                   | `string`                      | **Required**. Name of the tier       |
| `hasTierBenefit`         | `string \| string[]`          | **Required**. Benefits for this tier |
| `hasTierRequirement`     | `various` (see below)         | Requirements to join this tier       |
| `membershipPointsEarned` | `number \| QuantitativeValue` | Points earned per unit spent         |
| `url`                    | `string`                      | URL for tier-specific signup         |
| `@id`                    | `string`                      | Unique identifier for the tier       |

#### Tier Benefits

Benefits can be specified using short names or full URLs:

- `"TierBenefitLoyaltyPoints"` or `"https://schema.org/TierBenefitLoyaltyPoints"` - Earn loyalty points
- `"TierBenefitLoyaltyPrice"` or `"https://schema.org/TierBenefitLoyaltyPrice"` - Special member pricing

#### Tier Requirements

The `hasTierRequirement` property accepts different types based on the requirement:

**Credit Card Requirement:**

```tsx
hasTierRequirement: {
  name: "Store Premium Credit Card";
}
```

**Minimum Spending Requirement (MonetaryAmount):**

```tsx
hasTierRequirement: {
  value: 1000,
  currency: "USD"
}
```

**Subscription Fee (UnitPriceSpecification):**

```tsx
hasTierRequirement: {
  price: 9.99,
  priceCurrency: "EUR",
  billingDuration: 12,      // Total duration
  billingIncrement: 1,      // Billing frequency
  unitCode: "MON"          // Unit (MON = monthly)
}
```

**Text Description:**

```tsx
hasTierRequirement: "By invitation only - must maintain $10,000+ annual spending";
```

#### Membership Points Earned

Points can be specified as a simple number or as a detailed QuantitativeValue:

**Simple:**

```tsx
membershipPointsEarned: 5;
```

**Detailed:**

```tsx
membershipPointsEarned: {
  value: 10,
  minValue: 10,
  maxValue: 20,
  unitText: "points per dollar (double on special events)"
}
```

#### Best Practices

1. **Place on homepage or about page**: Add this markup to your homepage or a dedicated "about us" page
2. **Use specific subtypes**: Use "OnlineStore" for e-commerce sites rather than generic "Organization"
3. **Include identifiers**: Add VAT ID, ISO codes, and other identifiers for better trust signals
4. **Complete address information**: Provide full address details including country code
5. **Multiple locations**: Use array format for addresses if you have multiple locations
6. **High-quality logo**: Use a logo that looks good on white background, minimum 112x112px

[↑ Back to Components](#-components-by-category)

### LocalBusinessJsonLd

The `LocalBusinessJsonLd` component helps you add structured data for local businesses to improve their appearance in Google Search and Maps results, including knowledge panels and local business carousels.

#### Basic Usage

```tsx
import { LocalBusinessJsonLd } from "next-seo";

<LocalBusinessJsonLd
  type="Restaurant"
  name="Dave's Steak House"
  address={{
    "@type": "PostalAddress",
    streetAddress: "148 W 51st St",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10019",
    addressCountry: "US",
  }}
  telephone="+12125551234"
  url="https://www.example.com"
  priceRange="$$$"
/>;
```

#### Restaurant Example with Full Details

```tsx
<LocalBusinessJsonLd
  type="Restaurant"
  name="Dave's Steak House"
  address={{
    "@type": "PostalAddress",
    streetAddress: "148 W 51st St",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10019",
    addressCountry: "US",
  }}
  geo={{
    "@type": "GeoCoordinates",
    latitude: 40.761293,
    longitude: -73.982294,
  }}
  url="https://www.example.com/restaurant-locations/manhattan"
  telephone="+12122459600"
  image={[
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg",
  ]}
  servesCuisine="American"
  priceRange="$$$"
  openingHoursSpecification={[
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:30",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "16:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "16:00",
      closes: "22:00",
    },
  ]}
  menu="https://www.example.com/menu"
  aggregateRating={{
    "@type": "AggregateRating",
    ratingValue: 4.5,
    ratingCount: 250,
  }}
/>
```

#### Store with Departments

```tsx
<LocalBusinessJsonLd
  type="Store"
  name="Dave's Department Store"
  address={{
    "@type": "PostalAddress",
    streetAddress: "1600 Saratoga Ave",
    addressLocality: "San Jose",
    addressRegion: "CA",
    postalCode: "95129",
    addressCountry: "US",
  }}
  telephone="+14088717984"
  department={[
    {
      type: "Pharmacy",
      name: "Dave's Pharmacy",
      address: "1600 Saratoga Ave, San Jose, CA 95129",
      telephone: "+14088719385",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
  ]}
/>
```

#### Props

| Property                    | Type                                                       | Description                                                                |
| --------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| `type`                      | `string \| string[]`                                       | Business type (e.g., "Restaurant", "Store", or ["Restaurant", "BarOrPub"]) |
| `name`                      | `string`                                                   | **Required.** The name of the business                                     |
| `address`                   | `string \| PostalAddress \| (string \| PostalAddress)[]`   | **Required.** Physical location(s) of the business                         |
| `url`                       | `string`                                                   | The fully-qualified URL of the business location page                      |
| `telephone`                 | `string`                                                   | Primary contact phone number (include country code)                        |
| `image`                     | `string \| ImageObject \| (string \| ImageObject)[]`       | Images of the business (multiple aspect ratios recommended)                |
| `priceRange`                | `string`                                                   | Relative price range (e.g., "$", "$$", "$$$", or "$10-15")                 |
| `geo`                       | `GeoCoordinates`                                           | Geographic coordinates (min 5 decimal places precision)                    |
| `openingHoursSpecification` | `OpeningHoursSpecification \| OpeningHoursSpecification[]` | Business hours including special/seasonal hours                            |
| `review`                    | `Review \| Review[]`                                       | Customer reviews (for review sites only)                                   |
| `aggregateRating`           | `AggregateRating`                                          | Average rating based on multiple reviews                                   |
| `department`                | `LocalBusinessBase \| LocalBusinessBase[]`                 | Departments within the business                                            |
| `menu`                      | `string`                                                   | URL of the menu (for food establishments)                                  |
| `servesCuisine`             | `string \| string[]`                                       | Type of cuisine served (for restaurants)                                   |
| `sameAs`                    | `string \| string[]`                                       | URLs of business profiles on other sites                                   |
| `branchOf`                  | `Organization`                                             | Parent organization if this is a branch                                    |
| `currenciesAccepted`        | `string`                                                   | Currencies accepted (e.g., "USD")                                          |
| `paymentAccepted`           | `string`                                                   | Payment methods accepted                                                   |
| `areaServed`                | `string \| string[]`                                       | Geographic areas served                                                    |
| `email`                     | `string`                                                   | Business email address                                                     |
| `faxNumber`                 | `string`                                                   | Business fax number                                                        |
| `slogan`                    | `string`                                                   | Business slogan or tagline                                                 |
| `description`               | `string`                                                   | Detailed description of the business                                       |
| `publicAccess`              | `boolean`                                                  | Whether the business location is accessible to the public                  |
| `smokingAllowed`            | `boolean`                                                  | Whether smoking is allowed at the location                                 |
| `isAccessibleForFree`       | `boolean`                                                  | Whether access is free                                                     |
| `scriptId`                  | `string`                                                   | Custom ID for the script tag                                               |
| `scriptKey`                 | `string`                                                   | Custom key prop for React                                                  |

#### Opening Hours Examples

**Standard Business Hours:**

```tsx
openingHoursSpecification={[
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "10:00",
    closes: "16:00",
  },
]}
```

**24/7 Operation:**

```tsx
openingHoursSpecification={{
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "00:00",
  closes: "23:59",
}}
```

**Closed on Specific Days:**

```tsx
openingHoursSpecification={{
  "@type": "OpeningHoursSpecification",
  dayOfWeek: "Sunday",
  opens: "00:00",
  closes: "00:00",
}}
```

**Seasonal Hours:**

```tsx
openingHoursSpecification={{
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "10:00",
  closes: "18:00",
  validFrom: "2024-06-01",
  validThrough: "2024-09-30",
}}
```

#### Best Practices

1. **Use specific business types**: Use the most specific LocalBusiness subtype (e.g., "Restaurant" instead of "LocalBusiness")
2. **Multiple types**: For businesses that fit multiple categories, use an array (e.g., `["Restaurant", "BarOrPub"]`)
3. **Complete address**: Provide as many address fields as possible for better local SEO
4. **High-quality images**: Include multiple images with different aspect ratios (16:9, 4:3, 1:1)
5. **Accurate coordinates**: Use at least 5 decimal places for latitude and longitude
6. **Opening hours**: Be precise with opening hours and include seasonal variations
7. **Department naming**: Include the main store name with department name (e.g., "Store Name - Pharmacy")
8. **Price range**: Keep under 100 characters; use standard symbols ($, $$, $$$) or ranges

[↑ Back to Components](#-components-by-category)

### MerchantReturnPolicyJsonLd

The `MerchantReturnPolicyJsonLd` component helps you add structured data for merchant return policies, enabling Google Search to display return policy information alongside your products and in knowledge panels. This component supports both detailed policy specifications and simple links to policy pages.

#### Basic Usage - Option A (Detailed Properties)

Use this pattern when you want to provide detailed return policy information:

```tsx
import { MerchantReturnPolicyJsonLd } from "next-seo";

<MerchantReturnPolicyJsonLd
  applicableCountry={["US", "CA"]}
  returnPolicyCountry="US"
  returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
  merchantReturnDays={30}
  returnMethod="https://schema.org/ReturnByMail"
  returnFees="https://schema.org/FreeReturn"
  refundType="https://schema.org/FullRefund"
  returnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
/>;
```

#### Basic Usage - Option B (Link Only)

Use this pattern when you prefer to link to your return policy page:

```tsx
import { MerchantReturnPolicyJsonLd } from "next-seo";

<MerchantReturnPolicyJsonLd merchantReturnLink="https://www.example.com/returns" />;
```

#### Advanced Usage with All Features

```tsx
import { MerchantReturnPolicyJsonLd } from "next-seo";

<MerchantReturnPolicyJsonLd
  applicableCountry={["DE", "AT", "CH"]}
  returnPolicyCountry="IE"
  returnPolicyCategory="https://schema.org/MerchantReturnFiniteReturnWindow"
  merchantReturnDays={60}
  itemCondition={[
    "https://schema.org/NewCondition",
    "https://schema.org/DamagedCondition",
  ]}
  returnMethod={[
    "https://schema.org/ReturnByMail",
    "https://schema.org/ReturnInStore",
  ]}
  returnFees="https://schema.org/ReturnShippingFees"
  returnShippingFeesAmount={{
    value: 2.99,
    currency: "EUR",
  }}
  refundType={[
    "https://schema.org/FullRefund",
    "https://schema.org/ExchangeRefund",
  ]}
  restockingFee={{
    value: 10,
    currency: "EUR",
  }}
  returnLabelSource="https://schema.org/ReturnLabelInBox"
  // Customer remorse specific
  customerRemorseReturnFees="https://schema.org/ReturnShippingFees"
  customerRemorseReturnShippingFeesAmount={{
    value: 5.99,
    currency: "EUR",
  }}
  customerRemorseReturnLabelSource="https://schema.org/ReturnLabelDownloadAndPrint"
  // Item defect specific
  itemDefectReturnFees="https://schema.org/FreeReturn"
  itemDefectReturnLabelSource="https://schema.org/ReturnLabelInBox"
  // Seasonal override
  returnPolicySeasonalOverride={{
    startDate: "2025-12-01",
    endDate: "2025-01-05",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
  }}
/>;
```

#### Product-Level Return Policy

You can also specify return policies for individual products:

```tsx
import { ProductJsonLd } from "next-seo";

<ProductJsonLd
  name="Premium Wireless Headphones"
  offers={{
    price: 349.99,
    priceCurrency: "USD",
    hasMerchantReturnPolicy: {
      applicableCountry: "US",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 45,
      returnFees: "https://schema.org/FreeReturn",
      refundType: "https://schema.org/FullRefund",
    },
  }}
/>;
```

#### Organization-Level Return Policy

For online stores, specify a standard return policy at the organization level:

```tsx
import { OrganizationJsonLd } from "next-seo";

<OrganizationJsonLd
  type="OnlineStore"
  name="Example Store"
  hasMerchantReturnPolicy={{
    applicableCountry: ["US", "CA"],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 60,
    returnFees: "https://schema.org/FreeReturn",
    refundType: "https://schema.org/FullRefund",
  }}
/>;
```

#### Props

| Property                                  | Type                                     | Description                                                |
| ----------------------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| **Option A Properties**                   |
| `applicableCountry`                       | `string \| string[]`                     | **Required** (Option A). Countries where products are sold |
| `returnPolicyCategory`                    | `string`                                 | **Required** (Option A). Type of return policy             |
| `merchantReturnDays`                      | `number`                                 | Days for returns (required if finite window)               |
| `returnPolicyCountry`                     | `string \| string[]`                     | Countries where returns are processed                      |
| `returnMethod`                            | `string \| string[]`                     | How items can be returned                                  |
| `returnFees`                              | `string`                                 | Type of return fees                                        |
| `returnShippingFeesAmount`                | `MonetaryAmount`                         | Shipping fee for returns                                   |
| `refundType`                              | `string \| string[]`                     | Types of refunds available                                 |
| `restockingFee`                           | `number \| MonetaryAmount`               | Restocking fee (percentage or fixed)                       |
| `returnLabelSource`                       | `string`                                 | How customers get return labels                            |
| `itemCondition`                           | `string \| string[]`                     | Acceptable return conditions                               |
| **Customer Remorse Properties**           |
| `customerRemorseReturnFees`               | `string`                                 | Fees for change-of-mind returns                            |
| `customerRemorseReturnShippingFeesAmount` | `MonetaryAmount`                         | Shipping fee for remorse returns                           |
| `customerRemorseReturnLabelSource`        | `string`                                 | Label source for remorse returns                           |
| **Item Defect Properties**                |
| `itemDefectReturnFees`                    | `string`                                 | Fees for defective item returns                            |
| `itemDefectReturnShippingFeesAmount`      | `MonetaryAmount`                         | Shipping fee for defect returns                            |
| `itemDefectReturnLabelSource`             | `string`                                 | Label source for defect returns                            |
| **Seasonal Override**                     |
| `returnPolicySeasonalOverride`            | `SeasonalOverride \| SeasonalOverride[]` | Temporary policy changes                                   |
| **Option B Property**                     |
| `merchantReturnLink`                      | `string`                                 | URL to return policy page                                  |
| **Component Properties**                  |
| `scriptId`                                | `string`                                 | Custom ID for the script tag                               |
| `scriptKey`                               | `string`                                 | Custom key for React rendering                             |

#### Return Policy Categories

- `https://schema.org/MerchantReturnFiniteReturnWindow` - Limited return period
- `https://schema.org/MerchantReturnNotPermitted` - No returns allowed
- `https://schema.org/MerchantReturnUnlimitedWindow` - Unlimited return period

#### Return Methods

- `https://schema.org/ReturnByMail` - Return by mail
- `https://schema.org/ReturnInStore` - Return in store
- `https://schema.org/ReturnAtKiosk` - Return at kiosk

#### Return Fees

- `https://schema.org/FreeReturn` - No charge for returns
- `https://schema.org/ReturnFeesCustomerResponsibility` - Customer pays for return
- `https://schema.org/ReturnShippingFees` - Specific shipping fee charged

#### Refund Types

- `https://schema.org/FullRefund` - Full monetary refund
- `https://schema.org/ExchangeRefund` - Exchange for same product
- `https://schema.org/StoreCreditRefund` - Store credit issued

#### Best Practices

1. **Choose the right option**: Use Option A for detailed policies, Option B for complex or frequently changing policies
2. **Specify all countries**: List all countries where your policy applies
3. **Different return scenarios**: Use customer remorse and item defect properties for different conditions
4. **Seasonal variations**: Use seasonal overrides for holiday return windows
5. **Product overrides**: Override organization-level policies for specific products when needed
6. **Clear fee structure**: Be transparent about any fees customers will incur
7. **Multiple return methods**: Offer multiple return options for customer convenience
8. **Accurate time windows**: Ensure merchantReturnDays matches your actual policy

[↑ Back to Components](#-components-by-category)

### MovieCarouselJsonLd

The `MovieCarouselJsonLd` component helps you add structured data for movie carousels, enabling your movie lists to appear as rich results in Google Search on mobile devices. This component supports both summary page (URLs only) and all-in-one page (full movie data) patterns.

#### Basic Usage - Summary Page Pattern

Use this pattern when you have separate detail pages for each movie:

```tsx
import { MovieCarouselJsonLd } from "next-seo";

<MovieCarouselJsonLd
  urls={[
    "https://example.com/movies/a-star-is-born",
    "https://example.com/movies/bohemian-rhapsody",
    "https://example.com/movies/black-panther",
  ]}
/>;
```

#### All-in-One Page Pattern

Use this pattern when all movie information is on a single page:

```tsx
<MovieCarouselJsonLd
  movies={[
    {
      name: "A Star Is Born",
      image: "https://example.com/photos/6x9/star-is-born.jpg",
      dateCreated: "2024-10-05",
      director: "Bradley Cooper",
      review: {
        reviewRating: { ratingValue: 5 },
        author: "John D.",
      },
      aggregateRating: {
        ratingValue: 90,
        bestRating: 100,
        ratingCount: 19141,
      },
    },
    {
      name: "Bohemian Rhapsody",
      image: "https://example.com/photos/6x9/bohemian.jpg",
      dateCreated: "2024-11-02",
      director: "Bryan Singer",
      aggregateRating: {
        ratingValue: 61,
        bestRating: 100,
        ratingCount: 21985,
      },
    },
  ]}
/>
```

#### Advanced Example with All Features

```tsx
<MovieCarouselJsonLd
  movies={[
    {
      name: "Black Panther",
      url: "https://example.com/movies/black-panther",
      image: [
        "https://example.com/photos/1x1/black-panther.jpg",
        "https://example.com/photos/4x3/black-panther.jpg",
        "https://example.com/photos/16x9/black-panther.jpg",
      ],
      dateCreated: "2024-02-16",
      director: {
        name: "Ryan Coogler",
        url: "https://example.com/directors/ryan-coogler",
      },
      review: {
        reviewRating: {
          ratingValue: 2,
          bestRating: 5,
        },
        author: {
          name: "Trevor R.",
          url: "https://example.com/reviewers/trevor",
        },
        reviewBody:
          "While visually stunning, the plot fell short of expectations.",
        datePublished: "2024-02-20",
      },
      aggregateRating: {
        ratingValue: 96,
        bestRating: 100,
        ratingCount: 88211,
      },
    },
  ]}
/>
```

#### Props

| Property    | Type                                                | Description                                                      |
| ----------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `urls`      | `Array<string \| {url: string; position?: number}>` | **Required for summary pattern.** URLs to individual movie pages |
| `movies`    | `MovieListItem[]`                                   | **Required for all-in-one pattern.** Array of movie data         |
| `scriptId`  | `string`                                            | Custom ID for the script tag                                     |
| `scriptKey` | `string`                                            | Custom key prop for React                                        |

#### MovieListItem Properties

| Property          | Type                                                 | Description                                                     |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `name`            | `string`                                             | **Required.** The name of the movie                             |
| `image`           | `string \| ImageObject \| (string \| ImageObject)[]` | **Required.** Movie poster/image (6:9 aspect ratio recommended) |
| `url`             | `string`                                             | URL to the movie's page                                         |
| `dateCreated`     | `string`                                             | Release date in ISO 8601 format                                 |
| `director`        | `string \| Person`                                   | Movie director (accepts string or Person object)                |
| `review`          | `Review`                                             | A review of the movie                                           |
| `aggregateRating` | `AggregateRating`                                    | Average rating based on multiple reviews                        |

#### Best Practices

1. **Mobile-only feature**: Movie carousels only appear on mobile devices in Google Search
2. **Image requirements**: Use 6:9 aspect ratio images (Google's requirement for movie carousels)
3. **High-quality images**: Images must be high resolution and properly formatted (.jpg, .png, .gif)
4. **Multiple images**: Consider providing multiple aspect ratios for better compatibility
5. **Complete movie data**: Include as many properties as possible for richer search results
6. **Consistent data**: All movies in the carousel must be from the same website
7. **URL structure**: For summary pages, ensure all URLs point to pages on the same domain

[↑ Back to Components](#-components-by-category)

### BreadcrumbJsonLd

The `BreadcrumbJsonLd` component helps you add breadcrumb structured data to indicate a page's position in the site hierarchy. This can help Google display breadcrumb trails in search results, making it easier for users to understand and navigate your site structure.

#### Basic Usage

```tsx
import { BreadcrumbJsonLd } from "next-seo";

export default function ProductPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: "https://example.com",
          },
          {
            name: "Products",
            item: "https://example.com/products",
          },
          {
            name: "Electronics",
            item: "https://example.com/products/electronics",
          },
          {
            name: "Headphones",
            item: "https://example.com/products/electronics/headphones",
          },
          {
            name: "Wireless Headphones XYZ",
          },
        ]}
      />
      <main>
        <h1>Wireless Headphones XYZ</h1>
        {/* Product content */}
      </main>
    </>
  );
}
```

#### Multiple Breadcrumb Trails

Some pages can be reached through multiple paths. You can specify multiple breadcrumb trails:

```tsx
<BreadcrumbJsonLd
  multipleTrails={[
    // First trail: Category path
    [
      {
        name: "Books",
        item: "https://example.com/books",
      },
      {
        name: "Science Fiction",
        item: "https://example.com/books/sciencefiction",
      },
      {
        name: "Award Winners",
      },
    ],
    // Second trail: Award path
    [
      {
        name: "Literature",
        item: "https://example.com/literature",
      },
      {
        name: "Award Winners",
      },
    ],
  ]}
/>
```

#### Advanced Example with Thing Objects

You can use Thing objects with `@id` instead of plain URL strings:

```tsx
<BreadcrumbJsonLd
  items={[
    {
      name: "Home",
      item: "https://example.com",
    },
    {
      name: "Blog",
      item: { "@id": "https://example.com/blog" },
    },
    {
      name: "Technology",
      item: { "@id": "https://example.com/blog/technology" },
    },
    {
      name: "Understanding JSON-LD",
    },
  ]}
  scriptId="blog-breadcrumb"
  scriptKey="blog-breadcrumb-key"
/>
```

#### Props

| Property         | Type                     | Description                                                      |
| ---------------- | ------------------------ | ---------------------------------------------------------------- |
| `items`          | `BreadcrumbListItem[]`   | Array of breadcrumb items (required if not using multipleTrails) |
| `multipleTrails` | `BreadcrumbListItem[][]` | Array of breadcrumb trails (required if not using items)         |
| `scriptId`       | `string`                 | Custom ID for the script tag                                     |
| `scriptKey`      | `string`                 | Custom key prop for React                                        |

**BreadcrumbListItem Type:**

| Property | Type                          | Description                                            |
| -------- | ----------------------------- | ------------------------------------------------------ |
| `name`   | `string`                      | **Required.** The title of the breadcrumb              |
| `item`   | `string \| { "@id": string }` | URL or Thing object (optional for the last breadcrumb) |

#### Best Practices

1. **Omit the last item's URL**: The last breadcrumb (current page) typically shouldn't have an `item` property
2. **Use logical hierarchy**: Breadcrumbs should represent a typical user path, not necessarily mirror URL structure
3. **Keep names concise**: Use clear, descriptive names that help users understand the hierarchy
4. **Multiple trails**: Use `multipleTrails` when a page can be logically reached through different paths
5. **Include home**: Start trails from a logical entry point (often "Home") but it's not required
6. **Avoid duplicates**: Each trail should represent a unique path to the page
7. **Match visual breadcrumbs**: The structured data should match the breadcrumbs shown on your page

[↑ Back to Components](#-components-by-category)

### CarouselJsonLd

The `CarouselJsonLd` component helps you add structured data for carousels (ItemList) to enable rich results that display multiple cards from your site in a carousel format. This component supports Course, Movie, Recipe, and Restaurant content types.

#### Basic Usage

**Summary Page Pattern (URLs only):**

```tsx
import { CarouselJsonLd } from "next-seo";

// Simple array of URLs
<CarouselJsonLd
  urls={[
    "https://example.com/recipe/cookies",
    "https://example.com/recipe/cake",
    "https://example.com/recipe/pie"
  ]}
/>

// With custom positions
<CarouselJsonLd
  urls={[
    { url: "https://example.com/movie/matrix", position: 1 },
    "https://example.com/movie/inception", // position will be 2
    { url: "https://example.com/movie/interstellar", position: 3 }
  ]}
/>
```

**All-in-One Page Pattern (Full Data):**

```tsx
import { CarouselJsonLd } from "next-seo";

// Course Carousel
<CarouselJsonLd
  contentType="Course"
  items={[
    {
      name: "Introduction to React",
      description: "Learn the fundamentals of React",
      url: "https://example.com/courses/react",
      provider: "Tech Academy"
    },
    {
      name: "Advanced TypeScript",
      description: "Master TypeScript features",
      provider: {
        name: "Code School",
        url: "https://example.com/school"
      }
    }
  ]}
/>

// Movie Carousel
<CarouselJsonLd
  contentType="Movie"
  items={[
    {
      name: "The Matrix",
      image: "https://example.com/matrix.jpg",
      director: "The Wachowskis",
      dateCreated: "1999-03-31",
      aggregateRating: {
        ratingValue: 8.7,
        ratingCount: 1000
      }
    },
    {
      name: "Inception",
      image: [
        "https://example.com/inception1.jpg",
        "https://example.com/inception2.jpg"
      ],
      director: { name: "Christopher Nolan" }
    }
  ]}
/>

// Recipe Carousel
<CarouselJsonLd
  contentType="Recipe"
  items={[
    {
      name: "Chocolate Chip Cookies",
      image: "https://example.com/cookies.jpg",
      description: "Classic chocolate chip cookies",
      author: "Chef John",
      prepTime: "PT20M",
      cookTime: "PT12M",
      recipeYield: 24,
      recipeIngredient: [
        "2 cups flour",
        "1 cup butter",
        "1 cup chocolate chips"
      ],
      aggregateRating: {
        ratingValue: 4.8,
        ratingCount: 250
      }
    }
  ]}
/>

// Restaurant Carousel
<CarouselJsonLd
  contentType="Restaurant"
  items={[
    {
      name: "Joe's Pizza",
      address: "123 Main St, New York, NY 10001",
      telephone: "+1-212-555-0100",
      servesCuisine: ["Italian", "Pizza"],
      priceRange: "$$",
      aggregateRating: {
        ratingValue: 4.5,
        ratingCount: 500
      },
      geo: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    }
  ]}
/>
```

#### Advanced Examples

**Recipe Carousel with Full Details:**

```tsx
<CarouselJsonLd
  contentType="Recipe"
  items={[
    {
      name: "Perfect Pancakes",
      image: [
        "https://example.com/pancakes1.jpg",
        "https://example.com/pancakes2.jpg",
      ],
      description: "Fluffy and delicious pancakes",
      author: [
        "Chef Alice",
        { name: "Chef Bob", url: "https://example.com/chefs/bob" },
      ],
      datePublished: "2024-01-01",
      prepTime: "PT10M",
      cookTime: "PT15M",
      totalTime: "PT25M",
      recipeYield: "4 servings",
      recipeCategory: "Breakfast",
      recipeCuisine: "American",
      recipeIngredient: [
        "2 cups all-purpose flour",
        "2 tablespoons sugar",
        "2 eggs",
        "1 1/2 cups milk",
      ],
      recipeInstructions: [
        "Mix dry ingredients in a bowl",
        { text: "Whisk wet ingredients separately" },
        {
          name: "Cooking",
          itemListElement: [
            { text: "Heat griddle to 375°F" },
            { text: "Pour batter and cook until bubbles form" },
            { text: "Flip and cook until golden" },
          ],
        },
      ],
      nutrition: {
        calories: "250 calories",
        proteinContent: "8g",
        carbohydrateContent: "35g",
        fatContent: "9g",
      },
      aggregateRating: {
        ratingValue: 4.9,
        ratingCount: 1200,
      },
      video: {
        name: "How to Make Perfect Pancakes",
        description: "Step-by-step video guide",
        thumbnailUrl: "https://example.com/pancakes-thumb.jpg",
        contentUrl: "https://example.com/pancakes-video.mp4",
        uploadDate: "2024-01-01",
        duration: "PT5M30S",
      },
      keywords: "pancakes, breakfast, easy recipe",
    },
  ]}
/>
```

**Restaurant Carousel with Opening Hours:**

```tsx
<CarouselJsonLd
  contentType="Restaurant"
  items={[
    {
      name: "Fine Dining Restaurant",
      address: {
        streetAddress: "456 Oak Avenue",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94102",
        addressCountry: "US",
      },
      image: [
        "https://example.com/restaurant1.jpg",
        "https://example.com/restaurant2.jpg",
      ],
      telephone: "+1-415-555-0200",
      url: "https://example.com/restaurant",
      menu: "https://example.com/restaurant/menu",
      servesCuisine: ["French", "Mediterranean"],
      priceRange: "$$$",
      openingHoursSpecification: [
        {
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "17:00",
          closes: "22:00",
        },
        {
          dayOfWeek: ["Friday", "Saturday"],
          opens: "17:00",
          closes: "23:00",
        },
      ],
      review: [
        {
          reviewRating: { ratingValue: 5 },
          author: "Food Critic",
          reviewBody: "Exceptional dining experience",
        },
      ],
      aggregateRating: {
        ratingValue: 4.7,
        bestRating: 5,
        ratingCount: 850,
      },
    },
  ]}
/>
```

#### Props

| Property      | Type                                                              | Description                                      |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| `urls`        | `SummaryPageItem[]`                                               | Array of URLs for summary page pattern           |
| `contentType` | `"Course" \| "Movie" \| "Recipe" \| "Restaurant"`                 | Type of content in the carousel (for all-in-one) |
| `items`       | `CourseItem[] \| MovieItem[] \| RecipeItem[] \| RestaurantItem[]` | Array of items matching the content type         |
| `scriptId`    | `string`                                                          | Custom ID for the script tag                     |
| `scriptKey`   | `string`                                                          | Custom key prop for React                        |

**SummaryPageItem Type:**

| Type                                 | Description                       |
| ------------------------------------ | --------------------------------- |
| `string`                             | Simple URL string                 |
| `{ url: string; position?: number }` | URL with optional custom position |

#### Best Practices

1. **Choose the right pattern**:
   - Use **summary page pattern** when you have separate detail pages for each item
   - Use **all-in-one pattern** when all content is on a single page

2. **Consistent content types**: All items in a carousel must be of the same type (e.g., all recipes or all movies)

3. **Required images**:
   - Movies require at least one image
   - Recipes should include images for better visibility
   - Use multiple aspect ratios when possible

4. **Position numbering**:
   - Positions start at 1, not 0
   - If not specified, positions are auto-assigned sequentially

5. **URL structure**: For summary pages, ensure all URLs point to pages on the same domain

6. **Rich content**: Include as much relevant information as possible for better search results

7. **Validation**: Test your structured data with Google's Rich Results Test

[↑ Back to Components](#-components-by-category)

### CourseJsonLd

The `CourseJsonLd` component helps you add structured data for courses to enable course list rich results in Google Search. This can help prospective students discover your courses more easily.

#### Basic Usage

**Single Course:**

```tsx
import { CourseJsonLd } from "next-seo";

<CourseJsonLd
  name="Introduction to Computer Science"
  description="An introductory CS course laying out the basics."
  provider="University of Technology"
/>;
```

**Course List:**

```tsx
import { CourseJsonLd } from "next-seo";

// Summary page pattern - just URLs
<CourseJsonLd
  type="list"
  urls={[
    "https://example.com/courses/intro-cs",
    "https://example.com/courses/intermediate-cs",
    "https://example.com/courses/advanced-cs"
  ]}
/>

// All-in-one page pattern - full course data
<CourseJsonLd
  type="list"
  courses={[
    {
      name: "Introduction to Programming",
      description: "Learn the basics of programming.",
      url: "https://example.com/courses/intro-programming",
      provider: "Tech Institute"
    },
    {
      name: "Advanced Algorithms",
      description: "Study complex algorithmic solutions.",
      provider: {
        name: "University Online",
        sameAs: "https://university.edu"
      }
    }
  ]}
/>
```

#### Props

**Single Course Props:**

| Property      | Type                                                    | Description                                                           |
| ------------- | ------------------------------------------------------- | --------------------------------------------------------------------- |
| `type`        | `"single"`                                              | Optional. Explicitly sets single course pattern                       |
| `name`        | `string`                                                | **Required.** The title of the course                                 |
| `description` | `string`                                                | **Required.** A description of the course (60 char limit for display) |
| `url`         | `string`                                                | The URL of the course page                                            |
| `provider`    | `string \| Organization \| Omit<Organization, "@type">` | The organization offering the course                                  |
| `scriptId`    | `string`                                                | Custom ID for the script tag                                          |
| `scriptKey`   | `string`                                                | Custom key for React reconciliation                                   |

**Course List Props:**

| Property    | Type                                               | Description                                |
| ----------- | -------------------------------------------------- | ------------------------------------------ |
| `type`      | `"list"`                                           | **Required.** Sets the course list pattern |
| `urls`      | `(string \| { url: string; position?: number })[]` | URLs for summary page pattern              |
| `courses`   | `CourseListItem[]`                                 | Full course data for all-in-one pattern    |
| `scriptId`  | `string`                                           | Custom ID for the script tag               |
| `scriptKey` | `string`                                           | Custom key for React reconciliation        |

#### Advanced Example

```tsx
import { CourseJsonLd } from "next-seo";

export default function CourseCatalogPage() {
  return (
    <>
      <CourseJsonLd
        type="list"
        courses={[
          {
            name: "Full-Stack Web Development",
            description: "Master modern web development from front to back.",
            url: "https://example.com/courses/fullstack",
            provider: {
              name: "Code Academy",
              url: "https://codeacademy.com",
              sameAs: [
                "https://twitter.com/codeacademy",
                "https://linkedin.com/company/codeacademy",
              ],
            },
          },
          {
            name: "Data Science with Python",
            description:
              "Learn data analysis and machine learning with Python.",
            url: "https://example.com/courses/data-science",
            provider: "Tech University",
          },
          {
            name: "Mobile App Development",
            description: "Build iOS and Android apps with React Native.",
            url: "https://example.com/courses/mobile-dev",
            provider: {
              name: "Mobile Dev Institute",
              logo: "https://example.com/logo.png",
            },
          },
        ]}
      />

      <h1>Our Course Catalog</h1>
      {/* Your course list UI */}
    </>
  );
}
```

#### Best Practices

1. **Minimum of 3 courses**: Google requires at least 3 courses for course list rich results
2. **Consistent provider**: Use the same format for provider across all courses
3. **Description length**: Keep descriptions under 60 characters for optimal display
4. **Valid URLs**: Ensure all course URLs are accessible and on the same domain
5. **Choose the right pattern**:
   - Use **summary page** pattern when courses have their own detail pages
   - Use **all-in-one** pattern when all course information is on a single page
6. **Avoid promotional content**: Don't include prices, discounts, or marketing language in course names

### EventJsonLd

The `EventJsonLd` component helps you add structured data for events to improve their discoverability in Google Search results and other Google products like Google Maps. Events can appear with rich features including images, dates, locations, and ticket information.

#### Basic Usage

```tsx
import { EventJsonLd } from "next-seo";

<EventJsonLd
  name="The Adventures of Kira and Morrison"
  startDate="2025-07-21T19:00-05:00"
  location="Snickerpark Stadium"
/>;
```

#### Standard Event Example

```tsx
<EventJsonLd
  name="The Adventures of Kira and Morrison"
  startDate="2025-07-21T19:00-05:00"
  endDate="2025-07-21T23:00-05:00"
  location={{
    "@type": "Place",
    name: "Snickerpark Stadium",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 West Snickerpark Dr",
      addressLocality: "Snickertown",
      postalCode: "19019",
      addressRegion: "PA",
      addressCountry: "US",
    },
  }}
  description="The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance."
  image={[
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg",
  ]}
  offers={{
    "@type": "Offer",
    url: "https://www.example.com/event_offer/12345_202403180430",
    price: 30,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2024-05-21T12:00",
  }}
  performer={{
    "@type": "PerformingGroup",
    name: "Kira and Morrison",
  }}
  organizer={{
    "@type": "Organization",
    name: "Kira and Morrison Music",
    url: "https://kiraandmorrisonmusic.com",
  }}
/>
```

#### Event Status Examples

##### Cancelled Event

```tsx
<EventJsonLd
  name="Summer Festival 2025"
  startDate="2025-08-15T12:00:00"
  location="City Park"
  eventStatus="https://schema.org/EventCancelled"
/>
```

##### Rescheduled Event

```tsx
<EventJsonLd
  name="Tech Conference 2025"
  startDate="2025-09-20T09:00:00"
  location="Convention Center"
  eventStatus="https://schema.org/EventRescheduled"
  previousStartDate="2025-07-15T09:00:00"
/>
```

#### Props

| Property            | Type                                                 | Description                                                                        |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `name`              | `string`                                             | **Required.** The full title of the event                                          |
| `startDate`         | `string`                                             | **Required.** Start date/time in ISO-8601 format                                   |
| `location`          | `string \| Place`                                    | **Required.** Event venue (string or Place object)                                 |
| `endDate`           | `string`                                             | End date/time in ISO-8601 format                                                   |
| `description`       | `string`                                             | Detailed description of the event                                                  |
| `eventStatus`       | `EventStatusType`                                    | Status: EventScheduled (default), EventCancelled, EventPostponed, EventRescheduled |
| `image`             | `string \| ImageObject \| (string \| ImageObject)[]` | Event images (recommended: multiple aspect ratios)                                 |
| `offers`            | `Offer \| Offer[]`                                   | Ticket/pricing information                                                         |
| `performer`         | `string \| Person \| PerformingGroup \| array`       | Performers at the event                                                            |
| `organizer`         | `string \| Person \| Organization`                   | Event host/organizer                                                               |
| `previousStartDate` | `string \| string[]`                                 | Previous date(s) for rescheduled events                                            |
| `url`               | `string`                                             | URL of the event page                                                              |
| `scriptId`          | `string`                                             | Custom ID for the script tag                                                       |
| `scriptKey`         | `string`                                             | Custom key prop for React                                                          |

#### Offer Type

| Property        | Type     | Description                                      |
| --------------- | -------- | ------------------------------------------------ |
| `url`           | `string` | URL to purchase tickets                          |
| `price`         | `number` | Lowest available price (use 0 for free events)   |
| `priceCurrency` | `string` | 3-letter ISO 4217 currency code (e.g., "USD")    |
| `availability`  | `string` | Availability status (InStock, SoldOut, PreOrder) |
| `validFrom`     | `string` | Date/time when tickets go on sale                |

#### Best Practices

1. **Date/Time Format**: Always use ISO-8601 format with timezone offset (e.g., `2025-07-21T19:00-05:00`)
2. **Day-long Events**: For all-day events, use date only format (e.g., `2025-07-04`)
3. **Location Details**: Provide complete address information for better discoverability
4. **Multiple Images**: Include images in different aspect ratios (16:9, 4:3, 1:1) for various display contexts
5. **Event Status**: Keep original dates when cancelling/postponing; only update the `eventStatus`
6. **Free Events**: Set `price: 0` for events without charge
7. **Multiple Performers**: Use an array when listing multiple artists or speakers
8. **Rescheduled Events**: Always include `previousStartDate` when using `EventRescheduled` status

#### Date and Time Guidelines

- **Include timezone**: Specify UTC/GMT offset (e.g., `-05:00` for EST)
- **Multi-day events**: Set both `startDate` and `endDate`
- **Unknown end time**: Omit `endDate` rather than guessing
- **Date-only format**: Use for all-day events (e.g., festivals)

Example timezone handling:

```tsx
// New York event during standard time
startDate: "2025-12-21T19:00:00-05:00";

// California event during daylight saving time
startDate: "2025-07-21T19:00:00-07:00";

// All-day event
startDate: "2025-07-04";
endDate: "2025-07-04";
```

### FAQJsonLd

The `FAQJsonLd` component helps you add structured data for frequently asked questions (FAQ) pages. This can help your FAQ content appear as rich results in Google Search, making it easier for users to find answers to common questions.

> **Note**: FAQ rich results are only available for well-known, authoritative government or health websites. However, implementing proper FAQ structured data is still valuable for SEO and can help search engines better understand your content.

#### Basic Usage

```tsx
import { FAQJsonLd } from "next-seo";

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd
        questions={[
          {
            question: "How to find an apprenticeship?",
            answer:
              "We provide an official service to search through available apprenticeships. To get started, create an account here, specify the desired region, and your preferences.",
          },
          {
            question: "Whom to contact?",
            answer:
              "You can contact the apprenticeship office through our official phone hotline above, or with the web-form below.",
          },
        ]}
      />
      <h1>Frequently Asked Questions</h1>
      {/* Your FAQ content */}
    </>
  );
}
```

#### Advanced Example with HTML Content

FAQ answers support HTML content including links, lists, and formatting:

```tsx
<FAQJsonLd
  questions={[
    {
      question: "What documents are required for application?",
      answer: `
        <p>You'll need to provide the following documents:</p>
        <ul>
          <li>Valid government-issued ID</li>
          <li>High school diploma or equivalent</li>
          <li>Proof of residence</li>
          <li><a href="/forms/medical">Medical clearance form</a></li>
        </ul>
        <p>All documents must be submitted within 30 days of application.</p>
      `,
    },
    {
      question: "How long does the application process take?",
      answer:
        "<p>The typical processing time is <strong>7-10 business days</strong> from the date we receive all required documents.</p>",
    },
  ]}
  scriptId="faq-structured-data"
/>
```

#### Different Input Formats

The component supports multiple input formats for flexibility:

```tsx
// Simple question/answer format (recommended)
<FAQJsonLd
  questions={[
    {
      question: "What is the cost?",
      answer: "The program is free for eligible participants.",
    },
  ]}
/>

// Schema.org name/acceptedAnswer format
<FAQJsonLd
  questions={[
    {
      name: "What is the cost?",
      acceptedAnswer: "The program is free for eligible participants.",
    },
  ]}
/>

// With Answer object
<FAQJsonLd
  questions={[
    {
      name: "What is the cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program is free for eligible participants.",
      },
    },
  ]}
/>
```

#### Props

| Property    | Type              | Description                                                                             |
| ----------- | ----------------- | --------------------------------------------------------------------------------------- |
| `questions` | `QuestionInput[]` | **Required.** Array of questions and answers. See input formats below.                  |
| `scriptId`  | `string`          | Optional. Sets the `id` attribute on the script tag.                                    |
| `scriptKey` | `string`          | Optional. Sets the `data-testid` attribute on the script tag. Defaults to "faq-jsonld". |

#### Question Input Formats

The `questions` array accepts several formats:

1. **Simple object** (recommended):

   ```tsx
   { question: "string", answer: "string" }
   ```

2. **Schema.org format**:

   ```tsx
   { name: "string", acceptedAnswer: "string" }
   ```

3. **Full Answer object**:
   ```tsx
   {
     name: "string",
     acceptedAnswer: {
       "@type": "Answer",
       text: "string"
     }
   }
   ```

#### Best Practices

1. **Include complete Q&A**: Each question and answer should contain the full text that appears on your page
2. **Use HTML wisely**: Google supports these HTML tags in answers: `<h1>` through `<h6>`, `<br>`, `<ol>`, `<ul>`, `<li>`, `<a>`, `<p>`, `<div>`, `<b>`, `<strong>`, `<i>`, and `<em>`
3. **Match page content**: The FAQ structured data must match the visible Q&A content on your page
4. **Avoid promotional content**: Don't use FAQPage for advertising purposes
5. **One instance per page**: If the same FAQ appears on multiple pages, only mark it up on one page
6. **Expandable sections**: It's fine if answers are hidden behind expandable sections, as long as users can access them
7. **No user submissions**: FAQPage is for questions with single, authoritative answers. For user-generated Q&A, use QAPage instead

### ImageJsonLd

The `ImageJsonLd` component helps you add structured data for images to improve their appearance in Google Images. This enables features like the Licensable badge and displays metadata such as creator, credit, copyright, and licensing information.

#### Basic Usage

```tsx
import { ImageJsonLd } from "next-seo";

<ImageJsonLd
  contentUrl="https://example.com/photos/black-labrador-puppy.jpg"
  creator="Brixton Brownstone"
  license="https://example.com/license"
  acquireLicensePage="https://example.com/how-to-use-my-images"
  creditText="Labrador PhotoLab"
  copyrightNotice="Clara Kent"
/>;
```

#### Advanced Usage - Organization Creator

```tsx
<ImageJsonLd
  contentUrl="https://example.com/photos/product-photo.jpg"
  creator={{
    name: "PhotoLab Studios",
    logo: "https://example.com/photolab-logo.jpg",
    sameAs: ["https://twitter.com/photolab", "https://instagram.com/photolab"],
  }}
  license="https://creativecommons.org/licenses/by-nc/4.0/"
  acquireLicensePage="https://example.com/licensing"
  creditText="PhotoLab Studios"
  copyrightNotice="© 2024 PhotoLab Studios"
/>
```

#### Multiple Images

```tsx
<ImageJsonLd
  images={[
    {
      contentUrl: "https://example.com/photos/black-labrador-puppy.jpg",
      creator: "Brixton Brownstone",
      license: "https://example.com/license",
      creditText: "Labrador PhotoLab",
    },
    {
      contentUrl: "https://example.com/photos/adult-black-labrador.jpg",
      creator: [
        "Brixton Brownstone",
        {
          name: "Clara Kent",
          url: "https://clarakent.com",
        },
      ],
      copyrightNotice: "© 2024 Clara Kent",
      license: "https://example.com/license",
    },
  ]}
/>
```

#### Props

| Property             | Type                 | Description                                                                                                          |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `contentUrl`         | `string`             | **Required.** The URL of the actual image content                                                                    |
| `creator`            | `Author \| Author[]` | The creator(s) of the image (photographer, designer, etc.). Can be string name(s), Person, or Organization object(s) |
| `creditText`         | `string`             | The name of the person/organization credited when the image is published                                             |
| `copyrightNotice`    | `string`             | The copyright notice for claiming intellectual property                                                              |
| `license`            | `string`             | URL to a page describing the license governing the image's use                                                       |
| `acquireLicensePage` | `string`             | URL to a page where users can find information on how to license the image                                           |
| `images`             | `Array<ImageObject>` | Array of image objects with the above properties (for multiple images)                                               |
| `scriptId`           | `string`             | Custom ID for the script tag                                                                                         |
| `scriptKey`          | `string`             | Custom key for script deduplication                                                                                  |

> **Note**: You must include `contentUrl` and at least one of: `creator`, `creditText`, `copyrightNotice`, or `license` for the image to be eligible for enhancements like the Licensable badge.

#### Best Practices

1. **Always provide licensing information**: Include the `license` property to make your images eligible for the Licensable badge
2. **Credit creators properly**: Use structured creator information to ensure proper attribution
3. **Include acquire license page**: Help users understand how they can legally use your images
4. **Use consistent copyright notices**: Maintain clear copyright information across your images
5. **Multiple creators**: When multiple people contributed to an image, list all creators
6. **Organization vs Person**: Use Organization type for companies/studios, Person type for individuals

### QuizJsonLd

The `QuizJsonLd` component helps you add structured data for educational quizzes and flashcards. This can help your educational content appear in Google's education Q&A carousel when users search for educational topics.

#### Basic Usage

```tsx
import { QuizJsonLd } from "next-seo";

export default function BiologyQuizPage() {
  return (
    <>
      <QuizJsonLd
        questions={[
          {
            question: "What is the powerhouse of the cell?",
            answer: "Mitochondria",
          },
          {
            question:
              "What process do plants use to convert sunlight into energy?",
            answer: "Photosynthesis",
          },
        ]}
        about="Cell Biology"
        educationalAlignment={[
          {
            type: "educationalSubject",
            name: "Biology",
          },
          {
            type: "educationalLevel",
            name: "Grade 10",
          },
        ]}
      />
      {/* Your quiz content */}
    </>
  );
}
```

#### Props

| Property               | Type                                                                      | Description                                                  |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `questions`            | `QuestionInput[]`                                                         | **Required.** Array of flashcard questions and answers       |
| `about`                | `string \| Thing`                                                         | The subject or topic of the quiz                             |
| `educationalAlignment` | `Array<{type: "educationalSubject" \| "educationalLevel", name: string}>` | Educational alignments specifying subject and/or grade level |
| `scriptId`             | `string`                                                                  | Custom ID for the script tag                                 |
| `scriptKey`            | `string`                                                                  | Custom key for React (defaults to "quiz-jsonld")             |

#### Question Formats

The `questions` array accepts several formats:

1. **Simple object** (recommended):

   ```tsx
   { question: "What is 2 + 2?", answer: "4" }
   ```

2. **String format** (for fact-based flashcards):

   ```tsx
   "The Earth revolves around the Sun in 365.25 days";
   ```

3. **Text/acceptedAnswer format**:

   ```tsx
   { text: "What is DNA?", acceptedAnswer: "Deoxyribonucleic acid" }
   ```

4. **Full Answer object**:
   ```tsx
   {
     text: "Explain photosynthesis",
     acceptedAnswer: {
       "@type": "Answer",
       text: "The process by which plants convert light energy into chemical energy"
     }
   }
   ```

#### Advanced Example

```tsx
<QuizJsonLd
  questions={[
    // Simple flashcard fact
    "The mitochondria is the powerhouse of the cell",
    // Question/answer format
    {
      question: "What are the four bases of DNA?",
      answer: "Adenine (A), Thymine (T), Guanine (G), and Cytosine (C)",
    },
    // Full format with Answer object
    {
      text: "Describe the water cycle",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The continuous movement of water through evaporation, condensation, precipitation, and collection",
      },
    },
  ]}
  about={{
    name: "Biology Fundamentals",
    description: "Core concepts in cellular and molecular biology",
    url: "https://example.com/biology-course",
  }}
  educationalAlignment={[
    {
      type: "educationalSubject",
      name: "Biology",
    },
    {
      type: "educationalLevel",
      name: "High School",
    },
  ]}
/>
```

#### Best Practices

1. **Educational content only**: Quiz structured data is specifically for educational flashcards and Q&A
2. **Use "Flashcard" type**: All questions automatically use `eduQuestionType: "Flashcard"` as required by Google
3. **Clear answers**: Provide concise, factual answers appropriate for the educational level
4. **Subject alignment**: Always specify the educational subject using `educationalAlignment`
5. **Grade level**: Include the target grade or educational level when applicable
6. **Match visible content**: The structured data should match the quiz content displayed on your page
7. **Single answer format**: Each question should have one clear, authoritative answer

> **Note**: The education Q&A carousel is available when searching for education-related topics in English, Portuguese, Spanish (Mexico), and Vietnamese.

### DatasetJsonLd

The `DatasetJsonLd` component helps you add structured data for datasets, making them easier to find in Google's Dataset Search. This is ideal for scientific data, government data, machine learning datasets, and any other structured data collections.

#### Basic Usage

```tsx
import { DatasetJsonLd } from "next-seo";

export default function DatasetPage() {
  return (
    <>
      <DatasetJsonLd
        name="NCDC Storm Events Database"
        description="Storm Data is provided by the National Weather Service (NWS) and contain statistics on personal injuries and damage estimates."
        url="https://example.com/dataset/storm-events"
        creator="NOAA"
        distribution={{
          contentUrl: "https://www.ncdc.noaa.gov/stormevents/ftp.jsp",
          encodingFormat: "CSV",
        }}
      />
      {/* Your dataset page content */}
    </>
  );
}
```

#### Advanced Example with Full Features

```tsx
<DatasetJsonLd
  name="Global Climate Data 2020-2024"
  description="Comprehensive climate measurements including temperature, precipitation, and atmospheric data collected from weather stations worldwide"
  url="https://example.com/datasets/global-climate-2020-2024"
  sameAs={[
    "https://doi.org/10.1000/182",
    "https://data.gov/dataset/climate-2020-2024",
  ]}
  identifier={[
    "https://doi.org/10.1000/182",
    {
      value: "ark:/12345/fk1234",
      propertyID: "ARK",
    },
  ]}
  keywords={[
    "climate",
    "temperature",
    "precipitation",
    "weather",
    "atmospheric data",
  ]}
  license="https://creativecommons.org/publicdomain/zero/1.0/"
  isAccessibleForFree={true}
  creator={[
    {
      name: "National Centers for Environmental Information",
      url: "https://www.ncei.noaa.gov/",
      contactPoint: {
        contactType: "customer service",
        telephone: "+1-828-271-4800",
        email: "ncei.orders@noaa.gov",
      },
    },
    "Dr. Jane Smith",
  ]}
  funder={{
    name: "National Science Foundation",
    sameAs: "https://ror.org/021nxhr62",
  }}
  includedInDataCatalog={{
    name: "data.gov",
    url: "https://data.gov",
  }}
  distribution={[
    {
      contentUrl: "https://example.com/data/climate-2020-2024.csv",
      encodingFormat: "CSV",
      contentSize: "2.5GB",
      description: "Complete dataset in CSV format",
    },
    {
      contentUrl: "https://example.com/data/climate-2020-2024.json",
      encodingFormat: "JSON",
      contentSize: "3.1GB",
      description: "Complete dataset in JSON format",
    },
  ]}
  temporalCoverage="2020-01-01/2024-12-31"
  spatialCoverage={{
    name: "Global",
    geo: {
      box: "-90 -180 90 180",
    },
  }}
  measurementTechnique="Satellite observation and ground station measurements"
  variableMeasured={[
    "temperature",
    "precipitation",
    {
      name: "Atmospheric Pressure",
      value: "hectopascals",
    },
  ]}
  version="2.1"
/>
```

#### Props

| Property                | Type                                                                       | Description                                                               |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `name`                  | `string`                                                                   | **Required.** A descriptive name of the dataset                           |
| `description`           | `string`                                                                   | **Required.** A short summary describing the dataset (50-5000 characters) |
| `url`                   | `string`                                                                   | URL of the dataset landing page                                           |
| `sameAs`                | `string \| string[]`                                                       | URLs of pages that unambiguously indicate the dataset's identity          |
| `identifier`            | `string \| PropertyValue \| (string \| PropertyValue)[]`                   | Identifiers such as DOI or Compact Identifiers                            |
| `keywords`              | `string \| string[]`                                                       | Keywords summarizing the dataset                                          |
| `license`               | `string \| CreativeWork`                                                   | License under which the dataset is distributed                            |
| `isAccessibleForFree`   | `boolean`                                                                  | Whether the dataset is accessible without payment                         |
| `hasPart`               | `Dataset \| Dataset[]`                                                     | Smaller datasets that are part of this dataset                            |
| `isPartOf`              | `string \| Dataset`                                                        | A larger dataset that this dataset is part of                             |
| `creator`               | `string \| Person \| Organization \| (string \| Person \| Organization)[]` | The creator or author of the dataset                                      |
| `funder`                | `string \| Person \| Organization \| (string \| Person \| Organization)[]` | Person or organization that provides financial support                    |
| `includedInDataCatalog` | `DataCatalog`                                                              | The catalog to which the dataset belongs                                  |
| `distribution`          | `DataDownload \| DataDownload[]`                                           | Download locations and formats for the dataset                            |
| `temporalCoverage`      | `string`                                                                   | Time interval covered by the dataset (ISO 8601 format)                    |
| `spatialCoverage`       | `string \| Place`                                                          | Spatial aspect of the dataset (location name or coordinates)              |
| `alternateName`         | `string \| string[]`                                                       | Alternative names for the dataset                                         |
| `citation`              | `string \| CreativeWork \| (string \| CreativeWork)[]`                     | Academic articles to cite alongside the dataset                           |
| `measurementTechnique`  | `string \| string[]`                                                       | Technique or methodology used in the dataset                              |
| `variableMeasured`      | `string \| PropertyValue \| (string \| PropertyValue)[]`                   | Variables that the dataset measures                                       |
| `version`               | `string \| number`                                                         | Version number for the dataset                                            |
| `scriptId`              | `string`                                                                   | Custom ID for the script tag                                              |
| `scriptKey`             | `string`                                                                   | Custom key for React (defaults to "dataset-jsonld")                       |

#### Spatial Coverage Examples

```tsx
// Named location
spatialCoverage="United States"

// Point coordinates
spatialCoverage={{
  geo: {
    latitude: 39.3280,
    longitude: 120.1633,
  }
}}

// Bounding box (format: "minLat minLon maxLat maxLon")
spatialCoverage={{
  geo: {
    box: "39.3280 120.1633 40.445 123.7878",
  }
}}

// Circle (format: "latitude longitude radius")
spatialCoverage={{
  geo: {
    circle: "39.3280 120.1633 100",
  }
}}
```

#### Temporal Coverage Examples

```tsx
// Single date
temporalCoverage = "2024";

// Date range
temporalCoverage = "2020-01-01/2024-12-31";

// Open-ended range
temporalCoverage = "2024-01-01/..";
```

#### Best Practices

1. **Comprehensive descriptions**: Provide detailed descriptions (50-5000 characters) that clearly explain what the dataset contains
2. **Use persistent identifiers**: Include DOIs or other persistent identifiers when available
3. **Multiple formats**: If your dataset is available in multiple formats, list all distributions
4. **Specify license**: Always include license information to clarify usage rights
5. **Include temporal/spatial coverage**: Help users understand the scope of your data
6. **Use ORCID/ROR IDs**: When specifying creators or funders, use ORCID IDs for individuals and ROR IDs for organizations in the `sameAs` field
7. **Version your datasets**: Include version numbers to help users track updates
8. **Link to catalogs**: If your dataset is in a repository like data.gov, include the `includedInDataCatalog` property

> **Note**: Dataset structured data helps your datasets appear in Google's Dataset Search, which is specifically designed for discovering research and government data.

### JobPostingJsonLd

The `JobPostingJsonLd` component helps you add structured data for job postings to improve their appearance in Google's job search results and the Google Jobs experience.

#### Basic Usage

```tsx
import { JobPostingJsonLd } from "next-seo";

export default function JobPage() {
  return (
    <>
      <JobPostingJsonLd
        title="Software Engineer"
        description="<p>We are looking for a passionate Software Engineer to design, develop and install software solutions.</p>"
        datePosted="2024-01-18"
        hiringOrganization="Google"
        jobLocation="Mountain View, CA"
        baseSalary={{
          currency: "USD",
          value: {
            value: 40.0,
            unitText: "HOUR",
          },
        }}
      />
      <article>
        <h1>Software Engineer</h1>
        {/* Job posting content */}
      </article>
    </>
  );
}
```

#### Advanced Example with Full Details

```tsx
<JobPostingJsonLd
  title="Senior Software Engineer"
  description="<p>Google is looking for a Senior Software Engineer to join our Cloud team. You will be responsible for designing and developing large-scale distributed systems.</p><p>Requirements:</p><ul><li>5+ years of experience</li><li>Strong knowledge of distributed systems</li><li>Experience with cloud technologies</li></ul>"
  datePosted="2024-01-18"
  validThrough="2024-03-18T00:00"
  hiringOrganization={{
    name: "Google",
    sameAs: "https://www.google.com",
    logo: "https://www.google.com/images/logo.png",
  }}
  jobLocation={{
    address: {
      streetAddress: "1600 Amphitheatre Pkwy",
      addressLocality: "Mountain View",
      addressRegion: "CA",
      postalCode: "94043",
      addressCountry: "US",
    },
  }}
  url="https://careers.google.com/jobs/123456"
  employmentType="FULL_TIME"
  identifier={{
    name: "Google",
    value: "1234567",
  }}
  baseSalary={{
    currency: "USD",
    value: {
      minValue: 120000,
      maxValue: 180000,
      unitText: "YEAR",
    },
  }}
  directApply={true}
  educationRequirements={{
    credentialCategory: "bachelor degree",
  }}
  experienceRequirements={{
    monthsOfExperience: 60,
  }}
  experienceInPlaceOfEducation={true}
/>
```

#### Remote Job Example

```tsx
<JobPostingJsonLd
  title="Remote Frontend Developer"
  description="<p>Join our distributed team as a Frontend Developer. Work from anywhere in the US!</p>"
  datePosted="2024-01-18"
  validThrough="2024-02-28T00:00"
  hiringOrganization="TechStartup Inc."
  jobLocationType="TELECOMMUTE"
  applicantLocationRequirements={{
    name: "USA",
  }}
  employmentType="FULL_TIME"
  baseSalary={{
    currency: "USD",
    value: {
      value: 100000,
      unitText: "YEAR",
    },
  }}
/>
```

#### Hybrid Job Example (Remote + Office)

```tsx
<JobPostingJsonLd
  title="Product Manager"
  description="<p>Hybrid position: work from our NYC office or remotely from NY/NJ/CT.</p>"
  datePosted="2024-01-18"
  hiringOrganization="Example Corp"
  jobLocation={{
    address: {
      streetAddress: "123 Main St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
  }}
  jobLocationType="TELECOMMUTE"
  applicantLocationRequirements={[
    { name: "New York, USA" },
    { name: "New Jersey, USA" },
    { name: "Connecticut, USA" },
  ]}
  employmentType={["FULL_TIME", "CONTRACTOR"]}
/>
```

#### Props

| Property                        | Type                                                                                             | Description                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `title`                         | `string`                                                                                         | **Required.** The title of the job (not the posting). E.g., "Software Engineer" |
| `description`                   | `string`                                                                                         | **Required.** The full job description in HTML format                           |
| `datePosted`                    | `string`                                                                                         | **Required.** ISO 8601 date when the job was posted                             |
| `hiringOrganization`            | `string \| Organization`                                                                         | **Required.** The organization offering the job                                 |
| `jobLocation`                   | `string \| Place \| (string \| Place)[]`                                                         | Physical location(s) where employee reports to work                             |
| `url`                           | `string`                                                                                         | The canonical URL for the job posting                                           |
| `validThrough`                  | `string`                                                                                         | ISO 8601 date when the job posting expires                                      |
| `employmentType`                | `EmploymentType \| EmploymentType[]`                                                             | Type of employment (FULL_TIME, PART_TIME, CONTRACTOR, etc.)                     |
| `identifier`                    | `string \| PropertyValue`                                                                        | The hiring organization's unique identifier for the job                         |
| `baseSalary`                    | `MonetaryAmount`                                                                                 | The base salary of the job (as provided by employer)                            |
| `applicantLocationRequirements` | `Country \| State \| (Country \| State)[]`                                                       | Geographic locations where employees may be located for remote jobs             |
| `jobLocationType`               | `"TELECOMMUTE"`                                                                                  | Set to "TELECOMMUTE" for 100% remote jobs                                       |
| `directApply`                   | `boolean`                                                                                        | Whether the URL enables direct application                                      |
| `educationRequirements`         | `string \| EducationalOccupationalCredential \| (string \| EducationalOccupationalCredential)[]` | Education requirements for the position                                         |
| `experienceRequirements`        | `string \| OccupationalExperienceRequirements`                                                   | Experience requirements for the position                                        |
| `experienceInPlaceOfEducation`  | `boolean`                                                                                        | Whether experience can substitute for education requirements                    |
| `scriptId`                      | `string`                                                                                         | Custom ID for the script tag                                                    |
| `scriptKey`                     | `string`                                                                                         | Custom key for React (defaults to "jobposting-jsonld")                          |

#### Employment Type Values

Use these values for the `employmentType` property:

- `FULL_TIME` - Full-time employment
- `PART_TIME` - Part-time employment
- `CONTRACTOR` - Contractor position
- `TEMPORARY` - Temporary employment
- `INTERN` - Internship position
- `VOLUNTEER` - Volunteer position
- `PER_DIEM` - Paid by the day
- `OTHER` - Other employment type

#### Salary Examples

```tsx
// Hourly wage
baseSalary={{
  currency: "USD",
  value: {
    value: 25.00,
    unitText: "HOUR",
  },
}}

// Annual salary range
baseSalary={{
  currency: "USD",
  value: {
    minValue: 80000,
    maxValue: 120000,
    unitText: "YEAR",
  },
}}

// Monthly salary
baseSalary={{
  currency: "EUR",
  value: {
    value: 5000,
    unitText: "MONTH",
  },
}}
```

#### Best Practices

1. **Complete job descriptions**: Use HTML formatting with `<p>`, `<ul>`, and `<li>` tags for better structure
2. **Include salary information**: Jobs with salary info get more visibility and engagement
3. **Set expiration dates**: Always include `validThrough` to automatically expire old postings
4. **Use employment type**: Specify whether the job is full-time, part-time, contract, etc.
5. **Remote job requirements**: For remote jobs, always specify `applicantLocationRequirements`
6. **Direct apply**: Set `directApply: true` if users can apply directly on your site
7. **Multiple locations**: List all office locations if the job can be performed at multiple sites
8. **Remove expired jobs**: Update or remove the structured data when jobs are filled

> **Note**: Job postings must comply with Google's content policies. Jobs must be actual openings (not recruiting firms collecting resumes), include application instructions, and be removed when filled.

### DiscussionForumPostingJsonLd

The `DiscussionForumPostingJsonLd` component helps you add structured data for forum posts and discussions to improve their appearance in Google's Discussions and Forums search feature.

#### Basic Usage

```tsx
import { DiscussionForumPostingJsonLd } from "next-seo";

<DiscussionForumPostingJsonLd
  headline="I went to the concert!"
  text="Look at how cool this concert was!"
  author="Katie Pope"
  datePublished="2024-01-01T08:00:00+00:00"
  url="https://example.com/forum/very-popular-thread"
  comment={[
    {
      text: "Who's the person you're with?",
      author: "Saul Douglas",
      datePublished: "2024-01-01T09:46:02+00:00",
    },
    {
      text: "That's my mom, isn't she cool?",
      author: "Katie Pope",
      datePublished: "2024-01-01T09:50:25+00:00",
    },
  ]}
/>;
```

#### Props

| Property               | Type                                                 | Description                                               |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| `type`                 | `"DiscussionForumPosting" \| "SocialMediaPosting"`   | The type of posting. Defaults to "DiscussionForumPosting" |
| `author`               | `string \| Person \| Organization \| Author[]`       | **Required.** The author(s) of the post                   |
| `datePublished`        | `string`                                             | **Required.** Publication date in ISO 8601 format         |
| `text`                 | `string`                                             | The text content of the post                              |
| `image`                | `string \| ImageObject \| (string \| ImageObject)[]` | Images in the post                                        |
| `video`                | `VideoObject`                                        | Video content in the post                                 |
| `headline`             | `string`                                             | The title of the post                                     |
| `url`                  | `string`                                             | The canonical URL of the discussion                       |
| `dateModified`         | `string`                                             | Last modification date in ISO 8601 format                 |
| `comment`              | `Comment[]`                                          | Comments/replies to the post                              |
| `creativeWorkStatus`   | `string`                                             | Status of the post (e.g., "Deleted")                      |
| `interactionStatistic` | `InteractionCounter \| InteractionCounter[]`         | User interaction statistics                               |
| `isPartOf`             | `string \| CreativeWork`                             | The forum/subforum this post belongs to                   |
| `sharedContent`        | `string \| WebPage \| ImageObject \| VideoObject`    | Content shared in the post                                |
| `scriptId`             | `string`                                             | Custom ID for the script tag                              |
| `scriptKey`            | `string`                                             | React key for the script tag                              |

#### Nested Comments Example

```tsx
<DiscussionForumPostingJsonLd
  headline="Very Popular Thread"
  author={{
    name: "Katie Pope",
    url: "https://example.com/user/katie-pope",
  }}
  datePublished="2024-01-01T08:00:00+00:00"
  text="Look at how cool this concert was!"
  comment={[
    {
      text: "This should not be this popular",
      author: "Commenter One",
      datePublished: "2024-01-01T09:00:00+00:00",
      comment: [
        {
          text: "Yes it should",
          author: "Commenter Two",
          datePublished: "2024-01-01T09:30:00+00:00",
        },
      ],
    },
  ]}
/>
```

#### Social Media Posting Example

```tsx
<DiscussionForumPostingJsonLd
  type="SocialMediaPosting"
  author="SocialUser"
  datePublished="2024-01-01T12:00:00+00:00"
  text="Just shared an amazing article!"
  sharedContent={{
    url: "https://example.com/amazing-article",
    name: "Amazing Article Title",
    description: "A brief description of the article",
  }}
  interactionStatistic={[
    {
      interactionType: "https://schema.org/LikeAction",
      userInteractionCount: 150,
    },
    {
      interactionType: "https://schema.org/ShareAction",
      userInteractionCount: 25,
    },
  ]}
/>
```

#### Interaction Types

The following interaction types are supported for `interactionStatistic`:

- `https://schema.org/LikeAction` - Likes or upvotes
- `https://schema.org/DislikeAction` - Dislikes or downvotes
- `https://schema.org/ViewAction` - View count
- `https://schema.org/CommentAction` or `https://schema.org/ReplyAction` - Comment count
- `https://schema.org/ShareAction` - Share count

#### Best Practices

1. **Include all visible content**: Add all text, images, and videos that appear in the post
2. **Nested comments**: Use the nested structure to represent threaded discussions accurately
3. **Author information**: Include author URLs linking to profile pages when available
4. **Interaction statistics**: Add engagement metrics to help Google understand post popularity
5. **Deleted content**: Use `creativeWorkStatus: "Deleted"` for removed posts that remain for context
6. **Forum hierarchy**: Use `isPartOf` to indicate which subforum or category the post belongs to
7. **ISO 8601 dates**: Always use proper date formatting with timezone information
8. **Multi-page threads**: For paginated discussions, set the `url` to the first page

> **Note**: DiscussionForumPosting is designed for forum-style sites where people share first-hand perspectives. For Q&A formats, use Q&A structured data instead.

### EmployerAggregateRatingJsonLd

The `EmployerAggregateRatingJsonLd` component helps you add structured data for user-generated ratings about hiring organizations. This enables job seekers to see ratings in the enriched job search experience on Google.

#### Basic Usage

```tsx
import { EmployerAggregateRatingJsonLd } from "next-seo";

<EmployerAggregateRatingJsonLd
  itemReviewed="World's Best Coffee Shop"
  ratingValue={91}
  ratingCount={10561}
/>;
```

#### Props

| Property       | Type                     | Description                                                                       |
| -------------- | ------------------------ | --------------------------------------------------------------------------------- |
| `itemReviewed` | `string \| Organization` | **Required.** The organization being rated                                        |
| `ratingValue`  | `number \| string`       | **Required.** The rating value (number, fraction, or percentage)                  |
| `ratingCount`  | `number`                 | The total number of ratings (at least one of ratingCount or reviewCount required) |
| `reviewCount`  | `number`                 | The number of reviews (at least one of ratingCount or reviewCount required)       |
| `bestRating`   | `number`                 | The highest value allowed in this rating system (default: 5)                      |
| `worstRating`  | `number`                 | The lowest value allowed in this rating system (default: 1)                       |
| `scriptId`     | `string`                 | Custom ID for the script tag                                                      |
| `scriptKey`    | `string`                 | React key for the script tag                                                      |

#### Advanced Example

```tsx
<EmployerAggregateRatingJsonLd
  itemReviewed={{
    name: "World's Best Coffee Shop",
    sameAs: "https://www.worlds-best-coffee-shop.example.com",
    url: "https://www.worlds-best-coffee-shop.example.com",
    logo: "https://example.com/logo.png",
    address: {
      streetAddress: "123 Main St",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98101",
      addressCountry: "US",
    },
  }}
  ratingValue={91}
  ratingCount={10561}
  bestRating={100}
  worstRating={1}
/>
```

#### Custom Rating Scale Example

```tsx
<EmployerAggregateRatingJsonLd
  itemReviewed="Percentage-Based Company"
  ratingValue="85%"
  reviewCount={250}
  bestRating={100}
  worstRating={0}
/>
```

#### Best Practices

1. **Always include organization details**: Provide as much information about the organization as possible
2. **Use sameAs property**: Link to the organization's official website or social media profiles
3. **Rating scales**: If not using a 5-point scale, always specify bestRating and worstRating
4. **Count accuracy**: Ensure ratingCount and reviewCount reflect actual user ratings on your site
5. **Rating derivation**: The ratingValue must be accurately calculated from user ratings

> **Note**: At least one of `ratingCount` or `reviewCount` must be provided. The component will throw an error if neither is present.

> **Looking for job posting structured data?** Check out [JobPostingJsonLd](#jobpostingjsonld) to add complete job listing structured data alongside employer ratings.

### VacationRentalJsonLd

The `VacationRentalJsonLd` component helps you add structured data for vacation rental listings to improve their appearance in Google Search results. Users can see listing information such as name, description, images, location, rating, and reviews directly in search results.

#### Basic Usage

```tsx
import { VacationRentalJsonLd } from "next-seo";

<VacationRentalJsonLd
  containsPlace={{
    occupancy: {
      value: 5,
    },
  }}
  identifier="abc123"
  image="https://example.com/vacation-rental-main.jpg"
  latitude={42.12345}
  longitude={101.12345}
  name="Beautiful Beach House"
/>;
```

#### Advanced Usage

```tsx
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
        name: "poolType",
        value: "Outdoor",
      },
    ],
    floorSize: {
      value: 75,
      unitCode: "MTK",
    },
    numberOfBathroomsTotal: 2.5,
    numberOfBedrooms: 3,
    numberOfRooms: 5,
    petsAllowed: true,
    smokingAllowed: false,
  }}
  identifier="lux-villa-123"
  image={[
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
    "https://example.com/image5.jpg",
    "https://example.com/image6.jpg",
    "https://example.com/image7.jpg",
    "https://example.com/image8.jpg",
  ]}
  latitude={42.12345}
  longitude={101.12345}
  name="Luxury Ocean View Villa"
  additionalType="Villa"
  address={{
    addressCountry: "US",
    addressLocality: "Malibu",
    addressRegion: "California",
    postalCode: "90265",
    streetAddress: "123 Ocean Drive",
  }}
  aggregateRating={{
    ratingValue: 4.8,
    ratingCount: 120,
    reviewCount: 95,
    bestRating: 5,
  }}
  brand={{
    name: "Luxury Vacation Rentals Inc",
  }}
  checkinTime="15:00:00-08:00"
  checkoutTime="11:00:00-08:00"
  description="Stunning beachfront villa with panoramic ocean views"
  knowsLanguage={["en-US", "es-ES", "fr-FR"]}
  review={[
    {
      reviewRating: {
        ratingValue: 5,
        bestRating: 5,
      },
      author: "Jane Smith",
      datePublished: "2024-01-15",
      contentReferenceTime: "2024-01-10",
    },
  ]}
/>
```

#### Props

| Property                          | Type                             | Description                                                       |
| --------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| **containsPlace**                 | `Accommodation`                  | **Required.** Details about the accommodation including occupancy |
| **containsPlace.occupancy**       | `QuantitativeValue`              | **Required.** Maximum number of guests                            |
| **containsPlace.occupancy.value** | `number`                         | **Required.** The numerical value of guests                       |
| **identifier**                    | `string`                         | **Required.** A unique identifier for the property                |
| **image**                         | `string \| ImageObject \| array` | **Required.** Minimum 8 photos (bedroom, bathroom, common area)   |
| **latitude**                      | `number \| string`               | **Required.** Latitude with 5 decimal precision                   |
| **longitude**                     | `number \| string`               | **Required.** Longitude with 5 decimal precision                  |
| **name**                          | `string`                         | **Required.** The name of the vacation rental                     |
| `additionalType`                  | `string`                         | Type of rental (e.g., House, Villa, Apartment, Cottage)           |
| `address`                         | `PostalAddress`                  | Full physical address of the rental                               |
| `aggregateRating`                 | `AggregateRating`                | Average rating based on multiple reviews                          |
| `brand`                           | `Brand`                          | The brand associated with the property                            |
| `checkinTime`                     | `string`                         | Earliest check-in time in ISO 8601 format                         |
| `checkoutTime`                    | `string`                         | Latest check-out time in ISO 8601 format                          |
| `description`                     | `string`                         | A description of the property                                     |
| `knowsLanguage`                   | `string \| string[]`             | Languages the host speaks (IETF BCP 47)                           |
| `review`                          | `Review \| Review[]`             | User reviews of the listing                                       |
| `geo`                             | `object`                         | Alternative way to specify coordinates                            |
| `scriptId`                        | `string`                         | Custom ID for the script tag                                      |
| `scriptKey`                       | `string`                         | Custom data-seo attribute value                                   |

#### Accommodation Properties

| Property                 | Type                                    | Description                                               |
| ------------------------ | --------------------------------------- | --------------------------------------------------------- |
| `additionalType`         | `string`                                | Type of room (EntirePlace, PrivateRoom, SharedRoom)       |
| `bed`                    | `BedDetails \| BedDetails[]`            | Information about beds                                    |
| `amenityFeature`         | `LocationFeatureSpecification \| array` | Property amenities                                        |
| `floorSize`              | `QuantitativeValue`                     | Size with unitCode (FTK/SQFT for sq ft, MTK/SQM for sq m) |
| `numberOfBathroomsTotal` | `number`                                | Total bathrooms (can be decimal, e.g., 2.5)               |
| `numberOfBedrooms`       | `number`                                | Total number of bedrooms                                  |
| `numberOfRooms`          | `number`                                | Total number of rooms                                     |
| `petsAllowed`            | `boolean`                               | Whether pets are allowed                                  |
| `smokingAllowed`         | `boolean`                               | Whether smoking is allowed                                |

#### Amenity Feature Values

**Boolean amenities** (use `value: true/false`):

- `ac`, `airportShuttle`, `balcony`, `beachAccess`, `childFriendly`, `crib`, `elevator`, `fireplace`, `freeBreakfast`, `gymFitnessEquipment`, `heating`, `hotTub`, `instantBookable`, `ironingBoard`, `kitchen`, `microwave`, `outdoorGrill`, `ovenStove`, `patio`, `petsAllowed`, `pool`, `privateBeachAccess`, `selfCheckinCheckout`, `smokingAllowed`, `tv`, `washerDryer`, `wheelchairAccessible`, `wifi`

**Non-boolean amenities** (use `value: "string"`):

- `internetType`: "Free", "Paid", "None"
- `parkingType`: "Free", "Paid", "None"
- `poolType`: "Indoor", "Outdoor", "None"
- `licenseNum`: License number with authority context

#### Best Practices

1. **Minimum 8 images**: Include at least one photo of bedroom, bathroom, and common areas
2. **Precise coordinates**: Use at least 5 decimal places for latitude/longitude
3. **Complete address**: Provide full physical address including unit numbers
4. **Accurate occupancy**: Specify the maximum number of guests allowed
5. **Languages**: List all languages the host can communicate in
6. **Reviews**: Include the `contentReferenceTime` for French listings
7. **Unique identifier**: Use a stable ID that won't change with content updates

> **Note**: This feature requires integration with Google's Hotel Center and is limited to sites that meet eligibility criteria. Visit the [vacation rental interest form](https://support.google.com/hotelprices/contact/vacation_rentals_interest) to get started.

### VideoJsonLd

The `VideoJsonLd` component helps you add structured data for videos to improve their appearance in Google Search results. This includes standard video results, video carousels, and rich video previews. You can also mark live videos with a LIVE badge, add key moments for video navigation, and specify viewing restrictions.

#### Basic Usage

```tsx
import { VideoJsonLd } from "next-seo";

<VideoJsonLd
  name="How to Make a Perfect Cake"
  description="Learn how to make the perfect chocolate cake with this easy recipe"
  thumbnailUrl="https://example.com/cake-video-thumbnail.jpg"
  uploadDate="2024-01-15T08:00:00+00:00"
  contentUrl="https://example.com/videos/cake-recipe.mp4"
  embedUrl="https://example.com/embed/cake-recipe"
  duration="PT10M30S"
/>;
```

#### Advanced Usage with All Features

```tsx
<VideoJsonLd
  name="How to Make a Perfect Cake"
  description="Learn how to make the perfect chocolate cake with this easy recipe"
  thumbnailUrl={[
    "https://example.com/thumbnails/1x1/cake.jpg",
    "https://example.com/thumbnails/4x3/cake.jpg",
    "https://example.com/thumbnails/16x9/cake.jpg",
  ]}
  uploadDate="2024-01-15T08:00:00+00:00"
  contentUrl="https://example.com/videos/cake-recipe.mp4"
  embedUrl="https://example.com/embed/cake-recipe"
  duration="PT10M30S"
  expires="2025-01-15T00:00:00+00:00"
  interactionStatistic={{
    interactionType: "WatchAction",
    userInteractionCount: 150000,
  }}
  regionsAllowed={["US", "CA", "GB"]}
  author="Chef Julia"
  publisher={{
    name: "Cooking Channel",
    logo: "https://example.com/cooking-channel-logo.png",
  }}
/>
```

#### Live Video with LIVE Badge

```tsx
<VideoJsonLd
  name="Live Cooking Show: Holiday Special"
  description="Join us for a live cooking demonstration of holiday favorites"
  thumbnailUrl="https://example.com/live-show-thumbnail.jpg"
  uploadDate="2024-12-20T10:00:00+00:00"
  embedUrl="https://example.com/live/holiday-special"
  publication={{
    isLiveBroadcast: true,
    startDate: "2024-12-25T18:00:00+00:00",
    endDate: "2024-12-25T20:00:00+00:00",
  }}
/>
```

#### Video with Key Moments (Clips)

```tsx
<VideoJsonLd
  name="Complete Cake Baking Tutorial"
  description="A comprehensive guide to baking cakes from scratch"
  thumbnailUrl="https://example.com/tutorial-thumbnail.jpg"
  uploadDate="2024-01-15T08:00:00+00:00"
  contentUrl="https://example.com/videos/complete-tutorial.mp4"
  duration="PT30M"
  hasPart={[
    {
      name: "Gathering Ingredients",
      startOffset: 0,
      endOffset: 120,
      url: "https://example.com/videos/complete-tutorial?t=0",
    },
    {
      name: "Mixing the Batter",
      startOffset: 120,
      endOffset: 480,
      url: "https://example.com/videos/complete-tutorial?t=120",
    },
    {
      name: "Baking and Decorating",
      startOffset: 480,
      endOffset: 1800,
      url: "https://example.com/videos/complete-tutorial?t=480",
    },
  ]}
/>
```

#### Video with Automatic Key Moments (SeekToAction)

```tsx
<VideoJsonLd
  name="Recipe Collection Video"
  description="Multiple recipes in one convenient video"
  thumbnailUrl="https://example.com/collection-thumbnail.jpg"
  uploadDate="2024-01-15T08:00:00+00:00"
  embedUrl="https://example.com/embed/recipe-collection"
  potentialAction={{
    target: "https://example.com/videos/collection?t={seek_to_second_number}",
    "startOffset-input": "required name=seek_to_second_number",
  }}
/>
```

#### Props

| Property               | Type                                        | Description                                                                                       |
| ---------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `name`                 | `string`                                    | **Required.** The title of the video                                                              |
| `description`          | `string`                                    | **Required.** A description of the video                                                          |
| `thumbnailUrl`         | `string \| ImageObject \| array`            | **Required.** URLs or ImageObjects for video thumbnails. Google recommends multiple aspect ratios |
| `uploadDate`           | `string`                                    | **Required.** The date and time the video was published in ISO 8601 format                        |
| `contentUrl`           | `string`                                    | Direct URL to the video file. Recommended if available                                            |
| `embedUrl`             | `string`                                    | URL to the embedded video player. Use if contentUrl isn't available                               |
| `duration`             | `string`                                    | Video duration in ISO 8601 format (e.g., "PT30M" for 30 minutes)                                  |
| `expires`              | `string`                                    | Date after which the video is no longer available                                                 |
| `interactionStatistic` | `InteractionCounter \| array`               | View counts, likes, or other interaction metrics                                                  |
| `regionsAllowed`       | `string \| string[]`                        | Countries where the video is viewable (ISO 3166 format)                                           |
| `ineligibleRegion`     | `string \| string[]`                        | Countries where the video is blocked                                                              |
| `publication`          | `BroadcastEvent \| array`                   | For live videos - includes broadcast times and live status                                        |
| `hasPart`              | `Clip \| Clip[]`                            | Video segments/chapters with timestamps and labels                                                |
| `potentialAction`      | `SeekToAction`                              | URL pattern for automatic key moments                                                             |
| `author`               | `string \| Person \| Organization \| array` | Video creator(s)                                                                                  |
| `publisher`            | `Organization`                              | Organization that published the video                                                             |
| `type`                 | `"VideoObject"`                             | Schema type. Defaults to "VideoObject"                                                            |
| `scriptId`             | `string`                                    | Custom ID for the script tag                                                                      |
| `scriptKey`            | `string`                                    | Custom key for React                                                                              |

#### Best Practices

1. **Thumbnail Images**: Provide multiple thumbnail URLs in different aspect ratios (16:9, 4:3, 1:1) for optimal display
2. **Duration Format**: Use ISO 8601 duration format: PT[hours]H[minutes]M[seconds]S
3. **Content vs Embed URL**:
   - Use `contentUrl` for direct video files (mp4, webm, etc.)
   - Use `embedUrl` for video player pages
   - Provide both when possible
4. **Live Videos**: For live streams, always include `publication` with `isLiveBroadcast: true`
5. **Key Moments**:
   - Use `hasPart` with `Clip` objects when you want to specify exact timestamps
   - Use `potentialAction` with `SeekToAction` to let Google automatically detect key moments
6. **Timestamps**: Always use ISO 8601 format with timezone information
7. **Region Restrictions**: Use two-letter ISO 3166-1 country codes

### ProfilePageJsonLd

The `ProfilePageJsonLd` component helps you add structured data for profile pages where creators (either people or organizations) share first-hand perspectives. This helps Google Search understand the creators in an online community and show better content from that community in search results, including the Discussions and Forums feature.

#### Basic Usage

```tsx
import { ProfilePageJsonLd } from "next-seo";

<ProfilePageJsonLd
  mainEntity="Angelo Huff"
  dateCreated="2024-12-23T12:34:00-05:00"
  dateModified="2024-12-26T14:53:00-05:00"
/>;
```

#### Advanced Usage

```tsx
<ProfilePageJsonLd
  mainEntity={{
    name: "Angelo Huff",
    alternateName: "ahuff23",
    identifier: "123475623",
    description: "Defender of Truth",
    image: "https://example.com/avatars/ahuff23.jpg",
    sameAs: [
      "https://www.example.com/real-angelo",
      "https://example.com/profile/therealangelohuff",
    ],
    interactionStatistic: [
      {
        interactionType: "https://schema.org/FollowAction",
        userInteractionCount: 1,
      },
      {
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: 5,
      },
    ],
    agentInteractionStatistic: {
      interactionType: "https://schema.org/WriteAction",
      userInteractionCount: 2346,
    },
  }}
  dateCreated="2024-12-23T12:34:00-05:00"
  dateModified="2024-12-26T14:53:00-05:00"
/>
```

#### Organization Profile Example

```tsx
<ProfilePageJsonLd
  mainEntity={{
    "@type": "Organization",
    name: "ACME Corporation",
    url: "https://acme.com",
    logo: "https://acme.com/logo.png",
    sameAs: ["https://twitter.com/acme", "https://linkedin.com/company/acme"],
    interactionStatistic: {
      interactionType: "https://schema.org/FollowAction",
      userInteractionCount: 15000,
    },
  }}
/>
```

#### Props

| Property       | Type                                                                                       | Description                                                         |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `mainEntity`   | `string \| Person \| Organization \| Omit<Person, "@type"> \| Omit<Organization, "@type">` | **Required.** The person or organization this profile page is about |
| `dateCreated`  | `string`                                                                                   | Date and time the profile was created (ISO 8601 format)             |
| `dateModified` | `string`                                                                                   | Date and time the profile was last modified (ISO 8601 format)       |
| `scriptId`     | `string`                                                                                   | Custom ID for the script tag                                        |
| `scriptKey`    | `string`                                                                                   | Custom key for React reconciliation                                 |

#### Person/Organization Properties

When providing an object for `mainEntity`, you can include these properties:

**Common Properties:**

- `name`: The primary name (real name preferred)
- `alternateName`: Alternate identifier (e.g., username)
- `identifier`: Unique ID within your site
- `description`: User's byline or credential
- `image`: Profile image URL
- `sameAs`: Array of external profile URLs
- `interactionStatistic`: User statistics (followers, likes, etc.)
- `agentInteractionStatistic`: User's own activity statistics

**Interaction Types:**

- `https://schema.org/FollowAction`: Number of followers/following
- `https://schema.org/LikeAction`: Number of likes
- `https://schema.org/WriteAction`: Number of posts
- `https://schema.org/ShareAction`: Number of reshares
- `https://schema.org/BefriendAction`: Bi-directional relationships

#### Best Practices

1. **Profile focus**: The page must primarily focus on a single person or organization
2. **Real names**: Use `name` for real names and `alternateName` for usernames
3. **Stable identifiers**: Use IDs that won't change even if usernames change
4. **Multiple images**: Include profile images in multiple aspect ratios (16x9, 4x3, 1x1)
5. **ISO 8601 dates**: Always include timezone information in dates
6. **Platform statistics**: Only include stats from the current platform

#### Valid Use Cases

✅ User profile pages on forums or social media sites
✅ Author pages on news sites
✅ "About Me" pages on blog sites
✅ Employee pages on company websites

#### Invalid Use Cases

❌ Main home page of a store
❌ Organization review sites (where the org isn't affiliated with the site)

> **Note**: ProfilePage markup is designed for sites where creators share first-hand perspectives. It can be linked from Article and Recipe structured data authors, and is often used in discussion forum and Q&A page structured data.

### SoftwareApplicationJsonLd

The `SoftwareApplicationJsonLd` component helps you add structured data for software applications, including mobile apps, web apps, desktop software, and games. This can help your app appear in rich results and improve its visibility in app-related searches.

#### Basic Usage (Free App)

```tsx
import { SoftwareApplicationJsonLd } from "next-seo";

<SoftwareApplicationJsonLd
  name="My Awesome App"
  offers={{
    price: 0,
    priceCurrency: "USD",
  }}
  aggregateRating={{
    ratingValue: 4.5,
    ratingCount: 100,
  }}
/>;
```

#### Paid App Example

```tsx
<SoftwareApplicationJsonLd
  name="Premium Photo Editor"
  applicationCategory="DesignApplication"
  operatingSystem="iOS 14.0+"
  offers={{
    price: 9.99,
    priceCurrency: "USD",
  }}
  aggregateRating={{
    ratingValue: 4.8,
    reviewCount: 2500,
  }}
  description="Professional photo editing on the go"
  screenshot={[
    "https://example.com/screenshot1.jpg",
    "https://example.com/screenshot2.jpg",
  ]}
/>
```

#### Mobile Application

```tsx
<SoftwareApplicationJsonLd
  type="MobileApplication"
  name="Fitness Tracker Pro"
  applicationCategory="HealthApplication"
  operatingSystem="Android 8.0+, iOS 12.0+"
  offers={{
    price: 0,
    priceCurrency: "USD",
  }}
  review={[
    {
      author: "Jane Smith",
      reviewRating: { ratingValue: 5 },
      reviewBody: "Best fitness app I've ever used!",
    },
  ]}
  permissions={["location", "camera", "storage"]}
  featureList={[
    "GPS tracking",
    "Heart rate monitoring",
    "Social challenges",
    "Meal planning",
  ]}
/>
```

#### Web Application

```tsx
<SoftwareApplicationJsonLd
  type="WebApplication"
  name="Project Management Suite"
  url="https://app.example.com"
  applicationCategory="BusinessApplication"
  applicationSubCategory="ProjectManagement"
  offers={[
    {
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      price: 29.99,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ]}
  aggregateRating={{
    ratingValue: 4.7,
    ratingCount: 5000,
  }}
  screenshot={{
    url: "https://example.com/app-dashboard.jpg",
    caption: "Main dashboard view",
  }}
/>
```

#### Video Game (Co-typed)

For video games, Google requires co-typing with another application type:

```tsx
<SoftwareApplicationJsonLd
  type={["VideoGame", "MobileApplication"]}
  name="Epic Adventure Quest"
  applicationCategory="GameApplication"
  operatingSystem="iOS 13.0+, Android 9.0+"
  offers={{
    price: 4.99,
    priceCurrency: "USD",
  }}
  aggregateRating={{
    ratingValue: 4.6,
    ratingCount: 10000,
  }}
  contentRating="Everyone 10+"
  screenshot={[
    "https://example.com/gameplay1.jpg",
    "https://example.com/gameplay2.jpg",
  ]}
  featureList={[
    "Multiplayer battles",
    "50+ hours of gameplay",
    "Cloud save support",
  ]}
/>
```

#### Props

| Property                | Type                                                 | Description                                                     |
| ----------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `name`                  | `string`                                             | **Required**. The name of the software application              |
| `type`                  | `ApplicationType \| VideoGameCoTyped`                | Type of application. Defaults to "SoftwareApplication"          |
| `offers`                | `Offer \| Offer[]`                                   | **Required**. Pricing information. Set price to 0 for free apps |
| `aggregateRating`       | `AggregateRating`                                    | **Required** (or use `review`). Average rating information      |
| `review`                | `Review \| Review[]`                                 | **Required** (or use `aggregateRating`). Individual reviews     |
| `applicationCategory`   | `string`                                             | **Recommended**. Category of the app (e.g., "GameApplication")  |
| `operatingSystem`       | `string`                                             | **Recommended**. Required OS (e.g., "Windows 10, macOS 10.15+") |
| `description`           | `string`                                             | Description of the application                                  |
| `url`                   | `string`                                             | URL of the app's webpage                                        |
| `image`                 | `string \| ImageObject \| (string \| ImageObject)[]` | App icon or logo                                                |
| `screenshot`            | `string \| ImageObject \| (string \| ImageObject)[]` | Screenshots of the app                                          |
| `featureList`           | `string \| string[]`                                 | Key features of the app                                         |
| `permissions`           | `string \| string[]`                                 | Required permissions                                            |
| `softwareVersion`       | `string`                                             | Current version number                                          |
| `datePublished`         | `string`                                             | Initial release date                                            |
| `dateModified`          | `string`                                             | Last update date                                                |
| `author`                | `string \| Person \| Organization`                   | Developer or development team                                   |
| `publisher`             | `Organization`                                       | Publishing organization                                         |
| `downloadUrl`           | `string`                                             | Direct download link                                            |
| `installUrl`            | `string`                                             | Installation link                                               |
| `memoryRequirements`    | `string`                                             | RAM requirements                                                |
| `storageRequirements`   | `string`                                             | Storage space needed                                            |
| `processorRequirements` | `string`                                             | CPU requirements                                                |
| `countriesSupported`    | `string \| string[]`                                 | Supported countries                                             |
| `applicationSuite`      | `string`                                             | Suite the app belongs to                                        |

#### Application Types

The component supports all Google-recognized application types:

- `SoftwareApplication` (default)
- `MobileApplication`
- `WebApplication`
- `GameApplication`
- `SocialNetworkingApplication`
- `TravelApplication`
- `ShoppingApplication`
- `SportsApplication`
- `LifestyleApplication`
- `BusinessApplication`
- `DesignApplication`
- `DeveloperApplication`
- `DriverApplication`
- `EducationalApplication`
- `HealthApplication`
- `FinanceApplication`
- `SecurityApplication`
- `BrowserApplication`
- `CommunicationApplication`
- `DesktopEnhancementApplication`
- `EntertainmentApplication`
- `MultimediaApplication`
- `HomeApplication`
- `UtilitiesApplication`
- `ReferenceApplication`

#### Best Practices

1. **Always include pricing**: Use `offers` with `price: 0` for free apps
2. **Provide ratings or reviews**: Include either `aggregateRating` or `review` (required by Google)
3. **Specify OS requirements**: Use `operatingSystem` for better user experience
4. **Multiple screenshots**: Include various screenshots showing key features
5. **Video games**: Always co-type with another application type (e.g., `["VideoGame", "MobileApplication"]`)
6. **Feature lists**: Highlight key features that differentiate your app
7. **Version information**: Keep `softwareVersion` and `dateModified` current
8. **Permissions transparency**: List all required permissions for mobile apps

### ProductJsonLd

The `ProductJsonLd` component helps you add structured data for products to improve their appearance in search results. Products can appear as rich snippets with ratings, prices, and availability information.

#### Basic Usage

```tsx
import { ProductJsonLd } from "next-seo";

<ProductJsonLd
  name="Executive Anvil"
  description="Sleeker than ACME's Classic Anvil, perfect for the business traveler"
  image="https://example.com/products/anvil.jpg"
  offers={{
    price: 119.99,
    priceCurrency: "USD",
    availability: "InStock",
  }}
/>;
```

#### Product with Reviews

```tsx
<ProductJsonLd
  name="Executive Anvil"
  sku="0446310786"
  mpn="925872"
  brand="ACME"
  review={{
    reviewRating: {
      ratingValue: 4.5,
      bestRating: 5,
    },
    author: "Fred Benson",
    reviewBody:
      "This anvil has held up well after many uses. Highly recommended!",
  }}
  aggregateRating={{
    ratingValue: 4.4,
    reviewCount: 89,
  }}
  offers={{
    price: 119.99,
    priceCurrency: "USD",
    availability: "InStock",
    priceValidUntil: "2024-12-31",
  }}
/>
```

#### Product with Pros and Cons

```tsx
<ProductJsonLd
  name="Cheese Grater Pro"
  review={{
    name: "Cheese Grater Pro Review",
    author: "Pascal Van Cleeff",
    reviewRating: {
      ratingValue: 4,
      bestRating: 5,
    },
    positiveNotes: {
      itemListElement: [
        { name: "Consistent results" },
        { name: "Still sharp after many uses" },
        { name: "Easy to clean" },
      ],
    },
    negativeNotes: {
      itemListElement: [
        { name: "No child protection" },
        { name: "Lacking advanced features" },
      ],
    },
  }}
  offers={{
    price: 29.99,
    priceCurrency: "USD",
  }}
/>
```

#### Shopping Aggregator (Multiple Sellers)

```tsx
<ProductJsonLd
  name="Executive Anvil"
  image={[
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg",
  ]}
  description="Sleeker than ACME's Classic Anvil"
  sku="0446310786"
  mpn="925872"
  brand="ACME"
  offers={{
    lowPrice: 119.99,
    highPrice: 199.99,
    priceCurrency: "USD",
    offerCount: 5,
  }}
  aggregateRating={{
    ratingValue: 4.4,
    reviewCount: 89,
  }}
/>
```

#### Complete Example with All Features

```tsx
<ProductJsonLd
  name="Executive Anvil"
  description="Sleeker than ACME's Classic Anvil"
  url="https://example.com/products/anvil"
  sku="0446310786"
  mpn="925872"
  gtin13="0614141999996"
  brand="ACME"
  category="Hardware"
  color="Silver"
  material="Steel"
  model="EA-2024"
  productID="anvil-001"
  weight={{
    value: 10,
    unitCode: "KGM",
  }}
  width="30cm"
  height="20cm"
  depth="15cm"
  manufacturer="ACME Manufacturing"
  releaseDate="2024-01-01"
  award="Best Anvil 2024"
  image={[
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg",
  ]}
  review={[
    {
      reviewRating: { ratingValue: 5, bestRating: 5 },
      author: "Alice Johnson",
      reviewBody: "Excellent quality!",
    },
    {
      reviewRating: { ratingValue: 4, bestRating: 5 },
      author: "Bob Smith",
      reviewBody: "Good product, fast shipping.",
    },
  ]}
  aggregateRating={{
    ratingValue: 4.4,
    reviewCount: 89,
  }}
  offers={{
    price: 119.99,
    priceCurrency: "USD",
    availability: "InStock",
    priceValidUntil: "2024-12-31",
    url: "https://example.com/buy/anvil",
    seller: {
      name: "ACME Store",
      url: "https://example.com",
    },
  }}
/>
```

#### Props

| Property             | Type                                               | Description                              |
| -------------------- | -------------------------------------------------- | ---------------------------------------- |
| `name`               | `string`                                           | **Required.** Product name               |
| `description`        | `string`                                           | Product description                      |
| `image`              | `string \| ImageObject \| Array`                   | Product images                           |
| `sku`                | `string`                                           | Stock Keeping Unit                       |
| `mpn`                | `string`                                           | Manufacturer Part Number                 |
| `gtin`               | `string`                                           | Global Trade Item Number                 |
| `gtin8`              | `string`                                           | 8-digit GTIN                             |
| `gtin12`             | `string`                                           | 12-digit GTIN (UPC)                      |
| `gtin13`             | `string`                                           | 13-digit GTIN (EAN)                      |
| `gtin14`             | `string`                                           | 14-digit GTIN                            |
| `brand`              | `string \| Brand`                                  | Product brand                            |
| `review`             | `ProductReview \| ProductReview[]`                 | Product reviews                          |
| `aggregateRating`    | `AggregateRating`                                  | Aggregate rating from all reviews        |
| `offers`             | `ProductOffer \| AggregateOffer \| ProductOffer[]` | Price and availability (**recommended**) |
| `category`           | `string`                                           | Product category                         |
| `color`              | `string`                                           | Product color                            |
| `material`           | `string`                                           | Product material                         |
| `model`              | `string`                                           | Product model                            |
| `productID`          | `string`                                           | Product identifier                       |
| `url`                | `string`                                           | Product page URL                         |
| `weight`             | `string \| QuantitativeValue`                      | Product weight                           |
| `width`              | `string \| QuantitativeValue`                      | Product width                            |
| `height`             | `string \| QuantitativeValue`                      | Product height                           |
| `depth`              | `string \| QuantitativeValue`                      | Product depth                            |
| `additionalProperty` | `PropertyValue[]`                                  | Additional product properties            |
| `manufacturer`       | `string \| Organization \| Person`                 | Product manufacturer                     |
| `releaseDate`        | `string`                                           | Product release date                     |
| `productionDate`     | `string`                                           | Production date                          |
| `purchaseDate`       | `string`                                           | Purchase date                            |
| `expirationDate`     | `string`                                           | Expiration date                          |
| `award`              | `string \| string[]`                               | Awards received                          |
| `isCar`              | `boolean`                                          | Set to true for car products             |

#### Important Requirements

Google requires at least one of the following properties for product snippets:

- `review` - A nested review of the product
- `aggregateRating` - The overall rating based on multiple reviews
- `offers` - Price and availability information

#### Offer Properties

| Property          | Type                     | Description                              |
| ----------------- | ------------------------ | ---------------------------------------- |
| `price`           | `number \| string`       | Product price                            |
| `priceCurrency`   | `string`                 | Currency code (e.g., "USD")              |
| `availability`    | `ItemAvailability`       | Availability status                      |
| `priceValidUntil` | `string`                 | Date until price is valid                |
| `url`             | `string`                 | URL to purchase product                  |
| `seller`          | `Organization \| Person` | Seller information                       |
| `itemCondition`   | `string`                 | Condition (New, Used, Refurbished, etc.) |

#### AggregateOffer Properties (Multiple Sellers)

| Property        | Type               | Description                 |
| --------------- | ------------------ | --------------------------- |
| `lowPrice`      | `number \| string` | **Required.** Lowest price  |
| `priceCurrency` | `string`           | **Required.** Currency code |
| `highPrice`     | `number \| string` | Highest price               |
| `offerCount`    | `number`           | Number of offers            |

#### Best Practices

1. **Always include one of**: review, aggregateRating, or offers (Google requirement)
2. **Multiple images**: Provide images in different aspect ratios (1x1, 4x3, 16x9)
3. **Use specific identifiers**: Include SKU, MPN, or GTIN when available
4. **Pros and cons**: Use positiveNotes and negativeNotes for editorial reviews
5. **Price information**: Always include priceCurrency with price
6. **Availability**: Use schema.org values (InStock, OutOfStock, PreOrder, etc.)
7. **Multiple sellers**: Use AggregateOffer for shopping comparison sites
8. **Car products**: Set `isCar={true}` for automotive products to add Car type

### ProductGroup (Product Variants)

The `ProductJsonLd` component now supports ProductGroup for representing product variants (different sizes, colors, materials, etc.) of the same product. This helps Google understand product variations and can enable variant displays in search results.

#### Single-Page Variant Example

Use this approach when all variants are selectable on a single product page:

```tsx
import { ProductJsonLd } from "next-seo";

<ProductJsonLd
  type="ProductGroup"
  name="Wool Winter Coat"
  description="Premium wool coat available in multiple colors and sizes"
  productGroupID="WC2024"
  brand="Nordic Style"
  variesBy={["size", "color"]}
  aggregateRating={{
    ratingValue: 4.6,
    reviewCount: 127,
  }}
  hasVariant={[
    {
      name: "Wool Winter Coat - Small Green",
      sku: "WC2024-S-GRN",
      size: "small",
      color: "Green",
      offers: {
        price: 119.99,
        priceCurrency: "USD",
        availability: "InStock",
        url: "https://example.com/coat?size=small&color=green",
      },
    },
    {
      name: "Wool Winter Coat - Large Blue",
      sku: "WC2024-L-BLU",
      size: "large",
      color: "Blue",
      offers: {
        price: 139.99,
        priceCurrency: "USD",
        availability: "BackOrder",
        url: "https://example.com/coat?size=large&color=blue",
      },
    },
    // Reference to variants on other pages
    { url: "https://example.com/coat/medium-red" },
  ]}
/>;
```

#### Multi-Page Variant Example

Use this approach when each variant has its own page:

```tsx
// On a specific variant page
<ProductJsonLd
  name="Premium Leather Wallet - Brown Classic"
  sku="LW2024-BRN-CLS"
  color="Brown"
  pattern="Classic"
  material="Genuine Leather"
  isVariantOf={{ "@id": "#wallet_group" }}
  inProductGroupWithID="LW2024"
  offers={{
    price: 79.99,
    priceCurrency: "USD",
    availability: "InStock",
  }}
/>
```

#### ProductGroup Properties

| Property         | Type                              | Description                                        |
| ---------------- | --------------------------------- | -------------------------------------------------- |
| `type`           | `"ProductGroup"`                  | Specifies ProductGroup type                        |
| `productGroupID` | `string`                          | **Required.** Parent SKU or group identifier       |
| `variesBy`       | `string \| string[]`              | Properties that vary (size, color, material, etc.) |
| `hasVariant`     | `Array<Product \| {url: string}>` | Array of product variants                          |
| `audience`       | `PeopleAudience`                  | Target audience (age, gender)                      |

#### Variant Properties

When defining variants in `hasVariant`, you can include:

| Property   | Type           | Description                             |
| ---------- | -------------- | --------------------------------------- |
| `name`     | `string`       | Variant-specific name                   |
| `sku`      | `string`       | Variant SKU                             |
| `size`     | `string`       | Size value                              |
| `color`    | `string`       | Color value                             |
| `pattern`  | `string`       | Pattern type                            |
| `material` | `string`       | Material composition                    |
| `offers`   | `ProductOffer` | Variant-specific pricing                |
| `url`      | `string`       | For referencing variants on other pages |

#### Variant Reference Properties

For multi-page implementations, use these on individual product pages:

| Property               | Type                            | Description                      |
| ---------------------- | ------------------------------- | -------------------------------- |
| `isVariantOf`          | `{@id: string} \| ProductGroup` | Reference to parent ProductGroup |
| `inProductGroupWithID` | `string`                        | Parent product group ID          |

#### VariesBy Values

Supported values for the `variesBy` property:

- `"size"` or `"https://schema.org/size"`
- `"color"` or `"https://schema.org/color"`
- `"material"` or `"https://schema.org/material"`
- `"pattern"` or `"https://schema.org/pattern"`
- `"suggestedAge"` or `"https://schema.org/suggestedAge"`
- `"suggestedGender"` or `"https://schema.org/suggestedGender"`

#### Best Practices for Product Variants

1. **Use ProductGroup** when you have multiple variants of the same product
2. **Single-page approach**: Best when variants are selectable via dropdowns/buttons on one page
3. **Multi-page approach**: Best when each variant needs its own SEO-optimized page
4. **Always include productGroupID**: This links all variants together
5. **Specify variesBy**: Clearly indicate which properties differentiate variants
6. **Complete variant data**: Include as much variant-specific data as possible
7. **URL references**: Use `{ url: "..." }` for variants on separate pages
8. **Common properties**: Place shared properties (brand, material) at ProductGroup level
9. **Unique identifiers**: Each variant should have unique SKU/GTIN
10. **Consistent naming**: Use clear naming patterns for variants (e.g., "Product - Size Color")

### ReviewJsonLd

The `ReviewJsonLd` component helps you add structured data for reviews to improve their appearance in search results. Reviews can appear as rich snippets with star ratings and review excerpts.

#### Basic Usage

```tsx
import { ReviewJsonLd } from "next-seo";

<ReviewJsonLd
  author="Bob Smith"
  reviewRating={{ ratingValue: 4 }}
  itemReviewed="Legal Seafood"
/>;
```

#### Full Review Example

```tsx
<ReviewJsonLd
  author={{ name: "Sarah Johnson", url: "https://example.com/sarah" }}
  reviewRating={{
    ratingValue: 5,
    bestRating: 5,
    worstRating: 1,
  }}
  itemReviewed={{
    "@type": "Restaurant",
    name: "Legal Seafood",
    image: "https://example.com/seafood.jpg",
    servesCuisine: "Seafood",
    priceRange: "$$$",
    telephone: "1234567",
    address: {
      streetAddress: "123 William St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10038",
      addressCountry: "US",
    },
  }}
  reviewBody="Excellent seafood restaurant with fresh catches daily. The lobster was perfectly cooked and the service was outstanding."
  datePublished="2024-01-15"
  publisher="FoodCritic Magazine"
  url="https://example.com/reviews/legal-seafood"
/>
```

#### Props

| Property           | Type                               | Description                                  |
| ------------------ | ---------------------------------- | -------------------------------------------- |
| `author`           | `string \| Person \| Organization` | **Required.** The author of the review       |
| `reviewRating`     | `Rating`                           | **Required.** The rating given in the review |
| `itemReviewed`     | `string \| ItemReviewed`           | **Required.** The item being reviewed        |
| `datePublished`    | `string`                           | The date the review was published (ISO 8601) |
| `reviewBody`       | `string`                           | The text of the review                       |
| `publisher`        | `string \| Person \| Organization` | The publisher of the review                  |
| `url`              | `string`                           | URL of the review                            |
| `mainEntityOfPage` | `string \| WebPage`                | Main entity of the page                      |

#### Supported Item Types

Reviews can be written about various types of items:

- `Book`
- `Course`
- `CreativeWorkSeason`
- `CreativeWorkSeries`
- `Episode`
- `Event`
- `Game`
- `HowTo`
- `LocalBusiness` (including restaurants)
- `MediaObject`
- `Movie`
- `MusicPlaylist`
- `MusicRecording`
- `Organization`
- `Product`
- `Recipe`
- `SoftwareApplication`

#### Best Practices

1. **Always include reviewBody**: Provides context for the rating
2. **Use specific item types**: Specify `@type` for `itemReviewed` when possible
3. **Include datePublished**: Helps establish review freshness
4. **Author information**: Provide as much author detail as possible
5. **Avoid self-serving reviews**: Don't mark up reviews on your own site about your organization

### AggregateRatingJsonLd

The `AggregateRatingJsonLd` component helps you add structured data for aggregate ratings, showing the average rating from multiple reviews.

#### Basic Usage

```tsx
import { AggregateRatingJsonLd } from "next-seo";

<AggregateRatingJsonLd
  itemReviewed="Executive Anvil"
  ratingValue={4.4}
  ratingCount={89}
/>;
```

#### Full Example

```tsx
<AggregateRatingJsonLd
  itemReviewed={{
    "@type": "Product",
    name: "Executive Anvil",
    image: [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ],
    brand: "ACME",
  }}
  ratingValue={88}
  bestRating={100}
  worstRating={0}
  ratingCount={20}
/>
```

#### With Review Count

```tsx
<AggregateRatingJsonLd
  itemReviewed="Premium Coffee Maker"
  ratingValue={4.5}
  reviewCount={127} // Use reviewCount instead of ratingCount
  bestRating={5}
/>
```

#### Props

| Property       | Type                     | Description                                                                    |
| -------------- | ------------------------ | ------------------------------------------------------------------------------ |
| `itemReviewed` | `string \| ItemReviewed` | **Required.** The item being rated                                             |
| `ratingValue`  | `number \| string`       | **Required.** The average rating value                                         |
| `ratingCount`  | `number`                 | The total number of ratings                                                    |
| `reviewCount`  | `number`                 | The number of reviews (at least one of ratingCount or reviewCount is required) |
| `bestRating`   | `number`                 | The highest value in the rating system (default: 5)                            |
| `worstRating`  | `number`                 | The lowest value in the rating system (default: 1)                             |

#### Rating Scale

- **Default scale**: 1 to 5 stars
- **Custom scale**: Use `bestRating` and `worstRating` to define custom scales
- **Percentages**: Use values like 88 with `bestRating: 100` for percentage-based ratings
- **Fractions**: Supports decimal values like 4.4

#### Best Practices

1. **Choose the right count**: Use `ratingCount` for star ratings, `reviewCount` for written reviews
2. **Specify scale for non-standard ratings**: Always include `bestRating` and `worstRating` for non-5-star scales
3. **Combine with Product/Organization data**: Nest within or alongside main entity structured data
4. **Minimum threshold**: Only use when you have multiple genuine ratings
5. **Keep it updated**: Regularly update aggregate ratings as new reviews come in

[↑ Back to Components](#-components-by-category)

## Creating Custom Components

Next SEO now supports creating your own custom JSON-LD components using the same utilities and patterns as the built-in components. This allows you to implement any Schema.org type while maintaining the excellent developer experience of next-seo.

### Quick Example

```tsx
import { JsonLdScript, processors } from "next-seo";

export function PodcastEpisodeJsonLd({ name, author, duration, url }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name,
    ...(url && { url }),
    ...(duration && { duration }),
    ...(author && { author: processors.processAuthor(author) }),
  };

  return <JsonLdScript data={data} scriptKey="podcast-episode" />;
}

// Usage - no @type needed for author!
<PodcastEpisodeJsonLd
  name="Episode 1: Getting Started"
  author="Jane Doe" // Simple string works!
  duration="PT30M"
  url="https://example.com/episode-1"
/>;
```

### Key Features

- **JsonLdScript Component**: Core component for rendering structured data
- **60+ Processors**: Transform flexible inputs into Schema.org compliant objects
- **@type Optional Pattern**: Users never need to specify `@type` manually
- **TypeScript Support**: Full type safety with exported types

### Available Utilities

See the [processors export file](./src/utils/processors.export.ts) for the complete list of available processors organized by category (People & Organizations, Media & Content, Locations & Places, Commerce & Offers, etc.).

### Learn More

For comprehensive documentation on creating custom components, including:

- Using built-in processors
- Creating custom processors
- Advanced patterns and best practices
- Real-world examples

See the **[Custom Components Guide](./CUSTOM_COMPONENTS.md)**

## Contributors

[Contributing Guide](./CONTRIBUTING.md)

A massive thank you to [everyone who contributes](https://github.com/garmeeh/next-seo/graphs/contributors) to this project 👏
