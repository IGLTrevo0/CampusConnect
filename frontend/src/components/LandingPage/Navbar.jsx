import logo from "../../assets/Images/ccicon.png";
import "./Navbar.css";
import { useState, useEffect } from "react";

const WorkingTitle = "Campus Connect";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
    function handleResize(){
      if (window.innerWidth > 768){
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize",handleResize);
    return()=>{
      window.removeEventListener("resize",handleResize);
    };
  },[]);
  return (
    <>
      <nav className="navbar">
        <div className="name_img">
          <img src={logo} alt="Logo_cc" />
          <h1 className="title">{WorkingTitle}</h1>
        </div>
        <div className="nav-lists">
          <ul>
            <li>Search</li>
            <li>Mentors</li>
            <li>Teams</li>
            <li>Meet the Team</li>
          </ul>
        </div>
        <div className="buttons">
          <button className="login">Login</button>
          <button className="get-started">Get Started</button>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>⋮</div>
        {menuOpen && (
        <div className="mobile-dropdown">
          <ul>
            <li onClick={() => setMenuOpen(false)}>Search</li>
            <li onClick={() => setMenuOpen(false)}>Mentors</li>
            <li onClick={() => setMenuOpen(false)}>Teams</li>
            <li onClick={() => setMenuOpen(false)}>Meet the Team</li>
          </ul>
        </div>
      )}
      </nav>
      
    </>
  );
}

export default Navbar;
