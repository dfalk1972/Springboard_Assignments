import "./FireButton.css";

export default function FireButton({ onFire, gameOver }) {
  const buttonStyle = { backgroundColor: gameOver ? "green" : "Orange" };
  return (
    <div className="FireButton">
      <button style={buttonStyle} onClick={onFire}>
        {gameOver ? "Restart" : "Fire"}
      </button>
    </div>
  );
}
