import React from 'react'

const Listquestions = ({questions,length}) => {
    return (
        <div>
            <div className="row">
                <div className=" col-6 disp-question">
                    <h4 >{questions}</h4>
                </div>
                <div className="col-6 disp-length">
                    <h4 style={{"textAlign":"right"}}>{length}</h4> 
                </div>
            </div>
        </div>
    )
}

export default Listquestions
