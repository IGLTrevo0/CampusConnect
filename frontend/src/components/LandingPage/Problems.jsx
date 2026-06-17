import "./Problems.css";
import ProblemCards from "./ProblemCards";

import {
  FaUserGraduate,
  FaCodeBranch,
  FaLaptopCode,
} from "react-icons/fa";

function Problems() {
  return (
    <section className="problems-section">
      <div className="problem-heading">
        <h1>THREE PROBLEMS.</h1>
        <h1 className="highlight">ONE NETWORK.</h1>
      </div>

      <div className="problem-description">
        College is hard enough. Finding the right people to build with
        shouldn't be hard too. CampusConnect helps students discover mentors,
        collaborators, and hackathon teammates based on skills and experience.
      </div>

      <div className="problem-cards">
        <ProblemCards
          title="Mentorship"
          description="Connect with seniors who have experience in your area of interest. Search by domain, technology, or skill and reach out directly for guidance and mentorship."
          icon={FaUserGraduate}
        />

        <ProblemCards
          title="Projects"
          description="Have an idea but missing the right teammates? Find collaborators with complementary skills, build stronger projects, and turn concepts into working products."
          icon={FaCodeBranch}
        />
        <ProblemCards
          title="Hackathon"
          description="Build balanced teams for hackathons by searching for the skills you need. Move beyond your immediate friend circle and collaborate with talented students across campus."
          icon={FaLaptopCode}
        />
      </div>
    </section>
  );
}
export default Problems;