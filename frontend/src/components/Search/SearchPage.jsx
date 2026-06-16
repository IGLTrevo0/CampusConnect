import "./Search.css";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import DiscoveryGrid from "./DiscoveryGrid";

// const mockUsers = [
//   {
//     _id: "1",
//     name: "Aditya Sharma",
//     branch: "CSE",
//     year: 2027,
//     role: "Students",
//     domain: "Frontend",
//     skills: ["React", "JavaScript", "Tailwind"],
//   },
//   {
//     _id: "2",
//     name: "Rahul Verma",
//     branch: "ECE",
//     year: 2026,
//     role: "Students",
//     domain: "AI/ML",
//     skills: ["Python", "TensorFlow", "Machine Learning"],
//   },
//   {
//     _id: "3",
//     name: "Priya Singh",
//     branch: "IT",
//     year: 2027,
//     role: "Students",
//     domain: "Design",
//     skills: ["Figma", "UI/UX", "Prototyping"],
//   },
//   {
//     _id: "4",
//     name: "Aman Gupta",
//     branch: "CSE",
//     year: 2025,
//     role: "Mentors",
//     domain: "Backend",
//     skills: ["Node.js", "Express", "MongoDB"],
//   },
//   {
//     _id: "5",
//     name: "Sarah Chen",
//     branch: "CSE",
//     year: 2024,
//     role: "Mentors",
//     domain: "AI/ML",
//     skills: ["Deep Learning", "PyTorch", "Data Science"],
//   },
//   {
//     _id: "6",
//     name: "Jordan Lee",
//     branch: "IT",
//     year: 2025,
//     role: "Mentors",
//     domain: "Frontend",
//     skills: ["React", "Next.js", "TypeScript"],
//   },
//   {
//     _id: "7",
//     name: "Neha Kapoor",
//     branch: "CSE",
//     year: 2028,
//     role: "Students",
//     domain: "Backend",
//     skills: ["Java", "Spring Boot", "SQL"],
//   },
//   {
//     _id: "8",
//     name: "Rohan Mehta",
//     branch: "ECE",
//     year: 2026,
//     role: "Students",
//     domain: "Frontend",
//     skills: ["HTML", "CSS", "JavaScript"],
//   },
// ];

function SearchPage() {
  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState(mockUsers);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUser();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesRole = selectedRole === "All" || user.role === selectedRole;

    const matchesDomain =
      selectedDomain === "" || user.domain === selectedDomain;

    return matchesSearch && matchesRole && matchesDomain;
  });
  const displayedUsers = filteredUsers.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(3);
  }, [searchTerm, selectedRole, selectedDomain]);
  return (
    <div className="search-page">
      <section className="search-hero">
        <h1>
          Discover <span className="first-span">Talent</span> on Campus.
        </h1>
        <p>
          Find mentors, project collaborators, and hackathon teammates based on
          verified skills and real experience.
        </p>

        <div className="search-box">
          <span className="search-icon"></span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by skill, domain, or name..."
          />
          <button className="search-btn">Search</button>
        </div>
      </section>
      <section className="discovery-section">
        <div className="sidebar">
          <h3>Roles</h3>


          <div className="role-filters">
            <button
              className={selectedRole === "All" ? "active-role" : ""}
              onClick={() => setSelectedRole("All")}
            >
              All
            </button>

            <button
              className={selectedRole === "student" ? "active-role" : ""}
              onClick={() => setSelectedRole("student")}
            >
              Students
            </button>

            <button
              className={selectedRole === "mentor" ? "active-role" : ""}
              onClick={() => setSelectedRole("mentor")}
            >
              Mentors
            </button>
          </div>

          <h3>Domains</h3>
          <div className="domain-tags">
            <button
              className={selectedDomain === "Frontend" ? "active-domain" : ""}
              onClick={() =>
                setSelectedDomain(
                  selectedDomain === "Frontend" ? "" : "Frontend",
                )
              }
            >
              Frontend
            </button>

            <button
              className={selectedDomain === "Backend" ? "active-domain" : ""}
              onClick={() =>
                setSelectedDomain(selectedDomain === "Backend" ? "" : "Backend")
              }
            >
              Backend
            </button>

            <button
              className={selectedDomain === "AI/ML" ? "active-domain" : ""}
              onClick={() =>
                setSelectedDomain(selectedDomain === "AI/ML" ? "" : "AI/ML")
              }
            >
              AI/ML
            </button>

            <button
              className={selectedDomain === "Design" ? "active-domain" : ""}
              onClick={() =>
                setSelectedDomain(selectedDomain === "Design" ? "" : "Design")
              }
            >
              Design
            </button>
            <button
              className="clear-btn"
              onClick={() => {
                setSelectedRole("All");
                setSelectedDomain("");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <DiscoveryGrid
          filteredUsers={displayedUsers}
          totalUsers={filteredUsers.length}
          onLoadMore={() => setVisibleCount((prev) => prev + 6)}
          hasMore={visibleCount < filteredUsers.length}
        />
      </section>
    </div>
  );
}
export default SearchPage;
