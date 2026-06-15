import logo from "./assets/Images/ccicon.png";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WorkingTitle = "Campus Connect";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      navigate(path);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="name_img">
          <img src={logo} alt="Logo_cc" />
          <h1 className="title" onClick={() => navigate("/")}>
            {WorkingTitle}
          </h1>
        </div>
        <div className="nav-lists">
          <ul>
            <li onClick={() => handleProtectedNavigation("/search")}>Search</li>
            {isLoggedIn ? (
              <>
                <li onClick={() => handleProtectedNavigation("/search")}>
                  Dashboard
                </li>
                <li onClick={() => handleProtectedNavigation("/search")}>
                  Posts
                </li>
              </>
            ) : (
              <>
                <li>Dashboard</li>
                <li>Post</li>
              </>
            )}

            <li>Meet the Team</li>
          </ul>
        </div>
        <div className="buttons">
          {!isLoggedIn ? (
            <>
              <button
                className="get-started"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="profile-dropdown-wrapper">
              <button
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                Profile ▼
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate("/search")}>
                    View Profile
                  </button>
                  <button onClick={() => navigate("/search")}>Dashboard</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ⋮
        </div>
        {menuOpen && (
          <div className="mobile-dropdown">
            <ul>
              {isLoggedIn ? (
                <>
                  <li
                    onClick={() => {
                      navigate("/search");
                      setMenuOpen(false);
                    }}
                  >
                    Search
                  </li>
                  <li
                    onClick={() => {
                      navigate("/search");
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </li>

                  <li
                    onClick={() => {
                      navigate("/search");
                      setMenuOpen(false);
                    }}
                  >
                    Posts
                  </li>

                  <li onClick={() => setMenuOpen(false)}>Meet the Team</li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(false);
                    }}
                  >
                    Search
                  </li>
                  <li onClick={() => setMenuOpen(false)}>Dashboard</li>
                  <li onClick={() => setMenuOpen(false)}>Post</li>
                  <li onClick={() => setMenuOpen(false)}>Meet the Team</li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
