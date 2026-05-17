import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Homepage from "./Pages/Homepage";
import ContentPage from "./Pages/ContentPage";
import PageNotFound from "./Pages/PageNotFound";
import "./App.css";

export default function App() {
  const celestialObjects = [
    {
      id: "mars",
      name: "Mars",
      info: `Mars is the fourth planet from the Sun and a cold, dry, rocky desert known as the "Red Planet"due to iron oxide (rust) in its soil. Roughly half the size of Earth, it features thin atmosphere, massive volcanoes, deep canyons, and polar ice caps, and is explored by numerous rovers`,
    },
    {
      id: "venus",
      name: "Venus",
      info: `Venus is the second planet from the Sun and Earth’s closest neighbor, often called Earth's "twin" due to its similar size and density. As the hottest planet in our solar system, with surface temperatures  capable of melting lead, it has a thick, toxic atmosphere of carbon dioxide and sulfuric acid. It rotates backward and exceptionally slowly compared to other planets`,
    },
    {
      id: "orionNebula",
      name: "Orion Nebula",
      info: `The Orion Nebula (M42) is a massive, bright, diffuse nebula located about 1,350 light-years away in the constellation Orion's sword. As the closest large star-forming region to Earth, it is a stellar nursery filled with dust, gas, and thousands of young, hot stars, visible to the naked eye as a hazy smudge.`,
    },
    {
      id: "andromedaGalaxy",
      name: "Andromeda Galaxy",
      info: `The Andromeda Galaxy (M31) is the nearest large spiral galaxy to the Milky Way, located approximately 2.5 million light-years away. As the largest galaxy in our Local Group, it contains an estimated 1 trillion stars and is visible to the naked eye as a fuzzy patch in the northern sky. It is moving toward our galaxy for a predicted collision in 4–5 billion years`,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout celestialObjects={celestialObjects} />}>
          <Route path="/" element={<Homepage />} />

          <Route
            path="/:id"
            element={<ContentPage celestialObjects={celestialObjects} />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
