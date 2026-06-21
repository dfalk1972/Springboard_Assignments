import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ onClick, children, type = "button" }) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node.isRequired,
};
