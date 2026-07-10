# The Book Nook

A React Native mobile app for a small independent bookstore. Customers can browse and search inventory, view book details, manage a shopping cart, and complete a mock checkout.

Built as part of the Bumpa engineering assessment using mock APIs (no backend required).

## Demo

- **Video walkthrough:** [Loom demo](https://www.loom.com/share/09dbd6ebcea941a5a0859791b6db3326)
- **Release APK:** [Download TheBookNook.apk](https://drive.google.com/file/d/1Q9HcEoBwxQ3e7CqLaJdBht64glo6BCrc/view?usp=sharing)

## Features

- **Browse** — Paginated book list with lazy-loaded cover images and infinite scroll
- **Search** — Debounced search by title or author
- **Book Details** — Fetches a single book on mount with loading, error, and retry states
- **Cart** — Add/remove items, adjust quantities, live total price, persisted across sessions
- **Checkout** — Order summary and mock place-order flow
- **Internationalization** — English and Spanish with device-locale detection and in-app language switcher
- **Add-to-cart feedback** — Header cart icon jiggle + pulse ring (Reanimated)
- **Branding** — Custom app icon and splash screen

## Tech stack

| Area          | Choice                                         |
| ------------- | ---------------------------------------------- |
| Framework     | React Native 0.86, TypeScript                  |
| Navigation    | React Navigation 7 (static config)             |
| State         | Zustand + AsyncStorage persistence             |
| Data fetching | Custom hooks with `useEffect` (no React Query) |
| i18n          | i18next + react-i18next                        |
| Animation     | react-native-reanimated                        |
| Icons         | @react-native-vector-icons/ionicons            |
| Splash screen | react-native-bootsplash                        |
| Testing       | Jest + react-test-renderer                     |

## Technical choices

### State management — Zustand

Cart and language preferences use **Zustand** with the `persist` middleware backed by AsyncStorage. This keeps state logic small and colocated without the boilerplate of Context providers or Redux. Cart totals are derived via pure helper functions (`getCartItemCount`, `getCartTotalPrice`) to avoid stale computed state.

### Data fetching — custom hooks

`useBooks` and `useBookDetails` manage loading, error, and success states with `useEffect` and cleanup on unmount. This matches the assessment focus on component lifecycle and keeps the data layer easy to test without hiding side effects behind a library.

The mock API (`src/api/books.api.ts`) simulates network latency (~400 ms) and supports pagination and search filtering over 60 sample books.

### Navigation — static configuration

React Navigation 7's **static API** is used for type-safe routes and a declarative navigator tree. Screen titles are set from within screens via a small `useScreenTitle` hook, since translation hooks cannot run at module-level config time.

### Performance

- **Pagination** — Books load 20 at a time; the list appends on scroll
- **Lazy images** — Cover images use React Native's built-in lazy loading
- **Debounced search** — 300 ms debounce prevents excessive API calls while typing

### Animation

Adding a book to the cart triggers a subtle header cart icon animation (rotation jiggle + expanding ring) using Reanimated shared values. The tab bar cart badge also updates in real time via Zustand subscriptions.

### Testing

45 unit tests cover:

- API layer (pagination, search, not-found)
- `useBooks` and `useBookDetails` hooks
- `BookPrice`, `CartItem`, `SearchInput`, and `LanguageSwitcher` components
- Cart, language, and cart-animation stores
- i18n configuration and navigation setup

Run the suite with:

```sh
npm test
```

## Project structure

```
src/
├── api/              # Mock API + sample book data
├── components/       # Reusable UI (BookPrice, CartItem, SearchInput, …)
├── config/           # i18n setup
├── hooks/            # useBooks, useBookDetails, useScreenTitle
├── locales/          # en.json, es.json
├── navigation/       # Static stack + tab navigators
├── screens/          # Browse, BookDetails, Cart, Checkout
├── store/            # Zustand stores (cart, language, animation)
├── types/            # Shared TypeScript types
└── utils/            # Device language detection
```

Path alias: `@/` maps to `src/` (configured in `babel.config.js` and `jest.config.js`).

## Getting started

### Prerequisites

- [React Native development environment](https://reactnative.dev/docs/set-up-your-environment) (Xcode for iOS, Android Studio for Android)
- Node.js **≥ 22.11**
- CocoaPods (iOS)

### Install and run

```sh
# Install JS dependencies
npm install

# iOS — install CocoaPods (first clone or after native dep changes)
cd ios
bundle install          # first time only
bundle exec pod install
cd ..

# Start Metro
npm start

# Run on a device/simulator (separate terminal)
npm run ios
# or
npm run android
```

## Regenerating assets

```sh
# App icon (iOS + Android)
npm run set-icon

# Splash screen (iOS + Android)
npm run generate-bootsplash
```

Both commands use `assets/app-icon.png` as the source image. Rebuild the native app after regenerating assets.

## Assumptions

- Checkout is a **mock flow** — no real payment processing
- All book data comes from an in-memory mock API
- Supported languages: English (`en`) and Spanish (`es`)
