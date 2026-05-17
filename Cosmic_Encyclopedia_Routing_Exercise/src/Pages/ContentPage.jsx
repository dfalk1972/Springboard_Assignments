import { useParams } from "react-router-dom";
import CelestialObject from "../Components/CelestialObject";
import NavigateBackButton from "../Components/NavigateBackButton";

function ContentPage({ celestialObjects }) {
  const { id } = useParams();
  const object = celestialObjects.find((obj) => obj.id === id);
  if (!object) {
    return <p className={styles.notFound}>Object not found in the cosmos. </p>;
  }
  return (
    <div>
      <CelestialObject celestialObject={object} />
      <NavigateBackButton />
    </div>
  );
}

export default ContentPage;
