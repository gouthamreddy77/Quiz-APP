import React,{useState} from 'react'
import { Modal } from 'react-responsive-modal';
import Addoption from './Addoption';
import Listoptions from './Listoptions';


  const Addquestion = ({show,handlequestion}) => {

  const [question,setQuestion] = useState("");
  const [options,setOptions] = useState([])
  const [open, setOpen] = useState(true);

  const CloseModal = () =>  {
    setOpen(false);
    show(false)
  }
  const handleoption = (x)=> {

    setOptions([...options,{id:`${options.length}`,option:x.option,istrue:x.istrue}])
  }
  const handlesubmitquestion = () =>{
    handlequestion(question,options)
    CloseModal(false)
  }

  return (
    <div>
        <Modal open={open}  center showCloseIcon={false} closeOnOverlayClick={false} closeOnEsc={false}>

          <div className="conatiner border modal-addquestionandoption ">
              <div className="modal-question ">
                  <h2>Add Question:</h2>
                  <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} style={{"border-radius":"16px","width":"85%","height":"45px"}}></input>
              </div>

              <div className="d-flex flex-column align-items-center justify-content-around ">
                  <h3>Add Options:</h3>
                  <div style={{"width":"85%"}}>
                      <Addoption handleoption={handleoption}/>
                  </div>
              </div>

              <div className="modal-option row" style={{"width":"85%","margin-left":"8%"}} >
                <div className="row" style={{"border-bottom":"2px solid black"}}>
                    <div className="col" >
                      <h5>Options:</h5>
                    </div>
                    <div className="col" style={{"textAlign":"right"}}>
                    <h5>Answer:</h5>
                    </div>
                </div>
                  <div className="pl-4 col">
                      {
                        options.map( item => (<Listoptions key={item.id} item={item.option} istrue={item.istrue}></Listoptions>) )
                      }
                  </div>
              </div>

              <div className="d-flex justify-content-around">
                  <button onClick={() => CloseModal()} className="btn btn-success btn-lg d-button" style={{"width":"180px"}}>CLOSE</button>
                  <button onClick={() => handlesubmitquestion()} className="btn btn-success btn-lg d-button" style={{"width":"180px"}}>SUBMIT</button>
              </div>
          </div>

        </Modal>
    </div>
  )
}

export default Addquestion
