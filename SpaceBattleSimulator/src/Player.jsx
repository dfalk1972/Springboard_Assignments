export default function Player({
  health = 100,
  playerName = "Player 1",
  color = "white",
}) {
  return (
    <div>
      <p style={{ color: color }}>
        {playerName}: {health}
      </p>
    </div>
  );
}
