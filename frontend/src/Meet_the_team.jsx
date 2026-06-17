import "./Meet_The_Team.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Aditya Pratap Singh Jadon aka Adi",
    bio: "For the love of Frontend.",
    image: "",
    github: "https://github.com/Aditya-Pratap-Singh-Jadon",
    linkedin: "https://www.linkedin.com/in/aditya-pratap-singh-jadon-80559b321",
  },
  {
    name: "Sithi Vignesh aka THUNDER",
    bio: "It's never me, myself and I. it's always us, ourselves and we!",
    image: "",
    github: "https://github.com/Sithi-Vignesh",
    linkedin: "https://linkedin.com/in/sithi-vignesh",
  },
  {
    name: "Sahil Shah",
    bio: ".",
    image: "",
    github: "https://github.com/IGLTrevo0",
    linkedin: "https://www.linkedin.com/in/sahil-shah-0785a9339?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Monijeeta",
    bio: ".",
    image: "",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
  },
];

function MeetTheTeam() {
  return (
    <div className="team-page">
      <div className="team-header">
        <h1>
          Meet The <span>Team</span>
        </h1>

        <p>
          The builders behind CampusConnect. A platform created to help students
          discover mentors, collaborators, and teammates across campus.
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.name}>
            <img src={member.image} alt={member.name} />

            <h3>{member.name}</h3>

            <p className="team-role">{member.role}</p>

            <p className="team-bio">{member.bio}</p>

            <div className="team-links">
              <a href={member.github} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>

              <a href={member.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetTheTeam;
