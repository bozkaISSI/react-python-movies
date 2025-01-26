import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles

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
      <div>
        <span>{actor.name}</span> <strong>{actor.surname}</strong>
      </div>
      <div className="button-delete" onClick={handleDelete}>
        <FaTrashAlt />
      </div>
    </div>
  );
}
