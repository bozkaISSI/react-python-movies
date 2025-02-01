import { FaTrashAlt } from "react-icons/fa";
import { FaFilm } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { Tooltip } from "react-tooltip";

import { FaPlus } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActorsListItem({ actor, onDelete }) {
  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${actor.name} ${actor.surname}"?`,
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
      <div className="buttons">
        <span>{actor.name}</span> <strong>{actor.surname}</strong>
        <div className="button-movie-list" data-tooltip-id="movie-list-tooltip">
          <FaFilm />
          <Tooltip id="movie-list-tooltip" place="right">
            <ul>
              <li>Movie 1</li>
              <li>Movie 2</li>
              <li>Movie 3</li>
            </ul>
          </Tooltip>
        </div>
      </div>
      <div className="buttons">
        <div
          className="button-add-to-movie"
          data-tooltip-id="add-to-movie-tooltip"
        >
          <FaPlus />
          <Tooltip
            id="add-to-movie-tooltip"
            place="top"
            content="Add to Movie"
          />
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
