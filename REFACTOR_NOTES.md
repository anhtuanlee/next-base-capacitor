# Next-Capacitor Monorepo - Tech Stack & Architecture

## 🏗️ Architecture Overview

This is a **monorepo** project using **Option 2** - centralized dependency management with a single `package.json` at the root. The project supports both **web** and **mobile** platforms using Next.js and Capacitor.

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **Mobile**: Capacitor 7.4.3 (Android + iOS)
- **State Management**: Zustand 4.5.2
- **Data Fetching**: TanStack Query 5.58.0
- **Authentication**: NextAuth.js 4.24.7
- **UI Components**: Shadcn/ui + Custom components

### Development Tools
- **Package Manager**: npm (workspaces)
- **Linting**: ESLint 9
- **Build Tool**: Next.js built-in
- **Type Checking**: TypeScript
- **CSS Processing**: PostCSS + Autoprefixer

## 📁 Project Structure

```
next-capacitor-mono/
├── 📦 package.json                 # Root dependencies & scripts
├── ⚙️ capacitor.config.ts         # Capacitor configuration
├── 📱 apps/
│   ├── 🌐 web/                    # Web application
│   │   ├── 📦 package.json        # Minimal (scripts only)
│   │   ├── ⚙️ next.config.ts      # Next.js config
│   │   ├── 🎨 tailwind.config.ts  # Tailwind config
│   │   ├── 📝 tsconfig.json       # TypeScript config
│   │   ├── 🎨 components.json     # Shadcn config
│   │   └── 📁 app/                # Next.js App Router
│   │       ├── layout.tsx         # Root layout
│   │       ├── page.tsx           # Home page
│   │       ├── products/page.tsx  # Products page
│   │       ├── settings/page.tsx  # Settings page
│   │       └── api/auth/          # NextAuth API routes
│   └── 📱 mobile/                 # Mobile application
│       ├── 📦 package.json        # Minimal (scripts only)
│       ├── ⚙️ next.config.ts      # Next.js config (export mode)
│       ├── 🎨 tailwind.config.ts  # Tailwind config
│       ├── 📝 tsconfig.json       # TypeScript config
│       ├── 🎨 components.json     # Shadcn config
│       ├── 📁 app/                # Next.js App Router
│       ├── 📁 android/            # Android native project
│       ├── 📁 ios/                # iOS native project
│       └── 📁 out/                # Built web assets
└── 🔧 shared/                     # Shared code (no npm packages)
    ├── 🎨 ui/                     # UI components
    │   ├── index.ts               # Export file
    │   └── src/
    │       ├── components/        # React components
    │       └── lib/               # Utility functions
    ├── 🔐 auth/                   # Authentication
    │   ├── index.ts
    │   └── src/
    │       ├── client.ts          # Auth client
    │       ├── types.ts           # Auth types
    │       └── index.ts
    ├── 🗃️ state/                  # State management
    │   ├── index.ts
    │   └── src/
    │       ├── auth-store.ts      # Zustand store
    │       └── index.ts
    ├── 🔌 providers/              # React providers
    │   ├── index.ts
    │   └── src/
    │       └── index.tsx          # QueryClient provider
    ├── 🌐 services/               # API services
    │   ├── index.ts
    │   └── src/
    │       └── index.ts           # API functions
    ├── 📝 types/                  # TypeScript types
    │   ├── index.ts
    │   └── src/
    │       ├── api.ts             # API types
    │       ├── product.ts         # Product types
    │       └── index.ts
    └── 🛠️ utils/                  # Utility functions
        ├── index.ts
        └── src/
            ├── env.ts             # Environment utils
            ├── logger.ts          # Logging utils
            ├── platform.ts        # Platform detection
            ├── storage.ts         # Storage utils
            └── index.ts
```

## 🔄 Key Changes Made

1. **Dependencies Consolidated**: All dependencies moved to root `package.json`
2. **Packages Removed**: Deleted `packages/*` directory 
3. **Shared Code**: All shared code now lives in `shared/*` directory
4. **Import Paths**: Using `@shared/*` aliases instead of `@acme/*` packages
5. **Next.js Config**: Using `externalDir: true` to allow imports from outside app directories
6. **Native Projects**: Moved `android/` and `ios/` into `apps/mobile/`

## 🚀 How to Use

### Development Commands
```bash
# Install dependencies (run from root only)
npm install

# Development
npm run dev:mobile          # Start mobile dev server
npm run build:web          # Build web app
npm run build:mobile       # Build mobile app

# Mobile development
npm run mobile:sync        # Sync web assets to mobile
npm run android            # Build + sync + open Android
npm run ios                # Build + sync + open iOS
```

### Adding Dependencies
- ✅ **Add to root `package.json`** - All dependencies managed centrally
- ❌ **Don't add to apps/*/package.json** - These are minimal files

### Importing Shared Code
```typescript
// ✅ Correct way
import { Button } from "@shared/ui";
import { useAuthStore } from "@shared/state";
import { AuthClient } from "@shared/auth";

// ❌ Old way (no longer works)
import { Button } from "@acme/ui";
```

## ⚙️ Configuration Details

### TypeScript Path Mapping
Both apps have identical path mapping in `tsconfig.json`:
```json
{
  "paths": {
    "@shared/ui/*": ["../../shared/ui/src/*"],
    "@shared/auth/*": ["../../shared/auth/src/*"],
    "@shared/state/*": ["../../shared/state/src/*"],
    "@shared/providers/*": ["../../shared/providers/src/*"],
    "@shared/services/*": ["../../shared/services/src/*"],
    "@shared/types/*": ["../../shared/types/src/*"],
    "@shared/utils/*": ["../../shared/utils/src/*"]
  }
}
```

### Next.js Configuration
- **Web App**: `externalDir: true` (allows importing from shared/)
- **Mobile App**: `output: "export"` + `externalDir: true` (static export for Capacitor)

### Shadcn/UI Integration
- Components generated into `shared/ui/src/components/`
- Import as `@shared/ui` (not `@/components`)
- Tailwind config includes shared directory

## 🎯 Benefits

- ✅ **Single Source of Truth**: One `package.json` for all dependencies
- ✅ **Clean Architecture**: Shared code in `shared/`, apps in `apps/`
- ✅ **Type Safety**: Full TypeScript support with path mapping
- ✅ **Code Reuse**: Same components work on web and mobile
- ✅ **Easy Maintenance**: No duplicate dependencies or configs
- ✅ **Native Integration**: Android/iOS projects properly organized
- ✅ **Modern Stack**: Next.js 15, TypeScript 5, Tailwind CSS 3

## 🔧 Platform-Specific Features

### Web App (`apps/web/`)
- Next.js App Router with SSR
- NextAuth.js authentication
- API routes for backend functionality
- Full web-optimized experience

### Mobile App (`apps/mobile/`)
- Next.js static export for Capacitor
- Native Android/iOS projects
- Capacitor plugins support
- Mobile-optimized UI with TabBar

## 📋 Migration Status

✅ **Completed:**
- Dependencies consolidated to root
- Packages directory removed
- Import paths updated to `@shared/*`
- Native projects moved to `apps/mobile/`
- TypeScript path mapping configured
- Shadcn integration working
- Build system optimized

🎉 **Ready for Development!**
