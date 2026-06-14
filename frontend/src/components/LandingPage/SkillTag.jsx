function SkillTag({icon, text, bgColor}){
    return(
        <li style={{backgroundColor: bgColor}}>
            <img src={icon} alt={text} />
            {text}
        </li>
    );
}
export default SkillTag;