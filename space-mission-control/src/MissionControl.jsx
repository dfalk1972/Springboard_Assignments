import MissionHeader from "./MissionHeader";
import MissionFilter from "./MissionFilter";
import MissionCard from "./MissionCard";
import { useState } from "react";

export default function MissionControl({ missions }) {
  const [filter, setFilter] = useState("All");
  const [missionList, setMissionList] = useState(missions);
  const statuses = [...new Set(missions.map((m) => m.status))];

  const filteredMissions =
    filter === "All"
      ? missionList
      : missionList.filter((m) => m.status === filter);

  function updateMissionStatus(id, newStatus) {
    setMissionList((oldMissions) =>
      oldMissions.map((mission) =>
        mission.id === id ? { ...mission, status: newStatus } : mission,
      ),
    );
  }
  return (
    <>
      <MissionHeader />
      <MissionFilter statuses={statuses} onFilter={setFilter} filter={filter} />
      <div className="MissionCardList">
        {filteredMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            id={mission.id}
            name={mission.name}
            status={mission.status}
            crew={mission.crew}
            onUpdateStatus={updateMissionStatus}
          />
        ))}
      </div>
    </>
  );
}
