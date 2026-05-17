import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function Layout({ celestialObjects }) {
  return (
    <>
      <NavBar celestialObjects={celestialObjects} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
