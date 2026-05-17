import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Welcome to the Cosmic Encyclopedia</h1>
      <p className={styles.intro}>
        Embark on a journey through the universe and discover the wonders of the
        cosmos. From the fiery surfaces of stars to the icy realms of distant
        comets, the Cosmic Encyclopedia is your gateway to understanding the
        celestial bodies that populate our galaxy and beyond.
      </p>
      <p className={styles.intro}>
        Navigate through our collection to learn more about the various
        celestial phemomena, their history, composition, and the mysteries they
        hold.
      </p>
    </div>
  );
}

export default Homepage;
