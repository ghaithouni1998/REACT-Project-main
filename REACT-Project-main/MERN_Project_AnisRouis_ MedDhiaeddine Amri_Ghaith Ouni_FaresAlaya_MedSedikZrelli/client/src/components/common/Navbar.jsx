import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      nav(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const glass = {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  };

  return (
    <nav className="flex items-center justify-between h-20 shadow-2xl pl-20 pr-20 sticky top-0" style={glass}>
      <div className="logo">
        <Link to="/">
          <h1 className="cursor-pointer text-2xl montserrat-font">Batta.tn</h1>
        </Link>
      </div>
      <div className="flex">
        <form className="rounded-full" onSubmit={handleSearch}>
          <div className="flex items-center gap-6">
          <Link to="/auctions/upcoming">
          <button
              type="submit"
              className="font-bold text-white bg-green-700 px-5 py-2 rounded-full"
            >
              Upcoming
            </button>
        </Link>
            {authenticated ? (
              <>
                <Link  to="/user-account">
                  <h3 className="font-bold">Account</h3>
                </Link>
                <Logout />
              </>
            ) : (
              <>
                <Link to="/register">
                  <h3 className="font-bold">Sign Up</h3>
                </Link>
                <Link to="/login">
                  <h3 className="font-bold mr-5">Sign In</h3>
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
