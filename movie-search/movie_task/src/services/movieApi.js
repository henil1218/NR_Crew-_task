// Movie API Service using OMDB API
// API Key: 76338e2e
// API Documentation: http://www.omdbapi.com/

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '76338e2e'
const BASE_URL = 'https://www.omdbapi.com'

// Popular movie titles for suggestions (changes on each refresh)
const POPULAR_MOVIES = [
  'The Dark Knight', 'Inception', 'Pulp Fiction', 'The Godfather', 'Fight Club',
  'The Matrix', 'Interstellar', 'The Shawshank Redemption', 'Forrest Gump', 'Titanic',
  'Avatar', 'Avengers: Endgame', 'The Lord of the Rings', 'Star Wars', 'Jurassic Park',
  'Spider-Man', 'Iron Man', 'Black Panther', 'Wonder Woman', 'Joker',
  'Parasite', '1917', 'Once Upon a Time in Hollywood', 'The Irishman', 'Joker',
  'Dune', 'No Time to Die', 'Top Gun: Maverick', 'Everything Everywhere All at Once', 'The Batman',
  'Spider-Man: No Way Home', 'Doctor Strange', 'Thor: Love and Thunder', 'Black Widow', 'Shang-Chi',
  'Eternals', 'Venom', 'Fast & Furious', 'Mission: Impossible', 'John Wick',
  'Mad Max: Fury Road', 'Blade Runner 2049', 'Arrival', 'Ex Machina', 'Her',
  'The Grand Budapest Hotel', 'Birdman', 'Whiplash', 'La La Land', 'Moonlight'
]

export const searchMovies = async (query) => {
  if (!query.trim()) {
    return { Search: [] }
  }

  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    )

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    
    // OMDB returns { Search: [...], Response: "True/False" }
    if (data.Response === 'False') {
      return { Search: [] }
    }
    
    // Transform OMDB response to match expected structure
    // We'll also fetch detailed info for each movie to get more data
    if (data.Search && data.Search.length > 0) {
      // Fetch detailed info for first 10 movies (to avoid too many requests)
      const detailedMovies = await Promise.all(
        data.Search.slice(0, 10).map(async (movie) => {
          try {
            const detailResponse = await fetch(
              `${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
            )
            if (detailResponse.ok) {
              const detailData = await detailResponse.json()
              return {
                ...movie,
                ...detailData,
                // Map OMDB fields to expected structure
                title: detailData.Title || movie.Title,
                overview: detailData.Plot || '',
                poster_path: detailData.Poster && detailData.Poster !== 'N/A' ? detailData.Poster : null,
                vote_average: detailData.imdbRating && detailData.imdbRating !== 'N/A' 
                  ? parseFloat(detailData.imdbRating) 
                  : null,
                release_date: detailData.Released && detailData.Released !== 'N/A' 
                  ? detailData.Released 
                  : movie.Year,
                year: detailData.Year || movie.Year,
                id: movie.imdbID,
                imdbID: movie.imdbID
              }
            }
          } catch (err) {
            console.error(`Error fetching details for ${movie.imdbID}:`, err)
          }
          // Fallback to basic movie data
          return {
            ...movie,
            title: movie.Title,
            poster_path: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null,
            year: movie.Year,
            id: movie.imdbID,
            imdbID: movie.imdbID
          }
        })
      )
      
      return { results: detailedMovies, Search: detailedMovies }
    }
    
    return { results: [], Search: [] }
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

// Get random popular movie suggestions
export const getPopularSuggestions = async (count = 12) => {
  try {
    // Shuffle and select random movies for variety on each refresh
    const shuffled = [...POPULAR_MOVIES].sort(() => Math.random() - 0.5)
    const selectedMovies = shuffled.slice(0, count)
    
    // Fetch movies by title
    const moviePromises = selectedMovies.map(async (title) => {
      try {
        const response = await fetch(
          `${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=movie&plot=full`
        )
        
        if (!response.ok) {
          return null
        }
        
        const data = await response.json()
        
        if (data.Response === 'False' || !data.imdbID) {
          return null
        }
        
        // Transform to match expected structure
        return {
          ...data,
          title: data.Title,
          overview: data.Plot || '',
          poster_path: data.Poster && data.Poster !== 'N/A' ? data.Poster : null,
          vote_average: data.imdbRating && data.imdbRating !== 'N/A' 
            ? parseFloat(data.imdbRating) 
            : null,
          release_date: data.Released && data.Released !== 'N/A' ? data.Released : data.Year,
          year: data.Year,
          id: data.imdbID,
          imdbID: data.imdbID
        }
      } catch (err) {
        console.error(`Error fetching movie ${title}:`, err)
        return null
      }
    })
    
    const results = await Promise.all(moviePromises)
    // Filter out null results
    return results.filter(movie => movie !== null)
  } catch (error) {
    console.error('Error fetching popular suggestions:', error)
    return []
  }
}

