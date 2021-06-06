import React from 'react'

const Listoptions = ({item,istrue}) => {
    return (
        <div >
            {item} ===== {istrue ? "Yes":"No"}
        </div>
    )
}

export default Listoptions
