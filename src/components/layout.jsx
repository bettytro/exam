import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.webp";
import { testToken } from "../helpers/apidata";
import { getUser, logoutUser } from "../helpers/usercontroller";
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchbar";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userdata = await getUser();
      setUser(userdata.user);
    };
    if (localStorage.getItem("token")) {
      testToken().then((data) => {
        if (data.error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      });
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    logoutUser();
    setUser(null);
    navigate(window.location.pathname);
  };
  const showSearchBar = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  const hideSearchBar = () => {
    setShowSearch(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-title p-8">
        <div className="flex md:flex-row flex-col items-center justify-between mx-auto max-w-[1600px]">
          <Link to="/" title="Holidaze - To the homepage">
            <img
              src={logo}
              alt="holidaze logo - to the homepage"
              className="h-12"
            />
          </Link>
          <nav>
            <ul className="flex flex-wrap items-center justify-center text-xs md:text-md mt-4 md:mt-0 space-x-4">
              <li>
                <Link to="/venues" className="hover:underline">
                  All Venues
                </Link>
              </li>
              {user && (
                <>
                <li>
                  <Link to="/bookings" className="hover:underline">
                    My Bookings
                  </Link>
                </li>
              <li>
                <p
                  onClick={showSearchBar}
                  className="hover:underline cursor-pointer"
                  >
                  Search
                </p>
              </li>
              </>
                )}
              {!user && (
                <>
                  <li>
                    <Link to="/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register-vm" className="hover:underline">
                      List your own
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <p onClick={handleLogout} className="hover:underline">
                      Logout
                    </p>
                  </li>
                  <li className="w-full mt-4 md:mt-0 md:w-auto">
                    <Link
                      to={`/profile/${user.name}`}
                      className="flex bg-title text-white px-3 py-2 rounded gap-2 items-center hover:underline"
                    >
                      <img
                        src={user.avatar.url}
                        alt={user.avatar.alt}
                        className="h-8 w-8 rounded-full"
                      />
                      <p>{user.name}</p>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        {showSearch && <SearchBar onClose={hideSearchBar} />}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-primary text-sec p-8">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-12 md:flex-row items-center py-8 justify-between">
          <div className="flex flex-col basis-1/3">
            <h2 className="text-2xl mb-2 font-black">Get in touch</h2>
            <p>123 Main St</p>
            <p>+47 123 45 789</p>
            <p>post@webshop.dev</p>
          </div>
          <div className="flex flex-col underline text-center basis-1/3">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms and conditions</Link>
          </div>
          <div className="basis-1/3 flex flex-col text-center md:text-right">
            <h2 className="text-2xl mb-2 font-black">Careers</h2>
            <p>Join our team!</p>
            <p>We have a wide selection of positions available</p>
            <a className="underline" href="mailto:post@webshop.dev">
              Send us an email today
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
