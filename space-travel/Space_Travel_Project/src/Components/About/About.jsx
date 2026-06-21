import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <article className={styles.about__card}>
        <span className={styles.about__icon}>🌍</span>
        <h2 className={styles.about__heading}>Earth Needs a Backup</h2>
        <p className={styles.about__text}>
          Humanity has outgrown a single planet. As Commander, your job is to
          keep our species thriving across the solar system — and it all starts
          here at mission control.
        </p>
      </article>
      <article className={styles.about__card}>
        <span className={styles.about__icon}>🚀</span>
        <h2 className={styles.about__heading}>Build Your Fleet</h2>
        <p className={styles.about__text}>
          Construct spacecraft with their own crew capacity, give each a name
          and a purpose, and launch them into service — or decommission the ones
          that have flown their last mission.
        </p>
      </article>
      <article className={styles.about__card}>
        <span className={styles.about__icon}>🪐</span>
        <h2 className={styles.about__heading}>Relocate Humanity</h2>
        <p className={styles.about__text}>
          Dispatch ships between planets to move population across the system.
          Every launch shifts the balance of where humanity calls home.
        </p>
      </article>
    </section>
  );
}
