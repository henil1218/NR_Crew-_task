import { useState, useEffect, useRef } from 'react'
import { debounce } from '../utils/debounce'

function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useRef(debounce((value) => {
    if (value.trim()) {
      onSearch(value)
    } else {
      onSearch('')
    }
  }, 500)).current

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
    if (onClear) onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-slide-up">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for movies..."
            className="w-full px-6 py-4 pr-20 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Clear search"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBar

