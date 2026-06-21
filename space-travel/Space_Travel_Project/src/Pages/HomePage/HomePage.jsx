import { Link } from "react-router-dom";
import About from "../../Components/About/About.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.home__hero}>
        <h1 className={styles.home__title}>Space Travel</h1>
        <p className={styles.home__tagline}>
          Mission Control for humanity's journey across the stars.
        </p>
        <div className={styles.home__actions}>
          <Link to="/spacecrafts" className={styles.home__cta}>
            View the Fleet
          </Link>
          <Link to="/planets" className={styles.home__ctaSecondary}>
            Explore Planets
          </Link>
        </div>
      </section>
      <About />
    </div>
  );
}
