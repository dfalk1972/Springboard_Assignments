// This will be all the Pokemon that makes up the page
import Pokecard from "./Pokecard";
import "./Pokedex.css";

export default function Pokedex({ pokemon, title, isWinner }) {
  const pokecardsDivs = pokemon.map((poke) => (
    <Pokecard
      //We can use spread {...poke} because each item has exactly the same info as props so for each item it goes through the item and passes each one.
      key={poke.id}
      // {...poke}
      id={poke.id}
      name={poke.name}
      type={poke.type}
      experience={poke.base_experience}
    />
  ));

  return (
    <div className={`pokedex-container ${isWinner ? "winning-hand" : ""}`}>
      <h1 className="pokedex-title">{title}</h1>

      <div className="pokedex">{pokecardsDivs}</div>
      {isWinner && <h2 className="winner-text">🌟 THIS HAND WINS! 🌟</h2>}
    </div>
  );
}
