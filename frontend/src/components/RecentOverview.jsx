import { useEffect, useState } from "react";
import axios from 'axios'
function RecentOverview() {
    const [recent,setRecent]=useState(null)
    useEffect(()=>{
        getActivity()
    },[])

    async function getActivity(){
        try {
            let res=await axios.get("http://localhost:8000/api/logs/recent-activity")
            console.log(res.data)
            setRecent(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (  
        <>
            <h1 className="section-heading">Recent Activity</h1>
            <div className="recent-container">
                {recent && recent.map((log)=>
                (
                    <div className="recent-activity-card" key={log._id}>
                        <h2 className="log-name">{log.interfaceName}</h2>
                        <p className="log-date">{log.timestamp.toLocaleString().split("T")[0]}</p>
                        <p className={`log-status ${log.status}`}>{log.status}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default RecentOverview;