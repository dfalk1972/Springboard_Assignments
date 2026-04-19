import { useState, useEffect } from "react";
import "./Space.css";
import Star from "./Star";
const STAR_SIZE = 28;

export default function Space() {
  const [stars, setStars] = useState([]);
  function createStar() {
    return {
      id: crypto.randomUUID(),
      position: {
        x: Math.random() * (window.innerWidth - STAR_SIZE),
        y: Math.random() * (window.innerHeight - STAR_SIZE),
      },
    };
  }

  function destroyStar(id) {
    setStars((prev) => prev.filter((star) => star.id !== id));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) => [...prev, createStar()]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space">
      {stars.map((star) => (
        <Star
          key={star.id}
          id={star.id}
          position={star.position}
          onDestroy={destroyStar}
        />
      ))}
    </div>
  );
}
