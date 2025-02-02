import { useState, useEffect } from "react";
import { FaTrashAlt, FaFilm, FaPlus } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActorsListItem({ actor, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  // Fetch movies from backend API
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

    fetchMovies();
  }, []);

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${actor.name} ${actor.surname}"?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleCheckboxChange = (e) => {
    const movieId = parseInt(e.target.value);
    setSelectedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId],
    );
  };

  const handleAddMoviesToActor = () => {
    console.log("Movies selected for actor:", selectedMovies);
    setIsModalOpen(false);
  };

  return (
    <div className="main-container">
      <div className="buttons">
        <span>{actor.name}</span> <strong>{actor.surname}</strong>
        <div className="button-movie-list" data-tooltip-id="movie-list-tooltip">
          <FaFilm />
          <Tooltip id="movie-list-tooltip" place="right">
            <ul>
              {movies.length > 0 ? (
                movies.map((movie) => <li key={movie.id}>{movie.title}</li>)
              ) : (
                <li>No movies available</li>
              )}
            </ul>
          </Tooltip>
        </div>
      </div>

      <div className="buttons">
        <div
          className="button-add-to-movie"
          onClick={() => setIsModalOpen(true)}
          data-tooltip-id="add-to-movie-tooltip"
        >
          <FaPlus />
          <Tooltip
            id="add-to-movie-tooltip"
            place="top"
            content="Add to Movie"
          />
        </div>
        <div
          className="button-delete"
          onClick={handleDelete}
          data-tooltip-id="delete-tooltip"
        >
          <FaTrashAlt />
          <Tooltip id="delete-tooltip" place="top" content="Delete Actor" />
        </div>
      </div>

      {/* Modal for movie selection */}
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
          <button onClick={handleAddMoviesToActor}>Add Movies</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
