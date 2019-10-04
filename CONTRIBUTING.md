# Contributing Guide

Thanks for wanting to contribute to next-seo 😁

We are open to all and any contributions. If you are going to undertake quite a large feature or refactor, maybe open an issue first to start a discussion with the maintainers.

## Project Set Up

1. Pull the repo and install the dependencies:

```
git clone git@github.com:garmeeh/next-seo.git
yarn install
```

2. Make your modifications / additions
3. Write / Update Tests. End to end tests are required for all changes and new features.
4. Open pull request

## Working with next-seo

All of the library code is located in the `src` directory.

The `e2e` directory contains a fully working Next.js app. This is used in the end to end tests. To run this app first you need to build next-seo. You can then run this app like a normal Next app by running `yarn build` (this builds the local next-seo) followed by `yarn e2e:dev`. You can also run it in a production build by running `yarn e2e:build` followed by `yarn e2e:build`.

To run Cypress run `yarn build` (this builds the local next-seo) followed by `yarn test:e2e`. Or to run all of the end to end tests headless run `yarn test:e2e:ci`

To run Jest tests run `yarn test`.

## Being added as Contributor

This project is using https://allcontributors.org/ so you will be added for your contribution.
