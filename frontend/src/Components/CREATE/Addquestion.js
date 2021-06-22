import React,{useState,useEffect} from 'react'
import { Modal } from 'react-responsive-modal';
import Addoption from './Addoption';
import Listoptions from './Listoptions';


  const Addquestion = ({show,handlequestion,editquestion,item,ind}) => {

  const [question,setQuestion] = useState("");
  var [options,setOptions] = useState([])
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    if(item !== null){
      setQuestion(item.question)
      setOptions(item.options)
    }
    // eslint-disable-next-line 
  },[])

  const CloseModal = () =>  {
    setOpen(false);
    show(false)
  }

  const editoption = (ind,x,value) => {
    options[ind].option = x;
    options[ind].istrue = value;
    setOptions(options)
  }
  
  const deleteoption = (ind) => {
    options = options.filter((x,index) => {return index!==ind})
    setOptions(options)
  }

  const handleoption = (x)=> {

    setOptions([...options,{id:`${options.length}`,option:x.option,istrue:x.istrue}])
  }

  const handlesubmitquestion = () =>{
    if(question === ""){
      alert("Question Should Not be Empty")
      return;
    }

    if(options.length < 2){
      alert("Add Atleast two Options")
      return;
    }
    handlequestion(question,options)
    CloseModal(false)
  }

  const handleeditquestion = () =>{
    if(question === ""){
      alert("Question Should Not be Empty")
      return;
    }

    if(options.length < 2){
      alert("Add Atleast two Options")
      return;
    }
    editquestion(ind,question,options)
    CloseModal(false)
  }

  return (
    <div>
        <Modal open={open}  center showCloseIcon={false} closeOnOverlayClick={false} closeOnEsc={false}>

          <div className=" modal-addquestionandoption " style={{"minHeight":"74vh"}}>
              <div className="modal-question ">
                  <h2>Add Question:</h2>
                  <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)} style={{"borderRadius":"16px","width":"85%","height":"45px"}}></input>
              </div>

              <div className="d-flex flex-column align-items-center justify-content-around mb-2">
                  <h3>Add Options:</h3>
                  <div style={{"width":"90%"}}>
                      <Addoption handleoption={handleoption}/>
                  </div>
              </div>

              <div className="modal-option row bg-light " style={{"width":"90%","marginLeft":"5%","border-radius":"16px"}} >
                <div className="row" style={{"borderBottom":"2px solid black"}}>
                    <div className="col-6 " style={{"textAlign":"center"}} >
                      <h5>Options:</h5>
                    </div>
                    <div className="col-3" style={{"textAlign":"left"}}>
                    <h5>Answer:</h5>
                    </div>
                    <div className="col-3 " style={{"textAlign":"left"}}>
                    <h5>Update:</h5>
                    </div>
                </div>
                <div className="" style={{"height":"185px","overflow":"auto"}}>
                  {
                    options.map( (item,ind) => (<Listoptions key={ind} ind={ind} item={item.option} istrue={item.istrue} deleteoption={deleteoption} editoption={editoption}></Listoptions>) )
                  }
                </div>
              </div>

              <div className="d-flex justify-content-around mt-3">
                  <button onClick={() => CloseModal()} className="btn btn-success btn-lg d-button" style={{"width":"180px"}}>CLOSE</button>
                  { item === null ?   
                   <button onClick={() => handlesubmitquestion()} className="btn btn-success btn-lg d-button" style={{"width":"180px"}}>SUBMIT</button>
                  : 
                  <button onClick={() => handleeditquestion()} className="btn btn-success btn-lg d-button" style={{"width":"180px"}}>Edit Question</button>
                  }
              </div>
          </div>

        </Modal>
    </div>
  )
}

export default Addquestion
