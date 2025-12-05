const FAVORITES_KEY = 'movie_favorites'

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    if (!favorites) {
      return []
    }
    
    const parsed = JSON.parse(favorites)
    
    // Validate that we got an array
    if (!Array.isArray(parsed)) {
      console.warn('Invalid favorites data in localStorage, resetting...')
      localStorage.removeItem(FAVORITES_KEY)
      return []
    }
    
    // Filter out any invalid entries (missing id/imdbID)
    const validFavorites = parsed.filter(fav => {
      const hasId = fav && (fav.id || fav.imdbID)
      if (!hasId) {
        console.warn('Removing invalid favorite entry:', fav)
      }
      return hasId
    })
    
    return validFavorites
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error)
    // Clear corrupted data
    try {
      localStorage.removeItem(FAVORITES_KEY)
    } catch (e) {
      console.error('Error clearing corrupted localStorage:', e)
    }
    return []
  }
}

export const saveFavorites = (favorites) => {
  try {
    // Validate favorites before saving
    if (!Array.isArray(favorites)) {
      console.error('Attempted to save non-array favorites:', favorites)
      return
    }
    
    // Ensure all favorites have required fields
    const validFavorites = favorites.filter(fav => {
      const hasId = fav && (fav.id || fav.imdbID)
      if (!hasId) {
        console.warn('Skipping favorite without id/imdbID:', fav)
      }
      return hasId
    })
    
    // Save to localStorage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites))
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error)
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Try removing some favorites.')
    }
  }
}

export const clearFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY)
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error)
  }
}

