export default function MovieCard({ movie }) {
  return (
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
  )
}
