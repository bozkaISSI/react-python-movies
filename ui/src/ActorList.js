import ActorsListItem from "./ActorListItem";

export default function ActorList({ actors, onDeleteActor }) {
  return (
    <div>
      <h2>Actors</h2>
      <div className="actor-list">
        {actors.map((actor) => (
          <div key={actor.id} className="actor-item">
            <ActorsListItem actor={actor} onDelete={() => onDeleteActor(actor)} />
          </div>
        ))}
      </div>
    </div>
  );
}
