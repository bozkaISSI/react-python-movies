import MovieListItem from "./MovieListItem";
import { toast } from "react-toastify";

export default function MoviesList({
  movies,
  onDeleteMovie,
  onEditMovie,
  openMovieForm,
}) {
  const handleDeleteMovie = (movie) => {
    onDeleteMovie(movie);
    toast.success(`Movie "${movie.title}" deleted successfully!`);
  };

  const handleEdit = (movie) => {
    onEditMovie(movie);
    openMovieForm();
  };

  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-item">
            <MovieListItem
              movie={movie}
              onDelete={() => handleDeleteMovie(movie)}
              onEdit={() => handleEdit(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
