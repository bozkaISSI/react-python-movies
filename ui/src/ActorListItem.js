import { useState, useEffect } from "react";
import { FaTrashAlt, FaFilm, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActorsListItem({ actor, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/movies");
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchActorMovies = async () => {
  try {
    if (!actor?.id) {
      throw new Error("Actor ID is missing");
    }
    console.log("Fetching movies for actor ID:", actor.id);

    const response = await fetch(`/actors/${actor.id}/movies`);


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch actor movies: ${errorText}`);
    }


    let data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("Failed to parse JSON response from server.");
    }

    console.log("Fetched movies:", data);

    if (data.length === 0) {
      console.log("No movies found for this actor, ignoring...");
      return;
    }

    setSelectedMovies(data.map((movie) => movie.id));
  } catch (error) {
    console.error("Error fetching actor movies:", error.message);
  }
};


    fetchMovies();
    fetchActorMovies();
  }, [actor.id]);

  const handleCheckboxChange = (e) => {
    const movieId = parseInt(e.target.value);
    setSelectedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId],
    );
  };

  const handleAddMoviesToActor = async () => {
    try {
      const response = await fetch(`/actors/${actor.id}/movies`, {
        method: "POST",
        body: JSON.stringify({ movieIds: selectedMovies }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update actor movies");

      const updatedMoviesResponse = await fetch(`/actors/${actor.id}/movies`);
      const updatedMovies = await updatedMoviesResponse.json();

      setSelectedMovies(updatedMovies.map((movie) => movie.id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating actor movies:", error);
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${actor.name} ${actor.surname}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(actor.id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="main-container">
      <div className="actors">
        <span>{actor.name}</span>
        <strong className="actor-surname">{actor.surname}</strong>
        <div
          className="button-movie-list"
          data-tooltip-id={`movie-list-tooltip-${actor.id}`}
        >
          <FaFilm />
          <Tooltip id={`movie-list-tooltip-${actor.id}`} place="right">
            <ul>
              {selectedMovies.length === 0 ? (
                <li>No movies selected</li>
              ) : (
                selectedMovies.map((movieId) => {
                  const movie = movies.find((m) => m.id === movieId);
                  return (
                    <li key={movieId}>
                      {movie ? movie.title : "Unknown Movie"}
                    </li>
                  );
                })
              )}
            </ul>
          </Tooltip>
        </div>
      </div>
      <div className="buttons">
        <div
          className="button-add-to-movie"
          onClick={() => setIsModalOpen(true)}
          data-tooltip-id={`add-to-movie-tooltip-${actor.id}`}
        >
          <FaPlus />
          <Tooltip
            id={`add-to-movie-tooltip-${actor.id}`}
            place="top"
            content="Add to Movie"
          />
        </div>
        <div
          className="button-delete"
          onClick={handleDelete}
          data-tooltip-id={`delete-tooltip-${actor.id}`}
        >
          <FaTrashAlt />
          <Tooltip
            id={`delete-tooltip-${actor.id}`}
            place="top"
            content="Delete Actor"
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Movies"
        ariaHideApp={false}
        className="movie-modal"
        overlayClassName="movie-overlay"
      >
        <h2>Select Movies for {actor.name}</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-list-form">
              <input
                type="checkbox"
                value={movie.id}
                onChange={handleCheckboxChange}
                checked={selectedMovies.includes(movie.id)}
              />
              <label>{movie.title}</label>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={handleAddMoviesToActor}>Save Movies</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
