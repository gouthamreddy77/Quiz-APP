import React from 'react'

const Attemptedcard = ({title,questions,score}) => {
    return (
        <div className="col">
            <div className="card rounded-3 shadow-lg mb-5  rounded p-3"  style={{"width": "24rem" , "height": "17rem"}}>
                <div className="card-body">
                    <h5 className="card-header mb-5 fw-bold">Title:{title}</h5>

                        <div ><p className="card-title mb-5" >Questions: {questions}</p></div>
                        <div><p className="card-text ">Score: {score}</p></div>
                    
                </div>
            </div>
        </div>
    )
}

export default Attemptedcard
