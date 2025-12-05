import Favorites from '../components/Favorites'
import { useMovie } from '../context/MovieContext'

function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useMovie()

  return (
    <Favorites 
      favorites={favorites} 
      onRemoveFavorite={toggleFavorite}
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
    />
  )
}

export default FavoritesPage

