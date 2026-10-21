import { Link, useParams } from 'react-router-dom'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export default function MovieDetails({ movies }) {
  const { movieId } = useParams()
  const movie = movies.find((item) => slugify(item.title) === movieId)

  if (!movie) {
    return (
      <div className="app">
        <div className="movie-detail-page">
          <Link to="/" className="back-link">← Back to home</Link>
          <h2>Movie not found.</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="movie-detail-page">
        <Link to="/" className="back-link">← Back to home</Link>

        <div className="detail-layout">
          <img src={movie.posterURL} alt={movie.title} />

          <div className="detail-info">
            <h2>{movie.title}</h2>
            <div className="detail-meta">
              <span>⭐ {movie.rating}</span>
            </div>
            <p className="detail-description">{movie.description}</p>

            <div className="trailer-container">
              <iframe
                src={movie.trailerURL}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
