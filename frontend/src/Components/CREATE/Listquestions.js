import React,{useState} from 'react'
import Addquestion from './Addquestion';

const Listquestions = ({index,question,item,length,editquestion,deletequestion}) => {

    const[open,setopen] = useState(false)  //for modal button
    
    const handleedit = (x)=>{
        setopen(x);
    }
    const handledelete = (ind) => { 
        deletequestion(ind);
    }

    return (
        <>
                <div className=" col-6 col-lg-4 disp-question">
                    <h4 >{item.question}</h4>
                </div>
                <div className="col-3 col-lg-4 disp-length">
                    <h4 style={{"textAlign":"center"}}>{item.options.length}</h4> 
                </div>
                <div className="col-3 col-lg-4 disp-options d-flex flex-row justify-content-around" style={{"textAlign":"right"}}>
                    <div   style={{"display":"inline","cursor":"pointer"}} onClick={()=> handleedit(true)}>
                        <img src="https://img.icons8.com/officel/25/000000/edit.png" alt="edit"/>
                    </div>
                    <div  style={{"display":"inline","cursor":"pointer"}} onClick={()=> handledelete(index)}>
                        <img src="https://img.icons8.com/color/25/000000/delete-forever.png" alt="delete"/>
                    </div>
                </div>
                { open === true ? <Addquestion show={handleedit} editquestion={editquestion} item={item} ind={index}/> : null}
        </>
    )
}

export default Listquestions
