import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../Pages/Home'
import Attemptedcard from './Attemptedcard'
import Createdcard from './Createdcard'

const Dhome = () => {
    
    const{_id} = useContext(AuthContext)
    const [created,setcreated] = useState([])
    const [attempted,setattempted] = useState([])
    const [loading,setloading] = useState(true)
    
    useEffect(() => {

        const fetchquiz = async ()=>{
            try{
                const res = await fetch("/user/viewquiz",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        userid:_id
                    })
                })
    
                const data = await res.json()
                if(data.message === "User not found")
                     {
                         alert(data.message)
                         return
                     }
                setloading(false);
                setcreated(data.created.reverse())
                setattempted(data.attempted.reverse()) 
            }
            catch(err){
                console.log(err);
            }

        }

        if(_id  !== undefined)
            fetchquiz()

      },[_id]);
    
    return (
        <>
            {   
                loading === true ? 
                <>
                    <div className="d-flex justify-content-center m-5">
                        <h1 className="fw-bold fs-1">Loading...</h1>
                        <div className="spinner-border m-3" role="status">
                            <span className="sr-only "></span>
                        </div>
                    </div>
                </> : 
                <>
                    <div className="Dashboard mt-5">

                    <h1 className="middle"><span>Created</span></h1>
                    <div className="conatiner">
                        <div className=" a-dashboard  row">
                            { created.length === 0 ? <h2>You haven't created any</h2> : created.map((code,i) => <Createdcard key={i} quiztitle={code.quiztitle}  questions={code.questions} quizid={code.quizid}  responses={code.responses}/>) }
                        </div>
                    </div>

                    <h1 className="middle"><span>Attempted</span></h1>
                    <div className="conatiner">
                        <div className=" a-dashboard  row">
                            {
                                attempted.length === 0 ? 

                                    <h2>
                                        You havent Attempted any....
                                    </h2> 
                                
                                : 
                                
                                    attempted.map((code,i) => <Attemptedcard  key={i} title={code.quiztitle} questions={code.questions} score={code.score}/> )
                            }
                        </div>
                    </div>
                    </div>
                </>
            }
                        
        </>
    )
}

export default Dhome
