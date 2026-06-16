import "./Profile.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { getme } from "../../services/authService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await getUserById(id);
          setUser(data);
        } else {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/auth");
            return;
          }
          const data = await getme(token);
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  if (loading) {
    return <h2 style={{textAlign: "center", marginTop: "100px"}}>Loading profile...</h2>;
  }

  if (!user) {
    return <h2 style={{textAlign: "center", marginTop: "100px"}}>User not found.</h2>;
  }

  return (
    <div className="profile-page">
      <div className="profile-banner-wrapper">
        <div className="profile-banner-gradient"></div>
      </div>

      <div className="profile-section">
        <div className="profile-info">
          {/* Avatar Placeholder: No avatar in schema currently */}
          <div className="profile-avatar-placeholder">
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>

          <div>
            <h1 className="profile-name">{user.name}</h1>
            {(user.branch || user.year) && (
              <p className="profile-subtitle">
                {user.branch && user.branch} {user.branch && user.year && "|"} {user.year && `Year ${user.year}`}
              </p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {/* Action buttons (future functionality placeholders) */}
          {/* <button className="profile-message-btn">Direct Message</button> */}
          {/* {user.role === "mentor" && <button className="profile-mentor-btn">Request Mentorship</button>} */}
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          {user.bio && (
            <div className="profile-card">
              <h2>Bio</h2>
              <hr />
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-card">
            <h2>Profile Info</h2>
            <hr />
            <div className="profile-stat-row">
              <span>Role</span>
              <strong style={{textTransform: "capitalize"}}>{user.role}</strong>
            </div>
            {user.college && (
              <div className="profile-stat-row">
                <span>College</span>
                <strong>{user.college}</strong>
              </div>
            )}
            {user.mentorAvailability && user.role === "mentor" && (
              <div className="profile-stat-row">
                <span>Availability</span>
                <strong style={{textTransform: "capitalize"}}>{user.mentorAvailability}</strong>
              </div>
            )}
            {(user.github || user.linkedin || user.portfolio) && (
              <div className="profile-links">
                {user.github && <a href={user.github} target="_blank" rel="noreferrer">GitHub</a>}
                {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                {user.portfolio && <a href={user.portfolio} target="_blank" rel="noreferrer">Portfolio</a>}
              </div>
            )}
          </div>

          {user.skills && user.skills.length > 0 && (
            <div className="profile-card">
              <div className="profile-skills-header">
                <h2>Skills</h2>
              </div>
              <div className="profile-skills">
                {user.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          )}
          
          {user.interests && user.interests.length > 0 && (
            <div className="profile-card">
              <div className="profile-skills-header">
                <h2>Interests</h2>
              </div>
              <div className="profile-skills">
                {user.interests.map((interest) => (
                  <span key={interest} style={{backgroundColor: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe"}}>{interest}</span>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main>
          {user.achievements && user.achievements.length > 0 && (
            <div className="profile-projects-section">
              <h1 className="profile-projects-title">Achievements</h1>
              <div className="profile-projects-grid" style={{gridTemplateColumns: "1fr"}}>
                {user.achievements.map((ach, idx) => (
                  <div key={idx} className="profile-project-card" style={{padding: "1.5rem"}}>
                    <h3 style={{margin: 0, fontSize: "20px"}}>{ach}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* FUTURE-PROOF ARCHITECTURE */}
          {/* 
            <div className="profile-projects-section">
              <h1 className="profile-projects-title">User Projects</h1>
              <p>Placeholder for future projects integration</p>
            </div>
            
            <div className="profile-projects-section">
              <h1 className="profile-projects-title">Team Memberships</h1>
              <p>Placeholder for future teams integration</p>
            </div>
          */}
        </main>
      </div>
    </div>
  );
}
