This file will no longer be updated. Please see [Releases](https://github.com/garmeeh/next-seo/releases) for release notes.

# Changelog

All notable changes to this project will be documented in this file.

## v2.1.2 - 04/10/19

### Fixed

- Fix incorrectly typed Rating and reviews for Product JSON-LD [PR #100](https://github.com/garmeeh/next-seo/pull/100)

## v2.1.1 - 10/09/19

### Fixed

- Fixed issue with `mobileAlternate` and `languageAlternate` only working in Default SEO [PR #98](https://github.com/garmeeh/next-seo/pull/98)

## v2.1.0 - 10/09/19

### Added

- Added `mobileAlternate` and `languageAlternate` [PR #90](https://github.com/garmeeh/next-seo/pull/90)

## v2.0.0 - 19/07/2019

Version of 2 of next-seo released!

Main changes:

- Project is now written in TypeScript
- You can now extra meta tags via next-seo
- Move to props rather than config object
- Made Default SEO it's own component
- Open Graph video support added

## v1.11.2 - 04/03/2019

### Fixed

- fix issue with checking if value is an array [PR #59](https://github.com/garmeeh/next-seo/pull/59)

## v1.11.1 - 18/02/2019

### Fixed

- property='fb:app_id' should be used instead of name='fb:app_id' [PR #45](https://github.com/garmeeh/next-seo/pull/45)

## v1.11.0 - 17/02/2019

### Added

- Support for Corporate Contact JSON-LD [PR #40](https://github.com/garmeeh/next-seo/pull/40)

## v1.10.1 - 13/02/2019

### Added

- Added Next 8.0.0 to `peerDependencies`

## v1.10.0 - 26/01/2019

### Added

- Added `dangerouslySetAllPagesToNoIndex` [PR #37](https://github.com/garmeeh/next-seo/pull/37)

### Fixed

- Closed [#36](https://github.com/garmeeh/next-seo/issues/36) by adding `dangerouslySetAllPagesToNoIndex` to allow for the desired behaviour.

## v1.9.0 - 16/01/2019

### Changed

- Project now uses `babel@7` thanks to [PR #31](https://github.com/garmeeh/next-seo/pull/31), releasing under a minor version in case of any side effects.
- Documentation was overhauled [PR #35](https://github.com/garmeeh/next-seo/pull/35)

## v1.8.0 - 04/01/2019

### Added

- Support facebook meta (fb:app_id) to enable Facebook Insights [PR #34](https://github.com/garmeeh/next-seo/pull/34)

## v1.7.0 - 28-12-2018

### Added

- Support for Breadcrumb JSON-LD [PR #30](https://github.com/garmeeh/next-seo/pull/30)

## v1.6.0 - 24-12-2018

### Added

- Support for Local Business JSON-LD [PR #26](https://github.com/garmeeh/next-seo/pull/26)

## v1.5.0 - 23-12-2018

### Added

- Support for Logo JSON-LD [PR #25](https://github.com/garmeeh/next-seo/pull/25)

## v1.4.0 - 22-12-2018

### Added

- Support for Open Graph: Profile, Book and Article [PR #22](https://github.com/garmeeh/next-seo/pull/22)
- [all-contributors-cli](https://www.npmjs.com/package/all-contributors-cli)

## v1.3.0 - 18-12-2018

### Added

- Social Profile JSON-LD [More Info](https://developers.google.com/search/docs/data-types/social-profile)
  - Closes issue [#20](https://github.com/garmeeh/next-seo/issues/20)

## v1.2.0 - 09-09-2018

### Added

- Product JSON-LD [More Info](https://developers.google.com/search/docs/data-types/product)
- Run Jest tests on Travis

### Fixed

- Duplicate locale tags being returned from buildTags function
- Updated tests to better check for regressions
- Snapshot tests not running 100% correctly

## v1.1.2 - 03-08-2018

### Added

- Cypress tests covering all existing functionality

### Fixed

- Fixed missing Open Graph `site_name` tag
- Fixed Open Graph default image width's and height's not being associated with correct images all of the time

## v1.1.1 - 31-08-2018

### Fixed

- Updated README to remove canonical url parameter from default configuration

## v1.1.0 - 27-08-2018

### Added

- Title template _by_ [erick B](https://github.com/erickeno) via [#6](https://github.com/garmeeh/next-seo/pull/6)
- Title template documentation

### Fixed

- Some typos in documentation
- Improved documentation a little bit

## v1.0.2 - 24-08-2018

### Added

- Added Changelog

### Fixed

- peerDependencies: next, reactdom _by_ [@JeromeFitz](https://github.com/JeromeFitz) via [#3](https://github.com/garmeeh/next-seo/pull/3).
