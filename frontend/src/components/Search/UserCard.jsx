function UserCard({ user }) {
  return (
    <div className="user-card">
      <div
        className="card-banner"
        style={{
          background:
            user.role === "mentor"
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

        <div className="skill-tags">
          {user.skills?.map((skills) => (
            <span key={skills}>{skills}</span>
          ))}
        </div>
      </div>
      <div className="card-actions">
        <button className="connect-btn">Connect</button>
        <button className="profile-btn-card">View Profile</button>
      </div>
    </div>
  );
}
export default UserCard;
