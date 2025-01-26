import { FaTrashAlt } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";

export default function MovieListItem(props) {
    return (
        <div>
            <div className='test'>
                <div>
                    <PiFilmSlateFill />
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                {props.movie.description}
                </div>

                <div className='button-delete' onClick={props.onDelete}><FaTrashAlt /></div>
            </div>

        </div>
    );
}
