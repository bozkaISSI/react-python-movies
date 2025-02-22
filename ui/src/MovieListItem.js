import { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { Tooltip } from "react-tooltip";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function MovieListItem({ movie, onDelete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="movies">
        <div
          className="movie-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <strong>{movie.title}</strong>
          <span className="movie-year">({movie.year})</span> directed by{" "}
          {movie.director}
        </div>

        <div className={`movie-description ${isExpanded ? "expanded" : ""}`}>
          {movie.description}
        </div>
      </div>

      <div className="buttons">
        <div
          className="button-edit"
          onClick={() => onEdit(movie)}
          data-tooltip-id="edit-tooltip"
        >
          <FaPen />
          <Tooltip id="edit-tooltip" place="top" content="Edit Movie" />
        </div>

        <div
          className="button-delete"
          onClick={handleDelete}
          data-tooltip-id="delete-tooltip"
        >
          <FaTrashAlt />
          <Tooltip id="delete-tooltip" place="top" content="Delete Movie" />
        </div>
      </div>
    </div>
  );
}
