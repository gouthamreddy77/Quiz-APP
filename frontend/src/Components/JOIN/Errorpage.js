import React from 'react'
import {Link} from 'react-router-dom'
const Errorpage = ({setvalid}) => {
    return (
        <>
            <div className="conatiner d-flex align-items-center justify-content-center" style={{"height":"91vh"}}>
                
                <div className="row" style={{"height":"62%","width":"90%"}}>
                    <div className="col-sm-12 col-lg-6 offset-lg-3  d-flex flex-column justify-content-around shadow-lg py-3">
                            <h1 className="text-center fs-1 fw-bold" >Error 404</h1>
                            <h2 >Quiz not Found!!</h2>
                            <h2 >Enter Valid Code</h2>
                            <div className=""  style={{"margin":"0 auto","display":"inline"}}>
                                <Link to="/home"><button className="btn d-button" >HOME</button></Link>
                            </div>
                            <div className="" style={{"margin":"0 auto","display":"inline"}}>
                                <Link to="/join"><button className="btn d-button" onClick={() => setvalid(2)}>RE-ENTER CODE</button></Link>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Errorpage
