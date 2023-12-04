import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default root;
