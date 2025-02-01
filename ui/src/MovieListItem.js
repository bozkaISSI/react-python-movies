import { FaTrashAlt } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";
import { FaPen } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function MovieListItem({ movie, onDelete, onEdit }) {
  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${movie.title}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="main-container">
      <div className="movie">
        <div>
          <strong>{movie.title}</strong>
          <span>({movie.year})</span>
          directed by {movie.director} {movie.description}
        </div>
      </div>
      <div className="buttons">
        <div className="button-edit" onClick={() => onEdit(movie)}>
          <FaPen />
        </div>

        <div className="button-delete" onClick={handleDelete}>
          <FaTrashAlt />
        </div>
      </div>
    </div>
  );
}
