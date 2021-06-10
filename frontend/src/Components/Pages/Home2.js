import React from 'react'
import {Link} from 'react-router-dom'
const Home2 = () => {
    return (
        <>
            <div className="Home2">
                        <div className="conatiner   d-flex Home2-container">
                            <div className="conatiner conatiner-left " >
                                <div><Link to="/dashboard">  <button className="btn btn-success">Dashboard</button> </Link></div>  
                                <div><Link to="/create">  <button className="btn btn-success">Createquiz</button> </Link></div>
                                <div><Link to="/join">  <button className="btn btn-success">JoinQuiz</button>   </Link></div>
                            </div>
                            <div className="conatiner conatiner-right p-5 " >
                                <div>
                                    <h5>Created by</h5>
                                    <h1>GOUTHAM REDDY <br/>LYAGALA</h1>
                                    <h2>Users can able to<br/> 
                                    Create and Join the Quiz<br/>
                                    and also able to view the Responses</h2>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default Home2
