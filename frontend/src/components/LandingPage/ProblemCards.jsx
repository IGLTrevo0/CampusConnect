import "./ProblemCards.css";
function ProblemCards({ title, description, icon: Icon }) {
  return (
    <div className="problem-card">
      <div className="icon">
        <Icon size={30} />
      </div>

      <h2 className="problem-card-title">{title}</h2>
      <p className="problem-card-description">{description}</p>
    </div>
  );
}
export default ProblemCards;