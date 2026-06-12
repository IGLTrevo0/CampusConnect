import "./ProblemCards.css";
function ProblemCards({title, description, icon}){
    return(
        <div className="problem-card">
        <div className="icon">
            <img src={icon} alt={title}/>
        </div>
        <h2 className="problem-card-title">{title}</h2>
        <p className="problem-card-description">{description}</p>
        </div>
    );
}
export default ProblemCards;