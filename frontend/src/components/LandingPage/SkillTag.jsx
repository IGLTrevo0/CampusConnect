function SkillTag({icon, text, bgColor}){
    return(
        <li className="hero-skill-tag" style={{backgroundColor: bgColor}}>
            <img src={icon} alt={text} />
            {text}
        </li>
    );
}
export default SkillTag;