import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../Pages/Home'
import Attemptedcard from './Attemptedcard'
import Createdcard from './Createdcard'

const Dhome = () => {
    
    const{_id} = useContext(AuthContext)
    const [created,setcreated] = useState([])
    const [attempted,setattempted] = useState([])

    
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
                setcreated(data.created)
                setattempted(data.attempted) 
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
                <div className="Dashboard mt-4">

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
    )
}

export default Dhome
