# Contributing to Next SEO

Thank you for your interest in contributing to Next SEO! We are open to all and any contributions. This guide will help you get started.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone git@github.com:your-username/next-seo.git`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Add a changeset: `pnpm changeset`
7. Submit a pull request

## 📦 Development Setup

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 9+ (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone git@github.com:garmeeh/next-seo.git
cd next-seo

# Install dependencies
pnpm install

# Start development (watch mode)
pnpm dev
```

### Available Commands

```bash
pnpm dev          # Watch mode development
pnpm build        # Build the library
pnpm test         # Run type checking and linting
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run E2E tests (requires build first)
pnpm test:sweep   # Run full test suite (CI equivalent)
pnpm lint         # Check linting
pnpm format       # Format code with Prettier
```

## 📝 Adding a Changeset

**Important:** All PRs with code changes require a changeset. This helps us track changes and automatically manage releases.

### What is a changeset?

A changeset is a piece of information about changes made in a branch or commit. It includes:

- What packages changed
- What kind of change it was (major/minor/patch)
- A description of the change for the changelog

### How to add a changeset:

1. After making your changes, run: `pnpm changeset`
2. Select the packages affected (usually just `next-seo`)
3. Choose the type of change:
   - **patch**: Bug fixes, documentation, internal changes (0.0.X)
   - **minor**: New features, non-breaking enhancements (0.X.0)
   - **major**: Breaking changes (X.0.0)
4. Write a brief description of your changes
5. Commit the generated changeset file

### Example:

```bash
$ pnpm changeset
🦋 Which packages would you like to include? › next-seo
🦋 Which packages should have a major bump? › (none)
🦋 Which packages should have a minor bump? › next-seo
🦋 The following packages will be patch bumped:
🦋 next-seo@minor
🦋 Please enter a summary for this change:
📝 Added support for RecipeJsonLd component with full Schema.org compliance
```

We recommend never using patch unless critical security bug

This creates a markdown file in `.changeset/` that will be used to:

- Update the package version
- Generate changelog entries
- Credit you as a contributor

### When is a changeset NOT required?

- Documentation-only changes (README, etc.)
- Changes to GitHub workflows
- Changes to development tooling that don't affect the published package

## 🏗️ Project Guidelines

### For AI-Assisted Development

This project leverages AI coding tools. If you're using tools like Claude or GitHub Copilot:

- Refer to [CLAUDE.md](CLAUDE.md) for project-specific AI guidance
- Refer to [ADDING_NEW_COMPONENTS.md](ADDING_NEW_COMPONENTS.md) for component development

### For Large Features

If you're planning a large feature or refactor:

1. Open an issue first to discuss with maintainers
2. Provide comprehensive context in your issue/PR
3. Break down large changes into smaller, reviewable PRs if possible

## 🧪 Testing Requirements

Before submitting a PR, ensure all tests pass:

```bash
# Quick checks
pnpm test         # Type checking and linting
pnpm test:unit    # Unit tests

# Full validation (what CI runs)
pnpm test:sweep   # Complete test suite
```

## 🔄 Pull Request Process

1. **Fork & Clone**: Fork the repo and clone locally
2. **Branch**: Create a feature branch from `main`
3. **Develop**: Make your changes following our guidelines
4. **Changeset**: Add a changeset describing your changes
5. **Test**: Ensure all tests pass
6. **Push**: Push to your fork
7. **PR**: Open a pull request with a clear description

### PR Guidelines

- Use clear, descriptive titles
- Reference any related issues
- Include examples if adding new features
- Ensure CI passes before requesting review

## ❓ Questions?

- Open a [Discussion](https://github.com/garmeeh/next-seo/discussions) for general questions
- Check existing issues and PRs
- Refer to the [README](./README.md) for usage documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing to Next SEO! Your efforts help make SEO easier for the Next.js community.
