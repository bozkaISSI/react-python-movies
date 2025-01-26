import { useState } from "react";
import { toast } from "react-toastify";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');

    function addMovie(event) {
        event.preventDefault();

        if (title.length < 5) {
            return toast.warning('Title must be at least 5 characters long');
        }
        if (!year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            return toast.warning('Please provide a valid year between 1900 and the current year');
        }
        if (!director.trim()) {
            return toast.warning('Director name cannot be empty');
        }
        if (!description.trim()) {
            return toast.warning('Description cannot be empty');
        }

        props.onMovieSubmit({ title, year, director, description });

        toast.success(`Movie "${title}" added successfully!`);

        setTitle('');
        setYear('');
        setDirector('');
        setDescription('');
    }

    return (
        <form onSubmit={addMovie}>
            <h2>Add Movie</h2>

            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter movie title"
                />
            </div>

            <div>
                <label>Year</label>
                <input
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    placeholder="Enter movie year"
                    min="1900"
                    max={new Date().getFullYear()}
                />
            </div>

            <div>
                <label>Director</label>
                <input
                    type="text"
                    value={director}
                    onChange={(event) => setDirector(event.target.value)}
                    placeholder="Enter movie director"
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Enter movie description"
                />
            </div>

            <button>{props.buttonLabel || 'Submit'}</button>
        </form>
    );
}
