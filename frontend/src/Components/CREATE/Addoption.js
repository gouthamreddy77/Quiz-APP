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
        <div>
            <form  className="form-container" onSubmit={submitoption}>
              <input type="checkbox" checked={option.istrue} name="checked" onChange={handlestate}/>
              <input type="text"  name="option" value={option.option} onChange={handlestate} />
              <button >Add</button>
            </form>
        </div>
    )
}

export default Addoption
