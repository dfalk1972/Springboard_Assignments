import styles from "./CelestialObject.module.css";

function CelestialObject({ celestialObject }) {
  return (
    <div className={styles.objectCard}>
      <h1 className={styles.objectTitle}>{celestialObject.name}</h1>
      <p className={styles.objectInfo}>{celestialObject.info}</p>
    </div>
  );
}

export default CelestialObject;
