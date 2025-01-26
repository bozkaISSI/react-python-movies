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

  const fetchData = async (url, setState, setLoading, errorMessage) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${errorMessage}: ${response.statusText}`);
      const data = await response.json();
      setState(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('/movies', setMovies, setIsLoadingMovies, 'Error fetching movies');
    fetchData('/actors', setActors, setIsLoadingActors, 'Error fetching actors');
  }, []);

  const addData = async (url, data, setState, setToggling, errorMessage) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`${errorMessage}: ${response.statusText}`);
      const savedItem = await response.json();
      setState((prev) => [...prev, savedItem]);
      setToggling(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteData = async (url, id, setState, errorMessage) => {
    try {
      const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`${errorMessage}: ${response.statusText}`);
      setState((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openMovieForm = () => setAddingMovie(true);
  const closeMovieForm = () => setAddingMovie(false);

  const openActorForm = () => setAddingActor(true);
  const closeActorForm = () => setAddingActor(false);

  return (
    <div className="container">
      <div className="row" style={{ padding: '0 1rem' }}>
        <h1 style={{ color: '#9b4dca' }}>My Favourite Movies to Watch</h1>
      </div>

      <div className="row">
        <div className="column column-100 search-input">
          <input
            type="text"
            placeholder="Search for movies..."
          />
        </div>
        <button>Search</button>
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
              {movies.length === 0 ? (
                <p>No movies yet.</p>
              ) : (
                <MoviesList
                  movies={movies}
                  onDeleteMovie={(movie) => deleteData('/movies', movie.id, setMovies, 'Error deleting movie')}
                />
              )}
              <button onClick={openMovieForm}>Add a movie</button>
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
              {actors.length === 0 ? (
                <p>No actors yet. Maybe add someone?</p>
              ) : (
                <ActorList
                  actors={actors}
                  onDeleteActor={(actor) => deleteData('/actors', actor.id, setActors, 'Error deleting actor')}
                />
              )}
              <button onClick={openActorForm}>Add an actor</button>
            </>
          )}
        </div>
      </div>

      {addingMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MovieForm
              onMovieSubmit={(movie) => addData('/movies', movie, setMovies, setAddingMovie, 'Error adding movie')}
              buttonLabel="Add a Movie"
            />
            <button onClick={closeMovieForm}>Close</button>
          </div>
        </div>
      )}

      {addingActor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ActorForm
              onActorSubmit={(actor) => addData('/actors', actor, setActors, setAddingActor, 'Error adding actor')}
              buttonLabel="Add an Actor"
              isModalOpen={addingActor}
              closeModal={closeActorForm}
            />
            <button onClick={closeActorForm}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
