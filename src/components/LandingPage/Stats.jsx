import "./Stats.css"

function StatCard({num,tag, bgcolor}){
    return(
        <div className="stat-card" style={{background: bgcolor}}>
            <div className="num-stat">{num}</div>
            <div className="stat-tag">{tag}</div>
        </div>
    );
}
function Stats(){
    return(
        <>
        <div className="outer-container">
            <StatCard num={`0+`} tag="Active Students" bgcolor="#d5e6e1" />
            <StatCard num={`0+`} tag="Mentors" bgcolor="#ffb648" />
            <StatCard num={`0+`} tag="Teams Formed" bgcolor="#d5e6e1" />
        </div>

        </>
    );
}
export default Stats;