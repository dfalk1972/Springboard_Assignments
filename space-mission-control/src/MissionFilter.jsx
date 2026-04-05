import "./MissionFilter.css";
export default function MissionFilter({ statuses, onFilter, filter }) {
  return (
    <div className="MissionFilter">
      <button
        className={filter === "All" ? "active" : ""}
        onClick={() => onFilter("All")}
      >
        All
      </button>

      {statuses.map((status) => {
        const isActive = filter === status;
        return (
          <button
            key={status}
            className={isActive ? "active" : ""}
            onClick={() => onFilter(status)}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
