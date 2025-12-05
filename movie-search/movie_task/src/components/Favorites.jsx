import MovieCard from './MovieCard'

function Favorites({ favorites, onRemoveFavorite, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="text-6xl mb-4">⭐</div>
        <p className="text-gray-400 text-xl mb-2">No favorites yet!</p>
        <p className="text-gray-500">Start searching and add movies to your favorites list.</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        Your Favorite Movies ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((movie, index) => {
          const movieId = movie.id || movie.imdbID
          return (
            <div
              key={movieId}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-scale-in"
            >
              <MovieCard
                movie={movie}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite(movieId)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Favorites

