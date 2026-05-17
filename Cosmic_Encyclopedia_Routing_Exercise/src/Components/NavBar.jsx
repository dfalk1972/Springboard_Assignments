import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar({ celestialObjects }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            Home
          </NavLink>
        </li>
        {celestialObjects.map((obj) => (
          <li className={styles.navItem} key={obj.id}>
            <NavLink
              to={`/${obj.id}`}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              {obj.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
