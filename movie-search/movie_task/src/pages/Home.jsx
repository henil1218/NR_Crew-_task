import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import { useMovie } from '../context/MovieContext'

function Home() {
  const { movies, loading, error, isShowingSuggestions, handleSearch, toggleFavorite, isFavorite, loadPopularSuggestions } = useMovie()

  const handleBackToHome = () => {
    handleSearch('')
    loadPopularSuggestions()
  }

  const handleClearSearch = () => {
    handleBackToHome()
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      
      {!isShowingSuggestions && movies.length > 0 && (
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-gray-300 mb-1">
              🔍 Search Results
            </h2>
            <p className="text-gray-500 text-sm">
              Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleBackToHome}
            className="button-secondary flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>
      )}
      
      {isShowingSuggestions && movies.length > 0 && (
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-300 mb-2">
            🎬 Popular Movie Suggestions
          </h2>
          <p className="text-gray-500 text-sm">
            These suggestions change every time you refresh the page!
          </p>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6 animate-fade-in">
          <p className="font-semibold">Error: {error}</p>
          <p className="text-sm mt-2">Please check your internet connection and try again.</p>
        </div>
      )}

      <MovieGrid 
        movies={movies} 
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </>
  )
}

export default Home

