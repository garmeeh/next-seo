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
| `hasMerchantReturnPolicy` | `MerchantReturnPolicy \| MerchantReturnPolicy[]`         | Return policy details (OnlineStore only)                |
| `hasMemberProgram`        | `MemberProgram \| MemberProgram[]`                       | Loyalty/membership program details (OnlineStore only)   |
| `scriptId`                | `string`                                                 | Custom ID for the script tag                            |
| `scriptKey`               | `string`                                                 | Custom key prop for React                               |

#### Best Practices

1. **Place on homepage or about page**: Add this markup to your homepage or a dedicated "about us" page
2. **Use specific subtypes**: Use "OnlineStore" for e-commerce sites rather than generic "Organization"
3. **Include identifiers**: Add VAT ID, ISO codes, and other identifiers for better trust signals
4. **Complete address information**: Provide full address details including country code
5. **Multiple locations**: Use array format for addresses if you have multiple locations
6. **High-quality logo**: Use a logo that looks good on white background, minimum 112x112px

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
