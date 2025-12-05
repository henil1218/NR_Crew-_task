# 🎬 Movie Search App

A beautiful and modern movie search application built with React, Vite, and Tailwind CSS. Search for movies, view details, and save your favorites!

## Features

- 🔍 **Search Movies**: Search for movies using the OMDB API
- ⭐ **Favorites List**: Save your favorite movies to localStorage
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS and smooth animations
- 📱 **Responsive**: Works perfectly on all device sizes
- ✨ **Smooth Effects**: Hover effects, transitions, and animations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. API Key (Already Configured!)

The app is already configured with an OMDB API key. The API key is set in `src/services/movieApi.js`. If you need to use your own API key, you can:

- Replace the API key in `src/services/movieApi.js`
- Or set the environment variable `VITE_OMDB_API_KEY` in a `.env` file

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
task_2_movie/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Search input component
│   │   ├── MovieCard.jsx      # Individual movie card
│   │   ├── MovieGrid.jsx      # Grid layout for movies
│   │   └── Favorites.jsx      # Favorites list view
│   ├── utils/
│   │   ├── localStorage.js   # localStorage helpers
│   │   └── debounce.js       # Debounce utility
│   ├── services/
│   │   └── movieApi.js       # OMDB API service
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind CSS imports
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **OMDB API**: Open Movie Database API ([omdbapi.com](http://www.omdbapi.com/))
- **localStorage**: Browser storage for favorites

## Features in Detail

### Search Functionality
- Real-time search as you type
- Displays movie posters, titles, ratings, and release dates
- Shows movie overview on hover

### Favorites System
- Click the star icon to add/remove favorites
- Favorites persist in localStorage
- View all favorites in a dedicated view
- Smooth animations when adding/removing

### UI Effects
- Fade-in animations for components
- Scale animations for cards
- Hover effects with image zoom
- Gradient backgrounds
- Smooth transitions throughout

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## License

MIT

