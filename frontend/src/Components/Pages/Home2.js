import React from 'react'
import {Link} from 'react-router-dom'
const Home2 = () => {
    return (
        <>
            <div className="row home">
                <div className="col-sm-12 col-md-6  d-flex justify-content-around flex-column" style={{"height":"87vh"}}>
                    <div className="d-flex justify-content-around flex-column  align-items-center" style={{"height":"50vh"}}>
                        <div className="text-white fs-1"><span className="fw-bold">Quiz</span>App</div>
                        <div><Link to="/dashboard">  <button className="btn  d-button">DASHBOARD</button> </Link></div>  
                        <div><Link to="/create">  <button className="btn  d-button">CREATE QUIZ</button> </Link></div>
                        <div><Link to="/join">  <button className="btn  d-button">JOIN QUIZ</button>   </Link></div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6  d-flex justify-content-around flex-column  align-items-center " style={{"height":"87vh"}}>
                    <div  className="d-flex justify-content-around flex-column  align-items-center " style={{"marginBottom":"5%","width":"50%","color":"white","height":"50vh"}}>
                        <h5 >Created by</h5>
                        <h1>GOUTHAM REDDY</h1>
                        <h3>Users can able to
                        Create and Join the Quiz
                        and also able to view the Responses</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home2
