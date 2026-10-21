import MovieCard from './MovieCard'

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)
      ) : (
        <div className="empty-state">No movies match your filters.</div>
      )}
    </div>
  )
}
