function App() {
  const spacePhenomena = [
    { id: 1, name: "Asteroid Belt", emoji: "☄️" },
    { id: 2, name: "Galactic Nebula", emoji: "🌌" },
    { id: 3, name: "Black Hole", emoji: "🕳️" },
    { id: 4, name: "Supernova Explosion", emoji: "💥" },
    { id: 5, name: "Pulsar", emoji: "⚡" },
    { id: 6, name: "Quasar", emoji: "💫" },
    { id: 7, name: "Exoplanet", emoji: "🪐" },
    { id: 8, name: "Interstellar Cloud", emoji: "☁️" },
    { id: 9, name: "Gamma-Ray Burst", emoji: "🌠" },
    { id: 10, name: "Magnetic Field Reversal", emoji: "🧲" },
  ];

  const observationStatuses = ["🔭 Visible", "🌫 Faint", "🚀 Prime for Study"];

  const randomStatus = () => {
    return observationStatuses[
      Math.floor(Math.random() * observationStatuses.length)
    ];
  };

  const phenomena = spacePhenomena.map((phenomena) => {
    const phenomenaStatus = randomStatus();
    return (
      <li key={phenomena.id}>
        {phenomena.emoji} {phenomena.name}: {phenomenaStatus}{" "}
        {phenomenaStatus === "🚀 Prime for Study" ? (
          <b>***Bring your supplies, you are going to see cool things!***</b>
        ) : null}
      </li>
    );
  });

  return (
    <div>
      <h1>Observation Status of Space Phenomena</h1>
      <ul>{phenomena}</ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
