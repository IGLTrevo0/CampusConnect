import "./Profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!id) {
    return (
      <div className="profile-page">
        <h2>Your Profile Page</h2>
        <p>
          Logged-in profile wiring is pending backend integration.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div
        className="profile-banner"
        style={{
          background:
            "linear-gradient(135deg, #4f46ff 0%, #7c3aed 100%)",
        }}
      />

      <div className="profile-section">
        <div className="profile-info">
          <div
            className="profile-avatar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1 className="profile-name">
              {user.name}
            </h1>

            <p className="profile-subtitle">
              {user.branch || "Branch Not Added"}
              {user.year && ` • Year ${user.year}`}
            </p>

            <p className="profile-subtitle">
              {user.college}
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-message-btn">
            Message
          </button>

          {user.role === "mentor" && (
            <button className="profile-mentor-btn">
              Request Mentorship
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <h2>Bio</h2>
            <hr />
            <p>
              {user.bio || "No bio added yet."}
            </p>
          </div>

          <div className="profile-card">
            <h2>Links</h2>
            <hr />

            {user.github && (
              <p>
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </p>
            )}

            {user.linkedin && (
              <p>
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </p>
            )}

            {user.portfolio && (
              <p>
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              </p>
            )}
          </div>

          <div className="profile-card">
            <div className="profile-skills-header">
              <h2>Skills</h2>
            </div>

            <div className="profile-skills">
              {user.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span key={skill}>
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>
          </div>
        </aside>

        <main>
          <div className="profile-card">
            <h2>Interests</h2>
            <hr />

            <div className="profile-skills">
              {user.interests?.length > 0 ? (
                user.interests.map((interest) => (
                  <span key={interest}>
                    {interest}
                  </span>
                ))
              ) : (
                <p>No interests added</p>
              )}
            </div>
          </div>

          {user.role === "mentor" && (
            <div className="profile-card">
              <h2>Achievements</h2>
              <hr />

              {user.achievements?.length > 0 ? (
                user.achievements.map(
                  (achievement, index) => (
                    <p key={index}>
                      • {achievement}
                    </p>
                  ),
                )
              ) : (
                <p>No achievements added</p>
              )}

              <br />

              <strong>
                Availability:
              </strong>{" "}
              {user.mentorAvailability}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}