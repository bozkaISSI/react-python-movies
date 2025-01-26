import { FaTrashAlt } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";

export default function MovieListItem({ movie, onDelete }) {
  return (
    <div className="main-container">
      <div className="movie">
        <PiFilmSlateFill />
        <div>
          <strong>{movie.title}</strong> <span>({movie.year})</span> directed by{" "}
          {movie.director} {movie.description}
        </div>
      </div>
      <div className="button-delete" onClick={onDelete}>
        <FaTrashAlt />
      </div>
    </div>
  );
}
