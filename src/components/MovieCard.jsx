import { Link } from 'react-router-dom'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${slugify(movie.title)}`} className="movie-link">
      <article className="movie-card">
        <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <div className="movie-header">
            <h3>{movie.title}</h3>
            <span className="movie-rating">⭐ {movie.rating}</span>
          </div>
          <p>{movie.description}</p>
        </div>
      </article>
    </Link>
  )
}
