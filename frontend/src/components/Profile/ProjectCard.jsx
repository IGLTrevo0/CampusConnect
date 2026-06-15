export default function ProjectCard({ title, description }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <div className="tags">
        <span>React</span>
        <span>UI/UX</span>
      </div>
    </div>
  );
}