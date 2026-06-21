import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.jsx";
import SpacecraftsPage from "../Pages/SpacecraftsPage/SpacecraftsPage.jsx";
import PlanetsPage from "../Pages/PlanetsPage/PlanetsPage.jsx";
import SpacecraftPage from "../Pages/SpacecraftPage/SpacecraftPage.jsx";
import ConstructionPage from "../Pages/ConstructionPage/ConstructionPage.jsx";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spacecrafts" element={<SpacecraftsPage />} />
      <Route path="/spacecraft/:id" element={<SpacecraftPage />} />
      <Route path="/construct" element={<ConstructionPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
