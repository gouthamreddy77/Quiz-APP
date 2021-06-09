import React from 'react'
import {useHistory} from 'react-router-dom'
const Createdcard = ({quiztitle,questions,quizid,responses}) => {
    const history = useHistory()

    const handle = ()=>{
        history.push(`/responses/${quizid}`);
    }
    
    return (
        <>  
                <div className="col">
                    <div className="card  rounded-3 shadow-lg mb-5  rounded p-3 "  style={{"width": "24rem" , "height": "17rem"}}>
                        <div className="card-body">
                            <h5 className="card-header mb-4 fw-bold">Title:{quiztitle}</h5>

                                <div ><p className="card-title mb-4" >Questions: {questions}</p></div>
                                <div><p className="card-text mb-4">Code: {quizid}</p></div>
                                <div>
                                    <p className="card-text" style={{"cursor":"pointer","color":"green","borderBottom":"2px solid green","display":"inline"}} onClick={handle}>
                                        Responses: {responses}
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Createdcard