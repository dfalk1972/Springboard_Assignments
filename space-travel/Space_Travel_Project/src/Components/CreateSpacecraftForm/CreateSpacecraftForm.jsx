import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import styles from "./CreateSpacecraftForm.module.css";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";

export default function CreateSpacecraftForm() {
  const { buildSpacecraft } = useContext(SpaceTravelContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);

  async function handleBuild(e) {
    e.preventDefault();
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!capacity) {
      setError("Capacity is required");
      return;
    }
    if (!description) {
      setError("Description is required");
      return;
    }
    setError("");
    setIsBuilding(true);

    await buildSpacecraft({
      name,
      capacity: Number(capacity),
      description,
      pictureUrl,
    });
    navigate("/spacecrafts");
  }

  if (isBuilding) {
    return <Loading message="Building spacecraft..." />;
  }
  return (
    <form className={styles.form} onSubmit={handleBuild}>
      <input
        className={styles.form__input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* force capacity to be a number? */}
      <input
        className={styles.form__input}
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <input
        className={styles.form__input}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={styles.form__input}
        placeholder="Picture Url"
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
      />
      <Button type="submit">Build</Button>
      {error && <p className={styles.form__error}>{error}</p>}
    </form>
  );
}
