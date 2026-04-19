import { useRef, useEffect } from "react";
import "./Star.css";

export default function Star({ id, position, onDestroy }) {
  const starRef = useRef(null);

  useEffect(() => {
    starRef.current.focus();
  }, []);
  return (
    <div
      ref={starRef}
      tabIndex="0"
      className="star"
      style={{ position: "absolute", left: position.x, top: position.y }}
      onClick={() => onDestroy(id)}
    >
      ⭐
    </div>
  );
}
