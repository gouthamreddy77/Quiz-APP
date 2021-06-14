import React from 'react'
import {Modal} from 'react-responsive-modal'
import {Link} from 'react-router-dom'
const Showcode = ({id}) => {
    return (
        <div className="">
            <Modal open={true}  center showCloseIcon={false} closeOnOverlayClick={false} closeOnEsc={false}>
                <div className="bg-white  d-flex flex-column justify-content-around align-items-center" style={{"height":"100%","padding":"3%"}}>

                    <div><h1>Quiz Created Sucessfully</h1></div>
                    <div><h3>Share Code With Your Students...</h3></div>
                    <div style={{"width":"90%"}}><input type="text" value={id} readOnly style={{"width":"100%","border-radius":"16px","height":"55px","padding-left":"4%"}}></input></div>
                    <div className="d-flex flex-column justify-content-around align-items-center" style={{"width":"100%","height":"150px"}}>
                        <div><Link to="/home"><button className="btn btn-success d-button" style={{"width":"170px"}}>HOME</button></Link></div>
                        <div><Link to="/dashboard"><button className="btn btn-success d-button" style={{"width":"190px"}}>DASHBOARD</button></Link></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Showcode
