<div align="center">

# 🎬 RN Movie App

### A Premium Feature-Rich Movie Discovery Platform

[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/v5)
[![Lucide](https://img.shields.io/badge/Lucide-FDFDFD?style=for-the-badge&logo=lucide&logoColor=black)](https://lucide.dev/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [App Interface](#-app-interface)

</div>

---

## 📖 Overview

RN Movie App is a comprehensive movie discovery platform built with React Native and Expo. Designed with a premium aesthetic, it offers a seamless experience for exploring the latest blockbusters, searching through an extensive database (TMDB), and managing personal favorites. Built with the latest native technologies, it ensures high performance, accessibility, and a stunning user interface.

## ✨ Features

### 🎬 Movie Discovery & Exploration

- **Dynamic Hero Carousel** - Explore trending movies with vibrant, high-quality carousels.
- **Categorized Browsing** - Discover movies through Popular, Top Rated, and Latest release logic.
- **Infinite Discovery** - Seamlessly scroll through hundreds of movies with automated pagination.

### 🔍 Advanced Search & Detail

- **Real-time Search** - Instant, debounced search results as you type.
- **Rich Media Integration** - Watch high-definition trailers via YouTube iframe directly in-app.
- **Comprehensive Metadata** - Full access to synopsis, ratings, cast highlights, and release details.

### 👤 User Profile & Personalization

- **Favorites Management** - Save and organize your must-watch movies in a dedicated list.
- **Modern User Hub** - Track your watch stats and manage account information with ease.
- **Appearance Control** - Toggle between premium Dark and Light modes for optimized viewing.

### 🎨 UI/UX Excellence

- **Responsive Layout** - Fully optimized for iOS, Android, and varying screen sizes.
- **Glassmorphic Design** - Modern blur effects, smooth shadows, and premium gradients.
- **Optimistic Interactions** - Instant visual feedback on user actions for a lag-free feel.

## 🛠 Tech Stack

### Mobile Framework

<div align="left">

| Technology                                                                                                    | Description                           | Version  |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------ | :------- |
| ![Expo](https://img.shields.io/badge/Expo-000000?style=flat&logo=expo&logoColor=white)                        | Robust universal React platform       | ^54.0.0  |
| ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)       | Core mobile cross-platform framework  | 0.81.5   |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)      | Statically typed JavaScript           | ~5.9.2   |

</div>

### Styling & UI Components

<div align="left">

| Technology                                                                                                       | Description                         | Version |
| :--------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :------ |
| ![NativeWind](https://img.shields.io/badge/NativeWind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)        | Utility-first CSS for native apps   | ^4.2.1  |
| ![Lucide](https://img.shields.io/badge/Lucide-FDFDFD?style=flat&logo=lucide&logoColor=black)                     | Professional consistent icon set    | ^0.545.0|
| ![RN Reusables](https://img.shields.io/badge/RN_Reusables-000000?style=flat&logo=react&logoColor=white)          | Accessible UI foundation components | Latest  |

</div>

### Data & Performance

<div align="left">

| Technology                                                                                                     | Description                         | Version |
| :------------------------------------------------------------------------------------------------------------- | :---------------------------------- | :------ |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white)    | Advanced server state management    | ^5.90.6 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                      | Promise-based network client        | ^1.13.1 |

</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- [Expo Go](https://expo.dev/go) installed on your physical device

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hanssav/rn-movie-app
   cd rn-movie-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Launch the App**

   Scan the QR code with Expo Go or press `i`/`a` for local simulators.

## 🎨 App Interface

### Home Discovery
<div align="center">
  <img src="assets/readme/home.png" alt="Home Screen" width="70%">
</div>

### Search Discovery
<div align="center">
  <img src="assets/readme/search-moview.png" alt="Search Screen" width="70%">
</div>

### Movie Detailed View
<div align="center">
  <img src="assets/readme/detail-movie.png" alt="Detail Screen" width="70%">
</div>

### Trailer Playback
<div align="center">
  <img src="assets/readme/trailer.png" alt="Trailer Screen" width="70%">
</div>

### My Favorites
<div align="center">
  <img src="assets/readme/favorite.png" alt="Favorite Screen" width="70%">
</div>

### User Profile
<div align="center">
  <img src="assets/readme/profile.png" alt="Profile Screen" width="70%">
</div>

## 🏗 Project Structure

```
app/                       # Expo Router file-based routing
├── (tabs)/                # Primary tab navigation (Home, Search, Profile)
├── movie/                 # Dynamic movie detail routes
└── _layout.tsx            # Global providers & layout configuration
components/                # Application component library
├── icons/                 # Custom optimized SVG components
├── screen/                # Feature-specific screen modules
└── ui/                    # Reusable atomic UI primitives
hooks/                     # Custom data fetching & logic hooks
lib/                       # Utilities, global types, and constants
services/                  # TMDB API service integration
assets/                    # Media assets, fonts, and screenshots
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Handi Irawan**

---

<div align="center">
  <p>Built with ❤️ using Expo and NativeWind</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
