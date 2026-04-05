import "./MissionCard.css";
export default function MissionCard({
  id,
  name,
  status,
  crew,
  onUpdateStatus,
}) {
  return (
    <div className="MissionCard">
      <div className="MissionCard-Info">
        <h3>{name}</h3>
        <p>
          <b>Status:</b> {status}
        </p>
        <p>
          <b>Crew:</b> {crew.join(", ")}
        </p>
      </div>
      <div className="MissionCard-actions">
        {status === "Planned" && (
          <button onClick={() => onUpdateStatus(id, "Active")}>Launch</button>
        )}
        {status === "Active" && (
          <button onClick={() => onUpdateStatus(id, "Completed")}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
}
