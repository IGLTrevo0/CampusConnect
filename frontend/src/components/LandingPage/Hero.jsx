import { useNavigate } from "react-router-dom";
import SkillTag from "./SkillTag";
import "./Hero.css";
import Heroimg from "../../assets/Images/Heroimg.jpg";
import card1 from "../heroicons/card1.png";
import noacc from "../heroicons/noacc.png";
import bkt from "../heroicons/bkt.png";
import cybersec from "../heroicons/cybersec.png";
import uiux from "../heroicons/uiux.png";
import ml from "../heroicons/ml.png";
import react from "../heroicons/react.png";
import cloud from "../heroicons/cloud.png";

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="left-hero">
          <div className="topcard">
            <img src={card1} alt="graduation_cap_icon" />
            <h6>Built for Campus Colleboration</h6>
          </div>
          <div className="heading" id="hero-heading">
            <h1>
              FIND YOUR <span className="card2">PEOPLE</span>
              <br />
              BY THEIR <span className="card3">SKILLS</span>.
            </h1>
          </div>
          <p className="hero-description">
            Search for Mentors, project collaborators and hackathon teammates
            across university - based on what they actually build.
          </p>
          <div className="hero-buttons" id="herobtn">
            <button className="no-acc" onClick={() => navigate("/auth")}>
              <img src={noacc} alt="rightarrow" />
              Create your Profile
            </button>
            <button className="have-acc" onClick={() => navigate("/auth")}>
              I have an account
            </button>
          </div>
          <div className="popular-skills">
            <ul className="demo-skills">
              <SkillTag icon={ml} text="Machine Learning" bgColor="#cbffe4" />
              <SkillTag
                icon={cybersec}
                text="Cyber Security"
                bgColor="#fff9aa"
              />
              <SkillTag
                icon={react}
                text="FullStack Development"
                bgColor="#a5dfff"
              />
              <SkillTag icon={uiux} text="UI/UX" bgColor="#ffc8f9" />
              <SkillTag icon={bkt} text="BlockChain" bgColor="#e48bff" />
              <SkillTag icon={cloud} text="Cloud Computing" bgColor="#9df2ff" />
            </ul>
          </div>
        </div>
        <div className="right-hero">
          <img src={Heroimg} alt="Demo Image" />
        </div>
      </section>
    </>
  );
}
export default Hero;
