import React from 'react'
import {Link} from 'react-router-dom'
const Errorpage = ({setvalid}) => {
    return (
        <div>
            <div className="conatiner Error-cointainer">
                    <div className="Error-contianer-2 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="Error-contianer-content">
                            <h1 className="conent-items" >Error 404</h1>
                            <h2 className="conent-items">Quiz not Found!!</h2>
                            <h3 className="conent-items">Enter Valid Code</h3>
                            <Link to="/home"><button className="btn btn-primary" >Home</button></Link>
                            <Link to="/join"><button className="btn btn-primary" onClick={() => setvalid(2)}>Re-Enter Code</button></Link>
                        </div>
                    </div>
			</div>
        </div>
    )
}

export default Errorpage
