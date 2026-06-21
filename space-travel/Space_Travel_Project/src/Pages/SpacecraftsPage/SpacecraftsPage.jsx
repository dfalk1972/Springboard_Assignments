import { useContext } from "react";
import { Link } from "react-router-dom";
import Spacecraft from "../../Components/Spacecraft/Spacecraft.jsx";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";
import styles from "./SpacecraftsPage.module.css";

export default function SpacecraftsPage() {
  const { spacecrafts } = useContext(SpaceTravelContext);
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Spacecrafts</h1>
      <Link to="/construct" className={styles.page__buildLink}>
        + Build a Spacecraft
      </Link>
      <div className={styles.page__grid}>
        {spacecrafts.map((spacecraft) => (
          <Spacecraft key={spacecraft.id} spacecraft={spacecraft} />
        ))}
      </div>
    </div>
  );
}
