import MovieListItem from "./MovieListItem";
import { toast } from "react-toastify";

export default function MoviesList({ movies, onDeleteMovie }) {
  const handleDeleteMovie = (movie) => {
    onDeleteMovie(movie);
    toast.success(`Movie "${movie.title}" deleted successfully!`);
  };

  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-item">
            <MovieListItem movie={movie} onDelete={() => handleDeleteMovie(movie)} />
          </div>
        ))}
      </div>
    </div>
  );
}
