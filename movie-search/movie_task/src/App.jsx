import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import Home from './pages/Home'
import FavoritesPage from './pages/FavoritesPage'

function Navigation() {
  const location = useLocation()
  const isFavorites = location.pathname === '/favorites'

  return (
    <div className="flex justify-center mb-6 gap-4">
      <Link
        to="/"
        className={`button-primary ${!isFavorites ? 'opacity-100' : 'opacity-70'}`}
      >
        🔍 Search Movies
      </Link>
      <Link
        to="/favorites"
        className={`button-primary ${isFavorites ? 'opacity-100' : 'opacity-70'}`}
      >
        ⭐ View Favorites
      </Link>
    </div>
  )
}

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8 animate-fade-in">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                🎬 Movie Search App
              </h1>
              <p className="text-gray-400 text-lg">Discover and save your favorite movies</p>
            </header>

            <Navigation />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App

