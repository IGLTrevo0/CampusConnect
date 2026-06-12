import logo from "../../assets/Images/ccicon.png";
import "./Navbar.css";

const WorkingTitle = "Campus Connect";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="name_img">
          <img src={logo} alt="Logo_cc"/>
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
      </nav>
    </>
  );
}

export default Navbar;