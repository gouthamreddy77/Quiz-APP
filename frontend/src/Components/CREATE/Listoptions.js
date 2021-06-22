import React,{useState,useEffect} from 'react'

const Listoptions = ({ind,item,istrue,deleteoption,editoption}) => {

    const [option,setoption] = useState("")
    const [value,setvalue] = useState("")
    const [editing,setediting] = useState(false)

    useEffect(()=>{
        setoption(item);
        setvalue(istrue);
    },[item,istrue]);

    const handledit = (x,ind) =>{
        setediting(true)
    }

    const handlesave = (ind,option,value) => {
        editoption(ind,option,value)
        setediting(false)
    }

    return (
        <div>
            {editing === false ? 
                <>
                    <div className="row " style={{"borderBottom":"1px solid black"}}>
                        <div className="col-7" style={{"textAlign":"center"}}>
                            <h5 className="">{option}</h5>
                        </div>
                        <div className="col-2" style={{"textAlign":"left"}}>
                            <h5 className="">{value ? "Yes":"No"}</h5>
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <div onClick={()=>handledit(option,ind)} style={{"display":"inline","cursor":"pointer"}}>
                                <img src="https://img.icons8.com/officel/25/000000/edit.png" alt="edit"/>
                            </div>
                            <div onClick={()=>deleteoption(ind)} style={{"display":"inline","cursor":"pointer"}}>
                                <img src="https://img.icons8.com/color/25/000000/delete-forever.png" alt="delete"/>
                            </div>
                        </div>
                    </div>
                </>
            :  
                <>
                    <div className="row " style={{"borderBottom":"1px solid black"}}>
                        <div className="col-7 " style={{"textAlign":"center"}}>
                            <input type="text" value={option} onChange={(e)=>setoption(e.target.value)} style={{"width":"153px","borderRadius":"7px"}} className=""/>
                        </div>
                        <div className="col-2 bg-light " style={{"textAlign":"left"}}>
                            <input type="checkbox" checked={value} name="checkbox" onChange={ ()=> setvalue(!value) } style={{"width":"22px","height":"22px"}} />
                        </div>
                        <div className="col-3" style={{"textAlign":"center"}}>
                            <p onClick={()=>handlesave(ind,option,value)} style={{"display":"inline","cursor":"pointer",}}>
                                <img src="https://img.icons8.com/cute-clipart/30/000000/save.png" alt="save"/>
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Listoptions
