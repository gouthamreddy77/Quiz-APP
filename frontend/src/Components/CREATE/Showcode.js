import React from 'react'
import {Modal} from 'react-responsive-modal'
import {Link} from 'react-router-dom'
const Showcode = ({id}) => {
    return (
        <div>
            <Modal open={true}  center showCloseIcon={false} closeOnOverlayClick={false} closeOnEsc={false}>
                <div className="continer showcode-container">
                <div><h1>Quiz Created Sucessfully</h1></div>
                    <div><h3>Share The Code With Your Students...</h3></div>
                    <div><input type="text" value={id} readOnly></input></div>
                    <div><Link to="/home"><button className="btn btn-info btn-lg">Home</button></Link></div>
                    <div><Link to="/dashboard"><button className="btn btn-info btn-lg">Dashboard</button></Link></div>
                </div>
            </Modal>
        </div>
    )
}

export default Showcode
