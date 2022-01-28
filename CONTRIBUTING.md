# Contributing Guide

Thanks for wanting to contribute to next-seo 😁

We are open to all and any contributions. If you are going to undertake quite a large feature or refactor, maybe open an issue first to start a discussion with the maintainers.

## Project Set Up

1. Pull the repo and install the dependencies:

```
git clone git@github.com:garmeeh/next-seo.git
yarn
```

2. Make your modifications / additions
3. Update / Add Documentation
4. Write / Update Tests. End to end tests are required for all changes and new features.
5. Open pull request with overview off changes

## Working with next-seo

All of the library code is located in the `src` directory.

First compile all your changes to `nex-seo` made in the `src` directory:

```
yarn build
```

You can now run the Next.js app in dev mode:

```
yarn e2eL:dev
```

Or do a production build:

```
yarn e2e:build
yarn e2e:start
```

Remember, every time you make a change to the library you will need to re-run `yarn build`

To run Cypress:

First compile all your changes to `nex-seo` made in the `src` directory:

```
yarn build
```

You can now run the Next.js app in dev mode and open Cypress:

```
yarn test:e2e
```

Or if you would like you run all the tests headless via:

```
yarn test:e2e:ci
```

Remember, every time you make a change to the library you will need to re-run `yarn build`

Jest:

To run Jest tests run `yarn test`
