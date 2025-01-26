import MovieListItem from "./MovieListItem";

export default function MoviesList({ movies, onDeleteMovie }) {
  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-item">
            <MovieListItem movie={movie} onDelete={() => onDeleteMovie(movie)} />
          </div>
        ))}
      </div>
    </div>
  );
}
