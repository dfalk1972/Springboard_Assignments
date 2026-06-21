import { Link } from "react-router-dom";
import styles from "./ConstructionPage.module.css";
import CreateSpacecraftForm from "../../Components/CreateSpacecraftForm/CreateSpacecraftForm.jsx";

export default function ConstructionPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Construct a Spacecraft</h1>
      <CreateSpacecraftForm />
      <Link to="/spacecrafts" className={styles.page__back}>
        &larr; Back
      </Link>
    </div>
  );
}
