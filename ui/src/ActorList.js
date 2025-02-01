import ActorsListItem from "./ActorListItem";
import { toast } from "react-toastify";

export default function ActorList({ actors, onDeleteActor }) {
  const handleDeleteActor = (actor) => {
    onDeleteActor(actor);
    toast.success(
      `Actor "${actor.name} ${actor.surname}" deleted successfully!`,
    );
  };

  return (
    <div>
      <h2>Actors</h2>
      <div className="actor-list">
        {actors.map((actor) => (
          <div key={actor.id} className="actor-item">
            <ActorsListItem
              actor={actor}
              onDelete={() => handleDeleteActor(actor)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
