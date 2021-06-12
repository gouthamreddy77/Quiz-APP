import React from 'react'
import {Link} from 'react-router-dom'
const Home2 = () => {
    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-6  d-flex justify-content-around flex-column" style={{"height":"87vh","padding-left":"17%"}}>
                    <div className="d-flex justify-content-around flex-column  align-items-start" style={{"height":"35vh"}}>
                        <div><Link to="/dashboard">  <button className="btn btn-success">Dashboard</button> </Link></div>  
                        <div><Link to="/create">  <button className="btn btn-success">Createquiz</button> </Link></div>
                        <div><Link to="/join">  <button className="btn btn-success">JoinQuiz</button>   </Link></div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6  d-flex justify-content-around flex-column  align-items-center" >
                    <div  style={{"marginBottom":"5%","width":"50%"}}>
                        <h5>Created by</h5>
                        <h1>GOUTHAM REDDY LYAGALA</h1>
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
