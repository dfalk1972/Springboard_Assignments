import Pokedex from "./Pokedex";
import "./Pokegame.css";

export default function Pokegame({ pokemon }) {
  // Create a copy of the array to avoid modifying the original (optional, but good practice)
  const shuffledArray = [...pokemon];

  let currentIndex = shuffledArray.length;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  const hand1 = shuffledArray.slice(0, 4);
  const hand2 = shuffledArray.slice(4);
  const hand1TotalExp = hand1.reduce(
    (total, poke) => total + poke.base_experience,
    0,
  );
  const hand2TotalExp = hand2.reduce(
    (total, poke) => total + poke.base_experience,
    0,
  );
  const hand1Winner = hand1TotalExp > hand2TotalExp;
  const hand2Winner = hand2TotalExp > hand1TotalExp;

  return (
    <div className="game-container">
      <Pokedex pokemon={hand1} title="Hand 1" isWinner={hand1Winner} />

      <div className="divider"></div>

      <Pokedex pokemon={hand2} title="Hand 2" isWinner={hand2Winner} />
    </div>
  );
}
