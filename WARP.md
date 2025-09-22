# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository purpose
- Two Next.js apps: apps/web (browser site) and apps/mobile (mobile-targeted site) exported as static sites and embedded in Capacitor shells for Android and iOS.
- Root uses npm workspaces (apps/*, packages/*). Native projects live at android/ and ios/ and consume the exported web assets from apps/mobile/out.

Common commands
- Develop web
  - npm run -w apps/web dev
- Develop mobile
  - npm run dev:mobile
- Build web (writes to apps/web/out)
  - npm run build:web
- Build mobile (writes to apps/mobile/out)
  - npm run build:mobile
- Lint web
  - npm run -w apps/web lint
- Sync mobile build into native projects (copies apps/mobile/out and updates Capacitor deps)
  - Android only: npm run mobile:sync:android
  - iOS only: npm run mobile:sync:ios
- Open native projects in IDEs
  - Android: npm run android
  - iOS: npm run ios

Notes on tests
- No test runner or test scripts are currently configured in this repo.

High-level architecture
- Web app (apps/web)
  - Next.js 15 with the App Router and TypeScript. Static export at apps/web/out.
- Mobile app (apps/mobile)
  - Next.js 15 configured for static export at apps/mobile/out; transpiles shared package @acme/ui. Tailwind scans ../../packages/ui/src.
- Mobile shells (android/, ios/)
  - Capacitor projects that load apps/mobile/out in a WebView.
  - Capacitor config (capacitor.config.ts) points webDir to apps/mobile/out.
  - Typical workflow: build mobile -> cap sync -> open android/ios.
- Workspaces
  - package.json defines workspaces: ["apps/*", "packages/*"]. Shared UI lives in packages/ui and is imported by both apps.

Important implementation details and gotchas
- Static export constraints
  - With output: "export", server-only features (API routes, server actions, dynamic SSR) aren’t available. Dynamic routes must be fully pre-renderable, and next/image optimization is disabled (unoptimized: true is set).
- Capacitor sync behavior
  - npm run mobile:sync performs a fresh static export followed by npx cap sync to copy assets and update native dependencies.
  - If you change the web output directory or Next export settings, update capacitor.config.ts (webDir) accordingly.
- Capacitor version alignment
  - The repo currently mixes Capacitor v6 in root devDependencies and v7 in apps/native dependencies. Aligning all @capacitor/* packages to the same major (prefer v7 to match @capacitor/core in apps/web) will avoid CLI/runtime mismatches.
- Shared UI package
  - packages/ui exports React components (shadcn-style), consumed by apps/web and apps/mobile. Next transpiles the package (transpilePackages), and Tailwind content globs include ../../packages/ui/src.

Key files
- apps/web/next.config.ts: controls static export and image behavior.
- capacitor.config.ts: maps Capacitor to the static export directory.
- package.json (root): defines workspace and top-level scripts that orchestrate web build and mobile sync/open.
