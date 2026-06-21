import PropTypes from "prop-types";
import styles from "./Loading.module.css";

export default function Loading({ message = "Loading..." }) {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__orbit}></div>
      <p className={styles.loading__text}>{message}</p>
    </div>
  );
}
Loading.propTypes = {
  message: PropTypes.string,
};
