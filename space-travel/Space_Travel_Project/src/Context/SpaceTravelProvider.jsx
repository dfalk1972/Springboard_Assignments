import { useEffect, useState } from "react";
import { SpaceTravelContext } from "./SpaceTravelContext.jsx";
import SpaceTravelApi from "../services/SpaceTravelApi.js";

export function SpaceTravelProvider({ children }) {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [planets, setPlanets] = useState([]);

  async function getSpacecrafts() {
    try {
      const res = await SpaceTravelApi.getSpacecrafts();
      if (!res.isError) {
        setSpacecrafts(res.data);
      }
    } catch (err) {
      console.error("Unexpected error loading spacecrafts:", err);
    }
  }

  async function getPlanets() {
    try {
      const res = await SpaceTravelApi.getPlanets();
      if (!res.isError) {
        setPlanets(res.data);
      }
    } catch (err) {
      console.error("Unexpected error loading planets:", err);
    }
  }

  async function destroySpacecraftById(id) {
    try {
      const res = await SpaceTravelApi.destroySpacecraftById({ id });
      if (!res.isError) {
        await getSpacecrafts();
      }
    } catch (err) {
      console.error("Unexpected error destroying spacecraft:", err);
    }
  }

  async function sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    try {
      const res = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId,
      });
      if (!res.isError) {
        await getSpacecrafts();
        await getPlanets();
      }
    } catch (err) {
      console.error("Unexpected error sending Spacecraft:", err);
    }
  }

  async function buildSpacecraft({
    name,
    capacity,
    description,
    pictureUrl = undefined,
  }) {
    try {
      const res = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl,
      });
      if (!res.isError) {
        await getSpacecrafts();
      }
    } catch (err) {
      console.error("Unexpected error building spacecraft:", err);
    }
  }

  useEffect(() => {
    getSpacecrafts();
    getPlanets();
  }, []);

  return (
    <SpaceTravelContext.Provider
      value={{
        spacecrafts,
        planets,
        getSpacecrafts,
        getPlanets,
        destroySpacecraftById,
        buildSpacecraft,
        sendSpacecraftToPlanet,
      }}
    >
      {children}
    </SpaceTravelContext.Provider>
  );
}
