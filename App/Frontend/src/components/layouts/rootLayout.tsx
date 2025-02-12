import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";

export const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </div>
  );
};
