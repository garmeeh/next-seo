import { SoftwareApplicationJsonLd } from "next-seo";

export default function MobileAppPage() {
  return (
    <div className="container mx-auto p-8">
      <SoftwareApplicationJsonLd
        type="MobileApplication"
        name="FitTrack - Fitness & Workout Tracker"
        description="Your personal fitness companion for tracking workouts, nutrition, and health goals"
        url="https://example.com/fittrack"
        image={[
          "https://example.com/fittrack-icon-1x1.png",
          {
            url: "https://example.com/fittrack-icon-4x3.png",
            width: 1200,
            height: 900,
          },
          {
            url: "https://example.com/fittrack-icon-16x9.png",
            width: 1920,
            height: 1080,
          },
        ]}
        applicationCategory="HealthApplication"
        applicationSubCategory="FitnessTracking"
        operatingSystem="Android 7.0+, iOS 13.0+"
        offers={{
          price: 0,
          priceCurrency: "USD",
        }}
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 8500,
          reviewCount: 6200,
        }}
        review={[
          {
            author: "Alex Rivera",
            reviewRating: { ratingValue: 5 },
            reviewBody:
              "This app transformed my fitness journey! The workout tracking is incredibly detailed.",
            datePublished: "2024-11-10",
          },
          {
            author: "Emma Thompson",
            reviewRating: { ratingValue: 4 },
            reviewBody:
              "Great app with useful features. Would love to see more yoga workouts added.",
            datePublished: "2024-10-28",
          },
        ]}
        permissions={[
          "android.permission.ACTIVITY_RECOGNITION",
          "android.permission.ACCESS_FINE_LOCATION",
          "android.permission.CAMERA",
          "android.permission.READ_EXTERNAL_STORAGE",
          "android.permission.RECEIVE_BOOT_COMPLETED",
        ]}
        screenshot={[
          {
            url: "https://example.com/screenshots/fittrack-dashboard.jpg",
            caption: "Personal fitness dashboard",
          },
          {
            url: "https://example.com/screenshots/fittrack-workout.jpg",
            caption: "Workout tracking in progress",
          },
          {
            url: "https://example.com/screenshots/fittrack-nutrition.jpg",
            caption: "Nutrition tracking and meal planning",
          },
          {
            url: "https://example.com/screenshots/fittrack-progress.jpg",
            caption: "Progress charts and analytics",
          },
        ]}
        featureList={[
          "500+ exercise library with videos",
          "Custom workout creation",
          "GPS route tracking for runs",
          "Calorie and macro tracking",
          "Progress photos and measurements",
          "Apple Health and Google Fit sync",
          "Social challenges with friends",
          "Offline mode support",
          "Wearable device integration",
        ]}
        softwareVersion="5.3.2"
        datePublished="2019-01-15"
        dateModified="2024-11-20"
        author="FitTech Solutions"
        publisher={{
          name: "FitTech Solutions Ltd.",
          url: "https://fittechsolutions.com",
          logo: "https://fittechsolutions.com/logo.png",
        }}
        downloadUrl="https://play.google.com/store/apps/details?id=com.fittech.fittrack"
        installUrl="https://apps.apple.com/app/fittrack/id123456789"
        countriesSupported={["US", "CA", "GB", "AU", "NZ", "IE", "SG", "IN"]}
        storageRequirements="150MB"
      />

      <div className="max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <span className="text-white text-4xl font-bold">FT</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold">FitTrack</h1>
            <p className="text-xl text-gray-600">Fitness & Workout Tracker</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Start Your Fitness Journey Today
          </h2>
          <p className="text-gray-700 mb-6">
            Join millions of users who have transformed their lives with
            FitTrack. Track workouts, monitor nutrition, and achieve your health
            goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Download on App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              Get it on Google Play
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-green-600">4.7</div>
            <div className="text-yellow-400">★★★★★</div>
            <div className="text-sm text-gray-600">8,500 ratings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">5M+</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">Free</div>
            <div className="text-sm text-gray-600">With premium option</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">150MB</div>
            <div className="text-sm text-gray-600">App size</div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">🏋️‍♂️</div>
              <h3 className="font-semibold mb-2">Workout Tracking</h3>
              <p className="text-gray-600 text-sm">
                500+ exercises with video guides, custom workout creation, and
                real-time tracking
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">🍎</div>
              <h3 className="font-semibold mb-2">Nutrition Logger</h3>
              <p className="text-gray-600 text-sm">
                Track calories and macros, barcode scanner, meal planning tools
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Progress Analytics</h3>
              <p className="text-gray-600 text-sm">
                Detailed charts, progress photos, body measurements tracking
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">🏃‍♀️</div>
              <h3 className="font-semibold mb-2">GPS Tracking</h3>
              <p className="text-gray-600 text-sm">
                Track runs, walks, and bike rides with route mapping
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold mb-2">Social Features</h3>
              <p className="text-gray-600 text-sm">
                Challenge friends, join communities, share achievements
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-3">⌚</div>
              <h3 className="font-semibold mb-2">Wearable Sync</h3>
              <p className="text-gray-600 text-sm">
                Connects with Apple Watch, Fitbit, Garmin, and more
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-200 rounded-lg aspect-[9/16] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Dashboard</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-[9/16] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Workout</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-[9/16] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Nutrition</span>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-[9/16] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Progress</span>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Permissions</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              FitTrack requires the following permissions to provide the best
              experience:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">📍</span>
                <div>
                  <span className="font-medium">Location</span>
                  <p className="text-sm text-gray-600">
                    For GPS tracking during outdoor activities
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">📷</span>
                <div>
                  <span className="font-medium">Camera</span>
                  <p className="text-sm text-gray-600">
                    For progress photos and barcode scanning
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🏃</span>
                <div>
                  <span className="font-medium">Activity Recognition</span>
                  <p className="text-sm text-gray-600">
                    For automatic workout detection
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">💾</span>
                <div>
                  <span className="font-medium">Storage</span>
                  <p className="text-sm text-gray-600">
                    For saving workout data and photos
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                iOS Requirements
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• iOS 13.0 or later</li>
                <li>• Compatible with iPhone, iPad, and iPod touch</li>
                <li>• Apple Watch app included</li>
                <li>• Apple Health integration</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="#3DDC84"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                </svg>
                Android Requirements
              </h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Android 7.0 (API level 24) or higher</li>
                <li>• Works on phones and tablets</li>
                <li>• Wear OS companion app</li>
                <li>• Google Fit integration</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
