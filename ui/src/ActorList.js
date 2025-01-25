import ActorsListItem from "./ActorListItem";

export default function ActorList(props) {
    return (
        <div>
            <h2>Actors</h2>
            <div className="actor-list">
                {props.actors.map((actor) => (
                    <div
                        key={actor.id}
                        className="actor-item"
                        style={{
                            marginBottom: "8px",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px",
                        }}
                    >
                        <ActorsListItem
                            actor={actor}
                            onDelete={() => props.onDeleteActor(actor)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
