import "./Profile.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/userService";
import { getMe } from "../../services/authService";
import ProjectCard from "./ProjectCard";

// From lucide-react
import {
  Globe,
  GraduationCap,
  Settings,
  Zap,
  MessageSquare,
  Handshake,
  Star,
  Users,
  Trophy,
} from "lucide-react";

// From react-icons
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const data = id ? await getUserById(id) : await getMe();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="profile-loading-error">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-loading-error">
        <h2>{error || "Profile not found"}</h2>
      </div>
    );
  }

  const isOwnProfile = !id;

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="profile-banner-gradient" />
      </div>

      <div className="profile-section">
        <div className="profile-info">
          {user.profilePicture ? (
            <img
              className="profile-avatar"
              src={user.profilePicture}
              alt={user.name}
            />
          ) : (
            <div className="profile-avatar profile-avatar-placeholder">
              {user.name?.charAt(0)}
            </div>
          )}

          <div className="profile-identity-text">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-subtitle">
              <GraduationCap size={18} className="subtitle-icon" />
              <span>
                {user.branch || "Branch Not Added"}
                {user.year && `, Class of '${String(user.year).slice(-2)}`}
                {user.college && ` @ ${user.college}`}
              </span>
            </p>
          </div>
        </div>

        <div className="profile-actions">
          {isOwnProfile ? (
            <button
              className="profile-message-btn"
              onClick={() => navigate("/complete-profile")}
            >
              <Settings size={16} strokeWidth={2.5} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                className="profile-mentor-btn"
                onClick={() => alert("Connection request sent!")}
              >
                <Zap size={16} strokeWidth={2.5} fill="currentColor" /> Connect
              </button>

              <button className="profile-message-btn">
                <MessageSquare size={16} strokeWidth={2.5} /> Direct Message
              </button>

              {user.role === "alumni" && (
                <button className="profile-mentor-btn">
                  <Handshake size={16} strokeWidth={2.5} /> Request Mentorship
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <h2>Bio</h2>
            <hr />
            <p>
              {user.bio || "No bio added yet. Click edit profile to add yours!"}
            </p>
          </div>

          {(user.github || user.linkedin || user.portfolio) && (
            <div className="profile-card">
              <h2>Links</h2>
              <hr />
              <div className="profile-social-icons">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-social-link"
                    title="GitHub Profile"
                  >
                    <FaGithub />
                    <span>
                      {user.github
                        .replace("https://github.com/", "")
                        .replace("http://github.com/", "")
                        .replace(/\/$/, "")}
                    </span>
                  </a>
                )}

                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-social-link"
                    title="LinkedIn Profile"
                  >
                    <FaLinkedin />
                    <span>LinkedIn Profile</span>
                  </a>
                )}

                {user.portfolio && (
                  <a href={user.portfolio} className="profile-social-link">
                    <Globe size={18} />
                    <span>{user.portfolio}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="profile-card">
            <h2>Reputation</h2>
            <hr />
            <div className="profile-stat-row">
              <span className="stat-label">
                <Star size={16} className="stat-icon" strokeWidth={2.5} />{" "}
                Mentorships Given
              </span>
              <strong>{user.role === "alumni" ? "12" : "0"}</strong>
            </div>
            <div className="profile-stat-row">
              <span className="stat-label">
                <Users size={16} className="stat-icon" strokeWidth={2.5} />{" "}
                Teams Led
              </span>
              <strong>5</strong>
            </div>
            <div className="profile-stat-row">
              <span className="stat-label">
                <Trophy size={16} className="stat-icon" strokeWidth={2.5} />{" "}
                Achievements Tracker
              </span>
              <strong>{user.achievements?.length || 0}</strong>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-skills-header">
              <h2>Skills</h2>
              {!isOwnProfile && <span className="endorse-link">Endorse</span>}
            </div>
            <hr />
            <div className="profile-skills">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill) => <span key={skill}>{skill}</span>)
              ) : (
                <p className="no-data-text">No technical skills added yet.</p>
              )}
            </div>
          </div>
        </aside>

        <main className="profile-projects-section">
          <h2 className="profile-projects-title">Projects & Work</h2>

          {user.projects && user.projects.length > 0 ? (
            <div className="profile-projects-grid">
              {user.projects.map((project, index) => (
                <ProjectCard
                  key={project._id || index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  badge={project.badge}
                />
              ))}
            </div>
          ) : (
            <div className="profile-card project-placeholder-card">
              <p>No projects linked to this profile yet.</p>
              {isOwnProfile && (
                <button
                  className="profile-mentor-btn"
                  style={{ marginTop: "15px", justifyContent: "center" }}
                  onClick={() =>
                    alert("GitHub Sync integration framework goes here next!")
                  }
                >
                  <Zap size={16} strokeWidth={2.5} fill="currentColor" />{" "}
                  Connect GitHub Repository
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
