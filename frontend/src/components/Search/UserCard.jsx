import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendConnectionRequest } from "../../services/connectionService";

function UserCard({ user }) {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const [connectMsg, setConnectMsg] = useState("");

  const handleConnect = async () => {
    setConnecting(true);
    setConnectMsg("");
    try {
      await sendConnectionRequest(user._id);
      setConnectMsg("Request sent!");
    } catch (error) {
      setConnectMsg(error.response?.data?.message || "Failed to send request");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="user-card">
      <div
        className="card-banner"
        style={{
          background:
            user.role === "alumni"
              ? "linear-gradient(135deg, #ffb347, #ffcc33)"
              : "linear-gradient(135deg, #4facfe, #00f2fe)",
        }}
      ></div>
      <div className="role-badge">{user.role}</div>
      <div className="card-avatar"></div>
      <div className="card-content">
        <h3>{user.name}</h3>
        <p>
          {user.branch} • Graduation {user.year}
        </p>
        {user.domain && <p>{user.domain}</p>}

        <div className="skill-tags">
          {user.skills?.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="card-actions">
        <button
          className="connect-btn"
          onClick={handleConnect}
          disabled={connecting}
        >
          {connecting ? "Sending..." : "Connect"}
        </button>
        <button
          className="profile-btn-card"
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          View Profile
        </button>
        {connectMsg && (
          <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>{connectMsg}</p>
        )}
      </div>
    </div>
  );
}

export default UserCard;
