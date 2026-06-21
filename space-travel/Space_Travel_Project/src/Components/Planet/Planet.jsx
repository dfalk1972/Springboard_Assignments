import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";
import Loading from "../Loading/Loading";
import styles from "./Planet.module.css";

export default function Planet({ planet }) {
  const { spacecrafts, planets, sendSpacecraftToPlanet } =
    useContext(SpaceTravelContext);

  const [isSending, setIsSending] = useState(false);

  const stationedShips = spacecrafts.filter(
    (s) => s.currentLocation === planet.id,
  );

  async function handleSend(shipId, targetPlanetId) {
    setIsSending(true);
    await sendSpacecraftToPlanet({
      spacecraftId: shipId,
      targetPlanetId,
    });
    setIsSending(false);
  }
  if (isSending) {
    return (
      <div className={styles.card}>
        <Loading message="Dispatching..." />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>{planet.name}</h2>
      <p className={styles.card__population}>
        Population: {planet.currentPopulation}
      </p>
      {planet.pictureUrl ? (
        <img
          className={styles.card__image}
          src={planet.pictureUrl}
          alt={planet.name}
        />
      ) : null}
      <ul className={styles.card__ships}>
        {stationedShips.length === 0 && <p>No ships docked</p>}
        {stationedShips.map((s) => (
          <li key={s.id} className={styles.card__ship}>
            <span>{s.name}</span>
            <select
              className={styles.card__select}
              onChange={(e) => handleSend(s.id, Number(e.target.value))}
            >
              <option>Send to...</option>
              {planets
                .filter((p) => p.id !== planet.id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

Planet.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    currentPopulation: PropTypes.number,
    pictureUrl: PropTypes.string,
  }).isRequired,
};
