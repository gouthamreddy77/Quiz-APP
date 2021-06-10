import React from 'react'
import {Modal} from 'react-responsive-modal'
import {Link} from 'react-router-dom'
const Showcode = ({id}) => {
    return (
        <div className="">
            <Modal open={true}  center showCloseIcon={false} closeOnOverlayClick={false} closeOnEsc={false}>
                <div className="bg-light  d-flex flex-column justify-content-between align-items-center border" style={{"height":"100%","padding":"15%"}}>

                    <div><h1>Quiz Created Sucessfully</h1></div>
                    <div><h3>Share Code With Your Students...</h3></div>
                    <div style={{"width":"90%"}}><input type="text" value={id} readOnly style={{"width":"100%","border-radius":"16px","height":"55px","padding-left":"22%"}}></input></div>
                    <div className="d-flex justify-content-between" style={{"width":"100%"}}>
                        <div><Link to="/home"><button className="btn btn-success btn-lg">Home</button></Link></div>
                        <div><Link to="/dashboard"><button className="btn btn-success btn-lg">Dashboard</button></Link></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Showcode
