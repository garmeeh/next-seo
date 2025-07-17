# Alpha Publishing Guide

This guide explains how to safely publish alpha versions of next-seo without affecting production users.

## Quick Start

```bash
# 1. Ensure version in package.json is alpha (e.g., 7.0.0-alpha.0)
# 2. Build the package
pnpm build

# 3. Run tests
pnpm test

# 4. Publish with alpha tag (IMPORTANT: Always use --tag alpha)
npm publish --tag alpha
```

## Version Management

- Alpha versions: `7.0.0-alpha.0`, `7.0.0-alpha.1`, etc.
- Beta versions: `7.0.0-beta.0`, `7.0.0-beta.1`, etc.
- Release candidates: `7.0.0-rc.0`, `7.0.0-rc.1`, etc.

To bump alpha version:

1. Update version in package.json
2. Update prepublishOnly script message to match

## Testing Alpha Versions

### In Other Projects

```bash
# Install alpha version
npm install next-seo@alpha

# Or specific version
npm install next-seo@7.0.0-alpha.0
```

### Local Testing

```bash
# In next-seo directory
npm link

# In test project
npm link next-seo
```

## Safety Checklist

- [ ] Version ends with `-alpha.X`
- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes
- [ ] Using `npm publish --tag alpha` (NOT just `npm publish`)
- [ ] Never publish without the `--tag alpha` flag

## Publishing Final Release

When ready to publish the stable version:

```bash
# 1. Update version to 7.0.0 (remove alpha)
# 2. Update prepublishOnly script
# 3. Build and test
pnpm build && pnpm test

# 4. Publish as latest
npm publish
# OR explicitly
npm publish --tag latest
```

## Viewing Published Versions

```bash
# See all versions
npm view next-seo versions

# See dist-tags
npm view next-seo dist-tags
```
