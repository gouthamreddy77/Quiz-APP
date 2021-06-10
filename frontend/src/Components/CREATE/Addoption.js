import React,{useState} from 'react'

const Addoption = ({handleoption}) => {

    const [option,setoption] = useState({option:"",istrue:false})

    const handlestate = (e) =>{
        let x = option.option ,y = option.istrue;
        if(e.target.name === "checked" ){
            setoption({option:x,istrue:!y})
        }
        else{
            setoption({option:e.target.value,istrue:y})
        }
    }

    const submitoption = (e) =>{
        e.preventDefault();
        handleoption(option);
        setoption({option:"",istrue:false})
        console.log("option- " + option.option + "   istrue- " + option.istrue);
    }
    
    return (
        <div >
            <form  className=" d-flex justify-content-between" onSubmit={submitoption}>
              <input type="checkbox" checked={option.istrue} name="checked" onChange={handlestate} className="checkbox" style={{"width":"25px","height":"45px"}}/>
              <input type="text"  name="option" value={option.option} onChange={handlestate} style={{"border-radius":"16px","width":"80%","height":"45px"}}/>
              <button >Add Option</button>
            </form>
        </div>
    )
}

export default Addoption
