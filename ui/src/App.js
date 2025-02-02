import "./App.css";
import { useState, useEffect } from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from "./ActorForm";
import ActorList from "./ActorList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [addingMovie, setAddingMovie] = useState(false);
  const [addingActor, setAddingActor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  async function handleEditMovie(movie) {
    setCurrentMovie(movie);
    setEditingMovie(true);
    setAddingMovie(true);
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [moviesRes, actorsRes] = await Promise.all([
          fetch("/movies"),
          fetch("/actors"),
        ]);

        if (!moviesRes.ok) throw new Error(`Error fetching movies: ${moviesRes.statusText}`);
        if (!actorsRes.ok) throw new Error(`Error fetching actors: ${actorsRes.statusText}`);

        const moviesData = await moviesRes.json();
        const actorsData = await actorsRes.json();

        setMovies(moviesData);
        setActors(actorsData);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="container">
      <div className="row" style={{ padding: "0 1rem" }}>
        <h1 style={{ color: "#9b4dca" }}>
          {isLoading ? <Skeleton width={300} height={40} /> : "My Favourite Movies to Watch"}
        </h1>
      </div>

      <div className="row">
        <div className="column column-100 search-input">
          {isLoading ? (
            <Skeleton height={40} />
          ) : (
            <input type="text" placeholder="Search for movies..." />
          )}
        </div>
        {isLoading ? <Skeleton width={100} height={40} /> : <button>Search</button>}
      </div>

      <div className="row">
        <div className="column column-100" style={{ position: "relative" }}>
          {isLoading ? (
            <Skeleton height={50} count={3} />
          ) : (
            <>
              {movies.length === 0 ? (
                <p>No movies yet.</p>
              ) : (
                <MoviesList movies={movies} onEditMovie={handleEditMovie} />
              )}
              <button onClick={() => setAddingMovie(true)}>Add a movie</button>
            </>
          )}
        </div>

        <div className="column column-100" style={{ position: "relative" }}>
          {isLoading ? (
            <Skeleton height={50} count={3} />
          ) : (
            <>
              {actors.length === 0 ? (
                <p>No actors yet. Maybe add someone?</p>
              ) : (
                <ActorList actors={actors} />
              )}
              <button onClick={() => setAddingActor(true)}>Add an actor</button>
            </>
          )}
        </div>
      </div>

      {addingMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MovieForm
              onMovieSubmit={(movie) => {
                setMovies([...movies, movie]);
                setAddingMovie(false);
              }}
              buttonLabel={editingMovie ? "Save changes" : "Add a Movie"}
              movie={editingMovie ? currentMovie : null}
            />
            <button onClick={() => setAddingMovie(false)}>Close</button>
          </div>
        </div>
      )}

      {addingActor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ActorForm
              onActorSubmit={(actor) => {
                setActors([...actors, actor]);
                setAddingActor(false);
              }}
              buttonLabel="Add an Actor"
            />
            <button onClick={() => setAddingActor(false)}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
