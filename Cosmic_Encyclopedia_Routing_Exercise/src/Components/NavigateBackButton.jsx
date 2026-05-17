import { useNavigate } from "react-router-dom";
import styles from "./NavigateBackButton.module.css";

function NavigateBackButton() {
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      &larr; Go Back
    </button>
  );
}

export default NavigateBackButton;
