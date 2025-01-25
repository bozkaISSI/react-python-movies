import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";
import ActorList from "./ActorList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/movies');
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();

        const fetchActors = async () => {
            const response = await fetch('/actors');
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
    }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const savedMovie = await response.json();
            setMovies([...movies, savedMovie]);
            setAddingMovie(false);
        }
    }

    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setMovies(movies.filter(m => m.id !== movie.id));
        }
    }

    async function handleAddActor(actor) {
        const response = await fetch('/actors', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const savedActor = await response.json();
            setActors([...actors, savedActor]);
            setAddingActor(false);
        }
    }

    async function handleDeleteActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setActors(actors.filter(a => a.id !== actor.id));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <h1>My favourite movies to watch</h1>
            </div>
            <div className="row">
                <div className="column column-50">
                    {movies.length === 0
                        ? <p>No movies yet.</p>
                        : <MoviesList movies={movies}
                                      onDeleteMovie={handleDeleteMovie}
                        />}
                    {addingMovie
                        ? <MovieForm onMovieSubmit={handleAddMovie}
                                     buttonLabel="Add a movie"
                        />
                        : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
                </div>
                <div className="column column-50">
                    {actors.length === 0
                        ? <p>No actors yet. Maybe add someone?</p>
                        : <ActorList actors={actors}
                                    onDeleteActor={handleDeleteActor}
                        />}
                    {addingActor
                        ? <ActorForm onActorSubmit={handleAddActor}
                                     buttonLabel="Add an actor"
                        />
                        : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
                </div>
            </div>
        </div>
    );
}

export default App;
