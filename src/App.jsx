import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Filter from './components/Filter'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const initialMovies = [
  {
    title: 'Inception',
    description: 'A thief who steals dreams enters a mission that could change humanity.',
    posterURL: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    rating: 8.8,
    trailerURL: 'https://www.youtube.com/embed/YoHD9XEInc0?si=E6W18sLZbZpdM_g2',
  },
  {
    title: 'The Dark Knight',
    description: 'Batman faces the Joker in an epic battle for Gotham.',
    posterURL: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    rating: 9.0,
    trailerURL: 'https://www.youtube.com/embed/EXeTwQWrcwY?si=Zs-X9ziW-4f1UwTa',
  },
  {
    title: 'Stranger Things',
    description: 'A group of friends uncovers supernatural events in a small town.',
    posterURL: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    rating: 8.7,
    trailerURL: 'https://www.youtube.com/embed/b9EkMc79ZSU?si=HY6uQ4D2wPoGqviS',
  },
  {
    title: 'Avatar',
    description: 'A paraplegic marine joins the fight for Pandora and its mystical world.',
    posterURL: 'https://images.unsplash.com/photo-1524989948546-a8d9fbb3b75f?auto=format&fit=crop&w=800&q=80',
    rating: 7.9,
    trailerURL: 'https://www.youtube.com/embed/5PSNL1qE6VY?si=HfLK4vTQz9k0A3TW',
  },
]

function HomePage({ movies, setMovies }) {
  const [titleFilter, setTitleFilter] = useState('')
  const [minRating, setMinRating] = useState(0)

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 0,
    trailerURL: '',
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

    if (!newMovie.title || !newMovie.description || !newMovie.posterURL || !newMovie.trailerURL) {
      alert('Please fill in the title, description, poster URL, and trailer URL.')
      return
    }

    setMovies((prev) => [
      {
        ...newMovie,
        rating: Number(newMovie.rating) || 0,
        id: slugify(newMovie.title),
      },
      ...prev,
    ])

    setNewMovie({
      title: '',
      description: '',
      posterURL: '',
      rating: 0,
      trailerURL: '',
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
            type="url"
            name="trailerURL"
            placeholder="Trailer embed URL"
            value={newMovie.trailerURL}
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

export default function App() {
  const [movies, setMovies] = useState(initialMovies)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage movies={movies} setMovies={setMovies} />} />
        <Route path="/movie/:movieId" element={<MovieDetails movies={movies} />} />
      </Routes>
    </BrowserRouter>
  )
}
