# Next.js + Capacitor Monorepo

This repository bundles a mobile-targeted Next.js app (apps/mobile) into thin Capacitor shells for Android and iOS. A separate web app (apps/web) may exist for desktop/browser use, but native platforms load apps/mobile/out.

## Structure
- apps/mobile: Next.js 15 App Router, static export used by native shells
- apps/web (optional): Next.js site for browser (not required for native)
- packages/ui: shared React UI (shadcn-style) used by both apps
- android: Native Android (Capacitor), loads apps/mobile/out
- ios: Native iOS (Capacitor), loads apps/mobile/out

## Prerequisites
- Node.js LTS and npm
- Android Studio + SDK + JDK 17 (Temurin)
- Xcode (for iOS) and CocoaPods

## Scripts (mobile-first)
- Develop mobile web (Next dev server)
  npm run dev:mobile

- Build mobile (writes to apps/mobile/out)
  npm run build:mobile

- Sync to Android only (copies apps/mobile/out and updates plugins)
  npm run mobile:sync:android

- Sync to iOS only
  npm run mobile:sync:ios

- Open native projects
  Android: npm run android
  iOS: npm run ios

## Typical native workflow
1) Build the mobile bundle
   npm run build:mobile

2) Sync to your target platform
   npm run mobile:sync:android
   # or
   npm run mobile:sync:ios

3) Open and run in the IDE
   npm run android
   # or
   npm run ios

Notes
- Static export constraints: output: 'export' and images.unoptimized are enabled; no server-only features (API routes, server actions).
- Capacitor config webDir points to apps/mobile/out.
- For live reload during development, run `npm run dev:mobile` and start the native app with Capacitor live reload flags (`npx cap run [android|ios] -l --external`) using your LAN IP.
