import { FaTrashAlt } from "react-icons/fa";

export default function ActorsListItem({ actor, onDelete }) {
  return (
    <div className="main-container">
      <div>
        <span>{actor.name}</span> <strong>{actor.surname}</strong>
      </div>
      <div className="button-delete" onClick={onDelete}>
        <FaTrashAlt />
      </div>
    </div>
  );
}
