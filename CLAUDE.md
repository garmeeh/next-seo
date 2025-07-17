# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next SEO is a plugin that makes managing SEO easier in Next.js projects. It's built with TypeScript and provides components for structured data (JSON-LD) and SEO management.

## Development Commands

### Installation

```bash
pnpm install
```

### Build & Development

```bash
pnpm dev          # Watch mode with tsup
pnpm build        # Build for production
```

### Code Quality

```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format with Prettier
pnpm typecheck    # Type checking with TypeScript
```

### Testing

```bash
pnpm test         # Run typecheck + lint only
pnpm test:unit    # Run unit tests with Vitest
pnpm test:unit:watch  # Watch mode for unit tests
pnpm test:e2e     # Run E2E tests with Playwright
pnpm test:e2e:ui  # Run E2E tests with UI
pnpm coverage     # Generate coverage report
```

### Example App

```bash
pnpm example:dev    # Run example app at localhost:3001
pnpm example:build  # Build example app
pnpm example:start  # Start example app
```

### Utilities

```bash
pnpm clean        # Clean build artifacts
```

## Project Architecture

### Core Structure

- **`/src`** - Library source code
  - **`/core`** - Core components like `JsonLdScript`
  - **`/types`** - TypeScript type definitions
  - **`/utils`** - Utility functions like `stringify`
- **`/examples/app-router-showcase`** - Example Next.js app for testing
- **`/tests`** - Test files
  - **`/unit`** - Unit tests (Vitest)
  - **`/e2e`** - E2E tests (Playwright)

### Build Configuration

- **tsup** - For building the library (see `tsup.config.ts`)
- Outputs both CommonJS and ESM formats
- Path alias: `~` maps to `./src`

### Testing Setup

- **Vitest** - Unit testing with React Testing Library
- **Playwright** - E2E testing running against example app on port 3001
- Tests use `~` alias for imports

### Key Dependencies

- Requires Next.js >=13.4.0 and React >=18.2.0 as peer dependencies
- Uses Husky for git hooks with lint-staged
- Commitlint for conventional commits

## Development Notes

1. All library code is in `/src` directory
2. The project uses pnpm workspaces with the example app
3. When developing, the example app auto-starts on port 3001 for E2E tests
4. Lint and format are automatically run on staged files via Husky
5. The library exports both CommonJS and ESM formats with TypeScript definitions
