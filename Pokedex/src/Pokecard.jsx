import "./Pokecard.css";

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}
export default function Pokecard({ id, name, type, experience }) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div className="pokecard">
      <h2>{capitalize(name)}</h2>
      <img src={image} alt={name} />
      <div>
        <span>Type: {capitalize(type)}</span>
        <p>Experience: {experience}</p>
      </div>
    </div>
  );
}

//For each pokemon this should provide it's name, image, type and experience on each card.
