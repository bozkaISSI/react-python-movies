import { useState } from "react";
import { toast } from "react-toastify";

function ActorForm({ onActorSubmit, buttonLabel }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.warning("Name is required.");
    }
    if (!surname.trim()) {
      return toast.warning("Surname is required.");
    }

    onActorSubmit({ name, surname });

    setName("");
    setSurname("");

    toast.success(`Actor "${name} ${surname}" added successfully!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter actor's first name"
        />
      </div>
      <div>
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Enter actor's surname"
        />
      </div>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default ActorForm;
