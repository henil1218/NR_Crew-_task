# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: API Key (Already Configured!)

The app is already configured with an OMDB API key (`76338e2e`). The API is ready to use!

If you want to use your own API key:
- Get a free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
- Update `src/services/movieApi.js` with your key
- Or set `VITE_OMDB_API_KEY` in a `.env` file

## Step 3: Run the App

```bash
npm run dev
```

Open your browser to `http://localhost:5173` and start searching for movies! 🎬

## Troubleshooting

- **No movies showing?** Check your internet connection and try a different search term
- **API errors?** The OMDB API has rate limits. If you hit the limit, wait a moment and try again
- **Build errors?** Run `npm install` again to ensure all dependencies are installed
- **CORS errors?** If you encounter CORS issues, you may need to use a proxy or get your own API key

