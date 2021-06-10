import React from 'react'

const Listoptions = ({item,istrue}) => {
    return (
        <div className="col d-flex justify-content-between " style={{"border-bottom":"2px solid","padding":"1%"}}>
            <h5>{item}</h5>
             <h5>{istrue ? "Yes":"No"}</h5>
        </div>
    )
}

export default Listoptions
