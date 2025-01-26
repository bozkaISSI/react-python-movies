import { FaTrashAlt } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";

export default function ActorsListItem(props) {
    return (
        <div>
            <div className='main-container'>
                <div>
                    <span>{props.actor.name}</span>
                    {' '}
                    <strong>{props.actor.surname}</strong>
                    {' '}
                </div>

                <div className='button-delete' onClick={props.onDelete}><FaTrashAlt /></div>
            </div>
        </div>
    );
}