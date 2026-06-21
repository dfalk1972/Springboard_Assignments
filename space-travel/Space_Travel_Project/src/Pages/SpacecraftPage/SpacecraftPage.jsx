import { useParams, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import { SpaceTravelContext } from "../../Context/SpaceTravelContext";
import Loading from "../../Components/Loading/Loading.jsx";
import styles from "./SpacecraftPage.module.css";

export default function SpacecraftPage() {
  const { id } = useParams();
  const { spacecrafts } = useContext(SpaceTravelContext);
  const spacecraft = spacecrafts.find((s) => s.id === id);

  if (spacecrafts.length === 0) {
    return <Loading />;
  }

  if (!spacecraft) {
    return <Navigate to="/spacecrafts" replace />;
  }
  return (
    <div className={styles.page}>
      <Link to="/spacecrafts" className={styles.page__back}>
        &larr; Back to Fleet
      </Link>
      <div className={styles.detail}>
        {spacecraft.pictureUrl ? (
          <img
            className={styles.detail__image}
            src={spacecraft.pictureUrl}
            alt={spacecraft.name}
          />
        ) : null}
        <h1 className={styles.detail__name}> {spacecraft.name}</h1>
        <p className={styles.detail__capacity}>
          {" "}
          Capacity: {spacecraft.capacity}
        </p>
        <p className={styles.detail__description}> {spacecraft.description}</p>
      </div>
    </div>
  );
}
