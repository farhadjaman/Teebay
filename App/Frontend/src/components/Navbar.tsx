import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import {isTokenExpired} from "@/utils/tokenUtils.ts";
import {useReactiveVar} from "@apollo/client";
import {tokenVar} from "@/cache.ts";

export default function Navbar() {
  const navigate = useNavigate();
  const token = useReactiveVar(tokenVar);
  const isAuthenticated = token !== null && !isTokenExpired(token);


  const handleSignOut = () => {
    localStorage.removeItem("token");
    tokenVar(null);
    navigate("/");
  };

  const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
      `w-auto ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`;

  const getButtonClasses = ({ isActive }: { isActive: boolean }) =>
      `px-6 py-2 text-base font-semibold rounded-full border-2 transition-all ${
          isActive
              ? "bg-accent/20 border-accent hover:bg-accent/30"
              : "hover:bg-accent/10"
      }`;

  return (
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left-side navigation links */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className={getLinkClasses} end>
              {({ isActive }) => (
                  <Button variant="outline" className={getButtonClasses({ isActive })}>
                    All Products
                  </Button>
              )}
            </NavLink>

            <NavLink to="/dashboard/my-products" className={getLinkClasses}>
              {({ isActive }) => (
                  <Button variant="outline" className={getButtonClasses({ isActive })}>
                    My Products
                  </Button>
              )}
            </NavLink>

            <NavLink to="/dashboard/history" className={getLinkClasses}>
              {({ isActive }) => (
                  <Button variant="outline" className={getButtonClasses({ isActive })}>
                    Transaction History
                  </Button>
              )}
            </NavLink>
          </div>

          {/* Right-side authentication button */}
          <div>
            {isAuthenticated ? (
                <Button className='rounded-lg' variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
            ) : (
                <NavLink to="/login">
                  <Button className='rounded-lg' variant="outline">Sign In</Button>
                </NavLink>
            )}
          </div>
        </div>
      </nav>
  );
}
