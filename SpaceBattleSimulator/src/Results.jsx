import "./Results.css";
export default function Results({ status }) {
  let message = "Engage the Enemy! 🏏";
  if (status === "p1wins")
    message = "🏆 Congratulations Player 1 — You've Won!";
  if (status === "p2wins")
    message = "🏆 Congratulations Player 2 — You've Won!";
  if (status === "draw") message = "☠️ It's a Draw - Both players destroyed!";

  return <div className="Results">{message}</div>;
}
