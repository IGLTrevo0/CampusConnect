import "./Search.css";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";

function SearchPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="search-page">
      <section className="search-hero">
        <h1>
          Discover <span>Talent</span> on Campus.
        </h1>
        <p>
          Find mentors, project collaborators, and hackathon teammates based on
          verified skills and real experience.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by skill, domain, or name..."
          />
          <button>Search</button>
        </div>
      </section>
      <section className="discovery-section">
        <div className="sidebar">
          <h3>Roles</h3>

          <label>
            <input type="checkbox" />
            All
          </label>
          <label>
            <input type="checkbox" />
            Students
          </label>

          <label>
            <input type="checkbox" />
            Mentors
          </label>

          <h3>Domains</h3>
          <div className="domain-tags">
            <button>Frontend</button>
            <button>Backend</button>
            <button>AI/ML</button>
            <button>Design</button>
          </div>
        </div>

        <div className="discovery-content">
          <h2>Discovery</h2>
          <div className="cards-grid">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default SearchPage;
