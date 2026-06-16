import { useEffect, useState } from "react";
import axios from "axios";
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
    const [stats, setStats] = useState({ students: 0, mentors: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users");
                const users = res.data || [];
                const students = users.filter(u => u.role === "student").length;
                const mentors = users.filter(u => u.role === "mentor").length;
                setStats({ students, mentors });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, []);

    return(
        <>
        <div className="outer-container">
            <StatCard num={`${stats.students}+`} tag="Active Students" bgcolor="#d5e6e1" />
            <StatCard num={`${stats.mentors}+`} tag="Mentors" bgcolor="#ffb648" />
            {/* Kept static for now pending user decision on alternative metric */}
            <StatCard num={`0+`} tag="Teams Formed" bgcolor="#d5e6e1" />
        </div>
        </>
    );
}
export default Stats;