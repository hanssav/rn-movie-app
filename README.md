# React Native Expo Boilerplate Setup

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

(Expo Router + NativeWind + TailwindCSS)

## 1. Create a project folder

```
mkdir rn-folder
```

## 2. Initialize a new Expo project

```
npx create-expo-app@latest ./
```

## 3. Reset the project template

```
npm run reset-project
```

If prompted:

```
Do you want to move existing files to /app-example instead of deleting them? (Y/n): n
```

---

# 4. Styling Configuration

## 4.1 Install required dependencies

```
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

## 4.2 Initialize Tailwind CSS

```
npx tailwindcss init
```

## 4.3 Reference documentation

NativeWind setup guide:  
https://www.nativewind.dev/docs/getting-started/installation

## 4.4 Create a `global.css` file

Insert the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4.5 Create a `babel.config.js` file

Copy the configuration as described in the NativeWind documentation.

## 4.6 Customize Metro configuration

```
npx expo customize metro.config.js
```

## 4.7 Import `global.css` inside `app/_layout.tsx`

```tsx
import './global.css';
```

## 4.8 Create a `nativewind-env.d.ts` file

Insert:

```ts
/// <reference types="nativewind/types" />
```

## 4.9 Update the input path inside `metro.config.js` (example)

```js
module.exports = withNativeWind(config, { input: './app/globals.css' });
```

---

# 5. Clear cache and restart the project

```
npx expo start --clear
```

---

# Setup Examples

## File: `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include all files that may contain Tailwind/NativeWind classes.
  // Expo Router projects typically use the `app/` directory, so include it.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## File: `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## File: `metro.config.js`

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

---

# Start the project

```
npx expo start
```

Official documentation:  
https://docs.expo.dev/get-started/start-developing

Example movie project:  
https://github.com/adrianhajdin/react-native-movie-app
