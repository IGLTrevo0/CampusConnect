import "./Marquee.css"

function Marquee(){
    const items=["Build A Team",
                "Post A Project",
                "Win a Hackathon",
                "Find A Mentor",
                "Discover Skills"];
    

    return(
        <section className="marquee">
            <div className="marquee-track">
                {items.map((item,index)=>(
                    <span key={index}>★{item}</span>
                ))}
                {items.map((item,index)=>(
                    <span key={`duplicate-${index}`}>★{item}</span>
                ))}
            </div>
        </section>
    );
}

export default Marquee;