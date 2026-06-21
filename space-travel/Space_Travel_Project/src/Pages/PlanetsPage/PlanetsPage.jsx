import { useContext } from "react";
import Planet from "../../Components/Planet/Planet.jsx";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";
import styles from "./PlanetsPage.module.css";

export default function PlanetsPage() {
  const { planets } = useContext(SpaceTravelContext);
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Planets</h1>
      <div className={styles.page__grid}>
        {planets.map((planet) => (
          <Planet key={planet.id} planet={planet} />
        ))}
      </div>
    </div>
  );
}
