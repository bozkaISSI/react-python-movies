import './App.css';
import { useState, useEffect } from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";
import ActorList from "./ActorList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [addingActor, setAddingActor] = useState(false);
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);
    const [isLoadingActors, setIsLoadingActors] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/movies');
                if (!response.ok) {
                    throw new Error(`Error fetching movies: ${response.statusText}`);
                }
                const movies = await response.json();
                setMovies(movies);
                setIsLoadingMovies(false);
            } catch (error) {
                toast.error(error.message);
                setIsLoadingMovies(false);
            }
        };
        fetchMovies();

        const fetchActors = async () => {
            try {
                const response = await fetch('/actors');
                if (!response.ok) {
                    throw new Error(`Error fetching actors: ${response.statusText}`);
                }
                const actors = await response.json();
                setActors(actors);
                setIsLoadingActors(false);
            } catch (error) {
                toast.error(error.message);
                setIsLoadingActors(false);
            }
        };
        fetchActors();
    }, []);

    async function handleAddMovie(movie) {
        try {
            const response = await fetch('/movies', {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error adding movie: ${response.statusText}`);
            }
            const savedMovie = await response.json();
            setMovies([...movies, savedMovie]);
            setAddingMovie(false);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleDeleteMovie(movie) {
        try {
            const response = await fetch(`/movies/${movie.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error deleting movie: ${response.statusText}`);
            }
            setMovies(movies.filter(m => m.id !== movie.id));
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleAddActor(actor) {
        try {
            const response = await fetch('/actors', {
                method: 'POST',
                body: JSON.stringify(actor),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Error adding actor: ${response.statusText}`);
            }
            const savedActor = await response.json();
            setActors([...actors, savedActor]);
            setAddingActor(false);
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function handleDeleteActor(actor) {
        try {
            const response = await fetch(`/actors/${actor.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error deleting actor: ${response.statusText}`);
            }
            setActors(actors.filter(a => a.id !== actor.id));
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="container">
            <div style={{ padding: '0 1.0rem' }} className="row">
                <h1 style={{ color: '#9b4dca' }}>My favourite movies to watch</h1>
            </div>
            <div className="row">
                <div className="column column-50" style={{ position: 'relative' }}>
                    {isLoadingMovies ? (
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            {movies.length === 0
                                ? <p>No movies yet.</p>
                                : <MoviesList movies={movies} onDeleteMovie={handleDeleteMovie} />}
                            {addingMovie
                                ? <MovieForm onMovieSubmit={handleAddMovie} buttonLabel="Add a movie" />
                                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
                        </>
                    )}
                </div>

                <div className="column column-50" style={{ position: 'relative' }}>
                    {isLoadingActors ? (
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            {actors.length === 0
                                ? <p>No actors yet. Maybe add someone?</p>
                                : <ActorList actors={actors} onDeleteActor={handleDeleteActor} />}
                            {addingActor
                                ? <ActorForm onActorSubmit={handleAddActor} buttonLabel="Add an actor" />
                                : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
                        </>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default App;
