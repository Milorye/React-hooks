import { useMemo, useState } from 'react'
import Filter from './components/Filter'
import MovieList from './components/MovieList'

const initialMovies = [
  {
    title: 'Inception',
    description: 'A thief who steals dreams enters a mission that could change humanity.',
    posterURL: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    rating: 8.8,
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in an epic battle for Gotham.',
    posterURL: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    rating: 9.0,
  },
  {
    title: 'Stranger Things',
    description: 'A group of friends uncovers supernatural events in a small town.',
    posterURL: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    rating: 8.7,
  },
  {
    title: 'Avatar',
    description: 'A paraplegic marine joins the fight for Pandora and its mystical world.',
    posterURL: 'https://images.unsplash.com/photo-1524989948546-a8d9fbb3b75f?auto=format&fit=crop&w=800&q=80',
    rating: 7.9,
  },
]

export default function App() {
  const [movies, setMovies] = useState(initialMovies)
  const [titleFilter, setTitleFilter] = useState('')
  const [minRating, setMinRating] = useState(0)

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 0,
  })

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase())
      const matchesRating = movie.rating >= minRating
      return matchesTitle && matchesRating
    })
  }, [movies, titleFilter, minRating])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMovie((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  const handleAddMovie = (e) => {
    e.preventDefault()

    if (!newMovie.title || !newMovie.description || !newMovie.posterURL) {
      alert('Please fill in the title, description, and poster URL.')
      return
    }

    setMovies((prev) => [
      {
        ...newMovie,
        rating: Number(newMovie.rating) || 0,
      },
      ...prev,
    ])

    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: 0,
    })
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow">React hooks checkpoint</p>
          <h1>Movie Vault</h1>
        </div>
      </header>

      <section className="controls">
        <Filter
          title={titleFilter}
          rating={minRating}
          onTitleChange={setTitleFilter}
          onRatingChange={setMinRating}
        />

        <form className="add-movie-form" onSubmit={handleAddMovie}>
          <h2>Add a movie</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newMovie.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newMovie.description}
            onChange={handleInputChange}
          />
          <input
            type="url"
            name="posterURL"
            placeholder="Poster URL"
            value={newMovie.posterURL}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={handleInputChange}
          />
          <button type="submit">Add Movie</button>
        </form>
      </section>

      <main>
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  )
}
