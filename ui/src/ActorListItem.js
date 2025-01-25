export default function ActorsListItem(props) {
    return (
        <div>
            <div>
                <span>{props.actor.name}</span>
                {' '}
                <strong>{props.actor.surname}</strong>
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>

        </div>
    );
}