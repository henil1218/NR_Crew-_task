import MovieCard from './MovieCard'

function MovieGrid({ movies, onToggleFavorite, isFavorite }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-gray-400 text-xl">Search for movies to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
      {movies.map((movie, index) => {
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
  )
}

export default MovieGrid

