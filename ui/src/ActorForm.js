import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

export default function ActorForm({ onActorSubmit, buttonLabel, isModalOpen, closeModal }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  function addActor(event) {
    event.preventDefault();

    if (!name.trim()) {
      return toast.warning("Name is required.");
    }
    if (!surname.trim()) {
      return toast.warning("Surname is required.");
    }

    onActorSubmit({ name, surname });

    toast.success(`Actor ${name} ${surname} added successfully!`);

    setName('');
    setSurname('');
    closeModal();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Add Actor"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <form onSubmit={addActor}>
        <h2>Add Actor</h2>

        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter actor's first name"
          />
        </div>

        <div>
          <label>Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            placeholder="Enter actor's surname"
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">{buttonLabel || "Submit"}</button>
        </div>
      </form>
    </Modal>
  );
}
