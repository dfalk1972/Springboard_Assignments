import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";
import PropTypes from "prop-types";
import Button from "../Button/Button.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from "./Spacecraft.module.css";

export default function Spacecraft({ spacecraft }) {
  const { destroySpacecraftById } = useContext(SpaceTravelContext);
  const [isDestroying, setIsDestroying] = useState(false);

  async function handleDestroy() {
    setIsDestroying(true);
    await destroySpacecraftById(spacecraft.id);
  }
  if (isDestroying) {
    return (
      <div className={styles.card}>
        <Loading message="Destroying..." />
      </div>
    );
  }
  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>
        <Link to={`/spacecraft/${spacecraft.id}`}>{spacecraft.name}</Link>
      </h2>
      <h3 className={styles.card__capacity}>Capacity: {spacecraft.capacity}</h3>
      {spacecraft.pictureUrl ? (
        <img
          className={styles.card__image}
          src={spacecraft.pictureUrl}
          alt={spacecraft.name}
        />
      ) : null}
      <Button onClick={handleDestroy}>Destroy</Button>
    </div>
  );
}
Spacecraft.propTypes = {
  spacecraft: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    capacity: PropTypes.number,
    description: PropTypes.string,
    pictureUrl: PropTypes.string,
  }).isRequired,
};
