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

          <div className="conatiner border modal-addquestionandoption">
              <div className="modal-question border">
                  <h2>Add Question:</h2>
                  <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}></input>
              </div>

              <div className="modal-option">
                <h3>Add Options:</h3>
                <Addoption handleoption={handleoption}/>
              </div>
              <div className="modal-option border">
                      {
                        options.map( item => (<Listoptions key={item.id} item={item.option} istrue={item.istrue}></Listoptions>) )
                      }
              </div>

              <div className="border model-buttons">
                  <button onClick={() => CloseModal()} className="btn btn-success btn-lg">CLOSE</button>
                  <button onClick={() => handlesubmitquestion()} className="btn btn-success btn-lg">SUBMIT</button>
              </div>
          </div>

        </Modal>
    </div>
  )
}

export default Addquestion
