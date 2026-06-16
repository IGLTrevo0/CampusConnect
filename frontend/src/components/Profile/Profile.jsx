import "./Profile.css";
import alex from "./assets/alex.jpg";
import banner from "./assets/banner.jpg";
import project1 from "./assets/project1.jpg";
import project2 from "./assets/project2.jpg";
export default function Profile() {
  const user = {
    name: "Alex Carter",
    title: "Computer Science Student",
    university: "VIT Chennai",
    bio: "Passionate about web development, hackathons, and building products that solve real problems.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "UI/UX"],
    reputation: {
      mentorships: 12,
      teamsLed: 5,
      hackathons: 3,
    },
  };

  const projects = [
    {
      title: "Campus Map 3D",
      description:
        "An interactive 3D map of the campus built for incoming freshmen to find classes easily.",
      image: project1,
      tags: ["ThreeJS", "React"],
    },
    {
      title: "StudyBuddy App",
      description:
        "A matching platform that pairs students based on study habits and course load.",
      image: project2,
      tags: ["Flutter", "Firebase"],
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-banner-wrapper">
        <img src={banner} alt="banner" className="profile-banner" />
      </div>

      <div className="profile-section">
        <div className="profile-info">
          <img src={alex} alt="Alex" className="profile-avatar" />

          <div>
            <h1 className="profile-name">{user.name}</h1>

            <p className="profile-subtitle">
              {user.title} | {user.university}
            </p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-message-btn">Direct Message</button>

          <button className="profile-mentor-btn">Request Mentorship</button>
        </div>
      </div>

      <div className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <h2>Bio</h2>

            <hr />

            <p>{user.bio}</p>
          </div>

          <div className="profile-card">
            <h2>Reputation</h2>

            <hr />

            <div className="profile-stat-row">
              <span>Mentorships Given</span>
              <strong>{user.reputation.mentorships}</strong>
            </div>

            <div className="profile-stat-row">
              <span>Teams Led</span>
              <strong>{user.reputation.teamsLed}</strong>
            </div>

            <div className="profile-stat-row">
              <span>Hackathons Won</span>
              <strong>{user.reputation.hackathons}</strong>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-skills-header">
              <h2>Skills</h2>

              <span>Explore</span>
            </div>

            <div className="profile-skills">
              {user.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </aside>

        <main>
          <h1 className="profile-projects-title">Projects & Work</h1>

          <div className="profile-projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="profile-project-card">
                <img src={project.image} alt={project.title} />

                <div className="profile-project-body">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="profile-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
