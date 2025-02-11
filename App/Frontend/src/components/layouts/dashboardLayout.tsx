import { NavLink, Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div>
      <header>
        <nav>
          {/* Tabs for Dashboard. Using NavLink for active styling */}
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
          >
            All Products
          </NavLink>
          <NavLink
            to="my-products"
            className={({ isActive }) => (isActive ? "tab active" : "tab")}
          >
            My Products
          </NavLink>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
