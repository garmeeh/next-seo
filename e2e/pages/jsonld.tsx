import React from 'react';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  BlogJsonLd,
  CourseJsonLd,
  LocalBusinessJsonLd,
  LogoJsonLd,
  ProductJsonLd,
  SocialProfileJsonLd,
  CorporateContactJsonLd,
  NewsArticleJsonLd,
  FAQPageJsonLd,
  JobPostingJsonLd,
  EventJsonLd,
  DatasetJsonLd,
  RecipeJsonLd,
  SiteLinksSearchBoxJsonLd,
  QAPageJsonld,
  SoftwareAppJsonLd,
} from '../..';
import Links from '../components/links';

const JsonLD = () => (
  <>
    <h1>All JSON-LD</h1>
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
          item: 'https://example.com/books/authors/annleckie/ancillaryjustice',
        },
      ]}
    />

    <BlogJsonLd
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

    <CourseJsonLd
      courseName="Course Name"
      providerName="Course Provider"
      providerUrl="https//www.example.com/provider"
      description="Course description goes right here"
    />

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
      sameAs={['https://thisbusiness.com', 'https://alsothisbusiness.com']}
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
          reviewBody:
            "Catcher in the Rye is a fun book. It's a good book to read.",
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

    <LogoJsonLd
      logo="http://www.your-site.com/images/logo.jpg"
      url="http://www.and-this-one.com"
    />

    <LogoJsonLd
      logo="http://www.your-site.com/images/logo.jpg"
      url="http://www.check-override-of-key.com"
      keyOverride="check-override-of-key"
    />

    <ProductJsonLd
      productName="Executive Anvil"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
      brand="ACME"
      reviews={[
        {
          author: {
            type: 'Person',
            name: 'Jim',
          },
          publisher: {
            type: 'Organization',
            name: 'TwoVit',
          },
          datePublished: '2017-01-06T03:37:40Z',
          reviewBody:
            'This is my favorite product yet! Thanks Nate for the example products and reviews.',
          name: 'So awesome!!!',
          reviewRating: {
            bestRating: '5',
            ratingValue: '5',
            worstRating: '1',
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
      aggregateOffer={{
        priceCurrency: 'USD',
        lowPrice: '119.99',
        highPrice: '139.99',
        offerCount: '5',
      }}
      mpn="925872"
    />

    <SocialProfileJsonLd
      type="Person"
      url="http://www.your-site.com"
      name="your name"
      sameAs={[
        'http://www.facebook.com/your-profile',
        'http://instagram.com/yourProfile',
        'http://www.linkedin.com/in/yourprofile',
        'http://plus.google.com/your_profile',
      ]}
    />
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

    <NewsArticleJsonLd
      url="https://example.com/newsarticle"
      title="News Article headline"
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      section="politics"
      keywords="prayuth, taksin, thai"
      dateCreated="2015-02-05T08:00:00+08:00"
      datePublished="2015-02-05T08:00:00+08:00"
      dateModified="2015-02-05T09:00:00+08:00"
      authorName="Jane Blogs"
      publisherName="Gary Meehan"
      publisherLogo="https://www.example.com/photos/logo.jpg"
      description="This is a mighty good description of this news article."
      body="This is article body of news article"
    />

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

    <JobPostingJsonLd
      datePosted="2020-01-06T03:37:40Z"
      description="Company is looking for a software developer...."
      hiringOrganization={{
        name: 'company name',
        sameAs: 'http://www.company-website-url.dev',
        logo: 'http://www.company-website-url.dev/images/logo.png',
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
        value: 40,
        unitText: 'HOUR',
      }}
      employmentType="FULL_TIME"
      jobLocationType="TELECOMMUTE"
      validThrough="2020-01-06"
      applicantLocationRequirements="FR"
    />

    <JobPostingJsonLd
      datePosted="2020-01-06T03:37:40Z"
      description="Company is looking for another software developer...."
      hiringOrganization={{
        name: 'company name',
        sameAs: 'http://www.company-website-url.dev',
        logo: 'http://www.company-website-url.dev/images/logo.png',
      }}
      jobLocation={{
        streetAddress: '17 street address',
        addressLocality: 'Paris',
        addressRegion: 'Ile-de-France',
        postalCode: '75001',
        addressCountry: 'France',
      }}
      title="Job Title #2"
      baseSalary={{
        currency: 'EUR',
        value: [40, 75],
        unitText: 'HOUR',
      }}
      employmentType="FULL_TIME"
      jobLocationType="TELECOMMUTE"
      validThrough="2020-01-06"
      applicantLocationRequirements="FR"
      keyOverride="second-job-posting-with-salary-range"
    />

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
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.com/offer',
          seller: {
            name: 'John Doe',
          },
        },
        {
          price: '139.99',
          priceCurrency: 'CAD',
          priceValidUntil: '2020-09-05',
          availability: 'https://schema.org/InStock',
          url: 'https://www.example.ca/other-offer',
          seller: {
            name: 'John Doe sr.',
          },
        },
      ]}
      aggregateOffer={{
        priceCurrency: 'USD',
        lowPrice: '119.99',
        highPrice: '139.99',
        offerCount: '5',
      }}
      performers={[
        {
          name: 'Adele',
        },
        {
          name: 'Kira and Morrison',
        },
      ]}
    />

    <DatasetJsonLd
      description="The description needs to be at least 50 characters long"
      name="name of the dataset"
      license="https//www.example.com"
    />

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
          text:
            'Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan.',
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
        watchCount: 2347,
      }}
    />

    <SiteLinksSearchBoxJsonLd
      url="https://example.com"
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

    <QAPageJsonld
      mainEntity={{
        name: 'How many ounces are there in a pound?',
        text:
          'I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?',
        answerCount: 3,
        upvotedCount: 26,
        dateCreated: '2016-07-23T21:11Z',
        author: { name: 'New Baking User' },
        acceptedAnswer: {
          text: '1 pound (lb) is equal to 16 ounces (oz).',
          dateCreated: '2016-11-02T21:11Z',
          upvotedCount: 1337,
          url: 'https://example.com/question1#acceptedAnswer',
          author: {
            name: 'SomeUser',
          },
        },
        suggestedAnswer: [
          {
            text:
              'Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.',
            dateCreated: '2016-11-02T21:11Z',
            upvotedCount: 42,
            url: 'https://example.com/question1#suggestedAnswer1',
            author: {
              name: 'AnotherUser',
            },
          },
          {
            text: `I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.`,
            dateCreated: '2016-11-06T21:11Z',
            upvotedCount: 0,
            url: 'https://example.com/question1#suggestedAnswer2',
            author: {
              name: 'ConfusedUser',
            },
          },
        ],
      }}
    />

    <SoftwareAppJsonLd
      name="Angry Birds"
      price="1.00"
      priceCurrency="USD"
      aggregateRating={{ ratingValue: '4.6', ratingCount: '8864' }}
      operatingSystem="ANDROID"
      applicationCategory="GameApplication"
    />

    <Links />
  </>
);

export default JsonLD;
