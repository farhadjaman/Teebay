import { NavLink, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";

export const DashboardLayout = () => {
  return (
    <div>
    <Navbar/>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
