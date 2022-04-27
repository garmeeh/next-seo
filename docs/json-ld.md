# JSON-LD

Next SEO now has the ability to set JSON-LD a form of structured data. Structured data is a standardised format for providing information about a page and classifying the page content.

Google has excellent content on JSON-LD -> [HERE](https://developers.google.com/search/docs/data-types/article)

## Table of contents

- [JSON-LD Security](#json-ld-security)
- [Handling multiple instances](#handling-multiple-instances)
- [Article](#article-1)
- [Breadcrumb](#breadcrumb)
- [Blog](#blog)
- [Recipe](#recipe)
- [Sitelinks Search Box](#sitelinks-search-box)
- [Course](#course)
- [Dataset](#dataset)
- [Corporate Contact](#corporate-contact)
- [FAQ Page](#faq-page)
- [Job Posting](#job-posting)
- [Local Business](#local-business)
- [Logo](#logo)
- [Product](#product)
- [Social Profile](#social-profile)
- [News Article](#news-article)
- [Video](#video-1)
- [VideoGame](#videogame)
- [Event](#event)
- [Q&A](#qa)
- [Collection Page](#collection-page)
- [Profile page](#profile-page)
- [Carousel](#carousel)
  - [Default (Summary List)](#default-summary-list)
  - [Course](#course-1)
  - [Movie](#movie)
  - [Recipe](#recipe-1)
- [Software App](#software-app)
- [Organization](#organization)
- [Brand](#brand)
- [WebPage](#webpage)

Pull request very welcome to add any from the list [found on here](https://developers.google.com/search/docs/data-types/article)

## JSON-LD Security

Just a quick note on security. To get JSON-LD onto the page it needs to be in a script tag. `next-seo` achieves this by using a script tag with `dangerouslySetInnerHTML`.

So if passing anything directly from a URL to one of the components below please ensure you sanitize it first if needed.

View `toJson.tsx` for implementation detail.

## Handling multiple instances

If your page requires multiple instances of a given JSON-LD component, you can specify unique `keyOverride` properties, and `next-seo` will handle the rest.

This comes in handy for blog rolls, search results, and overview pages.

Please fully research when you should and shouldn't add multiple instances of JSON-LD.

```jsx
<ExampleJsonLd keyOverride="my-new-key" />
```

## Article

```jsx
import { ArticleJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Article JSON-LD</h1>
    <ArticleJsonLd
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName={['Jane Blogs', 'Mary Stone']}
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
    />
  </>
);

export default Page;
```

## Breadcrumb

```jsx
import { BreadcrumbJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Breadcrumb JSON-LD</h1>
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: 'Books',
          item: 'https://example.com/books',
        },
        {
          position: 2,
          name: 'Authors',
          item: 'https://example.com/books/authors',
        },
        {
          position: 3,
          name: 'Ann Leckie',
          item: 'https://example.com/books/authors/annleckie',
        },
        {
          position: 4,
          name: 'Ancillary Justice',
          item: 'https://example.com/books/authors/ancillaryjustice',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property                    | Info                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `itemListElements`          |                                                                                                          |
| `itemListElements.position` | The position of the breadcrumb in the breadcrumb trail. Position 1 signifies the beginning of the trail. |
| `itemListElements.name`     | The title of the breadcrumb displayed for the user.                                                      |
| `itemListElements.item`     | The URL to the webpage that represents the breadcrumb.                                                   |

## Blog

```jsx
import { ArticleJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Blog JSON-LD</h1>
    <ArticleJsonLd
      type="Blog"
      url="https://example.com/blog"
      title="Blog headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      description="This is a mighty good description of this blog."
    />
  </>
);

export default Page;
```

## Recipe

```jsx
import { RecipeJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Recipe JSON-LD</h1>
    <RecipeJsonLd
      name="Party Coffee Cake"
      description="This coffee cake is awesome and perfect for parties."
      datePublished="2018-03-10"
      authorName={['Jane Blogs', 'Mary Stone']}
      prepTime="PT20M"
      cookTime="PT30M"
      totalTime="PT50M"
      keywords="cake for a party, coffee"
      yields="10"
      category="Dessert"
      cuisine="American"
      calories={270}
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      ingredients={[
        '2 cups of flour',
        '3/4 cup white sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '1/2 cup butter',
        '2 eggs',
        '3/4 cup milk',
      ]}
      instructions={[
        {
          name: 'Preheat',
          text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
          url: 'https://example.com/party-coffee-cake#step1',
          image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
        },
      ]}
      aggregateRating={{
        ratingValue: '5',
        ratingCount: '18',
      }}
      video={{
        name: 'How to make a Party Coffee Cake',
        description: 'This is how you make a Party Coffee Cake.',
        contentUrl: 'http://www.example.com/video123.mp4',
        embedUrl: 'http://www.example.com/videoplayer?video=123',
        uploadDate: '2018-02-05T08:00:00+08:00',
        duration: 'PT1M33S',
        thumbnailUrls: [
          'https://example.com/photos/1x1/photo.jpg',
          'https://example.com/photos/4x3/photo.jpg',
          'https://example.com/photos/16x9/photo.jpg',
        ],
        expires: '2019-02-05T08:00:00+08:00',
        hasPart: {
          '@type': 'Clip',
          name: 'Preheat oven',
          startOffset: 30,
          url: 'http://www.example.com/example?t=30',
        },
        watchCount: 2347,
        publication: {
          '@type': 'BroadcastEvent',
          isLiveBroadcast: true,
          startDate: '2020-10-24T14:00:00+00:00',
          endDate: '2020-10-24T14:37:14+00:00',
        },
        regionsAllowed: ['IT', 'NL'],
      }}
    />
  </>
);

export default Page;
```

**Required properties**

| Property            | Info                                                                |
| ------------------- | ------------------------------------------------------------------- |
| `name`              | The name of the recipe                                              |
| `description`       | A description of the recipe                                         |
| `authorName`        | The name of the recipe author. Can be a string or array of strings. |
| `ingredients`       | A list of ingredient strings                                        |
| `instructions`      | -                                                                   |
| `instructions.name` | The name of the instruction step.                                   |
| `instructions.text` | The directions of the instruction step.                             |

## Sitelinks Search Box

```jsx
import { SiteLinksSearchBoxJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Sitelinks Search Box JSON-LD</h1>
    <SiteLinksSearchBoxJsonLd
      url="https://www.example.com"
      potentialActions={[
        {
          target: 'https://query.example.com/search?q',
          queryInput: 'search_term_string',
        },
        {
          target: 'android-app://com.example/https/query.example.com/search/?q',
          queryInput: 'search_term_string',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property                      | Info                                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`                         | URL of the website associated with the sitelinks searchbox                                                                                                                      |
| `potentialActions`            | Array of one or two SearchAction objects. Describes the URI to send the query to, and the syntax of the request that is sent                                                    |
| `potentialActions.target`     | For websites, the URL of the handler that should receive and handle the search query; for apps, the URI of the intent handler for your search engine that should handle queries |
| `potentialActions.queryInput` | Placeholder used in target, gets substituted for user given query                                                                                                               |

## Course

```jsx
import { CourseJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Course JSON-LD</h1>
    <CourseJsonLd
      courseName="Course Name"
      description="Introductory CS course laying out the basics."
      provider={{
        name: 'Course Provider',
        url: 'https//www.example.com/provider',
      }}
    />
  </>
);

export default Page;
```

**Required properties**

| Property        | Info                                                         |
| --------------- | ------------------------------------------------------------ |
| `courseName`    | The title of the course.                                     |
| `description`   | A description of the course. Display limit of 60 characters. |
| `provider.name` | The course provider name.                                    |
| `provider.url`  | The course provider name url.                                |

**Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

## Dataset

```jsx
import { DatasetJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Dataset JSON-LD</h1>
    <DatasetJsonLd
      description="The description needs to be at least 50 characters long"
      name="name of the dataset"
      license="https//www.example.com"
    />
  </>
);

export default Page;
```

**Required properties**

| Property      | Info                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| `description` | A short summary describing a dataset. Needs to be between 50 and 5000 characters. |
| `name`        | A license under which the dataset is distributed.                                 |

**Recommended properties**

| Property  | Info                            |
| --------- | ------------------------------- |
| `license` | The url to the course provider. |

## Corporate Contact

```jsx
import { CorporateContactJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Corporate Contact JSON-LD</h1>
    <CorporateContactJsonLd
      url="http://www.your-company-site.com"
      logo="http://www.example.com/logo.png"
      contactPoint={[
        {
          telephone: '+1-401-555-1212',
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: ['English', 'Spanish', 'French'],
        },
        {
          telephone: '+1-877-746-0909',
          contactType: 'customer service',
          contactOption: 'TollFree',
          availableLanguage: 'English',
        },
        {
          telephone: '+1-877-453-1304',
          contactType: 'technical support',
          contactOption: 'TollFree',
          areaServed: ['US', 'CA'],
          availableLanguage: ['English', 'French'],
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property                   | Info                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `url`                      | Url to the home page of the company's official site.                                            |
| `contactPoint`             |                                                                                                 |
| `contactPoint.telephone`   | An internationalized version of the phone number, starting with the "+" symbol and country code |
| `contactPoint.contactType` | Description of the purpose of the phone number i.e. `Technical Support`.                        |

**Recommended ContactPoint properties**

| Property                         | Info                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `contactPoint.areaServed`        | `String` or `Array` of geographical regions served by the business. Example `"US"` or `["US", "CA", "MX"]` |
| `contactPoint.availableLanguage` | Details about the language spoken. Example `"English"` or `["English", "French"]`                          |
| `gecontactPointo.contactOption`  | Details about the phone number. Example `"TollFree"`                                                       |

## FAQ Page

```jsx
import { FAQPageJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>FAQ Page JSON-LD</h1>
    <FAQPageJsonLd
      mainEntity={[
        {
          questionName: 'How long is the delivery time?',
          acceptedAnswerText: '3-5 business days.',
        },
        {
          questionName: 'Where can I find information about product recalls?',
          acceptedAnswerText: 'Read more on under information.',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property                        | Info                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `mainEntity`                    |                                                                               |
| `mainEntity.questionName`       | The full text of the question. For example, "How long is the delivery time?". |
| `mainEntity.acceptedAnswerText` | The full answer to the question.                                              |

## Job Posting

```jsx
import { JobPostingJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Job Posting JSON-LD</h1>
    <JobPostingJsonLd
      datePosted="2020-01-06T03:37:40Z"
      description="Company is looking for a software developer...."
      hiringOrganization={{
        name: 'company name',
        sameAs: 'www.company-website-url.dev',
      }}
      jobLocation={{
        streetAddress: '17 street address',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        postalCode: '75001',
        addressCountry: 'France',
      }}
      title="Job Title"
      baseSalary={{
        currency: 'EUR',
        value: 40, // Can also be a salary range, like [40, 50]
        unitText: 'HOUR',
      }}
      employmentType="FULL_TIME"
      jobLocationType="TELECOMMUTE"
      validThrough="2020-01-06"
      applicantLocationRequirements="FR"
    />
  </>
);

export default Page;
```

**Required properties**

| Property                    | Info                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `datePosted`                | The original date that employer posted the job in ISO 8601 format                                      |
| `description`               | The full description of the job in HTML format                                                         |
| `hiringOrganization`        |                                                                                                        |
| `hiringOrganization.name`   | Name of the company offering the job position                                                          |
| `hiringOrganization.sameAs` | URL of a reference Web page                                                                            |
| `title`                     | The title of the job (not the title of the posting)                                                    |
| `validThrough`              | The date when the job posting will expire in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) |

**Supported properties**

| Property                        | Info                                                                                                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicantLocationRequirements` | The geographic location(s) in which employees may be located for to be eligible for the remote job                                                          |
| `baseSalary`                    |                                                                                                                                                             |
| `baseSalary.currency`           | The currency in which the monetary amount is expressed                                                                                                      |
| `baseSalary.value`              | The value of the quantitative value. You can also provide an array of minimum and maximum salaries. .                                                       |
| `baseSalary.unitText`           | A string indicating the unit of measurement [Base salary guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)            |
| `employmentType`                | Type of employment [Employement type guideline](https://developers.google.com/search/docs/data-types/job-posting#basesalary)                                |
| `jobLocation`                   | The physical location(s) of the business where the employee will report to work (such as an office or worksite), not the location where the job was posted. |
| `jobLocation.streetAddress`     | The street address. For example, 1600 Amphitheatre Pkwy                                                                                                     |
| `jobLocation.addressLocality`   | The locality. For example, Mountain View.                                                                                                                   |
| `jobLocation.addressRegion`     | The region. For example, CA.                                                                                                                                |
| `jobLocation.postalCode`        | The postal code. For example, 94043                                                                                                                         |
| `jobLocation.addressCountry`    | The country. For example, USA. You can also provide the two-letter ISO 3166-1 alpha-2 country code.                                                         |
| `jobLocationType`               | A description of the job location [Job Location type guideline](https://developers.google.com/search/docs/data-types/job-posting#job-location-type)         |
| `hiringOrganization.logo`       | Logos on third-party job sites [Hiring Organization guideline](https://developers.google.com/search/docs/data-types/job-posting#hiring)                     |

## Local Business

Local business is supported with a sub-set of properties.

```jsx
<LocalBusinessJsonLd
  type="Store"
  id="http://davesdeptstore.example.com"
  name="Dave's Department Store"
  description="Dave's latest department store in San Jose, now open"
  url="http://www.example.com/store-locator/sl/San-Jose-Westgate-Store/1427"
  telephone="+14088717984"
  address={{
    streetAddress: '1600 Saratoga Ave',
    addressLocality: 'San Jose',
    addressRegion: 'CA',
    postalCode: '95129',
    addressCountry: 'US',
  }}
  geo={{
    latitude: '37.293058',
    longitude: '-121.988331',
  }}
  images={[
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg',
  ]}
  sameAs={[
    'www.company-website-url1.dev',
    'www.company-website-url2.dev',
    'www.company-website-url3.dev',
  ]}
  openingHours={[
    {
      opens: '08:00',
      closes: '23:59',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
    {
      opens: '14:00',
      closes: '20:00',
      dayOfWeek: 'Sunday',
      validFrom: '2019-12-23',
      validThrough: '2020-04-02',
    },
  ]}
  rating={{
    ratingValue: '4.5',
    ratingCount: '2',
  }}
  review={[
    {
      author: 'John Doe',
      datePublished: '2006-05-04',
      name: 'A masterpiece of literature',
      reviewBody:
        'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
      reviewRating: {
        bestRating: '5',
        worstRating: '1',
        reviewAspect: 'Ambiance',
        ratingValue: '4',
      },
    },
    {
      author: 'Bob Smith',
      datePublished: '2006-06-15',
      name: 'A good read.',
      reviewBody: "Catcher in the Rye is a fun book. It's a good book to read.",
      reviewRating: {
        ratingValue: '4',
      },
    },
  ]}
  makesOffer={[
    {
      priceSpecification: {
        type: 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: '1000-10000',
      },
      itemOffered: {
        name: 'Motion Design Services',
        description:
          'We are the expert of animation and motion design productions.',
      },
    },
    {
      priceSpecification: {
        type: 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: '2000-10000',
      },
      itemOffered: {
        name: 'Branding Services',
        description:
          'Real footage is a powerful tool when it comes to show what the business is about. Can be used to present your company, show your factory, promote a product packshot, or just tell any story. It can help create emotional links with your audience by showing punchy images.',
      },
    },
  ]}
  areaServed={[
    {
      geoMidpoint: {
        latitude: '41.108237',
        longitude: '-80.642982',
      },
      geoRadius: '1000',
    },
    {
      geoMidpoint: {
        latitude: '51.108237',
        longitude: '-80.642982',
      },
      geoRadius: '1000',
    },
  ]}
  action={{
    actionName: 'potentialAction',
    actionType: 'ReviewAction',
    target: 'https://www.example.com/review/this/business',
  }}
/>
```

**Required properties**

| Property                  | Info                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `@id`                     | Globally unique ID of the specific business location in the form of a URL. |
| `type`                    | LocalBusiness or any sub-type                                              |
| `address`                 | Address of the specific business location                                  |
| `address.addressCountry`  | The 2-letter ISO 3166-1 alpha-2 country code                               |
| `address.addressLocality` | City                                                                       |
| `address.addressRegion`   | State or province, if applicable.                                          |
| `address.postalCode`      | Postal or zip code.                                                        |
| `address.streetAddress`   | Street number, street name, and unit number.                               |
| `name`                    | Business name.                                                             |

**Supported properties**

| Property                                            | Info                                                                                                                                                 |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`                                       | Description of the business location                                                                                                                 |
| `geo`                                               | Geographic coordinates of the business.                                                                                                              |
| `geo.latitude`                                      | The latitude of the business location                                                                                                                |
| `geo.longitude`                                     | The longitude of the business location                                                                                                               |
| `rating`                                            | The average rating of business based on multiple ratings or reviews.                                                                                 |
| `rating.ratingValue`                                | The rating for the content.                                                                                                                          |
| `rating.ratingCount`                                | The count of total number of ratings.                                                                                                                |
| `priceRange`                                        | The relative price range of the business.                                                                                                            |
| `servesCuisine`                                     | The type of cuisine the restaurant serves.                                                                                                           |
| `images`                                            | An image or images of the business. Required for valid markup depending on the type                                                                  |
| `telephone`                                         | A business phone number meant to be the primary contact method for customers.                                                                        |
| `url`                                               | The fully-qualified URL of the specific business location.                                                                                           |
| `sameAs`                                            | An array of URLs that represent this business                                                                                                        |
| `openingHours`                                      | Opening hour specification of business. You can provide this as a single object, or an array of objects with the properties below.                   |
| `openingHours.opens`                                | The opening hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.closes`                               | The closing hour of the place or service on the given day(s) of the week.                                                                            |
| `openingHours.dayOfWeek`                            | The day of the week for which these opening hours are valid. Can be a string or array of strings. Refer to [DayOfWeek](https://schema.org/DayOfWeek) |
| `openingHours.validFrom`                            | The date when the item becomes valid.                                                                                                                |
| `openingHours.validThrough`                         | The date after when the item is not valid.                                                                                                           |
| `review`                                            | A review of the local business.                                                                                                                      |
| `review.author`                                     | The author of this content or rating.                                                                                                                |
| `review.reviewBody`                                 | The actual body of the review.                                                                                                                       |
| `review.datePublished`                              | Date of first broadcast/publication.                                                                                                                 |
| `review.name`                                       | The name of the item.                                                                                                                                |
| `review.rating`                                     | The rating given in this review                                                                                                                      |
| `review.rating.ratingValue`                         | The rating for the content.                                                                                                                          |
| `review.rating.reviewAspect`                        | This Review or Rating is relevant to this part or facet of the itemReviewed.                                                                         |
| `review.rating.worstRating`                         | The lowest value allowed in this rating system. If worstRating is omitted, 1 is assumed.                                                             |
| `review.rating.bestRating`                          | The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed                                                              |
| `areasServed`                                       | The geographic area where a service or offered item is provided.                                                                                     |
| `areasServed.GeoCircle`                             | A GeoCircle is a GeoShape representing a circular geographic area.                                                                                   |
| `areasServed.GeoCircle.geoMidpoint`                 | Indicates the GeoCoordinates at the centre of a GeoShape e.g. GeoCircle.                                                                             |
| `areasServed.GeoCircle.geoMidpoint.latitude`        | The latitude of a location. For example 37.42242                                                                                                     |
| `areasServed.GeoCircle.geoMidpoint.longitude`       | The name of the item.                                                                                                                                |
| `areasServed.GeoCircle.geoRadius`                   | Indicates the approximate radius of a GeoCircle (metres unless indicated otherwise via Distance notation).                                           |
| `makesOffer`                                        | A pointer to products or services offered by the organization or person.                                                                             |
| `makesOffer.offer`                                  | An offer to transfer some rights to an item or to provide a service                                                                                  |
| `makesOffer.offer.priceSpecification`               | One or more detailed price specifications, indicating the unit price and delivery or payment charges.                                                |
| `makesOffer.offer.priceSpecification.priceCurrency` | The currency of the price, or a price component when attached to PriceSpecification and its subtypes.                                                |
| `makesOffer.offer.priceSpecification.price`         | The offer price of a product, or of a price component when attached to PriceSpecification and its subtypes.                                          |
| `makesOffer.offer.itemOffered`                      | An item being offered (or demanded)                                                                                                                  |
| `makesOffer.offer.itemOffered.name`                 | The name of the item                                                                                                                                 |
| `makesOffer.offer.itemOffered.description`          | The description of the item.                                                                                                                         |
| `action`                                            | An action performed by a direct agent and indirect participants upon a direct object.                                                                |
| `action.target`                                     | Indicates a target EntryPoint for an Action.                                                                                                         |

**NOTE:**

Images are recommended for most of the types that you can use for `LocalBusiness`, if in doubt you should add an image. You can check your generated JSON over at Google's [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)

## Logo

```jsx
import { LogoJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Logo JSON-LD</h1>
    <LogoJsonLd
      logo="http://www.your-site.com/images/logo.jpg"
      url="http://www.your-site.com"
    />
  </>
);

export default Page;
```

| Property | Info                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `url`    | The URL of the website associated with the logo. [Logo guidelines](https://developers.google.com/search/docs/data-types/logo#definitions) |
| `logo`   | URL of a logo that is representative of the organization.                                                                                 |

## Product

```jsx
import { ProductJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Product JSON-LD</h1>
    <ProductJsonLd
      productName="Executive Anvil"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
      brand="ACME"
      color="blue"
      manufacturerName="Gary Meehan"
      manufacturerLogo="https://www.example.com/photos/logo.jpg"
      material="steel"
      slogan="For the business traveller looking for something to drop from a height."
      disambiguatingDescription="Executive Anvil, perfect for the business traveller."
      releaseDate="2014-02-05T08:00:00+08:00"
      productionDate="2015-02-05T08:00:00+08:00"
      purchaseDate="2015-02-06T08:00:00+08:00"
      award="Best Executive Anvil Award."
      reviews={[
        {
          author: 'Jim',
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody:
            'This is my favorite product yet! Thanks Nate for the example products and reviews.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
          },
          publisher: {
            type: 'Organization',
            name: 'TwoVit',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '4.4',
        reviewCount: '89',
      }}
      offers={[
        {
          price: '119.99',
          priceCurrency: 'USD',
          priceValidUntil: '2020-11-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.com/executive-anvil',
          seller: {
            name: 'Executive Objects',
          },
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.ca/executive-anvil',
          seller: {
            name: 'Executive Objects',
          },
        },
      ]}
      mpn="925872"
    />
  </>
);

export default Page;
```

Also available: `sku`, `gtin8`, `gtin13`, `gtin14`.

Valid values for `offers.itemCondition`:

- <https://schema.org/DamagedCondition>
- <https://schema.org/NewCondition>
- <https://schema.org/RefurbishedCondition>
- <https://schema.org/UsedCondition>

Valid values for `offers.availability`:

- <https://schema.org/Discontinued>
- <https://schema.org/InStock>
- <https://schema.org/InStoreOnly>
- <https://schema.org/LimitedAvailability>
- <https://schema.org/OnlineOnly>
- <https://schema.org/OutOfStock>
- <https://schema.org/PreOrder>
- <https://schema.org/PreSale>
- <https://schema.org/SoldOut>

The property `aggregateOffer` is also available:
(It is ignored if `offers` is set)

**Required properties**

| Property        | Info                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `lowPrice`      | The lowest price of all offers available. Use a floating point number.            |
| `priceCurrency` | The currency used to describe the product price, in three-letter ISO 4217 format. |

**Recommended properties**

| Property     | Info                                                                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `highPrice`  | The highest price of all offers available. Use a floating point number.                                                                                         |
| `offerCount` | The number of offers for the product.                                                                                                                           |
| `offers`     | An offer to transfer some rights to an item or to provide a service. You can provide this as a single object, or an array of objects with the properties below. |

More info on the product data type can be found [here](https://developers.google.com/search/docs/data-types/product).

## Social Profile

```jsx
import { SocialProfileJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Social Profile JSON-LD</h1>
    <SocialProfileJsonLd
      type="Person"
      name="your name"
      url="http://www.your-site.com"
      sameAs={[
        'http://www.facebook.com/your-profile',
        'http://instagram.com/yourProfile',
        'http://www.linkedin.com/in/yourprofile',
        'http://plus.google.com/your_profile',
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property | Info                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `type`   | Person or Organization                                                                    |
| `name`   | The name of the person or organization                                                    |
| `url`    | The URL for the person's or organization's official website.                              |
| `sameAs` | An array of URLs for the person's or organization's official social media profile page(s) |

**Google Supported Social Profiles**

- Facebook
- Twitter
- Google+
- Instagram
- YouTube
- LinkedIn
- Myspace
- Pinterest
- SoundCloud
- Tumblr

## News Article

```jsx
import { NewsArticleJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>News Article JSON-LD</h1>
    <NewsArticleJsonLd
      url="https://example.com/article"
      title="Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      section="politic"
      keywords="prayuth,taksin"
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this article."
      body="This is all text for this news article"
    />
  </>
);

export default Page;
```

[Google Docs for Social Profile](https://developers.google.com/search/docs/data-types/social-profile)

## Video

```jsx
import { VideoJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Video JSON-LD</h1>
    <VideoJsonLd
      name="How to make a Party Coffee Cake"
      description="This is how you make a Party Coffee Cake."
      contentUrl="http://www.example.com/video123.mp4"
      embedUrl="http://www.example.com/videoplayer?video=123"
      uploadDate="2018-02-05T08:00:00+08:00"
      duration="PT1M33S"
      thumbnailUrls={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      expires="2019-02-05T08:00:00+08:00"
      hasPart={{
        name: 'Preheat oven',
        startOffset: 30,
        url: 'http://www.example.com/example?t=30',
      }}
      watchCount={2347}
      publication={{
        isLiveBroadcast: true,
        startDate: '2020-10-24T14:00:00+00:00',
        endDate: '2020-10-24T14:37:14+00:00',
      }}
      regionsAllowed={['IT', 'NL']}
    />
  </>
);

export default Page;
```

**Required properties**

| Property       | Info                                                        |
| -------------- | ----------------------------------------------------------- |
| `name`         | The title of the video.                                     |
| `description`  | The description of the video. HTML tags are ignored.        |
| `thumbnailUrl` | A URL pointing to the video thumbnail image file.           |
| `uploadDate`   | The date the video was first published, in ISO 8601 format. |

**Recommended properties**

| Property               | Info                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `contentUrl`           | A URL pointing to the actual video media file, in one of the supported encoding formats. |
| `duration`             | The duration of the video in ISO 8601 format                                             |
| `embedUrl`             | A URL pointing to a player for the specific video.                                       |
| `expires`              | If applicable, the date after which the video will no longer be available.               |
| `interactionStatistic` | The number of times the video has been watched.                                          |
| `publication`          | If your video is happening live and you want to be eligible for the LIVE badge.          |
| `regionsAllowed`       | The regions where the video is allowed.                                                  |

## VideoGame

```jsx
import { VideoGameJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>VideoGame JSON-LD</h1>
    <VideoGameJsonLd
      name="Red Dead Redemption 2"
      translatorName={['Translator 1', 'Translator 2']}
      languageName={['English', 'Kurdish']}
      description="Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive."
      processorRequirements="4 GHz"
      memoryRequirements="16 Gb"
      playMode="SinglePlayer"
      applicationCategory="Game"
      url="https://example.com/rdr2-game"
      platformName={['PC game', 'PlayStation 4']}
      operatingSystemName="windows"
      keywords="outlaw, gang, federal agents"
      datePublished="2019-02-05T08:00:00+08:00"
      image="https://example.com/photos/1x1/photo.jpg"
      publisherName="Vertical Games"
      producerName="Rockstar Games"
      producerUrl="https//www.example.com/producer"
      offers={[
        {
          price: '119.99',
          priceCurrency: 'USD',
          priceValidUntil: '2020-11-05',
          availability: 'https://schema.org/InStock',
          url: 'https://example.net/rdr2-game',
          seller: {
            name: 'Executive Gaming',
          },
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          availability: 'https://schema.org/InStock',
          url: 'https://example.org/rdr2-game',
          seller: {
            name: 'Executive Gaming',
          },
        },
      ]}
      aggregateRating={{
        ratingValue: '44',
        reviewCount: '89',
        ratingCount: '684',
        bestRating: '100',
      }}
      reviews={[
        {
          author: {
            type: 'Person',
            name: 'AhmetKaya',
          },
          publisher: {
            type: 'Organization',
            name: 'Gam Production',
          },
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody: 'Iki gozum.',
          name: 'Rica ederim.',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
          },
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `name`   | The title of the video game. |

[More information about the schema](https://schema.org/VideoGame)

## Event

```jsx
import { EventJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Event JSON-LD</h1>
    <EventJsonLd
      name="My Event"
      startDate="2020-01-23T00:00:00.000Z"
      endDate="2020-01-24T00:00:00.000Z"
      location={{
        name: 'My Place',
        sameAs: 'https://example.com/my-place',
        address: {
          streetAddress: '1600 Saratoga Ave',
          addressLocality: 'San Jose',
          addressRegion: 'CA',
          postalCode: '95129',
          addressCountry: 'US',
        },
      }}
      url="https://example.com/my-event"
      images={['https://example.com/photos/photo.jpg']}
      description="My event @ my place"
      offers={[
        {
          price: '119.99',
          priceCurrency: 'USD',
          priceValidUntil: '2020-11-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.com/executive-anvil',
          seller: {
            name: 'John Doe',
          },
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          itemCondition: 'https://schema.org/UsedCondition',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.ca/executive-anvil',
          seller: {
            name: 'John Doe Sr.',
          },
        },
      ]}
      performers={[
        {
          name: 'Adele',
        },
        {
          name: 'Kira and Morrison',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property    | Info                                               |
| ----------- | -------------------------------------------------- |
| `name`      | The name of the event                              |
| `startDate` | The start date time of the event in iso8601 format |
| `endDate`   | The end date time of the event in iso8601 format   |
| `location`  | Place type with a nested Address type              |

**Supported properties**

| Property          | Info                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`     | Description of the event                                                                                                                                        |
| `location.sameAs` | Description of the event location                                                                                                                               |
| `images`          | An image or images of the event.                                                                                                                                |
| `url`             | The fully-qualified URL of the event.                                                                                                                           |
| `offers`          | An offer to transfer some rights to an item or to provide a service. You can provide this as a single object, or an array of objects with the properties below. |
| `performers`      | All artists that perform at this event. You can provide this as a single object, or an array of objects with the properties below.                              |
| `performers.name` | The name of the performer                                                                                                                                       |

**`offers` Required properties**

| Property               | Info                      |
| ---------------------- | ------------------------- |
| `offers.price`         | The cost of the offer     |
| `offers.priceCurrency` | The currency of the offer |

**`offers` Recommended properties**

| Property                 | Info                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `offers.priceValidUntil` | Until when the price of the offer expires                                           |
| `offers.itemCondition`   | The condition of the product or service                                             |
| `offers.availability`    | The availability of this item — for example In stock, Out of stock, Pre-order, etc. |
| `offers.url`             | URL of the item                                                                     |
| `offers.seller`          | The person who is selling this item                                                 |
| `offers.seller.name`     | The name of the person                                                              |

The property `aggregateOffer` is also available:
(It is ignored if `offers` is set)

**Required properties**

| Property        | Info                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `lowPrice`      | The lowest price of all offers available. Use a floating point number.            |
| `priceCurrency` | The currency used to describe the product price, in three-letter ISO 4217 format. |

**Recommended properties**

| Property     | Info                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `highPrice`  | The highest price of all offers available. Use a floating point number. |
| `offerCount` | The number of offers for the product.                                   |

For reference and more info check [Google's Search Event DataType](https://developers.google.com/search/docs/data-types/event)

## Q&A

Q&A pages are web pages that contain data in a question and answer format, which is one question followed by its answers.

```jsx
import { QAPageJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Q&A Page JSON-LD</h1>
    <QAPageJsonLd
      mainEntity={{
        name: 'How many ounces are there in a pound?',
        text: 'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
        answerCount: 3,
        upvoteCount: 26,
        dateCreated: '2016-07-23T21:11Z',
        author: { name: 'New Baking User' },
        acceptedAnswer: {
          text: '1 pound (lb) is equal to 16 ounces (oz).',
          dateCreated: '2016-11-02T21:11Z',
          upvoteCount: 1337,
          url: 'https://example.com/question1#acceptedAnswer',
          author: {
            name: 'SomeUser',
          },
        },
        suggestedAnswer: [
          {
            text: 'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
            dateCreated: '2016-11-02T21:11Z',
            upvoteCount: 42,
            url: 'https://example.com/question1#suggestedAnswer1',
            author: {
              name: 'AnotherUser',
            },
          },
          {
            text: `I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.`,
            dateCreated: '2016-11-06T21:11Z',
            upvoteCount: 0,
            url: 'https://example.com/question1#suggestedAnswer2',
            author: {
              name: 'ConfusedUser',
            },
          },
        ],
      }}
    />
  </>
);

export default Page;
```

**Required properties**

| Property     | Info                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| `mainEntity` | The Question for this page must be nested under the mainEntity property of the QAPageJsonld component. |

**`mainEntity` Required properties**

| Property                              | Info                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `answerCount`                         | The total number of answers to the question.                                                                                  |
| `acceptedAnswer` or `suggestedAnswer` | To be eligible for the rich result, a question must have at least one answer – either an acceptedAnswer or a suggestedAnswer. |
| `name`                                | The full text of the short form of the question.                                                                              |

**`mainEntity` Supported properties**

| Property      | Info                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `author`      | The author of the question.                                               |
| `dateCreated` | The date at which the question was added to the page, in ISO-8601 format. |
| `text`        | The full text of the long form of the question.                           |
| `upvoteCount` | The total number of votes that this question has received.                |

**`acceptedAnswer`/`suggestedAnswer` Required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `text`   | The full text of the answer. |

**`acceptedAnswer`/`suggestedAnswer` Supported properties**

| Property      | Info                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `author`      | The author of the question.                                               |
| `dateCreated` | The date at which the question was added to the page, in ISO-8601 format. |
| `upvoteCount` | The total number of votes that this question has received.                |
| `url`         | A URL that links directly to this answer.                                 |

For reference and more info check [Google's Search Q&A DataType](https://developers.google.com/search/docs/data-types/qapage)

## Collection Page

Collection pages are web pages. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.

```jsx
import { CollectionPageJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Collection Page JSON-LD</h1>
    <CollectionPageJsonLd
      name="Resistance 3: Fall of Man"
      hasPart={[
        {
          about:
            'Britten Four Sea Interludes and Passacaglia from Peter Grimes',
          author: 'John Doe',
          name: 'Schema.org Ontology',
          datePublished: '2021-03-09',
          audience: 'Internet',
          keywords: 'schema',
          thumbnailUrl: 'https://i.ytimg.com/vi/eXSJ3PO9Tas/hqdefault.jpg',
          image: 'hqdefault.jpg',
        },
        {
          about: 'Shostakovich Symphony No. 7 (Leningrad)',
          author: 'John Smith',
          name: 'Creative work name',
          datePublished: '2014-10-01T19:30',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property  | Info                                                                                          |
| --------- | --------------------------------------------------------------------------------------------- |
| `name`    | The name of the item.                                                                         |
| `hasPart` | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). |

**Supported properties**

| Property               | Info                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork` | The most generic kind of [creative work](https://schema.org/CreativeWork), including books, movies, photographs, software programs, etc |

**`creativeWork` Required properties**

| Property                             | Info                                                                                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork.author`        | The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. |
| `hasPart.creativeWork.about`         | The subject matter of the content.                                                                                                                                                                                          |
| `hasPart.creativeWork.datePublished` | Date of first broadcast/publication.                                                                                                                                                                                        |
| `hasPart.creativeWork.name`          | The name of the item.                                                                                                                                                                                                       |

**`creativeWork` Supported properties**

| Property                            | Info                                                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `hasPart.creativeWork.audience`     | An intended audience, i.e. a group for whom something was created.                                                     |
| `hasPart.creativeWork.keywords`     | Keywords or tags used to describe this content. Multiple entries in a keywords list are typically delimited by commas. |
| `hasPart.creativeWork.thumbnailUrl` | A thumbnail image relevant to the Thing.                                                                               |
| `hasPart.creativeWork.image`        | An image of the item. This can be a URL or a fully described ImageObject.                                              |

For reference and more info check [Collection Page DataType](https://schema.org/CollectionPage)

## Profile page

Profile pages are web pages. Every web page is implicitly assumed to be declared to be of type WebPage, so the various properties about that webpage, such as breadcrumb may be used. We recommend explicit declaration if these properties are specified, but if they are found outside of an itemscope, they will be assumed to be about the page.

```jsx
import { ProfilePageJsonLd } from 'next-seo';

const Page = () => (
  <>
    <h1>Profile page JSON-LD</h1>
    <ProfilePageJsonLd
      lastReviewed="2014-10-01T19:30"
      breadcrumb={[
        {
          position: 1,
          name: 'Books',
          item: 'https://example.com/books',
        },
        {
          position: 2,
          name: 'Authors',
          item: 'https://example.com/books/authors',
        },
      ]}
    />
  </>
);

export default Page;
```

**Required properties**

| Property     | Info                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `breadcrumb` | A set of links that can help a user understand and navigate a website hierarchy represented as string or [BreadcrumbList](#breadcrumb). |

**Supported properties**

| Property       | Info                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `lastReviewed` | Date on which the content on this web page was last reviewed for accuracy and/or completeness. |

For reference and more info check [Profile Page DataType](https://schema.org/ProfilePage)

## Carousel

**Required properties of Carousel Component**

| Property | Info                                                               |
| -------- | ------------------------------------------------------------------ |
| `type`   | The type of carousel                                               |
| `data`   | The data in the form of an array for the item list in the carousel |

### Default (Summary List)

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Default JSON-LD</h1>
    <CarouselJsonLd
      ofType="default"
      data={[
        { url: 'http://example.com/peanut-butter-cookies.html' },
        {
          url: 'http://example.com/triple-chocolate-chunk.html',
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property | Info                             |
| -------- | -------------------------------- |
| `url`    | URL of the item's detailed page. |

### Course

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Course JSON-LD</h1>
    <CarouselJsonLd
      ofType="course"
      data={[
        {
          courseName: 'Course 1',
          description: 'Course 1 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-1.html',
        },
        {
          courseName: 'Course 2',
          description: 'Course 2 Description',
          providerName: 'Course Provider',
          url: 'http://example.com/course-2.html',
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property       | Info                                                         |
| -------------- | ------------------------------------------------------------ |
| `courseName`   | The title of the course.                                     |
| `description`  | A description of the course. Display limit of 60 characters. |
| `providerName` | The course provider name.                                    |
| `url`          | URL of the item's detailed page .                            |

**Data Recommended properties**

| Property      | Info                            |
| ------------- | ------------------------------- |
| `providerUrl` | The url to the course provider. |

### Movie

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Movie JSON-LD</h1>
    <CarouselJsonLd
      ofType="movie"
      data={[
        {
          name: 'Movie 1',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: {
            name: 'John Doe',
          },
          review: {
            author: { type: 'Person', name: 'Ronan Farrow' },
            reviewBody:
              'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
        {
          name: 'Movie 2',
          url: 'http://example.com/movie-1.html',
          image:
            'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
          director: [
            {
              name: 'Mary Doe',
            },
            {
              name: 'John Doe',
            },
          ],
          review: {
            author: { type: 'Person', name: 'Ronan Farrow' },
            reviewBody:
              'Heartbreaking, inpsiring, moving. Rowan Atkinson is a triple threat.',
            reviewRating: { ratingValue: '5' },
          },
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property | Info                                |
| -------- | ----------------------------------- |
| `name`   | Name of the movie.                  |
| `image`  | An image that represents the movie. |
| `url`    | URL of the item's detailed page.    |

**Data Recommended properties**

| Property          | Info                                   |
| ----------------- | -------------------------------------- |
| `director`        | The directors of the movie.            |
| `dateCreated`     | The date the movie was released.       |
| `aggregateRating` | Aggregate Rating object for the movie. |
| `review`          | Review for the movie.                  |

### Recipe

```jsx
import React from 'react';
import { CarouselJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Carousel Recipe JSON-LD</h1>
    <CarouselJsonLd
      ofType="recipe"
      data={[
        {
          name: 'Party Coffee Cake',
          url: 'http://example.com/recipe-1.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
        {
          name: 'Party Coffee Cake 2',
          url: 'http://example.com/recipe-2.html',
          images: [
            'https://example.com/photos/1x1/photo.jpg',
            'https://example.com/photos/4x3/photo.jpg',
            'https://example.com/photos/16x9/photo.jpg',
          ],
          authorName: 'Mary Stone 2',
          datePublished: '2018-03-10',
          description: 'This coffee cake is awesome and perfect for parties.',
          prepTime: 'PT20M',
          cookTime: 'PT30M',
          totalTime: 'PT50M',
          keywords: 'cake for a party, coffee',
          yields: '10',
          category: 'Dessert',
          calories: 270,
          cuisine: 'American',
          ingredients: [
            '2 cups of flour',
            '3/4 cup white sugar',
            '2 teaspoons baking powder',
            '1/2 teaspoon salt',
            '1/2 cup butter',
            '2 eggs',
            '3/4 cup milk',
          ],
          instructions: [
            {
              name: 'Preheat',
              text: 'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
              url: 'https://example.com/party-coffee-cake#step1',
              image: 'https://example.com/photos/party-coffee-cake/step1.jpg',
            },
            {
              name: 'Mix dry ingredients',
              text: 'In a large bowl, combine flour, sugar, baking powder, and salt.',
              url: 'https://example.com/party-coffee-cake#step2',
              image: 'https://example.com/photos/party-coffee-cake/step2.jpg',
            },
            {
              name: 'Spread into pan',
              text: 'Spread into the prepared pan.',
              url: 'https://example.com/party-coffee-cake#step4',
              image: 'https://example.com/photos/party-coffee-cake/step4.jpg',
            },
            {
              name: 'Bake',
              text: 'Bake for 30 to 35 minutes, or until firm.',
              url: 'https://example.com/party-coffee-cake#step5',
              image: 'https://example.com/photos/party-coffee-cake/step5.jpg',
            },
          ],
          aggregateRating: {
            ratingValue: '5',
            ratingCount: '18',
          },
          video: {
            name: 'How to make a Party Coffee Cake',
            description: 'This is how you make a Party Coffee Cake.',
            thumbnailUrls: [
              'https://example.com/photos/1x1/photo.jpg',
              'https://example.com/photos/4x3/photo.jpg',
              'https://example.com/photos/16x9/photo.jpg',
            ],
            contentUrl: 'http://www.example.com/video123.mp4',
            embedUrl: 'http://www.example.com/videoplayer?video=123',
            uploadDate: '2018-02-05T08:00:00+08:00',
            duration: 'PT1M33S',
            expires: '2019-02-05T08:00:00+08:00',
          },
        },
      ]}
    />
  </>
);
```

**Data required properties**

| Property            | Info                                    |
| ------------------- | --------------------------------------- |
| `name`              | The name of the dish.                   |
| `description`       | A description of the recipe             |
| `authorName`        | The name of the recipe author           |
| `ingredients`       | A list of ingredient strings            |
| `instructions`      | -                                       |
| `instructions.name` | The name of the instruction step.       |
| `instructions.text` | The directions of the instruction step. |
| `url`               | URL of the item's detailed page.        |

## Software App

```jsx
import React from 'react';
import { SoftwareAppJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Software App JSON-LD</h1>
    <SoftwareAppJsonLd
      name="Angry Birds"
      price="1.00"
      priceCurrency="USD"
      aggregateRating={{ ratingValue: '4.6', reviewCount: '8864' }}
      operatingSystem="ANDROID"
      applicationCategory="GameApplication"
    />
  </>
);
```

**Data required properties**

| Property          | Info                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| `name`            | The name of the app.                                                      |
| `price`           | Price of the app. If the app is free of charge, set offers.price to 0     |
| `priceCurrency`   | If the app has a price greater than 0, you must include offers.currency.  |
| `aggregateRating` | The average review score of the app. (Not required if review is present.) |
| `review`          | A single review of the app. (Not required if aggregateRating is present.) |

**Data Recommended properties**

| Property              | Info                              |
| --------------------- | --------------------------------- |
| `operatingSystem`     | The operating System suuported    |
|                       | By the game it self.              |
| `applicationCategory` | Desktop Software or Video Game... |

For reference and more info check [Google docs for Software App](https://developers.google.com/search/docs/data-types/software-app)

## Organization

```jsx
import React from 'react';
import { OrganizationJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Organization JSON-LD</h1>
    <OrganizationJsonLd
      type="Corporation"
      id="https://www.purpule-fox.io/#corporation"
      logo="https://www.example.com/photos/logo.jpg"
      legalName="Purple Fox LLC"
      name="Purple Fox"
      address={{
        streetAddress: '1600 Saratoga Ave',
        addressLocality: 'San Jose',
        addressRegion: 'CA',
        postalCode: '95129',
        addressCountry: 'US',
      }}
      contactPoint={[
        {
          telephone: '+1-401-555-1212',
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: ['English', 'Spanish', 'French'],
        },
        {
          telephone: '+1-877-746-0909',
          contactType: 'customer service',
          contactOption: 'TollFree',
          availableLanguage: 'English',
        },
        {
          telephone: '+1-877-453-1304',
          contactType: 'technical support',
          contactOption: 'TollFree',
          areaServed: ['US', 'CA'],
          availableLanguage: ['English', 'French'],
        },
      ]}
      sameAs={['https://www.orange-fox.com']}
      url="https://www.purpule-fox.io/"
    />
  </>
);
```

**Data required properties**

| Property                   | Info                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `name`                     | The name of the Organization.                                                                   |
| `url`                      | Url of the organization                                                                         |
| `contactPoint`             |                                                                                                 |
| `contactPoint.telephone`   | An internationalized version of the phone number, starting with the "+" symbol and country code |
| `contactPoint.contactType` | Description of the purpose of the phone number i.e. `Technical Support`.                        |

**Data Recommended properties**

| Property                         | Info                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `logo`                           | ImageObject or URL an associated logo to the Organization.                                                 |
| `type`                           | Organization type, check [here](https://schema.org/Organization#subtypes)                                  |
| `legalName`                      | The official name of the organization, e.g. the registered company name.                                   |
| `sameAs`                         | URL of a reference Web page that unambiguously indicates the item's identity.                              |
| `address`                        | Address of the specific business location                                                                  |
| `address.addressCountry`         | The 2-letter ISO 3166-1 alpha-2 country code                                                               |
| `address.addressLocality`        | City                                                                                                       |
| `address.addressRegion`          | State or province, if applicable.                                                                          |
| `address.postalCode`             | Postal or zip code.                                                                                        |
| `address.streetAddress`          | Street number, street name, and unit number.                                                               |
| `contactPoint.areaServed`        | `String` or `Array` of geographical regions served by the business. Example `"US"` or `["US", "CA", "MX"]` |
| `contactPoint.availableLanguage` | Details about the language spoken. Example `"English"` or `["English", "French"]`                          |

For reference and more info check [Docs](https://schema.org/Organization)

## Brand

```jsx
import React from 'react';
import { BrandJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>Brand JSON-LD</h1>
    <BrandJsonLd
      slogan="What does the fox say?"
      id="https://www.purpule-fox.io/#corporation"
      logo="https://www.example.com/photos/logo.jpg"
      aggregateRating={{
        ratingValue: '5',
        ratingCount: '18',
      }}
    />
  </>
);
```

**Data required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `id`     | 'URL to main entity of page' |

**Data Recommended properties**

| Property                      | Info                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `logo`                        | ImageObject or URL an associated logo to the Organization.                               |
| `slogan`                      | A slogan or motto associated with the item.                                              |
| `aggregateRating.ratingValue` | The rating for the content.(Check the [reference](https://schema.org/ratingValue)        |
| `aggregateRating.ratingCount` | The count of total number of ratings.                                                    |
| `aggregateRating.reviewCount` | The count of total number of reviews.                                                    |
| `aggregateRating.bestRating`  | The highest value allowed in this rating system. If bestRating is omitted, 5 is assumed. |

For reference and more info check [Docs](https://schema.org/Brand)

## WebPage

```jsx
import React from 'react';
import { WebPageJsonLd } from 'next-seo';

export default () => (
  <>
    <h1>WebPage JSON-LD</h1>
    <WebPageJsonLd
      description="What does the fox say?"
      id="https://www.purpule-fox.io/#corporation"
      lastReviewed="2021-05-26T05:59:02.085Z"
      reviewedBy={{
        type: 'Person',
        name: 'Garmeeh',
      }}
    />
  </>
);
```

**Data required properties**

| Property | Info                         |
| -------- | ---------------------------- |
| `id`     | 'URL to main entity of page' |

**Data Recommended properties**

| Property          | Info                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `description`     | ImageObject or URL an associated logo to the Organization.                                           |
| `lastReviewed`    | Date on which the content on this web page was last reviewed for accuracy and/or completeness.       |
| `reviewedBy.type` | People or organizations that will review the content of the web page.                                |
| `reviewedBy.name` | Name of the entity that have reviewed the content on this web page for accuracy and/or completeness. |

For reference and more info check [Docs](https://schema.org/Brand)