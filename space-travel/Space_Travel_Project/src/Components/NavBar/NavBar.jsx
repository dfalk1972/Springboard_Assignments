import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? `${styles.nav__link} ${styles["nav__link--active"]}`
      : styles.nav__link;
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/spacecrafts" className={linkClass}>
            Spacecrafts
          </NavLink>
        </li>
        <li>
          <NavLink to="/planets" className={linkClass}>
            Planets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
