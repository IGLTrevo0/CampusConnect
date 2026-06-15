function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="card-banner"></div>
      {/* <div className="role-badge">STUDENT</div> */}
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
      <button className="connect-btn">Connect</button>
    </div>
  );
}
export default UserCard;
