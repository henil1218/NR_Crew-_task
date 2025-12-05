function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  // Support both OMDB (Poster) and transformed (poster_path) formats
  const imageUrl = movie.poster_path || movie.Poster
    ? (movie.poster_path || movie.Poster)
    : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg card-hover animate-scale-in backdrop-blur-sm border border-gray-700/50">
      <div className="relative group">
        <img
          src={imageUrl}
          alt={movie.title || movie.Title || 'Movie poster'}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm line-clamp-3">{movie.overview || movie.Plot || 'No description available'}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(movie)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
            isFavorite
              ? 'bg-yellow-500 text-yellow-900'
              : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-6 h-6"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {movie.title || movie.Title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>
              {movie.vote_average 
                ? movie.vote_average.toFixed(1) 
                : (movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A')}
            </span>
          </div>
          <span className="text-gray-500">
            {movie.year || movie.Year || (movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

