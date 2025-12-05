import { createContext, useContext, useReducer, useEffect } from 'react'
import { getFavorites, saveFavorites } from '../utils/localStorage'
import { searchMovies, getPopularSuggestions } from '../services/movieApi'

const MovieContext = createContext()

const initialState = {
  movies: [],
  favorites: [],
  loading: false,
  error: null,
  isShowingSuggestions: true,
  isInitialLoad: true
}

function movieReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_MOVIES':
      return { ...state, movies: action.payload }
    case 'SET_SUGGESTIONS_MODE':
      return { ...state, isShowingSuggestions: action.payload }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload }
    case 'TOGGLE_FAVORITE':
      const movieId = action.payload.id || action.payload.imdbID
      const isFavorite = state.favorites.some(fav => (fav.id || fav.imdbID) === movieId)
      
      if (isFavorite) {
        return {
          ...state,
          favorites: state.favorites.filter(fav => (fav.id || fav.imdbID) !== movieId)
        }
      } else {
        const movieToAdd = {
          ...action.payload,
          id: action.payload.id || action.payload.imdbID,
          imdbID: action.payload.imdbID || action.payload.id
        }
        return {
          ...state,
          favorites: [...state.favorites, movieToAdd]
        }
      }
    case 'INITIAL_LOAD_COMPLETE':
      return { ...state, isInitialLoad: false }
    default:
      return state
  }
}

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState)

  const loadPopularSuggestions = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUGGESTIONS_MODE', payload: true })
    
    try {
      const suggestions = await getPopularSuggestions(12)
      dispatch({ type: 'SET_MOVIES', payload: suggestions })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      dispatch({ type: 'SET_MOVIES', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = getFavorites()
    if (savedFavorites && Array.isArray(savedFavorites)) {
      const normalizedFavorites = savedFavorites.map(fav => ({
        ...fav,
        id: fav.id || fav.imdbID,
        imdbID: fav.imdbID || fav.id
      }))
      dispatch({ type: 'SET_FAVORITES', payload: normalizedFavorites })
    }
    dispatch({ type: 'INITIAL_LOAD_COMPLETE' })
    loadPopularSuggestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    if (!state.isInitialLoad) {
      const favoritesToSave = state.favorites.map(fav => ({
        ...fav,
        id: fav.id || fav.imdbID,
        imdbID: fav.imdbID || fav.id
      }))
      saveFavorites(favoritesToSave)
    }
  }, [state.favorites, state.isInitialLoad])

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      loadPopularSuggestions()
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_SUGGESTIONS_MODE', payload: false })

    try {
      const data = await searchMovies(searchTerm)
      dispatch({ type: 'SET_MOVIES', payload: data.results || data.Search || [] })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      dispatch({ type: 'SET_MOVIES', payload: [] })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const toggleFavorite = (movie) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: movie })
  }

  const isFavorite = (movieId) => {
    return state.favorites.some(fav => (fav.id || fav.imdbID) === movieId)
  }

  const value = {
    ...state,
    loadPopularSuggestions,
    handleSearch,
    toggleFavorite,
    isFavorite
  }

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}

export function useMovie() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error('useMovie must be used within MovieProvider')
  }
  return context
}

